import { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import articlesMetadata from '../data/blog/articles-metadata.json';
import articleFilesMap from '../data/blog/article-files.json';
import { renderMarkdown } from '@shared/markdown';
import { AUDIT_ARTICLE_LINKS, AUDIT_CTA_HEADING, AUDIT_CTA_TEXT, AUDIT_URL_PATH } from '@shared/auditLinks';
import { GEO_ARTICLE_CTA } from '@shared/geoService';
import Navigation from './Navigation';
import Footer from './Footer';

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

const ARTICLES: Article[] = articlesMetadata as Article[];

function extractSteps(content: string): string[] {
  const lines = content.split('\n');
  const steps: string[] = [];
  for (const line of lines) {
    const match = line.match(/^\d+\.\s+(.+)/) || line.match(/^[-*]\s+(Krok|Step)\s*\d*[:.]?\s*(.+)/i);
    if (match) steps.push(match[1] || match[2]);
  }
  return steps.slice(0, 8);
}

const BlogArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [article, setArticle] = useState<ArticleContent | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useCallback((path: string) => setLocation(path), [setLocation]);

  const relatedArticles = useMemo(() => {
    if (!id) return [];
    const current = ARTICLES.find(a => a.slug === id || String(a.id) === id);
    if (!current) return [];
    const currentAnchors = new Set((current.semantic_anchors || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean));
    return ARTICLES
      .filter(a => a.id !== current.id)
      .map(a => {
        const anchors = (a.semantic_anchors || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
        return { a, overlap: anchors.filter(x => currentAnchors.has(x)).length };
      })
      .sort((x, y) => y.overlap - x.overlap || x.a.id - y.a.id)
      .slice(0, 3)
      .map(x => x.a);
  }, [id]);

  useEffect(() => {
    if (article) {
      const articleUrl = `https://boostnow.pl/blog/${id}`;
      const articleData = (/^\d+$/.test(id || '')
        ? ARTICLES[parseInt(id!) - 1]
        : ARTICLES.find((a: any) => a.slug === id)) as any;

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

      // Only the article's own FAQ (from Airtable). No generic fallback: a
      // FAQPage must match questions that are visible on the page.
      let faqSchema = null;
      if (article.schemaJson?.['@graph']) {
        faqSchema = article.schemaJson['@graph'].find((s: any) => s['@type'] === 'FAQPage');
      }

      const steps = extractSteps(article.content);
      let howToSchema = null;
      if (steps.length >= 3) {
        howToSchema = {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: article.title,
          description: article.meta_description,
          step: steps.map((text, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            text
          }))
        };
      }

      document.querySelectorAll('script[data-article-schema]').forEach(el => el.remove());
      [articleSchema, breadcrumbSchema, faqSchema, howToSchema].filter(Boolean).forEach((s, i) => {
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
        : ARTICLES.findIndex(a => a.slug === id);

      if (articleIndex >= 0 && articleIndex < ARTICLES.length) {
        const articleId = articleIndex + 1;
        const fileMap = articleFilesMap as Record<string, any>;
        const fileInfo = fileMap[articleId.toString()];
        const articleMeta = ARTICLES[articleIndex];
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
      }
      setLoading(false);
    };

    loadArticle();
  }, [id]);

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
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-[#c7ff4e] text-[#0b1020] rounded-lg font-semibold hover:bg-white transition-colors">
            Wróć do strony głównej
          </button>
        </div>
      </div>
    );
  }

  const leadAnswer = article.meta_description;
  // Same renderer as the static prerender; CMS HTML is escaped (shared/markdown.ts).
  const articleHtml = renderMarkdown(article.content);
  const lastUpdated = article.date || new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
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
              <button onClick={() => navigate('/')} className="hover:text-[#c7ff4e] transition-colors">Strona główna</button>
              <span>/</span>
              <button onClick={() => navigate('/blog')} className="hover:text-[#c7ff4e] transition-colors">Blog</button>
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

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-none mb-12" style={{ contentVisibility: 'auto' }}>
              <div className="bg-[#141829] border border-[#2a2f3e] rounded-lg p-8 text-[#9aa0b3]">
                <div className="article-body" dangerouslySetInnerHTML={{ __html: articleHtml }} />
              </div>
            </motion.div>


            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="bg-[#141829] border border-[#2a2f3e] rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c7ff4e] to-[#00c88a] flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white font-playfair">Mateusz Nowotka</h4>
                  <p className="text-[#9aa0b3] text-sm mb-3">Founder & CEO BoostNow | Decision Science Specialist | 3 lata doświadczenia w SEO i GEO</p>
                  <a href="https://www.linkedin.com/in/mateusz-nowotka-34aa1018a/" target="_blank" rel="noopener noreferrer" className="text-[#c7ff4e] hover:text-white transition-colors text-sm">LinkedIn →</a>
                </div>
              </div>
            </motion.div>

            {id && AUDIT_ARTICLE_LINKS[id] && (
              <div className="bg-[#141829] border border-[#c7ff4e]/40 rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-3 font-playfair">{AUDIT_CTA_HEADING}</h3>
                <p className="text-[#c9cdd6] mb-6">{AUDIT_CTA_TEXT}</p>
                <Link href={AUDIT_URL_PATH} className="inline-block px-8 py-3 bg-[#c7ff4e] text-[#0b1020] rounded-lg font-bold hover:bg-white transition-colors">
                  {AUDIT_ARTICLE_LINKS[id]} →
                </Link>
              </div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="bg-gradient-to-r from-[#c7ff4e]/10 to-[#00c88a]/10 border border-[#c7ff4e]/20 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3 font-playfair">{GEO_ARTICLE_CTA.heading}</h3>
              <p className="text-[#c9cdd6] mb-6">{GEO_ARTICLE_CTA.text}</p>
              <Link href={GEO_ARTICLE_CTA.href} className="inline-block px-8 py-3 bg-[#c7ff4e] text-[#0b1020] rounded-lg font-bold hover:bg-white transition-colors">{GEO_ARTICLE_CTA.cta} →</Link>
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
                      onClick={() => navigate(`/blog/${relArticle.slug || relArticle.id}`)}
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
      <Footer />
    </div>
  );
};

export default BlogArticle;