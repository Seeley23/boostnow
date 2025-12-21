/**
 * DESIGN PHILOSOPHY: "Precision Strike - Marketing Agency"
 * Testimonials section with real client stories - human-focused, warm, authentic
 * No tech elements, just genuine feedback and results
 */

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Magdalena Kowalski",
      company: "TechStore Poland",
      role: "Dyrektor Marketingu",
      text: "BoostNow zmienił nasz sposób myślenia o marketingu. Nie obiecywali nam złota, ale dostarczyli wyniki. Konwersja wzrosła z 1.2% do 4.8% w zaledwie 90 dni. To nie była magia - to była strategia.",
      image: "👩‍💼"
    },
    {
      name: "Piotr Nowak",
      company: "Luxury Fashion Brand",
      role: "Właściciel Marki",
      text: "Szukaliśmy agencji, która rozumie psychologię naszych klientów. BoostNow nie tylko to rozumiała - egzekwowała to. Nasze społeczności wzrosły z kilkuset do 50 tysięcy wyznawców marki.",
      image: "👨‍💼"
    },
    {
      name: "Anna Lewandowska",
      company: "CloudTech Solutions",
      role: "VP Sales",
      text: "Cykl sprzedaży SaaS to koszmar. BoostNow skrócił nasz z 120 dni do 45 dni. Nie wiem jak to zrobili, ale wiem, że teraz zarabiamy więcej. To się liczy.",
      image: "👩‍💼"
    }
  ];

  return (
    <section className="relative py-20 bg-[#0b1020] overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#9EFF00]/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-[#9EFF00] font-semibold uppercase tracking-wider font-lato text-sm">Głosy Naszych Klientów</p>
          <h2 className="text-5xl lg:text-6xl font-bold font-playfair text-white">
            Rezultaty Mówią Same za Siebie
          </h2>
          <p className="text-xl text-white/70 font-lato max-w-2xl mx-auto">
            Nie obiecujemy. Dostarczamy. Oto co mówią ci, którzy nas zatrudnili.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:border-[#9EFF00]/50 transition-all duration-300 h-full flex flex-col hover:bg-white/10">
                {/* Quote mark */}
                <div className="text-4xl text-[#9EFF00]/30 mb-4 font-playfair">"</div>

                {/* Testimonial text */}
                <p className="text-white/80 font-lato leading-relaxed mb-8 flex-grow">
                  {testimonial.text}
                </p>

                {/* Divider */}
                <div className="border-t border-white/10 pt-6 mb-6"></div>

                {/* Author info */}
                <div className="flex items-center gap-4">
                  <div className="text-3xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="font-bold text-white font-playfair">
                      {testimonial.name}
                    </p>
                    <p className="text-[#9EFF00] text-sm font-lato">
                      {testimonial.role}
                    </p>
                    <p className="text-white/50 text-xs font-lato">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/70 font-lato mb-6">
            Chcesz być następnym success story?
          </p>
          <button className="px-8 py-4 bg-[#9EFF00] text-[#0b1020] font-bold rounded-lg hover:bg-white transition-all duration-300 transform hover:scale-105 font-playfair">
            Zarezerwuj Bezpłatną Konsultację
          </button>
        </div>
      </div>
    </section>
  );
}
