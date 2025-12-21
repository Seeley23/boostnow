import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* AboutSection Component
   Design: "Human-Centric Minimalism" - Light Gray Background
   - Warm, professional aesthetic
   - White cards with lime green accents
   - Human-focused values
*/

const values = [
  {
    emoji: "🧠",
    title: "Decision Science",
    description: "Neuromarketing, który paraliżuje konkurencję.",
  },
  {
    emoji: "🎬",
    title: "Amunicja Wizualna",
    description: "Treści wideo projektowane do przejęcia kontroli nad okiem w 0.4 sekundy.",
  },
  {
    emoji: "👥",
    title: "Kolonizacja Rynku",
    description: "Budujemy społeczności, które nie kupują produktów. One wyznają Twoją markę.",
  },
  {
    emoji: "🎤",
    title: "Kontrola Narracji",
    description: "Twoja marka staje się głosem, któremu słuchają. Eliminujemy szum.",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Organic background shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-block text-sm font-medium text-accent tracking-wider uppercase mb-4">
            ✨ O BoostNow
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Jesteśmy <span className="text-accent">Architektami Decyzji</span>. Reszta to tylko dekoracja.
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            W erze cyfrowego szumu marketing oparty na nadziei to sabotaż budżetu. My nie zgadujemy. My egzekwujemy. Wykorzystujemy mechanizmy Decision Science, aby ominąć racjonalne filtry Twoich odbiorców i trafić prosto w ich instynkty, sprawiająć, że wybiera Ciebie.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur rounded-xl p-6 border border-accent/20 hover:border-accent/40 transition-all hover:shadow-lg hover:scale-105"
            >
              <div className="text-4xl mb-4">{value.emoji}</div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom section - Transparency message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-white/60 backdrop-blur rounded-xl p-8 border-2 border-accent/30"
        >
          <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
            🔍 Transparentność buduje dystans do konkurencji.
          </h3>
          <p className="text-foreground/70 leading-relaxed mb-4">
            Oto protokół Twojego wzrostu. Żadnych domysłów. Tylko systematyczna eliminacja błędów poznawczych Twoich klientów.
          </p>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li className="flex gap-3">
              <span className="text-accent font-bold">1.</span>
              <span><strong>Audyt Psychologiczny</strong> - Mapujemy lęki i motywacje Twojej grupy. Znajdujemy dźwignie, o których nie wiedzą.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">2.</span>
              <span><strong>Architektura Strategii</strong> - Budujemy system komunikacji. Każde słowo to zaplanowany wyzwalacz reakcji.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">3.</span>
              <span><strong>Wdrożenie i Akceleracja</strong> - Uruchamiamy materiały, które kończą erę bierności. Monitorujemy konwersję w czasie rzeczywistym.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">4.</span>
              <span><strong>Skalowanie AI</strong> - Wykorzystujemy dane do ciągłej optymizacji. AI eliminuje to, co nie generuje zysku.</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
