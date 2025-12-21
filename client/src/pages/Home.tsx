import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import IntroOverlay from "@/components/IntroOverlay";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ResultsSection from "@/components/ResultsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/* Home Page - BoostNow
   Design: "Precision Strike" - Military-Grade Minimalism
   
   Structure:
   1. Intro Overlay (first visit only)
   2. Navigation
   3. Hero Section
   4. About Section
   5. Services Section
   6. Process Section
   7. Results Section (Case Studies)
   8. Contact Section
   9. Footer
*/

const INTRO_SHOWN_KEY = "boostnow_intro_shown";

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if intro was already shown
    const introShown = localStorage.getItem(INTRO_SHOWN_KEY);
    
    if (!introShown) {
      setShowIntro(true);
    }
    
    setIsLoading(false);
  }, []);

  const handleIntroComplete = () => {
    localStorage.setItem(INTRO_SHOWN_KEY, "true");
    setShowIntro(false);
  };

  // Show nothing while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
      </div>
    );
  }

  return (
    <>
      {/* Intro Overlay - only on first visit */}
      <AnimatePresence>
        {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* Main content */}
      {!showIntro && (
        <div className="min-h-screen bg-background">
          <Navigation />
          <main>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <ProcessSection />
            <ResultsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
