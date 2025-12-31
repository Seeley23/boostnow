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
    answer: "Zaczynamy od Audytu Psychologicznego (Tydzień 1-2), budujemy Architekturę Strategii (Tydzień 2-3), wdrażamy materiały (Tydzień 3-4), i skalujemy wyniki za pomocą AI.",
  },
  {
    id: "process-2",
    category: "process",
    question: "Ile czasu zajmuje wdrożenie strategii?",
    answer: "Pełny cykl wdrożenia zajmuje 4 tygodnie. Pierwsze wyniki widoczne po 2-3 tygodniach. Pełne rezultaty (200-300% wzrostu) osiągamy po 3-6 miesiącach.",
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

         {/* Tabs - HIDDEN */}
        {/* <div className="flex gap-4 mb-12 border-b border-gray-800">
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
