import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

/* ServicesSection Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Result-oriented service cards
   - Visual imagery for each service
   - Hover effects with glow
*/

const services = [
  {
    id: "conversion",
    title: "Inżynieria Konwersji",
    subtitle: "Landing Pages & Copy",
    description: "Tworzymy strony i treści, które nie proszą - egzekwują pożądanie. Każde słowo jest zaprojektowane do wywołania natychmiastowej akcji.",
    image: "/images/services-conversion.png",
    stats: "+40% konwersji",
  },
  {
    id: "ai",
    title: "Visual Excellence AI",
    subtitle: "Video & Photo produktowe",
    description: "Wizualizacje produktowe napędzane przez AI. Tworzymy wideo, które sprzedaje Twój produkt w 15 sekund.",
    image: "/images/services-ai.png",
    stats: "3x szybciej",
  },
  {
    id: "community",
    title: "Community Growth",
    subtitle: "Strategie Lojalności",
    description: "Silne marki nie mają klientów - mają społeczność. Budujemy ekstremalną lojalność i transparentność relacji.",
    image: "/images/services-community.png",
    stats: "7+ lat doświadczenia",
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
    <section id="services" className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4">
            Nasze Usługi
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Zorientowane na{" "}
            <span className="text-gradient-lime">wynik</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Nie oferujemy porad. Dostarczamy Architekturę Konwersji opartą na 
            psychologii decyzji i mierzalnych danych.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              className="group relative"
            >
              <div className="relative h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-500">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  
                  {/* Stats badge */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                    {service.stats}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-heading font-bold text-xl text-foreground mb-1 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-primary/80">{service.subtitle}</p>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <button
                    onClick={scrollToContact}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/btn"
                  >
                    <span>Dowiedz się więcej</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl" style={{
                    boxShadow: "inset 0 0 60px oklch(0.89 0.23 128 / 0.1)"
                  }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Potrzebujesz kompleksowego rozwiązania? Stworzymy strategię dopasowaną do Twoich celów.
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all duration-300 hover:scale-105 glow-lime hover:glow-lime-strong"
          >
            <span>Zamów bezpłatną konsultację</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
