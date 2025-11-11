import type { FC } from 'react';
import SEO from '../components/SEO';
import CtaButton from '../components/CtaButton';
import ResponsiveImage from '../components/ResponsiveImage';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, pathForLang } from '../utils/paths';
import { Plane, Clock, Shield, CheckCircle } from 'lucide-react';

const AirFreight: FC = () => {
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: SITE_URL + pathForLang('services', lang) },
      { '@type': 'ListItem', position: 3, name: 'Fret aérien', item: SITE_URL + pathForLang('services_air_freight', lang) },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Fret aérien B2B – Express et sécurisé',
    serviceType: 'Fret aérien',
    provider: { '@type': 'Organization', name: 'MB Fret Services', url: SITE_URL },
    areaServed: [{ '@type': 'Place', name: 'Europe' }, { '@type': 'Place', name: 'Afrique' }, { '@type': 'Place', name: 'Asie' }],
    availableChannel: { '@type': 'ServiceChannel', servicePhone: { '@type': 'ContactPoint', telephone: '+33 7 49 23 55 39' } },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quelles marchandises sont adaptées au fret aérien ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Marchandises à forte valeur, périssables ou urgentes. Le fret aérien minimise le temps de transit et l’exposition aux risques.' },
      },
      {
        '@type': 'Question',
        name: 'Quels délais typiques en Europe ↔ Afrique/Asie ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Selon les hubs et la saison: 1–5 jours porte-à-aéroport, 3–8 jours porte-à-porte. Nous proposons des solutions express sur demande.' },
      },
      {
        '@type': 'Question',
        name: 'Proposez-vous une assurance cargo pour l’aérien ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui. Une couverture ad valorem est recommandée; nous conseillons selon la valeur, la nature et la criticité de votre envoi.' },
      },
    ],
  };

  const features = [
    { icon: Clock, title: 'Délais express', text: 'Acheminement prioritaire, vols réguliers, options express pour vos urgences.' },
    { icon: Shield, title: 'Sécurité renforcée', text: 'Traçabilité, contrôle documentaire et assurance adaptée à la valeur.' },
  ];

  const services = [
    'Porte-à-aéroport et porte-à-porte',
    'Contrôle documentaire et conformité IATA',
    'Emballage aérien et sécurisation',
    'Suivi 24/7 et notifications',
  ];

  return (
    <div className="pt-16">
      <SEO
        title="Fret aérien — Rapide et sécurisé | MB Fret Services"
        description="Solutions de fret aérien B2B: express, sécurisé, traçable. Europe ↔ Afrique/Asie. Porte-à-porte, assurance cargo, conformité IATA."
        ogImage="https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=1600"
        jsonLd={[breadcrumb, serviceLd, faqLd]}
      />

      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <ResponsiveImage
            src="https://images.pexels.com/photos/723240/pexels-photo-723240.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Avion cargo fret aérien"
            width={1600}
            height={900}
            priority
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Plane size={48} className="text-accent-400 mr-4" aria-hidden="true" />
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">Fret aérien</h1>
              <p className="text-xl md:text-2xl text-accent-300 font-medium">Priorité, fiabilité, sécurité.</p>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl leading-relaxed">
            Une solution rapide et sûre pour vos expéditions urgentes, sensibles ou à forte valeur. Nous pilotons la chaîne
            de bout en bout avec un suivi temps réel.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <CtaButton href="contact" variant="primary" className="text-lg px-8 py-4">Demander un devis</CtaButton>
            <a href="https://wa.me/33749235539" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={f.title} className={`bg-white rounded-xl shadow p-6 animate-slide-up ${i ? 'animate-delay-150' : 'animate-delay-0'}`}>
                <div className="flex items-center mb-4">
                  <f.icon size={24} className="text-accent-500 mr-3" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-primary-900">{f.title}</h3>
                </div>
                <p className="text-gray-700">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">Services</h2>
            <p className="text-lg text-gray-700 mb-6">
              Nous opérons sur principaux hubs (CDG, AMS, FRA, IST…) avec options express, consolidation et assurance ad valorem.
            </p>
            <div className="space-y-3">
              {services.map((s) => (
                <div className="flex items-start" key={s}>
                  <CheckCircle size={20} className="text-accent-500 mr-3 mt-1" aria-hidden="true" />
                  <span className="text-gray-700">{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <CtaButton href="contact" variant="primary">Obtenir un devis</CtaButton>
            </div>
          </div>
          <div className="relative">
            <ResponsiveImage
              src="https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Chargement aérien"
              width={800}
              height={533}
              className="w-full h-96 object-cover rounded-xl shadow-xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent rounded-xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AirFreight;