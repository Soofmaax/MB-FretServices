import type { FC } from 'react';
import { MapPin, Clock, Ship, Plane } from 'lucide-react';
import CtaButton from '../components/CtaButton';
import SEO from '../components/SEO';
import { getSiteUrl } from '../utils/siteUrl';
import { useTranslation } from 'react-i18next';
import { detectLangFromPath, pathForLang } from '../utils/paths';

type Region = {
  name: string;
  countries: Array<{
    name: string;
    capital?: string;
    port: string;
    maritime: { from: string; duration: string; frequency: string };
    aerien: { from: string; duration: string; frequency: string };
    specialites: string[];
  }>;
};

const Destinations: FC = () => {
  const SITE_URL = getSiteUrl();
  const { t } = useTranslation('destinations');
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';

  const regions = t('regions', { returnObjects: true }) as Region[];

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
                item: SITE_URL + pathForLang('destinations', lang),
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
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
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
                    className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up ${countryIndex === 0 ? 'animate-delay-0' : countryIndex === 1 ? 'animate-delay-200' : countryIndex === 2 ? 'animate-delay-400' : 'animate-delay-600'}`}
                  >
                    <div className="p-8">
                      <div className="flex items-center mb-6">
                        <MapPin size={24} className="text-accent-500 mr-3" />
                        <div>
                          <h3 className="text-2xl font-bold text-primary-900">{country.name}</h3>
                          <p className="text-gray-600">{t('labels.port_principal')} {country.port}</p>
                        </div>
                      </div>

                      {/* Transport Maritime */}
                      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Ship size={20} className="text-blue-600 mr-2" />
                          <h4 className="font-semibold text-blue-900">{t('labels.maritime')}</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">{t('labels.depart')}</span>
                            <p className="font-medium">{country.maritime.from}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{t('labels.duree')}</span>
                            <p className="font-medium">{country.maritime.duration}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{t('labels.frequence')}</span>
                            <p className="font-medium">{country.maritime.frequency}</p>
                          </div>
                        </div>
                      </div>

                      {/* Transport Aérien */}
                      <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Plane size={20} className="text-accent-600 mr-2" />
                          <h4 className="font-semibold text-accent-900">{t('labels.air')}</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">{t('labels.depart')}</span>
                            <p className="font-medium">{country.aerien.from}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{t('labels.duree')}</span>
                            <p className="font-medium">{country.aerien.duration}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{t('labels.frequence')}</span>
                            <p className="font-medium">{country.aerien.frequency}</p>
                          </div>
                        </div>
                      </div>

                      {/* Spécialités */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-primary-900 mb-3">{t('labels.specialites')}</h5>
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
                        <CtaButton href="contact" variant="primary" className="w-full">
                          {t('other.cta_for', { country: country.name })}
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
            {t('other.not_listed_title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {t('other.not_listed_text')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <Clock size={40} className="text-accent-500 mx-auto mb-4" />
              <h3 className="font-semibold text-primary-900 mb-2">{t('other.fast_response')}</h3>
              <p className="text-gray-600 text-sm">{t('other.fast_response_desc')}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <MapPin size={40} className="text-accent-500 mx-auto mb-4" />
              <h3 className="font-semibold text-primary-900 mb-2">{t('other.global_network')}</h3>
              <p className="text-gray-600 text-sm">{t('other.global_network_desc')}</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <Ship size={40} className="text-accent-500 mx-auto mb-4" />
              <h3 className="font-semibold text-primary-900 mb-2">{t('other.tailored')}</h3>
              <p className="text-gray-600 text-sm">{t('other.tailored_desc')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaButton href="contact" variant="primary" className="text-lg px-8 py-4">
              {t('other.cta_study')}
            </CtaButton>
            <a
              href="https://wa.me/33123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              {t('other.cta_whatsapp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;