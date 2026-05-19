#!/usr/bin/env node

/**
 * Airtable Articles Sync Script
 * Synchronizes articles from Airtable to local .md and .json files
 * 
 * Usage:
 *   node scripts/sync-airtable-articles.mjs
 * 
 * Environment Variables:
 *   AIRTABLE_API_KEY - Your Airtable API key
 *   AIRTABLE_BASE_ID - Base ID (default: appB0MrrpweuNvlQd)
 *   AIRTABLE_TABLE_NAME - Table name (default: Articles 2)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appB0MrrpweuNvlQd';
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Articles 2';

const ARTICLES_DIR = path.join(__dirname, '../public/blog-articles');
const DATA_DIR = path.join(__dirname, '../client/src/data/blog');

// Ensure directories exist
function ensureDirectories() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
    console.log(`✓ Created directory: ${ARTICLES_DIR}`);
  }
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log(`✓ Created directory: ${DATA_DIR}`);
  }
}

// Validate API key
function validateApiKey() {
  if (!AIRTABLE_API_KEY) {
    console.error('❌ Error: AIRTABLE_API_KEY environment variable is not set');
    console.error('Set it with: export AIRTABLE_API_KEY="your_api_key"');
    process.exit(1);
  }
}

// Fetch articles from Airtable
async function fetchArticles() {
  console.log(`\n📡 Fetching articles from Airtable...`);
  console.log(`   Base: ${AIRTABLE_BASE_ID}`);
  console.log(`   Table: ${AIRTABLE_TABLE_NAME}`);

  try {
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

    console.log(`✓ Fetched ${data.records.length} articles from Airtable`);
    return data.records;
  } catch (error) {
    console.error(`❌ Error fetching from Airtable: ${error.message}`);
    process.exit(1);
  }
}

// Transform Airtable record to article object
function transformRecord(record) {
  const fields = record.fields;
  
  return {
    id: record.id,
    title: fields.title || 'Untitled',
    slug: fields.slug || slugify(fields.title || 'article'),
    content: fields.content || '',
    date: fields.date || new Date().toISOString().split('T')[0],
    semantic_anchors: fields.semantic_anchors || '',
    target_industry: fields.target_industry || '',
    word_count: fields.word_count || 0,
    author: fields.author || 'BoostNow Team',
    meta_description: fields.meta_description || '',
    keywords: fields.keywords || '',
    status: fields.status || 'draft'
  };
}

// Generate slug from title
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Write markdown file
function writeMarkdownFile(article) {
  const filename = `${article.slug}.md`;
  const filepath = path.join(ARTICLES_DIR, filename);
  
  const markdown = `# ${article.title}

${article.content}

---

**Meta Description:** ${article.meta_description}  
**Keywords:** ${article.keywords}  
**Author:** ${article.author}  
**Date:** ${article.date}  
**Word Count:** ${article.word_count}  
`;

  fs.writeFileSync(filepath, markdown, 'utf-8');
  return filename;
}

// Generate articles.json
function generateArticlesJson(articles) {
  const articlesData = articles.map(article => ({
    id: article.id,
    title: article.title,
    content: article.content,
    slug: article.slug,
    date: article.date,
    semantic_anchors: article.semantic_anchors,
    target_industry: article.target_industry,
    word_count: article.word_count
  }));

  const filepath = path.join(DATA_DIR, 'articles.json');
  fs.writeFileSync(filepath, JSON.stringify(articlesData, null, 2), 'utf-8');
  return articlesData;
}

// Generate articles-metadata.json
function generateArticlesMetadataJson(articles) {
  const metadataData = articles.map(article => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    meta_description: article.meta_description,
    keywords: article.keywords,
    date: article.date,
    author: article.author,
    target_industry: article.target_industry
  }));

  const filepath = path.join(DATA_DIR, 'articles-metadata.json');
  fs.writeFileSync(filepath, JSON.stringify(metadataData, null, 2), 'utf-8');
  return metadataData;
}

// Generate article-files.json
function generateArticleFilesJson(articles) {
  const filesData = articles.map(article => ({
    id: article.id,
    slug: article.slug,
    filename: `${article.slug}.md`,
    path: `/blog-articles/${article.slug}.md`
  }));

  const filepath = path.join(DATA_DIR, 'article-files.json');
  fs.writeFileSync(filepath, JSON.stringify(filesData, null, 2), 'utf-8');
  return filesData;
}

// Main sync function
async function sync() {
  console.log('\n🚀 Starting Airtable Articles Sync...\n');

  validateApiKey();
  ensureDirectories();

  // Fetch articles from Airtable
  const records = await fetchArticles();

  if (records.length === 0) {
    console.log('ℹ️  No articles found in Airtable');
    return;
  }

  // Transform records
  const articles = records.map(transformRecord);

  // Write markdown files
  console.log(`\n📝 Writing markdown files...`);
  let mdCount = 0;
  articles.forEach(article => {
    if (article.status !== 'draft') {
      writeMarkdownFile(article);
      mdCount++;
    }
  });
  console.log(`✓ Wrote ${mdCount} markdown files to ${ARTICLES_DIR}`);

  // Generate JSON files
  console.log(`\n📋 Generating JSON files...`);
  generateArticlesJson(articles);
  console.log(`✓ Generated articles.json`);

  generateArticlesMetadataJson(articles);
  console.log(`✓ Generated articles-metadata.json`);

  generateArticleFilesJson(articles);
  console.log(`✓ Generated article-files.json`);

  // Summary
  console.log(`\n✅ Sync Complete!`);
  console.log(`\n📊 Summary:`);
  console.log(`   Total articles: ${articles.length}`);
  console.log(`   Published: ${articles.filter(a => a.status !== 'draft').length}`);
  console.log(`   Drafts: ${articles.filter(a => a.status === 'draft').length}`);
  console.log(`\n📁 Files generated:`);
  console.log(`   ${ARTICLES_DIR}`);
  console.log(`   ${DATA_DIR}/articles.json`);
  console.log(`   ${DATA_DIR}/articles-metadata.json`);
  console.log(`   ${DATA_DIR}/article-files.json`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Commit changes to git`);
  console.log(`   2. Push to GitHub`);
  console.log(`   3. Refresh your browser to see updated articles`);
}

// Run sync
sync().catch(error => {
  console.error('❌ Sync failed:', error);
  process.exit(1);
});
