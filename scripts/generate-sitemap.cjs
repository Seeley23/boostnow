/**
 * Generates sitemap.xml from articles metadata + static pages.
 * Sets lastmod to today for static pages, article date for blog posts.
 *
 * Usage: node scripts/generate-sitemap.cjs
 * Output: client/public/sitemap.xml
 */

const fs = require('fs');
const path = require('path');

const META_PATH = path.join(__dirname, '../client/src/data/blog/articles-metadata.json');
const OUTPUT = path.join(__dirname, '../client/public/sitemap.xml');
const TODAY = new Date().toISOString().split('T')[0];

const STATIC_PAGES = [
  { loc: 'https://boostnow.pl/', priority: '1.0', changefreq: 'weekly' },
  { loc: 'https://boostnow.pl/aio', priority: '0.9', changefreq: 'weekly' },
  { loc: 'https://boostnow.pl/aio-ecommerce', priority: '0.8', changefreq: 'weekly' },
  { loc: 'https://boostnow.pl/blog', priority: '0.9', changefreq: 'daily' },
  { loc: 'https://boostnow.pl/glossary', priority: '0.7', changefreq: 'monthly' },
  { loc: 'https://boostnow.pl/calculator', priority: '0.7', changefreq: 'monthly' },
  { loc: 'https://boostnow.pl/oblicz-straty', priority: '0.6', changefreq: 'monthly' },
  { loc: 'https://boostnow.pl/o-nas', priority: '0.7', changefreq: 'monthly' },
  { loc: 'https://boostnow.pl/kontakt', priority: '0.7', changefreq: 'monthly' },
  { loc: 'https://boostnow.pl/slownik', priority: '0.6', changefreq: 'monthly' },
  { loc: 'https://boostnow.pl/mateusz-nowotka', priority: '0.6', changefreq: 'monthly' },
  { loc: 'https://boostnow.pl/olsztyn', priority: '0.7', changefreq: 'monthly' },
  { loc: 'https://boostnow.pl/barczewo', priority: '0.6', changefreq: 'monthly' },
  { loc: 'https://boostnow.pl/stawiguda', priority: '0.6', changefreq: 'monthly' },
  { loc: 'https://boostnow.pl/dywity', priority: '0.6', changefreq: 'monthly' },
  { loc: 'https://boostnow.pl/olsztynek', priority: '0.6', changefreq: 'monthly' },
  { loc: 'https://boostnow.pl/regulamin', priority: '0.2', changefreq: 'yearly' },
  { loc: 'https://boostnow.pl/polityka-prywatnosci', priority: '0.2', changefreq: 'yearly' },
  { loc: 'https://boostnow.pl/polityka-cookies', priority: '0.2', changefreq: 'yearly' },
];

function main() {
  const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

`;

  for (const page of STATIC_PAGES) {
    xml += `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  xml += `
  <!-- Blog articles -->
`;

  for (const article of meta) {
    const lastmod = article.date || TODAY;
    xml += `  <url><loc>https://boostnow.pl/blog/${article.slug}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
`;
  }

  xml += `
</urlset>
`;

  fs.writeFileSync(OUTPUT, xml);
  console.log(`Generated sitemap.xml with ${STATIC_PAGES.length} static pages + ${meta.length} articles (lastmod: ${TODAY})`);
}

main();
