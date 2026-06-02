import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { META_MAP } from "../page-meta";

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

function getIndexHtml(distPath: string): string {
  if (!indexHtmlCache) {
    indexHtmlCache = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");
  }
  return indexHtmlCache;
}

function injectPageMeta(html: string, reqPath: string): string {
  const normalised = reqPath.endsWith("/") && reqPath !== "/" ? reqPath.slice(0, -1) : reqPath;
  const meta = META_MAP[normalised] ?? META_MAP[normalised + "/"];
  if (!meta) return html;

  const lines = [
    `<title>${meta.title.replace(/</g, "&lt;")}</title>`,
    `<meta name="description" content="${meta.description.replace(/"/g, "&quot;")}" />`,
    `<link rel="canonical" href="${meta.canonical}" />`,
  ].join("\n    ");

  return html.replace("</head>", `  ${lines}\n  </head>`);
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

  app.use(express.static(distPath));

  // Serve index.html for all routes; inject per-page meta for known bots
  app.use("*", (req, res) => {
    const ua = (req.headers["user-agent"] as string) || "";
    if (BOT_RE.test(ua)) {
      const base = getIndexHtml(distPath);
      const html = injectPageMeta(base, req.path);
      res.status(200).type("html").send(html);
    } else {
      res.sendFile(path.resolve(distPath, "index.html"));
    }
  });
}
