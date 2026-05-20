import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Target, Zap } from "lucide-react";

interface SolutionProps {
  title?: string;
  content?: string;
}

export default function SolutionSection({ title, content }: SolutionProps) {
  const displayTitle = title || "Projektujemy dla ludzkiego mózgu.";
  const displayContent = content || "Większość firm traci klienta przez tarcie poznawcze. My usuwamy bariery, tworząc ścieżki zakupu, które są naturalne, intuicyjne i skuteczne.";

  const solutions = [
    {
      title: "Usuwamy opór",
      desc: "Projektujemy interfejsy, które nie wymagają myślenia. Klient po prostu wie, co robić.",
      icon: Zap,
    },
    {
      title: "Budujemy autorytet",
      desc: "Tworzymy przekaz, który buduje zaufanie od pierwszej sekundy kontaktu z marką.",
      icon: Target,
    },
    {
      title: "Maksymalizujemy ROI",
      desc: "Każdy piksel i każde słowo ma jeden cel: zwiększenie Twojej konwersji.",
      icon: Sparkles,
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 mb-8 leading-tight">
              {displayTitle}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {displayContent}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {solutions.map((solution, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-8 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 group-hover:rotate-3">
                <solution.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4">{solution.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{solution.desc}</p>
              <div className="flex items-center gap-2 text-emerald-500 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle2 className="w-4 h-4" />
                Sprawdzone rozwiązanie
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
