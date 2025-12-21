/**
 * DESIGN PHILOSOPHY: "Precision Strike - Marketing Agency"
 * Case studies section with transformation stories and video showcase
 * Before/After visual transformation, human-focused, dynamic composition
 */

export default function CaseStudiesSection() {
  const caseStudies = [
    {
      title: "E-commerce Transformation",
      client: "TechStore Poland",
      challenge: "Niska widoczność produktów, konwersja 1.2%",
      result: "Wzrost konwersji do 4.8% w 90 dni",
      metrics: "300% wzrost sprzedaży",
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "Brand Activation",
      client: "Luxury Fashion Brand",
      challenge: "Brak zaangażowania społeczności",
      result: "Społeczność 50k+ wyznawców marki",
      metrics: "500% wzrost zaangażowania",
      color: "from-pink-600 to-red-600"
    },
    {
      title: "SaaS Growth",
      client: "CloudTech Solutions",
      challenge: "Długi cykl sprzedaży, niskie lead quality",
      result: "Skrócenie cyklu do 45 dni",
      metrics: "250% wzrost qualified leads",
      color: "from-green-600 to-emerald-600"
    }
  ];

  return (
    <section className="relative py-20 bg-[#0b1020] overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-gradient-to-r from-[#9EFF00]/10 to-blue-600/10 blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-to-l from-pink-600/10 to-purple-600/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl lg:text-6xl font-bold font-playfair text-white">
            Transformacje, Które Zmieniły Biznes
          </h2>
          <p className="text-xl text-white/70 font-lato max-w-2xl mx-auto">
            Mierzalne dowody naszej metodologii. Każdy projekt to systematyczna eliminacja błędów poznawczych klientów.
          </p>
        </div>

        {/* Case studies grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card with gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${study.color} rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg`}></div>
              
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:border-[#9EFF00]/50 transition-all duration-300 h-full flex flex-col">
                {/* Client name */}
                <p className="text-[#9EFF00] font-semibold text-sm uppercase tracking-wider font-lato mb-2">
                  {study.client}
                </p>

                {/* Title */}
                <h3 className="text-2xl font-bold font-playfair text-white mb-4">
                  {study.title}
                </h3>

                {/* Challenge */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <p className="text-xs text-white/50 uppercase tracking-wider font-lato mb-2">Wyzwanie</p>
                  <p className="text-white/80 font-lato">
                    {study.challenge}
                  </p>
                </div>

                {/* Result */}
                <div className="mb-6 pb-6 border-b border-white/10">
                  <p className="text-xs text-white/50 uppercase tracking-wider font-lato mb-2">Rezultat</p>
                  <p className="text-white/80 font-lato">
                    {study.result}
                  </p>
                </div>

                {/* Metrics - highlighted */}
                <div className="mt-auto">
                  <div className="bg-gradient-to-r from-[#9EFF00]/20 to-blue-500/20 rounded-lg p-4 border border-[#9EFF00]/30">
                    <p className="text-xs text-white/50 uppercase tracking-wider font-lato mb-2">Wzrost</p>
                    <p className="text-2xl font-bold text-[#9EFF00] font-playfair">
                      {study.metrics}
                    </p>
                  </div>
                </div>

                {/* Hover CTA */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full px-4 py-2 bg-[#9EFF00]/20 text-[#9EFF00] border border-[#9EFF00]/50 rounded-lg hover:bg-[#9EFF00]/30 transition-all duration-300 font-lato text-sm font-semibold">
                    Przeczytaj Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video showcase section */}
        <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-12 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="space-y-6">
              <h3 className="text-4xl font-bold font-playfair text-white">
                Amunicja Wizualna w Akcji
              </h3>
              <p className="text-white/70 font-lato leading-relaxed">
                Nasze video showcase demonstruje, jak treści wideo projektowane do przejęcia kontroli nad okiem w 0.4 sekundy transformują percepcję marki i egzekwują akcję.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9EFF00] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#0b1020] font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-white font-playfair">Wzrost zaangażowania</p>
                    <p className="text-white/60 font-lato text-sm">Średnio 450% więcej interakcji</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9EFF00] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#0b1020] font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-white font-playfair">Konwersja natychmiastowa</p>
                    <p className="text-white/60 font-lato text-sm">Średnio 3.2x wyższa konwersja</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#9EFF00] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-[#0b1020] font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-white font-playfair">Kontrola narracji</p>
                    <p className="text-white/60 font-lato text-sm">Twoja marka staje się głosem</p>
                  </div>
                </div>
              </div>
              <button className="px-8 py-4 bg-[#9EFF00] text-[#0b1020] font-bold rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105 font-playfair mt-6">
                Obejrzyj Showcase
              </button>
            </div>

            {/* Right - Video placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-blue-600/20 to-pink-600/20 rounded-lg border border-white/20 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#9EFF00]/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="text-6xl mb-4">▶️</div>
                <p className="text-white/70 font-lato">Showcase Video</p>
                <p className="text-white/50 text-sm font-lato mt-2">Kliknij aby obejrzeć</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
