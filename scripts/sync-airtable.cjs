const fs = require('fs');
const path = require('path');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = 'appB0MrrpweuNvlQd';

if (!AIRTABLE_API_KEY) {
  console.log('[sync-airtable] AIRTABLE_API_KEY not set — skipping sync, existing JSON files unchanged.');
  process.exit(0);
}

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

  // Parses a Schema JSON field that may contain multiple JSON objects separated by blank lines
  // Returns an array of parsed schema objects (or single object), or null on failure
  function parseSchemaField(raw, label) {
    if (!raw || typeof raw !== 'string') return null;
    const text = raw.trim();
    if (!text) return null;

    // Try as a single JSON first
    try {
      return JSON.parse(text);
    } catch (_) {}

    // Split multiple JSON objects separated by blank lines between } and {
    const parts = [];
    let depth = 0, start = 0, inStr = false, escape = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (escape) { escape = false; continue; }
      if (c === '\\' && inStr) { escape = true; continue; }
      if (c === '"') { inStr = !inStr; continue; }
      if (inStr) continue;
      if (c === '{') depth++;
      if (c === '}') {
        depth--;
        if (depth === 0) {
          parts.push(text.slice(start, i + 1));
          start = i + 1;
        }
      }
    }

    if (parts.length === 0) {
      console.warn(`[${label}] Schema JSON: nie można sparsować`);
      return null;
    }
    try {
      const parsed = parts.map(p => JSON.parse(p.trim()));
      return parsed.length === 1 ? parsed[0] : parsed;
    } catch (e) {
      console.warn(`[${label}] Schema JSON parse error:`, e.message);
      return null;
    }
  }

  // 1. Blog
  const articles = await fetchAirtableData(TABLES.ARTICLES);
  const blogData = articles.map((record, index) => {
    const f = record.fields;

    // Schema JSON field: may contain multiple schemas (Article + FAQPage) separated by blank lines
    const schemaJson = parseSchemaField(f['Schema JSON'], f.Title || record.id);

    // Extract real slug from mainEntityOfPage URL in schema if available
    let slug = f.Slug || null;
    if (!slug && schemaJson) {
      const firstSchema = Array.isArray(schemaJson) ? schemaJson[0] : schemaJson;
      const mpId = firstSchema?.mainEntityOfPage?.['@id'] || firstSchema?.url || '';
      const match = mpId.match(/\/blog\/([^\/]+)$/);
      if (match) slug = match[1];
    }
    if (!slug) {
      slug = f.Title ? f.Title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') : record.id;
    }

    return {
      id: index + 1,
      title: f.Title || 'Bez tytułu',
      content: f.Content || '',
      slug,
      date: new Date().toISOString().split('T')[0],
      excerpt: f['Meta Description'] || '',
      seoTitle: f['SEO Title'] || f.Title || '',
      keyPhrase: f['Key Phrase'] || '',
      category: 'General',
      schemaJson,  // Article schema + optionally FAQPage schema from Airtable
    };
  });
  fs.writeFileSync(path.join(dataPath, 'articles.json'), JSON.stringify(blogData, null, 2));

  // articles-metadata.json — read by BlogPage and BlogArticle components
  const articlesMetadata = blogData.map(article => ({
    id: article.id,
    title: article.title,
    meta_description: article.excerpt || '',
    semantic_anchors: article.keyPhrase || '',
    target_industry: article.category || 'General',
    word_count: article.content ? Math.ceil(article.content.split(/\s+/).length) : 0,
    slug: article.slug,
    date: article.date,
  }));
  fs.writeFileSync(path.join(dataPath, 'articles-metadata.json'), JSON.stringify(articlesMetadata, null, 2));

  // article-files.json — maps article index (1-based) to .md filename
  const articleFilesMap = {};
  blogData.forEach((article, idx) => {
    articleFilesMap[String(idx + 1)] = { filename: `${article.slug}.md` };
  });
  fs.writeFileSync(path.join(dataPath, 'article-files.json'), JSON.stringify(articleFilesMap, null, 2));

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
          extraData: s.fields.Extra_Data ? JSON.parse(s.fields.Extra_Data) : null,
          htmlTag: s.fields.HTML_Tag,
          geoCitability: s.fields.GEO_Citability_Mode,
          imageAlt: s.fields.Image_Alt,
          schemaMarkup: s.fields.Schema_Markup,
          stats: s.fields.Statistical_Data
        }));

      const seo = {
        title: pFields.SEO_Title,
        description: pFields.SEO_Desc,
        primaryKeyword: pFields.Primary_Keyword,
        semanticKeywords: pFields.Semantic_Keywords,
        aiSummary: pFields.AI_Summary,
        canonicalUrl: pFields.Canonical_URL,
        schemaType: pFields.Schema_Type || 'Article',
        author: {
          name: pFields.Author_Name,
          bio: pFields.Author_Bio
        },
        lastUpdated: pFields.Last_Updated || new Date().toISOString().split('T')[0]
      };

      // Schema_Markup: manually written full schema from Airtable Pages table (takes priority)
      const rawPageSchemaJson = pFields['Schema_Markup'] || null;
      let manualJsonLd = null;
      if (rawPageSchemaJson) {
        try {
          manualJsonLd = typeof rawPageSchemaJson === 'string' ? JSON.parse(rawPageSchemaJson) : rawPageSchemaJson;
        } catch (e) {
          console.warn(`[${pFields.Slug}] Schema_Markup nie jest poprawnym JSON:`, e.message);
        }
      }

      // Auto-generate JSON-LD (used only when Schema_JSON is empty in Airtable)
      const autoJsonLd = {
        "@context": "https://schema.org",
        "@type": seo.schemaType,
        "headline": seo.title,
        "description": seo.description,
        "dateModified": seo.lastUpdated,
        "author": {
          "@type": "Person",
          "name": seo.author.name || "BoostNow Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "BoostNow",
          "logo": {
            "@type": "ImageObject",
            "url": "https://boostnow.pl/logo.png"
          }
        }
      };

      if (seo.schemaType === 'FAQPage') {
        const faqSections = pageSections.filter(s => s.type === 'FAQ');
        if (faqSections.length > 0) {
          autoJsonLd.mainEntity = faqSections.map(s => ({
            "@type": "Question",
            "name": s.title,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": s.content
            }
          }));
        }
      }

      // Prefer manually written schema; fall back to auto-generated
      const jsonLd = manualJsonLd || autoJsonLd;

      return {
        slug: pFields.Slug,
        name: pFields.PageName,
        seo,
        jsonLd,
        status: pFields.Status,
        sections: pageSections.map(s => ({
          ...s,
          htmlTag: s.htmlTag || (s.type === 'Hero' ? 'H1' : 'H2'),
          geoCitability: s.geoCitability || false,
          imageAlt: s.imageAlt || s.title,
          schemaMarkup: s.schemaMarkup,
          stats: s.stats
        }))
      };
    })
  };
  fs.writeFileSync(path.join(dataPath, 'website-cms.json'), JSON.stringify(websiteData, null, 2));

  console.log(`Zsynchronizowano: ${blogData.length} artykułów, ${Object.keys(seoData).length} stron SEO, ${websiteData.pages.length} dynamicznych stron.`);
}

sync();
