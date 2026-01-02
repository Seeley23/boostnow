import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import articlesMetadata from '../data/blog/articles-metadata.json';

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

const ARTICLES_PER_PAGE = 6;

const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');

  const articles: Article[] = articlesMetadata;

  // BreadcrumbList Schema for Blog Page
  useEffect(() => {
    const breadcrumbScript = document.querySelector('script[type="application/ld+json"][data-breadcrumb-schema]');
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Strona główna',
          'item': 'https://boostnow.pl'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Blog',
          'item': 'https://boostnow.pl/blog'
        }
      ]
    };

    if (breadcrumbScript) {
      breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    } else {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-breadcrumb-schema', 'true');
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    }

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"][data-breadcrumb-schema]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  // Filtruj artykuły
  const filteredArticles = selectedIndustry === 'all' 
    ? articles 
    : articles.filter(a => a.target_industry === selectedIndustry);

  // Paginacja
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

  // Unikalne branże
  const industriesSet = new Set(articles.map(a => a.target_industry));
  const industries = ['all', ...Array.from(industriesSet)];

  const industryLabels: Record<string, string> = {
    all: 'Wszystkie artykuły',
    'E-commerce': '🛒 E-commerce',
    'Marki Premium': '✨ Marki Premium',
    'Usługi & Consulting': '💼 Usługi & Consulting'
  };

  const handleFilterChange = (industry: string) => {
    setSelectedIndustry(industry);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0b1020]">
      {/* Breadcrumbs */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/">
              <a className="hover:text-[#c7ff4e] transition">Strona główna</a>
            </Link>
            <span>/</span>
            <span className="text-[#c7ff4e]">Blog</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Architekci Decyzji dzielą się wiedzą
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Artykuły o Decision Science, Neuromarketing i Psychologii Konwersji dla agencji marketingowych
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => handleFilterChange(industry)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedIndustry === industry
                    ? 'bg-[#c7ff4e] text-[#0b1020]'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {industryLabels[industry]}
              </button>
            ))}
          </div>
          <p className="text-gray-400 text-sm mt-4">
            {filteredArticles.length} artykułów
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-[#1a2332] rounded-lg p-6 border border-gray-700 hover:border-[#c7ff4e] transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[#c7ff4e] font-bold text-sm">#{article.id}</span>
                  <span className="text-gray-500 text-xs bg-gray-800 px-2 py-1 rounded">
                    {article.target_industry}
                  </span>
                </div>

                <Link href={`/blog/${article.id}`}>
                  <a className="block group">
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#c7ff4e] transition line-clamp-2">
                      {article.title}
                    </h3>
                  </a>
                </Link>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {article.meta_description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.semantic_anchors.split(', ').map((anchor) => (
                    <span
                      key={anchor}
                      className="text-xs bg-[#c7ff4e] bg-opacity-20 text-[#c7ff4e] px-2 py-1 rounded"
                    >
                      {anchor}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-700">
                  <span>{article.word_count} słów</span>
                  <span>~{Math.ceil(article.word_count / 200)} min czytania</span>
                </div>

                <Link href={`/blog/${article.id}`}>
                  <a className="block mt-4 text-[#c7ff4e] font-medium text-sm hover:underline">
                    Czytaj artykuł →
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
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
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
