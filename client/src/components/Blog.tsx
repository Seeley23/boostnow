import React, { useState } from 'react';
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

const Blog: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);

  const articles: Article[] = articlesMetadata;

  // Filtruj artykuły
  const filteredArticles = selectedIndustry === 'all' 
    ? articles 
    : articles.filter(a => a.target_industry === selectedIndustry);

  // Unikalne branże
  const industriesSet = new Set(articles.map(a => a.target_industry));
  const industries = ['all', ...Array.from(industriesSet)];

  const industryLabels: Record<string, string> = {
    all: `Wszystkie artykuły (${articles.length})`,
    'E-commerce': `🛒 E-commerce (${articles.filter(a => a.target_industry === 'E-commerce').length})`,
    'Marki Premium': `✨ Marki Premium (${articles.filter(a => a.target_industry === 'Marki Premium').length})`,
    'Usługi & Consulting': `💼 Usługi & Consulting (${articles.filter(a => a.target_industry === 'Usługi & Consulting').length})`
  };

  // Dynamicznie generuj etykiety dla branż, które nie są w liście
  industries.forEach(industry => {
    if (industry !== 'all' && !industryLabels[industry]) {
      const count = articles.filter(a => a.target_industry === industry).length;
      industryLabels[industry] = `${industry} (${count})`;
    }
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b1020]">
      <div className="max-w-6xl mx-auto">
        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-[#c7ff4e] text-sm font-semibold tracking-wider">ARTYKUŁY BLOGOWE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
            Architekci Decyzji dzielą się wiedzą
          </h2>
          <p className="text-[#9aa0b3] text-lg max-w-2xl mx-auto">
            Odkryj, jak Decision Science i Psychologia Konwersji na Żywo transformują marketing Twoim branżę. 
            {articles.length} artykułów o neuromarketing, optymalizacji konwersji i eliminacji błędów poznawczych.
          </p>
        </motion.div>

        {/* Filtry branż */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedIndustry === industry
                  ? 'bg-[#c7ff4e] text-[#0b1020]'
                  : 'bg-[#1a1f2e] text-[#9aa0b3] hover:bg-[#2a2f3e] hover:text-white'
              }`}
            >
              {industryLabels[industry]}
            </button>
          ))}
        </motion.div>

        {/* Lista artykułów */}
        <div className="grid gap-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-[#141829] border border-[#2a2f3e] rounded-lg p-6 hover:border-[#c7ff4e] transition-all duration-300 cursor-pointer group"
              onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Numer i branża */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#c7ff4e] font-bold text-sm">#{article.id.toString().padStart(2, '0')}</span>
                    <span className="text-[#00c88a] text-xs font-semibold px-2 py-1 bg-[#00c88a]/10 rounded">
                      {article.target_industry}
                    </span>
                  </div>

                  {/* Tytuł */}
                  <h3 className="text-xl font-bold text-white mb-2 font-playfair group-hover:text-[#c7ff4e] transition-colors">
                    {article.title}
                  </h3>

                  {/* Meta description */}
                  <p className="text-[#9aa0b3] text-sm mb-3 line-clamp-2">
                    {article.meta_description}
                  </p>

                  {/* Semantic Anchors */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {article.semantic_anchors.split(',').map((anchor, i) => (
                      <span
                        key={i}
                        className="text-xs bg-[#c7ff4e]/10 text-[#c7ff4e] px-2 py-1 rounded font-medium"
                      >
                        {anchor.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-[#9aa0b3]">
                    <span>📅 {article.date}</span>
                    <span>📝 {article.word_count} słów</span>
                    <span>⏱️ ~{Math.ceil(article.word_count / 200)} min czytania</span>
                  </div>
                </div>

                {/* Chevron */}
                <div className="ml-4 flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-[#c7ff4e] transition-transform duration-300 ${
                      expandedArticle === article.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </div>

              {/* Rozwinięty widok */}
              {expandedArticle === article.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-[#2a2f3e]"
                >
                  <p className="text-[#9aa0b3] text-sm leading-relaxed mb-4">
                    {article.meta_description}
                  </p>
                  <div className="flex gap-3">
                    <Link href={`/blog/${article.id}`} className="px-4 py-2 bg-[#c7ff4e] text-[#0b1020] rounded-lg font-semibold hover:bg-[#b8e63d] transition-colors text-sm">
                      Czytaj artykuł
                    </Link>
                    <button className="px-4 py-2 bg-[#2a2f3e] text-white rounded-lg font-semibold hover:bg-[#3a3f4e] transition-colors text-sm">
                      Zapisz
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Podsumowanie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-r from-[#c7ff4e]/10 to-[#00c88a]/10 border border-[#c7ff4e]/20 rounded-lg text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3 font-playfair">
            Gotowy na transformację?
          </h3>
          <p className="text-[#9aa0b3] mb-6 max-w-2xl mx-auto">
            Nasze artykuły pokazują, jak Architekci Decyzji zmieniają marketing. 
            Teraz czas na Twoją firmę. Zarezerwuj bezpłatną konsultację i dowiedz się, 
            jak możemy osiągnąć 5.8x ROI w mniej niż kwartał.
          </p>
          <button className="px-8 py-3 bg-[#c7ff4e] text-[#0b1020] rounded-lg font-bold hover:bg-white transition-all duration-300 transform hover:scale-105">
            Zarezerwuj konsultację →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
