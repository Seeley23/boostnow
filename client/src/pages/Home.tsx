import { useAuth } from "@/_core/hooks/useAuth";
import siteSeo from '../data/blog/site-seo.json';
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import IndustriesSection from "@/components/IndustriesSection";
import VideoAnimationSection from "@/components/VideoAnimationSection";
import RecentArticlesSection from "@/components/RecentArticlesSection";
import ProcessSectionShort from "@/components/ProcessSectionShort";
import ComparisonSection from "@/components/ComparisonSection";

export default function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24">
      <Helmet>
        <title>{(siteSeo as any)['Home']?.title || 'Agencja Neuromarketingowa - CRO & Decision Science'}</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={(siteSeo as any)['Home']?.description || 'Agencja Neuromarketingowa w Olsztynie - CRO i Decision Science. Zwiększamy ROAS e-commerce o 150% w 90 dni dla marek z całej Polski.'} />
        <meta name="keywords" content={(siteSeo as any)['Home']?.keywords || 'agencja neuromarketingowa olsztyn, optymalizacja konwersji CRO, decision science, agencja marketingowa'} />
      </Helmet>
      <Navigation />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <IndustriesSection />
        <VideoAnimationSection />
        <ComparisonSection />
        <ResultsSection />
        <RecentArticlesSection />
        <FAQSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
