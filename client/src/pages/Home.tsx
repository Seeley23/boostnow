import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
// import AboutSection from "@/components/AboutSection"; // WYCIĄTE
import ServicesSection from "@/components/ServicesSection";
// import ProcessSection from "@/components/ProcessSection"; // WYCIĄTE
import ResultsSection from "@/components/ResultsSection";
// import TargetAudienceSection from "@/components/TargetAudienceSection"; // WYCIĄTE
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
// import LossCalculator from "@/components/LossCalculator"; // WYCIĄTE
// import RecentBlog from "@/components/RecentBlog"; // WYCIĄTE
import IndustriesSection from "@/components/IndustriesSection";
import VideoAnimationSection from "@/components/VideoAnimationSection";
import RecentArticlesSection from "@/components/RecentArticlesSection";
import ProcessSectionShort from "@/components/ProcessSectionShort";
import ComparisonSection from "@/components/ComparisonSection";

/* Home Page - BoostNow
   Design: "Precision Strike" - Military-Grade Minimalism
   
   Structure:
   1. Navigation
   2. Hero Section
   3. Problem Section
   4. Solution Section
   5. Industries Section
   6. Video Animation Section
   7. Process Section (Short)
   8. Comparison Section
   9. Recent Articles Section
   10. Results Section (Case Studies)
   11. FAQ Section
   12. Contact Section
   13. Footer
*/

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24">
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <IndustriesSection />
        <VideoAnimationSection />
        <ProcessSectionShort />
        <ComparisonSection />
        <RecentArticlesSection />
        <ResultsSection />

        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
