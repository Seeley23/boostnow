import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroOverlayProps {
  onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
      >
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-serif text-3xl mx-auto mb-8">
              B
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif text-slate-900 mb-6 tracking-tight">
              BoostNow
            </h1>
            <p className="text-xl text-slate-500 font-medium tracking-widest uppercase mb-12">
              Architekci Decyzji
            </p>
            
            <button
              onClick={onComplete}
              className="group bg-slate-900 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-slate-800 transition-all cursor-pointer shadow-xl shadow-slate-200"
            >
              Wejdź do świata wzrostu
            </button>
          </motion.div>
        </div>

        {/* Human-Centric Decorative Element */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M500,100 C600,200 800,300 900,500 C1000,700 800,900 500,900 C200,900 0,700 100,500 C200,300 400,200 500,100" fill="currentColor" />
          </svg>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
