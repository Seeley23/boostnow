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
    <div className="min-h-screen bg-background pt-20 lg:pt-24">
      <Navigation />
      <main>
        <BuilderComponent model="page" />
        {notFound && (
          <div className="container py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Wizualny Kreator Aktywny</h1>
            <p className="text-muted-foreground mb-8">
              Zaloguj się do Builder.io, aby zacząć budować tę stronę wizualnie.
            </p>
            <div className="bg-secondary p-6 rounded-lg inline-block text-left">
              <h2 className="font-semibold mb-2">Twoje Klocki:</h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Hero Section</li>
                <li>Problem Section</li>
                <li>Solution Section</li>
                <li>Industries Section</li>
                <li>FAQ Section</li>
              </ul>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
