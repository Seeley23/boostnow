import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

interface ProblemSectionProps {
  title?: string;
  content?: string;
}

export default function ProblemSection({ title, content }: ProblemSectionProps) {
  const displayTitle = title || "Twój marketing jest zbyt skomplikowany, by sprzedawać.";
  const displayContent = content || "Większość firm płaci za treści, których nikt nie doczytuje do końca. Każde zbędne zdanie i każda sekunda nudy to moment, w którym klient rezygnuje.";

  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-8">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 mb-8 leading-tight">
              {displayTitle}
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-10">
              {displayContent}
            </p>
          </motion.div>

          <div className="grid gap-6">
            {[
              { title: "Przeładowanie poznawcze", desc: "Zbyt dużo informacji sprawia, że odbiorca przestaje uważać i ucieka." },
              { title: "Brak hierarchii wizualnej", desc: "Klient nie wie, na co ma patrzeć, więc patrzy na ofertę konkurencji." },
              { title: "Wysoki próg wejścia", desc: "Zrozumienie Twojej oferty zajmuje zbyt dużo czasu i energii." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <h3 className="text-xl font-serif text-slate-900 mb-3 group-hover:text-red-500 transition-colors">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
