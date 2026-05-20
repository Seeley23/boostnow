const fs = require('fs');
const path = require('path');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = 'appB0MrrpweuNvlQd';

async function fetchAirtableData(tableName) {
  try {
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

async function generate() {
  const pages = await fetchAirtableData('Pages');
  const publicDir = path.join(process.cwd(), 'client/public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  // 1. Generate robots.txt (Elite GEO version)
  const robotsTxt = `# AI Crawlers - ALLOWED for maximum AI search visibility
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: GoogleOther
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: FacebookBot
Allow: /

# Standard Search Engines
User-agent: *
Allow: /

Sitemap: https://boostnow.pl/sitemap.xml
`;
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  console.log('Wygenerowano robots.txt');

  // 2. Generate llms.txt (Standard for AI)
  let llmsTxt = `# BoostNow - Elite SEO & GEO Agency
> Specjaliści od widoczności w wyszukiwarkach AI i tradycyjnych.

## Kluczowe Strony
`;

  pages.filter(p => p.fields.Status === 'Published').forEach(p => {
    const slug = p.fields.Slug === 'home' ? '' : p.fields.Slug;
    llmsTxt += `- [${p.fields.PageName}](https://boostnow.pl/${slug}): ${p.fields.SEO_Desc || 'Opis strony'}\n`;
  });

  llmsTxt += `
## Kontakt
- Email: kontakt@boostnow.pl
- Strona: https://boostnow.pl
`;
  fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt);
  console.log('Wygenerowano llms.txt');
}

generate();
