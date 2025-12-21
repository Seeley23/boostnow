/**
 * DESIGN PHILOSOPHY: "Precision Strike - Marketing Agency"
 * Team section showcasing the people behind BoostNow
 * Human-focused, warm lighting, professional but friendly atmosphere
 */

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Magdalena Kowalski",
      role: "Dyrektor Strategii",
      expertise: "Decision Science & Psychology",
      image: "👩‍💼"
    },
    {
      name: "Jakub Nowak",
      role: "Szef Kreatywności",
      expertise: "Amunicja Wizualna & Video",
      image: "👨‍💼"
    },
    {
      name: "Anna Lewandowska",
      role: "Specjalistka SEO",
      expertise: "Kolonizacja Rynku & Content",
      image: "👩‍💼"
    },
    {
      name: "Piotr Szymański",
      role: "Analityk Danych",
      expertise: "AI & Skalowanie Wyników",
      image: "👨‍💼"
    }
  ];

  return (
    <section className="relative py-20 bg-[#0b1020] overflow-hidden">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-pink-600 to-pink-800 opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl lg:text-6xl font-bold font-playfair text-white">
            Poznaj Nasz Zespół
          </h2>
          <p className="text-xl text-white/70 font-lato max-w-2xl mx-auto">
            Architekci decyzji, którzy stoją za każdą strategią. Doświadczenie, pasja i obsesja na punkcie wyników.
          </p>
        </div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card background with gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#9EFF00]/20 to-blue-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Card content */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:border-[#9EFF00]/50 transition-all duration-300 transform hover:scale-105">
                {/* Avatar */}
                <div className="text-6xl mb-6 text-center">
                  {member.image}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold font-playfair text-white mb-2 text-center">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-[#9EFF00] font-semibold text-center mb-3 font-lato">
                  {member.role}
                </p>

                {/* Expertise */}
                <p className="text-sm text-white/60 text-center font-lato">
                  {member.expertise}
                </p>

                {/* Hover effect - divider */}
                <div className="mt-6 pt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs text-white/40 text-center font-lato">
                    Dostępny do konsultacji
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/70 font-lato mb-6">
            Chcesz poznać nas bliżej?
          </p>
          <button className="px-8 py-4 bg-[#9EFF00] text-[#0b1020] font-bold rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105 font-playfair">
            Zarezerwuj Rozmowę z Zespołem
          </button>
        </div>
      </div>
    </section>
  );
}
