import React from 'react';
import { ArrowRight, CheckCircle2, Star } from 'lucide-react';

/**
 * Elite Beauty Components
 * Following Human-Centric, Low-Cognitive Design Principles.
 * Standards: /maestro-impeccable, /ui-ux-pro-max, /skillshare-ui-website-style
 */

export const BeautyHero = ({ title, subtitle, ctaLabel, ctaLink }: any) => (
  <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl lg:text-7xl font-serif text-slate-900 mb-8 leading-[1.1] tracking-tight">
          {title || 'Odkryj Swoje Naturalne Piękno'}
        </h1>
        <p className="text-xl lg:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
          {subtitle || 'Profesjonalne zabiegi kosmetyczne w sercu Twojego miasta. Poczuj różnicę już po pierwszej wizycie.'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={ctaLink || '#'} 
            className="group bg-slate-900 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-slate-800 transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            {ctaLabel || 'Zarezerwuj Wizytę'}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <span className="text-slate-500 text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Darmowa konsultacja
          </span>
        </div>
      </div>
    </div>
    {/* Subtle background element - Human-Centric, not techy */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] pointer-events-none">
      <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <path d="M500,100 C600,200 800,300 900,500 C1000,700 800,900 500,900 C200,900 0,700 100,500 C200,300 400,200 500,100" fill="currentColor" />
      </svg>
    </div>
  </section>
);

export const BeautyServiceCard = ({ name, description, price, stats }: any) => (
  <div className="group bg-white p-10 rounded-[32px] border border-slate-100 hover:border-slate-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer">
    <div className="mb-6 flex justify-between items-start">
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
        <Star className="w-7 h-7" />
      </div>
      {price && <span className="text-slate-900 font-serif text-xl">{price}</span>}
    </div>
    <h3 className="text-2xl font-serif text-slate-900 mb-4 leading-tight">{name || 'Zabieg na Twarz'}</h3>
    <p className="text-slate-600 mb-8 leading-relaxed">{description || 'Głębokie oczyszczanie i nawilżanie skóry.'}</p>
    {stats && (
      <div className="pt-6 border-t border-slate-50 flex items-center gap-4 text-sm font-medium text-slate-500">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          {stats}
        </span>
      </div>
    )}
  </div>
);

export const BeautyTestimonial = ({ quote, author, role }: any) => (
  <div className="bg-slate-50 p-12 rounded-[40px] text-center max-w-3xl mx-auto">
    <div className="flex justify-center gap-1 mb-8">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
      ))}
    </div>
    <p className="text-2xl lg:text-3xl font-serif text-slate-900 mb-10 leading-snug italic">
      "{quote || 'Najlepszy salon w jakim kiedykolwiek byłam. Pełen profesjonalizm i niesamowita atmosfera.'}"
    </p>
    <div>
      <cite className="not-italic font-bold text-slate-900 text-lg block mb-1">— {author || 'Anna Kowalska'}</cite>
      <span className="text-slate-500 text-sm uppercase tracking-widest">{role || 'Stała Klientka'}</span>
    </div>
  </div>
);

export const BeautyStats = ({ items }: any) => (
  <section className="py-20 bg-slate-900 text-white">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        {(items || [
          { label: 'Zadowolonych Klientek', value: '2500+' },
          { label: 'Lat Doświadczenia', value: '12' },
          { label: 'Wykonanych Zabiegów', value: '15k+' },
          { label: 'Nagród Branżowych', value: '8' }
        ]).map((item: any, idx: number) => (
          <div key={idx} className="space-y-2">
            <div className="text-4xl lg:text-5xl font-serif">{item.value}</div>
            <div className="text-slate-400 text-sm uppercase tracking-widest">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
