import type { FC } from 'react';
import SEO from '../components/SEO';
import CtaButton from '../components/CtaButton';
import ResponsiveImage from '../components/ResponsiveImage';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, pathForLang } from '../utils/paths';
import { Shield, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Insurance: FC = () => {
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
    'freight:insurance.seo.title',
    'Cargo insurance — FCL/LCL containers to Congo and Angola | MB Fret Services'
  );
  const seoDescription = t(
    'freight:insurance.seo.description',
    'Ad valorem transport insurance for your FCL/LCL containers (international moves, B2B cargo, vehicles, motorbikes) on the France ↔ Congo and France ↔ Angola corridors. Claims handling and export packaging advice.'
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
        name: t('freight:insurance.breadcrumb_service_name', 'Cargo insurance'),
        item: SITE_URL + pathForLang('services_insurance', lang),
      },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t('freight:insurance.service_name', 'Cargo insurance – ad valorem coverage'),
    serviceType: t('freight:insurance.service_type', 'Transport insurance'),
    provider: { '@type': 'Organization', name: 'MB Fret Services', url: SITE_URL },
    areaServed: [
      { '@type': 'Place', name: 'France' },
      { '@type': 'Place', name: 'European Union' },
      { '@type': 'Place', name: 'Republic of the Congo' },
      { '@type': 'Place', name: 'Angola' },
    ],
  };

  const faqEntities = (t('freight:insurance.faq', { returnObjects: true }) as Array&lt;{ q: string; a: string }&gt;) || [];
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntities.map((qa) =&gt; ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  const benefits = (t('freight:insurance.benefits', { returnObjects: true }) as string[]) || [];

  const claims = t('freight:insurance.claims', {
    returnObjects: true,
  }) as { title?: string; steps?: string[] };

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
            name: `${t('freight:insurance.hero.title', 'Cargo insurance')} - MB Fret Services`,
            inLanguage: langTag,
          },
        ]}
      />
      <Helmet>
        <link
          rel="preload"
          as="image"
          href="/images/hero-insurance-1200.jpg"
          imagesrcset="/images/hero-insurance-800.jpg 800w, /images/hero-insurance-1200.jpg 1200w, /images/hero-insurance-1600.jpg 1600w"
          imagesizes="100vw"
        />
      </Helmet>

      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <ResponsiveImage
            src="/images/hero-insurance.jpg"
            webpSrc="/images/hero-insurance.webp"
            avifSrc="/images/hero-insurance.avif"
            alt={t('freight:insurance.images.hero_alt', 'Assurance cargo transport')}
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
            <Shield size={48} className="text-accent-400 mr-4" aria-hidden="true" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {t('freight:insurance.hero.title', 'Assurance cargo')}
            </h1>
          </div>
          <p className="text-xl text-gray-100">
            {t(
              'freight:insurance.hero.subtitle',
              'Protect your supply chain and cash flow with coverage adapted to your B2B flows.'
            )}
          </p>
          <div className="mt-6">
            <CtaButton href="contact" variant="primary">
              {t('freight:insurance.hero.cta_quote', 'Request coverage')}
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-900 mb-6">
            {t('freight:insurance.services.title', 'Benefits')}
          </h2>
          <div className="space-y-3">
            {benefits.map((b) => (
              <div key={b} className="flex items-start">
                <CheckCircle size={20} className="text-accent-700 mr-3 mt-1" aria-hidden="true" />
                <span className="text-gray-700">{b}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <CtaButton href="contact" variant="primary">
              {t('freight:insurance.services.cta_quote', 'Request coverage')}
            </CtaButton>
            <CtaButton href="contact" variant="secondary">
              {t('freight:insurance.services.cta_quote_secondary', 'Get a quote')}
            </CtaButton>
          </div>
        </div>
      </section>

      {claims?.steps && claims.steps.length > 0 && (
        <section className="py-12 lg:py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
              {claims.title || t('freight:insurance.claims.title')}
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              {claims.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </section>
      )}
    </div>
  );
};

export default Insurance;