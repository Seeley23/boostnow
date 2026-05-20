import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import industries from '@/data/industries.json';

export default function IndustriesSection() {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 mb-8 leading-tight">
            Rozwiązania skrojone pod Twoją branżę.
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Każdy rynek ma swoją specyfikę. Personalizujemy naszą strategię, aby trafić dokładnie w potrzeby Twoich klientów.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap gap-3 mb-16">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-6 py-3 rounded-2xl font-medium transition-all cursor-pointer ${
                selectedIndustry.id === industry.id
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {industry.name}
            </button>
          ))}
        </div>

        {/* Selected Industry Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndustry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            <div className="bg-slate-50 p-10 lg:p-16 rounded-[48px]">
              <h3 className="text-3xl font-serif text-slate-900 mb-6">{selectedIndustry.name}</h3>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">{selectedIndustry.description}</p>
              
              <div className="space-y-8">
                {selectedIndustry.solutions.map((solution, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-1">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{solution.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 p-10 lg:p-16 rounded-[48px] text-white flex flex-col justify-between">
              <div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 block">Case Study</span>
                <h4 className="text-3xl font-serif mb-8">{selectedIndustry.caseStudy.title}</h4>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  {selectedIndustry.caseStudy.results.map((result, idx) => (
                    <div key={idx}>
                      <div className="text-4xl font-serif text-emerald-400 mb-1">{result.value}</div>
                      <div className="text-sm text-slate-400">{result.metric}</div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="group flex items-center gap-3 text-lg font-bold hover:gap-5 transition-all cursor-pointer">
                Zobacz szczegóły wdrożenia
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
