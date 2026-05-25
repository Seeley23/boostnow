import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

const SITE_URL = "https://boostnow.pl";

// Opaque Airtable-generated slugs → canonical slug (301)
const BLOG_REDIRECTS: Record<string, string> = {};

// Valid canonical blog slugs (from articles-metadata.json) — updated dynamically at startup
const VALID_BLOG_SLUGS = new Set([
  "pozycjonowanie-geo-jak-by-cytowanym-przez-chatgpt-perplexity-i-gemini-w-2025",
  "jak-zwiekszac-konwersje-ecommerce",
]);

// Test/junk slugs → real 404 with noindex HTML
const JUNK_BLOG_SLUGS = new Set([
  "przuykad-2",
  "hehe",
  "po-wgraniu-test",
  "kolejny-test",
  "test-automat",
  "przykadowy-artyku",
]);

const DEFAULT_SEO = {
  title: "BoostNow | GEO, SEO i konwersja dla firm",
  description:
    "BoostNow pomaga firmom rosnąć dzięki GEO, SEO, psychologii decyzji i optymalizacji konwersji.",
};

// Minimal real-404 HTML page — not indexable, not a React shell
const NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="robots" content="noindex, nofollow" />
  <title>404 – Strona nie istnieje | BoostNow</title>
  <style>body{font-family:sans-serif;text-align:center;padding:4rem;background:#0b1020;color:#fff}a{color:#c7ff4e}</style>
</head>
<body>
  <h1>404 – Strona nie istnieje</h1>
  <p>Szukana strona nie istnieje lub została usunięta.</p>
  <p><a href="/">Wróć na stronę główną</a> | <a href="/blog">Blog</a></p>
</body>
</html>`;

type CmsPage = {
  slug?: string;
  name?: string;
  seo?: {
    title?: string;
    description?: string;
  };
};

type ArticleMetadata = {
  id?: number | string;
  slug?: string;
  title?: string;
  meta_description?: string;
  date?: string;
  seo?: {
    title?: string;
    description?: string;
  };
};

type SeoData = {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  type?: string;
  article?: ArticleMetadata;
  pageSlug?: string;
  pageName?: string;
};

function readJsonFile<T>(candidatePaths: string[], fallback: T): T {
  const filePath = candidatePaths.find((p) => fs.existsSync(p));
  if (!filePath) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch (e) {
    console.warn(`Unable to read SEO data from ${filePath}:`, e);
    return fallback;
  }
}

function loadCmsPages(): CmsPage[] {
  const data = readJsonFile<{ pages?: CmsPage[] } | CmsPage[]>(
    [
      path.resolve(process.cwd(), "client/src/data/blog/website-cms.json"),
      path.resolve(import.meta.dirname, "../client/src/data/blog/website-cms.json"),
    ],
    [],
  );
  return Array.isArray(data) ? data : data.pages ?? [];
}

function loadArticleMetadata(): ArticleMetadata[] {
  return readJsonFile<ArticleMetadata[]>(
    [
      path.resolve(process.cwd(), "client/src/data/blog/articles-metadata.json"),
      path.resolve(import.meta.dirname, "../client/src/data/blog/articles-metadata.json"),
    ],
    [],
  );
}

function normalizePath(urlPath: string): string {
  const p = decodeURIComponent(urlPath.split("?")[0] || "/");
  return (p.length > 1 ? p.replace(/\/+$/, "") : p) || "/";
}

function pageSlugFromPath(urlPath: string): string {
  if (urlPath === "/") return "home";
  return urlPath.replace(/^\//, "").split("/")[0] || "home";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSeoData(urlPath: string, pages: CmsPage[], articles: ArticleMetadata[]): SeoData {
  const normalizedPath = normalizePath(urlPath);
  const canonical = `${SITE_URL}${normalizedPath}`;

  if (normalizedPath.startsWith("/blog/")) {
    const articleSlug = normalizedPath.replace("/blog/", "");
    const article = articles.find((a) => a.slug === articleSlug);
    const articleId = article?.id ? String(article.id).replace(/[^a-zA-Z0-9_-]/g, "") : null;
    const ogImage = articleId
      ? `${SITE_URL}/og-images/${articleId}.png`
      : `${SITE_URL}/og-images/default.png`;

    return {
      title: article?.seo?.title || (article?.title ? `${article.title} | BoostNow` : DEFAULT_SEO.title),
      description: article?.seo?.description || article?.meta_description || DEFAULT_SEO.description,
      canonical,
      ogImage,
      type: "article",
      article: article,
    };
  }

  const pageSlug = pageSlugFromPath(normalizedPath);
  const page = pages.find((p) => p.slug === pageSlug);

  return {
    title: page?.seo?.title || (page?.name ? `${page.name} | BoostNow` : DEFAULT_SEO.title),
    description: page?.seo?.description || DEFAULT_SEO.description,
    canonical,
    pageSlug,
    pageName: page?.name,
  };
}

// Build BlogPosting JSON-LD for article pages
function buildArticleJsonLd(seo: SeoData): string {
  if (seo.type !== "article" || !seo.article) return "";
  const a = seo.article;
  const datePublished = a.date || new Date().toISOString().split("T")[0];
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": escapeHtml(seo.title.replace(" | BoostNow", "")),
    "description": escapeHtml(seo.description),
    "url": seo.canonical,
    "mainEntityOfPage": { "@type": "WebPage", "@id": seo.canonical },
    "author": { "@type": "Organization", "name": "BoostNow", "url": SITE_URL },
    "publisher": {
      "@type": "Organization",
      "name": "BoostNow",
      "url": SITE_URL,
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` },
    },
    "datePublished": datePublished,
    "dateModified": datePublished,
  };
  if (seo.ogImage) schema["image"] = seo.ogImage;
  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

// Build server-side SEO content block (crawlable H1 + description + internal links)
function buildSeoContentBlock(seo: SeoData, articles: ArticleMetadata[]): string {
  const internalLinks = [
    `<a href="/">Strona główna</a>`,
    `<a href="/blog">Blog</a>`,
    `<a href="/slownik">Słownik AI</a>`,
    `<a href="/kontakt">Kontakt</a>`,
    `<a href="/o-nas">O nas</a>`,
  ].join(" · ");

  // For blog articles
  if (seo.type === "article" && seo.article) {
    const a = seo.article;
    const h1 = escapeHtml(a.title || seo.title.replace(" | BoostNow", ""));
    const desc = escapeHtml(a.meta_description || seo.description);
    return `<main id="seo-content" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true">
  <h1>${h1}</h1>
  <p>${desc}</p>
  <nav>${internalLinks}</nav>
</main>`;
  }

  // For known pages
  const pageH1Map: Record<string, string> = {
    home: "BoostNow – GEO, SEO i Optymalizacja Konwersji dla Firm",
    blog: "Blog BoostNow – Wiedza o GEO, SEO i Psychologii Decyzji",
    slownik: "Słownik AI i GEO – Pojęcia wyjaśnione prosto",
    kontakt: "Kontakt z BoostNow – Agencja GEO i SEO",
    "o-nas": "O nas – Zespół BoostNow, Agencja GEO i SEO",
    olsztyn: "Pozycjonowanie SEO i GEO w Olsztynie – BoostNow",
    "aio-ecommerce": "AIO dla e-commerce – Automatyzacja i AI dla Twojego Sklepu",
    "oblicz-straty": "Kalkulator Strat – Sprawdź ile tracisz bez GEO i SEO",
  };

  const slug = seo.pageSlug || "home";
  const h1 = escapeHtml(pageH1Map[slug] || seo.pageName || seo.title.replace(" | BoostNow", ""));
  const desc = escapeHtml(seo.description);

  // For blog index, add article list
  let articleList = "";
  if (slug === "blog") {
    const JUNK = new Set(["przuykad-2", "hehe", "po-wgraniu-test", "kolejny-test", "test-automat", "przykadowy-artyku"]);
    const validArticles = articles.filter((a) => a.slug && !JUNK.has(a.slug as string));
    if (validArticles.length > 0) {
      const items = validArticles
        .map((a) => `<li><a href="/blog/${a.slug}">${escapeHtml(a.title || a.slug || "")}</a></li>`)
        .join("\n    ");
      articleList = `\n  <ul>\n    ${items}\n  </ul>`;
    }
  }

  return `<main id="seo-content" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap" aria-hidden="true">
  <h1>${h1}</h1>
  <p>${desc}</p>${articleList}
  <nav>${internalLinks}</nav>
</main>`;
}

function injectSeoMeta(html: string, seo: SeoData, articles: ArticleMetadata[]): string {
  const ogTags = [
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`,
    `<meta property="og:type" content="${seo.type || "website"}" />`,
    `<meta property="og:site_name" content="BoostNow" />`,
    `<meta property="og:image" content="${escapeHtml(seo.ogImage || `${SITE_URL}/og-images/default.png`)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.ogImage || `${SITE_URL}/og-images/default.png`)}" />`,
    buildArticleJsonLd(seo),
  ].join("\n    ");

  const seoContentBlock = buildSeoContentBlock(seo, articles);

  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    )
    .replace("</head>", `    ${ogTags}\n  </head>`)
    .replace("<div id=\"root\">", `${seoContentBlock}\n  <div id="root">`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(import.meta.dirname, "../..", "client", "index.html");
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(`src="/src/main.tsx"`, `src="/src/main.tsx?v=${nanoid()}"`);
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  const indexHtmlPath = path.resolve(distPath, "index.html");
  const cmsPages = loadCmsPages();
  const articleMetadata = loadArticleMetadata();

  // Sync VALID_BLOG_SLUGS from loaded metadata
  articleMetadata.forEach((a) => {
    if (a.slug && !JUNK_BLOG_SLUGS.has(a.slug)) {
      VALID_BLOG_SLUGS.add(a.slug);
    }
  });

  if (!fs.existsSync(distPath)) {
    console.error(`Could not find the build directory: ${distPath}, make sure to build the client first`);
  }

  // Disable index.html serving in static middleware so our SPA handler can inject SEO meta
  app.use(express.static(distPath, { index: false }));

  // Handle blog slug routing before SPA fallback
  app.use("/blog/:slug", (req, res, next) => {
    const slug = req.params.slug;

    // 301 redirect for opaque/old slugs with known canonical
    if (BLOG_REDIRECTS[slug]) {
      return res.redirect(301, `/blog/${BLOG_REDIRECTS[slug]}`);
    }
    // 301 redirect for numeric IDs (old routing)
    if (/^\d+$/.test(slug)) {
      return res.redirect(301, "/blog");
    }
    // Real 404 for junk/test slugs — not indexable, not a React shell
    if (JUNK_BLOG_SLUGS.has(slug)) {
      return res.status(404).set("Content-Type", "text/html").send(NOT_FOUND_HTML);
    }
    // Real 404 for opaque Airtable slugs (contain underscores + random chars, not valid slugs)
    // Pattern: starts with digit + underscore + random chars, e.g. "0_4kjV..."
    if (/^\d+_[A-Za-z0-9]{4,}/.test(slug)) {
      return res.status(404).set("Content-Type", "text/html").send(NOT_FOUND_HTML);
    }
    next();
  });

  // SPA fallback with SEO injection
  app.use("*", (req, res) => {
    fs.readFile(indexHtmlPath, "utf-8", (error, html) => {
      if (error) {
        res.status(500).send("Unable to load application shell");
        return;
      }
      const seo = buildSeoData(req.originalUrl, cmsPages, articleMetadata);
      res.type("html").send(injectSeoMeta(html, seo, articleMetadata));
    });
  });
}
