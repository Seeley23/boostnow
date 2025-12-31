import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "process" | "pricing" | "timeline";
}

const faqItems: FAQItem[] = [
  {
    id: "process-1",
    category: "process",
    question: "Jak wygląda proces współpracy z BoostNow?",
    answer: "Zaczynamy od Audytu Psychologicznego, gdzie mapujemy lęki i motywacje Twojej grupy. Następnie budujemy Architekturę Strategii - system komunikacji oparty na psychologii języka. Potem wdrażamy materiały i monitorujemy konwersję w czasie rzeczywistym. Na koniec skalujemy wyniki za pomocą AI.",
  },
  {
    id: "process-2",
    category: "process",
    question: "Ile czasu zajmuje wdrożenie strategii?",
    answer: "Pełny cykl wdrożenia zajmuje 4 tygodnie: Tydzień 1-2 to Audyt Psychologiczny, Tydzień 2-3 to Architektura Strategii, Tydzień 3-4 to Wdrożenie i Akceleracja. Po tym okresie rozpoczyna się faza Skalowania AI, która trwa nieprzerwanie.",
  },
  {
    id: "process-3",
    category: "process",
    question: "Jakie metryki będę monitorować?",
    answer: "Monitorujemy: Konwersję (ile osób podejmuje decyzję), Rezygnację klientów (ile osób porzuca proces), ROI kampanii (zwrot z inwestycji), Czas do konwersji (jak szybko klient decyduje), Wartość lifetime klienta (długoterminowy zysk).",
  },
  {
    id: "pricing-1",
    category: "pricing",
    question: "Jak kształtują się ceny usług BoostNow?",
    answer: "Ceny zależą od zakresu usług: Decision Science (od 5 000 zł), Amunicja Wizualna (od 8 000 zł), Kolonizacja Rynku (od 12 000 zł), Pełny pakiet (od 25 000 zł). Każda usługa jest dostosowana do wielkości Twojej firmy i budżetu.",
  },
  {
    id: "pricing-2",
    category: "pricing",
    question: "Czy oferujecie pakiety dla startupów?",
    answer: "Tak! Mamy specjalny pakiet dla startupów - 'Szybki Start' za 3 500 zł. Zawiera Audyt Psychologiczny i Architekturę Strategii dla 1 produktu. Po 3 miesiącach możesz skalować do pełnego pakietu.",
  },
  {
    id: "pricing-3",
    category: "pricing",
    question: "Czy cena zawiera wsparcie po wdrożeniu?",
    answer: "Tak! Każdy pakiet zawiera 30 dni wsparcia post-wdrożeniowego. Monitorujemy wyniki, optymalizujemy materiały i wspieramy zespół w razie pytań. Po 30 dniach możesz przedłużyć wsparcie lub przejść na model skalowania AI.",
  },
  {
    id: "timeline-1",
    category: "timeline",
    question: "Kiedy mogę spodziewać się pierwszych wyników?",
    answer: "Pierwsze wyniki widać po 2-3 tygodniach od wdrożenia. Wzrost konwersji wynosi średnio 40-80% w pierwszym miesiącu. Pełne rezultaty (200-300% wzrostu) osiągamy po 3-6 miesiącach.",
  },
  {
    id: "timeline-2",
    category: "timeline",
    question: "Jak długo trwa umowa z BoostNow?",
    answer: "Minimalna umowa to 3 miesiące. Po tym okresie możesz kontynuować, zmienić zakres usług lub rozwiązać umowę. Nie ma ukrytych kosztów ani kar za rozwiązanie umowy.",
  },
  {
    id: "timeline-3",
    category: "timeline",
    question: "Czy mogę rozszerzyć usługi w trakcie współpracy?",
    answer: "Oczywiście! Możesz dodać nowe usługi w dowolnym momencie. Na przykład, jeśli zacząłeś od Decision Science, możesz dodać Amunicję Wizualną lub Kolonizację Rynku. Dostosujemy plan i harmonogram do Twoich potrzeb.",
  },
  {
    id: "process-4",
    category: "process",
    question: "Czy mogę być zaangażowany w proces tworzenia strategii?",
    answer: "Tak! Współpraca z Tobą jest kluczowa. Przeprowadzamy sesje strategiczne, gdzie omawiamy Twoje cele, wyzwania i wizję. Twoja wiedza o rynku i klientach jest nieoceniona dla stworzenia najlepszej strategii.",
  },
  {
    id: "pricing-4",
    category: "pricing",
    question: "Czy mogę negocjować ceny dla długoterminowych umów?",
    answer: "Tak! Dla umów 6+ miesięcy oferujemy rabat 15-20%. Dla umów 12+ miesięcy rabat wynosi 25-30%. Skontaktuj się z nami, aby omówić szczegóły i znaleźć najlepsze warunki dla Twojego budżetu.",
  },
  {
    id: "timeline-4",
    category: "timeline",
    question: "Jaki jest proces onboardingu?",
    answer: "Onboarding trwa 3-5 dni. Najpierw zbieramy informacje o Twojej firmie, produktach i klientach. Następnie tworzymy plan działania i harmonogram. Na koniec przeprowadzamy szkolenie zespołu i uruchamiamy proces. Jesteśmy dostępni 24/7 w razie pytań.",
  },
];

export default function FAQSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<"process" | "pricing" | "timeline">("process");

  const filteredFAQs = faqItems.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 bg-black">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-lime-400 text-sm font-semibold mb-2">NAJCZĘSTSZE PYTANIA</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Odpowiedzi na Twoje <span className="text-lime-400">pytania</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Wszystko co musisz wiedzieć o procesie, cenach i terminach współpracy z BoostNow.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-12 justify-center flex-wrap">
          {["process", "pricing", "timeline"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat as "process" | "pricing" | "timeline");
                setExpandedId(null);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-lime-400 text-black"
                  : "bg-gray-900 text-gray-300 hover:bg-gray-800"
              }`}
            >
              {cat === "process" && "Proces"}
              {cat === "pricing" && "Ceny"}
              {cat === "timeline" && "Terminy"}
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
  );
}
