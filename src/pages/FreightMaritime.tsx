import type { FC, ComponentType } from 'react';
import { Ship, Clock, Shield, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import CtaButton from '../components/CtaButton';
import SEO from '../components/SEO';
import ResponsiveImage from '../components/ResponsiveImage';
import { getSiteUrl } from '../utils/siteUrl';
import { useTranslation } from 'react-i18next';
import { detectLangFromPath, pathForLang } from '../utils/paths';

type Advantage = {
  icon: ComponentType<{ size?: number | string; className?: string; 'aria-hidden'?: boolean }>;
  title: string;
  description: string;
};
type Destination = { country: string; port: string; duration: string; frequency: string; departure: string };

const FreightMaritime: FC = () => {
  const SITE_URL = getSiteUrl();
  const { t } = useTranslation(['freight', 'navbar']);
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';

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

  const seoTitle = t(
    'freight:seo.title',
    "Sea Freight to Africa - FCL LCL Container Transport | MB Fret Services"
  );
  const seoDescription = t(
    'freight:seo.description',
    "Professional sea freight to Africa: Congo, Angola, Côte d'Ivoire. 20' and 40' containers, FCL and LCL. Free quote within 24h. 15 years of expertise."
  );

  const advData = t('freight:advantages', {
    returnObjects: true,
  }) as Array<{ title: string; description: string }>;

  const advantages: Advantage[] = [
    { icon: Ship, title: advData[0]?.title || '', description: advData[0]?.description || '' },
    { icon: Clock, title: advData[1]?.title || '', description: advData[1]?.description || '' },
    { icon: Shield, title: advData[2]?.title || '', description: advData[2]?.description || '' },
  ];

  const destinations = t('freight:destinations_list', { returnObjects: true }) as Destination[];

  const services = t('freight:services.list', { returnObjects: true }) as string[];

  const lcl = t('freight:lcl', {
    returnObjects: true,
  }) as {
    title?: string;
    subtitle?: string;
    blocks?: Array<{ title?: string; bullets?: string[] }>;
    cta_title?: string;
    cta_text?: string;
    cta_label?: string;
  };

  const lclBlocks = (lcl.blocks || []) as Array<{ title?: string; bullets?: string[] }>;

  const rawCosts = t('freight:costs', {
    returnObjects: true,
  }) as unknown;

  const costs =
    rawCosts && typeof rawCosts === 'object'
      ? (rawCosts as {
          title?: string;
          intro?: string;
          cards?: Array<{ title?: string; text?: string }>;
        })
      : { title: '', intro: '', cards: [] };

  const costCards = Array.isArray(costs.cards) ? costs.cards : [];

  const faqData = t('freight:faq', {
    returnObjects: true,
  }) as {
    title?: string;
    q1?: string;
    a1?: string;
    q2?: string;
    a2?: string;
    q3?: string;
    a3?: string;
  };

  return (
    <div className="pt-16">
      <SEO
        title={seoTitle}
        description={seoDescription}
        ogImage="/og-default.webp"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: t('navbar:home', 'Home'),
                item: SITE_URL + '/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: t('navbar:services', 'Services'),
                item: SITE_URL + pathForLang('services', lang),
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: t('freight:hero.title', 'Sea Freight to Africa'),
                item: SITE_URL + pathForLang('services_freight_maritime', lang),
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: t('freight:hero.title', 'Sea Freight to Africa'),
            serviceType: t('freight:service_type', 'Sea freight'),
            provider: {
              '@type': 'Organization',
              name: 'MB Fret Services',
              url: SITE_URL,
            },
            areaServed: [
        { '@type': 'Country', name: 'Congo' },
        { '@type': 'Country', name: 'Angola' },
      ],
            availableChannel: {
              '@type': 'ServiceChannel',
              serviceLocation: { '@type': 'Place', name: 'France and Europe' },
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              faqData?.q1 && faqData?.a1
                ? {
                    '@type': 'Question',
                    name: faqData.q1,
                    acceptedAnswer: { '@type': 'Answer', text: faqData.a1 },
                  }
                : null,
              faqData?.q2 && faqData?.a2
                ? {
                    '@type': 'Question',
                    name: faqData.q2,
                    acceptedAnswer: { '@type': 'Answer', text: faqData.a2 },
                  }
                : null,
              faqData?.q3 && faqData?.a3
                ? {
                    '@type': 'Question',
                    name: faqData.q3,
                    acceptedAnswer: { '@type': 'Answer', text: faqData.a3 },
                  }
                : null,
            ].filter(Boolean),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${t('freight:hero.title', 'Sea Freight to Africa')} - MB Fret Services`,
            inLanguage: langTag,
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <ResponsiveImage
            src="/images/hero-maritime.jpg"
            webpSrc="/images/hero-maritime.webp"
            avifSrc="/images/hero-maritime.avif"
            alt={t('freight:images.hero_alt', 'Sea freight containers')}
            width={1600}
            height={900}
            priority
            sizes="100vw"
            className="w-full h-full object-cover"
            type="image/jpeg"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <Ship size={48} className="text-accent-400 mr-4" aria-hidden="true" />
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {t('freight:hero.title')}
                </h1>
                <p className="text-xl md:text-2xl text-accent-400 font-medium">
                  {t('freight:hero.subtitle')}
                </p>
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl leading-relaxed">
              {t('freight:hero.intro')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <CtaButton href="contact" variant="primary" className="text-lg px-8 py-4">
                {t('freight:hero.cta_quote')}
              </CtaButton>
              <a
                href={`https://wa.me/33749235539?text=${encodeURIComponent(
                  t(
                    'freight:whatsapp.hero_quote_africa',
                    'Hello, I would like a quote for sea freight to Africa'
                  )
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
              >
                {t('freight:hero.cta_whatsapp')}
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
              {t('why.title')}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t('why.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 animate-slide-up ${index === 0 ? 'animate-delay-0' : index === 1 ? 'animate-delay-200' : 'animate-delay-400'}`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
                  <advantage.icon size={32} className="text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">{advantage.title}</h3>
                <p className="text-gray-700 leading-relaxed">{advantage.description}</p>
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
                {t('freight:services.title')}
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {t('freight:services.subtitle')}
              </p>

              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={20} className="text-accent-700 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <CtaButton href="contact" variant="primary">
                  {t('freight:services.cta')}
                </CtaButton>
              </div>
            </div>

            <div className="relative">
              <ResponsiveImage
                src="https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800"
                alt={t('freight:images.services_alt', 'Loading of sea freight containers')}
                width={800}
                height={533}
                className="w-full h-96 object-cover rounded-xl shadow-xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* LCL - Service de consolidation */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              {lcl.title || t('freight:hero.subtitle')}
            </h2>
            {lcl.subtitle && (
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                {lcl.subtitle}
              </p>
            )}
          </div>

          {lclBlocks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {lclBlocks.map((block, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
                >
                  {block.title && (
                    <h3 className="text-xl font-bold text-primary-900 mb-4">
                      {block.title}
                    </h3>
                  )}
                  {block.bullets && (
                    <ul className="space-y-3">
                      {block.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle
                            size={18}
                            className="text-accent-700 mr-3 mt-1 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span className="text-gray-700">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {lcl.cta_title && (
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">
                {lcl.cta_title}
              </h3>
              {lcl.cta_text && (
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {lcl.cta_text}
                </p>
              )}
              <CtaButton href="contact" variant="primary" className="px-8 py-4 text-lg">
                {lcl.cta_label || t('freight:services.cta')}
              </CtaButton>
            </div>
          )}
        </div>
      </section>

      {/* Coûts & méthodes de cotation */}
      {costCards.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                {costs.title}
              </h2>
              {costs.intro && (
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  {costs.intro}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {costCards.map((card, index) => (
                <div
                  key={card.title || index}
                  className="bg-gray-50 rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-slide-up"
                >
                  {card.title && (
                    <h3 className="text-xl font-bold text-primary-900 mb-4">
                      {card.title}
                    </h3>
                  )}
                  {card.text && (
                    <p className="text-gray-700 leading-relaxed">
                      {card.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Destinations principales */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              {t('freight:destinations.title')}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t('freight:destinations.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 animate-slide-up ${index === 0 ? 'animate-delay-0' : index === 1 ? 'animate-delay-150' : index === 2 ? 'animate-delay-300' : index === 3 ? 'animate-delay-450' : 'animate-delay-600'}`}
              >
                <div className="flex items-center mb-6">
                  <MapPin size={24} className="text-accent-700 mr-3" aria-hidden="true" />
                  <div>
                    <h3 className="text-2xl font-bold text-primary-900">{destination.country}</h3>
                    <p className="text-gray-700">
                      {t('freight:destinations.label_port', 'Port:')} {destination.port}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="text-sm text-gray-500">
                      {t('freight:destinations.label_duration')}
                    </span>
                    <p className="font-semibold text-primary-900">{destination.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      {t('freight:destinations.label_frequency')}
                    </span>
                    <p className="font-semibold text-primary-900">{destination.frequency}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-sm text-gray-500">
                    {t('freight:destinations.label_departure')}
                  </span>
                  <p className="font-semibold text-primary-900">{destination.departure}</p>
                </div>

                <CtaButton href="contact" variant="outline" className="w-full">
                  {t('freight:destinations.cta_prefix')}
                  {destination.country}
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
              {t('freight:faq.title')}
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-4">
                {faqData?.q1}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faqData?.a1}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-4">
                {faqData?.q2}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faqData?.a2}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-4">
                {faqData?.q3}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {faqData?.a3}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('freight:final.title')}
          </h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            {t('freight:final.text')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaButton href="contact" variant="primary" className="text-lg px-8 py-4">
              {t('freight:final.cta')}
            </CtaButton>
            <a
              href={`https://wa.me/33749235539?text=${encodeURIComponent(
                t(
                  'freight:whatsapp.final_quote',
                  'Hello, I would like a quote for sea freight'
                )
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              <ArrowRight size={20} className="mr-2" aria-hidden="true" />
              {t('freight:final.whatsapp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreightMaritime;