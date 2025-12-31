import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

export default function ProcessSectionShort() {
  const phases = [
    {
      number: "01",
      title: "Audyt Psychologiczny",
      description: "Mapujemy lęki i motywacje Twojej grupy. Znajdujemy dźwignie, o których nie wiedzą.",
      timeline: "Tydzień 1-2"
    },
    {
      number: "02",
      title: "Architektura Strategii",
      description: "Budujemy system komunikacji. Każde słowo to zaplanowany wyzwalacz reakcji.",
      timeline: "Tydzień 2-3"
    },
    {
      number: "03",
      title: "Wdrożenie i Akceleracja",
      description: "Uruchamiamy materiały, które kończą erę bierności. Monitorujemy konwersję w czasie rzeczywistym.",
      timeline: "Tydzień 3-4"
    }
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background via-background to-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Nasz Proces
          </h2>
          <p className="text-xl text-gray-300">
            Transparentność buduje dystans do konkurencji
          </p>
          <p className="text-lg text-gray-400 mt-2">
            Oto protokół Twojego wzrostu. Żadnych domysłów. Tylko systematyczna eliminacja błędów poznawczych Twoich klientów.
          </p>
        </motion.div>

        {/* Phases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Phase Number */}
              <div className="text-6xl font-bold text-lime-400/20 mb-4">
                {phase.number}
              </div>

              {/* Phase Card */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-3">
                  {phase.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {phase.description}
                </p>
                <p className="text-sm text-lime-400 font-semibold">
                  {phase.timeline}
                </p>
              </div>

              {/* Connector Line */}
              {index < phases.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-4 w-8 h-1 bg-gradient-to-r from-lime-400 to-transparent opacity-30" />
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA to Full Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-gray-400 mb-6">
            Chcesz poznać pełny proces z 5 fazami i szczegółami?
          </p>
          <Link href="/process">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-all duration-300 group">
              <span>Dowiedz się więcej o procesie</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
