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
    client: "Caruma",
    industry: "B2B · cyfrowe paszporty produktów",
    icon: Users,
    problem: "Nowa strona B2B bez żadnego ruchu organicznego.",
    strategy: "SEO i GEO od zera: treści odpowiadające na pytania o regulacje UE, struktura pod cytowania w odpowiedziach AI.",
    results: [
      { label: "Wyświetlenia w Google w 90 dni", value: "151 tys." },
      { label: "Kluczowe zdarzenia w 90 dni", value: "910" },
      { label: "Wizyty z Gemini i Perplexity", value: "50" },
    ],
  },
  {
    id: 2,
    client: "SU-2 Kiteboards",
    industry: "E-commerce · sprzęt kitesurfingowy",
    icon: ShoppingCart,
    problem: "Sklep potrzebował widoczności na frazy zakupowe w globalnym Google.",
    strategy: "SEO pod frazy zakupowe i pod cytowania w Google AI Overviews.",
    results: [
      { label: "Frazy zakupowe na 1. miejscu", value: "3" },
      { label: "Pozycja na „split kiteboard”", value: "#2" },
      { label: "Cytowania w jednym AI Overview", value: "4" },
    ],
  },
  {
    id: 3,
    client: "RUD Studio",
    industry: "Moda · raportowanie CSRD",
    icon: TrendingUp,
    problem: "Treści strony nie pojawiały się w odpowiedziach AI w Google.",
    strategy: "Aktualizacja treści pod pytania, na które odpowiada Google AI Overview.",
    results: [
      { label: "Frazy z cytowaniem w AI Overview", value: "3" },
    ],
  },
];

const builtSites = [
  { name: "annaubiuro.pl", url: "https://www.annaubiuro.pl/" },
  { name: "kwiaciarniarose.pl", url: "https://kwiaciarniarose.pl/" },
  { name: "walcz-z-rakiem.pl", url: "https://walcz-z-rakiem.pl/" },
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
            Wyniki naszych klientów z Google Search Console i Google Analytics,
            z nazwami firm.
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
                      <div>
                        <p className="font-heading font-semibold text-foreground">{study.client}</p>
                        <p className="text-sm text-primary">{study.industry}</p>
                      </div>
                    </div>

                    {/* Problem */}
                    <div className="mb-6">
                      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Wyzwanie
                      </h3>
                      <p className="text-foreground leading-relaxed">
                        {study.problem}
                      </p>
                    </div>

                    {/* Strategy */}
                    <div>
                      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Strategia BoostNow
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {study.strategy}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Results */}
                  <div className="lg:col-span-5 bg-secondary/30 p-6 lg:p-8 flex flex-col justify-center">
                    <h3 className="text-xs font-medium text-primary uppercase tracking-wider mb-6">
                      Wyniki
                    </h3>
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

        {/* Built sites */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-3">Strony, które zbudowaliśmy:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {builtSites.map((site) => (
              <a
                key={site.url}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {site.name}
              </a>
            ))}
          </div>
        </div>
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
