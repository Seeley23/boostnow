import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

/* Navigation Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Fixed sticky header with glass effect on scroll
   - Status indicator (green dot)
   - Mobile hamburger menu as native dialog for a11y
   - Logo with negative margins to prevent height overflow
*/

const navItems = [
  { label: "O nas", href: "/o-nas" },
  { label: "AIO dla e-commerce", href: "/aio", highlight: true },
  { label: "Oblicz straty", href: "/calculator" },
  { label: "Blog", href: "/blog" },
  { label: "Słownik", href: "/glossary" },
  { label: "Kontakt", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

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
    dialogRef.current?.close();
  };

  const openMenu = () => dialogRef.current?.showModal();
  const closeMenu = () => dialogRef.current?.close();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border/50" 
            : "bg-background/95 border-b border-border/30"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8 py-3 lg:py-4">
            {/* Logo */}
            <a
              href="/"
              className="flex-shrink-0 flex items-center justify-center gap-0 group bg-transparent p-0 py-0"
            >
              <img 
                src="/images/logo.svg" 
                alt="BoostNow Logo"
                width="288"
                height="72"
                style={{ display: "block", margin: "0" }}
                className="h-12 sm:h-14 lg:h-[72px] w-auto hover:opacity-80 transition-opacity bg-transparent object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-3 lg:gap-4 flex-1 justify-center overflow-x-auto">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                    (item as any).highlight
                      ? "text-lime-400 hover:text-lime-300 font-semibold"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {(item as any).highlight && (
                    <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse align-middle" />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("#contact")}
              className="hidden lg:inline-flex flex-shrink-0 px-6 py-2 bg-gradient-to-r from-lime-400 to-lime-300 text-black rounded-lg font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Zboostuj wyniki
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={openMenu}
              className="lg:hidden flex-shrink-0 text-foreground p-2"
              aria-label="Otwórz menu nawigacji"
              aria-expanded={dialogRef.current?.open ?? false}
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu as native dialog */}
      <dialog
        ref={dialogRef}
        className="lg:hidden fixed inset-0 z-50 m-0 max-w-none max-h-none w-full h-full bg-background/95 backdrop-blur p-0 border-0"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border/30">
            <h2 id="mobile-menu-title" className="font-heading font-bold text-lg">Menu</h2>
            <button
              onClick={closeMenu}
              className="p-2 text-foreground"
              aria-label="Zamknij menu"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto py-4 space-y-2 px-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  (item as any).highlight
                    ? "text-lime-400 hover:text-lime-300 font-semibold hover:bg-lime-400/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-background/50"
                }`}
              >
                {item.label}
                {(item as any).highlight && (
                  <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse align-middle" />
                )}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("#contact")}
              className="block w-full px-4 py-3 bg-gradient-to-r from-lime-400 to-lime-300 text-black rounded-lg font-medium hover:opacity-90 transition-opacity mt-4"
            >
              Zboostuj wyniki
            </button>
          </div>
        </div>
      </dialog>

      {/* Spacer to prevent content overlap with fixed header */}
      <div className="h-16 sm:h-20 lg:h-24" />
    </>
  );
}
