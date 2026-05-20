const fs = require('fs');
const path = require('path');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = 'appB0MrrpweuNvlQd';

const TABLES = {
  ARTICLES: 'Articles 2',
  SITE_SEO: 'Site',
  PAGES: 'Pages',
  SECTIONS: 'Page_Sections'
};

async function fetchAirtableData(tableName) {
  try {
    console.log(`Pobieranie danych z tabeli: ${tableName}...`);
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(tableName)}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } }
    );
    const data = await response.json();
    return data.records || [];
  } catch (error) {
    console.error(`Błąd przy pobieraniu tabeli ${tableName}:`, error.message);
    return [];
  }
}

async function sync() {
  const dataPath = path.join(process.cwd(), 'client/src/data/blog');
  if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath, { recursive: true });

  // 1. Blog
  const articles = await fetchAirtableData(TABLES.ARTICLES);
  const blogData = articles.map((record, index) => {
    const f = record.fields;
    const slug = f.Slug || (f.Title ? f.Title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') : record.id);
    return {
      id: index + 1,
      title: f.Title || 'Bez tytułu',
      content: f.Content || '',
      slug,
      date: new Date().toISOString().split('T')[0],
      excerpt: f['Meta Description'] || '',
      category: 'General'
    };
  });
  fs.writeFileSync(path.join(dataPath, 'articles.json'), JSON.stringify(blogData, null, 2));

  const blogDir = path.join(process.cwd(), 'client/public/blog-articles');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
  blogData.forEach(article => {
    fs.writeFileSync(path.join(blogDir, `${article.slug}.md`), article.content);
  });

  // 2. Site SEO
  const seoRecords = await fetchAirtableData(TABLES.SITE_SEO);
  const seoData = {};
  seoRecords.forEach(record => {
    const f = record.fields;
    if (f.Page) {
      seoData[f.Page] = { title: f.Title || '', description: f.Description || '' };
    }
  });
  fs.writeFileSync(path.join(dataPath, 'site-seo.json'), JSON.stringify(seoData, null, 2));

  // 3. Dynamic Pages & Sections
  const pages = await fetchAirtableData(TABLES.PAGES);
  const sections = await fetchAirtableData(TABLES.SECTIONS);

  const websiteData = {
    pages: pages.map(p => {
      const pFields = p.fields;
      const pageSections = sections
        .filter(s => s.fields.Page && s.fields.Page.includes(p.id))
        .sort((a, b) => (a.fields.Order || 0) - (b.fields.Order || 0))
        .map(s => ({
          type: s.fields.Section_Type,
          title: s.fields.Title || '',
          content: s.fields.Content || '',
          extraData: s.fields.Extra_Data ? JSON.parse(s.fields.Extra_Data) : null
        }));

      return {
        slug: pFields.Slug,
        name: pFields.PageName,
        seo: { title: pFields.SEO_Title, description: pFields.SEO_Desc },
        status: pFields.Status,
        sections: pageSections
      };
    })
  };
  fs.writeFileSync(path.join(dataPath, 'website-cms.json'), JSON.stringify(websiteData, null, 2));

  console.log(`Zsynchronizowano: ${blogData.length} artykułów, ${Object.keys(seoData).length} stron SEO, ${websiteData.pages.length} dynamicznych stron.`);
}

sync();
