import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { MapPin, Phone, Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function OlsztynPage() {
  return (
    <>
      <Helmet>
        <title>Agencja Neuromarketingowa w Olsztynie - CRO & SEO</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Agencja Neuromarketingowa w Olsztynie. Specjalizujemy się w CRO, SEO i Decision Science. Zwiększamy ROAS e-commerce o 150% w 90 dni." />
        <meta name="keywords" content="agencja neuromarketingowa olsztyn, agencja seo olsztyn, agencja marketingowa olsztyn, cro olsztyn, pozycjonowanie olsztyn" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://boostnow.pl/olsztyn" />
        <meta property="og:title" content="Agencja Neuromarketingowa w Olsztynie" />
        <meta property="og:description" content="Agencja Neuromarketingowa w Olsztynie - CRO, SEO i Decision Science. Zwiększamy ROAS e-commerce o 150% w 90 dni." />
        <link rel="canonical" href="https://boostnow.pl/olsztyn" />
      </Helmet>

      <div className="min-h-screen bg-background pt-20 lg:pt-24">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="py-12 md:py-16">
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/30">
              <MapPin className="w-4 h-4 text-lime-400" />
              <span className="text-sm font-semibold text-lime-400">OLSZTYN</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Agencja Neuromarketingowa w Olsztynie
            </h1>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Specjalizujemy się w optymalizacji konwersji, SEO i neuromarketingu dla e-commerce. Obsługujemy klientów z Olsztyna i całej Polski.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-lime-400 text-black rounded-lg font-semibold hover:bg-lime-300 transition-colors"
              >
                Umów konsultację
                <ArrowRight size={20} />
              </a>
              <Link
                href="/glossary"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-lime-400/50 text-lime-400 rounded-lg font-semibold hover:bg-lime-400/10 transition-colors"
              >
                Poznaj nasze usługi
              </Link>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8 text-gray-300 py-12">
            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Dlaczego BoostNow w Olsztynie?</h2>
              <p className="text-lg leading-relaxed mb-6">
                BoostNow to agencja neuromarketingowa, która łączy psychologię, data science i optymalizację konwersji. Pracujemy z markami z Olsztyna i całej Polski, pomagając im zwiększać sprzedaż o 150% w 90 dni.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle size={24} className="text-lime-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Neuromarketing</h3>
                      <p className="text-gray-400">Psychologia klienta + data science = wyższa konwersja</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle size={24} className="text-lime-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">CRO (Optymalizacja Konwersji)</h3>
                      <p className="text-gray-400">Każdy element strony zoptymalizowany dla sprzedaży</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle size={24} className="text-lime-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">SEO</h3>
                      <p className="text-gray-400">Pozycjonowanie w Google dla keywords, które sprzedają</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle size={24} className="text-lime-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Decision Science</h3>
                      <p className="text-gray-400">Architektura decyzji opartej na psychologii behawioralnej</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Nasze Usługi w Olsztynie</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-lime-400 pl-6 py-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Optymalizacja Konwersji (CRO)</h3>
                  <p className="text-gray-400">Analiza ścieżki zakupowej, A/B testy, optymalizacja UX. Zwiększenie konwersji o 30-150%.</p>
                </div>
                <div className="border-l-4 border-lime-400 pl-6 py-4">
                  <h3 className="text-xl font-semibold text-white mb-2">SEO i Pozycjonowanie</h3>
                  <p className="text-gray-400">Pozycjonowanie w Google dla keywords, które generują sprzedaż. TOP 10 w 90 dni.</p>
                </div>
                <div className="border-l-4 border-lime-400 pl-6 py-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Neuromarketing</h3>
                  <p className="text-gray-400">Psychologia klienta, behawioralne błędy poznawcze, architektura decyzji.</p>
                </div>
                <div className="border-l-4 border-lime-400 pl-6 py-4">
                  <h3 className="text-xl font-semibold text-white mb-2">Visual AI i Animacje</h3>
                  <p className="text-gray-400">Wideo, animacje, visual content - zwiększenie zaangażowania o 300-500%.</p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Dla Kogo Pracujemy?</h2>
              <p className="text-lg leading-relaxed mb-6">
                Pracujemy z e-commerce'ami, markami premium, SaaS'ami i usługami. Specjalizujemy się w:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-lime-400 flex-shrink-0 mt-1" />
                  <span>Sklepy internetowe (e-commerce)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-lime-400 flex-shrink-0 mt-1" />
                  <span>Marki premium i luxury</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-lime-400 flex-shrink-0 mt-1" />
                  <span>SaaS i usługi cyfrowe</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-lime-400 flex-shrink-0 mt-1" />
                  <span>Firmy z Olsztyna i całej Polski</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Kontakt w Olsztynie</h2>
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-lime-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Lokalizacja</h3>
                    <p className="text-gray-400">Obsługujemy klientów z Olsztyna i całej Polski online</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-lime-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Telefon</h3>
                    <p className="text-gray-400">Umów konsultację - link poniżej</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-lime-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                    <p className="text-gray-400">Skontaktuj się z nami - formularz poniżej</p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-lime-400/10 to-lime-400/5 border border-lime-400/30 rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Gotów na zmianę?</h2>
              <p className="text-gray-400 mb-6 text-lg">
                Zwiększ ROAS o 150% w 90 dni. Umów bezpłatną konsultację z naszym zespołem.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lime-400 text-black rounded-lg font-semibold hover:bg-lime-300 transition-colors"
              >
                Zarezerwuj konsultację
                <ArrowRight size={20} />
              </a>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
