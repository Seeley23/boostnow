import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRoute } from 'wouter';
import SectionRenderer from '../components/SectionRenderer';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import websiteData from '../data/blog/website-cms.json';

const DynamicPage: React.FC = () => {
  const [page, setPage] = useState<any>(null);
  const [match, params] = useRoute('/:slug');
  const slug = params?.slug as string;

  useEffect(() => {
    if (slug && websiteData && websiteData.pages) {
      const foundPage = websiteData.pages.find(p => p.slug === slug);
      setPage(foundPage || null);
    }
  }, [slug]);

  if (!page) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{page.seo?.title || page.title || 'Page'}</title>
        <meta name="description" content={page.seo?.description || page.description || ''} />
        {page.seo?.canonicalUrl && <link rel="canonical" href={page.seo.canonicalUrl} />}
        {page.jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(page.jsonLd)}
          </script>
        )}
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
