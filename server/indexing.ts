/**
 * Google Indexing API Integration
 * Automatically indexes new blog articles and pages
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const CREDENTIALS_PATH = resolve('./indexer-boostnow-4f8f1ba29e6e.json');
const DOMAIN = process.env.VITE_APP_DOMAIN || 'https://boostnow.pl';

let indexingClient: ReturnType<typeof google.indexing> | null = null;

/**
 * Initialize Google Indexing API client (lazy load)
 */
async function getIndexingClient() {
  if (indexingClient) return indexingClient;

  try {
    const credentials = JSON.parse(readFileSync(CREDENTIALS_PATH, 'utf8'));
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    indexingClient = google.indexing({
      version: 'v3',
      auth,
    });

    return indexingClient;
  } catch (error) {
    console.error('❌ Failed to initialize Google Indexing API:', error);
    return null;
  }
}

/**
 * Index a single URL
 */
export async function indexUrl(url: string): Promise<boolean> {
  const client = await getIndexingClient();
  if (!client) return false;

  try {
    await client.urlNotifications.publish({
      requestBody: {
        url,
        type: 'URL_UPDATED',
      },
    });

    console.log(`✅ Indexed: ${url}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to index ${url}:`, error);
    return false;
  }
}

/**
 * Index multiple URLs with rate limiting
 */
export async function indexUrls(urls: string[]): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  for (const url of urls) {
    const indexed = await indexUrl(url);
    if (indexed) {
      success++;
    } else {
      failed++;
    }
    // Rate limiting: 100ms between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return { success, failed };
}

/**
 * Generate blog article URL from slug
 */
export function generateBlogUrl(slug: string): string {
  return `${DOMAIN}/blog/${slug}`;
}
