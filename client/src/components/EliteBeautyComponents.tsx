import React from 'react';

export const BeautyHero = ({ title, subtitle, ctaText }: any) => (
  <section className="relative py-20 bg-pink-50 overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-serif text-gray-900 mb-6 leading-tight">{title || 'Odkryj Swoje Naturalne Piękno'}</h1>
        <p className="text-xl text-gray-600 mb-8">{subtitle || 'Profesjonalne zabiegi kosmetyczne w sercu Twojego miasta.'}</p>
        <button className="bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-700 transition-colors">
          {ctaText || 'Zarezerwuj Wizytę'}
        </button>
      </div>
    </div>
    <div className="absolute top-0 right-0 w-1/2 h-full bg-pink-100 -skew-x-12 transform translate-x-20 hidden lg:block"></div>
  </section>
);

export const BeautyServiceCard = ({ name, description, price }: any) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
    <h3 className="text-2xl font-serif text-gray-900 mb-3">{name || 'Zabieg na Twarz'}</h3>
    <p className="text-gray-600 mb-4">{description || 'Głębokie oczyszczanie i nawilżanie skóry.'}</p>
    <div className="text-pink-600 font-bold text-xl">{price || 'od 150 zł'}</div>
  </div>
);

export const BeautyTestimonial = ({ quote, author }: any) => (
  <div className="bg-pink-50 p-10 rounded-3xl italic text-gray-700 text-center">
    <p className="text-2xl mb-6">"{quote || 'Najlepszy salon w jakim kiedykolwiek byłam. Pełen profesjonalizm!'}"</p>
    <cite className="not-italic font-bold text-gray-900">— {author || 'Anna Kowalska'}</cite>
  </div>
);
