import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, ArrowRight, CheckCircle, Zap, Clock, Shield, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import DOMPurify from "dompurify";
import { trackFormSubmit } from "@/lib/analytics";
import { RecaptchaV3, getRecaptchaToken } from "./RecaptchaV3";
import { useFieldErrorSync } from "@/hooks/useFieldErrorSync";

/* ContactSection Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Lead magnet approach
   - Simple contact form
   - Trust signals
*/

const benefits = [
  {
    icon: Zap,
    text: "Natychmiastowa odpowiedź w ciągu 24h",
  },
  {
    icon: Clock,
    text: "Bezpłatna konsultacja strategiczna",
  },
  {
    icon: Shield,
    text: "Bez zobowiązań - decydujesz po rozmowie",
  },
];

interface ContactSectionProps {
  title?: string;
  description?: string;
}

export default function ContactSection({ title, description }: ContactSectionProps = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  useFieldErrorSync(formRef);

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: (data, variables) => {
      setIsSubmitted(true);
      toast.success("Wiadomość wysłana! Skontaktujemy się wkrótce.");
      
      // Track form submission in GTM with detailed data
      trackFormSubmit('contact_form', {
        form_location: 'contact_section',
        has_company: !!variables.company,
        message_length: variables.message?.length || 0,
      });
    },
    onError: (error) => {
      toast.error(`Błąd: ${error.message}`);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get reCAPTCHA token
      const recaptchaToken = await getRecaptchaToken('contact_form');

      const formData = new FormData(e.currentTarget);
      
      // Sanitize input data to prevent XSS attacks
      const data = {
        name: DOMPurify.sanitize(formData.get("name") as string, { ALLOWED_TAGS: [] }),
        email: DOMPurify.sanitize(formData.get("email") as string, { ALLOWED_TAGS: [] }),
        company: formData.get("company") ? DOMPurify.sanitize(formData.get("company") as string, { ALLOWED_TAGS: [] }) : undefined,
        message: DOMPurify.sanitize(formData.get("message") as string, { ALLOWED_TAGS: [] }),
        recaptchaToken, // Add reCAPTCHA token
      };

      console.log("[ContactSection] Sanitized data:", data);

      contactMutation.mutate(data);
    } catch (error) {
      console.error('[ContactSection] reCAPTCHA error:', error);
      toast.error('Błąd weryfikacji bezpieczeństwa. Spróbuj ponownie.');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-medium text-primary tracking-wider uppercase mb-4">
              Kontakt
            </span>
            <h2 id="contact-form-heading" className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Chcesz{" "}
              <span className="text-gradient-lime">BOOST</span>{" "}
              dla swoich wyników?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Nie trać czasu na powolny wzrost. Skontaktuj się z nami i zmień potencjał 
              w <strong className="text-foreground">natychmiastowe konwersje</strong>.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Direct email */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Napisz bezpośrednio</p>
                <a 
                  href="mailto:kontakt@boostnow.pl" 
                  className="font-heading font-semibold text-foreground hover:text-primary transition-colors"
                >
                  kontakt@boostnow.pl
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* reCAPTCHA v3 - invisible */}
            <RecaptchaV3 action="contact_form" onToken={() => {}} />
            
            <div className="rounded-2xl bg-card border border-border p-4 sm:p-6 lg:p-8">
              {/* Always in the page so the change of text is announced */}
              <p role="status" className="sr-only">
                {isSubmitted ? "Wiadomość została wysłana. Skontaktujemy się w ciągu 24 godzin." : ""}
              </p>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-2">
                    Dziękujemy!
                  </h3>
                  <p className="text-muted-foreground">
                    Twoja wiadomość została wysłana. Skontaktujemy się w ciągu 24 godzin.
                  </p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} aria-labelledby="contact-form-heading" className="space-y-4 sm:space-y-6">
                  <p className="text-xs text-muted-foreground mb-4">Pola oznaczone <span aria-hidden="true">*</span> są wymagane.</p>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Imię i nazwisko<span aria-hidden="true" className="text-primary"> *</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      enterKeyHint="next"
                      data-error="name-error"
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 min-h-12 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:ring-offset-2 user-invalid:border-destructive transition-all text-base peer"
                      placeholder="Jan Kowalski"
                    />
                    <p id="name-error" className="hidden peer-user-invalid:flex items-center gap-1.5 text-sm text-destructive mt-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span><span className="sr-only">Błąd: </span>Podaj imię i nazwisko.</span>
                    </p>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email<span aria-hidden="true" className="text-primary"> *</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      enterKeyHint="next"
                      data-error="email-error"
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 min-h-12 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:ring-offset-2 user-invalid:border-destructive transition-all text-base peer"
                      placeholder="jan@firma.pl"
                    />
                    <p id="email-error" className="hidden peer-user-invalid:flex items-center gap-1.5 text-sm text-destructive mt-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span><span className="sr-only">Błąd: </span>Podaj poprawny adres email, np. jan@firma.pl.</span>
                    </p>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Firma
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="organization"
                      enterKeyHint="next"
                      aria-describedby="company-help"
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 min-h-12 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:ring-offset-2 user-invalid:border-destructive transition-all text-base peer"
                      placeholder="Nazwa firmy"
                    />
                    <p id="company-help" className="text-xs text-muted-foreground mt-1">Opcjonalnie</p>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Jak możemy Ci pomóc?<span aria-hidden="true" className="text-primary"> *</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      minLength={10}
                      aria-describedby="message-help"
                      data-error="message-error"
                      className="w-full px-3 py-2.5 sm:px-4 sm:py-3 min-h-12 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:ring-offset-2 user-invalid:border-destructive transition-all resize-y text-base peer"
                      placeholder="Opisz swoje wyzwanie lub cel..."
                    />
                    <p id="message-help" className="text-xs text-muted-foreground mt-1">Minimum 10 znaków</p>
                    <p id="message-error" className="hidden peer-user-invalid:flex items-center gap-1.5 text-sm text-destructive mt-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span><span className="sr-only">Błąd: </span>Opisz swoją sprawę w co najmniej 10 znakach.</span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting}
                    className="w-full group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground font-heading font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 glow-lime hover:glow-lime-strong disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-12"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" aria-hidden="true" />
                        <span>Wysyłanie...</span>
                      </>
                    ) : (
                      <>
                        <span>Zboostuj wyniki TERAZ</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-muted-foreground">
                    Wysyłając formularz, zgadzasz się na przetwarzanie danych w celu kontaktu.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
