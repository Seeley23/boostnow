import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useRoute } from 'wouter';
import { motion, useInView } from "framer-motion";
import SectionRenderer from '../components/SectionRenderer';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import NotFound from './NotFound';
import websiteData from '../data/blog/website-cms.json';
import { findCmsPageBySlug, getCmsPageDisplayName, getCmsPageMeta } from './dynamic-page-data';

const LIME = "#c7ff4e";
const NAVY = "#0b1020";

// ── Reusable fade-in wrapper ──────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── FAQ item ──────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "rgba(247,248,250,0.1)" }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center py-5 gap-4">
        <span className="font-semibold text-white text-base md:text-lg">{q}</span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold transition-transform duration-300"
          style={{
            background: "rgba(199,255,78,0.12)",
            color: LIME,
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p
          className="pb-5 text-sm leading-relaxed"
          style={{ color: "rgba(247,248,250,0.6)" }}
        >
          {a}
        </p>
      </motion.div>
    </div>
  );
}

const DynamicPage: React.FC = () => {
  const [page, setPage] = useState<any>(null);
  const [match, params] = useRoute('/:slug');
  const slug = params?.slug as string;

  useEffect(() => {
    setPage(findCmsPageBySlug(websiteData, slug));
  }, [slug]);

  if (!page) {
    return <NotFound />;
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

  const isHome = page.slug === 'home';
  const pageMeta = getCmsPageMeta(page);
  const pageDisplayName = getCmsPageDisplayName(page);

  return (
    <div style={{ background: NAVY, color: "#f7f8fa" }} className="min-h-screen">
      <Helmet>
        <title>{pageMeta.title}</title>
        <meta name="description" content={pageMeta.description} />
        <meta name="keywords" content={pageMeta.keywords} />
        {pageMeta.schemaMarkup && (
          <script type="application/ld+json">
            {pageMeta.schemaMarkup}
          </script>
        )}
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <Navigation />

      {isHome ? (
        <main>
          {page.sections?.map((section: any, idx: number) => (
            <SectionRenderer key={idx} section={section} />
          ))}
        </main>
      ) : (
        <main>
          {/* ── 1. HERO (AIO Style) ─────────────────────────────── */}
          <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[120px] pointer-events-none"
              style={{ background: "rgba(199,255,78,0.07)" }}
            />
            <div className="container max-w-5xl mx-auto px-6 relative z-10">
              <FadeIn>
                <div className="flex justify-center mb-8">
                  <span
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
                    style={{
                      background: "rgba(199,255,78,0.1)",
                      border: "1px solid rgba(199,255,78,0.3)",
                      color: LIME,
                    }}
                  >
                    {pageDisplayName}
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-center leading-[0.95] tracking-tight mb-8">
                  {page.sections?.find((s: any) => s.type === 'Hero')?.title || pageDisplayName}
                </h1>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-center max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "rgba(247,248,250,0.65)" }}>
                  {page.sections?.find((s: any) => s.type === 'Hero')?.content}
                </p>
              </FadeIn>
            </div>
          </section>

          {/* ── 2. CONTENT SECTIONS ─────────────────────────────── */}
          {page.sections?.filter((s: any) => s.type !== 'Hero' && s.type !== 'FAQ' && s.type !== 'Contact').map((section: any, idx: number) => (
            <section key={idx} className="py-24 border-t" style={{ borderColor: "rgba(247,248,250,0.05)" }}>
              <div className="container max-w-4xl mx-auto px-6">
                <FadeIn>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 text-white leading-tight">
                    {section.title}
                  </h2>
                  <div className="text-lg md:text-xl leading-relaxed" style={{ color: "rgba(247,248,250,0.7)" }}>
                    {section.content}
                  </div>
                  {section.stats && (
                    <div className="mt-10 p-8 rounded-2xl border" style={{ background: "rgba(199,255,78,0.04)", borderColor: "rgba(199,255,78,0.18)" }}>
                      <span className="text-4xl font-black block mb-2" style={{ color: LIME }}>{section.stats}</span>
                    </div>
                  )}
                </FadeIn>
              </div>
            </section>
          ))}

          {/* ── 3. FAQ (AIO Style) ─────────────────────────────── */}
          {faqs.length > 0 && (
            <section className="py-24 border-t" style={{ borderColor: "rgba(247,248,250,0.05)" }}>
              <div className="container max-w-3xl mx-auto px-6">
                <FadeIn>
                  <h2 className="text-3xl md:text-5xl font-black mb-12 text-white text-center">FAQ</h2>
                  <div className="flex flex-col">
                    {faqs.map((faq: any, i: number) => (
                      <FAQItem key={i} q={faq.question} a={faq.answer} />
                    ))}
                  </div>
                </FadeIn>
              </div>
            </section>
          )}

          {/* ── 4. CONTACT (AIO Style) ─────────────────────────────── */}
          <section className="py-24 border-t" style={{ borderColor: "rgba(247,248,250,0.05)" }}>
            <div className="container max-w-4xl mx-auto px-6">
              <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10">
                <FadeIn>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
                    {page.sections?.find((s: any) => s.type === 'Contact')?.title || 'Zacznijmy współpracę'}
                  </h2>
                  <p className="text-lg mb-10" style={{ color: "rgba(247,248,250,0.6)" }}>
                    {page.sections?.find((s: any) => s.type === 'Contact')?.content || 'Skontaktuj się z nami, aby otrzymać darmowy audyt GEO swojej strony.'}
                  </p>
                  <button 
                    className="py-4 px-8 rounded-xl font-black text-base tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    style={{ background: LIME, color: NAVY }}
                  >
                    {page.sections?.find((s: any) => s.type === 'Contact')?.ctaLabel || 'Darmowy Audyt →'}
                  </button>
                </FadeIn>
              </div>
            </div>
          </section>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default DynamicPage;
