export default function ProblemSection() {
  return (
    <section className="py-20 px-4 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
          Twój marketing jest zbyt skomplikowany, by sprzedawać.
        </h2>
        
        <p className="text-lg text-gray-300 mb-12 leading-relaxed">
          Większość firm płaci za treści, których nikt nie doczytuje do końca. Każde zbędne zdanie i każda sekunda nudy w wideo to moment, w którym klient rezygnuje.
        </p>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-lime-400 mb-8">Twoje straty wynikają z trzech błędów:</h3>
          
          <div className="space-y-6">
            <div className="border-l-4 border-lime-400 pl-6">
              <h4 className="text-xl font-bold mb-2">Przeładowanie</h4>
              <p className="text-gray-300">Zbyt dużo informacji sprawia, że odbiorca przestaje uważać.</p>
            </div>

            <div className="border-l-4 border-lime-400 pl-6">
              <h4 className="text-xl font-bold mb-2">Brak priorytetów</h4>
              <p className="text-gray-300">Klient nie wie, na co ma patrzeć, więc patrzy na konkurencję.</p>
            </div>

            <div className="border-l-4 border-lime-400 pl-6">
              <h4 className="text-xl font-bold mb-2">Wysiłek</h4>
              <p className="text-gray-300">Zrozumienie Twojej oferty zajmuje zbyt dużo czasu.</p>
            </div>
          </div>
        </div>

        <p className="text-2xl font-bold text-lime-400 mt-12">
          Efekt? Finansujesz ignorancję rynku.
        </p>
      </div>
    </section>
  );
}
