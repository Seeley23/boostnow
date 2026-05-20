import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, Zap } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function HeroSection({ title, subtitle }: HeroProps) {
  const displayTitle = title || "Zdominuj Wyniki Wyszukiwania AI";
  const displaySubtitle = subtitle || "Zwiększamy ROAS e-commerce o 150% w 90 dni dla marek z całej Polski. Architektura konwersji oparta na psychologii.";

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-heading font-medium tracking-wider text-foreground uppercase">
                  Elite GEO & Decision Science
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-[1.1] mb-6">
                {displayTitle.split(' ').map((word, i) => (
                  <span key={i} className={word.toLowerCase() === 'ai' || word.toLowerCase() === 'wyniki' ? "text-primary" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {displaySubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })} className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold text-lg rounded-lg transition-all duration-300 hover:scale-105 glow-lime hover:glow-lime-strong">
                  Zboostuj wyniki TERAZ
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-foreground font-heading font-semibold text-lg rounded-lg border border-border transition-all hover:bg-secondary/80">
                  Zobacz Case Studies
                </button>
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-4 sm:gap-8 border-t border-border pt-8"
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
    </section>
  );
}
