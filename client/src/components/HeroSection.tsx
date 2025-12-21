import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* HeroSection Component
   Design: "Human-Centric Minimalism" - Light Gray Background
   - Warm, professional aesthetic
   - Human-focused messaging
   - Organic shapes and illustrations
*/

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Organic background shapes */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left content - 7 columns */}
          <div className="lg:col-span-7">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-accent bg-white/60 mb-6"
            >
              <span className="text-sm font-medium text-accent">🚀 Agencja Aktywacji Klientów</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6"
            >
              Zboostuj z nami{" "}
              <span className="text-accent">swoją markę!</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-foreground/70 max-w-xl mb-8 leading-relaxed"
            >
              <strong className="text-foreground">Przestań finansować swoją niewidzialność.</strong> Wdróż system przymusu uwagi!
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 mb-8 max-w-lg"
            >
              <div className="bg-white/70 rounded-lg p-4 border border-accent/20">
                <div className="text-2xl font-bold text-accent">+150%</div>
                <div className="text-sm text-foreground/60">Średni wzrost ROAS</div>
              </div>
              <div className="bg-white/70 rounded-lg p-4 border border-accent/20">
                <div className="text-2xl font-bold text-accent">90 dni</div>
                <div className="text-sm text-foreground/60">Do pierwszych wyników</div>
              </div>
              <div className="bg-white/70 rounded-lg p-4 border border-accent/20">
                <div className="text-2xl font-bold text-accent">7+ lat</div>
                <div className="text-sm text-foreground/60">Doświadczenia</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-foreground font-bold rounded-lg hover:bg-accent/90 transition-all transform hover:scale-105 active:scale-95"
              >
                Zboostuj wyniki TERAZ
                <ArrowRight size={20} />
              </button>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/70 text-foreground font-bold rounded-lg border-2 border-accent hover:bg-white transition-all"
              >
                Zobacz jak działamy
              </button>
            </motion.div>
          </div>

          {/* Right side - Illustration area */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-96"
            >
              {/* Decorative card with stats */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border border-accent/20 w-64">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">📈</div>
                  <div>
                    <div className="text-sm font-bold text-foreground">Konwersja</div>
                    <div className="text-xs text-foreground/60">+42.5%</div>
                  </div>
                </div>
                <div className="text-xs text-foreground/70 leading-relaxed">
                  Decision Science - psychologia oparła na nauce, a nie na zgadywankach.
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute left-0 top-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                className="absolute right-10 bottom-10 w-24 h-24 bg-accent/15 rounded-full blur-2xl"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <div className="text-xs text-foreground/60 mb-2">SCROLL</div>
        <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
