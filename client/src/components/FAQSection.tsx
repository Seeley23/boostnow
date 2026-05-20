import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "1",
    question: "Jakie branże obsługujecie?",
    answer: "Specjalizujemy się w branżach o wysokim potencjale konwersji: E-commerce, Marki Premium, B2B SaaS oraz Usługi Profesjonalne. Nasze metody opierają się na uniwersalnych zasadach psychologii decyzji, które adaptujemy do specyfiki Twojego rynku.",
  },
  {
    id: "2",
    question: "Kiedy zobaczę pierwsze efekty?",
    answer: "Pierwsze mierzalne zmiany w zachowaniu użytkowników i wzroście konwersji obserwujemy zazwyczaj w ciągu 30-45 dni od wdrożenia nowej strategii. Pełna optymalizacja systemu zajmuje około 90 dni.",
  },
  {
    id: "3",
    question: "Czym różni się GEO od tradycyjnego SEO?",
    answer: "SEO skupia się na rankingach w wyszukiwarkach takich jak Google. GEO (Generative Engine Optimization) to nowa dyscyplina optymalizacji pod silniki AI (ChatGPT, Perplexity, Gemini), aby Twoja marka była rekomendowana jako główne źródło odpowiedzi.",
  },
];

export default function FAQSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 mb-8 leading-tight">
              Często zadawane pytania.
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-10">
              Wszystko, co musisz wiedzieć o procesie, technologii i współpracy z nami. Jeśli masz inne pytania, jesteśmy do Twojej dyspozycji.
            </p>
            <a href="mailto:kontakt@boostnow.pl" className="text-slate-900 font-bold text-lg border-b-2 border-slate-900 pb-1 hover:text-slate-600 hover:border-slate-600 transition-all">
              Napisz do nas bezpośrednio
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-slate-100">
              {faqItems.map((item) => (
                <div key={item.id} className="py-6">
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <h3 className="text-xl font-serif text-slate-900 group-hover:text-slate-600 transition-colors">
                      {item.question}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                      {expandedId === item.id ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-slate-600 leading-relaxed pt-6 pb-2">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
