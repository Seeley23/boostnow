import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function ComparisonSection() {
  const comparison = [
    {
      feature: "Podejście oparte na psychologii",
      boostnow: true,
      competitors: false
    },
    {
      feature: "Decision Science + Neuromarketing",
      boostnow: true,
      competitors: false
    },
    {
      feature: "Eliminacja błędów poznawczych",
      boostnow: true,
      competitors: false
    },
    {
      feature: "Segmentacja po branżach (8 branż)",
      boostnow: true,
      competitors: false
    },
    {
      feature: "Gwarancja wyników",
      boostnow: true,
      competitors: false
    },
    {
      feature: "Transparentny proces (3 fazy)",
      boostnow: true,
      competitors: false
    },
    {
      feature: "Video Animation Services",
      boostnow: true,
      competitors: false
    },
    {
      feature: "GEO Positioning (AI Search)",
      boostnow: true,
      competitors: false
    },
    {
      feature: "Raport z wynikami co tydzień",
      boostnow: true,
      competitors: false
    },
    {
      feature: "Zespół dedykowany",
      boostnow: true,
      competitors: true
    },
    {
      feature: "Tradycyjny marketing",
      boostnow: false,
      competitors: true
    },
    {
      feature: "Brak transparencji procesu",
      boostnow: false,
      competitors: true
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
            Czym się różnimy?
          </h2>
          <p className="text-xl text-gray-300">
            BoostNow vs. Tradycyjne agencje marketingowe
          </p>
          <p className="text-lg text-lime-400 font-semibold mt-4">
            Nie robimy marketing. Robimy transformację opartą na psychologii.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-white font-bold">Funkcjonalność</th>
                <th className="text-center py-4 px-4 text-lime-400 font-bold">BoostNow</th>
                <th className="text-center py-4 px-4 text-gray-400 font-bold">Konkurencja</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 px-4 text-gray-300">{item.feature}</td>
                  <td className="py-4 px-4 text-center">
                    {item.boostnow ? (
                      <Check className="w-5 h-5 text-lime-400 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {item.competitors ? (
                      <Check className="w-5 h-5 text-gray-500 mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-gray-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Key Differences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white/5 border border-lime-400/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-lime-400 mb-3">
              🧠 Psychologia
            </h3>
            <p className="text-gray-300 text-sm">
              Robimy marketing oparty na psychologii decyzji, a nie na intuicji.
            </p>
          </div>

          <div className="bg-white/5 border border-lime-400/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-lime-400 mb-3">
              📊 Transparencja
            </h3>
            <p className="text-gray-300 text-sm">
              Raport z wynikami co tydzień. Żadnych czarnych skrzynek.
            </p>
          </div>

          <div className="bg-white/5 border border-lime-400/20 rounded-lg p-6">
            <h3 className="text-xl font-bold text-lime-400 mb-3">
              🎯 Rezultaty
            </h3>
            <p className="text-gray-300 text-sm">
              Średnio +156% konwersji w 90 dni. Gwarancja wyników.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
