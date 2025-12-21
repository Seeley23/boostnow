import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ProcessSection Component
   Design: "Human-Centric Minimalism" - Light Gray Background
   - White cards with lime green accents
   - Timeline visualization
   - Warm, professional aesthetic
*/

const steps = [
  {
    number: "01",
    emoji: "🔍",
    title: "Audyt Psychologiczny",
    description: "Mapujemy lęki i motywacje Twojej grupy. Znajdujemy dźwignie, o których nie wiedzą.",
    duration: "Tydzień 1-2",
  },
  {
    number: "02",
    emoji: "💡",
    title: "Architektura Strategii",
    description: "Budujemy system komunikacji. Każde słowo to zaplanowany wyzwalacz reakcji.",
    duration: "Tydzień 2-3",
  },
  {
    number: "03",
    emoji: "🚀",
    title: "Wdrożenie i Akceleracja",
    description: "Uruchamiamy materiały, które kończą erę bierności. Monitorujemy konwersję w czasie rzeczywistym.",
    duration: "Tydzień 3-4",
  },
  {
    number: "04",
    emoji: "📊",
    title: "Skalowanie AI",
    description: "Wykorzystujemy dane do ciągłej optymizacji. AI eliminuje to, co nie generuje zysku.",
    duration: "Ongoing",
  },
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Organic background shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
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
            🎯 Nasz Proces
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Transparentność{" "}
            <span className="text-accent">buduje dystans do konkurencji</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Oto protokół Twojego wzrostu. Żadnych domysłów. Tylko systematyczna eliminacja błędów poznawczych Twoich klientów.
          </p>
        </motion.div>

        {/* Process timeline */}
        <div className="relative">
          {/* Connecting line - hidden on mobile */}
          <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent to-accent/30 z-0" />

          {/* Steps grid */}
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Step card */}
                <div className="bg-white/70 backdrop-blur rounded-xl p-6 border border-accent/20 hover:border-accent/40 transition-all hover:shadow-lg hover:scale-105 h-full flex flex-col">
                  {/* Step number badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-accent text-foreground font-bold flex items-center justify-center shadow-lg">
                    {step.number}
                  </div>

                  {/* Emoji icon */}
                  <div className="text-4xl mb-4 mt-4">{step.emoji}</div>

                  {/* Title */}
                  <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-foreground/70 leading-relaxed mb-4 flex-grow">
                    {step.description}
                  </p>

                  {/* Duration */}
                  <div className="text-xs font-semibold text-accent bg-accent/10 rounded-full px-3 py-1 inline-block w-fit">
                    ⏱️ {step.duration}
                  </div>
                </div>

                {/* Connector arrow - hidden on mobile */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/3 -right-2 transform translate-x-1/2 z-20">
                    <div className="text-accent text-2xl">→</div>
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 bg-white/60 backdrop-blur rounded-xl p-6 border border-accent/20"
        >
          <p className="text-foreground/70 text-sm">
            <strong className="text-foreground">💬 Każdy etap jest wspólnym wysiłkiem.</strong> Komunikujemy się transparentnie. Pokazujemy metryki. Nie ukrywamy niczego.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
