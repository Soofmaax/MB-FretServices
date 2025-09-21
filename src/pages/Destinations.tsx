import React from 'react';
import { MapPin, Clock, Ship, Plane } from 'lucide-react';
import CtaButton from '../components/CtaButton';
import SEO from '../components/SEO';
import { getSiteUrl } from '../utils/siteUrl';

const Destinations: React.FC = () => {
  const SITE_URL = getSiteUrl();

  const regions = [
    {
      name: 'Afrique Centrale',
      countries: [
        {
          name: 'Congo',
          capital: 'Brazzaville',
          port: 'Pointe-Noire',
          maritime: {
            from: 'Le Havre, Anvers',
            duration: '18-22 jours',
            frequency: 'Hebdomadaire'
          },
          aerien: {
            from: 'Paris CDG, Lyon',
            duration: '6-8 heures',
            frequency: 'Quotidien'
          },
          specialites: ['Véhicules', 'Machines industrielles', 'Produits alimentaires']
        },
        {
          name: 'Angola',
          capital: 'Luanda',
          port: 'Luanda',
          maritime: {
            from: 'Anvers, Rotterdam',
            duration: '20-25 jours',
            frequency: 'Bi-hebdomadaire'
          },
          aerien: {
            from: 'Paris CDG, Marseille',
            duration: '7-9 heures',
            frequency: '5x/semaine'
          },
          specialites: ['Matériel médical', 'BTP', 'Électronique']
        }
      ]
    },
    {
      name: 'Asie',
      countries: [
        {
          name: 'Chine',
          capital: 'Beijing',
          port: 'Shanghai, Shenzhen',
          maritime: {
            from: 'Le Havre, Hambourg',
            duration: '30-35 jours',
            frequency: 'Quotidien'
          },
          aerien: {
            from: 'Paris CDG, Lyon',
            duration: '10-12 heures',
            frequency: 'Quotidien'
          },
          specialites: ['Import textile', 'Électronique', 'Machines']
        }
      ]
    },
    {
      name: 'Proche-Orient',
      countries: [
        {
          name: 'Turquie',
          capital: 'Ankara',
          port: 'Istanbul, Izmir',
          maritime: {
            from: 'Marseille, Gênes',
            duration: '5-7 jours',
            frequency: '3x/semaine'
          },
          aerien: {
            from: 'Paris CDG, Lyon, Nice',
            duration: '3-4 heures',
            frequency: 'Quotidien'
          },
          specialites: ['Textile', 'Agroalimentaire', 'Automobile']
        }
      ]
    }
  ];

  return (
    <div className="pt-16">
      <SEO
        title="Destinations - Transport vers Afrique, Asie et Europe | MB Fret Services"
        description="Transport international vers Congo, Angola, Chine, Turquie. Routes maritimes et aériennes depuis la France. Devis personnalisé sous 24h."
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Accueil',
                item: SITE_URL + '/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Destinations',
                item: SITE_URL + '/destinations',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Destinations - MB Fret Services',
            inLanguage: 'fr-FR',
          },
        ]}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Destinations Mondiales
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Réseau étendu de partenaires logistiques pour connecter vos marchés. 
              Routes optimisées et fréquences adaptées à vos besoins commerciaux.
            </p>
          </div>
        </div>
      </section>

      {/* Routes par région */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {regions.map((region, regionIndex) => (
            <div key={regionIndex} className="mb-16 last:mb-0">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                  {region.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {region.countries.map((country, countryIndex) => (
                  <div 
                    key={countryIndex}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${countryIndex * 200}ms` }}
                  >
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <MapPin size={24} className="text-accent-500 mr-3" />
                        <div>
                          <h3 className="text-2xl font-bold text-primary-900">{country.name}</h3>
                          <p className="text-gray-600">Port principal : {country.port}</p>
                        </div>
                      </div>

                      {/* Transport Maritime */}
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Ship size={20} className="text-blue-600 mr-2" />
                          <h4 className="font-semibold text-blue-900">Transport Maritime</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Départ :</span>
                            <p className="font-medium">{country.maritime.from}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Durée :</span>
                            <p className="font-medium">{country.maritime.duration}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Fréquence :</span>
                            <p className="font-medium">{country.maritime.frequency}</p>
                          </div>
                        </div>
                      </div>

                      {/* Transport Aérien */}
                      <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Plane size={20} className="text-accent-600 mr-2" />
                          <h4 className="font-semibold text-accent-900">Transport Aérien</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Départ :</span>
                            <p className="font-medium">{country.aerien.from}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Durée :</span>
                            <p className="font-medium">{country.aerien.duration}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Fréquence :</span>
                            <p className="font-medium">{country.aerien.frequency}</p>
                          </div>
                        </div>
                      </div>

                      {/* Spécialités */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-primary-900 mb-3">Spécialités transport :</h5>
                        <div className="flex flex-wrap gap-2">
                          {country.specialites.map((specialite, specIndex) => (
                            <span 
                              key={specIndex}
                              className="px-3 py-1 bg-accent-100 text-accent-800 text-sm rounded-full"
                            >
                              {specialite}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <CtaButton href="/contact" variant="primary" className="w-full">
                          Demander un Devis pour {country.name}
                        </CtaButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Autres destinations */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
            Destination non listée ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Notre réseau mondial nous permet d'étudier toutes les destinations. 
            Contactez-nous pour une étude personnalisée de votre projet.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <Clock size={40} className="text-accent-500 mx-auto mb-4" />
              <h3 className="font-semibold text-primary-900 mb-2">Réponse Rapide</h3>
              <p className="text-gray-600 text-sm">Devis sous 24h pour toute destination</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <MapPin size={40} className="text-accent-500 mx-auto mb-4" />
              <h3 className="font-semibold text-primary-900 mb-2">Réseau Mondial</h3>
              <p className="text-gray-600 text-sm">Partenaires dans plus de 50 pays</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <Ship size={40} className="text-accent-500 mx-auto mb-4" />
              <h3 className="font-semibold text-primary-900 mb-2">Solutions Sur-Mesure</h3>
              <p className="text-gray-600 text-sm">Adaptées à vos contraintes spécifiques</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaButton href="/contact" variant="primary" className="text-lg px-8 py-4">
              Étudier ma Destination
            </CtaButton>
            <a 
              href="https://wa.me/33123456789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              WhatsApp Direct
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;