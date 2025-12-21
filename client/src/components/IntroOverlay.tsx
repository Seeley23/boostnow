import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointerClick } from "lucide-react";

/* IntroOverlay Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Terminal-style text animation
   - Animated cursor icon for CTA
   - Only shows on first visit (localStorage)
*/

interface IntroOverlayProps {
  onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Make your brand fly";

  useEffect(() => {
    // Start text animation after initial delay
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 500);

    return () => clearTimeout(textTimer);
  }, []);

  useEffect(() => {
    if (!showText) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowButton(true), 300);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [showText]);

  const handleClick = () => {
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        style={{
          background: "linear-gradient(180deg, oklch(0.08 0.01 260) 0%, oklch(0.10 0.01 260) 50%, oklch(0.08 0.01 260) 100%)",
        }}
      >
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.89 0.23 128 / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.89 0.23 128 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"
          initial={{ top: "0%" }}
          animate={{ top: "100%" }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Main content */}
        <div className="relative z-10 text-center px-6">
          {/* Logo/Brand mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                BoostNow
              </span>
            </div>
          </motion.div>

          {/* Main headline with typing effect */}
          <div className="min-h-[120px] flex items-center justify-center">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
              {displayedText}
              {showText && displayedText.length < fullText.length && (
                <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-blink" />
              )}
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showButton ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-lg text-muted-foreground font-body"
          >
            Zboostuj z nami swoją markę
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <button
              onClick={handleClick}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold text-lg rounded-lg transition-all duration-300 hover:scale-105 glow-lime hover:glow-lime-strong"
            >
              <span>Kliknij i przejdź dalej</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <MousePointerClick className="w-5 h-5" />
              </motion.div>
              
              {/* Animated border */}
              <span className="absolute inset-0 rounded-lg border-2 border-primary opacity-50 animate-pulse" />
            </button>
          </motion.div>
        </div>

        {/* Bottom decorative elements */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-primary/50" />
          <span className="tracking-wider">SYSTEM READY</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
