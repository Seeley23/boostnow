import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export default function SolutionSection() {
  const solutions = [
    {
      title: "Strategia & Audyt",
      desc: "Znajdujemy i łatamy dziury, przez które uciekają Twoje pieniądze. Optymalizacja konwersji (CRO) oparta na nauce.",
    },
    {
      title: "Płatne Kampanie (Ads)",
      desc: "Precyzyjne dotarcie. Kupujemy zysk, nie puste kliknięcia. Facebook, Google, TikTok, LinkedIn.",
    },
    {
      title: "AI Agents & Automatyzacja",
      desc: "Zatrudnij cyfrowych pracowników. Autonomiczne agenty i systemy przejmują leady, obsługę i sprzedaż 24/7. Skaluj biznes bez rekrutacji.",
    },
    {
      title: "Video AI",
      desc: "Szybciej. Taniej. Skuteczniej. Generujemy kompletne ekosystemy wideo (Influencers, UGC, Motion), które sprzedają za Ciebie.",
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-black">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Main Heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight max-w-4xl text-white"
          >
            Narzędzia Wzrostu
          </motion.h2>

          {/* Solutions Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {solutions.map((solution, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 group cursor-pointer transition-all hover:border-lime-400/50"
              >
                <h3 className="text-lg font-semibold text-lime-400 mb-3 group-hover:text-lime-300 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                  {solution.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <button
              onClick={scrollToContact}
              aria-label="Zobacz ofertę"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold text-lg rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 glow-lime hover:glow-lime-strong"
            >
              <span>Zobacz ofertę</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
