import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSiteUrl } from '../utils/siteUrl';

const SiteSEO: FC = () => {
  const SITE_URL = getSiteUrl();
  const GSC = (import.meta.env?.VITE_GSC_VERIFICATION as string | undefined) || '';
  const BING = (import.meta.env?.VITE_BING_VERIFICATION as string | undefined) || '';

  const PHONE = '+33 7 49 23 55 39';
  const DEV = { '@type': 'Organization', name: 'SmarterLogic Web', url: 'https://smarterlogiqueweb.com' };

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MB Fret Services',
    url: SITE_URL,
    creator: DEV,
    sameAs: [
      'https://www.linkedin.com/company/NOM-DE-L-ENTREPRISE-PLACEHOLDER',
      'https://www.instagram.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER',
      'https://www.facebook.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER',
      'https://twitter.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: PHONE,
        email: 'contact@mb-fretservices.com',
        url: 'https://wa.me/33749235539',
        contactType: 'customer service',
        areaServed: ['FR', 'EU', 'AF', 'AS'],
        availableLanguage: ['fr', 'en', 'pt', 'es', 'ar', 'tr', 'de', 'it', 'sw'],
      },
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MB Fret Services',
    url: SITE_URL,
    inLanguage: 'fr-FR',
    creator: DEV,
  };

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'MB Fret Services',
    url: SITE_URL,
    image: 'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1200',
    email: 'contact@mb-fretservices.com',
    telephone: PHONE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8566,
      longitude: 2.3522,
    },
    areaServed: ['Europe', 'Africa', 'Asia'],
    openingHours: [
      'Mo-Fr 09:00-18:00',
      'Sa 10:00-14:00',
    ],
    sameAs: [
      'https://www.linkedin.com/company/NOM-DE-L-ENTREPRISE-PLACEHOLDER',
      'https://www.instagram.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER',
      'https://www.facebook.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER',
      'https://twitter.com/NOM-DE-L-ENTREPRISE-PLACEHOLDER',
    ],
    creator: DEV,
  };

  return (
    <Helmet>
      {/* Domain ownership verifications (optional via env) */}
      {GSC ? <meta name="google-site-verification" content={GSC} /> : null}
      {BING ? <meta name="msvalidate.01" content={BING} /> : null}

      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify(organization)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(website)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusiness)}
      </script>
    </Helmet>
  );
};

export default SiteSEO;