import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionRenderer from '../components/SectionRenderer';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import websiteData from '../data/blog/website-cms.json';

const DynamicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    if (slug && websiteData.pages) {
      const page = websiteData.pages.find((p: any) => p.slug === slug);
      if (page && page.status === 'Published') {
        setPageData(page);
      }
    }
  }, [slug]);

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600">Strona nie została znaleziona lub jest w wersji roboczej.</p>
          <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">Wróć do strony głównej</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{pageData.seo.title || pageData.name}</title>
        <meta name="description" content={pageData.seo.description} />
        {pageData.seo.canonicalUrl && <link rel="canonical" href={pageData.seo.canonicalUrl} />}
        {pageData.seo.primaryKeyword && <meta name="keywords" content={`${pageData.seo.primaryKeyword}, ${pageData.seo.semanticKeywords || ''}`} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={pageData.seo.title || pageData.name} />
        <meta property="og:description" content={pageData.seo.description} />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD Structured Data */}
        {pageData.jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(pageData.jsonLd)}
          </script>
        )}
      </Helmet>
      
      <Navigation />
      
      <main>
        {pageData.sections.map((section: any, index: number) => (
          <SectionRenderer
            key={index}
            type={section.type}
            title={section.title}
            content={section.content}
            extraData={section.extraData}
            htmlTag={section.htmlTag}
            geoCitability={section.geoCitability}
            imageAlt={section.imageAlt}
            schemaMarkup={section.schemaMarkup}
            stats={section.stats}
          />
        ))}
      </main>
      
      <Footer />
    </div>
  );
};

export default DynamicPage;
