import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import articlesMetadata from '../data/blog/articles-metadata.json';
import articleFilesMap from '../data/blog/article-files.json';
import { StatBlock, QuoteBlock, FAQSection, DefinitionBlock, ComparisonTable } from './ContentPatterns';

interface Article {
  id: number;
  title: string;
  meta_description: string;
  semantic_anchors: string;
  target_industry: string;
  word_count: number;
  slug: string;
  date: string;
}

interface ArticleContent {
  title: string;
  meta_description: string;
  semantic_anchors: string;
  target_industry: string;
  word_count: number;
  content: string;
  seoTitle?: string | null;
  schemaJson?: any;
  date?: string;
}

const DEFAULT_FAQS = [
  { question: 'Jak szybko zobaczę efekty GEO?', answer: 'Pierwsze cytowania w Perplexity pojawiają się w 7-14 dni. ChatGPT reaguje w cyklu ~30 dni. Google AI Overviews wymaga 4-12 tygodni.' },
  { question: 'Czy GEO zastępuje SEO?', answer: 'Nie. GEO uzupełnia SEO. Klasyczne pozycjonowanie nadal buduje autorytet, a GEO zwiększa szansę na cytowanie w odpowiedziach AI.' },
  { question: 'Ile kosztuje wdrożenie GEO?', answer: 'Zależy od zakresu. Audyt GEO zaczyna się od kilku tysięcy złotych. Pełna strategia z contentem i schema to inwestycja 5-15 tys. zł miesięcznie.' },
];

const SEO_VS_GEO = [
  { feature: 'Cel', seo: 'Pozycja w Google', geo: 'Cytowanie w AI' },
  { feature: 'Metryka', seo: 'Rankings, CTR', geo: 'Citation rate' },
  { feature: 'Platforma', seo: 'Google', geo: 'ChatGPT, Perplexity, Gemini' },
  { feature: 'Czas efektu', seo: '3-6 miesięcy', geo: '7-90 dni' },
];

const BlogArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [article, setArticle] = useState<ArticleContent | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const articles: Article[] = articlesMetadata as Article[];

  useEffect(() => {
    if (article) {
      const articleUrl = `https://boostnow.pl/blog/${id}`;
      const articleData = (/^\d+$/.test(id || '')
        ? articlesMetadata[parseInt(id!) - 1]
        : articlesMetadata.find((a: any) => a.slug === id)) as any;

      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': articleUrl,
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
        headline: article.title,
        description: article.meta_description,
        image: { '@type': 'ImageObject', url: `https://boostnow.pl/og-images/${id}.png`, width: 1200, height: 630 },
        datePublished: articleData?.date || '2026-01-01',
        dateModified: new Date().toISOString().split('T')[0],
        author: {
          '@type': 'Person',
          name: 'Mateusz Nowotka',
          url: 'https://boostnow.pl/mateusz-nowotka',
          jobTitle: 'Founder & CEO',
          worksFor: { '@type': 'Organization', name: 'BoostNow', url: 'https://boostnow.pl' }
        },
        publisher: {
          '@type': 'Organization',
          name: 'BoostNow',
          url: 'https://boostnow.pl',
          logo: { '@type': 'ImageObject', url: 'https://boostnow.pl/images/boostnow-logo.svg', width: 600, height: 60 }
        },
        articleSection: article.target_industry,
        wordCount: article.word_count,
        keywords: [article.semantic_anchors, article.target_industry].join(', '),
        inLanguage: 'pl-PL'
      };

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://boostnow.pl' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://boostnow.pl/blog' },
          { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl }
        ]
      };

      let faqSchema = null;
      if (article.schemaJson?.['@graph']) {
        faqSchema = article.schemaJson['@graph'].find((s: any) => s['@type'] === 'FAQPage');
      }
      if (!faqSchema) {
        faqSchema = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: DEFAULT_FAQS.map(f => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer }
          }))
        };
      }

      document.querySelectorAll('script[data-article-schema]').forEach(el => el.remove());
      [articleSchema, breadcrumbSchema, faqSchema].filter(Boolean).forEach((s, i) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-article-schema', String(i));
        script.textContent = JSON.stringify(s);
        document.head.appendChild(script);
      });
    }
  }, [article, id]);

  useEffect(() => {
    const loadArticle = async () => {
      const articleIndex = /^\d+$/.test(id || '')
        ? parseInt(id!) - 1
        : articles.findIndex(a => a.slug === id);

      if (articleIndex >= 0 && articleIndex < articles.length) {
        const articleId = articleIndex + 1;
        const fileMap = articleFilesMap as Record<string, any>;
        const fileInfo = fileMap[articleId.toString()];
        const articleMeta = articles[articleIndex];
        const fallbackContent = `# ${articleMeta.title}\n\n${articleMeta.meta_description}`;

        const buildArticleState = (content: string): ArticleContent => ({
          title: articleMeta.title,
          meta_description: articleMeta.meta_description,
          semantic_anchors: articleMeta.semantic_anchors,
          target_industry: articleMeta.target_industry,
          word_count: articleMeta.word_count,
          content,
          seoTitle: (articleMeta as any).seoTitle || null,
          schemaJson: (articleMeta as any).schemaJson || null,
          date: articleMeta.date,
        });

        const filename = fileInfo?.filename || `${articleMeta.slug}.md`;
        try {
          const response = await fetch(`/blog-articles/${filename}`);
          let content = response.ok ? await response.text() : '';
          content = content.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
          setArticle(buildArticleState(content || fallbackContent));
        } catch {
          setArticle(buildArticleState(fallbackContent));
        }

        const current = articles[articleIndex];
        const currentAnchors = new Set((current.semantic_anchors || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean));
        const related = articles
          .filter(a => a.id !== current.id)
          .map(a => {
            const anchors = (a.semantic_anchors || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
            return { a, overlap: anchors.filter(x => currentAnchors.has(x)).length };
          })
          .sort((x, y) => y.overlap - x.overlap || x.a.id - y.a.id)
          .slice(0, 3)
          .map(x => x.a);

        setRelatedArticles(related);
      }
      setLoading(false);
    };

    loadArticle();
  }, [id, articles]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1020] flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-[#c7ff4e] animate-pulse" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0b1020] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Artykuł nie znaleziony</h1>
          <button onClick={() => setLocation('/')} className="px-6 py-2 bg-[#c7ff4e] text-[#0b1020] rounded-lg font-semibold hover:bg-white transition-colors">
            Wróć do strony głównej
          </button>
        </div>
      </div>
    );
  }

  const leadAnswer = article.meta_description;
  const lastUpdated = article.date || new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#0b1020] py-20 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{article.seoTitle || article.title} | BoostNow</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={article.meta_description} />
        <meta name="keywords" content={`${article.semantic_anchors}, ${article.target_industry}, GEO, SEO, AI Overviews`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://boostnow.pl/blog/${id}`} />
        <meta property="og:title" content={article.seoTitle || article.title} />
        <meta property="og:description" content={article.meta_description} />
        <meta property="og:image" content={`https://boostnow.pl/og-images/${id}.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.seoTitle || article.title} />
        <meta name="twitter:description" content={article.meta_description} />
        <link rel="canonical" href={`https://boostnow.pl/blog/${id}`} />
        <meta property="article:modified_time" content={lastUpdated} />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-2">
            <nav className="flex items-center gap-2 mb-8 text-sm text-[#9aa0b3]">
              <button onClick={() => setLocation('/')} className="hover:text-[#c7ff4e] transition-colors">Strona główna</button>
              <span>/</span>
              <button onClick={() => setLocation('/blog')} className="hover:text-[#c7ff4e] transition-colors">Blog</button>
              <span>/</span>
              <span className="text-[#c7ff4e]">{article.title.substring(0, 40)}...</span>
            </nav>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#c7ff4e] text-xs font-semibold px-2 py-1 bg-[#c7ff4e]/10 rounded">{article.target_industry}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair leading-tight">{article.title}</h1>

              <div className="mb-6 p-5 rounded-xl bg-[#c7ff4e]/10 border border-[#c7ff4e]/30">
                <p className="text-[#c7ff4e] font-bold text-sm mb-2 uppercase tracking-wide">Szybka odpowiedź</p>
                <p className="text-white text-lg leading-relaxed">{leadAnswer}</p>
                <p className="text-[#9aa0b3] text-xs mt-3">Ostatnia aktualizacja: {lastUpdated}</p>
              </div>

              <DefinitionBlock
                term="GEO (Generative Engine Optimization)"
                definition="Optymalizacja treści pod kątem cytowania przez modele AI takie jak ChatGPT, Perplexity i Gemini. W przeciwieństwie do SEO, celem nie jest pozycja w wynikach, ale bycie źródłem w odpowiedzi AI."
              />

              <StatBlock
                value="+37%"
                label="Wzrost szansy na cytowanie w AI dzięki statystykom z źródłem"
                source="Princeton GEO Study"
                date="2024"
              />

              <QuoteBlock
                quote="Treść z konkretnymi liczbami i cytatami ekspertów jest cytowana przez modele AI o 30-40% częściej niż ogólne artykuły bez danych."
                author="Mateusz Nowotka"
                title="Founder & CEO"
                organization="BoostNow"
              />

              <ComparisonTable title="SEO vs GEO" rows={SEO_VS_GEO} />

              <div className="flex flex-wrap items-center gap-6 text-sm text-[#9aa0b3] border-t border-b border-[#2a2f3e] py-4">
                <div className="flex items-center gap-2"><span>📅</span><span>{lastUpdated}</span></div>
                <div className="flex items-center gap-2"><span>📝</span><span>{article.word_count} słów</span></div>
                <div className="flex items-center gap-2"><span>⏱️</span><span>~{Math.ceil(article.word_count / 200)} min czytania</span></div>
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-2">
              {article.semantic_anchors.split(',').map((anchor, i) => (
                <span key={i} className="text-xs bg-[#c7ff4e]/10 text-[#c7ff4e] px-3 py-1 rounded-full font-medium">{anchor.trim()}</span>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="prose prose-invert max-w-none mb-12" style={{ contentVisibility: 'auto' }}>
              <div className="bg-[#141829] border border-[#2a2f3e] rounded-lg p-8 text-[#9aa0b3]">
                <ReactMarkdown components={{
                  h1: ({ ...props }: any) => <h1 className="text-3xl font-bold text-white mb-4 font-playfair mt-8" {...props} />,
                  h2: ({ ...props }: any) => <h2 className="text-2xl font-bold text-white mb-3 font-playfair mt-6 text-[#c7ff4e]" {...props} />,
                  h3: ({ ...props }: any) => <h3 className="text-xl font-bold text-white mb-2 font-playfair mt-4" {...props} />,
                  p: ({ ...props }: any) => <p className="mb-4 leading-relaxed text-[#9aa0b3]" {...props} />,
                  ul: ({ ...props }: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                  li: ({ ...props }: any) => <li className="text-[#9aa0b3]" {...props} />,
                  blockquote: ({ ...props }: any) => <blockquote className="border-l-4 border-[#c7ff4e] pl-4 italic text-[#9aa0b3] my-4" {...props} />,
                  strong: ({ ...props }: any) => <strong className="text-[#c7ff4e] font-semibold" {...props} />,
                  code: ({ ...props }: any) => <code className="bg-[#0b1020] text-[#c7ff4e] px-2 py-1 rounded text-sm" {...props} />,
                }}>
                  {article.content}
                </ReactMarkdown>
              </div>
            </motion.div>

            <FAQSection items={DEFAULT_FAQS} />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-[#141829] border border-[#2a2f3e] rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c7ff4e] to-[#00c88a] flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white font-playfair">Mateusz Nowotka</h4>
                  <p className="text-[#9aa0b3] text-sm mb-3">Founder & CEO BoostNow | Decision Science Specialist | 4 lata doświadczenia w marketingu</p>
                  <a href="https://www.linkedin.com/in/mateusz-nowotka-34aa1018a/" target="_blank" rel="noopener noreferrer" className="text-[#c7ff4e] hover:text-white transition-colors text-sm">LinkedIn →</a>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-gradient-to-r from-[#c7ff4e]/10 to-[#00c88a]/10 border border-[#c7ff4e]/20 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3 font-playfair">Gotowy na transformację?</h3>
              <p className="text-[#9aa0b3] mb-6">Ten artykuł pokazuje, jak Decision Science zmienia marketing. Teraz czas na Twoją firmę.</p>
              <button className="px-8 py-3 bg-[#c7ff4e] text-[#0b1020] rounded-lg font-bold hover:bg-white transition-all duration-300 transform hover:scale-105">Zarezerwuj konsultację →</button>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <div className="bg-[#141829] border border-[#2a2f3e] rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4 font-playfair">Powiązane artykuły</h3>
                <div className="space-y-4" style={{ contentVisibility: 'auto' }}>
                  {relatedArticles.length > 0 ? relatedArticles.map((relArticle, index) => (
                    <motion.button
                      key={relArticle.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      onClick={() => setLocation(`/blog/${relArticle.slug || relArticle.id}`)}
                      className="w-full text-left p-3 rounded-lg bg-[#0b1020] hover:bg-[#1a1f2e] transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-[#c7ff4e] text-xs font-bold flex-shrink-0 mt-1">#{relArticle.id.toString().padStart(2, '0')}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white group-hover:text-[#c7ff4e] transition-colors line-clamp-2">{relArticle.title}</p>
                          <p className="text-xs text-[#9aa0b3] mt-1">{Math.ceil(relArticle.word_count / 200)} min czytania</p>
                        </div>
                      </div>
                    </motion.button>
                  )) : <p className="text-[#9aa0b3] text-sm">Brak powiązanych artykułów</p>}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
