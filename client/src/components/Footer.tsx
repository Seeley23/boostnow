import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram, Facebook } from "lucide-react";
import { Link } from "wouter";

/* Footer Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Minimal footer with essential links
   - Social proof and contact
*/

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/boostnowmarketing", label: "LinkedIn" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61585415810749", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/boostnow_marketing/", label: "Instagram" },
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
    <footer className="relative border-t border-border bg-card/30">
      <div className="container py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 mb-4 bg-transparent"
            >
              <img 
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663163207746/8tjh5w8XqHsUFKvAv4Byd7/logo_f76f3dc6.svg" 
                alt="BoostNow Logo"
                width="320"
                height="40"
                className="w-80 h-auto bg-transparent object-contain" 
              />
            </a>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Agencja Aktywacji Klientów. Przyspieszamy wzrost Twojej marki poprzez 
              psychologię decyzji i mierzalne strategie.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links column */}
          <div className="lg:col-span-4">
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Nawigacja
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-4">
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Kontakt
            </h4>
            <div className="space-y-4">
              <a 
                href="mailto:kontakt@boostnow.pl"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              >
                <Mail className="w-4 h-4" />
                kontakt@boostnow.pl
              </a>
              
              <div className="pt-4">
                <button
                  onClick={() => scrollToSection("#contact")}
                  aria-label="Zboostuj wyniki - przejdź do formularza"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-heading font-semibold text-sm rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 glow-lime"
                >
                  Zboostuj wyniki
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
            <div className="text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">BoostNow Agencja marketingowa</p>
              <p>ul. Marii Konopnickiej 11</p>
              <p>11-040 Dobre Miasto</p>
            </div>
            <div className="text-xs text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Dane Rejestrowe</p>
              <p>NIP: 7393776527</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} BoostNow. Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>System aktywny</span>
            </div>
          </div>
          
          {/* Legal links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <Link href="/regulamin" className="hover:text-primary transition-colors">
              Regulamin
            </Link>
            <span>•</span>
            <Link href="/polityka-prywatnosci" className="hover:text-primary transition-colors">
              Polityka Prywatności
            </Link>
            <span>•</span>
            <Link href="/polityka-cookies" className="hover:text-primary transition-colors">
              Polityka Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
