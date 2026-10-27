/**
 * Simple prerender for key blog articles.
 * Generates static HTML files with article content embedded so AI crawlers
 * (which don't execute JS) can see the full text.
 *
 * Usage: node scripts/prerender-articles.cjs
 * Output: dist/public/blog/<slug>/index.html (after vite build)
 */

const fs = require('fs');
const path = require('path');

const ARTICLES_META = path.join(__dirname, '../client/src/data/blog/articles-metadata.json');
const ARTICLES_DIR = path.join(__dirname, '../client/public/blog-articles');
const OUTPUT_DIR = path.join(__dirname, '../dist/public/blog');
const TEMPLATE = path.join(__dirname, '../dist/public/index.html');

const KEY_SLUGS = [
  'llms-txt',
  'jak-pojawic-sie-w-chatgpt',
  'geo-co-to-jest',
  'aeo-co-to-jest',
  'pozycjonowanie-lokalne',
  'seo-co-to',
  'audyt-seo',
  'pozycjonowanie-geo',
  'generative-engine-optimization',
  'seo-pod-ai-overviews',
  'ai-seo',
  'pozycjonowanie-w-ai',
  'seo-dla-sklepu-internetowego',
  'ile-kosztuje-pozycjonowanie',
];

function escapeHtml(str) {
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"');
}

function mdToSimpleHtml(md) {
  // Very basic markdown -> HTML for prerender (headings + paragraphs)
  return md
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('# ')) return `<h1>${escapeHtml(block.slice(2))}</h1>`;
      if (block.startsWith('## ')) return `<h2>${escapeHtml(block.slice(3))}</h2>`;
      if (block.startsWith('### ')) return `<h3>${escapeHtml(block.slice(4))}</h3>`;
      if (block.startsWith('- ') || block.startsWith('* ')) {
        const items = block.split('\n').map(l => `<li>${escapeHtml(l.replace(/^[-*] /, ''))}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${escapeHtml(block).replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n');
}

function main() {
  if (!fs.existsSync(TEMPLATE)) {
    console.error('Template not found. Run "pnpm run build:static" first.');
    process.exit(1);
  }

  const template = fs.readFileSync(TEMPLATE, 'utf8');
  const meta = JSON.parse(fs.readFileSync(ARTICLES_META, 'utf8'));

  let generated = 0;

  for (const slug of KEY_SLUGS) {
    const article = meta.find(a => a.slug === slug);
    if (!article) {
      console.warn(`Article not found in metadata: ${slug}`);
      continue;
    }

    const mdPath = path.join(ARTICLES_DIR, `${slug}.md`);
    let content = '';
    if (fs.existsSync(mdPath)) {
      content = fs.readFileSync(mdPath, 'utf8');
      content = content.replace(/^---[\s\S]*?---\n/, '').trim();
    } else {
      content = article.meta_description || '';
    }

    const htmlContent = mdToSimpleHtml(content);
    const lead = article.meta_description || '';

    const articleHtml = `
<div id="prerendered-article" style="display:none" aria-hidden="true">
  <h1>${escapeHtml(article.title)}</h1>
  <p class="lead">${escapeHtml(lead)}</p>
  ${htmlContent}
</div>
`;

    // Inject before </body>
    let page = template.replace('</body>', articleHtml + '\n</body>');

    // Override title and description
    page = page.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(article.seoTitle || article.title)} | BoostNow</title>`);
    page = page.replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeHtml(lead)}" />`
    );

    const outDir = path.join(OUTPUT_DIR, slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), page);
    generated++;
    console.log(`Prerendered: /blog/${slug}`);
  }

  console.log(`\nDone. Generated ${generated} static article pages in dist/public/blog/`);
}

main();
