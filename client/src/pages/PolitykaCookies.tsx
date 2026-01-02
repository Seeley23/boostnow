export default function PolitykaCookies() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Polityka Cookies</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Czym są pliki cookies?</h2>
            <p>
              Pliki cookies to małe pliki tekstowe zapisywane na urządzeniu użytkownika podczas przeglądania stron internetowych. 
              Cookies umożliwiają stronie zapamiętanie informacji o wizycie użytkownika, takich jak preferowany język, 
              ustawienia wyświetlania czy dane logowania.
            </p>
            <p>
              Pliki cookies nie są szkodliwe dla urządzenia i nie zawierają wirusów.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Rodzaje cookies używanych na Stronie</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">2.1. Cookies niezbędne</h3>
            <p>
              Cookies niezbędne do prawidłowego funkcjonowania Strony. Bez tych cookies Strona nie będzie działać poprawnie.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies sesji:</strong> umożliwiają poruszanie się po Stronie i korzystanie z jej funkcji</li>
              <li><strong>Cookies bezpieczeństwa:</strong> zapewniają bezpieczne korzystanie ze Strony</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.2. Cookies funkcjonalne</h3>
            <p>
              Cookies funkcjonalne zapamiętują wybory użytkownika i personalizują Stronę.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies preferencji:</strong> zapamiętują ustawienia użytkownika (np. język, rozmiar czcionki)</li>
              <li><strong>Cookies formularzy:</strong> zapamiętują dane wprowadzone w formularzach</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.3. Cookies analityczne</h3>
            <p>
              Cookies analityczne zbierają informacje o sposobie korzystania ze Strony w celu jej ulepszenia.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Manus Analytics:</strong> analiza ruchu na Stronie, liczba odwiedzin, źródła ruchu</li>
              <li><strong>Google Analytics:</strong> analiza zachowań użytkowników, najpopularniejsze strony</li>
            </ul>
            <p className="text-sm text-gray-400">
              Dane zbierane przez cookies analityczne są anonimowe i nie identyfikują użytkownika.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.4. Cookies marketingowe</h3>
            <p>
              Cookies marketingowe służą do wyświetlania spersonalizowanych reklam i śledzenia skuteczności kampanii reklamowych.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies remarketingowe:</strong> wyświetlanie reklam na innych stronach</li>
              <li><strong>Cookies konwersji:</strong> śledzenie skuteczności kampanii reklamowych</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Cele używania cookies</h2>
            <p>
              Pliki cookies są używane w następujących celach:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Zapewnienie prawidłowego funkcjonowania Strony</strong></li>
              <li><strong>Personalizacja treści i reklam</strong></li>
              <li><strong>Analiza ruchu i zachowań użytkowników</strong></li>
              <li><strong>Poprawa jakości usług</strong></li>
              <li><strong>Śledzenie skuteczności kampanii marketingowych</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Zarządzanie cookies</h2>
            <p>
              Użytkownik może w każdej chwili zmienić ustawienia cookies w swojej przeglądarce. 
              Większość przeglądarek domyślnie akceptuje pliki cookies, ale można je wyłączyć lub usunąć.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">4.1. Jak wyłączyć cookies?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Chrome:</strong> Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie i inne dane witryn</li>
              <li><strong>Mozilla Firefox:</strong> Opcje → Prywatność i bezpieczeństwo → Ciasteczka i dane stron</li>
              <li><strong>Safari:</strong> Preferencje → Prywatność → Pliki cookie i dane witryn</li>
              <li><strong>Microsoft Edge:</strong> Ustawienia → Prywatność, wyszukiwanie i usługi → Pliki cookie i uprawnienia witryn</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.2. Konsekwencje wyłączenia cookies</h3>
            <p>
              Wyłączenie cookies może wpłynąć na funkcjonalność Strony. Niektóre funkcje mogą nie działać poprawnie 
              lub w ogóle nie być dostępne.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Cookies stron trzecich</h2>
            <p>
              Strona może zawierać treści pochodzące z zewnętrznych serwisów (np. YouTube, Google Maps), 
              które mogą ustawiać własne pliki cookies. Administrator nie ma kontroli nad tymi plikami cookies.
            </p>
            <p>
              Zalecamy zapoznanie się z politykami prywatności tych serwisów:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#c0ff00] hover:underline">Google Privacy Policy</a></li>
              <li><a href="https://www.youtube.com/howyoutubeworks/our-commitments/protecting-user-data/" target="_blank" rel="noopener noreferrer" className="text-[#c0ff00] hover:underline">YouTube Privacy</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Aktualizacje Polityki Cookies</h2>
            <p>
              Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Cookies. 
              Zmiany wchodzą w życie z chwilą ich opublikowania na Stronie.
            </p>
            <p>
              Zalecamy regularne sprawdzanie Polityki Cookies w celu bycia na bieżąco ze zmianami.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Kontakt</h2>
            <p>
              W przypadku pytań dotyczących Polityki Cookies prosimy o kontakt:
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
