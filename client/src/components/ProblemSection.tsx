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

export default function ProblemSection() {
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
            Twój marketing jest zbyt skomplikowany, by sprzedawać.
          </motion.h2>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-400 mb-12 leading-relaxed max-w-3xl"
          >
            68% klientów porzuca koszyk zanim dokończy zakup. Powód? Marketing, który nie mówi do nich bezpośrednio.
          </motion.p>

          {/* Main Problem */}
          <motion.div 
            variants={itemVariants}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold text-lime-400 mb-4">Główny problem:</h3>
            <p className="text-lg text-gray-300">Marketing, który nie mówi do psychiki klienta = brak konwersji.</p>
          </motion.div>

          {/* Final Statement */}
          <motion.p 
            variants={itemVariants}
            className="text-xl font-bold text-lime-400 mt-12"
          >
            Efekt? <span className="text-white">Finansujesz ignorancję rynku.</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
