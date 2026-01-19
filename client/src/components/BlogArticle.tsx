import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import articlesMetadata from '../data/blog/articles-metadata.json';
import articleFilesMap from '../data/blog/article-files.json';
import { BlogRating } from './BlogRating';

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

  // Title jest teraz ustawiany przez Helmet w return statement

  const articles: Article[] = articlesMetadata as Article[];

  // Ustaw meta tags dla GEO
  useEffect(() => {
    if (article) {
      // og:title
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', article.title);
      else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:title');
        meta.setAttribute('content', article.title);
        document.head.appendChild(meta);
      }

      // og:description
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', article.meta_description);
      else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        meta.setAttribute('content', article.meta_description);
        document.head.appendChild(meta);
      }

      // og:image
      const ogImage = document.querySelector('meta[property="og:image"]');
      const imageUrl = `/og-images/${id}.png`;
      if (ogImage) ogImage.setAttribute('content', imageUrl);
      else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.setAttribute('content', imageUrl);
        document.head.appendChild(meta);
      }

      // og:type
      const ogType = document.querySelector('meta[property="og:type"]');
      if (ogType) ogType.setAttribute('content', 'article');
      else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:type');
        meta.setAttribute('content', 'article');
        document.head.appendChild(meta);
      }

      // article:published_time
      const pubTime = document.querySelector('meta[property="article:published_time"]');
      const articleData = articlesMetadata[parseInt(id || '1') - 1] as any;
      if (articleData?.date) {
        if (pubTime) pubTime.setAttribute('content', articleData.date);
        else {
          const meta = document.createElement('meta');
          meta.setAttribute('property', 'article:published_time');
          meta.setAttribute('content', articleData.date);
          document.head.appendChild(meta);
        }
      }

      // article:tag (semantic anchors)
      const tags = article.semantic_anchors.split(',').map(t => t.trim());
      tags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.setAttribute('content', tag);
        document.head.appendChild(meta);
      });

      // JSON-LD Schema for Article (Google Rich Results)
      const schemaScript = document.querySelector('script[type="application/ld+json"][data-article-schema]');
      const articleUrl = `https://boostnow.pl/blog/${id}`;
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': articleUrl,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl
        },
        headline: article.title,
        description: article.meta_description,
        image: {
          '@type': 'ImageObject',
          url: `https://boostnow.pl${imageUrl}`,
          width: 1200,
          height: 630
        },
        datePublished: articleData?.date || new Date().toISOString(),
        dateModified: articleData?.date || new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: 'Mateusz Nowotka',
          url: 'https://www.linkedin.com/in/mateusz-nowotka-34aa1018a/',
          jobTitle: 'Founder & CEO',
          worksFor: {
            '@type': 'Organization',
            name: 'BoostNow'
          }
        },
        publisher: {
          '@type': 'Organization',
          name: 'BoostNow',
          url: 'https://boostnow.pl',
          logo: {
            '@type': 'ImageObject',
            url: 'https://boostnow.pl/images/boostnow-logo.svg',
            width: 600,
            height: 60
          }
        },
        articleSection: article.target_industry,
        wordCount: article.word_count,
        keywords: [article.semantic_anchors, article.target_industry].join(', '),
        inLanguage: 'pl-PL',
        about: {
          '@type': 'Thing',
          name: article.semantic_anchors.split(',')[0].trim()
        }
      };
      
      if (schemaScript) {
        schemaScript.textContent = JSON.stringify(schema);
      } else {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-article-schema', 'true');
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      }

      // BreadcrumbList Schema for Article
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
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': article.title,
            'item': articleUrl
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
    }
  }, [article, id]);

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
            
            // Usuń YAML frontmatter jeśli istnieje
            const frontmatterRegex = /^---\n[\s\S]*?\n---\n/;
            content = content.replace(frontmatterRegex, '');
            
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
      <Helmet>
        <title>{article.title.length > 45 ? article.title.substring(0, 45) + '...' : article.title} | BoostNow</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={article.meta_description} />
        <meta name="keywords" content={`${article.semantic_anchors}, ${article.target_industry}, decision science, neuromarketing, psychologia konwersji`} />
        <h1 style={{display: 'none'}}>{article.title}</h1>
        <h2 style={{display: 'none'}}>{article.meta_description}</h2>
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://boostnow.pl/blog/${id}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.meta_description} />
        <meta property="og:image" content={`https://boostnow.pl/og-images/${id}.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.meta_description} />
        <link rel="canonical" content={`https://boostnow.pl/blog/${id}`} />
      </Helmet>
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
                  <h4 className="text-lg font-bold text-white font-playfair">Mateusz Nowotka</h4>
                  <p className="text-[#9aa0b3] text-sm mb-3">
                    Founder & CEO BoostNow | Decision Science Specialist | 4 lata doświadczenia w marketingu
                  </p>
                  <div className="flex gap-3">
                    <a href="https://www.linkedin.com/in/mateusz-nowotka-34aa1018a/" target="_blank" rel="noopener noreferrer" className="text-[#c7ff4e] hover:text-white transition-colors text-sm">
                      LinkedIn →
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

              {/* Blog Rating */}
              {id && <BlogRating articleId={parseInt(id)} />}

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
              {article && (
                <div className="bg-[#141829] border border-[#2a2f3e] rounded-lg p-6">
                  <h4 className="text-sm font-bold text-white mb-4">Podziel się</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        const url = typeof window !== 'undefined' ? window.location.href : '';
                        const encodedUrl = encodeURIComponent(url);
                        const encodedTitle = encodeURIComponent(article.title);
                        window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank', 'width=600,height=400');
                      }}
                      className="w-full px-4 py-2 bg-[#0b1020] hover:bg-[#1a1f2e] text-white rounded text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.694-5.829 6.694h-3.306l7.73-8.835L.424 2.25h6.679l4.882 6.268L17.75 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      X
                    </button>
                    <button
                      onClick={() => {
                        const url = typeof window !== 'undefined' ? window.location.href : '';
                        const encodedUrl = encodeURIComponent(url);
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank', 'width=600,height=400');
                      }}
                      className="w-full px-4 py-2 bg-[#0b1020] hover:bg-[#1a1f2e] text-white rounded text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.05-8.746 0-9.637h3.554v1.364c.429-.662 1.196-1.608 2.902-1.608 2.12 0 3.71 1.386 3.71 4.365v5.516zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.708 0-.951.77-1.708 1.954-1.708 1.184 0 1.915.757 1.915 1.708 0 .95-.731 1.708-1.954 1.708zm1.586 11.019H3.75V9.795h3.173v10.657zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                      LinkedIn
                    </button>
                    <button
                      onClick={() => {
                        const url = typeof window !== 'undefined' ? window.location.href : '';
                        const encodedTitle = encodeURIComponent(article.title);
                        const encodedDescription = encodeURIComponent(article.meta_description);
                        window.location.href = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${url}`;
                      }}
                      className="w-full px-4 py-2 bg-[#0b1020] hover:bg-[#1a1f2e] text-white rounded text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogArticle;
