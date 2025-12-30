import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

/* GEO Audit Component
   Design: Professional, Data-Driven
   - Detailed audit findings
   - Status indicators (✓, ✗, ⚠)
   - Actionable recommendations
*/

export default function GEOAudit() {
  const auditSections = [
    {
      title: "Indeksowalność AI (SoMV Audit)",
      status: "critical",
      findings: [
        {
          item: "Plik llms.txt",
          status: "missing",
          impact: "ChatGPT, Perplexity, Gemini mogą indeksować, ale bez jasnych dyrektyw",
          solution: "Wdrożyć llms.txt z dyrektywami dla botów AI",
        },
        {
          item: "Renderowanie treści",
          status: "warning",
          impact: "React CSR - LLM-y preferują Static HTML/SSR",
          solution: "Wdrożyć Server-Side Rendering dla kluczowych sekcji",
        },
      ],
    },
    {
      title: "Inżynieria Warstwy Danych (Schema.org)",
      status: "critical",
      findings: [
        {
          item: "JSON-LD Organization",
          status: "missing",
          impact: "Boty AI nie mogą wyodrębnić kluczowych informacji",
          solution: "Implementacja zagnieżdżonej struktury JSON-LD",
        },
        {
          item: "Schema FAQPage",
          status: "missing",
          impact: "Brak strukturyzacji FAQ dla RAG",
          solution: "Dodanie Schema FAQPage dla wszystkich Q&A",
        },
      ],
    },
    {
      title: "GEO-Copywriting (Answer-First)",
      status: "warning",
      findings: [
        {
          item: "Struktura akapitów",
          status: "warning",
          impact: "Treści nie są autonomicznymi odpowiedziami",
          solution: "Przebudowa na 100-200 słów, teza + dowód",
        },
        {
          item: "Twarde dane liczbowe",
          status: "critical",
          impact: "Brakuje statystyk i konkretnych liczb",
          solution: "Dodanie minimum 3 twardych danych na stronę",
        },
      ],
    },
    {
      title: "E-E-A-T w Metadanych",
      status: "critical",
      findings: [
        {
          item: "Byline autora",
          status: "missing",
          impact: "Brak informacji o autorach i doświadczeniu",
          solution: "Dodanie byline na każdym artykule + LinkedIn",
        },
        {
          item: "Certyfikaty (hasCredential)",
          status: "missing",
          impact: "Brak Authority Graph dla marki",
          solution: "Implementacja Schema.org hasCredential",
        },
      ],
    },
    {
      title: "Budowa Autorytetu Zewnętrznego",
      status: "critical",
      findings: [
        {
          item: "Obecność na Reddit",
          status: "missing",
          impact: "Perplexity czerpie 46.7% danych z Reddit",
          solution: "12 postów/miesiąc na r/marketing, r/entrepreneur",
        },
        {
          item: "Artykuły na Medium",
          status: "missing",
          impact: "Brak widoczności w SEO + GEO",
          solution: "4 artykuły/miesiąc na Medium",
        },
        {
          item: "LinkedIn Authority",
          status: "missing",
          impact: "Brak budowania E-E-A-T",
          solution: "2 artykuły/tydzień na LinkedIn (byline autora)",
        },
      ],
    },
    {
      title: "Semantic Anchoring",
      status: "critical",
      findings: [
        {
          item: "Unikalne n-gramy",
          status: "missing",
          impact: "Brak unikalnych terminów, które LLM-y mogą zapamiętać",
          solution:
            'Implementacja Semantic Anchors: "Architekci Decyzji", "System Przymusu Uwagi"',
        },
      ],
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "border-red-500/30 bg-red-500/5";
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/5";
      case "ok":
        return "border-green-500/30 bg-green-500/5";
      default:
        return "border-gray-800 bg-gray-900/50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "missing":
        return <XCircle className="w-5 h-5 text-red-400" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case "ok":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      default:
        return null;
    }
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
              Szczegółowy Audyt GEO
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl">
              Analiza na poziomie top 1% marketerów. Odkryj dokładnie, co blokuje
              widoczność BoostNow w modelach AI i jak to naprawić.
            </p>
          </motion.div>

          {/* Audit Sections */}
          <motion.div variants={containerVariants} className="space-y-8">
            {auditSections.map((section, sectionIdx) => (
              <motion.div
                key={sectionIdx}
                variants={itemVariants}
                className={`border rounded-lg p-8 ${getStatusColor(section.status)}`}
              >
                {/* Section Header */}
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {section.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {section.status === "critical" && (
                      <span className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-xs font-semibold">
                        KRYTYCZNE
                      </span>
                    )}
                    {section.status === "warning" && (
                      <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-yellow-400 text-xs font-semibold">
                        OSTRZEŻENIE
                      </span>
                    )}
                  </div>
                </div>

                {/* Findings */}
                <div className="space-y-4">
                  {section.findings.map((finding, findingIdx) => (
                    <motion.div
                      key={findingIdx}
                      whileHover={{ x: 4 }}
                      className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(finding.status)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-2">
                            {finding.item}
                          </h4>
                          <p className="text-sm text-gray-400 mb-3">
                            <span className="text-gray-500">Wpływ: </span>
                            {finding.impact}
                          </p>
                          <div className="bg-lime-400/10 border border-lime-400/30 rounded p-3">
                            <p className="text-sm text-lime-300">
                              <span className="font-semibold">Rozwiązanie: </span>
                              {finding.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Stats */}
          <motion.div variants={itemVariants} className="mt-16 grid md:grid-cols-4 gap-6">
            {[
              { label: "Sekcji Audytu", value: "6", emoji: "📋" },
              { label: "Krytycznych Braków", value: "12", emoji: "🚨" },
              { label: "Ostrzeżeń", value: "2", emoji: "⚠️" },
              { label: "Dni do Pełnej Implementacji", value: "42", emoji: "📅" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 text-center"
              >
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className="text-2xl font-bold text-lime-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
