import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    id: "conversion",
    title: "Inżynieria Konwersji",
    description: "Projektujemy ścieżki zakupu, które usuwają tarcie poznawcze i prowadzą klienta prosto do celu.",
    stats: "+40% konwersji",
  },
  {
    id: "ai",
    title: "Video & Visual AI",
    description: "Tworzymy dynamiczne treści wideo i wizualizacje, które przyciągają uwagę w ułamku sekundy.",
    stats: "3x szybsza produkcja",
  },
  {
    id: "geo",
    title: "GEO Positioning",
    description: "Optymalizujemy widoczność Twojej marki w silnikach AI, takich jak ChatGPT i Perplexity.",
    stats: "Dominacja w AI Search",
  },
  {
    id: "seo",
    title: "SEO Positioning",
    description: "Budujemy trwały autorytet w wyszukiwarkach, łącząc technologię z psychologią treści.",
    stats: "+150% ruchu organicznego",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 mb-8 leading-tight">
            Usługi, które dowożą wynik.
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Nie oferujemy generycznych rozwiązań. Każda nasza usługa jest elementem większego systemu, który ma jeden cel: Twój wzrost.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-10 lg:p-16 rounded-[48px] bg-slate-50 border border-slate-100 hover:bg-slate-900 hover:text-white transition-all duration-500 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-white/10 group-hover:text-white transition-all">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-500 transition-colors">
                  {service.stats}
                </div>
              </div>
              
              <h3 className="text-3xl font-serif mb-6 leading-tight">
                {service.title}
              </h3>
              
              <p className="text-lg text-slate-600 group-hover:text-slate-400 transition-colors leading-relaxed mb-10">
                {service.description}
              </p>

              <div className="flex items-center gap-3 font-bold text-lg opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2">
                Dowiedz się więcej
                <ArrowRight className="w-6 h-6" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
