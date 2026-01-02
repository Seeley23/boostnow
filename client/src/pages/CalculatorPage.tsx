import Navigation from "@/components/Navigation";
import LossCalculator from "@/components/LossCalculator";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
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
