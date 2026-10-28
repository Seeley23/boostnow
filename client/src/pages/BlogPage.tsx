import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import websiteCms from '../data/blog/website-cms.json';
import { Link } from 'wouter';
import articlesMetadata from '../data/blog/articles-metadata.json';

interface Article {
  id: number | string;
  title: string;
  content?: string;
  meta_description?: string;
  semantic_anchors?: string;
  target_industry?: string;
  word_count?: number;
  slug?: string;
  date: string;
}

const ARTICLES_PER_PAGE = 6;

const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const blogPage = (websiteCms as any).pages?.find((p: any) => p.slug === 'blog');
  const seo = blogPage?.seo || {};

  const JUNK_SLUGS = new Set(['przuykad-2','hehe','po-wgraniu-test','kolejny-test','test-automat','przykadowy-artyku']);
  const articles: Article[] = (articlesMetadata as Article[]).filter(
    a => a.slug && !JUNK_SLUGS.has(a.slug as string)
  );
  const getArticleUrlPart = (article: Article) => article.slug || String(article.id);

  useEffect(() => {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://boostnow.pl' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://boostnow.pl/blog' }
      ]
    };

    const collectionSchema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Blog o GEO, AEO i SEO | BoostNow',
      description: 'Artykuły o Generative Engine Optimization, Answer Engine Optimization i SEO.',
      url: 'https://boostnow.pl/blog',
      isPartOf: { '@type': 'WebSite', name: 'BoostNow', url: 'https://boostnow.pl' },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: articles.length,
        itemListElement: articles.slice(0, 10).map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `https://boostnow.pl/blog/${a.slug || a.id}`,
          name: a.title
        }))
      }
    };

    document.querySelectorAll('script[data-blog-schema]').forEach(el => el.remove());
    [breadcrumbSchema, collectionSchema].forEach((s, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-blog-schema', String(i));
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-blog-schema]').forEach(el => el.remove());
    };
  }, [articles]);

  const filteredArticles = articles;
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  const pageTitle = seo.title || 'Blog o GEO, AEO i SEO | BoostNow';
  const pageDescription = seo.description || 'Artykuły o GEO (Generative Engine Optimization), AEO, SEO, psychologii decyzji i optymalizacji konwersji. Praktyczna wiedza od BoostNow.';
  const pageCanonical = currentPage > 1 
    ? `https://boostnow.pl/blog?page=${currentPage}` 
    : 'https://boostnow.pl/blog';

  return (
    <div className="min-h-screen bg-[#0b1020]">
      <Helmet>
        <title>{currentPage > 1 ? `${pageTitle} — strona ${currentPage}` : pageTitle}</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={pageDescription} />
        {seo.primaryKeyword && <meta name="keywords" content={seo.primaryKeyword} />}
        <link rel="canonical" href={pageCanonical} />
        {currentPage > 1 && <link rel="prev" href={currentPage === 2 ? 'https://boostnow.pl/blog' : `https://boostnow.pl/blog?page=${currentPage - 1}`} />}
        {currentPage < totalPages && <link rel="next" href={`https://boostnow.pl/blog?page=${currentPage + 1}`} />}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageCanonical} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-400" aria-label="Breadcrumb">
            <Link href="/">
              <a className="hover:text-[#c7ff4e] transition">Strona główna</a>
            </Link>
            <span>/</span>
            <span className="text-[#c7ff4e]">Blog</span>
          </nav>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Blog o GEO, AEO i SEO
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
              Praktyczne artykuły o Generative Engine Optimization, Answer Engine Optimization, pozycjonowaniu i psychologii decyzji.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ contentVisibility: 'auto' }}>
            {paginatedArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-[#1a2332] rounded-lg p-6 border border-gray-700 hover:border-[#c7ff4e] transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[#c7ff4e] font-bold text-sm">#{article.id}</span>
                  {article.date && <time dateTime={article.date} className="text-xs text-gray-500">{article.date}</time>}
                </div>

                <Link href={`/blog/${getArticleUrlPart(article)}`} className="block group">
                  <h2 className="text-lg font-bold text-white mb-3 group-hover:text-[#c7ff4e] transition line-clamp-2">
                    {article.title}
                  </h2>
                </Link>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {article.meta_description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(article.semantic_anchors || '')
                    .split(', ')
                    .filter(Boolean)
                    .slice(0, 3)
                    .map((anchor) => (
                    <span
                      key={anchor}
                      className="text-xs bg-[#c7ff4e] bg-opacity-20 text-[#c7ff4e] px-2 py-1 rounded"
                    >
                      {anchor}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-700">
                  <span>{article.word_count || 0} słów</span>
                  <span>~{Math.ceil((article.word_count || 0) / 200)} min czytania</span>
                </div>

                <Link href={`/blog/${getArticleUrlPart(article)}`} className="block mt-4 text-[#c7ff4e] font-medium text-sm hover:underline">
                  Czytaj artykuł →
                </Link>
              </motion.article>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Paginacja">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
              >
                ← Poprzednia
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-current={currentPage === page ? 'page' : undefined}
                    className={`w-10 h-10 rounded-lg font-medium transition ${
                      currentPage === page
                        ? 'bg-[#c7ff4e] text-[#0b1020]'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
              >
                Następna →
              </button>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
