import type { FC } from 'react';
import SEO from '../components/SEO';
import CtaButton from '../components/CtaButton';
import ResponsiveImage from '../components/ResponsiveImage';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, pathForLang } from '../utils/paths';
import { Plane, Clock, Shield, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const AirFreight: FC = () => {
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';
  const { t } = useTranslation(['freight', 'navbar']);

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

  const airSeoTitle = t(
    'freight:air.seo.title',
    'Air freight — Fast and secure | MB Fret Services'
  );
  const airSeoDescription = t(
    'freight:air.seo.description',
    'B2B air freight solutions: express, secure, traceable. Europe ↔ Africa/Asia. Door-to-door, cargo insurance, IATA compliance.'
  );

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('navbar:home', 'Home'), item: SITE_URL + '/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('navbar:services', 'Services'),
        item: SITE_URL + pathForLang('services', lang),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t('freight:air.breadcrumb_service_name', 'Air freight'),
        item: SITE_URL + pathForLang('services_air_freight', lang),
      },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('freight:air.service_name', 'B2B Air Freight – Express and secure'),
    serviceType: t('freight:air.service_type', 'Air freight'),
    provider: { '@type': 'Organization', name: 'MB Fret Services', url: SITE_URL },
    areaServed: [
      { '@type': 'Place', name: 'Europe' },
      { '@type': 'Place', name: 'Africa' },
      { '@type': 'Place', name: 'Asia' },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: '+33 7 49 23 55 39' },
    },
  };

  const faqEntities = (t('freight:air.faq', { returnObjects: true }) as Array<{ q: string; a: string }>) || [];
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntities.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  const features = (t('freight:air.features', { returnObjects: true }) as Array<{ title: string; text: string }>) || [];
  const services = (t('freight:air.services.list', { returnObjects: true }) as string[]) || [];

  return (
    <div className="pt-16">
      <SEO
        title={airSeoTitle}
        description={airSeoDescription}
        ogImage="/og-default.webp"
        jsonLd={[
          breadcrumb,
          serviceLd,
          faqLd,
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${t('freight:air.hero.title', 'Air freight')} - MB Fret Services`,
            inLanguage: langTag,
          },
        ]}
      />
      <Helmet>
        <link
          rel="preload"
          as="image"
          href="/images/hero-air-1200.jpg"
          imagesrcset="/images/hero-air-800.jpg 800w, /images/hero-air-1200.jpg 1200w, /images/hero-air-1600.jpg 1600w"
          imagesizes="100vw"
        />
      </Helmet>

      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <ResponsiveImage
            src="/images/hero-air.jpg"
            webpSrc="/images/hero-air.webp"
            avifSrc="/images/hero-air.avif"
            alt={t('freight:air.images.hero_alt', 'Air cargo aircraft')}
            width={1600}
            height={900}
            priority
            sizes="100vw"
            className="w-full h-full object-cover"
            type="image/jpeg"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Plane size={48} className="text-accent-400 mr-4" aria-hidden="true" />
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t('freight:air.hero.title', 'Air freight')}
              </h1>
              <p className="text-xl md:text-2xl text-accent-300 font-medium">
                {t('freight:air.hero.subtitle', 'Priority, reliability, security.')}
              </p>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl leading-relaxed">
            {t(
              'freight:air.hero.intro',
              'A fast and secure solution for urgent, sensitive or high-value shipments. We manage the entire chain end-to-end with real-time tracking.'
            )}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <CtaButton
              href="contact"
              variant="primary"
              className="text-lg px-8 py-4"
              state={{ source: 'service_air_freight' }}
            >
              {t('freight:air.hero.cta_quote', 'Request a quote')}
            </CtaButton>
            <a
              href="https://wa.me/33749235539"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              {t('freight:air.hero.cta_whatsapp', 'WhatsApp')}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`bg-white rounded-xl shadow p-6 animate-slide-up ${
                  i ? 'animate-delay-150' : 'animate-delay-0'
                }`}
              >
                <div className="flex items-center mb-4">
                  <f.icon size={24} className="text-accent-700 mr-3" aria-hidden="true" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {t('freight:air.services.title', 'Services')}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {t(
                'freight:air.services.intro',
                'We operate on major hubs (CDG, AMS, FRA, IST…) with express options, consolidation and ad valorem insurance.'
              )}
            </p>
            <div className="space-y-3">
              {services.map((s) => (
                <div className="flex items-start" key={s}>
                  <CheckCircle size={20} className="text-accent-700 mr-3 mt-1" aria-hidden="true" />
                  <span className="text-gray-700">{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <CtaButton
                href="contact"
                variant="primary"
                state={{ source: 'service_air_freight' }}
              >
                {t('freight:air.services.cta', 'Get a quote')}
              </CtaButton>
            </div>
          </div>
          <div className="relative">
            <ResponsiveImage
              src="https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt={t('freight:air.images.services_alt', 'Air freight loading')}
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