/**
 * Organization schema for site-wide E-E-A-T signals.
 * Injected once in App layout.
 */
import { Helmet } from 'react-helmet-async';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://boostnow.pl/#organization',
  name: 'BoostNow',
  url: 'https://boostnow.pl',
  logo: {
    '@type': 'ImageObject',
    url: 'https://boostnow.pl/images/boostnow-logo.svg',
    width: 600,
    height: 60,
  },
  description: 'Polska agencja GEO, SEO i optymalizacji konwersji. Specjalizacja w widoczności w Google, ChatGPT, Perplexity i Google AI Overviews.',
  email: 'kontakt@boostnow.pl',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ul. Marii Konopnickiej 11',
    addressLocality: 'Dobre Miasto',
    postalCode: '11-040',
    addressCountry: 'PL',
  },
  taxID: '7393776527',
  founder: {
    '@type': 'Person',
    name: 'Mateusz Nowotka',
    jobTitle: 'Founder & CEO',
    url: 'https://boostnow.pl/mateusz-nowotka',
  },
  sameAs: [
    'https://www.linkedin.com/company/boostnowmarketing',
    'https://www.facebook.com/profile.php?id=61585415810749',
    'https://www.instagram.com/boostnow_marketing/',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Poland',
  },
  knowsAbout: [
    'Generative Engine Optimization',
    'SEO',
    'AI Overviews',
    'Answer Engine Optimization',
    'Conversion Rate Optimization',
  ],
};

export default function OrganizationSchema() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
    </Helmet>
  );
}
