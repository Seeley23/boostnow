import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Lightbulb, Rocket, BarChart3 } from "lucide-react";

/* ProcessSection Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Glass-box transparency approach
   - Timeline visualization
   - Step-by-step process
*/

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Audyt Psychologiczny",
    description: "Analizujemy Twoją grupę docelową, ich lęki, motywacje i ścieżki decyzyjne. Identyfikujemy dźwignie behawioralne.",
    duration: "Tydzień 1-2",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Architektura Strategii",
    description: "Projektujemy system komunikacji oparty na Decision Science. Każdy element jest zaprojektowany do wywołania konkretnej reakcji.",
    duration: "Tydzień 2-3",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Wdrożenie & Akceleracja",
    description: "Uruchamiamy kampanie i materiały. Monitorujemy w czasie rzeczywistym, optymalizując pod kątem konwersji.",
    duration: "Tydzień 3-4",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Skalowanie AI",
    description: "Wykorzystujemy dane do ciągłej optymalizacji. AI pomaga nam skalować to, co działa, eliminując to, co nie przynosi wyników.",
    duration: "Ongoing",
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background with process image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/process-bg.png"
          alt="Process background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4">
            Nasz Proces
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Transparentność{" "}
            <span className="text-gradient-lime">buduje zaufanie</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Oto dokładnie jak pracujemy. Żadnych ukrytych kroków, żadnych niespodzianek. 
            Tylko systematyczne podejście do Twojego wzrostu.
          </p>
        </motion.div>

        {/* Process timeline */}
        <div className="relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * index }}
                className="relative"
              >
                {/* Step card */}
                <div className="group h-full p-6 rounded-xl bg-card/50 border border-border hover:border-primary/30 backdrop-blur-sm transition-all duration-300">
                  {/* Number and icon */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <step.icon className="w-7 h-7 text-primary" />
                      </div>
                      {/* Status dot */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary animate-pulse" />
                    </div>
                    <span className="font-heading text-4xl font-bold text-border group-hover:text-primary/30 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Duration badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {step.duration}
                  </div>
                </div>

                {/* Arrow connector - mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-border bg-card/50">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Średni czas do pierwszych wyników: <strong className="text-foreground">90 dni</strong>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
