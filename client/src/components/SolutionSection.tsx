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
      title: "Precyzja słowa",
      desc: "Wycinamy zbędny szum. Stosujemy psychologię języka, by skrócić Twój przekaz do konkretu, który klient doczyta do końca bez wysiłku.",
      emoji: "✂️",
    },
    {
      title: "Kontrola wzroku",
      desc: "Wykorzystujemy instynktowną reakcję na ruch. Motion designem zatrzymujemy kciuk odbiorcy dokładnie tam, gdzie podejmuje decyzję o zakupie.",
      emoji: "👁️",
    },
    {
      title: "Architektura wyboru",
      desc: "Projektujemy komunikację o niskim tarciu. Usuwamy bariery informacyjne, sprawiając, że Twoja marka staje się najprostszym wyborem na rynku.",
      emoji: "🏗️",
    },
  ];

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
            Twoja oferta jest ignorowana, bo zmuszasz ludzi do wysilku.
          </motion.h2>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-gray-400 mb-12 leading-relaxed max-w-3xl"
          >
            Oto jak to zmieniamy:
          </motion.p>

          {/* Three Solutions */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {solutions.map((solution, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 group cursor-pointer transition-all hover:border-lime-400/50"
              >
                <motion.div 
                  className="text-4xl mb-4 flex-shrink-0 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 10 }}
                >
                  {solution.emoji}
                </motion.div>
                <h3 className="text-lg font-semibold text-lime-400 mb-3 group-hover:text-lime-300 transition-colors">
                  {solution.title}
                </h3>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                  {solution.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
