const fs = require('fs');
const path = require('path');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID || 'appB0MrrpweuNvlQd';

const TABLES = {
  ARTICLES: 'Articles 2',
  SITE_SEO: 'Site',
  PAGES: 'Pages',
  SECTIONS: 'Page_Sections'
};

async function fetchAirtableData(tableName) {
  try {
    console.log(`Pobieranie danych z tabeli: ${tableName}...`);
    const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(tableName )}`, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.records || [];
  } catch (error) {
    console.error(`Błąd pobierania ${tableName}:`, error.message);
    return [];
  }
}

async function sync() {
  const dataPath = path.join(process.cwd(), 'client/src/data/blog');
  if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath, { recursive: true });

  // 1. Blog Articles - ZAKTUALIZOWANE MAPOWANIE
  const articles = await fetchAirtableData(TABLES.ARTICLES);
  const blogData = articles.map((record, index) => {
    const f = record.fields;
    // Używamy kolumny Slug z Airtable, jeśli jest pusta - generujemy z tytułu
    const slug = f.Slug || (f.Title ? f.Title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') : record.id);
    
    return {
      id: index + 1,
      title: f.Title || 'Bez tytułu',
      content: f.Content || '', // Pobieramy z Twojej kolumny Content
      slug: slug,
      date: f.Date || new Date().toISOString().split('T')[0],
      excerpt: f['Meta Description'] || '',
      category: f.Category || f['Key Phrase'] || 'General',
      semantic_anchors: f['Key Phrase'] || '',
      target_industry: f.Category || 'General',
      seo: {
        title: f['SEO Title'] || f.Title,
        description: f['Meta Description'] || '',
        keywords: f['Key Phrase'] || '',
        schema: (() => {
          try {
            return f['Schema JSON'] ? JSON.parse(f['Schema JSON']) : null;
          } catch (error) {
            console.warn(`Nieprawidłowy Schema JSON dla artykułu: ${f.Title || record.id}`);
            return null;
          }
        })()
      }
    };
  });

  fs.writeFileSync(path.join(dataPath, 'articles.json'), JSON.stringify(blogData, null, 2));

  // Metadata for Blog List and Article Pages
  const metadataData = blogData.map((a, index) => ({
    id: index + 1,
    record_id: a.id,
    title: a.title,
    meta_description: a.seo.description || a.excerpt,
    semantic_anchors: a.semantic_anchors,
    target_industry: a.target_industry,
    slug: a.slug,
    date: a.date,
    word_count: a.content.split(/\s+/).filter(Boolean).length
  }));
  fs.writeFileSync(path.join(dataPath, 'articles-metadata.json'), JSON.stringify(metadataData, null, 2));

  const articleFilesMap = Object.fromEntries(metadataData.map((a) => [String(a.id), { filename: `${a.slug}.md`, slug: a.slug }]));
  fs.writeFileSync(path.join(dataPath, 'article-files.json'), JSON.stringify(articleFilesMap, null, 2));

  // Save individual markdown files
  const blogDir = path.join(process.cwd(), 'client/public/blog-articles');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });
  blogData.forEach(article => {
    fs.writeFileSync(path.join(blogDir, `${article.slug}.md`), article.content);
  });

  // 2. Site SEO - ZACHOWANE BEZ ZMIAN
  const seoRecords = await fetchAirtableData(TABLES.SITE_SEO);
  const seoData = {};
  seoRecords.forEach(record => {
    const f = record.fields;
    if (f.Page) {
      seoData[f.Page] = { title: f.Title || '', description: f.Description || '' };
    }
  });
  fs.writeFileSync(path.join(dataPath, 'site-seo.json'), JSON.stringify(seoData, null, 2));

  // 3. Dynamic Pages & Sections - ZACHOWANE BEZ ZMIAN
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
          extraData: s.fields.Extra_Data ? JSON.parse(s.fields.Extra_Data) : null,
          htmlTag: s.fields.HTML_Tag,
          geoCitability: s.fields.GEO_Citability_Mode,
          imageAlt: s.fields.Image_Alt,
          schemaMarkup: s.fields.Schema_Markup,
          stats: s.fields.Statistical_Data
        }));

      return {
        slug: pFields.Slug,
        name: pFields.PageName,
        seo: {
          title: pFields.SEO_Title,
          description: pFields.SEO_Desc,
          primaryKeyword: pFields.Primary_Keyword,
          schemaType: pFields.Schema_Type || 'Article'
        },
        sections: pageSections
      };
    })
  };

  fs.writeFileSync(path.join(dataPath, 'website-cms.json'), JSON.stringify(websiteData, null, 2));
  console.log(`Zsynchronizowano: ${blogData.length} artykułów, ${Object.keys(seoData).length} stron SEO, ${websiteData.pages.length} dynamicznych stron.`);
}

sync();
