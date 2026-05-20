import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function HeroSection({ title, subtitle }: HeroProps) {
  const displayTitle = title || "Zdominuj Wyniki Wyszukiwania AI";
  const displaySubtitle = subtitle || "Zwiększamy ROAS e-commerce o 150% w 90 dni dla marek z całej Polski. Architektura konwersji oparta na psychologii.";

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">
                Elite GEO & Decision Science
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-serif text-slate-900 mb-8 leading-[1.1] tracking-tight text-balance">
              {displayTitle}
            </h1>

            <p className="text-xl lg:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              {displaySubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="group bg-slate-900 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer shadow-xl shadow-slate-200">
                Zboostuj wyniki
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-4 text-slate-500 font-medium">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Gwarancja ROAS
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Human-Centric Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.02] pointer-events-none">
        <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M500,100 C600,200 800,300 900,500 C1000,700 800,900 500,900 C200,900 0,700 100,500 C200,300 400,200 500,100" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
