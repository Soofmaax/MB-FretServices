import type { FC, ComponentType } from 'react';
import { Ship, FileText, Shield, ArrowRight } from 'lucide-react';
import CtaButton from '../components/CtaButton';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';
import ResponsiveImage from '../components/ResponsiveImage';
import { getSiteUrl } from '../utils/siteUrl';
import { useTranslation } from 'react-i18next';
import { detectLangFromPath, pathForLang } from '../utils/paths';
import { useInViewAnimation } from '../components/ui/useInViewAnimation';

type ServiceKey = 'maritime' | 'customs' | 'insurance';

const Services: FC = () => {
  const { t } = useTranslation(['services', 'common', 'navbar']);
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';
  const siteUrl = getSiteUrl();

  const serviceDefs: Array<{ icon: ComponentType<{ size?: number | string; className?: string }>; key: ServiceKey }> = [
    { icon: Ship, key: 'maritime' },
    { icon: FileText, key: 'customs' },
    { icon: Shield, key: 'insurance' },
  ];

  const seoTitle = t(
    'services:seo.title',
    'Our services - Sea freight, customs and cargo insurance | MB Fret Services'
  );
  const seoDescription = t(
    'services:seo.description',
    'Discover our international transport services: sea freight in FCL/LCL containers on the France–Angola corridor, professional customs clearance and cargo insurance.'
  );

  const langTagMap: Record<string, string> = {
    fr: 'fr-FR',
    en: 'en-GB',
    pt: 'pt-PT',
    ar: 'ar',
    es: 'es-ES',
    tr: 'tr-TR',
    sw: 'sw-KE',
    de: 'de-DE',
    it: 'it-IT',
  };
  const langTag = langTagMap[lang] || 'fr-FR';

  const faqEntities =
    (t('services:faq', {
      returnObjects: true,
    }) as Array<{ q: string; a: string }>) || [];

  const { ref: heroRef, inView: heroInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: servicesRef, inView: servicesInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: routesRef, inView: routesInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: guidesRef, inView: guidesInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: ctaRef, inView: ctaInView } = useInViewAnimation<HTMLDivElement>();

  const faqLd =
    faqEntities.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqEntities.map((qa) => ({
            '@type': 'Question',
            name: qa.q,
            acceptedAnswer: { '@type': 'Answer', text: qa.a },
          })),
        }
      : null;

  return (
    <div className="pt-16">
      <SEO
        title={seoTitle}
        description={seoDescription}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: t('navbar:home', 'Accueil'),
                item: siteUrl + '/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: t('navbar:services', 'Services'),
                item: siteUrl + pathForLang('services', lang),
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              {
                '@type': 'Service',
                name: t('services:maritime.title', 'Sea Freight'),
                description: t(
                  'services:maritime.description',
                  'Our sea freight expertise lets us offer optimal solutions for large shipments to Africa and Asia. We handle all types of cargo with full tracking.'
                ),
                url: siteUrl + pathForLang('services_freight_maritime', lang),
              },
              {
                '@type': 'Service',
                name: t('services:customs.title', 'Customs Clearance'),
                description: t(
                  'services:customs.description',
                  'Our licensed customs brokers support you with all administrative formalities. We ensure regulatory compliance for your operations.'
                ),
              },
              {
                '@type': 'Service',
                name: t('services:insurance.title', 'Cargo Insurance'),
                description: t(
                  'services:insurance.description',
                  'Protect your investment with insurance solutions adapted to each transport mode. Full coverage from pickup to final delivery.'
                ),
              },
            ],
          },
          faqLd || undefined,
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${t('navbar:services', 'Services')} - MB Fret Services`,
            inLanguage: langTag,
          },
        ].filter(Boolean)}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={heroRef}
            className={`text-center transition-all duration-700 ${
              heroInView ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
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
        <div ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-700 ${
                    servicesInView
                      ? `animate-slide-up opacity-100 translate-y-0 ${
                          index === 0
                            ? 'animate-delay-0'
                            : index === 1
                            ? 'animate-delay-200'
                            : index === 2
                            ? 'animate-delay-400'
                            : 'animate-delay-600'
                        }`
                      : 'opacity-0 translate-y-4'
                  } ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
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
                        <LocalizedLink
                          to="services/fret-maritime"
                          className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium"
                        >
                          {t('maritime.more_link')}
                          <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                        </LocalizedLink>
                      </div>
                    )}
                    {def.key === 'customs' && (
                      <div className="mb-6">
                        <LocalizedLink
                          to="services/dedouanement"
                          className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium"
                        >
                          {t('customs.more_link', 'Learn more')}
                          <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                        </LocalizedLink>
                      </div>
                    )}
                    {def.key === 'insurance' && (
                      <div className="mb-6">
                        <LocalizedLink
                          to="services/assurance-cargo"
                          className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium"
                        >
                          {t('insurance.more_link', 'Insure your shipments')}
                          <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                        </LocalizedLink>
                      </div>
                    )}

                    <CtaButton href="contact" variant="primary">
                      {t('common:get_quote', 'Get a Quote')}
                    </CtaButton>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="relative rounded-xl overflow-hidden shadow-xl">
                      <ResponsiveImage
                        src={`https://images.pexels.com/photos/${
                          index === 0 ? '906982' : index === 1 ? '723240' : index === 2 ? '7681091' : '416978'
                        }/pexels-photo-${
                          index === 0 ? '906982' : index === 1 ? '723240' : index === 2 ? '7681091' : '416978'
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

      {/* Key Maritime Routes */}
      <section className="py-16 lg:py-24 bg-white">
        <div ref={routesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl md:text-4xl font-bold text-primary-900 mb-8 transition-all duration-700 ${
              routesInView ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {t('services:routesSection.title', 'Key routes')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                key: 'france_angola' as const,
                to: 'services/fret-maritime/france-angola',
                img: '906982',
              },
            ].map((r, i) => {
              const fallbackTitle = 'France ↔ Angola';
              const fallbackTeaser =
                'Sea freight France–Angola (FCL/LCL), departures from France/Benelux to Luanda with controlled lead times.';
              const title = t(`services:routesSection.cards.${r.key}.title`, fallbackTitle);
              const teaser = t(
                `services:routesSection.cards.${r.key}.teaser`,
                fallbackTeaser
              );
              const discover = t('services:routesSection.discover', 'Discover');

              return (
                <div
                  key={r.key}
                  className={`bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-700 ${
                    routesInView
                      ? `animate-slide-up opacity-100 translate-y-0 ${
                          i === 1 ? 'animate-delay-150' : 'animate-delay-0'
                        }`
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <LocalizedLink to={r.to} className="block group">
                    <div className="relative h-44">
                      <ResponsiveImage
                        src={`https://images.pexels.com/photos/${r.img}/pexels-photo-${r.img}.jpeg?auto=compress&cs=tinysrgb&w=800`}
                        alt={title}
                        width={800}
                        height={300}
                        className="w-full h-full object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"></div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-primary-900 mb-2 group-hover:text-accent-600 transition-colors">
                        {title}
                      </h3>
                      <p className="text-sm text-gray-700">{teaser}</p>
                      <div className="mt-3 inline-flex items-center text-accent-600 font-medium">
                        {discover} <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                      </div>
                    </div>
                  </LocalizedLink>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Guides & Resources */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div ref={guidesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl md:text-4xl font-bold text-primary-900 mb-8 transition-all duration-700 ${
              guidesInView ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {t('services:guidesSection.title', 'Guides & Resources')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { key: 'incoterms' as const, to: 'documentation/incoterms-2020' },
              { key: 'fcl_lcl' as const, to: 'guides/fcl-vs-lcl' },
            ].map((g, i) => {
              const title = t(`services:guidesSection.${g.key}.title`);
              const desc = t(`services:guidesSection.${g.key}.desc`);
              const read = t('services:guidesSection.read', 'Read the guide');

              return (
                <LocalizedLink
                  key={g.key}
                  to={g.to}
                  className={`block bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all duration-700 ${
                    guidesInView
                      ? `animate-slide-up opacity-100 translate-y-0 ${
                          i === 1 ? 'animate-delay-150' : 'animate-delay-0'
                        }`
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-700">{desc}</p>
                  <div className="mt-3 inline-flex items-center text-accent-600 font-medium">
                    {read} <ArrowRight size={16} className="ml-1" aria-hidden="true" />
                  </div>
                </LocalizedLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqEntities.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                {t('services:faq_title', 'FAQ')}
              </h2>
            </div>
            <div className="space-y-6">
              {faqEntities.map((qa, index) => (
                <details
                  key={index}
                  className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <summary className="cursor-pointer text-lg font-semibold text-primary-900">
                    {qa.q}
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed whitespace-pre-line">
                    {qa.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div
          ref={ctaRef}
          className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${
            ctaInView ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
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