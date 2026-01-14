import { Helmet } from 'react-helmet-async';
import BreadcrumbSchema from '../components/BreadcrumbSchema';

export default function PolitykaPrywatnosci() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Polityka Prywatności | BoostNow - RODO & Ochrona Danych</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Polityka Prywatności BoostNow - zasady przetwarzania danych osobowych zgodnie z RODO, cookies, analityka i prawa użytkowników." />
        <meta name="keywords" content="polityka prywatności, RODO, ochrona danych, privacy policy, BoostNow, dane osobowe, cookies" />
        <meta property="og:title" content="Polityka Prywatności - BoostNow" />
        <meta property="og:description" content="Polityka Prywatności BoostNow - zasady przetwarzania danych osobowych zgodnie z RODO, cookies, analityka i prawa użytkowników." />
        <link rel="canonical" content="https://boostnow.pl/polityka-prywatnosci" />
      </Helmet>
      <BreadcrumbSchema items={[
        { name: 'Strona główna', url: 'https://boostnow.pl' },
        { name: 'Polityka Prywatności', url: 'https://boostnow.pl/polityka-prywatnosci' }
      ]} />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Polityka Prywatności</h1>
        
        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Informacje ogólne</h2>
            <p>
              Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych użytkowników strony internetowej 
              boostnow.pl (dalej: "Strona"), prowadzonej przez BoostNow - Agencję Aktywacji Klientów (dalej: "Administrator").
            </p>
            <p>
              Administrator dokłada wszelkich starań, aby zapewnić bezpieczeństwo danych osobowych użytkowników 
              oraz przestrzega przepisów Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. 
              (RODO).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Administrator danych osobowych</h2>
            <p>
              Administratorem danych osobowych jest:
            </p>
            <p className="mt-4">
              <strong>BoostNow Mateusz Nowotka</strong><br />
              NIP: 7393776527<br />
              REGON: 527251665<br />
              Email: kontakt@boostnow.pl
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Rodzaje przetwarzanych danych</h2>
            <p>
              Administrator przetwarza następujące dane osobowe:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dane kontaktowe:</strong> imię i nazwisko, adres email, nazwa firmy</li>
              <li><strong>Dane techniczne:</strong> adres IP, typ przeglądarki, system operacyjny</li>
              <li><strong>Dane z formularzy:</strong> treść wiadomości wysłanych przez formularz kontaktowy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Cele i podstawy prawne przetwarzania danych</h2>
            <p>
              Dane osobowe są przetwarzane w następujących celach:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Obsługa zapytań:</strong> odpowiedź na zapytania wysłane przez formularz kontaktowy (art. 6 ust. 1 lit. f RODO - prawnie uzasadniony interes Administratora)</li>
              <li><strong>Świadczenie usług:</strong> realizacja umów o świadczenie usług marketingowych, w tym Inżynieria Konwersji, Video Animation, GEO Positioning, SEO Positioning, Social Media Management, Copywriting, Ghostwriting (art. 6 ust. 1 lit. b RODO - wykonanie umowy)</li>
              <li><strong>Marketing:</strong> wysyłka informacji o usługach i promocjach (art. 6 ust. 1 lit. a RODO - zgoda)</li>
              <li><strong>Analityka:</strong> analiza ruchu na Stronie w celu poprawy jej funkcjonalności (art. 6 ust. 1 lit. f RODO - prawnie uzasadniony interes Administratora)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Okres przechowywania danych</h2>
            <p>
              Dane osobowe są przechowywane przez okres niezbędny do realizacji celów, dla których zostały zebrane:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dane z formularzy kontaktowych:</strong> do czasu zakończenia obsługi zapytania lub do momentu wycofania zgody</li>
              <li><strong>Dane związane z umowami:</strong> przez okres trwania umowy oraz przez okres wymagany przepisami prawa (np. przepisy podatkowe - 5 lat)</li>
              <li><strong>Dane marketingowe:</strong> do momentu wycofania zgody</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Odbiorcy danych</h2>
            <p>
              Dane osobowe mogą być przekazywane następującym odbiorcom:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dostawcy usług IT:</strong> hosting, poczta elektroniczna, systemy CRM</li>
              <li><strong>Dostawcy usług analitycznych:</strong> Google Analytics, Manus Analytics</li>
              <li><strong>Dostawcy usług płatniczych:</strong> w przypadku zakupu usług</li>
            </ul>
            <p>
              Wszyscy odbiorcy danych są zobowiązani do zachowania poufności i przestrzegania przepisów o ochronie danych osobowych.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Prawa użytkowników</h2>
            <p>
              Użytkownicy mają prawo do:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dostępu do danych:</strong> uzyskania informacji o przetwarzanych danych osobowych</li>
              <li><strong>Sprostowania danych:</strong> poprawy nieprawidłowych lub niekompletnych danych</li>
              <li><strong>Usunięcia danych:</strong> żądania usunięcia danych osobowych ("prawo do bycia zapomnianym")</li>
              <li><strong>Ograniczenia przetwarzania:</strong> żądania ograniczenia przetwarzania danych</li>
              <li><strong>Przenoszenia danych:</strong> otrzymania danych w ustrukturyzowanym formacie</li>
              <li><strong>Sprzeciwu:</strong> wniesienia sprzeciwu wobec przetwarzania danych</li>
              <li><strong>Cofnięcia zgody:</strong> wycofania zgody na przetwarzanie danych w dowolnym momencie</li>
            </ul>
            <p>
              W celu realizacji powyższych praw prosimy o kontakt: kontakt@boostnow.pl
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Pliki cookies</h2>
            <p>
              Strona wykorzystuje pliki cookies w celu zapewnienia prawidłowego funkcjonowania oraz analizy ruchu. 
              Szczegółowe informacje znajdują się w Polityce Cookies.
            </p>
            <p>
              Użytkownik może w każdej chwili zmienić ustawienia cookies w swojej przeglądarce.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Bezpieczeństwo danych</h2>
            <p>
              Administrator stosuje odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych, w tym:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Szyfrowanie połączeń (SSL/TLS)</li>
              <li>Regularne kopie zapasowe</li>
              <li>Ograniczenie dostępu do danych osobowych</li>
              <li>Monitorowanie bezpieczeństwa systemów</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Zmiany Polityki Prywatności</h2>
            <p>
              Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności. 
              Zmiany wchodzą w życie z chwilą ich opublikowania na Stronie.
            </p>
            <p>
              Użytkownicy zostaną poinformowani o istotnych zmianach poprzez komunikat na Stronie.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Prawo do skargi</h2>
            <p>
              W przypadku naruszenia przepisów o ochronie danych osobowych, użytkownik ma prawo do wniesienia skargi 
              do organu nadzorczego:
            </p>
            <p>
              <strong>Prezes Urzędu Ochrony Danych Osobowych</strong><br />
              ul. Stawki 2, 00-193 Warszawa<br />
              www.uodo.gov.pl
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Kontakt</h2>
            <p>
              W przypadku pytań dotyczących Polityki Prywatności prosimy o kontakt:
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
