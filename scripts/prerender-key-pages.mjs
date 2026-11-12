/**
 * Lightweight prerender for key routes.
 * Generates static HTML shells with critical content (Lead-First, tables, schema)
 * so crawlers and AI bots see real text without executing JS.
 *
 * Run after `vite build`: node scripts/prerender-key-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve(process.cwd(), 'dist/public');
const ROUTES = [
  { path: '/', title: 'BoostNow | GEO, SEO i konwersja dla firm', h1: 'Zorientowane na wynik', lead: 'BoostNow pomaga firmom dominować w Google i silnikach AI dzięki GEO, SEO i psychologii decyzji. Zwiększamy cytowalność w ChatGPT, Perplexity i AI Overviews.' },
  { path: '/olsztyn', title: 'Pozycjonowanie i SEO Olsztyn | BoostNow', h1: 'SEO & Elite GEO w Olsztynie', lead: 'Twoja firma zasługuje na widoczność, która wyprzedza konkurencję. W Olsztynie tradycyjne SEO to już za mało — czas na Elite GEO i cytowania w AI.' },
  { path: '/o-nas', title: 'O nas | BoostNow', h1: 'O nas', lead: 'BoostNow to polska agencja GEO, SEO i optymalizacji konwersji. Łączymy Decision Science z widocznością w wyszukiwarkach AI.' },
  { path: '/kontakt', title: 'Kontakt | BoostNow', h1: 'Kontakt', lead: 'Skontaktuj się z BoostNow. Porozmawiajmy o widoczności Twojej firmy w Google i wyszukiwarkach AI. Odpowiadamy w ciągu 24 godzin.' },
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

function buildHtml(route) {
  return `<!doctype html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${route.title}</title>
  <meta name="description" content="${route.lead}" />
  <link rel="canonical" href="https://boostnow.pl${route.path}" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "BoostNow",
    "url": "https://boostnow.pl",
    "description": "Agencja GEO, SEO i optymalizacji konwersji.",
    "founder": { "@type": "Person", "name": "Mateusz Nowotka", "jobTitle": "Founder & CEO" }
  }
  </script>
</head>
<body>
  <main>
    <h1>${route.h1}</h1>
    <p>${route.lead}</p>
    <h2>Co obejmuje usługa GEO?</h2>
    <p>GEO to optymalizacja treści i struktury tak, aby modele AI cytowały Twoją markę jako źródło odpowiedzi. Efekt widoczny zwykle w 4–8 tygodni.</p>
    ${TABLE}
    <p><a href="https://boostnow.pl/kontakt">Poproś o bezpłatny audyt GEO</a></p>
  </main>
  <div id="root"></div>
  <script type="module" src="/assets/index.js"></script>
</body>
</html>`;
}

for (const route of ROUTES) {
  const dir = path.join(OUT_DIR, route.path === '/' ? '' : route.path.slice(1));
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'index.html');
  fs.writeFileSync(file, buildHtml(route), 'utf8');
  console.log('Prerendered:', file);
}

console.log('Prerender complete.');
