const fs = require('fs');
const path = require('path');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = 'appB0MrrpweuNvlQd';
const AIRTABLE_TABLE_NAME = 'Articles 2';

async function sync() {
  try {
    console.log('🚀 Starting Airtable CMS Sync...');
    console.log(`📡 Fetching from: ${AIRTABLE_BASE_ID} / ${AIRTABLE_TABLE_NAME}`);

    if (!AIRTABLE_API_KEY) {
      throw new Error('AIRTABLE_API_KEY environment variable is not set');
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`Airtable Error: ${data.error.type} - ${data.error.message}`);
    }

    const articles = [];
    const metadata = [];
    const fileMap = {};

    data.records.forEach((record, index) => {
      const fields = record.fields;
      const id = index + 1;
      const slug = fields.Slug || fields.Title.toLowerCase().replace(/ /g, '-');
      const filename = `${slug}.md`;

      // Calculate word count
      const wordCount = fields.Content ? fields.Content.split(/\s+/).filter(w => w.length > 0).length : 0;

      articles.push({
        id,
        title: fields.Title,
        content: fields.Content,
        slug,
        date: fields.Date || new Date().toISOString().split('T')[0],
        semantic_anchors: fields['Key Phrase'] || '',
        target_industry: fields['Target Industry'] || 'General',
        word_count: wordCount
      });

      metadata.push({
        id,
        title: fields.Title,
        meta_description: fields['Meta Description'] || '',
        semantic_anchors: fields['Key Phrase'] || '',
        target_industry: fields['Target Industry'] || 'General',
        word_count: wordCount,
        slug,
        date: fields.Date || new Date().toISOString().split('T')[0]
      });

      fileMap[id.toString()] = { filename };

      // Create markdown file
      const mdContent = `---
title: ${fields.Title}
date: ${fields.Date || new Date().toISOString().split('T')[0]}
slug: ${slug}
meta_description: ${fields['Meta Description'] || ''}
---

${fields.Content}`;

      const publicPath = path.join(process.cwd(), 'client/public/blog-articles');
      if (!fs.existsSync(publicPath)) {
        fs.mkdirSync(publicPath, { recursive: true });
      }
      fs.writeFileSync(path.join(publicPath, filename), mdContent);
    });

    // Write JSON files
    const dataPath = path.join(process.cwd(), 'client/src/data/blog');
    if (!fs.existsSync(dataPath)) {
      fs.mkdirSync(dataPath, { recursive: true });
    }

    fs.writeFileSync(path.join(dataPath, 'articles.json'), JSON.stringify(articles, null, 2));
    fs.writeFileSync(path.join(dataPath, 'articles-metadata.json'), JSON.stringify(metadata, null, 2));
    fs.writeFileSync(path.join(dataPath, 'article-files.json'), JSON.stringify(fileMap, null, 2));

    console.log(`✅ Synchronizacja zakończona!`);
    console.log(`📊 Summary:`);
    console.log(`   Articles synced: ${articles.length}`);
    console.log(`   Markdown files: ${articles.length}`);
    console.log(`   JSON files: 3 (articles.json, articles-metadata.json, article-files.json)`);
    console.log(`\n📁 Files written to:`);
    console.log(`   ${publicPath}`);
    console.log(`   ${dataPath}`);
  } catch (e) {
    console.error('❌ Sync failed:', e.message);
    process.exit(1);
  }
}

sync();
