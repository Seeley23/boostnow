import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import LossCalculator from "@/components/LossCalculator";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Kalkulator Strat Marketingowych | Oblicz straty - BoostNow</title>
        <meta name="description" content="Oblicz ile pieniędzy tracisz przez błędy marketingowe. Darmowy kalkulator strat: konwersje, churn, czas zespołu. Wyniki w 2 minuty!" />
        <meta name="keywords" content="kalkulator strat, kalkulator marketingowy, straty marketingowe, ROI, konwersje, błędy marketingowe, audyt marketingowy" />
        <meta property="og:title" content="Kalkulator Strat Marketingowych | BoostNow" />
        <meta property="og:description" content="Oblicz ile pieniędzy tracisz przez błędy marketingowe. Darmowy kalkulator strat: konwersje, churn, czas zespołu. Wyniki w 2 minuty!" />
        <meta property="og:url" content="https://boostnow.pl/calculator" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kalkulator Strat Marketingowych | BoostNow" />
        <meta name="twitter:description" content="Oblicz ile pieniędzy tracisz przez błędy marketingowe. Darmowy kalkulator strat: konwersje, churn, czas zespołu. Wyniki w 2 minuty!" />
        <link rel="canonical" href="https://boostnow.pl/calculator" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: 'Strona główna', url: 'https://boostnow.pl' },
        { name: 'Oblicz straty', url: 'https://boostnow.pl/calculator' }
      ]} />
      <Navigation />
      <main>
        <LossCalculator />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
