import { useAuth } from "@/_core/hooks/useAuth";
import websiteCms from '../data/blog/website-cms.json';
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectionRenderer from "@/components/SectionRenderer";

// Fallback components for sections not yet in Airtable
import IndustriesSection from "@/components/IndustriesSection";
import VideoAnimationSection from "@/components/VideoAnimationSection";
import ComparisonSection from "@/components/ComparisonSection";
import ResultsSection from "@/components/ResultsSection";
import RecentArticlesSection from "@/components/RecentArticlesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  // Find the home page data from the synced CMS data
  const homePage = websiteCms.pages.find(p => p.slug === 'home');
  
  const seo = (homePage?.seo || {}) as any;

  // Helper to find a section by type
  const getSection = (type: string) => homePage?.sections?.find(s => s.type === type);

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24">
      <Helmet>
        <title>{seo.title || 'BoostNow'}</title>
        <meta name="robots" content="index, follow" />
        {seo.description && <meta name="description" content={seo.description} />}
        {seo.primaryKeyword && <meta name="keywords" content={seo.primaryKeyword} />}
        {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        {(homePage as any)?.jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify((homePage as any).jsonLd)}
          </script>
        )}
      </Helmet>
      <Navigation />
      <main>
        {/* Dynamic Sections from Airtable */}
        {getSection('Hero') ? <SectionRenderer section={getSection('Hero')!} /> : <SectionRenderer section={{type: 'Hero', title: '', content: ''}} />}
        {getSection('Problem') ? <SectionRenderer section={getSection('Problem')!} /> : <SectionRenderer section={{type: 'Problem', title: '', content: ''}} />}
        {getSection('Solution') ? <SectionRenderer section={getSection('Solution')!} /> : <SectionRenderer section={{type: 'Solution', title: '', content: ''}} />}
        
        {/* Static Sections (will be migrated later) */}
        <IndustriesSection />
        <VideoAnimationSection />
        <ComparisonSection />
        <div id="results-section">
          <ResultsSection />
        </div>
        <RecentArticlesSection />
        <FAQSection />
        <div id="contact-section">
          <ContactSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}
