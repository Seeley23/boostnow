import { motion, useInView } from "framer-motion";
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
    subtitle: "Landing Pages & Copywriting",
    description: "Tworzymy strony i treści, które nie proszą - egzekwują pożądanie. Każde słowo jest zaprojektowane do wywołania natychmiastowej akcji. Architektura decyzji oparta na psychologii.",
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
  {
    id: "ecommerce",
    title: "E-commerce Optimization",
    subtitle: "Opisy produktowe & Naracja",
    description: "Tworzymy opisy produktów, które sprzedają. Budujemy narrację marki, która resonuje z Twoimi klientami i eliminuje błędy poznawcze.",
    image: "/images/services-ecommerce.png",
    stats: "+62% konwersji",
  },
  {
    id: "geo",
    title: "GEO Positioning",
    subtitle: "AI Search Optimization",
    description: "Pozycjonowanie w ChatGPT, Perplexity i Gemini. Zwiększamy Share of Model Voice (SoMV) dla Twojej marki w AI search engines.",
    image: "/images/services-geo.png",
    stats: "SoMV +380%",
  },
  {
    id: "seo",
    title: "SEO Positioning",
    subtitle: "Organic Search Strategy",
    description: "Strategie SEO oparte na Decision Science. Budujemy autorytetu marki i dominujemy wyniki wyszukiwania dla kluczowych fraz.",
    image: "/images/services-seo.png",
    stats: "+150% organic traffic",
  },
  {
    id: "web3",
    title: "Web3 Services",
    subtitle: "Blockchain & NFT Strategy",
    description: "Strategie Web3 dla marki. Budujemy community na blockchain, tworzymy NFT campaigns i strategie tokenomiki.",
    image: "/images/services-web3.png",
    stats: "Future-ready",
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

        {/* Services grid - 7 usług w responsive grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300"
            >
              {/* Image */}
              {service.image && (
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                </div>
              )}

              {/* Content */}
              <div className="p-6 relative">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-primary font-medium">
                      {service.subtitle}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs font-semibold text-primary">
                    {service.stats}
                  </span>
                  <button
                    onClick={scrollToContact}
                    className="text-xs font-medium text-primary hover:text-foreground transition-colors"
                  >
                    Dowiedz się więcej →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
