import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface GlossaryItem {
  id: string;
  term: string;
  definition: string;
  category: "neuromarketing" | "seo" | "conversion" | "ecommerce" | "psychology";
  relatedTerms?: string[];
  relatedArticles?: Article[];
}

const glossaryItems: GlossaryItem[] = [
  {
    id: "decision-science",
    term: "Decision Science",
    category: "neuromarketing",
    definition: "Nauka o tym, jak ludzie podejmują decyzje. Łączy psychologię, ekonomię behawioralną i neuroscience. W marketingu Decision Science pomaga zrozumieć, co motywuje klienta do zakupu i jak etycznie wpłynąć na jego decyzję.",
    relatedTerms: ["behavioral-economics", "neuromarketing", "cognitive-biases"],
    relatedArticles: [
      {
        id: "psychologia-sprzedazy",
        title: "Psychologia Sprzedaży w E-commerce",
        description: "Dlaczego klienci nie kupują i jak to naprawić",
        url: "/blog/psychologia-sprzedazy-ecommerce"
      },
      {
        id: "audyt-neuromarketingowy",
        title: "Audyt Neuromarketingowy",
        description: "Identyfikacja błędów poznawczych w sprzedaży",
        url: "/blog/audyt-neuromarketingowy"
      }
    ]
  },
  {
    id: "neuromarketing",
    term: "Neuromarketing",
    category: "neuromarketing",
    definition: "Dziedzina marketingu, która wykorzystuje badania z neuroscience do zrozumienia, jak mózg reaguje na bodźce marketingowe (kolory, słowa, obrazy). Neuromarketing pokazuje, że większość decyzji zakupowych jest podejmowana podświadomie.",
    relatedTerms: ["decision-science", "cognitive-biases", "emotional-triggers"],
    relatedArticles: [
      {
        id: "psychologia-sprzedazy",
        title: "Psychologia Sprzedaży w E-commerce",
        description: "Dlaczego klienci nie kupują i jak to naprawić",
        url: "/blog/psychologia-sprzedazy-ecommerce"
      },
      {
        id: "audyt-neuromarketingowy",
        title: "Audyt Neuromarketingowy",
        description: "Identyfikacja błędów poznawczych w sprzedaży",
        url: "/blog/audyt-neuromarketingowy"
      }
    ]
  },
  {
    id: "conversion-rate-optimization",
    term: "Optymalizacja Konwersji (CRO)",
    category: "conversion",
    definition: "Proces systematycznego poprawiania odsetka osób, które wykonują pożądaną akcję (zakup, rejestracja, pobranie). CRO obejmuje A/B testy, analizę UX, optymalizację copywritingu i testowanie hipotez.",
    relatedTerms: ["conversion-funnel", "ab-testing", "user-experience"],
    relatedArticles: [
      {
        id: "jak-zwiekszac-konwersje",
        title: "Jak zwiększyć konwersję w e-commerce",
        description: "Strategie CRO, psychologia klienta, optymalizacja UX",
        url: "/blog/jak-zwiekszac-konwersje-ecommerce"
      },
      {
        id: "cro-marki-premium",
        title: "CRO dla Marek Premium",
        description: "Optymalizacja konwersji dla e-commerce premium",
        url: "/blog/cro-marki-premium"
      },
      {
        id: "visual-ai-wideo",
        title: "Visual AI w Marketingu Wideo",
        description: "Zwiększenie sprzedaży przez animacje",
        url: "/blog/visual-ai-marketing-wideo"
      }
    ]
  },
  {
    id: "cognitive-biases",
    term: "Błędy Poznawcze",
    category: "psychology",
    definition: "Systematyczne błędy w myśleniu, które wpływają na decyzje. Przykłady: anchoring (zakotwiczenie na pierwszej liczbie), scarcity (poczucie braku), social proof (wpływ grupy). Marketerzy etycznie wykorzystują błędy poznawcze do zwiększenia konwersji.",
    relatedTerms: ["anchoring", "scarcity", "social-proof"],
    relatedArticles: [
      {
        id: "jak-zwiekszac-konwersje",
        title: "Jak zwiększyć konwersję w e-commerce",
        description: "Błędy poznawcze w praktyce",
        url: "/blog/jak-zwiekszac-konwersje-ecommerce"
      },
      {
        id: "psychologia-sprzedazy",
        title: "Psychologia Sprzedaży w E-commerce",
        description: "Dlaczego klienci nie kupują",
        url: "/blog/psychologia-sprzedazy-ecommerce"
      },
      {
        id: "audyt-neuromarketingowy",
        title: "Audyt Neuromarketingowy",
        description: "Identyfikacja błędów poznawczych",
        url: "/blog/audyt-neuromarketingowy"
      }
    ]
  },
  {
    id: "anchoring",
    term: "Anchoring (Zakotwiczenie)",
    category: "psychology",
    definition: "Błąd poznawczy, w którym pierwsza liczba, którą widzimy, wpływa na naszą percepcję ceny. Przykład: jeśli widzisz 'Była cena: 1000 zł, teraz 500 zł', zakotwiczasz się na 1000 zł i 500 zł wydaje się taniej.",
    relatedTerms: ["cognitive-biases", "pricing-psychology"]
  },
  {
    id: "scarcity",
    term: "Scarcity (Poczucie Braku)",
    category: "psychology",
    definition: "Błąd poznawczy, w którym ograniczona dostępność (liczba sztuk, czas) zwiększa poczucie pilności i chęć zakupu. Przykład: 'Tylko 3 sztuki w magazynie' lub 'Oferta ważna do jutra'.",
    relatedTerms: ["cognitive-biases", "urgency", "fomo"]
  },
  {
    id: "social-proof",
    term: "Social Proof (Dowód Społeczny)",
    category: "psychology",
    definition: "Tendencja do podejmowania decyzji na podstawie tego, co robią inni. Przykłady: recenzje, liczba sprzedanych produktów, liczba obserwujących. Social proof buduje zaufanie i zwiększa konwersję.",
    relatedTerms: ["cognitive-biases", "trust", "testimonials"]
  },
  {
    id: "conversion-funnel",
    term: "Lejek Konwersji",
    category: "conversion",
    definition: "Ścieżka, którą przechodzi klient od pierwszego kontaktu do konwersji. Etapy: Awareness (świadomość) → Consideration (rozważenie) → Decision (decyzja) → Action (akcja). Optymalizacja każdego etapu zwiększa konwersję.",
    relatedTerms: ["customer-journey", "conversion-rate-optimization"]
  },
  {
    id: "customer-journey",
    term: "Customer Journey (Ścieżka Klienta)",
    category: "ecommerce",
    definition: "Mapa wszystkich touchpoint'ów, w których klient wchodzi w interakcję z marką. Od pierwszego kliknięcia w reklamę, przez przeglądanie produktów, aż do zakupu i obsługi posprzedażowej.",
    relatedTerms: ["conversion-funnel", "user-experience"]
  },
  {
    id: "ab-testing",
    term: "A/B Testing",
    category: "conversion",
    definition: "Metoda testowania, w której porównujesz dwie wersje strony/elementu (A i B) aby zobaczyć, która konwertuje lepiej. Przykład: testowanie niebieskiego vs czerwonego przycisku.",
    relatedTerms: ["conversion-rate-optimization", "multivariate-testing"]
  },
  {
    id: "user-experience",
    term: "User Experience (UX)",
    category: "ecommerce",
    definition: "Doświadczenie użytkownika podczas korzystania ze strony. Obejmuje: szybkość ładowania, łatwość nawigacji, czytelność tekstu, responsywność. Dobry UX zwiększa konwersję i zmniejsza bounce rate.",
    relatedTerms: ["user-interface", "conversion-rate-optimization"]
  },
  {
    id: "bounce-rate",
    term: "Bounce Rate (Wskaźnik Odrzuceń)",
    category: "seo",
    definition: "Procent osób, które opuszczają stronę bez wykonania żadnej akcji. Wysoki bounce rate (>70%) oznacza, że strona nie spełnia oczekiwań użytkownika. Niska konwersja = wysoki bounce rate.",
    relatedTerms: ["user-experience", "conversion-rate"]
  },
  {
    id: "seo",
    term: "SEO (Search Engine Optimization)",
    category: "seo",
    definition: "Proces optymalizacji strony, aby rankować wyżej w wynikach wyszukiwania Google. Obejmuje: keywords, meta tags, backlinki, szybkość strony, mobile-friendly design.",
    relatedTerms: ["keywords", "backlinks", "meta-tags"]
  },
  {
    id: "keywords",
    term: "Keywords (Słowa Kluczowe)",
    category: "seo",
    definition: "Słowa i frazy, które ludzie wpisują w Google. Przykład: 'agencja neuromarketingowa', 'optymalizacja konwersji', 'e-commerce'. Badanie keywords pomaga zrozumieć, czego szukają klienci.",
    relatedTerms: ["seo", "long-tail-keywords"]
  },
  {
    id: "long-tail-keywords",
    term: "Long-Tail Keywords",
    category: "seo",
    definition: "Dłuższe, bardziej specyficzne frazy (3+ słowa). Przykład: 'jak zwiększyć konwersję w sklepie internetowym' zamiast 'konwersja'. Long-tail keywords mają mniej konkurencji i wyższą konwersję.",
    relatedTerms: ["keywords", "seo"]
  },
  {
    id: "meta-tags",
    term: "Meta Tags",
    category: "seo",
    definition: "Informacje o stronie, które widzą wyszukiwarki. Główne: title (tytuł), description (opis), keywords (słowa kluczowe). Meta tags wpływają na ranking i CTR w wynikach wyszukiwania.",
    relatedTerms: ["seo", "schema-markup"]
  },
  {
    id: "schema-markup",
    term: "Schema Markup",
    category: "seo",
    definition: "Kod, który mówi wyszukiwarkom, co zawiera strona. Przykład: Schema dla FAQ, Product, Article. Schema Markup pomaga Google lepiej zrozumieć treść i wyświetlić rich results.",
    relatedTerms: ["seo", "structured-data"]
  },
  {
    id: "copywriting",
    term: "Copywriting",
    category: "conversion",
    definition: "Sztuka pisania tekstu, który sprzedaje. Dobry copywriting: rozumie problemy klienta, pokazuje benefity (nie features), buduje zaufanie, ma jasny CTA. Copywriting oparty na psychologii zwiększa konwersję.",
    relatedTerms: ["conversion-rate-optimization", "emotional-triggers"]
  },
  {
    id: "emotional-triggers",
    term: "Emotional Triggers (Wyzwalacze Emocji)",
    category: "psychology",
    definition: "Słowa, obrazy lub sytuacje, które wyzwalają emocje (strach, radość, zaufanie). Marketerzy wykorzystują emotional triggers w copywritingu, designie i reklamach. Przykład: 'Nie stracisz tej okazji' wyzwala strach przed stratą.",
    relatedTerms: ["copywriting", "neuromarketing"]
  },
  {
    id: "ctr",
    term: "CTR (Click-Through Rate)",
    category: "seo",
    definition: "Procent osób, które klikają na Twoją stronę w wynikach wyszukiwania. Dobry CTR (>5%) oznacza, że title i description są atrakcyjne. Zwiększenie CTR zwiększa traffic bez dodatkowych kosztów.",
    relatedTerms: ["seo", "meta-tags"]
  },
  {
    id: "roas",
    term: "ROAS (Return on Ad Spend)",
    category: "ecommerce",
    definition: "Stosunek przychodu do wydatków na reklamy. Przykład: jeśli wydałeś 1000 zł na reklamy i zarabiasz 5000 zł, ROAS = 5. ROAS 3+ to dobry wynik.",
    relatedTerms: ["conversion-rate", "roi"]
  }
];

const categories = [
  { id: "all", label: "Wszystkie" },
  { id: "neuromarketing", label: "Neuromarketing" },
  { id: "seo", label: "SEO" },
  { id: "conversion", label: "Konwersja" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "psychology", label: "Psychologia" }
];

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems = glossaryItems.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // JSON-LD Schema for Glossary
  const glossarySchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "BoostNow Słownik Pojęć",
    "description": "Słownik pojęć z zakresu neuromarketingu, SEO, optymalizacji konwersji i psychologii e-commerce",
    "hasDefinedTerm": glossaryItems.map(item => ({
      "@type": "DefinedTerm",
      "name": item.term,
      "description": item.definition,
      "inDefinedTermSet": "https://boostnow.pl/glossary"
    }))
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />

      <div className="min-h-screen bg-background pt-20 lg:pt-24">
        <Helmet>
          <title>Słownik Pojęć - Neuromarketing, SEO, CRO | BoostNow</title>
          <meta name="robots" content="index, follow" />
          <meta name="description" content="Słownik pojęć z zakresu neuromarketingu, SEO, optymalizacji konwersji i psychologii e-commerce. 20+ definicji dla marketerów i przedsiębiorców." />
          <meta name="keywords" content="słownik neuromarketing, decision science, CRO, SEO, psychologia konwersji, e-commerce" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://boostnow.pl/glossary" />
          <meta property="og:title" content="Słownik Pojęć - Neuromarketing, SEO, CRO" />
          <meta property="og:description" content="Kompletny słownik pojęć z zakresu neuromarketingu i optymalizacji konwersji" />
          <link rel="canonical" href="https://boostnow.pl/glossary" />
        </Helmet>

        <main>
          <section className="py-20 bg-black">
            <div className="container max-w-4xl">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Słownik Pojęć
                </h1>
                <p className="text-gray-400 text-lg">
                  Kompletny słownik neuromarketingu, SEO, CRO i psychologii e-commerce
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative mb-12">
                <Search className="absolute left-4 top-3 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Szukaj pojęcia..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-800 focus:border-lime-400 focus:outline-none"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 mb-12 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      activeCategory === cat.id
                        ? "bg-lime-400 text-black"
                        : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Glossary Items */}
              <div className="space-y-4">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
                    >
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-white">{item.term}</h3>
                        <span className="text-sm text-lime-400">
                          {categories.find(c => c.id === item.category)?.label}
                        </span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-gray-500 transition-transform ${
                          expandedId === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedId === item.id && (
                      <div className="px-6 py-4 bg-gray-950 border-t border-gray-800">
                        <p className="text-gray-300 mb-4">{item.definition}</p>
                        
                        {/* Related Articles Section */}
                        {item.relatedArticles && item.relatedArticles.length > 0 && (
                          <div className="mb-6 pb-6 border-b border-gray-800">
                            <p className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                              <span>📚</span> Powiązane Artykuły
                            </p>
                            <div className="grid md:grid-cols-2 gap-3">
                              {item.relatedArticles.map(article => (
                                <a
                                  key={article.id}
                                  href={article.url}
                                  className="group block"
                                >
                                  <div className="bg-gray-800 rounded p-3 hover:bg-gray-700 transition-colors border border-gray-700 hover:border-lime-400">
                                    <h4 className="text-sm font-semibold text-lime-400 group-hover:text-lime-300 mb-1 line-clamp-2">
                                      {article.title}
                                    </h4>
                                    <p className="text-xs text-gray-400 line-clamp-2">{article.description}</p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {item.relatedTerms && item.relatedTerms.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-400 mb-2">Powiązane terminy:</p>
                            <div className="flex flex-wrap gap-2">
                              {item.relatedTerms.map(term => (
                                <button
                                  key={term}
                                  onClick={() => {
                                    const relatedItem = glossaryItems.find(i => i.id === term);
                                    if (relatedItem) {
                                      setSearchTerm(relatedItem.term);
                                      setExpandedId(term);
                                    }
                                  }}
                                  className="text-sm px-3 py-1 bg-gray-800 text-lime-400 rounded hover:bg-gray-700 transition-colors"
                                >
                                  {glossaryItems.find(i => i.id === term)?.term}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400">Brak wyników dla '{searchTerm}'</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
