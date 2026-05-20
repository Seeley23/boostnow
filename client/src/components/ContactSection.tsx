import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, ArrowRight, CheckCircle, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Wiadomość wysłana!");
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="bg-slate-900 rounded-[48px] overflow-hidden relative">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M250,50 C300,100 400,150 450,250 C500,350 400,450 250,450 C100,450 0,350 50,250 C100,150 200,100 250,50" fill="white" />
            </svg>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 p-12 lg:p-20 relative z-10">
            <div>
              <h2 className="text-4xl lg:text-6xl font-serif text-white mb-8 leading-tight">
                Gotowy na wzrost, który widać w liczbach?
              </h2>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                Porozmawiajmy o Twoim projekcie. Analizujemy Twoje wyzwania i proponujemy konkretne rozwiązania oparte na psychologii decyzji.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-lg font-medium">Odpowiedź w ciągu 24h</span>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-lg font-medium">Bezpłatna analiza wstępna</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 lg:p-12 rounded-[32px]">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif text-slate-900 mb-2">Dziękujemy!</h3>
                  <p className="text-slate-600">Twoja wiadomość została wysłana. Skontaktujemy się wkrótce.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Imię i Nazwisko</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all"
                      placeholder="jan@firma.pl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Wiadomość</label>
                    <textarea 
                      required
                      rows={4}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 transition-all resize-none"
                      placeholder="Opisz swoje wyzwanie..."
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
