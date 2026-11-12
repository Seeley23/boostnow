import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, Zap, Sparkles, Search } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function HeroSection({ title, subtitle }: HeroProps) {
  const displayTitle = title || "Zdominuj Wyniki Wyszukiwania AI";
  const displaySubtitle = subtitle || "Zwiększamy ROAS e-commerce o 150% w 90 dni dla marek z całej Polski. Architektura konwersji oparta na psychologii.";

  return (
    <section className="relative flex items-center py-14 sm:py-16 lg:py-20 lg:min-h-[calc(100svh-6rem)] overflow-hidden bg-background">
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
            {/* Mock AI answer: shows the outcome we sell (brand cited by an AI engine) */}
            <div className="relative max-w-md mx-auto" aria-hidden="true">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-4 glass-card rounded-lg p-4 z-10"
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

              <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-1 shadow-2xl shadow-primary/5">
                <div className="rounded-xl bg-card/90 backdrop-blur-sm p-6">
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-background/60 px-4 py-3 mb-5">
                    <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-foreground truncate">Najlepsza agencja GEO w Polsce?</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-heading font-semibold uppercase tracking-wider text-primary">Odpowiedź AI</span>
                  </div>

                  <div className="space-y-2 mb-5">
                    <div className="h-2.5 rounded-full bg-muted w-full" />
                    <div className="h-2.5 rounded-full bg-muted w-11/12" />
                    <p className="text-sm text-foreground leading-relaxed py-1">
                      Według{" "}
                      <span className="rounded bg-primary/15 px-1.5 py-0.5 font-semibold text-primary">Twojej marki</span>{" "}
                      kluczowe są cytowalne treści i dane strukturalne.
                    </p>
                    <div className="h-2.5 rounded-full bg-muted w-10/12" />
                    <div className="h-2.5 rounded-full bg-muted w-7/12" />
                  </div>

                  <div className="border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground mb-2">Źródła</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        twojamarka.pl
                      </span>
                      <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">źródło 2</span>
                      <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">źródło 3</span>
                    </div>
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
