import { motion } from "framer-motion";
import { Search, Lightbulb, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Audyt Psychologiczny",
    description: "Mapujemy lęki i motywacje Twojej grupy. Znajdujemy dźwignie, o których nie wiedzą.",
    duration: "Tydzień 1-2",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Architektura Strategii",
    description: "Budujemy system komunikacji. Każde słowo to zaplanowany wyzwalacz reakcji.",
    duration: "Tydzień 2-3",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Wdrożenie i Akceleracja",
    description: "Uruchamiamy materiały, które kończą erę bierności. Monitorujemy konwersję w czasie rzeczywistym.",
    duration: "Tydzień 3-4",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Skalowanie AI",
    description: "Wykorzystujemy dane do ciągłej optymizacji. AI eliminuje to, co nie generuje zysku.",
    duration: "Ongoing",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 mb-8 leading-tight">
            Protokół Twojego wzrostu.
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Żadnych domysłów. Tylko systematyczna eliminacja błędów poznawczych Twoich klientów i budowanie trwałej przewagi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-white p-10 rounded-[40px] border border-slate-100 h-full flex flex-col shadow-sm hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-serif text-slate-100 group-hover:text-slate-200 transition-colors">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="text-xl font-serif text-slate-900 mb-4">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                  {step.description}
                </p>
                
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {step.duration}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
