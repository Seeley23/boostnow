import websiteCms from "../client/src/data/blog/website-cms.json";

const BASE = "https://boostnow.pl";

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

// Build from website-cms.json (sync-airtable source of truth)
const cmsMeta: Record<string, PageMeta> = {};
(websiteCms as any).pages?.forEach((page: any) => {
  const slug: string | undefined = page.slug;
  if (!slug || slug === "?") return;
  const path = slug === "home" ? "/" : "/" + slug;
  const seo = page.seo || {};
  cmsMeta[path] = {
    title: seo.title || page.name || "BoostNow",
    description: seo.description || "",
    canonical: BASE + path,
  };
});

const META_MAP: Record<string, PageMeta> = {
  ...cmsMeta,

  // Hardcoded React pages
  "/aio": {
    title: "AIO – AI Optimization dla E-commerce | BoostNow",
    description:
      "Zwiększ sprzedaż w sklepie internetowym dzięki AI Optimization. BoostNow pomaga e-commerce zdominować wyszukiwarki AI: ChatGPT, Perplexity, Gemini. Darmowy audyt.",
    canonical: BASE + "/aio",
  },
  "/calculator": {
    title: "Kalkulator ROI Marketingowego | BoostNow",
    description:
      "Oblicz zwrot z inwestycji w marketing i SEO. Bezpłatny kalkulator ROI dla e-commerce i firm usługowych. Sprawdź, ile możesz zyskać.",
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
      "Kompletny słownik pojęć z zakresu GEO, SEO, AI i marketingu cyfrowego. Definicje: GEO, AEO, llms.txt, AI Overviews, schema markup, E-E-A-T i wiele więcej.",
    canonical: BASE + "/glossary",
  },
  "/regulamin": {
    title: "Regulamin | BoostNow",
    description: "Regulamin świadczenia usług agencji BoostNow.",
    canonical: BASE + "/regulamin",
  },
  "/polityka-prywatnosci": {
    title: "Polityka Prywatności | BoostNow",
    description: "Polityka prywatności serwisu boostnow.pl. Dowiedz się, jak przetwarzamy Twoje dane osobowe.",
    canonical: BASE + "/polityka-prywatnosci",
  },
  "/polityka-cookies": {
    title: "Polityka Cookies | BoostNow",
    description: "Polityka plików cookies serwisu boostnow.pl. Informacje o rodzajach cookies i sposobie ich zarządzania.",
    canonical: BASE + "/polityka-cookies",
  },

  // Hardcoded blog article
  "/blog/jak-zwiekszac-konwersje-ecommerce": {
    title: "Jak Zwiększać Konwersje w E-commerce | BoostNow",
    description:
      "Sprawdzone strategie zwiększania konwersji w sklepie internetowym. Psychologia decyzji, CRO, UX i AI – kompletny przewodnik dla e-commerce.",
    canonical: BASE + "/blog/jak-zwiekszac-konwersje-ecommerce",
  },

  // Airtable blog articles
  "/blog/llms-txt": {
    title: "Czym jest llms.txt i dlaczego warto go mieć | BoostNow",
    description:
      "Poznaj plik llms.txt – narzędzie, które mówi modelom AI (ChatGPT, Claude, Gemini), jak interpretować Twoją stronę. Przewodnik wdrożenia krok po kroku.",
    canonical: BASE + "/blog/llms-txt",
  },
  "/blog/pozycjonowanie-geo": {
    title: "Pozycjonowanie GEO – Kompletny Przewodnik 2025 | BoostNow",
    description:
      "Czym jest GEO (Generative Engine Optimization)? Jak pozycjonować firmę w ChatGPT, Perplexity i Gemini? Kompletny przewodnik po pozycjonowaniu w wyszukiwarkach AI.",
    canonical: BASE + "/blog/pozycjonowanie-geo",
  },
  "/blog/geo-pozycjonowanie": {
    title: "GEO Pozycjonowanie – Jak Działać w Epoce AI | BoostNow",
    description:
      "GEO pozycjonowanie to przyszłość SEO. Dowiedz się, jak zoptymalizować swoją stronę pod wyszukiwarki generatywne i zdobyć widoczność w odpowiedziach AI.",
    canonical: BASE + "/blog/geo-pozycjonowanie",
  },
  "/blog/pozycjonowanie-w-ai": {
    title: "Pozycjonowanie w AI – Strategie i Techniki | BoostNow",
    description:
      "Jak pozycjonować się w wynikach generowanych przez AI? Poznaj strategie GEO, AEO i AI Search Optimization, które pomagają firmom być cytowanymi przez modele językowe.",
    canonical: BASE + "/blog/pozycjonowanie-w-ai",
  },
  "/blog/agencja-seo-ai": {
    title: "Agencja SEO i AI – Jak Wybrać Partnera | BoostNow",
    description:
      "Jak wybrać agencję SEO, która rozumie AI i GEO? Sprawdź, na co zwrócić uwagę, pytania do agencji i czerwone flagi. Praktyczny przewodnik dla przedsiębiorców.",
    canonical: BASE + "/blog/agencja-seo-ai",
  },
  "/blog/ai-seo": {
    title: "AI SEO – Optymalizacja Pod Algorytmy AI | BoostNow",
    description:
      "AI SEO to nowe podejście do pozycjonowania uwzględniające algorytmy oparte na sztucznej inteligencji. Dowiedz się, jak adaptować strategię SEO do ery generatywnego AI.",
    canonical: BASE + "/blog/ai-seo",
  },
  "/blog/widocznosc-w-chatgpt": {
    title: "Jak Zwiększyć Widoczność w ChatGPT | BoostNow",
    description:
      "Praktyczny przewodnik po zwiększaniu widoczności marki w ChatGPT. Poznaj techniki GEO, które sprawiają, że AI cytuje Twoją firmę w odpowiedziach.",
    canonical: BASE + "/blog/widocznosc-w-chatgpt",
  },
  "/blog/aeo-co-to-jest": {
    title: "AEO – Answer Engine Optimization: Co To Jest? | BoostNow",
    description:
      "AEO (Answer Engine Optimization) to optymalizacja pod wyszukiwarki odpowiedzi. Dowiedz się, czym różni się od SEO i jak wdrożyć strategię AEO dla swojej firmy.",
    canonical: BASE + "/blog/aeo-co-to-jest",
  },
  "/blog/generative-engine-optimization": {
    title: "Generative Engine Optimization (GEO) – Przewodnik | BoostNow",
    description:
      "Czym jest Generative Engine Optimization? GEO to strategia, która sprawia, że Twoja marka pojawia się w wynikach generowanych przez AI. Kompletny poradnik.",
    canonical: BASE + "/blog/generative-engine-optimization",
  },
  "/blog/seo-pod-ai-overviews": {
    title: "SEO Pod AI Overviews w Google – Jak Się Przygotować | BoostNow",
    description:
      "Google AI Overviews zmieniają SEO. Dowiedz się, jak zoptymalizować treści, by pojawiać się w AI-generowanych podsumowaniach wyników wyszukiwania Google.",
    canonical: BASE + "/blog/seo-pod-ai-overviews",
  },
};

export { META_MAP };
export type { PageMeta };
