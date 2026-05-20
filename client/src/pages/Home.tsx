import { useAuth } from "@/_core/hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SectionRenderer from "@/components/SectionRenderer";
import websiteCms from '../data/blog/website-cms.json';

export default function Home() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  
  // Find the home page data from the synced CMS data
  const homePage = websiteCms.pages.find(p => p.slug === 'home');
  const seo = homePage?.seo || {
    title: 'Agencja Neuromarketingowa - CRO & Decision Science | BoostNow',
    description: 'Agencja Neuromarketingowa w Olsztynie - CRO i Decision Science. Zwiększamy ROAS e-commerce o 150% w 90 dni.',
    primaryKeyword: 'agencja neuromarketingowa'
  };

  return (
    <div className="min-h-screen bg-background pt-20 lg:pt-24">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.primaryKeyword} />
        <meta name="robots" content="index, follow" />
        {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        {homePage?.jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(homePage.jsonLd)}
          </script>
        )}
      </Helmet>
      
      <Navigation />
      
      <main>
        {homePage && homePage.sections && homePage.sections.length > 0 ? (
          homePage.sections.map((section, idx) => (
            <SectionRenderer key={idx} section={section} />
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">Brak treści w Airtable dla strony głównej. Dodaj sekcje w tabeli Page_Sections.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
