import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

/* ServicesSection Component
   Design: "Human-Centric Minimalism" - Light Gray Background
   - White cards with lime green accents
   - Human-focused service descriptions
   - Warm, professional aesthetic
*/

const services = [
  {
    id: "conversion",
    emoji: "🎯",
    title: "Inżynieria Konwersji",
    subtitle: "Landing Pages & Copy",
    description: "Tworzymy strony i treści, które nie proszą - egzekwują pożądanie. Każde słowo jest zaprojektowane do wywołania natychmiastowej akcji.",
    stats: "+40% konwersji",
    color: "from-accent/20 to-accent/10",
  },
  {
    id: "ai",
    emoji: "🎬",
    title: "Visual Excellence",
    subtitle: "Video & Photo produktowe",
    description: "Wizualizacje produktowe napędzane przez AI. Tworzymy wideo, które sprzedaje Twój produkt w 15 sekund.",
    stats: "3x szybciej",
    color: "from-accent/15 to-accent/5",
  },
  {
    id: "community",
    emoji: "👥",
    title: "Community Growth",
    subtitle: "Strategie Lojalności",
    description: "Silne marki nie mają klientów - mają społeczność. Budujemy ekstremalną lojalność i transparentność relacji.",
    stats: "7+ lat doświadczenia",
    color: "from-accent/10 to-accent/0",
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 lg:py-32 relative bg-background overflow-hidden">
      {/* Organic background shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
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
            💡 Nasze Usługi
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Zorientowane na{" "}
            <span className="text-accent">wynik</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Nie oferujemy porad. Dostarczamy Architekturę Konwersji opartą na 
            psychologii decyzji i mierzalnych danych.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card background gradient */}
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Card content */}
              <div className="relative bg-white/70 backdrop-blur rounded-xl p-8 border border-accent/20 hover:border-accent/40 transition-all h-full flex flex-col hover:shadow-lg hover:scale-105">
                {/* Emoji icon */}
                <div className="text-5xl mb-4">{service.emoji}</div>

                {/* Title */}
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                
                {/* Subtitle */}
                <p className="text-sm text-accent font-semibold mb-4">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Stats and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-accent/10">
                  <span className="text-sm font-bold text-accent">
                    {service.stats}
                  </span>
                  <button
                    onClick={scrollToContact}
                    className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors group-hover:bg-accent group-hover:text-white"
                  >
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <button
            onClick={scrollToContact}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-foreground font-bold rounded-lg hover:bg-accent/90 transition-all transform hover:scale-105 active:scale-95"
          >
            Dowiedz się więcej o naszych usługach
            <ArrowUpRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
