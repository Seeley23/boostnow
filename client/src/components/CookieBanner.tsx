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
        className="fixed bottom-0 left-0 right-0 z-50 p-3 md:p-4 pointer-events-none"
        role="dialog"
        aria-label="Zgoda na pliki cookies"
      >
        <div className="mx-auto max-w-4xl pointer-events-auto">
          <div className="relative bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl p-4 md:px-5 md:py-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
              <div className="flex items-start gap-3 flex-1 pr-6 md:pr-0">
                <Cookie className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-snug">
                  <span className="font-semibold text-foreground">Używamy plików cookies</span>{" "}
                  do działania strony i analizy ruchu. Niezbędne są zawsze aktywne.{" "}
                  <Link href="/polityka-cookies" className="text-primary hover:underline">
                    Polityka cookies
                  </Link>
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={handleReject}
                  className="flex-1 md:flex-none px-4 py-2.5 bg-secondary text-foreground font-heading font-semibold text-sm rounded-lg transition-colors hover:bg-secondary/80 whitespace-nowrap"
                >
                  Odrzuć
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 md:flex-none px-4 py-2.5 bg-primary text-primary-foreground font-heading font-semibold text-sm rounded-lg transition-opacity hover:opacity-90 whitespace-nowrap"
                >
                  Akceptuj wszystkie
                </button>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="absolute top-3 right-3 md:hidden text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Zamknij banner cookies"
            >
              <X className="w-4 h-4" />
            </button>
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
