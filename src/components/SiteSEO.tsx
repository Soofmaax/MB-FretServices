import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { getSiteUrl } from '../utils/siteUrl';
import { DEFAULT_OG_IMAGE } from '../utils/seoHelpers';
import { siteConfig } from '../config/site.config';

const SiteSEO: FC = () => {
  const SITE_URL = getSiteUrl();
  const GSC = (import.meta.env?.VITE_GSC_VERIFICATION as string | undefined) || '';
  const BING = (import.meta.env?.VITE_BING_VERIFICATION as string | undefined) || '';

  const PHONE = '+33 7 49 23 55 39';
  const DEV = { '@type': 'Organization', name: 'SmarterLogic Web', url: 'https://smarterlogiqueweb.com' };

  const ogImgAbs = DEFAULT_OG_IMAGE.startsWith('http')
    ? DEFAULT_OG_IMAGE
    : new URL(DEFAULT_OG_IMAGE, SITE_URL).href;

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MB Fret Services',
    url: SITE_URL,
    logo: ogImgAbs,
    image: ogImgAbs,
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
    '@type': siteConfig.seo.localBusinessType,
    name: siteConfig.businessName,
    url: SITE_URL,
    image: ogImgAbs,
    email: siteConfig.contact.email,
    telephone: PHONE,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.postal,
      addressLocality: siteConfig.address.city,
      addressRegion: 'Île-de-France',
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8566,
      longitude: 2.3522,
    },
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '10:00',
        closes: '14:00',
      },
    ],
    areaServed: [
      'Europe', 'Africa', 'Asia'
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