import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { getMetaForPath } from "../page-meta";

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

// Bots that don't execute JavaScript but crawl HTML
const BOT_RE =
  /GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|PerplexityBot|Google-Extended|GoogleOther|Googlebot|Bingbot|YandexBot|DuckDuckBot|Applebot/i;

let indexHtmlCache: string | null = null;

// index.html is the prerendered homepage (scripts/prerender-site.ts); spa.html
// is the bare shell for every other route. Older builds only have index.html.
function shellFile(distPath: string): string {
  const spa = path.resolve(distPath, "spa.html");
  return fs.existsSync(spa) ? spa : path.resolve(distPath, "index.html");
}

function getIndexHtml(distPath: string): string {
  if (!indexHtmlCache) {
    indexHtmlCache = fs.readFileSync(shellFile(distPath), "utf-8");
  }
  return indexHtmlCache;
}

/** dist/public/<route>/index.html written by the prerender, if any. */
function prerenderedFile(distPath: string, reqPath: string): string | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(reqPath);
  } catch {
    return null; // malformed %-escape
  }
  const clean = path.posix.normalize(decoded).replace(/\/+$/, "");
  if (!clean || clean.includes("..")) return null;
  const file = path.resolve(distPath, "." + clean, "index.html");
  return file.startsWith(distPath) && fs.existsSync(file) ? file : null;
}

function injectPageMeta(html: string, reqPath: string): string {
  const meta = getMetaForPath(reqPath);
  if (!meta) return html;

  const lines = [
    `<title>${meta.title.replace(/</g, "&lt;")}</title>`,
    `<meta name="description" content="${meta.description.replace(/"/g, "&quot;")}" />`,
    `<link rel="canonical" href="${meta.canonical}" />`,
  ];

  // Inject JSON-LD schema (Article + FAQPage) so non-JS AI crawlers
  // (GPTBot, PerplexityBot, ClaudeBot, …) see structured data without
  // executing the React app.
  if (meta.schema?.length) {
    for (const s of meta.schema) {
      const json = JSON.stringify(s).replace(/<\/script/gi, "<\\/script");
      lines.push(`<script type="application/ld+json">${json}</script>`);
    }
  }

  // Replace (not append to) the shell's own title / description / canonical,
  // otherwise crawlers see two <title> and two canonicals (the first pointing
  // at the homepage).
  const stripped = html
    .replace(/<title>[\s\S]*?<\/title>\s*/gi, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "");

  return stripped.replace("</head>", `  ${lines.join("\n    ")}\n  </head>`);
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // redirect:false — no 301 from /blog/x to /blog/x/ for prerendered folders.
  app.use(express.static(distPath, { redirect: false }));

  // Serve index.html for all routes; inject per-page meta for known bots
  app.use("*", (req, res) => {
    // Prerendered page for this route: same HTML for bots and browsers.
    const pre = prerenderedFile(distPath, (req.originalUrl || "/").split("?")[0]);
    if (pre) {
      res.sendFile(pre);
      return;
    }
    const ua = (req.headers["user-agent"] as string) || "";
    if (BOT_RE.test(ua)) {
      // In an app.use("*") handler req.path is always "/"; use originalUrl
      // (minus query string) to get the real requested path.
      const reqPath = (req.originalUrl || req.url || "/").split("?")[0];
      const base = getIndexHtml(distPath);
      // Unknown /blog/<slug> (typo, stale slug, Airtable record id) must not
      // be a soft-404 that canonicalises to the homepage: answer 404 + noindex.
      if (reqPath.startsWith("/blog/") && !getMetaForPath(reqPath)) {
        const notFound = base.replace(
          "</head>",
          `  <meta name="robots" content="noindex" />\n  </head>`
        );
        res.status(404).type("html").send(notFound);
        return;
      }
      const html = injectPageMeta(base, reqPath);
      res.status(200).type("html").send(html);
    } else {
      res.sendFile(shellFile(distPath));
    }
  });
}
