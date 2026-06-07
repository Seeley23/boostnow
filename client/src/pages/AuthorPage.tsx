import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

const AUTHOR = {
  name: "Mateusz Nowotka",
  title: "Założyciel i Ekspert GEO/SEO",
  company: "BoostNow",
  url: "https://boostnow.pl/mateusz-nowotka",
  linkedin: "https://www.linkedin.com/in/mateusz-nowotka-34aa1018a/",
  email: "kontakt@boostnow.pl",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR.name,
  jobTitle: AUTHOR.title,
  url: AUTHOR.url,
  email: AUTHOR.email,
  sameAs: [AUTHOR.linkedin, "https://www.linkedin.com/company/boostnowmarketing"],
  worksFor: {
    "@type": "Organization",
    name: AUTHOR.company,
    url: "https://boostnow.pl",
  },
  knowsAbout: [
    "SEO",
    "Generative Engine Optimization (GEO)",
    "Answer Engine Optimization (AEO)",
    "AI Optimization",
    "Content Marketing",
    "Conversion Rate Optimization",
    "E-commerce Marketing",
  ],
};

export default function AuthorPage() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mateusz Nowotka – Ekspert GEO & SEO | BoostNow</title>
        <meta
          name="description"
          content="Mateusz Nowotka – założyciel BoostNow, ekspert w dziedzinie Generative Engine Optimization (GEO), SEO i AI Marketing. Ponad 5 lat doświadczenia w pozycjonowaniu firm w Polsce."
        />
        <link rel="canonical" href="https://boostnow.pl/mateusz-nowotka" />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>
      <BreadcrumbSchema
        items={[
          { name: "Strona główna", url: "https://boostnow.pl" },
          { name: "Mateusz Nowotka", url: "https://boostnow.pl/mateusz-nowotka" },
        ]}
      />
      <Navigation />
      <main className="container py-16 lg:py-24 max-w-3xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Strona główna
          </Link>
        </div>

        <article>
          <header className="mb-10">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                MN
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">{AUTHOR.name}</h1>
                <p className="text-primary font-medium mt-1">{AUTHOR.title} · {AUTHOR.company}</p>
              </div>
            </div>

            <a
              href={AUTHOR.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn →
            </a>
          </header>

          <section className="prose prose-invert max-w-none space-y-6">
            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-3">O mnie</h2>
              <p className="text-muted-foreground leading-relaxed">
                Jestem założycielem agencji <strong className="text-foreground">BoostNow</strong> i specjalizuję się
                w pozycjonowaniu firm w Google oraz w wyszukiwarkach AI — ChatGPT, Perplexity i Gemini.
                Pomagam markom być widocznymi nie tylko w klasycznych wynikach wyszukiwania, ale też w odpowiedziach
                generowanych przez modele językowe (GEO – Generative Engine Optimization).
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-3">Specjalizacja</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong className="text-foreground">GEO</strong> – Generative Engine Optimization: optymalizacja pod ChatGPT, Perplexity, Gemini</li>
                <li>• <strong className="text-foreground">AEO</strong> – Answer Engine Optimization: pozycjonowanie w odpowiedziach AI</li>
                <li>• <strong className="text-foreground">SEO</strong> – klasyczne pozycjonowanie w Google z naciskiem na dane strukturalne</li>
                <li>• <strong className="text-foreground">AIO</strong> – AI Optimization dla sklepów e-commerce</li>
                <li>• <strong className="text-foreground">CRO</strong> – optymalizacja konwersji oparta na psychologii decyzji</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-3">Firma</h2>
              <p className="text-muted-foreground leading-relaxed">
                BoostNow Agencja Marketingowa, NIP: 7393776527, ul. Marii Konopnickiej 11, 11-040 Dobre Miasto.
                Obsługujemy firmy z Olsztyna, Warmii i Mazur oraz klientów z całej Polski.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-heading font-semibold text-foreground mb-3">Artykuły i wiedza</h2>
              <p className="text-muted-foreground mb-4">
                Piszę o strategiach widoczności w erze AI, optymalizacji konwersji i przyszłości SEO:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/blog/pozycjonowanie-geo" className="text-primary hover:underline">
                    Pozycjonowanie GEO – kompletny przewodnik
                  </Link>
                </li>
                <li>
                  <Link href="/blog/widocznosc-w-chatgpt" className="text-primary hover:underline">
                    Jak zwiększyć widoczność w ChatGPT
                  </Link>
                </li>
                <li>
                  <Link href="/blog/jak-zwiekszac-konwersje-ecommerce" className="text-primary hover:underline">
                    Jak zwiększać konwersje w e-commerce
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-primary hover:underline">
                    Wszystkie artykuły →
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
