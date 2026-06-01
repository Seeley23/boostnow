import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import LossCalculator from "@/components/LossCalculator";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import websiteCms from '../data/blog/website-cms.json';

export default function CalculatorPage() {
  const cmsPage = (websiteCms as any).pages?.find((p: any) => p.slug === 'oblicz-straty');
  const seo = cmsPage?.seo || {};

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{seo.title || 'Kalkulator Strat | BoostNow'}</title>
        <meta name="robots" content="index, follow" />
        {seo.description && <meta name="description" content={seo.description} />}
        {seo.primaryKeyword && <meta name="keywords" content={seo.primaryKeyword} />}
        {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        {cmsPage?.jsonLd && (
          <script type="application/ld+json">{JSON.stringify(cmsPage.jsonLd)}</script>
        )}
      </Helmet>
      <BreadcrumbSchema items={[
        { name: 'Strona główna', url: 'https://boostnow.pl' },
        { name: 'Oblicz straty', url: 'https://boostnow.pl/calculator' }
      ]} />
      <Navigation />
      <main>
        <LossCalculator />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
