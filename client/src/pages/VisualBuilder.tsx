import { BuilderComponent, builder } from '@builder.io/react';
import { useEffect, useState } from 'react';
import '../builder-settings'; // Import registration
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function VisualBuilder() {
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Fetch content from Builder.io
    builder.get('page', { url: window.location.pathname }).toPromise().then((content) => {
      if (!content) {
        setNotFound(true);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <BuilderComponent model="page" />
        {notFound && (
          <div className="container py-32 text-center">
            <h1 className="text-4xl font-serif text-slate-900 mb-6">Wizualny Kreator Aktywny</h1>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
              Zaloguj się do Builder.io, aby zacząć budować tę stronę wizualnie przy użyciu komponentów "Elite Beauty".
            </p>
            <div className="bg-slate-50 p-10 rounded-[32px] inline-block text-left border border-slate-100">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Dostępne Komponenty Elite:</h2>
              <ul className="space-y-3 text-slate-900 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  Beauty: Hero
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  Beauty: Service Card
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  Beauty: Testimonial
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  Beauty: Stats
                </li>
              </ul>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
