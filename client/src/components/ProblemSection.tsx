import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

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
            Masz 0.4 sekundy.
          </motion.h2>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-400 mb-12 leading-relaxed max-w-3xl"
          >
            Większość firm traci klienta w mgnieniu oka przez "tarcie poznawcze". Twoja strona i reklamy są ignorowane. My to zmieniamy.
          </motion.p>

          {/* Three Solutions */}
          <motion.div 
            variants={itemVariants}
            className="mb-12"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Usuwamy opór", desc: "Projektujemy ścieżki zakupu zgodne z pracą ludzkiego mózgu." },
                { title: "Hakujemy uwagę", desc: "Tworzymy przekaz, który omija filtry krytyczne i trafia do decyzji." },
                { title: "Dowożimy ROI", desc: "Interesuje nas Twój zysk, nie puste zasięgi." },
              ].map((solution, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 cursor-pointer transition-all hover:border-lime-400/50"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-lime-400 flex-shrink-0 mt-0.5" />
                    <h4 className="text-base font-semibold text-white">{solution.title}</h4>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{solution.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
