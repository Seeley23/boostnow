function parseJsonField(value, fallback = null) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}

function mapPagesForWebsiteCms(pages, sections) {
  return pages
    .filter((page) => page.fields && typeof page.fields.Slug === 'string' && page.fields.Slug.trim().length > 0)
    .map((page) => {
      const pFields = page.fields;
      const pageSections = sections
        .filter((section) => section.fields.Page && section.fields.Page.includes(page.id))
        .sort((a, b) => (a.fields.Order || 0) - (b.fields.Order || 0))
        .map((section) => ({
          type: section.fields.Section_Type,
          title: section.fields.Title || '',
          content: section.fields.Content || '',
          extraData: parseJsonField(section.fields.Extra_Data, null),
          htmlTag: section.fields.HTML_Tag,
          geoCitability: section.fields.GEO_Citability_Mode,
          imageAlt: section.fields.Image_Alt,
          schemaMarkup: section.fields.Schema_Markup,
          stats: section.fields.Statistical_Data,
        }));

      return {
        slug: pFields.Slug.trim(),
        name: pFields.PageName || pFields.Slug.trim(),
        seo: {
          title: pFields.SEO_Title,
          description: pFields.SEO_Desc,
          primaryKeyword: pFields.Primary_Keyword,
          schemaType: pFields.Schema_Type || 'Article',
        },
        sections: pageSections,
      };
    });
}

module.exports = {
  mapPagesForWebsiteCms,
};
