import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

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
    question: "Co to jest pozycjonowanie w AI (GEO)?",
    answer: "Pozycjonowanie w AI, czyli GEO (Generative Engine Optimization), to praca nad tym, żeby ChatGPT, Perplexity, Gemini i Google AI Overviews cytowały Twoją stronę i polecały Twoją firmę w odpowiedziach. Jako agencja SEO AI sprawdzamy, czy roboty AI mają dostęp do strony, piszemy treści z bezpośrednimi odpowiedziami na pytania klientów, wdrażamy dane strukturalne i budujemy wzmianki o marce w zewnętrznych serwisach.",
  },
  {
    id: "services-4",
    category: "services",
    question: "Czym różni się GEO od SEO?",
    answer: "SEO walczy o pozycję strony w wynikach Google, a GEO o to, żeby asystent AI wymienił Twoją firmę w gotowej odpowiedzi. Jedno nie zastępuje drugiego: odpowiedzi AI często opierają się na stronach, które są wysoko w Google. Dlatego prowadzimy SEO i GEO razem, na przykład dla Caruma: 151 tys. wyświetleń w Google w 90 dni i 50 wizyt z Gemini i Perplexity.",
  },
  {
    id: "services-6",
    category: "services",
    question: "Jak sprawić, żeby ChatGPT polecał moją firmę?",
    answer: "Nie da się tego zagwarantować, ale da się zwiększyć szansę. Potrzebne są: strona dostępna dla robotów AI, treści, które odpowiadają wprost na pytania klientów, case studies z nazwami klientów i liczbami, spójne dane firmy w całym internecie oraz wzmianki w rankingach i serwisach branżowych. Od tego zaczynamy bezpłatną analizę widoczności w AI.",
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

interface FAQSectionProps {
  title?: string;
  description?: string;
}

export default function FAQSection({ title, description }: FAQSectionProps = {}) {
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-lime-400 text-sm font-semibold mb-2">NAJCZĘSTSZE PYTANIA</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
              Odpowiedzi na Twoje <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">pytania</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Wszystko co musisz wiedzieć o usługach, procesie i współpracy z BoostNow.
            </p>
          </motion.div>

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
