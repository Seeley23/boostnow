/**
 * Static prerender for every URL in the sitemap.
 *
 * Crawlers that don't run JavaScript (Ahrefs, GPTBot, PerplexityBot, ...) used
 * to get the same empty SPA shell on every URL: one title, no links, canonical
 * pointing at the homepage. This writes one HTML file per sitemap URL with its
 * own title, description, canonical, JSON-LD, the page text, and real <a href>
 * navigation. React replaces the content of <div id="root"> when it mounts.
 *
 * Also writes dist/public/spa.html: the untouched shell, used as the SPA
 * fallback for routes that have no prerendered file (see .htaccess and
 * server/_core/vite.ts). index.html itself becomes the prerendered homepage.
 *
 * React-only pages (AIO, glossary, author, legal...) are rendered from the SSR
 * bundle built by scripts/build-prerender-ssr.mjs (client/src/prerender-entry.tsx).
 *
 * Run after `vite build`, generate-sitemap and build-prerender-ssr:
 *   npx tsx scripts/prerender-site.ts
 */
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { getMetaForPath } from "../server/page-meta";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "dist/public");
const BASE = "https://boostnow.pl";

const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");
const articles: any[] = JSON.parse(read("client/src/data/blog/articles.json"));
const cms: any = JSON.parse(read("client/src/data/blog/website-cms.json"));
const sitemapPath = fs.existsSync(path.join(OUT, "sitemap.xml"))
  ? "dist/public/sitemap.xml"
  : "client/public/sitemap.xml";
const routes = [...read(sitemapPath).matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname.replace(/(.)\/$/, "$1")
);

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const stripBrand = (t: string) => t.replace(/\s*[|–-]\s*BoostNow\s*$/i, "").trim();

// ── Shared navigation (gives every page real outgoing links) ────────────────

const NAV = [
  ["/", "Strona główna"],
  ["/o-nas", "O nas"],
  ["/aio", "AIO dla e-commerce"],
  ["/olsztyn", "SEO Olsztyn"],
  ["/calculator", "Oblicz straty"],
  ["/blog", "Blog"],
  ["/glossary", "Słownik"],
  ["/kontakt", "Kontakt"],
];
const FOOTER = [
  ["/aio-ecommerce", "AIO dla sklepów"],
  ["/mateusz-nowotka", "Mateusz Nowotka"],
  ["/regulamin", "Regulamin"],
  ["/polityka-prywatnosci", "Polityka prywatności"],
  ["/polityka-cookies", "Polityka cookies"],
];
const links = (items: string[][]) =>
  items.map(([href, label]) => `<li><a href="${href}">${esc(label)}</a></li>`).join("");
const header = `<header><nav aria-label="Główna nawigacja"><ul>${links(NAV)}</ul></nav></header>`;
const footer = `<footer><nav aria-label="Stopka"><ul>${links(FOOTER)}</ul></nav><p>BoostNow, agencja SEO AI.</p></footer>`;

// ── Content builders ─────────────────────────────────────────────────────────

/** Plain CMS text: blank line = paragraph, single newline = line break. */
function textToHtml(text: string): string {
  return String(text || "")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => `<p>${b.split("\n").map(esc).join("<br>")}</p>`)
    .join("\n");
}

function markdownToHtml(md: string): string {
  // "## Heading {#id}" -> heading with id (marked doesn't support the attribute syntax)
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    let text = renderer.parser.parseInline(tokens);
    let id = "";
    const m = text.match(/\s*\{#([\w-]+)\}\s*$/);
    if (m) {
      id = ` id="${m[1]}"`;
      text = text.slice(0, m.index);
    }
    // the page already has an H1 (article title)
    const level = Math.max(2, depth);
    return `<h${level}${id}>${text}</h${level}>\n`;
  };
  // Never pass raw HTML from the CMS through.
  renderer.html = ({ text }) => esc(text);
  return marked.parse(md || "", { renderer, async: false, gfm: true }) as string;
}

const articleBySlug = new Map(articles.filter((a) => a.slug).map((a) => [a.slug, a]));

function articlePage(slug: string, meta: { title: string; description: string }): string {
  const a = articleBySlug.get(slug);
  const title = a?.title || stripBrand(meta.title);
  // Related: next articles in the list, so every article gets incoming links.
  const idx = articles.findIndex((x) => x.slug === slug);
  const related = [1, 2, 3, 4]
    .map((i) => articles[(idx + i) % articles.length])
    .filter((x) => x && x.slug !== slug);
  return `
    <main>
      <nav aria-label="Breadcrumb"><a href="/">Strona główna</a> / <a href="/blog">Blog</a></nav>
      <article>
        <h1>${esc(title)}</h1>
        <p>${a?.date ? `<time datetime="${esc(a.date)}">${esc(a.date)}</time> · ` : ""}Autor: <a href="/mateusz-nowotka">Mateusz Nowotka</a></p>
        ${a?.content ? markdownToHtml(a.content) : `<p>${esc(meta.description)}</p>`}
      </article>
      <aside>
        <h2>Powiązane artykuły</h2>
        <ul>${related.map((r) => `<li><a href="/blog/${r.slug}">${esc(r.title)}</a></li>`).join("")}</ul>
      </aside>
    </main>`;
}

function blogIndex(meta: { title: string; description: string }): string {
  return `
    <main>
      <h1>${esc(stripBrand(meta.title))}</h1>
      <p>${esc(meta.description)}</p>
      <ul>${articles
        .filter((a) => a.slug)
        .map(
          (a) =>
            `<li><article><h2><a href="/blog/${a.slug}">${esc(a.title)}</a></h2><p>${esc(a.excerpt || "")}</p></article></li>`
        )
        .join("\n")}</ul>
    </main>`;
}

function cmsPage(slug: string, meta: { title: string; description: string }): string | null {
  const page = (cms.pages || []).find((p: any) => p.slug === slug);
  if (!page || !Array.isArray(page.sections)) return null;
  let h1Done = false;
  const parts = page.sections.map((s: any) => {
    // Section titles like "Hero" / "Problem" are internal labels, not headings.
    const label = s.title && s.title !== s.type ? s.title : "";
    let heading = "";
    if (label) {
      heading = h1Done ? `<h2>${esc(label)}</h2>` : `<h1>${esc(label)}</h1>`;
      h1Done = true;
    }
    return `<section>${heading}${textToHtml(s.content)}</section>`;
  });
  const h1 = h1Done ? "" : `<h1>${esc(stripBrand(meta.title))}</h1>`;
  return `<main>${h1}${parts.join("\n")}</main>`;
}

function genericPage(meta: { title: string; description: string }): string {
  return `<main><h1>${esc(stripBrand(meta.title))}</h1><p>${esc(meta.description)}</p></main>`;
}

// React-only pages rendered by the SSR bundle (optional: falls back to genericPage).
const ssrEntry = path.join(ROOT, "dist/ssr/prerender-entry.js");
let renderReact: ((route: string) => string | null) | null = null;
if (fs.existsSync(ssrEntry)) {
  renderReact = (await import(ssrEntry)).render;
} else {
  console.warn("dist/ssr/prerender-entry.js missing: React-only pages get title + description only.");
}

function reactPage(route: string): string | null {
  const html = renderReact?.(route);
  if (!html) return null;
  // framer-motion renders its initial state (opacity:0); show the text until React mounts.
  return html.replace(/opacity:0;?/g, "");
}

// ── HTML assembly ────────────────────────────────────────────────────────────

const templatePath = path.join(OUT, "index.html");
if (!fs.existsSync(templatePath)) {
  console.error('dist/public/index.html not found. Run "vite build" first.');
  process.exit(1);
}
// On a re-run index.html is already prerendered; always start from the shell.
const spaPath = path.join(OUT, "spa.html");
const template = fs.existsSync(spaPath)
  ? fs.readFileSync(spaPath, "utf8")
  : fs.readFileSync(templatePath, "utf8");
if (!template.includes('<div id="root"></div>')) {
  console.error('Template has no empty <div id="root"></div>; refusing to prerender.');
  process.exit(1);
}
// The shell must not claim any canonical: it is served for every unknown route.
const shell = template.replace(/<link rel="canonical"[^>]*>\s*/g, "");
fs.writeFileSync(spaPath, shell);

function render(route: string): string | null {
  const meta = getMetaForPath(route);
  if (!meta) return null;
  let body: string | null;
  if (route.startsWith("/blog/")) body = articlePage(route.slice(6), meta);
  else if (route === "/blog") body = blogIndex(meta);
  else
    body =
      reactPage(route) ??
      cmsPage(route === "/" ? "home" : route.slice(1), meta) ??
      genericPage(meta);

  const head = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    // data-rh: react-helmet-async adopts the tag and replaces it on client-side
    // navigation instead of leaving a stale second canonical in the DOM.
    `<link rel="canonical" href="${BASE}${route === "/" ? "/" : route}" data-rh="true" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${BASE}${route}" />`,
    ...(meta.schema || []).map(
      (s) =>
        `<script type="application/ld+json">${JSON.stringify(s).replace(/<\/script/gi, "<\\/script")}</script>`
    ),
  ].join("\n    ");

  return shell
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:(title|description|url)"[^>]*>\s*/gi, "")
    .replace("</head>", `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${header}${body}${footer}</div>`);
}

let ok = 0;
const skipped: string[] = [];
for (const route of routes) {
  const html = render(route);
  if (!html) {
    skipped.push(route);
    continue;
  }
  const file = route === "/" ? path.join(OUT, "index.html") : path.join(OUT, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  ok++;
}
console.log(`Prerendered ${ok}/${routes.length} sitemap URLs.`);
if (skipped.length) {
  console.error(`No page data for: ${skipped.join(", ")}`);
  process.exit(1);
}
