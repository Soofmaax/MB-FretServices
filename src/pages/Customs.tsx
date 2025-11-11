import type { FC } from 'react';
import SEO from '../components/SEO';
import CtaButton from '../components/CtaButton';
import ResponsiveImage from '../components/ResponsiveImage';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, pathForLang } from '../utils/paths';
import { FileText, CheckCircle } from 'lucide-react';

const Customs: FC = () => {
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: SITE_URL + pathForLang('services', lang) },
      { '@type': 'ListItem', position: 3, name: 'Dédouanement', item: SITE_URL + pathForLang('services_customs', lang) },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Dédouanement & conformité import/export',
    serviceType: 'Dédouanement',
    provider: { '@type': 'Organization', name: 'MB Fret Services', url: SITE_URL },
    areaServed: [{ '@type': 'Place', name: 'France' }, { '@type': 'Place', name: 'UE' }],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quels documents sont indispensables ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Facture commerciale, packing list, documents d’origine, certificats éventuels et autorisations spécifiques selon la marchandise.' },
      },
      {
        '@type': 'Question',
        name: 'Proposez-vous une représentation en douane ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, nous opérons la représentation en douane, le contrôle documentaire et la conformité réglementaire pour vos importations et exportations.' },
      },
      {
        '@type': 'Question',
        name: 'Pouvez-vous assister sur les Incoterms ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, nous vous conseillons sur l’Incoterm optimal (FOB/CIF/DAP…) selon votre flux, votre tolérance au risque et votre organisation.' },
      },
    ],
  };

  const points = [
    'Contrôle documentaire & conformité',
    'Représentation en douane',
    'Gestion des droits et taxes',
    'Assistance Incoterms et procédures',
  ];

  return (
    <div className="pt-16">
      <SEO
        title="Dédouanement & conformité — Import/Export | MB Fret Services"
        description="Formalités douanières import/export, représentation en douane, calcul droits & taxes. Assistance documentaire, Incoterms et conformité."
        ogImage="/og-default.webp"
        jsonLd={[breadcrumb, serviceLd, faqLd]}
      />

      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <ResponsiveImage
            src="/images/hero-customs.jpg"
            webpSrc="/images/hero-customs.webp"
            avifSrc="/images/hero-customs.avif"
            alt="Dédouanement et formalités documentaires"
            width={1600}
            height={900}
            priority
            sizes="100vw"
            className="w-full h-full object-cover"
            type="image/jpeg"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <FileText size={48} className="text-accent-400 mr-4" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold">Dédouanement</h1>
          </div>
          <p className="text-xl text-gray-100">
            Sécurisez vos flux avec un pilotage documentaire rigoureux et une représentation en douane efficace.
          </p>
          <div className="mt-6">
            <CtaButton href="contact" variant="primary">Parler à un expert</CtaButton>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-900 mb-6">Prestations</h2>
          <div className="space-y-3">
            {points.map((p) => (
              <div key={p} className="flex items-start">
                <CheckCircle size={20} className="text-accent-500 mr-3 mt-1" aria-hidden="true" />
                <span className="text-gray-700">{p}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <CtaButton href="contact" variant="primary">Obtenir une estimation</CtaButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customs;