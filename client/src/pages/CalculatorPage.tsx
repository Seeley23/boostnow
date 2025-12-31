import Navigation from "@/components/Navigation";
import LossCalculator from "@/components/LossCalculator";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <LossCalculator />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
}
