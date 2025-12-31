import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function VideoAnimationSection() {
  const caseStudies = [
    {
      id: 1,
      title: "E-commerce Product Animation",
      description: "Animacja produktu 360° + unboxing sequence",
      result: "+45% CTR na produktach",
      industry: "E-commerce",
      metrics: "3.2M views, +$125k revenue"
    },
    {
      id: 2,
      title: "Brand Explainer Video",
      description: "Animacja koncepcji marki w 60 sekund",
      result: "+280% engagement",
      industry: "Marki Premium",
      metrics: "2.1M views, +65% brand recall"
    },
    {
      id: 3,
      title: "SaaS Feature Demo",
      description: "Animowana demonstracja funkcjonalności",
      result: "+89% konwersji demo requests",
      industry: "B2B/SaaS",
      metrics: "1.8M views, +340% qualified leads"
    },
    {
      id: 4,
      title: "Social Media Carousel Animation",
      description: "Animacje do postów na LinkedIn, TikTok, Instagram",
      result: "+156% reach organiczny",
      industry: "Wszystkie branże",
      metrics: "5.2M views, +420% shares"
    },
    {
      id: 5,
      title: "Landing Page Hero Animation",
      description: "Dynamiczna animacja hero section",
      result: "+62% scroll depth",
      industry: "Wszystkie branże",
      metrics: "4.1M views, +150% time-on-page"
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Video Animation
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            Statyczne zdjęcia to błąd, który kosztu Ci sprzedaży
          </p>
          <p className="text-lg text-lime-400 font-semibold">
            Video animacje zatrzymują scroll, przyciągają uwagę i sprzedają
          </p>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-16 bg-white/5 border border-lime-400/20 rounded-lg p-8"
        >
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Prospect przegląda Twoją stronę w 2.3 sekundy. Statyczne zdjęcia? Przeskakuje. Animacja produktowa? Zatrzymuje się, ogląda, kupuje.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Video animacje zwiększają widoczność produktu, zatrzymują scroll, poprawiają CTR i sprzedaż. To nie jest opcja - to konieczność.
          </p>
          <p className="text-lime-400 font-semibold text-xl">
            Średni wzrost konwersji: <span className="text-3xl">+156%</span>
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white/5 border border-white/10 rounded-lg p-6 hover:border-lime-400/50 hover:bg-white/10 transition-all duration-300"
            >
              {/* Number */}
              <div className="absolute top-4 right-4 text-lime-400 font-bold text-2xl opacity-20">
                #{study.id}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 pr-8">
                {study.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4">
                {study.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-lime-400 font-semibold text-lg">
                    {study.result}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="px-2 py-1 bg-lime-400/10 text-lime-400 rounded">
                    {study.industry}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {study.metrics}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="flex items-center gap-2 text-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-semibold">Dowiedz się więcej</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Video Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-16 bg-gradient-to-r from-lime-400/10 to-lime-400/5 border border-lime-400/20 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Czemu statyczne zdjęcia to błąd?
          </h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-lime-400 font-bold text-lg mt-1">⚠️</span>
              <span><span className="text-lime-400 font-semibold">Statyczne zdjęcia = zero zaangażowania</span> - prospect przeskakuje w 0.8 sekundy</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lime-400 font-bold text-lg mt-1">⚠️</span>
              <span><span className="text-lime-400 font-semibold">Brak widoczności produktu</span> - klient nie widzi jak działa, nie wie czy go chce</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lime-400 font-bold text-lg mt-1">⚠️</span>
              <span><span className="text-lime-400 font-semibold">Niska konwersja</span> - 68% klientów porzuca koszyk bez widoku produktu w akcji</span>
            </li>
          </ul>
          
          <h3 className="text-2xl font-bold text-white mb-6 mt-8">
            Dlatego animacje video zmieniają grę:
          </h3>
          <ul className="space-y-4 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-lime-400 font-bold text-lg mt-1">✓</span>
              <span><span className="text-lime-400 font-semibold">Zatrzymują scroll</span> - animacja przyciąga uwagę w 0.5 sekundy (vs 0.8s dla zdjęć)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lime-400 font-bold text-lg mt-1">✓</span>
              <span><span className="text-lime-400 font-semibold">+156% konwersji</span> - klient widzi produkt w akcji, wie że go chce</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lime-400 font-bold text-lg mt-1">✓</span>
              <span><span className="text-lime-400 font-semibold">+420% shares</span> - video jest 4x bardziej shareable niż zdjęcia</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-lime-400 font-bold text-lg mt-1">✓</span>
              <span><span className="text-lime-400 font-semibold">-40% bounce rate</span> - prospect spędza 3x więcej czasu na stronie</span>
            </li>
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-all duration-300 group"
          >
            <span>Pokaż mi jak animacje zwiększą Twoją sprzedaż</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-gray-400 text-sm mt-4">
            Konsultacja bezpłatna. Pokażemy Ci konkretne wyniki dla Twojego produktu.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
