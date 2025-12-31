import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

/* Navigation Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Fixed sticky header with glass effect on scroll
   - Status indicator (green dot)
   - Mobile hamburger menu
   - Logo with negative margins to prevent height overflow
*/

const navItems = [
  { label: "O nas", href: "/about" },
  { label: "Oblicz straty", href: "/calculator" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('/')) {
      window.location.href = href;
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, width: "100%", zIndex: 1000 }}
        className={`${
          isScrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50" 
            : "bg-background/95 border-b border-border/30"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start h-20 lg:h-24">
            {/* Logo */}
            <a 
              href="/" 
              onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}
              className="flex items-center gap-0 group bg-transparent p-0"
            >
              <img 
                src="/images/logo.png" 
                alt="BoostNow Logo" 
                style={{ display: "block", margin: "0", marginTop: "-60px", marginBottom: "-60px" }}
                className="w-72 hover:opacity-80 transition-opacity bg-transparent object-contain" 
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 ml-auto">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("#contact")}
              className="hidden lg:inline-flex px-6 py-2 bg-gradient-to-r from-lime-400 to-lime-300 text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Zboostuj wyniki
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-foreground"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden border-t border-border/30 py-4 space-y-2"
            >
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-foreground/70 hover:text-foreground hover:bg-background/50 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("#contact")}
                className="block w-full px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Zboostuj wyniki
              </button>
            </motion.div>
          )}
        </nav>
      </motion.header>

      {/* Spacer to prevent content overlap with fixed header */}
      <div className="h-20 lg:h-24" />
    </>
  );
}
