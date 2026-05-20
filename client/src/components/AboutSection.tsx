import { motion } from "framer-motion";
import { Brain, Sparkles, Shield, Users } from "lucide-react";

const values = [
  {
    icon: Brain,
    title: "Decision Science",
    description: "Wykorzystujemy psychologię poznawczą, aby Twoja oferta była naturalnym wyborem.",
  },
  {
    icon: Sparkles,
    title: "Elite Design",
    description: "Tworzymy interfejsy, które zachwycają estetyką i prowadzą do konwersji.",
  },
  {
    icon: Shield,
    title: "Budowanie Zaufania",
    description: "Projektujemy komunikację, która buduje autorytet Twojej marki od pierwszej sekundy.",
  },
  {
    icon: Users,
    title: "Ludzkie Podejście",
    description: "Wierzymy, że za każdą liczbą stoi człowiek. Projektujemy dla ludzi, nie dla algorytmów.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 block">
              O BoostNow
            </span>
            <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 mb-8 leading-tight">
              Jesteśmy Architektami Decyzji.
            </h2>
            <div className="space-y-6 text-xl text-slate-600 leading-relaxed mb-12">
              <p>
                W świecie przeładowanym informacjami, prostota jest najwyższą formą wyrafinowania. My nie tylko robimy marketing – my projektujemy doświadczenia, które usuwają tarcie poznawcze.
              </p>
              <p>
                Łączymy precyzję danych z głębokim zrozumieniem ludzkich zachowań, aby Twoja marka nie tylko była widoczna, ale przede wszystkim – wybierana.
              </p>
            </div>
            
            <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 italic text-slate-700 text-lg">
              "Naszą misją jest przywrócenie ludzkiego wymiaru technologii. Projektujemy tak, aby technologia służyła człowiekowi, a nie odwrotnie."
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
