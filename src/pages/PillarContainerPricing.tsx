import type { FC } from 'react';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, pathForLang } from '../utils/paths';
import { useTranslation } from 'react-i18next';

type Section = {
  h2?: string;
  p?: string[];
  ul?: string[];
  ol?: string[];
  sub?: Array<{ h3: string; p: string[] }>;
};

const PillarContainerPricing: FC = () => {
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';
  const { t } = useTranslation(['pillar_container_prices', 'navbar']);

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
    zh: 'zh-CN',
  };
  const langTag = langTagMap[lang] || 'fr-FR';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('navbar:home', 'Accueil'),
        item: SITE_URL + '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('navbar:guides', 'Guides'),
        item: SITE_URL + pathForLang('pillar_fcl_lcl', lang).replace(/\/guides\/fcl-vs-lcl.*/, '/guides'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t(
          'pillar_container_prices:breadcrumb_label',
          "Prix d'un conteneur 20' / 40' vers le Congo et l’Angola"
        ),
        item: SITE_URL + pathForLang('pillar_container_prices', lang),
      },
    ],
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t(
      'pillar_container_prices:hero_h1',
      "Prix d'un conteneur 20' / 40' vers le Congo et l’Angola"
    ),
    author: { '@type': 'Organization', name: 'MB Fret Services' },
    publisher: { '@type': 'Organization', name: 'MB Fret Services' },
    inLanguage: langTag,
    mainEntityOfPage: SITE_URL + pathForLang('pillar_container_prices', lang),
  };

  const faqEntities =
    (t('pillar_container_prices:faq', {
      returnObjects: true,
    }) as Array<{ q: string; a: string }>) || [];
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntities.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  const seoTitle = t(
    'pillar_container_prices:title',
    "Prix d’un conteneur 20' / 40' vers le Congo et l’Angola | MB Fret Services"
  );
  const seoDescription = t(
    'pillar_container_prices:description',
    "Comprendre ce qui fait le prix d’un conteneur 20' ou 40' entre la France et l’Afrique centrale (Congo, Angola) et comment obtenir une cotation détaillée et réaliste."
  );

  const sections =
    (t('pillar_container_prices:sections', { returnObjects: true }) as Section[]) || [];

  const heroLinks = t('pillar_container_prices:hero_links', {
    returnObjects: true,
  }) as { maritime?: string; congo?: string; angola?: string };

  const ctaTitle = t(
    'pillar_container_prices:cta_title',
    "Prêt à construire votre budget conteneur vers le Congo ou l’Angola ?"
  );
  const ctaDesc = t(
    'pillar_container_prices:cta_desc',
    'Transmettez-nous votre projet (volume approximatif, type de biens, départ et destination). Nous vous remettons une cotation détaillée et lisible pour vos conteneurs 20’/40’, en LCL ou FCL.'
  );
  const ctaLabel = t(
    'pillar_container_prices:cta_label',
    "Demander une étude de prix"
  );

  return (
    <div className="pt-16">
      <SEO title={seoTitle} description={seoDescription} jsonLd={[breadcrumb, articleLd, faqLd]} />

      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">
            {t(
              'pillar_container_prices:hero_h1',
              "Prix d'un conteneur 20' / 40' vers le Congo et l’Angola"
            )}
          </h1>
          <p className="mt-4 text-xl text-gray-100">
            {t(
              'pillar_container_prices:hero_intro',
              "Comprendre ce qui fait le prix d’un conteneur 20' ou 40' entre la France et l’Afrique centrale (Congo, Angola) et comment obtenir une cotation détaillée et réaliste."
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LocalizedLink to="services/fret-maritime" className="underline text-accent-300">
              {heroLinks?.maritime ?? t('navbar:services', 'Services')}
            </LocalizedLink>
            <LocalizedLink
              to="services/fret-maritime/france-congo"
              className="underline text-accent-300"
            >
              {heroLinks?.congo ?? 'France–Congo'}
            </LocalizedLink>
            <LocalizedLink
              to="services/fret-maritime/france-angola"
              className="underline text-accent-300"
            >
              {heroLinks?.angola ?? t('navbar:route_france_angola', 'France–Angola')}
            </LocalizedLink>
          </div>
        </div>
      </section>

      <article className="prose prose-lg max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sections.map((section, idx) => (
          <div key={idx}>
            {section.h2 && <h2>{section.h2}</h2>}
            {section.p?.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            {section.ul && (
              <ul>
                {section.ul.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {section.ol && (
              <ol>
                {section.ol.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            )}
            {section.sub?.map((sub, i) => (
              <div key={i}>
                <h3>{sub.h3}</h3>
                {sub.p.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>
        ))}

        {faqEntities.length > 0 && (
          <>
            <h2>{t('pillar_container_prices:faq_title', 'FAQ')}</h2>
            {faqEntities.map((qa, i) => (
              <details key={i}>
                <summary>{qa.q}</summary>
                <p>{qa.a}</p>
              </details>
            ))}
          </>
        )}

        <div className="not-prose mt-10">
          <h3 className="text-xl font-semibold text-primary-900">{ctaTitle}</h3>
          <p className="text-gray-700">{ctaDesc}</p>
          <div className="mt-3 flex gap-3 flex-wrap">
            <LocalizedLink
              to="contact"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-900 text-white hover:bg-primary-800 text-sm font-semibold"
            >
              {ctaLabel}
            </LocalizedLink>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PillarContainerPricing;