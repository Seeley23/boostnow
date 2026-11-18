/**
 * Lightweight prerender for key routes.
 * Puts critical content (lead, table, schema) into the built index.html
 * so crawlers and AI bots see real text without executing JS.
 *
 * It starts from the Vite-built dist/public/index.html, so the hashed JS/CSS
 * bundles, analytics and head tags stay intact. Content goes inside
 * <div id="root">; React replaces it when the app mounts.
 *
 * Run after `vite build`: node scripts/prerender-key-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve(process.cwd(), 'dist/public');
const TEMPLATE = path.join(OUT_DIR, 'index.html');
const BASE = 'https://boostnow.pl';

// title/description: null keeps the values already in client/index.html
const ROUTES = [
  { path: '/', title: null, description: null, h1: 'Agencja SEO AI: Twoja firma polecana przez ChatGPT', lead: 'Pozycjonujemy firmy w Google i w odpowiedziach AI: ChatGPT, Perplexity, Gemini i Google AI Overviews. SEO i GEO w jednej strategii.' },
  { path: '/olsztyn', title: 'Pozycjonowanie i SEO Olsztyn | BoostNow', description: null, h1: 'SEO & Elite GEO w Olsztynie', lead: 'Twoja firma zasługuje na widoczność, która wyprzedza konkurencję. W Olsztynie tradycyjne SEO to już za mało — czas na Elite GEO i cytowania w AI.' },
  { path: '/o-nas', title: 'O nas | BoostNow', description: null, h1: 'O nas', lead: 'BoostNow to polska agencja GEO, SEO i optymalizacji konwersji. Łączymy Decision Science z widocznością w wyszukiwarkach AI.' },
  { path: '/kontakt', title: 'Kontakt | BoostNow', description: null, h1: 'Kontakt', lead: 'Skontaktuj się z BoostNow. Porozmawiajmy o widoczności Twojej firmy w Google i wyszukiwarkach AI. Odpowiadamy w ciągu 24 godzin.' },
];

const TABLE = `
<table>
  <thead><tr><th>Element</th><th>Co dostajesz</th><th>Czas</th></tr></thead>
  <tbody>
    <tr><td>Audyt cytowalności AI</td><td>Raport z lukami i rekomendacjami</td><td>7 dni</td></tr>
    <tr><td>Lead-First content + schema</td><td>Strony zoptymalizowane pod RAG</td><td>14–21 dni</td></tr>
    <tr><td>llms.txt + monitoring</td><td>Plik kontekstowy + śledzenie cytowań</td><td>3 dni</td></tr>
  </tbody>
</table>`;

const SCHEMA = `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "BoostNow",
    "url": "${BASE}",
    "description": "Agencja SEO AI: SEO, GEO i optymalizacja konwersji.",
    "founder": { "@type": "Person", "name": "Mateusz Nowotka", "jobTitle": "Founder & CEO" }
  }
  </script>`;

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function replaceOnce(html, pattern, replacement, label) {
  const found = typeof pattern === 'string' ? html.includes(pattern) : pattern.test(html);
  if (!found) throw new Error(`prerender: ${label} not found in template`);
  return html.replace(pattern, replacement);
}

function buildHtml(template, route) {
  let html = template;
  if (route.title) {
    html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(route.title)}</title>`, '<title>');
  }
  if (route.description) {
    html = replaceOnce(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(route.description)}" />`, 'meta description');
  }
  // The shell has no canonical: index.html is also the SPA fallback for every
  // route, so a hardcoded one would point /blog etc. at the homepage. Helmet sets
  // it in the browser; here only the dedicated route files get one.
  html = html.replace(/<link rel="canonical"[^>]*>\s*/g, '');
  const canonical = route.path === '/' ? '' : `<link rel="canonical" href="${BASE}${route.path}" />\n  `;
  html = replaceOnce(html, '</head>', `  ${canonical}${SCHEMA}\n  </head>`, '</head>');

  const content = `
    <main>
      <h1>${escapeHtml(route.h1)}</h1>
      <p>${escapeHtml(route.lead)}</p>
      <h2>Co obejmuje usługa GEO?</h2>
      <p>GEO to optymalizacja treści i struktury tak, aby modele AI cytowały Twoją markę jako źródło odpowiedzi.</p>
      ${TABLE}
      <p><a href="${BASE}/kontakt">Poproś o bezpłatny audyt GEO</a></p>
    </main>`;
  html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${content}\n    </div>`, '<div id="root">');
  return html;
}

if (!fs.existsSync(TEMPLATE)) {
  console.error('Template not found. Run "vite build" first.');
  process.exit(1);
}
const template = fs.readFileSync(TEMPLATE, 'utf8');

for (const route of ROUTES) {
  const dir = path.join(OUT_DIR, route.path === '/' ? '' : route.path.slice(1));
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'index.html');
  fs.writeFileSync(file, buildHtml(template, route), 'utf8');
  console.log('Prerendered:', file);
}

console.log('Prerender complete.');
