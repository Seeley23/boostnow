import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";

export default function RecentArticlesSection() {
  const recentArticles = [
    {
      id: 1,
      title: "Jak zwiększyć konwersje e-commerce o 300%?",
      description: "Poznaj metodologię Architektów Decyzji i dowiedz się, jak eliminować błędy poznawcze na ścieżce zakupu.",
      category: "E-commerce",
      readTime: "9 min",
    },
    {
      id: 2,
      title: "Psychologia uwagi w marketingu B2B",
      description: "Dlaczego Twoje reklamy są ignorowane i jak to zmienić wykorzystując mechanizmy Decision Science.",
      category: "Strategia",
      readTime: "8 min",
    },
    {
      id: 3,
      title: "GEO: Przyszłość widoczności w erze AI",
      description: "Jak przygotować swoją markę na odpowiedzi generowane przez ChatGPT i Perplexity.",
      category: "Technologia",
      readTime: "10 min",
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 mb-8 leading-tight">
              Wiedza, która buduje przewagę.
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Dzielimy się spostrzeżeniami z pogranicza psychologii, technologii i biznesu.
            </p>
          </div>
          <Link href="/blog">
            <button className="text-slate-900 font-bold text-lg flex items-center gap-2 hover:gap-4 transition-all cursor-pointer pb-2 border-b-2 border-slate-900">
              Wszystkie artykuły
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentArticles.map((article, index) => (
            <Link key={article.id} href={`/blog/${article.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] bg-slate-100 rounded-[32px] mb-8 overflow-hidden">
                  <div className="w-full h-full bg-slate-200 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{article.category}</span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock size={14} />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-serif text-slate-900 mb-4 group-hover:text-slate-600 transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-slate-600 line-clamp-2 leading-relaxed">
                  {article.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
