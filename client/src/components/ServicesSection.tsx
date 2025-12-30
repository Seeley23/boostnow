import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

/* ServicesSection Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - 3 featured services always visible
   - 7 additional services in carousel slider
   - Arrow navigation for slider
*/

const services = [
  {
    id: "conversion",
    title: "Inżynieria Konwersji",
    subtitle: "Landing Pages & Copywriting",
    description: "Tworzymy strony i treści, które nie proszą - egzekwują pożądanie. Każde słowo jest zaprojektowane do wywołania natychmiastowej akcji. Architektura decyzji oparta na psychologii.",
    image: "/images/service-conversion.png",
    stats: "+40% konwersji",
    featured: true,
  },
  {
    id: "ai",
    title: "Visual Excellence AI",
    subtitle: "Video & Photo produktowe",
    description: "Wizualizacje produktowe napędzane przez AI. Tworzymy wideo, które sprzedaje Twój produkt w 15 sekund.",
    image: "/images/service-ai-visual.png",
    stats: "3x szybciej",
    featured: true,
  },
  {
    id: "community",
    title: "Community Growth",
    subtitle: "Strategie Lojalności",
    description: "Silne marki nie mają klientów - mają społeczność. Budujemy ekstremalną lojalność i transparentność relacji.",
    image: "/images/service-community.png",
    stats: "7+ lat doświadczenia",
    featured: true,
  },
  {
    id: "ecommerce",
    title: "E-commerce Optimization",
    subtitle: "Opisy produktowe & Naracja",
    description: "Tworzymy opisy produktów, które sprzedają. Budujemy narrację marki, która resonuje z Twoimi klientami i eliminuje błędy poznawcze.",
    image: "/images/service-ecommerce.png",
    stats: "+62% konwersji",
    featured: false,
  },
  {
    id: "geo",
    title: "GEO Positioning",
    subtitle: "AI Search Optimization",
    description: "Pozycjonowanie w ChatGPT, Perplexity i Gemini. Zwiększamy Share of Model Voice (SoMV) dla Twojej marki w AI search engines.",
    image: "/images/service-geo.png",
    stats: "SoMV +380%",
    featured: false,
  },
  {
    id: "seo",
    title: "SEO Positioning",
    subtitle: "Organic Search Strategy",
    description: "Strategie SEO oparte na Decision Science. Budujemy autorytetu marki i dominujemy wyniki wyszukiwania dla kluczowych fraz.",
    image: "/images/service-seo.png",
    stats: "+150% organic traffic",
    featured: false,
  },
  {
    id: "web3",
    title: "Web3 Services",
    subtitle: "Blockchain & NFT Strategy",
    description: "Strategie Web3 dla marki. Budujemy community na blockchain, tworzymy NFT campaigns i strategie tokenomiki.",
    image: "/images/service-web3.png",
    stats: "Future-ready",
    featured: false,
  },
  {
    id: "ghostwriting",
    title: "Ghost Writing",
    subtitle: "Content Creation & Copywriting",
    description: "Tworzymy treści, które mówią głosem Twojej marki. Każdy artykuł, post czy email jest zaprojektowany do konwersji.",
    image: "/images/service-ghostwriting.png",
    stats: "+85% engagement",
    featured: false,
  },
  {
    id: "personal-branding",
    title: "Personal Branding",
    subtitle: "Executive Positioning",
    description: "Budujemy osobistą markę liderów. Pozycjonujemy Cię jako eksperta i autorytet w Twojej branży.",
    image: "/images/service-personal-branding.png",
    stats: "Authority +300%",
    featured: false,
  },
  {
    id: "ceo-profiles",
    title: "Prowadzenie Profili CEO",
    subtitle: "Leadership Visibility",
    description: "Zarządzamy widocznością liderów. Budujemy thought leadership, media coverage i speaking opportunities.",
    image: "/images/service-ceo-profiles.png",
    stats: "Visibility +250%",
    featured: false,
  },
];

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sliderIndex, setSliderIndex] = useState(0);

  const featuredServices = services.filter(s => s.featured);
  const sliderServices = services.filter(s => !s.featured);

  const handlePrevSlide = () => {
    setSliderIndex((prev) => (prev === 0 ? sliderServices.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setSliderIndex((prev) => (prev === sliderServices.length - 1 ? 0 : prev + 1));
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

        {/* Featured Services - 3 visible cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {featuredServices.map((service, index) => (
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

        {/* Slider Services - 7 services with arrow navigation */}
        <div className="relative">
          <div className="flex items-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={handlePrevSlide}
              className="absolute -left-16 lg:-left-20 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Slider Container */}
            <div className="w-full overflow-hidden">
              <motion.div
                initial={false}
                animate={{ x: -sliderIndex * 100 + "%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex gap-6 lg:gap-8"
              >
                {sliderServices.map((service) => (
                  <motion.div
                    key={service.id}
                    className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                  >
                    <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-all duration-300 h-full">
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
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNextSlide}
              className="absolute -right-16 lg:-right-20 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              aria-label="Next service"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Slider Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {sliderServices.map((_, index) => (
              <button
                key={index}
                onClick={() => setSliderIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === sliderIndex
                    ? "bg-primary w-8"
                    : "bg-primary/30 w-2 hover:bg-primary/50"
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
