import fs from "fs";
import path from "path";
import { FAQ as AUDIT_FAQ, SEO as AUDIT_SEO } from "../client/src/components/audit/auditCopy";
import { GEO_FAQ, GEO_FORM_ID, GEO_SEO } from "../shared/geoService";

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

// ── Service schema for offer pages (Agency/B2B requires Organization + Service)

const ORG = { "@type": "Organization", name: "BoostNow", url: BASE };

const FOUNDER = {
  "@type": "Person",
  name: "Mateusz Nowotka",
  jobTitle: "CEO",
  url: BASE + "/mateusz-nowotka",
};

// /audyt-ai-dla-sklepu: one @graph built from the page copy, so the FAQ and
// texts in JSON-LD always match what the page shows.
const AUDIT_URL = AUDIT_SEO.canonical;
const AUDIT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": AUDIT_URL + "#webpage",
      url: AUDIT_URL,
      name: AUDIT_SEO.title,
      description: AUDIT_SEO.description,
      inLanguage: "pl-PL",
      datePublished: AUDIT_SEO.datePublished,
      dateModified: AUDIT_SEO.dateModified,
      isPartOf: { "@type": "WebSite", "@id": BASE + "/#website", url: BASE + "/", name: "BoostNow" },
      author: { "@type": "Person", "@id": BASE + "/mateusz-nowotka#person", name: "Mateusz Nowotka", url: BASE + "/mateusz-nowotka" },
      publisher: { "@id": BASE + "/#organization" },
      about: { "@id": AUDIT_URL + "#service" },
      breadcrumb: { "@id": AUDIT_URL + "#breadcrumb" },
    },
    {
      "@type": "Service",
      "@id": AUDIT_URL + "#service",
      name: "Bezpłatny audyt sklepu pod ChatGPT i AI",
      serviceType: "Audyt gotowości sklepu internetowego na wyszukiwarki AI",
      description:
        "Sprawdzenie, czy ChatGPT, Gemini, Perplexity i Google AI Overviews mogą znaleźć, zrozumieć i porównać ofertę sklepu internetowego. Wynik: najważniejszy problem i trzy priorytety.",
      url: AUDIT_URL,
      provider: { "@type": "Organization", "@id": BASE + "/#organization", name: "BoostNow", url: BASE },
      areaServed: { "@type": "Country", name: "Polska" },
      audience: { "@type": "BusinessAudience", audienceType: "Właściciele sklepów internetowych" },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "PLN",
        url: AUDIT_URL + "#audyt-formularz",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "FAQPage",
      "@id": AUDIT_URL + "#faq",
      mainEntity: AUDIT_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": AUDIT_URL + "#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "BoostNow", item: BASE + "/" },
        { "@type": "ListItem", position: 2, name: "AIO dla e-commerce", item: BASE + "/aio" },
        { "@type": "ListItem", position: 3, name: "Audyt sklepu pod ChatGPT i AI", item: AUDIT_URL },
      ],
    },
  ],
};

// /pozycjonowanie-geo: service with the real price (free audit, then from 800 PLN/month).
const GEO_URL = GEO_SEO.canonical;
const GEO_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": GEO_URL + "#webpage",
      url: GEO_URL,
      name: GEO_SEO.title,
      description: GEO_SEO.description,
      inLanguage: "pl-PL",
      datePublished: GEO_SEO.datePublished,
      dateModified: GEO_SEO.dateModified,
      isPartOf: { "@type": "WebSite", "@id": BASE + "/#website", url: BASE + "/", name: "BoostNow" },
      publisher: { "@id": BASE + "/#organization" },
      about: { "@id": GEO_URL + "#service" },
      breadcrumb: { "@id": GEO_URL + "#breadcrumb" },
    },
    {
      "@type": "Service",
      "@id": GEO_URL + "#service",
      name: "Pozycjonowanie GEO",
      alternateName: ["Generative Engine Optimization", "Pozycjonowanie w ChatGPT i AI"],
      serviceType: "Generative Engine Optimization (GEO)",
      description:
        "Widoczność firmy w odpowiedziach ChatGPT, Gemini, Perplexity i Trybu AI Google. Start od bezpłatnego audytu, potem miesięczna obsługa.",
      url: GEO_URL,
      provider: { "@type": "Organization", "@id": BASE + "/#organization", name: "BoostNow", url: BASE },
      areaServed: { "@type": "Country", name: "Polska" },
      offers: [
        {
          "@type": "Offer",
          name: "Bezpłatny audyt GEO",
          price: "0",
          priceCurrency: "PLN",
          url: GEO_URL + "#" + GEO_FORM_ID,
          availability: "https://schema.org/InStock",
        },
        {
          "@type": "Offer",
          name: "Pozycjonowanie GEO",
          priceCurrency: "PLN",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            minPrice: 800,
            priceCurrency: "PLN",
            unitText: "miesiąc",
          },
          url: GEO_URL + "#" + GEO_FORM_ID,
          availability: "https://schema.org/InStock",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": GEO_URL + "#faq",
      mainEntity: GEO_FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": GEO_URL + "#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "BoostNow", item: BASE + "/" },
        { "@type": "ListItem", position: 2, name: "Pozycjonowanie GEO", item: GEO_URL },
      ],
    },
  ],
};

function serviceSchema(name: string, description: string, routePath: string): any {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: BASE + routePath,
    areaServed: { "@type": "Country", name: "Polska" },
    provider: { ...ORG, founder: FOUNDER },
  };
}

function withServiceSchema(
  map: Record<string, PageMeta>,
  routePath: string,
  name: string
): void {
  const m = map[routePath];
  if (!m || m.schema?.length) return;
  m.schema = [serviceSchema(name, m.description || name, routePath)];
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
    "/audyt-ai-dla-sklepu": {
      title: AUDIT_SEO.title,
      description: AUDIT_SEO.description,
      canonical: AUDIT_SEO.canonical,
      schema: [AUDIT_SCHEMA],
    },
    "/pozycjonowanie-geo": {
      title: GEO_SEO.title,
      description: GEO_SEO.description,
      canonical: GEO_SEO.canonical,
      schema: [GEO_SCHEMA],
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
        "Mateusz Nowotka – założyciel BoostNow, ekspert Generative Engine Optimization (GEO), SEO i AI Marketing. 3 lata doświadczenia w pozycjonowaniu firm w Polsce.",
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
  const merged = { ...cmsMeta, ...articlesMeta, ...staticMeta };
  withServiceSchema(merged, "/aio", "AIO – AI Optimization dla e-commerce");
  withServiceSchema(merged, "/aio-ecommerce", "AIO dla e-commerce");
  withServiceSchema(merged, "/olsztyn", "Agencja SEO i GEO Olsztyn");
  return merged;
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
