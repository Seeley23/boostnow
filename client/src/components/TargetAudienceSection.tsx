import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShoppingCart, Palette, TrendingUp, Users } from "lucide-react";

/* TargetAudienceSection Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Target audience showcase
   - Industry-specific solutions
*/

const audiences = [
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Sprzedaż produktów online",
    solutions: [
      "Opisy produktowe, które egzekwują zakup",
      "Treści na stronę i social media",
      "Znajdowanie idealnego klienta",
      "Język komunikacji oparty na psychologii",
    ],
  },
  {
    id: "brands",
    icon: Palette,
    title: "Marki Premium",
    description: "Luksusowe i ekskluzywne produkty",
    solutions: [
      "Budowanie autorytetu i prestiżu",
      "Storytelling na poziomie emocjonalnym",
      "Społeczność wyznawców marki",
      "Pozycjonowanie jako standard branży",
    ],
  },
  {
    id: "saas",
    icon: TrendingUp,
    title: "SaaS & Tech",
    description: "Oprogramowanie i usługi cyfrowe",
    solutions: [
      "Edukacja bez nudności - sprzedaż przez wartość",
      "Lead generation zorientowany na decydentów",
      "Skrócenie cyklu sprzedaży",
      "Demonstracja ROI w języku biznesu",
    ],
  },
  {
    id: "services",
    icon: Users,
    title: "Usługi & Konsulting",
    description: "Agencje i doradcy biznesowi",
    solutions: [
      "Pozycjonowanie jako ekspert branżowy",
      "Generowanie leadów wysokiej jakości",
      "Budowanie reputacji online",
      "Automatyzacja pozyskiwania klientów",
    ],
  },
];

interface TargetAudienceSectionProps {
  title?: string;
  description?: string;
}

export default function TargetAudienceSection({ title, description }: TargetAudienceSectionProps = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="for-whom" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
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
            Dla Kogo?
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Niezależnie od branży,{" "}
            <span className="text-gradient-lime">mamy rozwiązanie</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Nasze strategie działają dla każdej branży. Poniżej znajdziesz rozwiązania dostosowane do Twojego biznesu.
          </p>
        </motion.div>

        {/* Audience grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group h-full"
            >
              <div className="relative h-full rounded-2xl bg-card border border-border hover:border-primary/30 p-6 transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <audience.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                  {audience.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {audience.description}
                </p>

                {/* Solutions */}
                <div className="space-y-2">
                  {audience.solutions.map((solution, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">
                        {solution}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl" style={{
                    boxShadow: "inset 0 0 40px oklch(0.89 0.23 128 / 0.05)"
                  }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Twoja branża nie na liście? Skontaktuj się z nami - mamy rozwiązanie dla każdego biznesu.
          </p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all duration-300 hover:scale-105 glow-lime hover:glow-lime-strong"
          >
            <span>Omów swoją sytuację</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
