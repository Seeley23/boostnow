import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* Cookie Banner Component
   Design: RODO/GDPR Compliant Cookie Consent
   - Accept/Reject options
   - localStorage persistence
   - Google Analytics integration
*/

type CookieConsent = "accepted" | "rejected" | null;

const COOKIE_CONSENT_KEY = "boostnow_cookie_consent";

export default function CookieBanner() {
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsent;
    
    if (savedConsent) {
      setConsent(savedConsent);
      // Apply consent settings
      applyConsent(savedConsent);
    } else {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const applyConsent = (consentValue: CookieConsent) => {
    if (consentValue === "accepted") {
      // Enable analytics cookies
      enableAnalytics();
    } else if (consentValue === "rejected") {
      // Disable analytics cookies
      disableAnalytics();
    }
  };

  const enableAnalytics = () => {
    // Enable Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }
    
    // Enable Manus Analytics (already enabled by default)
    console.log("[CookieBanner] Analytics enabled");
  };

  const disableAnalytics = () => {
    // Disable Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      });
    }
    
    console.log("[CookieBanner] Analytics disabled");
  };

  const handleAccept = () => {
    const consentValue = "accepted";
    localStorage.setItem(COOKIE_CONSENT_KEY, consentValue);
    setConsent(consentValue);
    setShowBanner(false);
    applyConsent(consentValue);
  };

  const handleReject = () => {
    const consentValue = "rejected";
    localStorage.setItem(COOKIE_CONSENT_KEY, consentValue);
    setConsent(consentValue);
    setShowBanner(false);
    applyConsent(consentValue);
  };

  const handleClose = () => {
    // Close without saving (banner will show again on next visit)
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl p-6 md:p-8">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Zamknij banner cookies"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  Używamy plików cookies
                </h3>
                <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                  Nasza strona wykorzystuje pliki cookies w celu zapewnienia prawidłowego działania, 
                  analizy ruchu i personalizacji treści. Możesz zaakceptować wszystkie cookies lub 
                  odrzucić cookies analityczne i marketingowe.{" "}
                  <Link href="/polityka-cookies" className="text-primary hover:underline">
                    Dowiedz się więcej
                  </Link>
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={handleReject}
                  className="px-6 py-3 bg-secondary text-foreground font-heading font-semibold text-sm rounded-lg transition-all duration-300 hover:bg-secondary/80 whitespace-nowrap"
                >
                  Odrzuć
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-3 bg-primary text-primary-foreground font-heading font-semibold text-sm rounded-lg transition-all duration-300 hover:scale-105 glow-lime whitespace-nowrap"
                >
                  Akceptuj wszystkie
                </button>
              </div>
            </div>

            {/* Additional info */}
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Cookies niezbędne są zawsze aktywne. Możesz zmienić swoje preferencje w każdej chwili 
                w ustawieniach przeglądarki lub{" "}
                <Link href="/polityka-cookies" className="text-primary hover:underline">
                  polityce cookies
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// Export helper function to check consent status
export const getCookieConsent = (): CookieConsent => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsent;
};

// Export helper function to reset consent (for testing or user preference change)
export const resetCookieConsent = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.location.reload();
};
