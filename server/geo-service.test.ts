import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { Router } from "wouter";
import GeoServicePage from "../client/src/pages/GeoServicePage";
import { GEO_ARTICLE_CTA, GEO_FAQ, GEO_FORM_ID, GEO_PATH, GEO_SEO } from "../shared/geoService";
import { getMetaForPath } from "./page-meta";

const root = path.resolve(import.meta.dirname, "..");
const read = (p: string) => fs.readFileSync(path.join(root, p), "utf8");

describe("/pozycjonowanie-geo service page", () => {
  const html = renderToStaticMarkup(
    createElement(HelmetProvider, { context: {} }, createElement(Router, { ssrPath: GEO_PATH }, createElement(GeoServicePage)))
  );

  it("renders the offer, the price and the form anchor", () => {
    expect(html).toContain("<h1");
    expect(html).toContain("od 800 zł netto miesięcznie");
    expect(html).toContain("Bezpłatny audyt na start");
    expect(html).toContain(`id="${GEO_FORM_ID}"`);
    expect(html).toContain('name="siteUrl"');
  });

  it("has its own meta and JSON-LD with the FAQ shown on the page", () => {
    const meta = getMetaForPath(GEO_PATH);
    expect(meta.title).toBe(GEO_SEO.title);
    expect(meta.canonical).toBe(GEO_SEO.canonical);
    const json = JSON.stringify(meta.schema);
    expect(json).toContain('"minPrice":800');
    for (const f of GEO_FAQ) {
      expect(json).toContain(f.q);
      expect(html).toContain(f.q);
    }
  });

  it("is routed, prerendered, in the sitemap and accepted by contact.php", () => {
    expect(read("client/src/App.tsx")).toContain(`path={"${GEO_PATH}"}`);
    expect(read("client/src/prerender-entry.tsx")).toContain(`"${GEO_PATH}": GeoServicePage`);
    expect(read("scripts/generate-sitemap.cjs")).toContain(`https://boostnow.pl${GEO_PATH}`);
    expect(read("client/public/contact.php")).toContain("'geo'");
  });

  it("every article ends with the GEO call to action", () => {
    expect(GEO_ARTICLE_CTA.href).toBe(`${GEO_PATH}#${GEO_FORM_ID}`);
    expect(read("client/src/components/BlogArticle.tsx")).toContain("GEO_ARTICLE_CTA.href");
    expect(read("scripts/prerender-site.ts")).toContain("GEO_ARTICLE_CTA.href");
  });
});
