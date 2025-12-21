import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

/* ResultsSection Component
   Design: "Human-Centric Minimalism" - Light Gray Background
   - Case studies with Problem → Strategy → Result format
   - White cards with lime green accents
   - Warm, professional aesthetic
*/

const caseStudies = [
  {
    id: 1,
    industry: "E-commerce",
    emoji: "🛍️",
    problem: "Niski współczynnik konwersji mimo wysokiego ruchu na stronie. Klienci porzucali koszyki.",
    strategy: "Wdrożenie psychologii pilności i awersji do straty. Redesign ścieżki zakupowej z elementami social proof.",
    results: [
      { label: "Wzrost konwersji", value: "+156%" },
      { label: "Redukcja porzuceń", value: "-42%" },
      { label: "ROI kampanii", value: "340%" },
    ],
  },
  {
    id: 2,
    industry: "SaaS B2B",
    emoji: "📊",
    problem: "Długi cykl sprzedaży i niska jakość leadów. Trudność w dotarciu do decydentów.",
    strategy: "Architektura treści oparta na Decision Science. Targetowanie psychograficzne + lead magnet z kalkulatorem ROI.",
    results: [
      { label: "Jakość leadów", value: "+89%" },
      { label: "Skrócenie cyklu", value: "-35%" },
      { label: "Demo requests", value: "+210%" },
    ],
  },
  {
    id: 3,
    industry: "Usługi Premium",
    emoji: "👑",
    problem: "Brak rozpoznawalności marki i trudność w komunikowaniu wartości premium.",
    strategy: "Budowanie autorytetu przez content marketing + strategia społeczności. Pozycjonowanie jako ekspert branżowy.",
    results: [
      { label: "Świadomość marki", value: "+280%" },
      { label: "Wartość klienta", value: "+65%" },
      { label: "Polecenia", value: "+120%" },
    ],
  },
];

export default function ResultsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="results" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Organic background shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium text-accent tracking-wider uppercase mb-4">
            📈 Nasze Rezultaty
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Nie obiecujemy. <span className="text-accent">Dostarczamy.</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Oto co mówią liczby. Rzeczywiste case studies od rzeczywistych klientów.
          </p>
        </motion.div>

        {/* Case studies grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-white/70 backdrop-blur rounded-xl p-8 border border-accent/20 hover:border-accent/40 transition-all h-full flex flex-col hover:shadow-lg hover:scale-105">
                {/* Header with emoji and industry */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-4xl mb-2">{caseStudy.emoji}</div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      {caseStudy.industry}
                    </h3>
                  </div>
                </div>

                {/* Problem */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                    🎯 Problem
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </div>

                {/* Strategy */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                    💡 Strategia
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {caseStudy.strategy}
                  </p>
                </div>

                {/* Results */}
                <div className="mb-6 flex-grow">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-3">
                    ✅ Rezultaty
                  </p>
                  <div className="space-y-2">
                    {caseStudy.results.map((result, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-xs text-foreground/70">{result.label}</span>
                        <span className="text-sm font-bold text-accent">{result.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent font-semibold rounded-lg transition-colors w-full group-hover:bg-accent group-hover:text-foreground">
                  Czytaj case study
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 bg-white/60 backdrop-blur rounded-xl p-8 border border-accent/20"
        >
          <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
            Chcesz być następnym success story?
          </h3>
          <p className="text-foreground/70 mb-6">
            Zarezerwuj bezpłatną konsultację i poznaj, jak możemy transformować Twoją markę.
          </p>
          <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-foreground font-bold rounded-lg hover:bg-accent/90 transition-all transform hover:scale-105 active:scale-95">
            Zarezerwuj konsultację
            <ArrowUpRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
