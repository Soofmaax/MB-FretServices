import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getSiteUrl } from '../utils/siteUrl';

const SiteSEO: React.FC = () => {
  const SITE_URL = getSiteUrl();

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MB Fret Services',
    url: SITE_URL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+33 1 23 45 67 89',
        contactType: 'customer service',
        areaServed: ['FR', 'EU', 'AF', 'AS'],
        availableLanguage: ['fr', 'en'],
      },
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MB Fret Services',
    url: SITE_URL,
    inLanguage: 'fr-FR',
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organization)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(website)}
      </script>
    </Helmet>
  );
};

export default SiteSEO;