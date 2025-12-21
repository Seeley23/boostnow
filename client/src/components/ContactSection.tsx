import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { toast } from "sonner";

/* ContactSection Component
   Design: "Human-Centric Minimalism" - Light Gray Background
   - Lead magnet approach
   - Simple contact form
   - Trust signals with emojis
*/

const benefits = [
  {
    emoji: "⚡",
    text: "Natychmiastowa odpowiedź w ciągu 24h",
  },
  {
    emoji: "⏱️",
    text: "Bezpłatna konsultacja strategiczna",
  },
  {
    emoji: "🤝",
    text: "Bez zobowiązań - decydujesz po rozmowie",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Wiadomość wysłana! Skontaktujemy się wkrótce.");
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden bg-background">
      {/* Organic background shapes */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-medium text-accent tracking-wider uppercase mb-4">
              💬 Skontaktuj się
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
              Omów swoją sytuację z <span className="text-accent">ekspertem</span>
            </h2>

            {/* Benefits list */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-white/60 backdrop-blur rounded-lg p-4 border border-accent/20 hover:border-accent/40 transition-all"
                >
                  <div className="text-2xl flex-shrink-0">{benefit.emoji}</div>
                  <p className="text-foreground/70 text-sm leading-relaxed">{benefit.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Email link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/70 backdrop-blur rounded-lg p-6 border border-accent/20"
            >
              <p className="text-sm text-foreground/70 mb-2">Lub napisz do nas bezpośrednio:</p>
              <a
                href="mailto:kontakt@boostnow.pl"
                className="text-lg font-bold text-accent hover:text-accent/80 transition-colors flex items-center gap-2"
              >
                kontakt@boostnow.pl
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right column - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 backdrop-blur rounded-xl p-8 border border-accent/20 shadow-lg"
          >
            {!isSubmitted ? (
              <>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Zarezerwuj konsultację
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Jan Kowalski"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="jan@firma.pl"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                      Firma
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Nazwa firmy"
                      className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Opisz swoje wyzwanie
                    </label>
                    <textarea
                      id="message"
                      placeholder="Opisz swoje wyzwanie lub cel..."
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 bg-accent text-foreground font-bold rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Wysyłanie..." : "Zboostuj wyniki TERAZ"}
                    {!isSubmitting && <ArrowRight size={20} />}
                  </button>

                  <p className="text-xs text-foreground/60 text-center">
                    Odpowiemy w ciągu 24 godzin. Gwarantujemy poufność Twoich danych.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="mb-4"
                >
                  <CheckCircle size={64} className="text-accent mx-auto" />
                </motion.div>
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  Dziękujemy!
                </h3>
                <p className="text-foreground/70 mb-6">
                  Twoja wiadomość została wysłana. Skontaktujemy się z Tobą w ciągu 24 godzin.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-accent font-semibold hover:text-accent/80 transition-colors"
                >
                  Wyślij kolejną wiadomość
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
