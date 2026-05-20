import { motion } from "framer-motion";
import { Play, Sparkles, Zap, Users } from "lucide-react";

export default function VideoAnimationSection() {
  const services = [
    {
      icon: Zap,
      title: "Strategia & Audyt",
      desc: "Uszczelniamy lejek sprzedaży. Naukowa optymalizacja (CRO), która zatrzymuje uciekający budżet.",
    },
    {
      icon: Users,
      title: "Płatne Kampanie (Ads)",
      desc: "Kupujemy zysk, nie puste kliknięcia. Precyzyjne dotarcie na Facebooku, Google i TikToku.",
    },
    {
      icon: Sparkles,
      title: "AI Agents & Automatyzacja",
      desc: "Autonomiczne systemy przejmują obsługę i sprzedaż 24/7. Skaluj biznes bez powiększania zespołu.",
    },
    {
      icon: Play,
      title: "Video AI & Motion",
      desc: "Generujemy wideo (Influencers, UGC, Motion), które sprzedaje za Ciebie szybciej i skuteczniej.",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 mb-8 leading-tight">
            Kompleksowe wsparcie Twojego wzrostu.
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Łączymy technologię z psychologią, aby dostarczać rozwiązania, które nie tylko dobrze wyglądają, ale przede wszystkim zarabiają.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-8 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-4 leading-tight">{service.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
