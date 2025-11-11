import type { FC } from 'react';
import SEO from '../components/SEO';
import CtaButton from '../components/CtaButton';
import ResponsiveImage from '../components/ResponsiveImage';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, pathForLang } from '../utils/paths';
import { Shield, CheckCircle } from 'lucide-react';

const Insurance: FC = () => {
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: SITE_URL + pathForLang('services', lang) },
      { '@type': 'ListItem', position: 3, name: 'Assurance cargo', item: SITE_URL + pathForLang('services_insurance', lang) },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Assurance cargo – couverture ad valorem',
    serviceType: 'Assurance transport',
    provider: { '@type': 'Organization', name: 'MB Fret Services', url: SITE_URL },
    areaServed: [{ '@type': 'Place', name: 'Europe' }, { '@type': 'Place', name: 'Afrique' }, { '@type': 'Place', name: 'Asie' }],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Pourquoi assurer le fret maritime/aérien ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Pour couvrir les risques d’avarie, de perte ou de vol. Une police ad valorem protège votre trésorerie et vos engagements B2B.' },
      },
      {
        '@type': 'Question',
        name: 'Quelles clauses recommandez-vous ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Selon la marchandise et la route: Institute Cargo Clauses (A) pour une couverture large, ou conventions spécifiques (ADR, périssables, etc.).' },
      },
      {
        '@type': 'Question',
        name: 'Assurez-vous porte-à-porte ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, nous calibrons la police du point d’enlèvement à la livraison, incluant pré/post-acheminement.' },
      },
    ],
  };

  const benefits = [
    'Couverture ad valorem adaptée',
    'Gestion de sinistres et preuves documentaires',
    'Conseils sur la protection/emballage export',
    'Intégration au devis fret pour une visibilité totale',
  ];

  return (
    <div className="pt-16">
      <SEO
        title="Assurance cargo — Couverture ad valorem | MB Fret Services"
        description="Assurance transport pour fret maritime/aérien: couverture ad valorem, gestion des sinistres, conseils packaging export. Porte-à-porte."
        ogImage="https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1600"
        jsonLd={[breadcrumb, serviceLd, faqLd]}
      />

      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <ResponsiveImage
            src="https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Assurance cargo transport"
            width={1600}
            height={900}
            priority
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Shield size={48} className="text-accent-400 mr-4" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold">Assurance cargo</h1>
          </div>
          <p className="text-xl text-gray-100">
            Protégez votre supply chain et votre trésorerie grâce à une couverture adaptée à vos flux B2B.
          </p>
          <div className="mt-6">
            <CtaButton href="contact" variant="primary">Demander une couverture</CtaButton>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-900 mb-6">Bénéfices</h2>
          <div className="space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-start">
                <CheckCircle size={20} className="text-accent-500 mr-3 mt-1" aria-hidden="true" />
                <span className="text-gray-700">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <CtaButton href="contact" variant="primary">Obtenir un devis</CtaButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insurance;