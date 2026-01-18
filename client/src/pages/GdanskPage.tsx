import React from 'react';
import { Helmet } from 'react-helmet-async';

// Założenie: Poniższe komponenty są zdefiniowane w innym miejscu i importowane
// W rzeczywistym projekcie byłyby to komponenty takie jak Hero, Services, ContactForm, CTA
const HeroSection = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <section className="hero-section">
        <h1>{title}</h1>
        <p>{subtitle}</p>
    </section>
);

const ServicesSection = () => (
    <section className="services-section">
        <h2>Nasze Usługi Neuromarketingowe w Gdańsku</h2>
        <div className="service-list">
            <article>
                <h3>Badania Eye-Tracking</h3>
                <p>Analizujemy, jak wzrok Twoich klientów skanuje Twoją stronę internetową, reklamy i opakowania, aby zoptymalizować ich skuteczność.</p>
            </article>
            <article>
                <h3>Analiza Emocji i Biometria</h3>
                <p>Mierzymy reakcje emocjonalne na Twoje komunikaty marketingowe, wykorzystując zaawansowane narzędzia biometryczne.</p>
            </article>
            <article>
                <h3>Optymalizacja UX/UI</h3>
                <p>Projektujemy interfejsy, które intuicyjnie prowadzą użytkownika do konwersji, bazując na psychologii poznawczej.</p>
            </article>
        </div>
    </section>
);

const ContactSection = () => (
    <section className="contact-section">
        <h2>Skontaktuj się z Nami</h2>
        <p>Jesteś z Gdańska lub okolic? Porozmawiajmy o tym, jak nauka może zwiększyć efektywność Twojego marketingu.</p>
        {/* Tutaj byłby formularz kontaktowy */}
        <address>
            Email: kontakt@agencjaneuromarketingowa.pl<br />
            Telefon: +48 58 XXX XX XX
        </address>
    </section>
);

const CTASection = () => (
    <section className="cta-section">
        <h3>Gotowy na Marketing Oparty na Nauce?</h3>
        <p>Umów się na bezpłatną konsultację i dowiedz się, jak neuromarketing może odmienić Twój biznes w Gdańsku.</p>
        <button onClick={() => console.log('CTA clicked')}>Zacznij Teraz</button>
    </section>
);

const GdanskPage: React.FC = () => {
    const seo = {
        title: "Agencja Neuromarketingowa Gdańsk - Skuteczne Strategie Reklamowe",
        description: "Odkryj potencjał neuromarketingu w Gdańsku. Zwiększ konwersję i zaangażowanie dzięki naukowym metodom. Skontaktuj się z nami!",
        keywords: "agencja neuromarketingowa Gdańsk, neuromarketing, reklama Gdańsk, strategie reklamowe, marketing cyfrowy, Trójmiasto"
    };

    return (
        <>
            <Helmet>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
                <meta name="keywords" content={seo.keywords} />
                {/* Dodatkowe meta tagi, np. canonical */}
                <link rel="canonical" href="https://twoja-domena.pl/gdansk" />
            </Helmet>

            <main className="gdansk-page">
                {/* H1 jest w sekcji Hero */}
                <HeroSection
                    title="Agencja Neuromarketingowa w Gdańsku: Odkryj Prawdziwe Potrzeby Twoich Klientów"
                    subtitle="Wykorzystaj psychologię i neuronaukę, aby tworzyć kampanie, które naprawdę działają."
                />

                <ServicesSection />

                <CTASection />

                <ContactSection />

                {/* Można dodać więcej sekcji, np. O nas, Case Studies */}
            </main>
        </>
    );
};

export default GdanskPage;
