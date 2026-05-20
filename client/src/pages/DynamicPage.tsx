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
          />
        ))}
      </main>
      
      <Footer />
    </div>
  );
};

export default DynamicPage;
