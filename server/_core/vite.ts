import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

const SITE_URL = "https://boostnow.pl";

// Opaque Airtable-generated slugs that should 301 to canonical URLs
// Format: { opaqueSlug: canonicalSlug }
const BLOG_REDIRECTS: Record<string, string> = {};

// Valid canonical blog slugs (from articles-metadata.json)
const VALID_BLOG_SLUGS = new Set([
  "pozycjonowanie-geo-jak-by-cytowanym-przez-chatgpt-perplexity-i-gemini-w-2025",
  "jak-zwiekszac-konwersje-ecommerce",
]);

// Test/junk slugs that should return 404
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

type CmsPage = {
  slug?: string;
  name?: string;
  seo?: {
    title?: string;
    description?: string;
  };
};

type ArticleMetadata = {
  slug?: string;
  title?: string;
  meta_description?: string;
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
};

function readJsonFile<T>(candidatePaths: string[], fallback: T): T {
  const filePath = candidatePaths.find((candidatePath) => fs.existsSync(candidatePath));

  if (!filePath) {
    return fallback;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch (error) {
    console.warn(`Unable to read SEO data from ${filePath}:`, error);
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
  const pathWithoutQuery = urlPath.split("?")[0] || "/";
  const decodedPath = decodeURIComponent(pathWithoutQuery);
  const pathWithoutTrailingSlash = decodedPath.length > 1 ? decodedPath.replace(/\/+$/, "") : decodedPath;

  return pathWithoutTrailingSlash || "/";
}

function pageSlugFromPath(urlPath: string): string {
  if (urlPath === "/") {
    return "home";
  }

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
  const canonical = `${SITE_URL}${normalizedPath === "/" ? "/" : normalizedPath}`;

  if (normalizedPath.startsWith("/blog/")) {
    const articleSlug = normalizedPath.replace("/blog/", "");
    const article = articles.find((item) => item.slug === articleSlug);
    const articleId = article?.id ? String(article.id).replace(/[^a-zA-Z0-9_-]/g, '') : null;
    const ogImage = articleId
      ? `${SITE_URL}/og-images/${articleId}.png`
      : `${SITE_URL}/og-images/default.png`;

    return {
      title: article?.seo?.title || (article?.title ? `${article.title} | BoostNow` : DEFAULT_SEO.title),
      description: article?.seo?.description || article?.meta_description || DEFAULT_SEO.description,
      canonical,
      ogImage,
      type: 'article',
    };
  }

  const pageSlug = pageSlugFromPath(normalizedPath);
  const page = pages.find((item) => item.slug === pageSlug);

  return {
    title: page?.seo?.title || (page?.name ? `${page.name} | BoostNow` : DEFAULT_SEO.title),
    description: page?.seo?.description || DEFAULT_SEO.description,
    canonical,
  };
}

function injectSeoMeta(html: string, seo: SeoData): string {
  const ogTags = [
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`,
    `<meta property="og:type" content="${seo.type || 'website'}" />`,
    `<meta property="og:site_name" content="BoostNow" />`,
    `<meta property="og:image" content="${escapeHtml(seo.ogImage || 'https://boostnow.pl/og-images/default.png')}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(seo.ogImage || 'https://boostnow.pl/og-images/default.png')}" />`,
  ].join('\n    ');

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
    // Inject OG/Twitter tags before </head>
    .replace('</head>', `    ${ogTags}\n  </head>`);
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
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
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

  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // Handle blog slug redirects and 404s before SPA fallback
  app.use("/blog/:slug", (req, res, next) => {
    const slug = req.params.slug;
    // 301 redirect for opaque/old slugs
    if (BLOG_REDIRECTS[slug]) {
      return res.redirect(301, `/blog/${BLOG_REDIRECTS[slug]}`);
    }
    // 301 redirect for numeric IDs (old routing)
    if (/^\d+$/.test(slug)) {
      return res.redirect(301, "/blog");
    }
    // 404 for junk/test slugs
    if (JUNK_BLOG_SLUGS.has(slug)) {
      return res.status(404).sendFile(indexHtmlPath);
    }
    next();
  });

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res) => {
    fs.readFile(indexHtmlPath, "utf-8", (error, html) => {
      if (error) {
        res.status(500).send("Unable to load application shell");
        return;
      }

      const seo = buildSeoData(req.originalUrl, cmsPages, articleMetadata);
      res.type("html").send(injectSeoMeta(html, seo));
    });
  });
}
