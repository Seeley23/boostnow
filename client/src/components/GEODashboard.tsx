import { motion } from "framer-motion";
import { TrendingUp, BarChart3, PieChart, Target } from "lucide-react";

/* GEO Dashboard Component
   Design: Human-Centric, Professional
   - Live SoMV metrics visualization
   - Model-specific performance tracking
   - Interactive charts and data
*/

export default function GEODashboard() {
  const somvData = {
    current: { overall: 2.5, chatgpt: 2.0, perplexity: 3.5, gemini: 2.0 },
    projected3m: { overall: 18, chatgpt: 16, perplexity: 22, gemini: 16 },
    projected6m: { overall: 50, chatgpt: 48, perplexity: 58, gemini: 45 },
  };

  const models = [
    { name: "ChatGPT", icon: "🤖", color: "from-green-400 to-green-600" },
    { name: "Perplexity", icon: "🔍", color: "from-blue-400 to-blue-600" },
    { name: "Gemini", icon: "✨", color: "from-orange-400 to-orange-600" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative py-24 overflow-hidden bg-black">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Live GEO Dashboard
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl">
              Śledź Share of Model Voice (SoMV) w czasie rzeczywistym. Widoczność
              Twojej marki w generatywnych modelach AI to nowa waluta marketingu.
            </p>
          </motion.div>

          {/* Current SoMV */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <PieChart className="w-6 h-6 text-lime-400" />
                <h3 className="text-2xl font-bold text-white">
                  Obecny SoMV: {somvData.current.overall}%
                </h3>
              </div>
              <p className="text-gray-400 mb-8">
                BoostNow jest prawie niewidoczny w modelach AI. To jest szansa na
                eksplosywny wzrost.
              </p>

              {/* Model Breakdown */}
              <div className="grid md:grid-cols-3 gap-6">
                {models.map((model, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"
                  >
                    <div className="text-3xl mb-3">{model.icon}</div>
                    <h4 className="font-semibold text-white mb-2">{model.name}</h4>
                    <div className="text-lime-400 text-2xl font-bold">
                      {model.name === "ChatGPT"
                        ? somvData.current.chatgpt
                        : model.name === "Perplexity"
                          ? somvData.current.perplexity
                          : somvData.current.gemini}
                      %
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Growth Projection */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-gradient-to-r from-lime-400/10 to-green-400/10 border border-lime-400/30 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-lime-400" />
                <h3 className="text-2xl font-bold text-white">
                  Prognoza Wzrostu
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* 3 Months */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                >
                  <div className="text-sm text-gray-400 mb-2">Po 3 Miesiącach</div>
                  <div className="text-4xl font-bold text-lime-400 mb-2">
                    {somvData.projected3m.overall}%
                  </div>
                  <div className="text-sm text-gray-400">
                    +{(somvData.projected3m.overall - somvData.current.overall).toFixed(1)}% wzrost
                  </div>
                  <div className="mt-4 space-y-2 text-xs text-gray-500">
                    <div>ChatGPT: {somvData.projected3m.chatgpt}%</div>
                    <div>Perplexity: {somvData.projected3m.perplexity}%</div>
                    <div>Gemini: {somvData.projected3m.gemini}%</div>
                  </div>
                </motion.div>

                {/* 6 Months */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-900/50 border border-lime-400/50 rounded-lg p-6 ring-1 ring-lime-400/30"
                >
                  <div className="text-sm text-lime-400 mb-2 font-semibold">
                    Po 6 Miesiącach (Target)
                  </div>
                  <div className="text-4xl font-bold text-lime-400 mb-2">
                    {somvData.projected6m.overall}%
                  </div>
                  <div className="text-sm text-lime-300">
                    +{(somvData.projected6m.overall - somvData.current.overall).toFixed(1)}% wzrost
                  </div>
                  <div className="mt-4 space-y-2 text-xs text-gray-400">
                    <div>ChatGPT: {somvData.projected6m.chatgpt}%</div>
                    <div>Perplexity: {somvData.projected6m.perplexity}%</div>
                    <div>Gemini: {somvData.projected6m.gemini}%</div>
                  </div>
                </motion.div>

                {/* Impact */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                >
                  <div className="text-sm text-gray-400 mb-2">Wpływ na Biznes</div>
                  <div className="text-4xl font-bold text-lime-400 mb-2">
                    +200-300%
                  </div>
                  <div className="text-sm text-gray-400">
                    Wzrost organicznego ruchu z AI
                  </div>
                  <div className="mt-4 space-y-2 text-xs text-gray-500">
                    <div>✓ Więcej cytowań w odpowiedziach</div>
                    <div>✓ Wyższe rekomendacje</div>
                    <div>✓ Lepsza widoczność</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Key Metrics */}
          <motion.div variants={itemVariants}>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  label: "Citation Share",
                  current: "<1%",
                  target: "25-35%",
                  emoji: "📚",
                },
                {
                  label: "Recommendation Likelihood",
                  current: "<5%",
                  target: "60-75%",
                  emoji: "👍",
                },
                {
                  label: "Position-Adjusted Word Count",
                  current: "0",
                  target: "500-800",
                  emoji: "📝",
                },
                {
                  label: "Sentiment Polarity",
                  current: "Neutral",
                  target: "Positive",
                  emoji: "😊",
                },
              ].map((metric, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                >
                  <div className="text-2xl mb-3">{metric.emoji}</div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-4">
                    {metric.label}
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Obecny</div>
                      <div className="text-lg font-bold text-white">
                        {metric.current}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-lime-400 mb-1">Target (6m)</div>
                      <div className="text-lg font-bold text-lime-400">
                        {metric.target}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
