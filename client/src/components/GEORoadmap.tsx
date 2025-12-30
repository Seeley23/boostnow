import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

/* GEO Roadmap Component
   Design: Professional Timeline
   - 6-month implementation plan
   - Monthly milestones and tasks
   - Progress tracking
*/

export default function GEORoadmap() {
  const months = [
    {
      month: "Miesiąc 1",
      title: "Fundament Techniczny",
      color: "from-blue-400 to-blue-600",
      tasks: [
        "Wdrożenie pliku llms.txt",
        "Implementacja JSON-LD (Organization, Service, FAQPage)",
        "Dodanie byline autora do każdej strony",
        "Wdrożenie Server-Side Rendering dla Hero Section",
      ],
      status: "pending",
    },
    {
      month: "Miesiąc 2",
      title: "Optymalizacja Treści",
      color: "from-purple-400 to-purple-600",
      tasks: [
        "Przebudowa copywritingu (Answer-First)",
        "Dodanie 50+ twardych danych liczbowych",
        "Implementacja Semantic Anchors",
        "Dodanie E-E-A-T w metadanych",
      ],
      status: "pending",
    },
    {
      month: "Miesiąc 3",
      title: "Budowa Autorytetu",
      color: "from-pink-400 to-pink-600",
      tasks: [
        "12 postów na Reddit (r/marketing, r/entrepreneur)",
        "4 artykuły na Medium",
        "8 artykułów na LinkedIn (byline autora)",
        "Edycje Wikipedia (Neuromarketing, Decision Science)",
      ],
      status: "pending",
    },
    {
      month: "Miesiąc 4",
      title: "Vector Space Domination",
      color: "from-green-400 to-green-600",
      tasks: [
        "Publikacja 8 artykułów (Content Clustering)",
        "Optymalizacja Cosine Similarity",
        "Wdrożenie Indirect Prompt Persuasion",
        "Rozpoczęcie monitorowania SoMV",
      ],
      status: "pending",
    },
    {
      month: "Miesiąc 5-6",
      title: "Skalowanie",
      color: "from-orange-400 to-orange-600",
      tasks: [
        "Publikacja 16 artykułów (2/tydzień)",
        "Intensyfikacja Reddit/LinkedIn",
        "Analiza SoMV i iteracja",
        "Publikacja Case Studies z danymi",
      ],
      status: "pending",
    },
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
              6-Miesięczna Roadmapa GEO
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl">
              Konkretny plan działań do wdrożenia pełnej strategii Generative
              Engine Optimization. Każdy miesiąc to nowy poziom widoczności w AI.
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={containerVariants} className="space-y-8">
            {months.map((monthData, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative"
              >
                {/* Connector Line */}
                {idx < months.length - 1 && (
                  <div className="absolute left-8 top-24 w-0.5 h-12 bg-gradient-to-b from-lime-400 to-transparent" />
                )}

                <div className="flex gap-6">
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${monthData.color} flex items-center justify-center flex-shrink-0 border-4 border-black`}
                    >
                      <span className="text-white font-bold text-sm text-center">
                        M{idx + 1}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex-1 bg-gray-900/50 border border-gray-800 rounded-lg p-8 mt-2"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {monthData.month}
                        </h3>
                        <h4 className="text-lg font-semibold text-lime-400">
                          {monthData.title}
                        </h4>
                      </div>
                      <Circle className="w-5 h-5 text-gray-600" />
                    </div>

                    {/* Tasks */}
                    <div className="space-y-3">
                      {monthData.tasks.map((task, taskIdx) => (
                        <motion.div
                          key={taskIdx}
                          whileHover={{ x: 4 }}
                          className="flex items-start gap-3 p-3 bg-gray-800/50 rounded border border-gray-700/50"
                        >
                          <Circle className="w-4 h-4 text-lime-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{task}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Expected Results */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="mt-6 p-4 bg-lime-400/10 border border-lime-400/30 rounded"
                    >
                      <h5 className="text-sm font-semibold text-lime-300 mb-2">
                        Oczekiwane Rezultaty:
                      </h5>
                      {idx === 0 && (
                        <p className="text-xs text-lime-200">
                          ✓ Boty AI mogą indeksować stronę | ✓ Dane ustrukturyzowane |
                          ✓ E-E-A-T w metadanych
                        </p>
                      )}
                      {idx === 1 && (
                        <p className="text-xs text-lime-200">
                          ✓ Treści zoptymalizowane dla RAG | ✓ Semantic Anchors
                          wdrożone | ✓ Fact-Density zwiększona
                        </p>
                      )}
                      {idx === 2 && (
                        <p className="text-xs text-lime-200">
                          ✓ Off-page Authority budowana | ✓ Obecność na 4 platformach |
                          ✓ SoMV: 15-20%
                        </p>
                      )}
                      {idx === 3 && (
                        <p className="text-xs text-lime-200">
                          ✓ Content Clustering wdrożony | ✓ Vector Space Domination
                          | ✓ SoMV: 25-30%
                        </p>
                      )}
                      {idx === 4 && (
                        <p className="text-xs text-lime-200">
                          ✓ SoMV: 40-60% | ✓ +200-300% organicznego ruchu z AI |
                          ✓ Lider w branży
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Key Milestones */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-8">
              Kluczowe Kamienie Milowe
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  phase: "Faza 1 (M1-M2)",
                  somv: "5-10%",
                  impact: "Boty AI mogą indeksować",
                  emoji: "🔧",
                },
                {
                  phase: "Faza 2 (M3-M4)",
                  somv: "15-30%",
                  impact: "Widoczna obecność w AI",
                  emoji: "📈",
                },
                {
                  phase: "Faza 3 (M5-M6)",
                  somv: "40-60%",
                  impact: "Lider w branży",
                  emoji: "👑",
                },
              ].map((milestone, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                >
                  <div className="text-3xl mb-3">{milestone.emoji}</div>
                  <h4 className="font-semibold text-white mb-2">{milestone.phase}</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">SoMV</div>
                      <div className="text-2xl font-bold text-lime-400">
                        {milestone.somv}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">{milestone.impact}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 bg-gradient-to-r from-lime-400/10 to-green-400/10 border border-lime-400/30 rounded-lg p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-3">
              Gotowy na Transformację?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Ta roadmapa to dokładny plan, jak stać się liderem w generatywnych
              modelach AI. Każdy krok jest testowany i sprawdzony przez top 1%
              marketerów.
            </p>
            <button className="px-8 py-3 bg-lime-400 text-black font-bold rounded-lg hover:bg-lime-300 transition-colors">
              Rozpocznij Implementację
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
