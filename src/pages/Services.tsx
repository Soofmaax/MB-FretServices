import type { FC, ComponentType } from 'react';
import { Ship, Plane, FileText, Shield, ArrowRight } from 'lucide-react';
import CtaButton from '../components/CtaButton';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';
import ResponsiveImage from '../components/ResponsiveImage';
import { getSiteUrl } from '../utils/siteUrl';
import { useTranslation } from 'react-i18next';
import { detectLangFromPath, pathForLang } from '../utils/paths';

type ServiceKey = 'maritime' | 'air' | 'customs' | 'insurance';

const Services: FC = () => {
  const { t } = useTranslation(['services', 'common']);
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';

  const serviceDefs: Array<{ icon: ComponentType<{ size?: number | string; className?: string }>; key: ServiceKey }> = [
    { icon: Ship, key: 'maritime' },
    { icon: Plane, key: 'air' },
    { icon: FileText, key: 'customs' },
    { icon: Shield, key: 'insurance' },
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
                item: getSiteUrl() + '/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Services',
                item: getSiteUrl() + pathForLang('services', lang),
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              { '@type': 'Service', name: 'Fret Maritime', description: 'Solutions économiques pour gros volumes. Transport maritime vers l’Afrique et l’Asie avec suivi complet.', url: getSiteUrl() + pathForLang('services_freight_maritime', lang) },
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
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {serviceDefs.map((def, index) => {
              const Icon = def.icon;
              const title = t(`${def.key}.title`);
              const subtitle = t(`${def.key}.subtitle`);
              const description = t(`${def.key}.description`);
              const features = t(`${def.key}.features`, { returnObjects: true }) as string[];
              const destinations = t(`${def.key}.destinations`);
              return (
                <div
                  key={def.key}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-slide-up ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  } ${index === 0 ? 'animate-delay-0' : index === 1 ? 'animate-delay-200' : index === 2 ? 'animate-delay-400' : 'animate-delay-600'}`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center mb-6">
                      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl mr-4">
                        <Icon size={32} className="text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-primary-900">{title}</h2>
                        <p className="text-accent-700 font-medium">{subtitle}</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                      {description}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-accent-700 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-blue-50 border-l-4 border-accent-500 p-4 mb-6">
                      <p className="text-sm text-gray-700 font-medium">
                        <span className="text-accent-600">{t('labels.destinations')}</span>
                        {destinations}
                      </p>
                    </div>

                    {def.key === 'maritime' && (
                      <div className="mb-6">
                        <LocalizedLink to="services/fret-maritime" className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium">
                          {t('maritime.more_link')}
                          <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                        </LocalizedLink>
                      </div>
                    )}
                    {def.key === 'air' && (
                      <div className="mb-6">
                        <LocalizedLink to="services/fret-aerien" className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium">
                          {t('air.more_link', 'Découvrir le fret aérien')}
                          <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                        </LocalizedLink>
                      </div>
                    )}
                    {def.key === 'customs' && (
                      <div className="mb-6">
                        <LocalizedLink to="services/dedouanement" className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium">
                          {t('customs.more_link', 'En savoir plus')}
                          <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                        </LocalizedLink>
                      </div>
                    )}
                    {def.key === 'insurance' && (
                      <div className="mb-6">
                        <LocalizedLink to="services/assurance-cargo" className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium">
                          {t('insurance.more_link', 'Assurer vos envois')}
                          <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                        </LocalizedLink>
                      </div>
                    )}

                    <CtaButton href="contact" variant="primary">
                      {t('common:get_quote')}
                    </CtaButton>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="relative rounded-xl overflow-hidden shadow-xl">
                      <ResponsiveImage
                        src={`https://images.pexels.com/photos/${
                          index === 0 ? '906982' :
                          index === 1 ? '723240' :
                          index === 2 ? '7681091' : '416978'
                        }/pexels-photo-${
                          index === 0 ? '906982' :
                          index === 1 ? '723240' :
                          index === 2 ? '7681091' : '416978'
                        }.jpeg?auto=compress&cs=tinysrgb&w=800`}
                        alt={`Service ${title}`}
                        width={800}
                        height={533}
                        className="w-full h-64 lg:h-80 object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Maritime Routes (Hard silo hubs) */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8">Routes phares</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'France ↔ Chine', to: 'services/fret-maritime/france-chine', img: '906982' },
              { title: 'France ↔ Congo', to: 'services/fret-maritime/france-congo', img: '416978' },
              { title: 'France ↔ Turquie', to: 'services/fret-maritime/france-turquie', img: '723240' },
            ].map((r, i) => (
              <div key={r.title} className={`bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all animate-slide-up ${i === 1 ? 'animate-delay-150' : i === 2 ? 'animate-delay-300' : 'animate-delay-0'}`}>
                <LocalizedLink to={r.to} className="block group">
                  <div className="relative h-44">
                    <ResponsiveImage
                      src={`https://images.pexels.com/photos/${r.img}/pexels-photo-${r.img}.jpeg?auto=compress&cs=tinysrgb&w=800`}
                      alt={r.title}
                      width={800}
                      height={300}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">{r.title}</h3>
                    <p className="text-sm text-gray-700">FCL/LCL, ports majeurs, délais optimisés, suivi 24/7.</p>
                    <div className="mt-3 inline-flex items-center text-accent-600 font-medium">
                      Découvrir <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                    </div>
                  </div>
                </LocalizedLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides & Resources */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-8">Guides &amp; Ressources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Incoterms 2020 — Guide complet', to: 'documentation/incoterms-2020', desc: 'Comprendre responsabilités/coûts/risques (FOB, CIF, DAP...). Cas pratiques Chine/Turquie.' },
              { title: 'FCL vs LCL — Comment décider ?', to: 'guides/fcl-vs-lcl', desc: 'Seuils volumétriques (≈13–15 m³), sécurité, délais, multimodalité. Méthode et cas d’usage.' },
            ].map((g, i) => (
              <LocalizedLink key={g.title} to={g.to} className={`block bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all animate-slide-up ${i === 1 ? 'animate-delay-150' : 'animate-delay-0'}`}>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">{g.title}</h3>
                <p className="text-sm text-gray-700">{g.desc}</p>
                <div className="mt-3 inline-flex items-center text-accent-600 font-medium">
                  Lire le guide <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                </div>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
            {t('ctaSection.title')}
          </h2>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            {t('ctaSection.text')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaButton href="contact" variant="primary" className="text-lg px-8 py-4">
              {t('ctaSection.consultation')}
            </CtaButton>
            <a
              href="https://wa.me/33749235539"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              {t('ctaSection.whatsapp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;