import { afterAll, beforeAll, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
import AiCommerceAuditPage from "../client/src/pages/AiCommerceAuditPage";
import { normalizeEmail, normalizeStoreUrl, validateAudit } from "../client/src/components/audit/auditForm";
import { sourceKey } from "../client/src/components/audit/auditTracking";
import { ANSWERS, FAQ, SEO } from "../client/src/components/audit/auditCopy";
import { AUDIT_ARTICLE_LINKS } from "../shared/auditLinks";
import { getMetaForPath } from "./page-meta";

const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => fs.readFileSync(path.join(root, p), "utf8");

const valid = {
  storeUrl: "twojsklep.pl",
  firstName: "Ala",
  email: "ala@twojsklep.pl",
  platform: "",
  operationalConsent: true,
  marketingConsent: false,
};

describe("audit form validation", () => {
  it("accepts and normalizes store URLs", () => {
    expect(normalizeStoreUrl("twojsklep.pl")).toBe("https://twojsklep.pl");
    expect(normalizeStoreUrl(" HTTP://WWW.Sklep.pl/oferta/ ")).toBe("http://www.sklep.pl/oferta");
    expect(normalizeStoreUrl("sklep-z-kwiatami.com.pl")).toBe("https://sklep-z-kwiatami.com.pl");
  });

  it("rejects invalid store URLs", () => {
    for (const bad of ["", "sklep", "javascript:alert(1)", "ftp://sklep.pl", "https://user:pw@sklep.pl", "sklep .pl", "https://sklep.pl:8080", "http://localhost"]) {
      expect(normalizeStoreUrl(bad), bad).toBeNull();
    }
  });

  it("normalizes e-mail", () => {
    expect(normalizeEmail("  Ala@Example.COM ")).toBe("ala@example.com");
  });

  it("requires URL, first name, e-mail and the operational consent only", () => {
    expect(validateAudit(valid)).toEqual({});
    const errors = validateAudit({ ...valid, storeUrl: "x", firstName: " ", email: "ala@", operationalConsent: false });
    expect(Object.keys(errors).sort()).toEqual(["email", "firstName", "operationalConsent", "storeUrl"]);
    // Marketing consent and platform stay optional.
    expect(validateAudit({ ...valid, marketingConsent: false, platform: "" })).toEqual({});
  });

  it("maps traffic sources to source messages", () => {
    expect(sourceKey("LinkedIn")).toBe("linkedin");
    expect(sourceKey("google")).toBe("google");
    expect(sourceKey("fb")).toBe("facebook");
    expect(sourceKey("newsletter")).toBe("");
  });
});

describe("audit landing page", () => {
  const html = renderToStaticMarkup(
    createElement(HelmetProvider, { context: {} }, createElement(Router, { ssrPath: "/audyt-ai-dla-sklepu" }, createElement(AiCommerceAuditPage)))
  );

  it("renders exactly one H1 (variant A without a browser)", () => {
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
    expect(html).toContain("Czy AI może pomijać Twój sklep?");
  });

  it("has a separate, unchecked marketing consent and a privacy link", () => {
    const marketing = html.match(/<input[^>]*name="marketingConsent"[^>]*>/)?.[0] ?? "";
    expect(marketing).not.toBe("");
    expect(marketing).not.toMatch(/checked/);
    expect(html).toMatch(/name="operationalConsent"/);
    expect(html).toContain('href="/polityka-prywatnosci"');
  });

  it("labels every visible field", () => {
    for (const id of ["audit-storeUrl", "audit-firstName", "audit-email", "audit-platform", "audit-operationalConsent", "audit-marketingConsent"]) {
      expect(html).toContain(`for="${id}"`);
    }
  });

  it("marks the sample report as an example and makes no guarantee", () => {
    expect(html).toContain("Przykładowy wynik audytu");
    expect(html).toContain("Nie gwarantuje wyświetlenia ani polecenia sklepu");
    expect(html).not.toMatch(/gwarantujemy|zagwarantujemy/i);
  });

  it("is routed before the dynamic /:slug route", () => {
    const app = read("client/src/App.tsx");
    expect(app.indexOf('"/audyt-ai-dla-sklepu"')).toBeGreaterThan(-1);
    expect(app.indexOf('"/audyt-ai-dla-sklepu"')).toBeLessThan(app.indexOf('"/:slug"'));
  });

  it("is in the sitemap, the prerender entry and page meta, but not in the main navigation", () => {
    expect(read("scripts/generate-sitemap.cjs")).toContain("https://boostnow.pl/audyt-ai-dla-sklepu");
    expect(read("client/src/prerender-entry.tsx")).toContain('"/audyt-ai-dla-sklepu"');
    const meta = getMetaForPath("/audyt-ai-dla-sklepu");
    expect(meta?.title).toBe(SEO.title);
    expect(JSON.stringify(meta?.schema)).toContain("FAQPage");
    expect(read("client/src/components/Navigation.tsx")).not.toContain("audyt-ai-dla-sklepu");
  });

  it("keeps title and description within SERP limits", () => {
    expect(SEO.title.length).toBeLessThanOrEqual(60);
    expect(SEO.title.toLowerCase()).toMatch(/^bezpłatny audyt sklepu pod chatgpt/);
    expect(SEO.description.length).toBeGreaterThanOrEqual(140);
    expect(SEO.description.length).toBeLessThanOrEqual(155);
  });

  it("has self-contained answer blocks of 130-170 words below the form", () => {
    const words = (t: string) => t.split(/\s+/).filter(Boolean).length;
    const check = [ANSWERS.check.intro, ...ANSWERS.check.steps, ANSWERS.check.outro].join(" ");
    const why = [...ANSWERS.why.paragraphs, ANSWERS.why.linkLead, ANSWERS.why.linkText].join(" ");
    const method = ANSWERS.method.paragraphs.join(" ");
    for (const [name, text] of Object.entries({ check, why, method })) {
      const n = words(text);
      expect(n, name).toBeGreaterThanOrEqual(130);
      expect(n, name).toBeLessThanOrEqual(170);
    }
    expect(html.indexOf(ANSWERS.check.h2)).toBeGreaterThan(html.indexOf('id="audyt-formularz"'));
  });

  it("shows the same FAQ in HTML and in JSON-LD", () => {
    const graph = (getMetaForPath("/audyt-ai-dla-sklepu")?.schema?.[0] as any)["@graph"];
    const faq = graph.find((n: any) => n["@type"] === "FAQPage");
    expect(faq.mainEntity.map((q: any) => q.name)).toEqual(FAQ.map((f) => f.q));
    for (const f of FAQ) {
      expect(html).toContain(f.q);
      expect(html).toContain(f.a);
    }
    const types = graph.map((n: any) => n["@type"]).sort();
    expect(types).toEqual(["BreadcrumbList", "FAQPage", "Service", "WebPage"]);
    const service = graph.find((n: any) => n["@type"] === "Service");
    expect(service.offers).toMatchObject({ price: "0", priceCurrency: "PLN" });
    expect(JSON.stringify(graph)).not.toMatch(/AggregateRating|Review/);
  });

  it("is linked from llms.txt, the AIO page and selected articles", () => {
    expect(read("client/public/llms.txt")).toContain("https://boostnow.pl/audyt-ai-dla-sklepu");
    expect(read("scripts/generate-llms-full.cjs")).toContain("https://boostnow.pl/audyt-ai-dla-sklepu");
    expect(read("client/src/pages/AIOPage.tsx")).toContain('href="/audyt-ai-dla-sklepu"');
    const anchors = Object.values(AUDIT_ARTICLE_LINKS);
    expect(new Set(anchors).size).toBe(anchors.length);
    expect(read("scripts/prerender-site.ts")).toContain("AUDIT_ARTICLE_LINKS[slug]");
  });

  it("blocks web access to the fallback lead log", () => {
    expect(read("client/public/_leads/.htaccess")).toContain("Require all denied");
  });
});

// Runs contact.php with PHP's built-in server when PHP is installed.
const hasPhp = spawnSync("php", ["-v"]).status === 0;

describe.skipIf(!hasPhp)("contact.php audit endpoint", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "audit-php-"));
  const www = path.join(tmp, "www");
  const mailLog = path.join(tmp, "mail.txt");
  const port = 18000 + Math.floor(Math.random() * 1000);
  let server: ChildProcess;

  beforeAll(async () => {
    fs.mkdirSync(www);
    fs.copyFileSync(path.join(root, "client/public/contact.php"), path.join(www, "contact.php"));
    const sendmail = path.join(tmp, "sendmail.sh");
    fs.writeFileSync(sendmail, `#!/bin/sh\ncat >> "${mailLog}"\n`, { mode: 0o755 });
    server = spawn("php", ["-d", `sendmail_path=${sendmail}`, "-d", `sys_temp_dir=${tmp}`, "-S", `127.0.0.1:${port}`], { cwd: www, stdio: "ignore" });
    for (let i = 0; i < 50; i++) {
      try {
        await fetch(`http://127.0.0.1:${port}/contact.php`);
        return;
      } catch {
        await new Promise((r) => setTimeout(r, 100));
      }
    }
  });

  afterAll(() => {
    server?.kill();
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  const post = async (body: unknown) => {
    const res = await fetch(`http://127.0.0.1:${port}/contact.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { status: res.status, data: (await res.json()) as any };
  };

  const lead = {
    form: "audit",
    storeUrl: "Sklep-Test.pl/",
    firstName: "Ala",
    email: "ALA@example.com",
    platform: "Shoper",
    operationalConsent: true,
    marketingConsent: false,
    landingVariant: "B",
    utmSource: "linkedin",
    utmCampaign: "q4",
  };

  it("stores a valid lead with UTC timestamps, UTM and separate consent", async () => {
    expect((await post(lead)).data).toEqual({ success: true });
    const rows = fs.readFileSync(path.join(tmp, "boostnow-leads", "audit-leads.jsonl"), "utf8").trim().split("\n");
    expect(rows).toHaveLength(1);
    const row = JSON.parse(rows[0]);
    expect(row).toMatchObject({
      storeUrl: "https://sklep-test.pl",
      email: "ala@example.com",
      platform: "Shoper",
      marketingConsent: false,
      marketingConsentAt: null,
      landingVariant: "B",
      utmSource: "linkedin",
      utmCampaign: "q4",
      status: "new",
    });
    expect(row.createdAt).toMatch(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/);
    expect(fs.readFileSync(mailLog, "utf8")).toContain("Zgoda marketingowa: NIE");
  });

  it("deduplicates the same store and e-mail (www and case ignored)", async () => {
    const { data } = await post({ ...lead, storeUrl: "https://www.sklep-test.pl", email: "ala@example.com" });
    expect(data).toEqual({ success: true, duplicate: true });
  });

  it("records the marketing consent time only when given", async () => {
    await post({ ...lead, email: "ola@example.com", marketingConsent: true });
    const rows = fs.readFileSync(path.join(tmp, "boostnow-leads", "audit-leads.jsonl"), "utf8").trim().split("\n");
    const row = JSON.parse(rows[rows.length - 1]);
    expect(row.marketingConsent).toBe(true);
    expect(row.marketingConsentAt).toBe(row.createdAt);
  });

  it("rejects an invalid URL, unknown platform and missing consent", async () => {
    const { status, data } = await post({ ...lead, storeUrl: "javascript:alert(1)", platform: "Wix", operationalConsent: false });
    expect(status).toBe(422);
    expect(data.message).toContain("adres sklepu");
    expect(data.message).toContain("platforma");
    expect(data.message).toContain("zgoda");
  });
});
