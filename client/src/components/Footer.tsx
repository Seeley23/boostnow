import { Mail, Linkedin, Instagram } from "lucide-react";

/* Footer Component
   Design: "Human-Centric Minimalism" - Light Gray Background
   - Minimal footer with essential links
   - Social proof and contact
   - Warm, professional aesthetic
*/

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const footerLinks = [
  { label: "O nas", href: "#about" },
  { label: "Usługi", href: "#services" },
  { label: "Proces", href: "#process" },
  { label: "Rezultaty", href: "#results" },
  { label: "Kontakt", href: "#contact" },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-accent/20 bg-white/40">
      <div className="container py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); scrollToSection("#"); }}
              className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <div className="w-3 h-3 rounded-full bg-accent" />
              <span className="font-heading font-bold text-xl text-foreground">
                Boost<span className="text-accent">Now</span>
              </span>
            </a>
            <p className="text-sm text-foreground/70 leading-relaxed mb-6">
              Agencja Aktywacji Klientów. Transformujemy marki poprzez Decision Science i psychologię konwersji.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="p-2 rounded-lg bg-white/60 border border-accent/20 text-foreground hover:bg-accent hover:text-white transition-all"
                >
                  <link.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          <div className="lg:col-span-4">
            <h4 className="font-heading font-bold text-foreground mb-4">Nawigacja</h4>
            <nav className="space-y-2">
              {footerLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-sm text-foreground/70 hover:text-accent transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-4">
            <h4 className="font-heading font-bold text-foreground mb-4">Kontakt</h4>
            <div className="space-y-3">
              <a
                href="mailto:kontakt@boostnow.pl"
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors"
              >
                <Mail size={16} />
                kontakt@boostnow.pl
              </a>
              <p className="text-xs text-foreground/60">
                ⏱️ Odpowiadamy w ciągu 24 godzin
              </p>
              <p className="text-xs text-foreground/60">
                🇵🇱 Warszawa, Polska
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent/20 my-8" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-foreground/60">
          <p>© 2025 BoostNow. Wszystkie prawa zastrzeżone.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">Polityka prywatności</a>
            <a href="#" className="hover:text-accent transition-colors">Warunki użytkowania</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
