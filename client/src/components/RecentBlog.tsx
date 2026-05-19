import { motion } from 'framer-motion';
import { Link } from 'wouter';
import articlesMetadata from '../data/blog/articles-metadata.json';

interface Article {
  id: number;
  title: string;
  content?: string;
  meta_description?: string;
  semantic_anchors?: string;
  target_industry?: string;
  word_count?: number;
  slug: string;
  date: string;
}

const RecentBlog: React.FC = () => {
  const articles: Article[] = articlesMetadata;
  const recentArticles = articles.slice(0, 3);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b1020]">
      <div className="max-w-6xl mx-auto">
        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="text-[#c7ff4e] text-sm font-semibold">BLOG</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Ostatnie artykuły
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Architekci Decyzji dzielą się wiedzą o Decision Science i Neuromarketing
          </p>
          <Link href="/blog">
            <button className="inline-block px-6 py-3 bg-[#c7ff4e] text-[#0b1020] font-semibold rounded-lg hover:bg-opacity-90 transition">
              Przejdź do bloga →
            </button>
          </Link>
        </motion.div>

        {/* Artykuły */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map((article, index) => (
            <Link key={article.id} href={`/blog/${article.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#1a2332] rounded-lg p-6 border border-gray-700 hover:border-[#c7ff4e] transition group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[#c7ff4e] font-bold text-sm">#{article.id}</span>
                  <span className="text-gray-500 text-xs bg-gray-800 px-2 py-1 rounded">
                    {article.target_industry}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {article.meta_description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(article.semantic_anchors || '').split(', ').slice(0, 2).map((anchor) => (
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
                  <span>~{Math.ceil((article.word_count || 0) / 200)} min</span>
                </div>

                <div className="block mt-4 text-[#c7ff4e] font-medium text-sm hover:underline">
                  Czytaj artykuł →
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentBlog;
