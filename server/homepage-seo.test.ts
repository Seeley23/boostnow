import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const readProjectFile = (relativePath: string) =>
  fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

describe("Homepage SEO contract", () => {
  it("keeps homepage metadata within the requested keyword count", () => {
    const cms = JSON.parse(
      readProjectFile("client/src/data/blog/website-cms.json"),
    );
    const home = cms.pages.find((page: { slug: string }) => page.slug === "home");
    const seo = home.seo;
    const keywords = [
      seo.primaryKeyword,
      ...String(seo.semanticKeywords || "").split(","),
    ]
      .map((keyword: string) => keyword.trim())
      .filter(Boolean);

    expect(new Set(keywords).size).toBeGreaterThanOrEqual(3);
    expect(new Set(keywords).size).toBeLessThanOrEqual(8);
  });

  it("does not use CMS H1/H2 values as wrapper elements", () => {
    const source = readProjectFile("client/src/components/SectionRenderer.tsx");

    expect(source).toContain("const requested = (htmlTag || 'section').toLowerCase();");
    expect(source).toContain("['section', 'article', 'aside', 'div']");
    expect(source).not.toContain("const Tag = (htmlTag || 'section').toLowerCase()");
  });

  it("keeps homepage CMS heading text under 80 characters", () => {
    const cms = JSON.parse(
      readProjectFile("client/src/data/blog/website-cms.json"),
    );
    const home = cms.pages.find((page: { slug: string }) => page.slug === "home");
    const headings = home.sections
      .filter((section: { htmlTag?: string }) =>
        ["H1", "H2"].includes(section.htmlTag || ""),
      )
      .map((section: { title: string }) => section.title);

    expect(headings.length).toBeGreaterThan(0);
    expect(Math.max(...headings.map((heading: string) => [...heading].length))).toBeLessThanOrEqual(80);
  });
});
