import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Calculator, 
  Check, 
  ArrowRight, 
  Zap, 
  Target, 
  Users, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/* PricingCalculator Component
   Design: "Precision Strike" - Military-Grade Minimalism
   - Interactive service selection
   - Dynamic price calculation
   - Visual feedback with animations
*/

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  icon: typeof Zap;
  features: string[];
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

const services: ServiceOption[] = [
  {
    id: "conversion",
    name: "Inżynieria Konwersji",
    description: "Landing pages i copy zorientowane na wynik",
    basePrice: 4500,
    icon: Target,
    features: [
      "Audyt psychologiczny grupy docelowej",
      "Strategia komunikacji",
      "Landing page z copy",
      "A/B testing setup",
      "Raport z rekomendacjami",
    ],
  },
  {
    id: "visual",
    name: "Visual Excellence AI",
    description: "Video i foto produktowe napędzane AI",
    basePrice: 3500,
    icon: Sparkles,
    features: [
      "Sesja produktowa AI",
      "5 wizualizacji produktowych",
      "1 video promocyjne (15s)",
      "Optymalizacja pod platformy",
      "Pliki źródłowe",
    ],
  },
  {
    id: "community",
    name: "Community Growth",
    description: "Strategie budowania lojalnej społeczności",
    basePrice: 5500,
    icon: Users,
    features: [
      "Audyt obecności online",
      "Strategia community",
      "Content plan (3 miesiące)",
      "Setup automatyzacji",
      "Szkolenie zespołu",
    ],
  },
];

const addOns: AddOn[] = [
  {
    id: "rush",
    name: "Ekspresowa realizacja",
    price: 1500,
    description: "Skrócenie czasu realizacji o 50%",
  },
  {
    id: "consulting",
    name: "Konsultacje strategiczne",
    price: 2000,
    description: "4h konsultacji z ekspertem/miesiąc",
  },
  {
    id: "analytics",
    name: "Zaawansowana analityka",
    price: 1200,
    description: "Dashboard z KPI i raportowanie",
  },
  {
    id: "support",
    name: "Wsparcie premium",
    price: 800,
    description: "Priorytetowe wsparcie 24/7",
  },
];

const projectScaleMultipliers = [
  { label: "Startup", value: 0.8, description: "Dla nowych firm" },
  { label: "Mały biznes", value: 1.0, description: "1-10 pracowników" },
  { label: "Średnia firma", value: 1.3, description: "11-50 pracowników" },
  { label: "Enterprise", value: 1.8, description: "50+ pracowników" },
];

const durationOptions = [
  { months: 1, discount: 0, label: "1 miesiąc" },
  { months: 3, discount: 0.1, label: "3 miesiące", badge: "-10%" },
  { months: 6, discount: 0.15, label: "6 miesięcy", badge: "-15%" },
  { months: 12, discount: 0.25, label: "12 miesięcy", badge: "-25%" },
];

export default function PricingCalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [selectedServices, setSelectedServices] = useState<string[]>(["conversion"]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [projectScale, setProjectScale] = useState(1);
  const [duration, setDuration] = useState(3);
  const [showDetails, setShowDetails] = useState(false);

  const scaleIndex = projectScaleMultipliers.findIndex(s => s.value === projectScale);
  const durationOption = durationOptions.find(d => d.months === duration) || durationOptions[1];

  const calculation = useMemo(() => {
    // Base services cost
    const servicesTotal = selectedServices.reduce((sum, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return sum + (service?.basePrice || 0);
    }, 0);

    // Add-ons cost
    const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return sum + (addOn?.price || 0);
    }, 0);

    // Apply scale multiplier
    const scaledServices = servicesTotal * projectScale;
    
    // Monthly total before discount
    const monthlyBeforeDiscount = scaledServices + addOnsTotal;
    
    // Apply duration discount
    const monthlyAfterDiscount = monthlyBeforeDiscount * (1 - durationOption.discount);
    
    // Total for entire period
    const totalForPeriod = monthlyAfterDiscount * duration;
    
    // Savings
    const savingsAmount = (monthlyBeforeDiscount * duration) - totalForPeriod;

    return {
      servicesTotal,
      addOnsTotal,
      scaledServices,
      monthlyBeforeDiscount,
      monthlyAfterDiscount,
      totalForPeriod,
      savingsAmount,
      discount: durationOption.discount,
    };
  }, [selectedServices, selectedAddOns, projectScale, duration, durationOption]);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Decorative grid */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.89 0.23 128 / 0.2) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.89 0.23 128 / 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Kalkulator Cenowy</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Oszacuj{" "}
            <span className="text-gradient-lime">inwestycję</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Transparentność to nasza wartość. Skonfiguruj pakiet usług i poznaj szacunkowy koszt 
            przed rozmową z naszym zespołem.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left column - Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Services selection */}
            <div className="rounded-2xl bg-card border border-border p-6">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">1</span>
                Wybierz usługi
              </h3>
              <div className="space-y-3">
                {services.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/30 bg-secondary/30"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                        }`}>
                          <service.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-heading font-semibold text-foreground">
                              {service.name}
                            </span>
                            <span className="font-heading font-bold text-primary">
                              {formatPrice(service.basePrice)}/mies.
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project scale */}
            <div className="rounded-2xl bg-card border border-border p-6">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">2</span>
                Skala projektu
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Większe firmy wymagają bardziej złożonych strategii i większego zakresu prac.</p>
                  </TooltipContent>
                </Tooltip>
              </h3>
              <div className="space-y-4">
                <Slider
                  value={[scaleIndex]}
                  onValueChange={(value) => setProjectScale(projectScaleMultipliers[value[0]].value)}
                  max={projectScaleMultipliers.length - 1}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between">
                  {projectScaleMultipliers.map((scale, index) => (
                    <button
                      key={scale.label}
                      onClick={() => setProjectScale(scale.value)}
                      className={`text-center transition-colors ${
                        scaleIndex === index ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <span className="block text-sm font-medium">{scale.label}</span>
                      <span className="block text-xs opacity-70">{scale.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="rounded-2xl bg-card border border-border p-6">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">3</span>
                Czas współpracy
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {durationOptions.map((option) => (
                  <button
                    key={option.months}
                    onClick={() => setDuration(option.months)}
                    className={`relative p-4 rounded-xl border transition-all duration-300 ${
                      duration === option.months
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/30 bg-secondary/30"
                    }`}
                  >
                    {option.badge && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {option.badge}
                      </span>
                    )}
                    <span className="block font-heading font-semibold text-foreground">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="rounded-2xl bg-card border border-border p-6">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">4</span>
                Dodatki (opcjonalne)
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {addOns.map((addOn) => {
                  const isSelected = selectedAddOns.includes(addOn.id);
                  return (
                    <div
                      key={addOn.id}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground text-sm">{addOn.name}</span>
                        <Switch
                          checked={isSelected}
                          onCheckedChange={() => toggleAddOn(addOn.id)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{addOn.description}</p>
                      <span className="text-sm font-semibold text-primary">
                        +{formatPrice(addOn.price)}/mies.
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right column - Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="sticky top-24 rounded-2xl bg-card border border-primary/30 overflow-hidden">
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-primary/20 to-accent/10 border-b border-border">
                <h3 className="font-heading font-bold text-xl text-foreground mb-1">
                  Podsumowanie
                </h3>
                <p className="text-sm text-muted-foreground">
                  Szacunkowa wycena projektu
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Selected services */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Wybrane usługi</span>
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="text-xs text-primary flex items-center gap-1"
                    >
                      {showDetails ? "Ukryj" : "Pokaż"} szczegóły
                      {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                  
                  {selectedServices.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic">Wybierz przynajmniej jedną usługę</p>
                  ) : (
                    <div className="space-y-2">
                      {selectedServices.map(serviceId => {
                        const service = services.find(s => s.id === serviceId);
                        if (!service) return null;
                        return (
                          <div key={serviceId}>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-foreground">{service.name}</span>
                              <span className="text-sm font-medium text-foreground">
                                {formatPrice(service.basePrice * projectScale)}
                              </span>
                            </div>
                            {showDetails && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 ml-4 space-y-1"
                              >
                                {service.features.map((feature, idx) => (
                                  <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                                    <Check className="w-3 h-3 text-primary" />
                                    {feature}
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Add-ons */}
                {selectedAddOns.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground block mb-3">Dodatki</span>
                    <div className="space-y-2">
                      {selectedAddOns.map(addOnId => {
                        const addOn = addOns.find(a => a.id === addOnId);
                        if (!addOn) return null;
                        return (
                          <div key={addOnId} className="flex items-center justify-between">
                            <span className="text-sm text-foreground">{addOn.name}</span>
                            <span className="text-sm font-medium text-foreground">
                              +{formatPrice(addOn.price)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Calculations */}
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Miesięcznie (przed rabatem)</span>
                    <span className="text-foreground">{formatPrice(calculation.monthlyBeforeDiscount)}</span>
                  </div>
                  
                  {calculation.discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary">Rabat za {duration} mies.</span>
                      <span className="text-primary">-{(calculation.discount * 100).toFixed(0)}%</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Miesięcznie (po rabacie)</span>
                    <span className="font-semibold text-foreground">{formatPrice(calculation.monthlyAfterDiscount)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-heading font-semibold text-foreground">
                      Razem za {duration} mies.
                    </span>
                    <span className="text-2xl font-heading font-bold text-gradient-lime">
                      {formatPrice(calculation.totalForPeriod)}
                    </span>
                  </div>
                  
                  {calculation.savingsAmount > 0 && (
                    <div className="flex items-center gap-2 text-sm text-primary">
                      <Zap className="w-4 h-4" />
                      <span>Oszczędzasz {formatPrice(calculation.savingsAmount)}</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <button
                  onClick={scrollToContact}
                  disabled={selectedServices.length === 0}
                  className="w-full group inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-heading font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02] glow-lime hover:glow-lime-strong disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span>Zamów wycenę</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-xs text-center text-muted-foreground">
                  * Ceny orientacyjne. Ostateczna wycena po konsultacji.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
