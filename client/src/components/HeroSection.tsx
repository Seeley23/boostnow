import { motion } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, Target } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

/* HeroSection Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Asymmetric layout with hero image
   - Data-driven messaging
   - Command center aesthetic
*/

export default function HeroSection() {
  const scrollToContact = () => {
    trackCTAClick('hero_primary_cta', 'Zboostuj wyniki TERAZ', '#contact');
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    trackCTAClick('hero_secondary_cta', 'Zobacz jak działamy', '#services');
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663163207746/8tjh5w8XqHsUFKvAv4Byd7/hero-success_4c4a89bf.png"
          alt="Digital growth visualization"
          loading="eager"
          width="1920"
          height="1080"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-5 z-0"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.89 0.23 128 / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.89 0.23 128 / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left content - 7 columns */}
          <div className="lg:col-span-7">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Agencja Neuromarketingowa • Olsztyn</span>
            </motion.div>

            {/* Main headline - Updated */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-4 sm:mb-6"
            >
              <div>Agencja marketingowa</div>
              <div><span className="bg-gradient-to-r from-lime-400 via-lime-300 to-cyan-400 bg-clip-text text-transparent" style={{backgroundPosition: '0% 0%', backgroundSize: '200% 100%'}}>Skalujemy Twoją markę!</span></div>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-6 sm:mb-8 leading-relaxed"
            >
              Eliminujemy domysły z marketingu. Łączymy neuromarketing, dane i AI, abyś przestał przepalać budżet i zaczął skalować sprzedaż.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              <button
                onClick={scrollToContact}
                aria-label="Zboostuj wyniki TERAZ - przejdź do formularza"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground font-heading font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 glow-lime hover:glow-lime-strong"
              >
                <span>Zboostuj wyniki TERAZ</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={scrollToServices}
                aria-label="Zobacz jak działamy - przejdź do sekcji usług"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 border border-border text-foreground font-heading font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Zobacz jak działamy
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-border/50"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground">+150%</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">Średni wzrost ROAS</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground">90 dni</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">Do pierwszych wyników</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-foreground">7+ lat</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">Doświadczenia</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - decorative data visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="relative">
              {/* Floating data cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 right-0 glass-card rounded-lg p-4 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Konwersja</p>
                    <p className="font-heading font-bold text-foreground">+42.5%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -left-8 glass-card rounded-lg p-4 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Aktywacja</p>
                    <p className="font-heading font-bold text-foreground">LIVE</p>
                  </div>
                </div>
              </motion.div>

              {/* Main visual element */}
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="absolute inset-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse-glow">
                        <div className="w-6 h-6 rounded-full bg-primary" />
                      </div>
                    </div>
                    <p className="font-heading font-bold text-xl text-foreground mb-2">Decision Science</p>
                    <p className="text-sm text-muted-foreground">Architektura konwersji oparta na psychologii</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-wider">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
