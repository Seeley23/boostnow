const fs = require('fs');
const path = require('path');

// Dane konfiguracyjne
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = 'appB0MrrpweuNvlQd';
const AIRTABLE_TABLE_NAME = 'Articles 2';
const AIRTABLE_SITE_TABLE = 'Site';

async function sync() {
  console.log('Rozpoczynam synchronizację z Airtable...');
  
  try {
    const dataPath = path.join(process.cwd(), 'client/src/data/blog');
    if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath, { recursive: true });

    // 1. Synchronizacja Artykułów
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } }
    );
    
    const data = await response.json();
    if (data.records) {
      const articles = [];
      const metadata = [];
      const fileMap = {};
      const publicPath = path.join(process.cwd(), 'client/public/blog-articles');
      if (!fs.existsSync(publicPath)) fs.mkdirSync(publicPath, { recursive: true });

      data.records.forEach((record, index) => {
        const fields = record.fields;
        if (!fields.Title) return;
        const id = index + 1;
        const slug = fields.Slug || fields.Title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
        const filename = `${slug}.md`;

        articles.push({
          id, title: fields.Title, content: fields.Content || '', slug,
          date: new Date().toISOString().split('T')[0],
          semantic_anchors: fields['Key Phrase'] || '',
          target_industry: 'General',
          word_count: fields.Content ? fields.Content.split(/\s+/).length : 0
        });

        metadata.push({
          id, title: fields.Title, meta_description: fields['Meta Description'] || '',
          semantic_anchors: fields['Key Phrase'] || '',
          target_industry: 'General',
          word_count: fields.Content ? fields.Content.split(/\s+/).length : 0,
          slug, date: new Date().toISOString().split('T')[0]
        });

        fileMap[id.toString()] = { filename };
        const mdContent = `---\ntitle: ${fields.Title}\ndate: ${new Date().toISOString().split('T')[0]}\nslug: ${slug}\nmeta_description: ${fields['Meta Description'] || ''}\n---\n\n${fields.Content || ''}`;
        fs.writeFileSync(path.join(publicPath, filename), mdContent);
      });

      fs.writeFileSync(path.join(dataPath, 'articles.json'), JSON.stringify(articles, null, 2));
      fs.writeFileSync(path.join(dataPath, 'articles-metadata.json'), JSON.stringify(metadata, null, 2));
      fs.writeFileSync(path.join(dataPath, 'article-files.json'), JSON.stringify(fileMap, null, 2));
      console.log(`Zsynchronizowano pomyślnie ${articles.length} artykułów!`);
    }

    // 2. Synchronizacja SEO Strony (Tabela Site)
    console.log('Pobieranie danych SEO z tabeli Site...');
    const siteResponse = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_SITE_TABLE)}`,
      { headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` } }
    );
    const siteData = await siteResponse.json();
    const siteSeo = {};
    if (siteData.records) {
      siteData.records.forEach(record => {
        const f = record.fields;
        if (f.Page) {
          siteSeo[f.Page] = {
            title: f.Title || '',
            description: f.Description || '',
            keywords: f.Keywords || ''
          };
        }
      });
      fs.writeFileSync(path.join(dataPath, 'site-seo.json'), JSON.stringify(siteSeo, null, 2));
      console.log(`Zsynchronizowano SEO dla ${Object.keys(siteSeo).length} stron.`);
    }

  } catch (error) {
    console.error('Wystąpił błąd podczas synchronizacji:', error);
    process.exit(1);
  }
}

sync();
