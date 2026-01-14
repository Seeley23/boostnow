import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>O BoostNow | Architekci Decyzji & Decision Science</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Agencja marketingowa oparta na Decision Science, Neuromarketing i Psychologii Konwersji. Transformujemy marki przez architekturę decyzji." />
        <meta name="keywords" content="architekci decyzji, decision science, neuromarketing, psychologia konwersji, agencja marketingowa, BoostNow, Mateusz Nowotka" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boostnow.pl/about" />
        <meta property="og:title" content="O BoostNow - Architekci Decyzji" />
        <meta property="og:description" content="Agencja marketingowa oparta na Decision Science, Neuromarketing i Psychologii Konwersji. Transformujemy marki przez architekturę decyzji." />
        <meta property="og:image" content="https://boostnow.pl/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="O BoostNow - Architekci Decyzji" />
        <meta name="twitter:description" content="Agencja marketingowa oparta na Decision Science, Neuromarketing i Psychologii Konwersji." />
        <link rel="canonical" href="https://boostnow.pl/about" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: 'Strona główna', url: 'https://boostnow.pl' },
        { name: 'O nas', url: 'https://boostnow.pl/about' }
      ]} />
      <Navigation />
      <main>
        {/* About Section */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white">
                O BoostNow
              </h1>

              <div className="space-y-8 text-lg text-gray-300 leading-relaxed">
                <p>
                  <span className="text-lime-400 font-semibold">Jesteśmy Architektami Decyzji.</span> Reszta to tylko dekoracja.
                </p>

                <p>
                  BoostNow to agencja marketingowa zbudowana na fundamentach psychologii, neuroscience i Decision Science. Nie robimy kampanii. Robimy transformacje.
                </p>

                <p>
                  Każdy projekt zaczynamy od pytania: <span className="text-lime-400">"Jak sprawić, że klient podejmie decyzję?"</span> Nie "jak go zainteresować" czy "jak go przekonać". Decyzja. To jest nasz cel.
                </p>

                <p>
                  Nasze rozwiązania są oparte na:
                </p>

                <ul className="space-y-4 ml-6">
                  <li className="flex items-start gap-4">
                    <span className="text-lime-400 font-bold">•</span>
                    <span><span className="text-lime-400 font-semibold">Psychologia Konwersji na Żywo</span> - rozumiemy, jak mózg klienta podejmuje decyzje</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-lime-400 font-bold">•</span>
                    <span><span className="text-lime-400 font-semibold">Eliminacja Błędów Poznawczych</span> - usuwamy przeszkody w ścieżce decyzyjnej</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-lime-400 font-bold">•</span>
                    <span><span className="text-lime-400 font-semibold">System Przymusu Uwagi</span> - kierujemy uwagę tam, gdzie ma być</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-lime-400 font-bold">•</span>
                    <span><span className="text-lime-400 font-semibold">Architektura Decyzji</span> - budujemy systemy, które sprzedają</span>
                  </li>
                </ul>

                <p>
                  Pracujemy z firmami, które rozumieją, że marketing to nie sztuka - to nauka. E-commerce, marki premium, B2B, usługi, hospitality - branża nie ma znaczenia. Psychologia decyzji jest wszędzie.
                </p>

                <p>
                  Naszym celem nie jest zwiększenie widoczności Twojej marki. Naszym celem jest zwiększenie liczby ludzi, którzy podejmują decyzję na Twoją korzyść.
                </p>

                <p className="text-xl font-semibold text-lime-400 pt-8">
                  To jest BoostNow. To jest nasza misja.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
