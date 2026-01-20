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

export default function VideoAnimationSection() {
  const services = [
    {
      number: "1",
      title: "Strategia & Audyt",
      desc: "Uszczelniamy lejek sprzedaży. Naukowa optymalizacja (CRO), która zatrzymuje uciekający budżet.",
    },
    {
      number: "2",
      title: "Płatne Kampanie (Ads)",
      desc: "Kupujemy zysk, nie puste kliknięcia. Precyzyjne dotarcie na Facebooku, Google, TikToku i Instagram.",
    },
    {
      number: "3",
      title: "AI Agents & Automatyzacja",
      desc: "Autonomiczne systemy przejmują obsługę i sprzedaż 24/7. Skaluj biznes bez powiększania zespołu.",
    },
    {
      number: "4",
      title: "Video AI",
      desc: "Szybciej i skuteczniej. Generujemy wideo (Influencers, UGC, Motion), które sprzedaje za Ciebie.",
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
          className="max-w-4xl mx-auto text-center"
        >
          {/* Main Heading */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-12 leading-tight max-w-4xl text-white text-center"
          >
            Co <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">robimy?</span>
          </motion.h2>

          {/* Services Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 group cursor-pointer transition-all hover:border-lime-400/50"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-lime-400">{service.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-lime-400 group-hover:text-lime-300 transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
