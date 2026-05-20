import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionRenderer from '../components/SectionRenderer';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import websiteData from '../data/blog/website-cms.json';

const DynamicPage: React.FC = () => {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    const slug = window.location.pathname.replace('/', '') || 'home';
    const foundPage = websiteData.pages.find((p: any) => p.slug === slug);
    
    if (foundPage) {
      setPage(foundPage);
    } else if (websiteData.pages.length > 0) {
      setPage(websiteData.pages[0]);
    }
  }, []);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  // Parse FAQ Data if it exists
  const faqs = page.FAQ_Data ? JSON.parse(page.FAQ_Data) : [];
  
  // Generate FAQ Schema
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        {/* Primary SEO */}
        <title>{page.SEO_Title || page.PageName || 'BoostNow'}</title>
        <meta name="description" content={page.SEO_Desc || ''} />
        <meta name="keywords" content={page.Focus_Keyphrase || ''} />
        
        {/* Custom Schema Markup from Airtable */}
        {page.Schema_Markup && (
          <script type="application/ld+json">
            {page.Schema_Markup}
          </script>
        )}

        {/* Auto-generated FAQ Schema */}
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <Navigation />
      
      <main>
        {page.sections?.map((section: any, idx: number) => (
          <SectionRenderer key={idx} section={section} />
        ))}

        {/* FAQ Section if data exists */}
        {faqs.length > 0 && (
          <section className="py-24 bg-slate-50">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl font-serif text-slate-900 mb-12 text-center">Często zadawane pytania</h2>
              <div className="space-y-8">
                {faqs.map((faq: any, i: number) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{faq.question}</h3>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DynamicPage;
