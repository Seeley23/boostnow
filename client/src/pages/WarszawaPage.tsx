import React from 'react';
import { Helmet } from 'react-helmet-async';

// --- Mock Components for Structure (assuming a standard project setup) ---

const Header = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-4">
      <nav className="flex justify-between items-center">
        <span className="text-2xl font-bold text-blue-600">NeuroAgency</span>
        <a href="#kontakt" className="text-blue-600 hover:text-blue-800">Kontakt</a>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; {new Date().getFullYear()} NeuroAgency. Wszelkie prawa zastrzeżone.</p>
      <p>Warszawa - Centrum Neuromarketingu</p>
    </div>
  </footer>
);

// --- Content Sections ---

const ServicesSection: React.FC = () => (
  <section id="uslugi" className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Nasze Usługi Neuromarketingowe w Warszawie</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ServiceCard title="Badania Eye-Tracking" description="Precyzyjna analiza wzroku konsumentów na materiałach reklamowych i stronach WWW." />
        <ServiceCard title="Analiza Emocji" description="Rozpoznawanie i mierzenie reakcji emocjonalnych na bodźce marketingowe za pomocą Facial Coding." />
        <ServiceCard title="Testy A/B Neuro" description="Optymalizacja konwersji oparta na głębokim zrozumieniu procesów decyzyjnych mózgu." />
        <ServiceCard title="Strategie Cenowe" description="Projektowanie modeli cenowych wykorzystujących zasady neuroekonomii dla maksymalizacji zysku." />
      </div>
    </div>
  </section>
);

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-blue-600">
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ContactSection: React.FC = () => (
  <section id="kontakt" className="py-16 bg-white">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Skontaktuj się z Naszym Biurem w Warszawie</h2>
      <p className="text-xl text-gray-600 mb-8">
        Zapraszamy do naszej siedziby w centrum Warszawy na spotkanie.
      </p>
      <div className="space-y-4">
        <p className="text-2xl font-semibold text-blue-600">Telefon: +48 22 XXX XX XX</p>
        <p className="text-2xl font-semibold text-blue-600">Email: warszawa@agencja.pl</p>
        <p className="text-lg text-gray-500">Adres: Aleje Jerozolimskie 123, 00-800 Warszawa</p>
      </div>
    </div>
  </section>
);

const CTASection: React.FC = () => (
  <section id="cta" className="py-20 bg-blue-600 text-white text-center">
    <div className="container mx-auto px-4">
      <h2 className="text-5xl font-extrabold mb-4">Gotowy na Skok w Efektywności?</h2>
      <p className="text-2xl mb-10">Umów się na bezpłatną konsultację neuromarketingową w Warszawie i zobacz, jak nauka może napędzać Twój biznes.</p>
      <a href="#kontakt" className="bg-white text-blue-600 font-bold text-xl py-4 px-10 rounded-full shadow-2xl hover:bg-gray-100 transition duration-300 transform hover:scale-105 inline-block">
        Zacznij Teraz
      </a>
    </div>
  </section>
);

// --- Main Component ---

const WarszawaPage: React.FC = () => {
  // SEO Data
  const title = "Agencja Neuromarketingowa Warszawa - Skuteczne Strategie | NeuroAgency";
  const description = "Wiodąca agencja neuromarketingowa w Warszawie. Zwiększ efektywność swoich kampanii dzięki nauce o mózgu. Oferujemy badania eye-tracking, analizę emocji i strategie cenowe.";
  const keywords = "agencja neuromarketingowa Warszawa, neuromarketing, badania konsumenckie, strategia marketingowa, Warszawa, eye-tracking, facial coding";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://boostnow.pl/warszawa" />
      </Helmet>

      <Header />

      <main>
        <section className="hero bg-gray-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
              Agencja Neuromarketingowa <span className="text-blue-600">Warszawa</span>
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Odkryj, co naprawdę myśli Twój klient. Naukowo potwierdzona przewaga rynkowa.
            </p>
            <a href="#uslugi" className="bg-blue-600 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
              Poznaj Nasze Usługi
            </a>
          </div>
        </section>

        <ServicesSection />
        <CTASection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default WarszawaPage;
