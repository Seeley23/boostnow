import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import articlesMetadata from '../data/blog/articles-metadata.json';
import articleFilesMap from '../data/blog/article-files.json';

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
}

const BlogArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [article, setArticle] = useState<ArticleContent | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const articles: Article[] = articlesMetadata as Article[];

  useEffect(() => {
    const loadArticle = async () => {
      const articleIndex = parseInt(id || '1') - 1;
      
      if (articleIndex >= 0 && articleIndex < articles.length) {
        const articleId = articleIndex + 1;
        const fileMap = articleFilesMap as Record<string, any>;
        const fileInfo = fileMap[articleId.toString()];
        
        if (fileInfo) {
          try {
            // Załaduj zawartość markdown
            const response = await fetch(`/blog-articles/${fileInfo.filename}`);
            let content = await response.text();
            
            // Jeśli ładowanie nie powiodło się, użyj fallback
            if (!content) {
              content = `# ${articles[articleIndex].title}\n\n${articles[articleIndex].meta_description}`;
            }
            
            setArticle({
              title: articles[articleIndex].title,
              meta_description: articles[articleIndex].meta_description,
              semantic_anchors: articles[articleIndex].semantic_anchors,
              target_industry: articles[articleIndex].target_industry,
              word_count: articles[articleIndex].word_count,
              content: content
            });
          } catch (error) {
            console.error('Błąd ładowania artykułu:', error);
            setArticle({
              title: articles[articleIndex].title,
              meta_description: articles[articleIndex].meta_description,
              semantic_anchors: articles[articleIndex].semantic_anchors,
              target_industry: articles[articleIndex].target_industry,
              word_count: articles[articleIndex].word_count,
              content: `# ${articles[articleIndex].title}\n\n${articles[articleIndex].meta_description}`
            });
          }
        }

        // Pobierz powiązane artykuły (z tej samej branży, max 3)
        const related = articles
          .filter(a => 
            a.target_industry === articles[articleIndex].target_industry && 
            a.id !== articles[articleIndex].id
          )
          .slice(0, 3);
        
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
          <button
            onClick={() => setLocation('/')}
            className="px-6 py-2 bg-[#c7ff4e] text-[#0b1020] rounded-lg font-semibold hover:bg-white transition-colors"
          >
            Wróć do strony głównej
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1020] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Główna zawartość artykułu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-8 text-sm text-[#9aa0b3]">
              <button
                onClick={() => setLocation('/')}
                className="hover:text-[#c7ff4e] transition-colors"
              >
                Strona główna
              </button>
              <span>/</span>
              <button
                onClick={() => setLocation('/#blog')}
                className="hover:text-[#c7ff4e] transition-colors"
              >
                Blog
              </button>
              <span>/</span>
              <span className="text-[#c7ff4e]">{article.title.substring(0, 40)}...</span>
            </nav>

            {/* Nagłówek artykułu */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#c7ff4e] text-xs font-semibold px-2 py-1 bg-[#c7ff4e]/10 rounded">
                  {article.target_industry}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair leading-tight">
                {article.title}
              </h1>

              <p className="text-[#9aa0b3] text-lg mb-6">
                {article.meta_description}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-[#9aa0b3] border-t border-b border-[#2a2f3e] py-4">
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>30 grudnia 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📝</span>
                  <span>{article.word_count} słów</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>~{Math.ceil(article.word_count / 200)} min czytania</span>
                </div>
              </div>
            </div>

            {/* Semantic Anchors */}
            <div className="mb-8 flex flex-wrap gap-2">
              {article.semantic_anchors.split(',').map((anchor, i) => (
                <span
                  key={i}
                  className="text-xs bg-[#c7ff4e]/10 text-[#c7ff4e] px-3 py-1 rounded-full font-medium"
                >
                  {anchor.trim()}
                </span>
              ))}
            </div>

            {/* Zawartość artykułu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-invert max-w-none mb-12"
            >
              <div className="bg-[#141829] border border-[#2a2f3e] rounded-lg p-8 text-[#9aa0b3]">
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }: any) => <h1 className="text-3xl font-bold text-white mb-4 font-playfair mt-8" {...props} />,
                    h2: ({ ...props }: any) => <h2 className="text-2xl font-bold text-white mb-3 font-playfair mt-6 text-[#c7ff4e]" {...props} />,
                    h3: ({ ...props }: any) => <h3 className="text-xl font-bold text-white mb-2 font-playfair mt-4" {...props} />,
                    p: ({ ...props }: any) => <p className="mb-4 leading-relaxed text-[#9aa0b3]" {...props} />,
                    ul: ({ ...props }: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                    li: ({ ...props }: any) => <li className="text-[#9aa0b3]" {...props} />,
                    blockquote: ({ ...props }: any) => <blockquote className="border-l-4 border-[#c7ff4e] pl-4 italic text-[#9aa0b3] my-4" {...props} />,
                    strong: ({ ...props }: any) => <strong className="text-[#c7ff4e] font-semibold" {...props} />,
                    code: ({ ...props }: any) => <code className="bg-[#0b1020] text-[#c7ff4e] px-2 py-1 rounded text-sm" {...props} />,
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>
            </motion.div>

            {/* Author Byline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-[#141829] border border-[#2a2f3e] rounded-lg p-6 mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c7ff4e] to-[#00c88a] flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-white font-playfair">Founder & CEO BoostNow</h4>
                  <p className="text-[#9aa0b3] text-sm mb-3">
                    Decision Science Specialist | 15+ lat w marketingu | Certyfikowany GEO Specialist
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="text-[#c7ff4e] hover:text-white transition-colors text-sm">
                      LinkedIn →
                    </a>
                    <a href="#" className="text-[#c7ff4e] hover:text-white transition-colors text-sm">
                      Twitter →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-[#c7ff4e]/10 to-[#00c88a]/10 border border-[#c7ff4e]/20 rounded-lg p-8 text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-3 font-playfair">
                Gotowy na transformację?
              </h3>
              <p className="text-[#9aa0b3] mb-6">
                Ten artykuł pokazuje, jak Decision Science zmienia marketing. Teraz czas na Twoją firmę.
              </p>
              <button className="px-8 py-3 bg-[#c7ff4e] text-[#0b1020] rounded-lg font-bold hover:bg-white transition-all duration-300 transform hover:scale-105">
                Zarezerwuj konsultację →
              </button>
            </motion.div>
          </motion.div>

          {/* Sidebar - Powiązane artykuły */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-20 space-y-6">
              {/* Powiązane artykuły */}
              <div className="bg-[#141829] border border-[#2a2f3e] rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4 font-playfair">
                  Powiązane artykuły
                </h3>

                <div className="space-y-4">
                  {relatedArticles.length > 0 ? (
                    relatedArticles.map((relArticle, index) => (
                      <motion.button
                        key={relArticle.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        onClick={() => setLocation(`/blog/${relArticle.id}`)}
                        className="w-full text-left p-3 rounded-lg bg-[#0b1020] hover:bg-[#1a1f2e] transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-[#c7ff4e] text-xs font-bold flex-shrink-0 mt-1">
                            #{relArticle.id.toString().padStart(2, '0')}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white group-hover:text-[#c7ff4e] transition-colors line-clamp-2">
                              {relArticle.title}
                            </p>
                            <p className="text-xs text-[#9aa0b3] mt-1">
                              {Math.ceil(relArticle.word_count / 200)} min czytania
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))
                  ) : (
                    <p className="text-[#9aa0b3] text-sm">Brak powiązanych artykułów</p>
                  )}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="bg-gradient-to-br from-[#c7ff4e]/10 to-[#00c88a]/10 border border-[#c7ff4e]/20 rounded-lg p-6">
                <h4 className="text-sm font-bold text-white mb-2">Chcesz więcej?</h4>
                <p className="text-xs text-[#9aa0b3] mb-4">
                  Otrzymuj cotygodniowe artykuły o Decision Science i neuromarketing.
                </p>
                <input
                  type="email"
                  placeholder="twój@email.com"
                  className="w-full px-3 py-2 bg-[#0b1020] border border-[#2a2f3e] rounded text-white text-sm placeholder-[#9aa0b3] focus:outline-none focus:border-[#c7ff4e] mb-2"
                />
                <button className="w-full px-3 py-2 bg-[#c7ff4e] text-[#0b1020] rounded font-semibold text-sm hover:bg-white transition-colors">
                  Subskrybuj
                </button>
              </div>

              {/* Share buttons */}
              <div className="bg-[#141829] border border-[#2a2f3e] rounded-lg p-6">
                <h4 className="text-sm font-bold text-white mb-4">Podziel się</h4>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-[#0b1020] hover:bg-[#1a1f2e] text-white rounded text-sm transition-colors">
                    LinkedIn
                  </button>
                  <button className="w-full px-4 py-2 bg-[#0b1020] hover:bg-[#1a1f2e] text-white rounded text-sm transition-colors">
                    Twitter
                  </button>
                  <button className="w-full px-4 py-2 bg-[#0b1020] hover:bg-[#1a1f2e] text-white rounded text-sm transition-colors">
                    Email
                  </button>
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
