import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Rocket, Shield, Users } from "lucide-react";

/* AboutSection Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Asymmetric two-column layout
   - Value propositions with icons
   - Data-driven credibility
*/

const values = [
  {
    icon: Brain,
    title: "Decision Science",
    description: "Neuromarketing, który paraliżuje konkurencję.",
  },
  {
    icon: Rocket,
    title: "Amunicja Wizualna",
    description: "Treści wideo projektowane do przejęcia kontroli nad okiem w 0.4 sekundy.",
  },
  {
    icon: Shield,
    title: "Kolonizacja Rynku",
    description: "Budujemy społeczności, które nie kupują produktów. One wyznają Twoją markę.",
  },
  {
    icon: Users,
    title: "Kontrola Narracji",
    description: "Twoja marka staje się głosem, któremu słuchają. Eliminujemy szum.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4">
                O BoostNow
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Jesteśmy <span className="text-gradient-lime">Architektami Decyzji</span>. Reszta to tylko dekoracja.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 text-muted-foreground text-lg leading-relaxed"
            >
              <p>
                W erze cyfrowego szumu marketing oparty na nadziei to sabotaż budżetu. <strong className="text-foreground">My nie zgadujemy. My egzekwujemy.</strong>
              </p>
              <p>
                Wykorzystujemy mechanizmy <strong className="text-primary">Decision Science</strong>, aby ominąć racjonalne filtry Twoich odbiorców i trafić prosto w ich instynkty, sprawiając, że wybiera Ciebie.
              </p>
            </motion.div>

            {/* Manifest quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 pl-6 border-l-2 border-primary"
            >
              <p className="text-lg italic text-foreground">
                "Nie sprzedajemy - egzekwujemy pożądanie. Brak kontroli jest czystą stratą. I jest nieakceptowalny."
              </p>
              <cite className="block mt-2 text-sm text-muted-foreground not-italic">
                — Manifest BoostNow
              </cite>
            </motion.blockquote>
          </div>

          {/* Right column - Value cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
