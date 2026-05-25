import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

const SITE_URL = "https://boostnow.pl";

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

    return {
      title: article?.seo?.title || (article?.title ? `${article.title} | BoostNow` : DEFAULT_SEO.title),
      description: article?.seo?.description || article?.meta_description || DEFAULT_SEO.description,
      canonical,
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
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    );
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
