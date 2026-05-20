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

interface ProblemSectionProps {
  title?: string;
  content?: string;
}

export default function ProblemSection({ title, content }: ProblemSectionProps = {}) {
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
            Większość firm płaci za treści, których nikt nie doczytuje do końca. Każde zbędne zdanie i każda sekunda nudy w wideo to moment, w którym klient rezygnuje.
          </motion.p>

          {/* Three Errors */}
          <motion.div 
            variants={itemVariants}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold text-lime-400 mb-8">Twoje straty wynikają z trzech błędów:</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Przeładowanie", desc: "Zbyt dużo informacji sprawia, że odbiorca przestaje uważać." },
                { title: "Brak priorytetów", desc: "Klient nie wie, na co ma patrzeć, więc patrzy na konkurencję." },
                { title: "Wysiłek", desc: "Zrozumienie Twojej oferty zajmuje zbyt dużo czasu." },
              ].map((error, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 cursor-pointer transition-all hover:border-lime-400/50"
                >
                  <h4 className="text-base font-semibold mb-3 text-white">{error.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{error.desc}</p>
                </motion.div>
              ))}
            </div>
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
