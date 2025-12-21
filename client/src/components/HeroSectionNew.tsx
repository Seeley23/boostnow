import { useState, useEffect } from 'react';

/**
 * DESIGN PHILOSOPHY: "Precision Strike - Marketing Agency"
 * Large bold typography with neon lime green gradient on dark navy background
 * Organic geometric shapes (circles, waves) in electric blue and hot pink
 * Asymmetric layout, dynamic composition, no tech elements
 */

export default function HeroSectionNew() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0b1020] overflow-hidden flex items-center justify-center pt-20 pb-20">
      {/* Animated geometric shapes background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large blue circle - top left */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 opacity-20 blur-3xl animate-pulse"></div>
        
        {/* Hot pink circle - bottom right */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-tl from-pink-600 to-pink-800 opacity-20 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Flowing wave shape - middle */}
        <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10 blur-3xl transform -translate-y-1/2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left side - Large bold text */}
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            {/* Main headline with gradient text */}
            <h1 
              className={`text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight font-playfair transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                backgroundImage: 'linear-gradient(135deg, #9EFF00 0%, #9EFF00 50%, #0066FF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Zboostuj z nami swoją markę!
            </h1>
            
            {/* Subheading */}
            <p className="text-xl lg:text-2xl text-white/80 font-lato leading-relaxed max-w-2xl">
              Przestań finansować swoją niewidzialność. Wdróż system przymusu uwagi!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button className="px-8 py-4 bg-[#9EFF00] text-[#0b1020] font-bold text-lg rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105 font-playfair">
              Zarezerwuj Konsultację
            </button>
            <button className="px-8 py-4 border-2 border-[#9EFF00] text-[#9EFF00] font-bold text-lg rounded-lg hover:bg-[#9EFF00] hover:text-[#0b1020] transition-all duration-300 font-playfair">
              Poznaj Nasz Proces
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex gap-8 pt-8 text-sm text-white/60 font-lato">
            <div>
              <div className="text-2xl font-bold text-[#9EFF00]">500+</div>
              <div>Zadowolonych Klientów</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#9EFF00]">300%</div>
              <div>Średni Wzrost Konwersji</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#9EFF00]">24/7</div>
              <div>Wsparcie Klientów</div>
            </div>
          </div>
        </div>

        {/* Right side - Geometric visualization */}
        <div className="flex-1 relative h-96 lg:h-full min-h-96 flex items-center justify-center">
          {/* Floating geometric elements */}
          <div className="relative w-full h-full">
            {/* Large lime green circle with gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-[#9EFF00] to-green-500 opacity-30 blur-2xl animate-bounce"></div>
            
            {/* Blue wave shape */}
            <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 opacity-20 blur-3xl animate-pulse"></div>
            
            {/* Pink accent circle */}
            <div className="absolute top-1/3 left-0 w-48 h-48 rounded-full bg-gradient-to-br from-pink-600 to-red-600 opacity-25 blur-2xl" style={{animation: 'float 6s ease-in-out infinite'}}></div>

            {/* Center text element */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold font-playfair mb-4" style={{
                  backgroundImage: 'linear-gradient(135deg, #9EFF00 0%, #0066FF 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  🚀
                </div>
                <p className="text-white/60 font-lato">Dynamika Wzrostu</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="text-white/40 text-center font-lato">
          <div className="text-sm mb-2">Przewiń w dół</div>
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}
