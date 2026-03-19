import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ServicesSection Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Unified grid: 10 services in one container
   - First 3 always visible (3-column grid on desktop)
   - Remaining 7 in horizontal scroll
   - Arrow navigation for scroll
*/

const services = [
  {
    id: "conversion",
    title: "Optymalizacja Konwersji (CRO) i Inżynieria Decyzji",
    subtitle: "Landing Pages & Copywriting",
    description: "Tworzymy strony i treści, które nie proszą - egzekwują pożądanie. Każde słowo jest zaprojektowane do wywołania natychmiastowej akcji. Architektura decyzji oparta na psychologii.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663163207746/8tjh5w8XqHsUFKvAv4Byd7/service-conversion_b1feb665.png",
    stats: "+40% konwersji",
    featured: true,
  },
  {
    id: "ai",
    title: "Video Animation i Visual AI dla Sprzedaży",
    subtitle: "Animacje produktowe & Photo AI",
    description: "Wizualizacje produktowe napędzane przez AI. Tworzymy wideo, które sprzedaje Twój produkt w 15 sekund.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663163207746/8tjh5w8XqHsUFKvAv4Byd7/service-ai-visual_1e67f9db.png",
    stats: "3x szybciej",
    featured: true,
  },
  {
    id: "community",
    title: "Community Growth",
    subtitle: "Strategie Lojalności",
    description: "Silne marki nie mają klientów - mają społeczność. Budujemy ekstremalną lojalność i transparentność relacji.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663163207746/8tjh5w8XqHsUFKvAv4Byd7/service-community_c789918c.png",
    stats: "7+ lat doświadczenia",
    featured: true,
  },
  {
    id: "ecommerce",
    title: "E-commerce Optimization",
    subtitle: "Opisy produktowe & Naracja",
    description: "Tworzymy opisy produktów, które sprzedają. Budujemy narrację marki, która resonuje z Twoimi klientami i eliminuje błędy poznawcze.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663163207746/8tjh5w8XqHsUFKvAv4Byd7/service-ecommerce_d5c862a8.png",
    stats: "+62% konwersji",
    featured: false,
  },
  {
    id: "geo",
    title: "GEO Positioning",
    subtitle: "AI Search Optimization",
    description: "Pozycjonowanie w ChatGPT, Perplexity i Gemini. Zwiększamy Share of Model Voice (SoMV) dla Twojej marki w AI search engines.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663163207746/8tjh5w8XqHsUFKvAv4Byd7/service-geo_2f28de9a.png",
    stats: "SoMV +380%",
    featured: false,
  },
  {
    id: "seo",
    title: "Agencja Neuromarketingowa - SEO Positioning",
    subtitle: "Organic Search Strategy & Decision Science",
    description: "Strategie SEO oparte na Decision Science. Budujemy autorytetu marki i dominujemy wyniki wyszukiwania dla kluczowych fraz.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663163207746/8tjh5w8XqHsUFKvAv4Byd7/service-seo_7446f461.png",
    stats: "+150% organic traffic",
    featured: false,
  },
  {
    id: "web3",
    title: "Web3 Services",
    subtitle: "Blockchain & NFT Strategy",
    description: "Strategie Web3 dla marki. Budujemy community na blockchain, tworzymy NFT campaigns i strategie tokenomiki.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663163207746/8tjh5w8XqHsUFKvAv4Byd7/service-web3_6a6fc935.png",
    stats: "Future-ready",
    featured: false,
  },
  {
    id: "ghostwriting",
    title: "Ghost Writing",
    subtitle: "Content Creation & Copywriting",
    description: "Tworzymy treści, które mówią głosem Twojej marki. Każdy artykuł, post czy email jest zaprojektowany do konwersji.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663163207746/8tjh5w8XqHsUFKvAv4Byd7/service-ghostwriting_517a88d3.png",
    stats: "+85% engagement",
    featured: false,
  },
  {
    id: "personal-branding",
    title: "Personal Branding",
    subtitle: "Executive Positioning",
    description: "Budujemy osobistą markę liderów. Pozycjonujemy Cię jako eksperta i autorytet w Twojej branży.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663163207746/8tjh5w8XqHsUFKvAv4Byd7/service-personal-branding_fa76fcfe.png",
    stats: "Authority +300%",
    featured: false,
  },
  {
    id: "ceo-profiles",
    title: "Prowadzenie Profili CEO",
    subtitle: "Leadership Visibility",
    description: "Zarządzamy widocznością liderów. Budujemy thought leadership, media coverage i speaking opportunities.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663163207746/8tjh5w8XqHsUFKvAv4Byd7/service-ceo-profiles_01b8c431.png",
    stats: "Visibility +250%",
    featured: false,
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

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

        {/* Unified Services Grid with Horizontal Scroll */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-16 lg:-left-20 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Services Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 lg:gap-8 overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
                className={`flex-shrink-0 ${
                  service.featured ? "w-full md:w-1/2 lg:w-1/3" : "w-full md:w-1/2 lg:w-1/3"
                }`}
              >
                <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  {service.image && (
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        width="400"
                        height="192"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 relative flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                          {service.title}
                        </h3>
                        <p className="text-sm text-primary font-medium">
                          {service.subtitle}
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
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
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-16 lg:-right-20 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            ← Przewijaj aby zobaczyć więcej usług →
          </p>
        </div>
      </div>
    </section>
  );
}
