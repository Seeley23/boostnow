/**
 * Generates llms-full.txt — full site content in one file for AI agents.
 * Based on ai-seo skill recommendations (Corey Haines / marketingskills).
 *
 * Usage: node scripts/generate-llms-full.cjs
 * Output: client/public/llms-full.txt
 */

const fs = require('fs');
const path = require('path');

const META_PATH = path.join(__dirname, '../client/src/data/blog/articles-metadata.json');
const ARTICLES_DIR = path.join(__dirname, '../client/public/blog-articles');
const OUTPUT = path.join(__dirname, '../client/public/llms-full.txt');

function main() {
  const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));

  let content = `# BoostNow — Full Knowledge Base for AI
> Generated: ${new Date().toISOString().split('T')[0]}
> This file contains the full content of key pages and articles for AI systems.

## Key Facts
- BoostNow is a Polish GEO, SEO and conversion optimization agency.
- Specializes in visibility in Google, ChatGPT, Perplexity, Gemini and Google AI Overviews.
- Contact: kontakt@boostnow.pl
- Author: Mateusz Nowotka (Founder & CEO)

## Articles

`;

  let count = 0;
  for (const article of meta.slice(0, 30)) {
    const mdPath = path.join(ARTICLES_DIR, `${article.slug}.md`);
    let body = '';
    if (fs.existsSync(mdPath)) {
      body = fs.readFileSync(mdPath, 'utf8');
      body = body.replace(/^---[\s\S]*?---\n/, '').trim();
      body = body.slice(0, 4000); // limit per article
    } else {
      body = article.meta_description || '';
    }

    content += `### ${article.title}
URL: https://boostnow.pl/blog/${article.slug}
Date: ${article.date || '2026'}

${body}

---

`;
    count++;
  }

  content += `## Local Pages
- https://boostnow.pl/olsztyn
- https://boostnow.pl/barczewo
- https://boostnow.pl/stawiguda
- https://boostnow.pl/dywity
- https://boostnow.pl/olsztynek

## Services
- https://boostnow.pl/aio
- https://boostnow.pl/calculator
- https://boostnow.pl/glossary
`;

  fs.writeFileSync(OUTPUT, content);
  console.log(`Generated llms-full.txt with ${count} articles (${Math.round(content.length / 1024)} KB)`);
}

main();
