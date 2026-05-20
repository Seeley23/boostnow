import { motion } from "framer-motion";
import { ShoppingCart, Palette, TrendingUp, Users, CheckCircle2 } from "lucide-react";

const audiences = [
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Dla marek, które chcą zamienić ruch w lojalnych klientów.",
    solutions: [
      "Opisy produktowe, które sprzedają",
      "Optymalizacja ścieżki koszyka",
      "Psychologia pilności i dowodu społecznego",
    ],
  },
  {
    id: "brands",
    icon: Palette,
    title: "Marki Premium",
    description: "Dla produktów luksusowych, gdzie liczy się każdy detal.",
    solutions: [
      "Budowanie prestiżu i autorytetu",
      "Storytelling na poziomie emocjonalnym",
      "Ekskluzywny design interfejsu",
    ],
  },
  {
    id: "saas",
    icon: TrendingUp,
    title: "SaaS & Tech",
    description: "Dla innowacyjnych rozwiązań potrzebujących jasnej komunikacji.",
    solutions: [
      "Upraszczanie złożonych komunikatów",
      "Lead generation dla decydentów",
      "Skracanie cyklu sprzedaży",
    ],
  },
  {
    id: "services",
    icon: Users,
    title: "Usługi & Konsulting",
    description: "Dla ekspertów budujących markę osobistą i autorytet.",
    solutions: [
      "Pozycjonowanie jako lider opinii",
      "Automatyzacja pozyskiwania leadów",
      "Budowanie zaufania przez content",
    ],
  },
];

export default function TargetAudienceSection(_props?: { title?: string; description?: string }) {
  return (
    <section id="for-whom" className="py-24 lg:py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl lg:text-6xl font-serif text-slate-900 mb-8 leading-tight">
            Niezależnie od branży, mamy rozwiązanie.
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Nasze strategie opierają się na uniwersalnych zasadach psychologii decyzji, które adaptujemy do specyfiki Twojego biznesu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 mb-8 group-hover:bg-slate-900 group-hover:text-white transition-all">
                <audience.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-2xl font-serif text-slate-900 mb-4">{audience.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">
                {audience.description}
              </p>
              
              <div className="space-y-4">
                {audience.solutions.map((solution, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                    <span className="text-xs text-slate-500 leading-relaxed">
                      {solution}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
