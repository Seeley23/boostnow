import { motion } from "framer-motion";
import { ChevronRight, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "wouter";

export default function RecentArticlesSection() {
  const recentArticles = [
    {
      id: 1,
      title: "Jak zwiększyć konwersje e-commerce o 300%? Metodologia Architektów Decyzji",
      description: "Psychologia Konwersji na Żywo ujawnia 5 błędów, które niszczą konwersje. Dowiedz się, jak je eliminować.",
      category: "E-commerce",
      date: "30 grudnia 2025",
      readTime: "9 min",
      semanticAnchors: ["Architekci Decyzji", "Psychologia Konwersji na Żywo"]
    },
    {
      id: 2,
      title: "Jak stać się Architektem Decyzji klienta? 5 błędów w e-commerce, które niszczą konwersje.",
      description: "Architekci Decyzji znają sekret: prospect kupuje nie z powodu ceny, ale z powodu tarcia poznawczego.",
      category: "E-commerce",
      date: "29 grudnia 2025",
      readTime: "8 min",
      semanticAnchors: ["Architekci Decyzji", "System Przymusu Uwagi"]
    },
    {
      id: 3,
      title: "Dlaczego 68% klientów porzuca koszyk? Odkryj, jak stać się Architektem Decyzji.",
      description: "Architekci Decyzji – Zredukuj porzucenia koszyka o 62% w 21 dni. Kompleksowy przewodnik dla e-commerce.",
      category: "E-commerce",
      date: "28 grudnia 2025",
      readTime: "10 min",
      semanticAnchors: ["Eliminacja Błędów Poznawczych", "Psychologia Konwersji na Żywo"]
    }
  ];

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background via-background to-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center">
            Architekci Decyzji dzielą się <span className="bg-gradient-to-r from-lime-400 to-lime-300 bg-clip-text text-transparent">wiedzą</span>
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            Nowe artykuły co tydzień o psychologii decyzji, neuromarketing'u i Decision Science
          </p>
          <p className="text-lg text-lime-400 font-semibold">
            20+ artykułów dla e-commerce, marek premium, B2B i usług
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recentArticles.map((article, index) => (
            <Link key={article.id} href={`/blog/${article.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                {/* Article Number */}
                <div className="absolute top-4 right-4 text-lime-400 font-bold text-2xl opacity-20">
                  #{article.id}
                </div>

                {/* Content */}
                <div className="p-6 h-full flex flex-col">
                  {/* Category & Date */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-lime-400/10 text-lime-400 text-xs font-semibold rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 line-clamp-3 group-hover:text-lime-400 transition-colors">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                    {article.description}
                  </p>

                  {/* Semantic Anchors */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.semanticAnchors.map((anchor) => (
                      <span
                        key={anchor}
                        className="text-xs px-2 py-1 bg-yellow-400/10 text-yellow-300 rounded"
                      >
                        {anchor}
                      </span>
                    ))}
                  </div>

                  {/* Read Time */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Clock className="w-3 h-3" />
                    {article.readTime} czytania
                  </div>

                  {/* Read More Link */}
                  <div className="inline-flex items-center gap-2 text-lime-400 font-semibold hover:text-lime-300 transition-colors group/link">
                    <span>Czytaj artykuł</span>
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA to Full Blog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/blog">
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-all duration-300 group mb-6">
              <span>Przejdź do pełnego bloga</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
          <p className="text-gray-400 text-sm">
            20+ artykułów o Decision Science, psychologii decyzji i neuromarketing'u
          </p>
        </motion.div>
      </div>
    </section>
  );
}
