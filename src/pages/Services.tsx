import React from 'react';
import { Ship, Plane, FileText, Shield } from 'lucide-react';
import CtaButton from '../components/CtaButton';
import SEO from '../components/SEO';

const Services: React.FC = () => {

  const services = [
    {
      icon: Ship,
      title: 'Fret Maritime',
      subtitle: 'Solutions économiques pour gros volumes',
      description: 'Notre expertise en transport maritime nous permet de proposer des solutions optimales pour vos envois volumineux vers l\'Afrique et l\'Asie. Nous gérons tous types de marchandises avec un suivi complet.',
      features: [
        'Conteneurs 20\' et 40\' (FCL)',
        'Groupage (LCL) pour petits volumes', 
        'Transport de véhicules et machines',
        'Marchandises spéciales et dangereuses',
        'Service port à port ou porte à porte',
        'Suivi en temps réel via plateforme web'
      ],
      destinations: 'Principales destinations : Congo, Angola, Côte d\'Ivoire, Cameroun'
    },
    {
      icon: Plane,
      title: 'Fret Aérien',
      subtitle: 'Rapidité et fiabilité pour vos urgences',
      description: 'Le transport aérien est idéal pour vos marchandises de haute valeur, périssables ou urgentes. Notre réseau de partenaires garantit des délais serrés vers toutes destinations.',
      features: [
        'Express 24-48h vers destinations principales',
        'Transport sous température contrôlée',
        'Marchandises fragiles et précieuses',
        'Documents et échantillons',
        'Suivi GPS en temps réel',
        'Assurance tous risques incluse'
      ],
      destinations: 'Desservi : Chine, Turquie, Maroc, Tunisie, pays d\'Afrique centrale'
    },
    {
      icon: FileText,
      title: 'Dédouanement',
      subtitle: 'Expertise administrative complète',
      description: 'Notre équipe de déclarants en douane agréés vous accompagne dans toutes les formalités administratives. Nous garantissons la conformité réglementaire de vos opérations.',
      features: [
        'Déclarations import/export',
        'Gestion des régimes douaniers spéciaux',
        'Conseil en classification tarifaire',
        'Optimisation fiscale légale',
        'Représentation en cas de contrôle',
        'Veille réglementaire permanente'
      ],
      destinations: 'Tous ports et aéroports français et européens'
    },
    {
      icon: Shield,
      title: 'Assurance Cargo',
      subtitle: 'Protection totale de vos marchandises',
      description: 'Protégez vos investissements avec nos solutions d\'assurance adaptées à chaque type de transport. Couverture complète de l\'enlèvement à la livraison finale.',
      features: [
        'Assurance tous risques transport',
        'Couverture guerre et grèves',
        'Protection contre les avaries communes',
        'Expertise et règlement rapide',
        'Conseils en prévention des risques',
        'Tarifs préférentiels selon volumes'
      ],
      destinations: 'Couverture mondiale tous modes de transport'
    }
  ];

  return (
    <div className="pt-16">
      <SEO
        title="Nos Services - Fret Maritime, Aérien et Dédouanement | MB Fret Services"
        description="Découvrez nos services de transport international : fret maritime vers l'Afrique, fret aérien express, dédouanement professionnel et assurance cargo."
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Accueil',
                item: (import.meta as any).env?.VITE_SITE_URL ? (import.meta as any).env?.VITE_SITE_URL + '/' : 'https://mb-fretservices.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Services',
                item: (import.meta as any).env?.VITE_SITE_URL ? (import.meta as any).env?.VITE_SITE_URL + '/services' : 'https://mb-fretservices.com/services',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              { '@type': 'Service', name: 'Fret Maritime', description: 'Solutions économiques pour gros volumes. Transport maritime vers l’Afrique et l’Asie avec suivi complet.' },
              { '@type': 'Service', name: 'Fret Aérien', description: 'Rapidité et fiabilité pour vos urgences. Idéal pour marchandises de valeur, périssables ou urgentes.' },
              { '@type': 'Service', name: 'Dédouanement', description: 'Expertise administrative complète et conformité réglementaire assurée.' },
              { '@type': 'Service', name: 'Assurance Cargo', description: 'Protection totale de vos marchandises, couverture complète de l’enlèvement à la livraison.' },
            ],
          },
        ]}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Services de Transport International
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Solutions complètes de logistique internationale adaptées à vos besoins. 
              Du fret maritime économique au transport aérien express, nous gérons vos marchandises de A à Z.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-slide-up ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl mr-4">
                      <service.icon size={32} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-primary-900">{service.title}</h2>
                      <p className="text-accent-500 font-medium">{service.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-accent-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-blue-50 border-l-4 border-accent-500 p-4 mb-6">
                    <p className="text-sm text-gray-700 font-medium">
                      <span className="text-accent-600">Destinations : </span>
                      {service.destinations}
                    </p>
                  </div>
                  
                  <CtaButton href="/contact" variant="primary">
                    Demander un Devis
                  </CtaButton>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src={`https://images.pexels.com/photos/${
                        index === 0 ? '906982' : 
                        index === 1 ? '723240' : 
                        index === 2 ? '7681091' : '416978'
                      }/pexels-photo-${
                        index === 0 ? '906982' : 
                        index === 1 ? '723240' : 
                        index === 2 ? '7681091' : '416978'
                      }.jpeg?auto=compress&cs=tinysrgb&w=800`}
                      alt={`Service ${service.title}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-64 lg:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
            Besoin d'une solution personnalisée ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Chaque projet logistique est unique. Nos experts analysent vos besoins 
            pour vous proposer la solution la plus adaptée et économique.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaButton href="/contact" variant="primary" className="text-lg px-8 py-4">
              Consultation Gratuite
            </CtaButton>
            <a 
              href="https://wa.me/33123456789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;