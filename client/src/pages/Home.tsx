import { useAuth } from "@/_core/hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
// import AboutSection from "@/components/AboutSection"; // WYCIĄTE
import ResultsSection from "@/components/ResultsSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";

/* Home Page - BoostNow
   Design: "Precision Strike" - Military-Grade Minimalism
   Low Cognitive Load - 5 Main Sections
   
   Structure:
   1. Navigation
   2. Hero Section
   3. Problem Section
   4. Solution Section
   5. Results Section (Case Studies)
   6. FAQ Section
   7. Contact Section
   8. Footer
*/

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24">
      <Helmet>
        <title>Agencja Neuromarketingowa - CRO & Decision Science</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Agencja Neuromarketingowa w Olsztynie - CRO i Decision Science. Zwiększamy ROAS e-commerce o 150% w 90 dni dla marek z całej Polski." />
        <meta name="keywords" content="agencja neuromarketingowa olsztyn, optymalizacja konwersji CRO, decision science, agencja marketingowa" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boostnow.pl" />
        <meta property="og:title" content="BoostNow - Skalujemy wyniki, o których inni tylko marzą" />
        <meta property="og:description" content="Agencja aktywacji klientów specjalizująca się w Decision Science, Inżynierii Konwersji i GEO Positioning. +150% ROAS w 90 dni. Przestań finansować swoją niewidzialność." />
        <meta property="og:image" content="https://boostnow.pl/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://boostnow.pl" />
        <meta name="twitter:title" content="BoostNow - Skalujemy wyniki, o których inni tylko marzą" />
        <meta name="twitter:description" content="Agencja aktywacji klientów specjalizująca się w Decision Science, Inżynierii Konwersji i GEO Positioning. +150% ROAS w 90 dni." />
        <meta name="twitter:image" content="https://boostnow.pl/og-image.jpg" />
        <link rel="canonical" href="https://boostnow.pl" />
      </Helmet>
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ResultsSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
