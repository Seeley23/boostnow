import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionRenderer from '../components/SectionRenderer';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import websiteData from '../data/blog/website-cms.json';

const DynamicPage: React.FC = () => {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    if (websiteData && websiteData.pages && websiteData.pages.length > 0) {
      setPage(websiteData.pages[0]);
    }
  }, []);

  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{page.title || 'Dynamic Page'}</title>
        <meta name="description" content={page.description || ''} />
      </Helmet>
      <Navigation />
      <main>
        {page.sections?.map((section: any, idx: number) => (
          <SectionRenderer key={idx} section={section} />
        ))}
      </main>
      <Footer />
    </>
  );
};

export default DynamicPage;
