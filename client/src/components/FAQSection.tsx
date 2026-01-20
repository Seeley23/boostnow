import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "services" | "process" | "general";
}

const faqItems: FAQItem[] = [
  // SERVICES CATEGORY
  {
    id: "services-1",
    category: "services",
    question: "Co zawiera usługa Inżynieria Konwersji?",
    answer: "Inżynieria Konwersji to kompleksowa analiza Twojej ścieżki klienta z perspektywy psychologii decyzji. Mapujemy lęki, motywacje i błędy poznawcze. Następnie budujemy system komunikacji (copywriting, design, CTA) oparty na Decision Science. Rezultat: zoptymalizowana ścieżka konwersji dla Twojej grupy docelowej.",
  },
  {
    id: "services-2",
    category: "services",
    question: "Jakie usługi obejmuje Video Animation?",
    answer: "Video Animation to dynamiczne animacje, które przyciągają wzrok i konwertują. Tworzymy: explainer videos (jak działa produkt), product demos (prezentacja funkcji), social media content (krótkie, viralne animacje), landing page videos (hero section animacje). Każda animacja jest dostosowana do Twojej branży i grupy docelowej.",
  },
  {
    id: "services-3",
    category: "services",
    question: "Co to jest GEO Positioning?",
    answer: "GEO Positioning to optymalizacja Twojej marki dla AI search engines (ChatGPT, Perplexity, Gemini). Tworzymy treści, które AI rozumie i rekomenduje. Budujemy Semantic Anchors (unikalne terminy marki), strukturyzujemy dane, optymalizujemy meta tags. Cel: pojawienie się Twojej marki w odpowiedziach AI na pytania potencjalnych klientów.",
  },
  {
    id: "services-4",
    category: "services",
    question: "Czym się różni SEO Positioning od tradycyjnego SEO?",
    answer: "SEO Positioning to strategia oparta na Decision Science, a nie tylko na keywords. Nie tylko rankujemy w Google - budujemy autorytet i zaufanie. Tworzymy treści, które odpowiadają na rzeczywiste pytania klientów, nie tylko na słowa kluczowe. Rezultat: lepsze rankingi + wyższa konwersja z organic traffic.",
  },
  {
    id: "services-5",
    category: "services",
    question: "Czy usługi działają dla mojej branży?",
    answer: "Nasze usługi działają dla każdej branży: E-commerce, Marki Premium, B2B, Usługi, Hospitality, Real Estate, Healthcare, EdTech. Personalizujemy strategię w zależności od Twojej branży i grupy docelowej. Na stronie głównej znajdziesz 'Personalizowanie w zależności od branży' - tam zobaczysz konkretne rozwiązania dla Twojej branży.",
  },
  // PROCESS CATEGORY
  {
    id: "process-1",
    category: "process",
    question: "Jak wygląda pierwszy krok współpracy?",
    answer: "Zaczynamy od Audytu Psychologicznego - 1-2 godzinne sesje, gdzie mapujemy Twoją grupę docelową, ich lęki, motywacje i błędy poznawcze. Zbieramy dane o Twoim biznesie, konkurencji i rynku. Na koniec dostajesz raport z rekomendacjami i planem działania.",
  },
  {
    id: "process-2",
    category: "process",
    question: "Ile czasu zajmuje pełny cykl wdrożenia?",
    answer: "Faza 1 (Audyt): 1-2 tygodnie. Faza 2 (Strategia): 1-2 tygodnie. Faza 3 (Wdrożenie): 1-2 tygodnie. Razem: 4-6 tygodni od startu do pierwszych wyników. Po tym okresie rozpoczyna się faza optymizacji, która trwa nieprzerwanie.",
  },
  {
    id: "process-3",
    category: "process",
    question: "Czy mogę być zaangażowany w proces?",
    answer: "Tak! Współpraca z Tobą jest kluczowa. Przeprowadzamy regularne sesje strategiczne, gdzie omawiamy postępy, wyzwania i następne kroki. Twoja wiedza o rynku i klientach jest nieoceniona. Jesteśmy partnerem, nie tylko dostawcą usług.",
  },
  {
    id: "process-4",
    category: "process",
    question: "Czy mogę rozszerzyć usługi w trakcie współpracy?",
    answer: "Oczywiście! Możesz dodać nowe usługi w dowolnym momencie. Jeśli zacząłeś od Inżynierii Konwersji, możesz dodać Video Animation, GEO Positioning lub inne usługi. Dostosujemy plan i harmonogram do Twoich potrzeb.",
  },
  // GENERAL CATEGORY
  {
    id: "general-cro-1",
    category: "general",
    question: "Jak zwiększyć konwersję w sklepie internetowym?",
    answer: "Konwersja wzrasta, gdy rozumiesz psychologię swojego klienta. Mapujemy jego lęki, motywacje i błędy poznawcze. Następnie optymalizujemy całą ścieżkę: od landing page'a, przez product page, aż po checkout. Nasze klienty widzą wzrost konwersji o 30-150% w ciągu 90 dni.",
  },
  {
    id: "general-cro-2",
    category: "general",
    question: "Czym jest Optymalizacja Konwersji (CRO) w wydaniu BoostNow?",
    answer: "CRO to nie tylko A/B testy. To głęboka analiza psychologiczna Twojej ścieżki klienta. Badamy, gdzie klienci się zatrzymują, czemu porzucają koszyk, jakie emocje odczuwają. Na podstawie Decision Science budujemy system komunikacji, który konwertuje.",
  },
  {
    id: "general-neuro-1",
    category: "general",
    question: "Jak psychologia wpływa na sprzedaż w e-commerce?",
    answer: "Psychologia jest fundamentem sprzedaży. Klient nie decyduje racjonalnie - decyduje emocjonalnie. Błędy poznawcze (anchoring, scarcity, social proof) wpływają na każdą decyzję zakupową. Nasza metoda wykorzystuje te błędy etycznie, aby zwiększyć sprzedaż.",
  },
  {
    id: "general-video-1",
    category: "general",
    question: "Dlaczego animacje wideo sprzedają lepiej niż zdjęcia?",
    answer: "Wideo przyciąga uwagę 80% szybciej niż tekst. Animacje produktowe pokazują funkcjonalność w akcji, co zdjęcia nie potrafią. Nasze Video Animation to nie tylko piękne - to konwertujące. Każda klatka jest zaprojektowana, aby wyzwolić emocję i skłonić do decyzji.",
  },
  {
    id: "general-1",
    category: "general",
    question: "Jakie metryki będę monitorować?",
    answer: "Monitorujemy: Konwersję (ile osób podejmuje decyzję), Rezygnację (ile osób porzuca proces), Czas do konwersji (jak szybko klient decyduje), Wartość lifetime klienta (długoterminowy zysk), Engagement (zaangażowanie z treścią). Dostajesz raport co tydzień.",
  },
  {
    id: "general-2",
    category: "general",
    question: "Jak długo trwa minimalna umowa?",
    answer: "Minimalna umowa to 3 miesiące. Po tym okresie możesz kontynuować, zmienić zakres usług lub rozwiązać umowę. Nie ma ukrytych kosztów ani kar za rozwiązanie. Chcemy, żebyś był zadowolony z naszej współpracy.",
  },
  {
    id: "general-3",
    category: "general",
    question: "Jaki jest proces onboardingu?",
    answer: "Onboarding trwa 3-5 dni. Zbieramy informacje o Twojej firmie, produktach, klientach i konkurencji. Tworzymy plan działania i harmonogram. Przeprowadzamy szkolenie zespołu. Jesteśmy dostępni 24/7 w razie pytań.",
  },
];

export default function FAQSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<"services" | "process" | "general">("services");

  const filteredFAQs = faqItems.filter((item) => item.category === activeCategory);

  // JSON-LD Schema for FAQ (all items for Google Rich Results)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      {/* JSON-LD Schema for FAQ - Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <section className="py-20 bg-black">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-lime-400 text-sm font-semibold mb-2">NAJCZĘSTSZE PYTANIA</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Odpowiedzi na Twoje <span className="text-lime-400">pytania</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Wszystko co musisz wiedzieć o usługach, procesie i współpracy z BoostNow.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-4 mb-12 justify-center flex-wrap">
            {["services", "process", "general"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat as "services" | "process" | "general");
                  setExpandedId(null);
                }}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-lime-400 text-black"
                    : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {cat === "services" && "Usługi"}
                {cat === "process" && "Proces"}
                {cat === "general" && "Ogólne"}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFAQs.map((item) => (
              <div
                key={item.id}
                className="border border-gray-800 rounded-lg overflow-hidden hover:border-lime-400/50 transition-colors"
              >
                <button
                  onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-900/50 hover:bg-gray-900 transition-colors"
                >
                  <h3 className="text-left text-white font-semibold text-lg">{item.question}</h3>
                  <ChevronDown
                    className={`w-6 h-6 text-lime-400 flex-shrink-0 transition-transform ${
                      expandedId === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedId === item.id && (
                  <div className="px-6 py-4 bg-black border-t border-gray-800">
                    <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">Nie znalazłeś odpowiedzi na swoje pytanie?</p>
            <button className="px-8 py-4 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors">
              Skontaktuj się z nami
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
