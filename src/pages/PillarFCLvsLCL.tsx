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

const PillarFCLvsLCL: FC = () => {
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';
  const { t } = useTranslation(['pillar_fcl_lcl', 'navbar']);

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

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('navbar:home', 'Accueil'), item: SITE_URL + '/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('navbar:guides', 'Guides'),
        item:
          SITE_URL +
          (lang === 'fr' ? '/fr/guides/fcl-vs-lcl' : pathForLang('pillar_fcl_lcl', lang)),
      },
      { '@type': 'ListItem', position: 3, name: 'FCL vs LCL' },
    ],
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t('pillar_fcl_lcl:hero_h1', 'FCL vs LCL — Méthode de décision'),
    author: { '@type': 'Organization', name: 'MB Fret Services' },
    publisher: { '@type': 'Organization', name: 'MB Fret Services' },
    inLanguage: langTag,
    mainEntityOfPage: SITE_URL + pathForLang('pillar_fcl_lcl', lang),
  };

  const faqEntities = (t('pillar_fcl_lcl:faq', { returnObjects: true }) as Array<{
    q: string;
    a: string;
  }>) || [];
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
    'pillar_fcl_lcl:title',
    'FCL vs LCL — Comment décider ? | MB Fret Services'
  );
  const seoDescription = t(
    'pillar_fcl_lcl:description',
    'Choisir entre FCL et LCL en B2B maritime: seuils 13–15 m³, sécurité, délais, coûts. Méthode de décision et cas d’usage sur les routes France–Congo et France–Angola.'
  );

  const sections = (t('pillar_fcl_lcl:sections', { returnObjects: true }) as Section[]) || [];

  const heroLinks = t('pillar_fcl_lcl:hero_links', {
    returnObjects: true,
  }) as { maritime: string; china: string; turkey: string; congo: string };

  return (
    <div className="pt-16">
      <SEO title={seoTitle} description={seoDescription} jsonLd={[breadcrumb, articleLd, faqLd]} />

      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">
            {t('pillar_fcl_lcl:hero_h1', 'FCL vs LCL — Méthode de décision')}
          </h1>
          <p className="mt-4 text-xl text-gray-100">
            {t(
              'pillar_fcl_lcl:hero_intro',
              'Optimisez le coût total, la sécurité et le time-to-market. Une méthode claire pour arbitrer selon votre volume, vos délais et la sensibilité de la marchandise.'
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LocalizedLink
              to="services/fret-maritime"
              className="underline text-accent-300"
            >
              {heroLinks?.maritime ?? 'Fret maritime'}
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
              {t('navbar:route_france_angola', 'France–Angola')}
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
            <h2>{t('pillar_fcl_lcl:faq_title', 'FAQ')}</h2>
            {faqEntities.map((qa, i) => (
              <details key={i}>
                <summary>{qa.q}</summary>
                <p>{qa.a}</p>
              </details>
            ))}
          </>
        )}

        <div className="not-prose mt-10">
          <h3 className="text-xl font-semibold text-primary-900">
            {t('pillar_fcl_lcl:cta_compare', 'Prêt à comparer FCL/LCL ?')}
          </h3>
          <p className="text-gray-700">
            {t(
              'pillar_fcl_lcl:cta_compare_desc',
              'Nos experts recommandent une option selon votre volume, votre risque et vos délais.'
            )}
          </p>
          <div className="mt-3 flex gap-3 flex-wrap">
            <LocalizedLink
              to="services/fret-maritime/france-congo"
              className="text-accent-700 underline"
            >
              {heroLinks?.congo ?? 'France–Congo'}
            </LocalizedLink>
            <LocalizedLink
              to="services/fret-maritime/france-angola"
              className="text-accent-700 underline"
            >
              {t('navbar:route_france_angola', 'France–Angola')}
            </LocalizedLink>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PillarFCLvsLCL;