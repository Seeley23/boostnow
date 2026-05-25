export type CmsPage = {
  slug?: string;
  name?: string;
  pageName?: string;
  PageName?: string;
  seo?: {
    title?: string;
    description?: string;
    primaryKeyword?: string;
    schemaType?: string;
  };
  SEO_Title?: string;
  SEO_Desc?: string;
  Focus_Keyphrase?: string;
  Schema_Markup?: string;
  sections?: unknown[];
};

export type WebsiteCmsData = {
  pages?: CmsPage[];
};

export function findCmsPageBySlug(websiteData: WebsiteCmsData, slug?: string): CmsPage | null {
  if (!websiteData?.pages?.length) return null;
  const targetSlug = slug || 'home';
  return websiteData.pages.find((page) => page.slug === targetSlug) || null;
}

export function getCmsPageMeta(page: CmsPage) {
  return {
    title: page.seo?.title || page.SEO_Title || page.name || page.PageName || 'BoostNow',
    description: page.seo?.description || page.SEO_Desc || '',
    keywords: page.seo?.primaryKeyword || page.Focus_Keyphrase || '',
    schemaMarkup: page.Schema_Markup,
  };
}

export function getCmsPageDisplayName(page: CmsPage) {
  return page.name || page.pageName || page.PageName || page.slug || 'BoostNow';
}
