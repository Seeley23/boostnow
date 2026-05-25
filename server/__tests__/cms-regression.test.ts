import { describe, expect, test } from "vitest";
import { createRequire } from "node:module";

import { findCmsPageBySlug, getCmsPageMeta } from "../../client/src/pages/dynamic-page-data";

const require = createRequire(import.meta.url);
const { mapPagesForWebsiteCms } = require("../../scripts/cms-data-helpers.cjs");

describe("CMS Airtable sync regressions", () => {
  test("skips Airtable pages without a usable slug", () => {
    const pages = [
      { id: "rec-valid", fields: { Slug: "geo", PageName: "GEO", SEO_Title: "GEO title" } },
      { id: "rec-empty", fields: { Slug: "", PageName: "Empty" } },
      { id: "rec-missing", fields: { PageName: "Missing" } },
    ];

    const mapped = mapPagesForWebsiteCms(pages, []);

    expect(mapped).toHaveLength(1);
    expect(mapped[0]).toMatchObject({ slug: "geo", name: "GEO" });
  });
});

describe("Dynamic CMS page data", () => {
  const websiteData = {
    pages: [
      {
        slug: "geo",
        name: "GEO",
        seo: {
          title: "GEO title",
          description: "GEO description",
          primaryKeyword: "pozycjonowanie GEO",
        },
      },
    ],
  };

  test("finds dynamic CMS page by slug", () => {
    expect(findCmsPageBySlug(websiteData, "geo")?.name).toBe("GEO");
    expect(findCmsPageBySlug(websiteData, "missing")).toBeNull();
  });

  test("reads SEO metadata from normalized website-cms.json structure", () => {
    expect(getCmsPageMeta(websiteData.pages[0])).toEqual({
      title: "GEO title",
      description: "GEO description",
      keywords: "pozycjonowanie GEO",
      schemaMarkup: undefined,
    });
  });
});
