import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingCart, ArrowRight } from "lucide-react";

const caseStudies = [
  {
    id: 1,
    industry: "E-commerce",
    icon: ShoppingCart,
    title: "Wzrost konwersji o 156% dla marki modowej",
    problem: "Niski współczynnik konwersji mimo wysokiego ruchu na stronie.",
    results: [
      { label: "Wzrost konwersji", value: "+156%" },
      { label: "Redukcja porzuceń", value: "-42%" },
    ],
  },
  {
    id: 2,
    industry: "SaaS B2B",
    icon: Users,
    title: "Skrócenie cyklu sprzedaży o 35%",
    problem: "Długi cykl sprzedaży i niska jakość leadów.",
    results: [
      { label: "Jakość leadów", value: "+89%" },
      { label: "Demo requests", value: "+210%" },
    ],
  },
];

export default function ResultsSection() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 mb-8 leading-tight">
            Mierzalne dowody skuteczności.
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Nie obiecujemy wzrostu bez poparcia danymi. Oto transformacje, które przeprowadziliśmy dla naszych partnerów.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                  <study.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{study.industry}</span>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-serif text-slate-900 mb-6 leading-tight group-hover:text-slate-600 transition-colors">
                {study.title}
              </h3>
              
              <p className="text-slate-600 mb-10 leading-relaxed">
                {study.problem}
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                {study.results.map((result, rIdx) => (
                  <div key={rIdx}>
                    <div className="text-3xl font-serif text-slate-900 mb-1">{result.value}</div>
                    <div className="text-sm text-slate-500 font-medium">{result.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="inline-flex items-center gap-2 text-slate-900 font-bold text-lg hover:gap-4 transition-all cursor-pointer">
            Zobacz wszystkie case studies
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
