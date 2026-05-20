import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, ShoppingCart, ArrowUpRight } from "lucide-react";

/* ResultsSection Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Case studies with Problem → Strategy → Result format
   - Mierzalne dane i statystyki
   - Social proof
*/

const caseStudies = [
  {
    id: 1,
    industry: "E-commerce",
    icon: ShoppingCart,
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
    icon: Users,
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
    icon: TrendingUp,
    problem: "Brak rozpoznawalności marki i trudność w komunikowaniu wartości premium.",
    strategy: "Budowanie autorytetu przez content marketing + strategia społeczności. Pozycjonowanie jako ekspert branżowy.",
    results: [
      { label: "Świadomość marki", value: "+280%" },
      { label: "Wartość klienta", value: "+65%" },
      { label: "Polecenia", value: "+120%" },
    ],
  },
];

interface ResultsSectionProps {
  title?: string;
  description?: string;
}

export default function ResultsSection({ title, description }: ResultsSectionProps = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="results" className="py-24 lg:py-32 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4">
            Rezultaty
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Mierzalne{" "}
            <span className="text-gradient-lime">dowody</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Nie obiecujemy wzrostu bez poparcia danymi. Oto przykłady transformacji, 
            które przeprowadziliśmy dla naszych partnerów.
          </p>
        </motion.div>

        {/* Case studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="group"
            >
              <div className="rounded-2xl bg-card border border-border hover:border-primary/30 overflow-hidden transition-all duration-300">
                <div className="grid lg:grid-cols-12 gap-0">
                  {/* Left side - Problem & Strategy */}
                  <div className="lg:col-span-7 p-6 lg:p-8">
                    {/* Industry badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <study.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-primary">{study.industry}</span>
                    </div>

                    {/* Problem */}
                    <div className="mb-6">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Wyzwanie
                      </h4>
                      <p className="text-foreground leading-relaxed">
                        {study.problem}
                      </p>
                    </div>

                    {/* Strategy */}
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Strategia BoostNow
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {study.strategy}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Results */}
                  <div className="lg:col-span-5 bg-secondary/30 p-6 lg:p-8 flex flex-col justify-center">
                    <h4 className="text-xs font-medium text-primary uppercase tracking-wider mb-6">
                      Wyniki
                    </h4>
                    <div className="space-y-4">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{result.label}</span>
                          <span className="font-heading font-bold text-2xl text-primary">
                            {result.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof bar */}
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all duration-300 hover:scale-105 glow-lime hover:glow-lime-strong"
          >
            <span>Chcę takie wyniki</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
