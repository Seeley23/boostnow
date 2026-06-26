#!/usr/bin/env node

/**
 * Google Indexing API - Bulk URL Indexing Script
 * Sends all blog articles and key pages to Google Search Console
 * Usage: node scripts/bulk-index-urls.mjs
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const CREDENTIALS_PATH = resolve('./indexer-boostnow-4f8f1ba29e6e.json');
const DOMAIN = 'https://boostnow.pl';

// List of all URLs to index
const URLS_TO_INDEX = [
  // Main pages
  `${DOMAIN}/`,
  `${DOMAIN}/blog`,
  
  // Blog articles - AI & GEO focused
  `${DOMAIN}/blog/ai-seo`,
  `${DOMAIN}/blog/aeo-co-to-jest`,
  `${DOMAIN}/blog/agencja-seo-ai`,
  `${DOMAIN}/blog/audyt-seo`,
  `${DOMAIN}/blog/co-to-jest-seo`,
  `${DOMAIN}/blog/generative-engine-optimization`,
  `${DOMAIN}/blog/geo-co-to-jest`,
  `${DOMAIN}/blog/ile-kosztuje-pozycjonowanie`,
  `${DOMAIN}/blog/ile-kosztuje-strona-internetowa`,
  `${DOMAIN}/blog/jak-pojawic-sie-w-chatgpt`,
  `${DOMAIN}/blog/jak-zalozyc-sklep-internetowy`,
  `${DOMAIN}/blog/llms-txt`,
  `${DOMAIN}/blog/optymalizacja-seo`,
  `${DOMAIN}/blog/pozycjonowanie-geo`,
  `${DOMAIN}/blog/pozycjonowanie-google`,
  `${DOMAIN}/blog/pozycjonowanie-katowice-2-miliony-klientow-niska-konkurencja`,
  `${DOMAIN}/blog/pozycjonowanie-krakow-niedoinwestowany-rynek-seo-w-polsce`,
  `${DOMAIN}/blog/pozycjonowanie-lokalne`,
  `${DOMAIN}/blog/pozycjonowanie-stron-poznan-jak-firma-z-poznania-trafia-do-top-google-2026`,
  `${DOMAIN}/blog/pozycjonowanie-w-ai`,
  `${DOMAIN}/blog/pozycjonowanie-warszawa-jak-firma-z-warszawy-trafia-do-top-google`,
  `${DOMAIN}/blog/pozycjonowanie-wizytowki-google`,
  `${DOMAIN}/blog/pozycjonowanie-wroclaw-niedoinwestowany-rynek-seo`,
  `${DOMAIN}/blog/seo`,
  `${DOMAIN}/blog/seo-dla-hoteli-zbieraj-rezerwacje-bezposrednie-plac-mniej-ota`,
  `${DOMAIN}/blog/seo-dla-kliniki-pacjenci-szukaja-specjalistow-w-google`,
  `${DOMAIN}/blog/seo-dla-prawnika-widocznosc-z-poszanowaniem-kea-i-krrp`,
  `${DOMAIN}/blog/seo-dla-sklepu-internetowego`,
  `${DOMAIN}/blog/seo-pod-ai-overviews`,
  `${DOMAIN}/blog/tanie-pozycjonowanie`,
];

/**
 * Initialize Google Indexing API client
 */
async function initializeClient() {
  try {
    const credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, 'utf8'));
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    return google.indexing({
      version: 'v3',
      auth,
    });
  } catch (error) {
    console.error('❌ Failed to initialize Google Auth:', error.message);
    process.exit(1);
  }
}

/**
 * Send a single URL to Google Indexing API
 */
async function indexUrl(indexing, url) {
  try {
    const response = await indexing.urlNotifications.publish({
      requestBody: {
        url,
        type: 'URL_UPDATED',
      },
    });

    return {
      url,
      success: true,
      notificationId: response.data.urlNotificationMetadata?.latestUpdate?.notifyTime,
    };
  } catch (error) {
    return {
      url,
      success: false,
      error: error.message,
    };
  }
}

/**
 * Bulk index all URLs with rate limiting
 */
async function bulkIndexUrls(indexing) {
  console.log(`\n🚀 Starting bulk indexing of ${URLS_TO_INDEX.length} URLs...\n`);

  const results = {
    success: 0,
    failed: 0,
    details: [],
  };

  // Process URLs with 100ms delay between requests to avoid rate limiting
  for (let i = 0; i < URLS_TO_INDEX.length; i++) {
    const url = URLS_TO_INDEX[i];
    const result = await indexUrl(indexing, url);

    if (result.success) {
      results.success++;
      console.log(`✅ [${i + 1}/${URLS_TO_INDEX.length}] Indexed: ${url}`);
    } else {
      results.failed++;
      console.log(`❌ [${i + 1}/${URLS_TO_INDEX.length}] Failed: ${url} - ${result.error}`);
    }

    results.details.push(result);

    // Rate limiting: wait 100ms between requests
    if (i < URLS_TO_INDEX.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log('📋 Google Indexing API - Bulk URL Indexing');
  console.log('==========================================');

  const indexing = await initializeClient();
  console.log('✅ Google Auth initialized successfully');

  const results = await bulkIndexUrls(indexing);

  console.log('\n📊 Indexing Results:');
  console.log('==========================================');
  console.log(`✅ Successfully indexed: ${results.success} URLs`);
  console.log(`❌ Failed: ${results.failed} URLs`);
  console.log(`📈 Success rate: ${((results.success / URLS_TO_INDEX.length) * 100).toFixed(1)}%`);

  if (results.failed > 0) {
    console.log('\n⚠️  Failed URLs:');
    results.details
      .filter(r => !r.success)
      .forEach(r => console.log(`   - ${r.url}: ${r.error}`));
  }

  console.log('\n💡 Next steps:');
  console.log('   1. Check Google Search Console for indexing status');
  console.log('   2. Monitor crawl stats over next 24-48 hours');
  console.log('   3. Verify all URLs appear in search results\n');

  process.exit(results.failed > 0 ? 1 : 0);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
