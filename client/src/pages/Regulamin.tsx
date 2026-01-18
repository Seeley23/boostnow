import { Helmet } from 'react-helmet-async';
import BreadcrumbSchema from '../components/BreadcrumbSchema';

export default function Regulamin() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Regulamin | BoostNow - Warunki korzystania</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Regulamin strony BoostNow - warunki korzystania z usług, zasady ochrony danych osobowych i prawa własności intelektualnej." />
        <meta name="keywords" content="regulamin, warunki korzystania, terms of service, BoostNow, usługi marketingowe, polityka prywatności" />
        <meta property="og:title" content="Regulamin - BoostNow" />
        <meta property="og:description" content="Regulamin strony BoostNow - warunki korzystania z usług, zasady ochrony danych osobowych i prawa własności intelektualnej." />
        <link rel="canonical" href="https://boostnow.pl/regulamin" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: 'Strona główna', url: 'https://boostnow.pl' },
        { name: 'Regulamin', url: 'https://boostnow.pl/regulamin' }
      ]} />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Regulamin Strony</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Postanowienia ogólne</h2>
            <p>
              Niniejszy Regulamin określa zasady korzystania ze strony internetowej boostnow.pl (dalej: "Strona"), 
              prowadzonej przez:
            </p>
            <p className="mt-4">
              <strong>BoostNow Mateusz Nowotka</strong><br />
              NIP: 7393776527<br />
              REGON: 527251665<br />
              Email: kontakt@boostnow.pl
            </p>
            <p>
              Korzystanie ze Strony oznacza akceptację niniejszego Regulaminu oraz Polityki Prywatności.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Definicje</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Strona</strong> - serwis internetowy dostępny pod adresem boostnow.pl</li>
              <li><strong>Usługodawca</strong> - BoostNow Mateusz Nowotka, NIP: 7393776527, REGON: 527251665</li>
              <li><strong>Użytkownik</strong> - osoba korzystająca ze Strony</li>
              <li><strong>Usługi</strong> - usługi oferowane przez Usługodawcę, w tym Inżynieria Konwersji, Video Animation, GEO Positioning, SEO Positioning, Social Media Management, Copywriting, Ghostwriting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Zasady korzystania ze Strony</h2>
            <p>Użytkownik zobowiązuje się do:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Korzystania ze Strony w sposób zgodny z prawem i dobrymi obyczajami</li>
              <li>Niepodejmowania działań mogących zakłócić funkcjonowanie Strony</li>
              <li>Niepublikowania treści niezgodnych z prawem lub naruszających prawa osób trzecich</li>
              <li>Podawania prawdziwych danych w formularzach kontaktowych</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Usługi oferowane przez Usługodawcę</h2>
            <p>
              Usługodawca oferuje usługi z zakresu marketingu cyfrowego, w tym:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Inżynieria Konwersji</strong> - optymalizacja stron internetowych w celu zwiększenia konwersji</li>
              <li><strong>Video Animation</strong> - tworzenie animacji wideo dla celów marketingowych</li>
              <li><strong>GEO Positioning</strong> - pozycjonowanie w wyszukiwarkach AI (ChatGPT, Perplexity, Gemini)</li>
              <li><strong>SEO Positioning</strong> - pozycjonowanie w wyszukiwarkach internetowych</li>
              <li><strong>Social Media Management</strong> - zarządzanie profilami w mediach społecznościowych, tworzenie strategii content marketingowej</li>
              <li><strong>Copywriting</strong> - tworzenie tekstów reklamowych, opisów produktów, treści na strony internetowe</li>
              <li><strong>Ghostwriting</strong> - pisanie artykułów, postów, treści w imieniu klienta</li>
            </ul>
            <p>
              Szczegółowe warunki świadczenia Usług określane są w indywidualnych umowach zawieranych z Klientami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Formularz kontaktowy</h2>
            <p>
              Strona umożliwia kontakt z Usługodawcą za pośrednictwem formularza kontaktowego. 
              Dane podane w formularzu są przetwarzane zgodnie z Polityką Prywatności.
            </p>
            <p>
              Usługodawca zobowiązuje się do odpowiedzi na zapytania w ciągu 24 godzin roboczych.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Prawa autorskie</h2>
            <p>
              Wszystkie treści zamieszczone na Stronie, w tym teksty, grafiki, logo, zdjęcia, animacje, 
              są chronione prawem autorskim i stanowią własność Usługodawcy lub zostały użyte za zgodą ich właścicieli.
            </p>
            <p>
              Kopiowanie, modyfikowanie lub rozpowszechnianie treści bez zgody Usługodawcy jest zabronione.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Odpowiedzialność</h2>
            <p>
              Usługodawca dokłada wszelkich starań, aby informacje zamieszczone na Stronie były aktualne i prawidłowe, 
              jednak nie ponosi odpowiedzialności za ewentualne błędy lub nieścisłości.
            </p>
            <p>
              Usługodawca nie ponosi odpowiedzialności za szkody wynikające z korzystania lub niemożności korzystania ze Strony.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Zmiany Regulaminu</h2>
            <p>
              Usługodawca zastrzega sobie prawo do wprowadzania zmian w Regulaminie. 
              Zmiany wchodzą w życie z chwilą ich opublikowania na Stronie.
            </p>
            <p>
              Użytkownicy zostaną poinformowani o zmianach poprzez komunikat na Stronie.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Postanowienia końcowe</h2>
            <p>
              W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego.
            </p>
            <p>
              Wszelkie spory rozstrzygane będą przez sąd właściwy dla siedziby Usługodawcy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Kontakt</h2>
            <p>
              W przypadku pytań dotyczących Regulaminu prosimy o kontakt:
            </p>
            <p className="mt-4">
              <strong>BoostNow Mateusz Nowotka</strong><br />
              NIP: 7393776527<br />
              REGON: 527251665<br />
              Email: kontakt@boostnow.pl
            </p>
          </section>

          <p className="text-sm text-gray-400 mt-8">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </p>
        </div>
      </div>
    </div>
  );
}
