import fs from "fs";
import path from "path";

const BASE = "https://boostnow.pl";

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  /** JSON-LD schema objects (e.g. Article + FAQPage) for non-JS crawlers. */
  schema?: any[];
}

// ── Runtime file loaders ──────────────────────────────────────────────────────

function readJson(candidates: string[]): any {
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      try { return JSON.parse(fs.readFileSync(p, "utf-8")); } catch { /* try next */ }
    }
  }
  return null;
}

function findCmsJson(): any {
  return readJson([
    path.resolve(process.cwd(), "client/src/data/blog/website-cms.json"),
    path.resolve(import.meta.dirname, "../../client/src/data/blog/website-cms.json"),
  ]) ?? { pages: [] };
}

function findArticlesMetadata(): any[] {
  return readJson([
    path.resolve(process.cwd(), "client/src/data/blog/articles-metadata.json"),
    path.resolve(import.meta.dirname, "../../client/src/data/blog/articles-metadata.json"),
  ]) ?? [];
}

// ── Meta map builder ──────────────────────────────────────────────────────────

function buildMetaMap(): Record<string, PageMeta> {
  // 1. CMS pages (source of truth: Airtable → website-cms.json)
  const cmsData = findCmsJson();
  const cmsMeta: Record<string, PageMeta> = {};
  (cmsData.pages ?? []).forEach((page: any) => {
    const slug: string | undefined = page.slug;
    if (!slug || slug === "?") return;
    const routePath = slug === "home" ? "/" : "/" + slug;
    const seo = page.seo ?? {};
    cmsMeta[routePath] = {
      title: seo.title || page.name || "BoostNow",
      description: seo.description || "",
      canonical: BASE + routePath,
    };
  });

  // 2. Blog articles — dynamic from articles-metadata.json (Airtable → sync → file)
  //    Any new article added in Airtable with a Slug field will appear here
  //    automatically after npm run sync, without touching this file.
  const articles = findArticlesMetadata();
  const articlesMeta: Record<string, PageMeta> = {};
  articles.forEach((a: any) => {
    if (!a.slug) return;
    const routePath = `/blog/${a.slug}`;
    // schemaJson may be a single object, an array, or a {"@graph": [...]} wrapper
    let schema: any[] | undefined;
    if (a.schemaJson) {
      schema = Array.isArray(a.schemaJson)
        ? a.schemaJson
        : a.schemaJson["@graph"]
          ? [a.schemaJson] // keep @graph wrapper intact as one script
          : [a.schemaJson];
    }
    articlesMeta[routePath] = {
      title: (a.seoTitle && a.seoTitle !== a.title ? a.seoTitle : a.title) || "BoostNow Blog",
      description: a.meta_description || "",
      canonical: BASE + routePath,
      schema,
    };
  });

  // 3. Hardcoded static pages (not in Airtable)
  const staticMeta: Record<string, PageMeta> = {
    "/aio": {
      title: "AIO – AI Optimization dla E-commerce | BoostNow",
      description:
        "Zwiększ sprzedaż w sklepie internetowym dzięki AI Optimization. BoostNow pomaga e-commerce zdominować wyszukiwarki AI: ChatGPT, Perplexity, Gemini. Darmowy audyt.",
      canonical: BASE + "/aio",
    },
    "/calculator": {
      title: "Kalkulator ROI Marketingowego | BoostNow",
      description:
        "Oblicz zwrot z inwestycji w marketing i SEO. Bezpłatny kalkulator ROI dla e-commerce i firm usługowych.",
      canonical: BASE + "/calculator",
    },
    "/mateusz-nowotka": {
      title: "Mateusz Nowotka – Ekspert GEO & SEO | BoostNow",
      description:
        "Mateusz Nowotka – założyciel BoostNow, ekspert Generative Engine Optimization (GEO), SEO i AI Marketing. Ponad 5 lat doświadczenia w pozycjonowaniu firm w Polsce.",
      canonical: BASE + "/mateusz-nowotka",
    },
    "/glossary": {
      title: "Słownik AI i SEO | BoostNow",
      description:
        "Kompletny słownik pojęć z zakresu GEO, SEO, AI i marketingu cyfrowego.",
      canonical: BASE + "/glossary",
    },
    "/regulamin": {
      title: "Regulamin | BoostNow",
      description: "Regulamin świadczenia usług agencji BoostNow.",
      canonical: BASE + "/regulamin",
    },
    "/polityka-prywatnosci": {
      title: "Polityka Prywatności | BoostNow",
      description:
        "Polityka prywatności serwisu boostnow.pl. Dowiedz się, jak przetwarzamy Twoje dane osobowe.",
      canonical: BASE + "/polityka-prywatnosci",
    },
    "/polityka-cookies": {
      title: "Polityka Cookies | BoostNow",
      description:
        "Polityka plików cookies serwisu boostnow.pl.",
      canonical: BASE + "/polityka-cookies",
    },
    "/blog/jak-zwiekszac-konwersje-ecommerce": {
      title: "Jak Zwiększać Konwersje w E-commerce | BoostNow",
      description:
        "Sprawdzone strategie zwiększania konwersji w sklepie internetowym. Psychologia decyzji, CRO, UX i AI.",
      canonical: BASE + "/blog/jak-zwiekszac-konwersje-ecommerce",
    },
  };

  // Priority: static > articles (Airtable) > CMS pages
  // Articles override static only for /blog/* routes — intentional
  return { ...cmsMeta, ...articlesMeta, ...staticMeta };
}

// ── Public API ────────────────────────────────────────────────────────────────

let currentMap: Record<string, PageMeta> = buildMetaMap();

export function getMetaForPath(reqPath: string): PageMeta | undefined {
  const norm = reqPath.endsWith("/") && reqPath !== "/" ? reqPath.slice(0, -1) : reqPath;
  return currentMap[norm] ?? currentMap[norm + "/"];
}

/** Call after sync-airtable runs to pick up new slugs without server restart. */
export function reloadMetaMap(): void {
  currentMap = buildMetaMap();
  console.log("[page-meta] Meta map reloaded —", Object.keys(currentMap).length, "routes");
}
