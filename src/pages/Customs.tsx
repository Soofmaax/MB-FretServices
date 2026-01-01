import type { FC } from 'react';
import SEO from '../components/SEO';
import CtaButton from '../components/CtaButton';
import ResponsiveImage from '../components/ResponsiveImage';
import LocalizedLink from '../components/LocalizedLink';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, pathForLang } from '../utils/paths';
import { FileText, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Customs: FC = () => {
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

  const seoTitle = t(
    'freight:customs.seo.title',
    'Dédouanement & conformité — Flux conteneurs France ↔ Afrique (Congo, Angola) | MB Fret Services'
  );
  const seoDescription = t(
    'freight:customs.seo.description',
    'Dédouanement import/export pour vos conteneurs FCL/LCL, représentation en douane et calcul des droits & taxes sur vos flux France ↔ Afrique (Congo, Angola). Assistance documentaire, Incoterms et conformité sur toute la chaîne.'
  );

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('navbar:home', 'Accueil'), item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: t('navbar:services', 'Services'), item: SITE_URL + pathForLang('services', lang) },
      {
        '@type': 'ListItem',
        position: 3,
        name: t('freight:customs.breadcrumb_service_name', 'Dédouanement'),
        item: SITE_URL + pathForLang('services_customs', lang),
      },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('freight:customs.service_name', 'Dédouanement & conformité import/export'),
    serviceType: t('freight:customs.service_type', 'Dédouanement'),
    provider: { '@type': 'Organization', name: 'MB Fret Services', url: SITE_URL },
    areaServed: [
      { '@type': 'Place', name: 'France' },
      { '@type': 'Place', name: 'European Union' },
      { '@type': 'Place', name: 'Republic of the Congo' },
      { '@type': 'Place', name: 'Angola' },
    ],
  };

  const faqEntities = (t('freight:customs.faq', { returnObjects: true }) as Array<{ q: string; a: string }>) || [];
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntities.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  const points = (t('freight:customs.points', { returnObjects: true }) as string[]) || [];

  return (
    <div className="pt-16">
      <SEO
        title={seoTitle}
        description={seoDescription}
        ogImage="/og-default.webp"
        jsonLd={[
          breadcrumb,
          serviceLd,
          faqLd,
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${t('freight:customs.hero.title', 'Dédouanement')} - MB Fret Services`,
            inLanguage: langTag,
          },
        ]}
      />
      <Helmet>
        <link
          rel="preload"
          as="image"
          href="/images/hero-customs-1200.jpg"
          imageSrcSet="/images/hero-customs-800.jpg 800w, /images/hero-customs-1200.jpg 1200w, /images/hero-customs-1600.jpg 1600w"
          imageSizes="100vw"
        />
      </Helmet>

      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <ResponsiveImage
            src="/images/hero-customs.jpg"
            webpSrc="/images/hero-customs.webp"
            avifSrc="/images/hero-customs.avif"
            alt={t('freight:customs.images.hero_alt', 'Dédouanement et formalités documentaires')}
            width={1600}
            height={900}
            priority
            sizes="100vw"
            className="w-full h-full object-cover"
            type="image/jpeg"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <FileText size={48} className="text-accent-400 mr-4" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('freight:customs.hero.title', 'Dédouanement')}
            </h1>
          </div>
          <p className="text-xl text-gray-100">
            {t(
              'freight:customs.hero.subtitle',
              'Sécurisez vos flux avec un pilotage documentaire rigoureux et une représentation en douane efficace.'
            )}
          </p>
          <div className="mt-6">
            <CtaButton
              href="contact"
              variant="primary"
              state={{ source: 'service_customs' }}
            >
              {t('freight:customs.hero.cta_quote', 'Parler à un expert')}
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-900 mb-6">
            {t('freight:customs.services.title', 'Prestations')}
          </h2>
          <div className="space-y-3">
            {points.map((p) => (
              <div key={p} className="flex items-start">
                <CheckCircle size={20} className="text-accent-700 mr-3 mt-1" aria-hidden="true" />
                <span className="text-gray-700">{p}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-2">
            <CtaButton href="contact" variant="primary">
              {t('freight:customs.services.cta', 'Obtenir une estimation')}
            </CtaButton>
            <p className="text-sm text-gray-600">
              {t(
                'freight:customs.links.maritime_hint',
                'Need to combine customs clearance with sea freight and cargo insurance on the same corridor?'
              )}{' '}
              <LocalizedLink
                to={pathForLang('services_freight_maritime', lang)}
                className="text-accent-700 hover:text-accent-800 font-medium"
              >
                {t('freight:customs.links.maritime', 'Sea freight France–Africa (Congo, Angola)')}
              </LocalizedLink>
              {' • '}
              <LocalizedLink
                to={pathForLang('services_insurance', lang)}
                className="text-accent-700 hover:text-accent-800 font-medium"
              >
                {t('freight:customs.links.insurance', 'Cargo insurance for FCL/LCL containers')}
              </LocalizedLink>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customs;