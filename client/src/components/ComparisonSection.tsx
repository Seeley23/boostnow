import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function ComparisonSection() {
  const comparison = [
    { feature: "Podejście oparte na psychologii", boostnow: true, competitors: false },
    { feature: "Decision Science + Neuromarketing", boostnow: true, competitors: false },
    { feature: "Eliminacja błędów poznawczych", boostnow: true, competitors: false },
    { feature: "Segmentacja po branżach", boostnow: true, competitors: false },
    { feature: "GEO Positioning (AI Search)", boostnow: true, competitors: false },
    { feature: "Gwarancja mierzalnych wyników", boostnow: true, competitors: false },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 mb-8 leading-tight">
            Dlaczego my?
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Większość agencji robi marketing. My budujemy systemy oparte na nauce o decyzjach, które realnie zmieniają Twoje wyniki.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 rounded-[48px] p-8 lg:p-16">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-6 text-slate-400 font-bold uppercase tracking-widest text-xs">Funkcjonalność</th>
                <th className="text-center py-6 text-slate-900 font-bold uppercase tracking-widest text-xs">BoostNow</th>
                <th className="text-center py-6 text-slate-400 font-bold uppercase tracking-widest text-xs">Inni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparison.map((item, index) => (
                <tr key={index} className="group">
                  <td className="py-6 text-slate-900 font-medium">{item.feature}</td>
                  <td className="py-6 text-center">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                      <Check size={18} />
                    </div>
                  </td>
                  <td className="py-6 text-center">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                      <X size={18} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
