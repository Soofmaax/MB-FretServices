import React from 'react';
import { Ship, Clock, Shield, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import CtaButton from '../components/CtaButton';
import SEO from '../components/SEO';

const FreightMaritime: React.FC = () => {
  const SITE_URL = (import.meta as any).env?.VITE_SITE_URL || 'https://mb-fretservices.com';

  const advantages = [
    {
      icon: Ship,
      title: 'Expertise Maritime',
      description: "Plus de 15 ans d'expérience dans le transport maritime vers l'Afrique",
    },
    {
      icon: Clock,
      title: 'Délais Maîtrisés',
      description: 'Rotations régulières et délais de transit optimisés',
    },
    {
      icon: Shield,
      title: 'Sécurité Garantie',
      description: 'Assurance cargo et suivi en temps réel de vos marchandises',
    },
  ];

  const destinations = [
    {
      country: 'Congo',
      port: 'Pointe-Noire',
      duration: '18-22 jours',
      frequency: 'Hebdomadaire',
      departure: 'Le Havre, Anvers',
    },
    {
      country: 'Angola',
      port: 'Luanda',
      duration: '20-25 jours',
      frequency: 'Bi-hebdomadaire',
      departure: 'Anvers, Rotterdam',
    },
    {
      country: "Côte d'Ivoire",
      port: 'Abidjan',
      duration: '12-15 jours',
      frequency: 'Quotidien',
      departure: 'Le Havre, Marseille',
    },
    {
      country: 'Cameroun',
      port: 'Douala',
      duration: '15-18 jours',
      frequency: 'Bi-hebdomadaire',
      departure: 'Anvers, Hambourg',
    },
  ];

  const services = [
    "Conteneurs 20' et 40' (FCL - Full Container Load)",
    'Groupage maritime (LCL - Less than Container Load)',
    "Transport de véhicules neufs et d'occasion",
    'Machines industrielles et équipements lourds',
    'Marchandises dangereuses (IMO)',
    'Conteneurs frigorifiques (reefer)',
    'Service porte à porte avec enlèvement',
    'Dédouanement import/export inclus',
  ];

  return (
    <div className="pt-16">
      <SEO
        title="Fret Maritime vers l'Afrique - Transport Conteneur FCL LCL | MB Fret Services"
        description="Fret maritime professionnel vers l'Afrique : Congo, Angola, Côte d'Ivoire. Conteneurs 20' et 40', FCL et LCL. Devis gratuit sous 24h. Expert depuis 15 ans."
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL + '/' },
              { '@type': 'ListItem', position: 2, name: 'Services', item: SITE_URL + '/services' },
              { '@type': 'ListItem', position: 3, name: 'Fret maritime', item: SITE_URL + '/fret-maritime' },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: "Fret maritime vers l'Afrique (FCL & LCL)",
            serviceType: 'Fret maritime',
            provider: {
              '@type': 'Organization',
              name: 'MB Fret Services',
              url: SITE_URL,
            },
            areaServed: [
              { '@type': 'Country', name: 'Congo' },
              { '@type': 'Country', name: 'Angola' },
              { '@type': 'Country', name: "Côte d'Ivoire" },
              { '@type': 'Country', name: 'Cameroun' },
            ],
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceLocation: { '@type': 'Place', name: 'France et Europe' },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Quelle est la différence entre FCL et LCL ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    "FCL (Full Container Load) : vous louez un conteneur complet (20' ou 40') pour vos marchandises exclusivement. " +
                    "LCL (Less than Container Load) : vos marchandises partagent un conteneur avec d'autres expéditeurs, idéal pour les petits volumes.",
                },
              },
              {
                '@type': 'Question',
                name: 'Quels documents sont nécessaires pour le fret maritime ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    "Facture commerciale, liste de colisage, connaissement maritime (Bill of Lading), certificat d'origine si requis, " +
                    'et documents spécifiques selon la nature des marchandises (certificats sanitaires, etc.).',
                },
              },
              {
                '@type': 'Question',
                name: 'Comment suivre mon conteneur en transit ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    'Nous fournissons un numéro de suivi et un accès à notre plateforme web pour un suivi en temps réel, ' +
                    "de l'embarquement au port de départ jusqu'à l'arrivée au port de destination.",
                },
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: "Fret Maritime vers l'Afrique",
            inLanguage: 'fr-FR',
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1600")',
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <Ship size={48} className="text-accent-400 mr-4" />
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Fret Maritime vers l&apos;Afrique
                </h1>
                <p className="text-xl md:text-2xl text-accent-400 font-medium">
                  Solutions conteneurs FCL et LCL
                </p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl leading-relaxed">
              Transport maritime professionnel vers les principaux ports africains.
              Conteneurs 20&apos; et 40&apos;, groupage LCL, véhicules et marchandises spéciales.
              Rotations régulières depuis les ports français et européens.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <CtaButton href="/contact" variant="primary" className="text-lg px-8 py-4">
                Devis Fret Maritime Gratuit
              </CtaButton>
              <a
                href="https://wa.me/33123456789?text=Bonjour, je souhaite un devis pour du fret maritime vers l'Afrique"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
              >
                WhatsApp Direct
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Pourquoi choisir notre fret maritime ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expertise reconnue dans le transport maritime vers l&apos;Afrique avec des solutions adaptées à tous vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
                  <advantage.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">{advantage.title}</h3>
                <p className="text-gray-600 leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                Nos Services de Fret Maritime
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Solutions complètes de transport maritime adaptées à tous types de marchandises.
                De l&apos;enlèvement à la livraison, nous gérons votre fret de A à Z.
              </p>

              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={20} className="text-accent-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <CtaButton href="/contact" variant="primary">
                  Demander un Devis Personnalisé
                </CtaButton>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Conteneurs de fret maritime"
                loading="lazy"
                decoding="async"
                className="w-full h-96 object-cover rounded-xl shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations principales */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Destinations Fret Maritime Afrique
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rotations régulières vers les principaux ports africains avec des délais optimisés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-6">
                  <MapPin size={24} className="text-accent-500 mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold text-primary-900">{destination.country}</h3>
                    <p className="text-gray-600">Port : {destination.port}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-gray-500">Durée transit</span>
                    <p className="font-semibold text-primary-900">{destination.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Fréquence</span>
                    <p className="font-semibold text-primary-900">{destination.frequency}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-sm text-gray-500">Départ depuis</span>
                  <p className="font-semibold text-primary-900">{destination.departure}</p>
                </div>

                <CtaButton href="/contact" variant="outline" className="w-full">
                  Devis vers {destination.country}
                </CtaButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              Questions Fréquentes - Fret Maritime
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-4">
                Quelle est la différence entre FCL et LCL ?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>FCL (Full Container Load)</strong> : Vous louez un conteneur complet (20&apos; ou 40&apos;) pour vos marchandises exclusivement.{' '}
                <strong>LCL (Less than Container Load)</strong> : Vos marchandises partagent un conteneur avec d&apos;autres expéditeurs, idéal pour les petits volumes.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-4">Quels documents sont nécessaires pour le fret maritime ?</h3>
              <p className="text-gray-700 leading-relaxed">
                Facture commerciale, liste de colisage, connaissement maritime (Bill of Lading), certificat d&apos;origine si requis, et documents spécifiques
                selon la nature des marchandises (certificats sanitaires, etc.).
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-4">Comment suivre mon conteneur en transit ?</h3>
              <p className="text-gray-700 leading-relaxed">
                Nous fournissons un numéro de suivi et un accès à notre plateforme web pour suivre votre conteneur en temps réel, de l&apos;embarquement au port de départ
                jusqu&apos;à l&apos;arrivée au port de destination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à expédier par fret maritime ?</h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Obtenez votre devis personnalisé en moins de 24h. Nos experts analysent vos besoins et vous proposent la solution maritime la plus économique.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaButton href="/contact" variant="primary" className="text-lg px-8 py-4">
              Devis Fret Maritime
            </CtaButton>
            <a
              href="https://wa.me/33123456789?text=Bonjour, je souhaite un devis pour du fret maritime"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              <ArrowRight size={20} className="mr-2" />
              WhatsApp Immédiat
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreightMaritime;