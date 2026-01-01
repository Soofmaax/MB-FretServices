import type { FC } from 'react';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, pathForLang } from '../utils/paths';
import { useTranslation } from 'react-i18next';

type IncotermSubSection = {
  h3?: string;
  p?: string[];
  ul?: string[];
};

type IncotermSection = {
  h2?: string;
  p?: string[];
  ul?: string[];
  ol?: string[];
  sub?: IncotermSubSection[];
};

const PillarIncoterms: FC = () => {
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';
  const { t } = useTranslation(['pillar_incoterms', 'navbar']);

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
    'pillar_incoterms:title',
    'Incoterms 2020 — Complete guide (FOB, CIF…) | MB Fret Services'
  );
  const seoDescription = t(
    'pillar_incoterms:description',
    'Understand Incoterms 2020 for B2B sea freight: responsibilities, costs, risks, and practical cases on Congo/Angola routes.'
  );

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('navbar:home', 'Home'), item: SITE_URL + '/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('navbar:resources', 'Resources'),
        item:
          SITE_URL +
          (lang === 'fr'
            ? '/fr/documentation/incoterms-2020'
            : pathForLang('pillar_incoterms', lang)),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t('pillar_incoterms:breadcrumb_label', 'Incoterms 2020'),
      },
    ],
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t('pillar_incoterms:hero_h1'),
    author: { '@type': 'Organization', name: 'MB Fret Services' },
    publisher: { '@type': 'Organization', name: 'MB Fret Services' },
    inLanguage: langTag,
    mainEntityOfPage: SITE_URL + pathForLang('pillar_incoterms', lang),
  };

  const faqArray = t('pillar_incoterms:faq', {
    returnObjects: true,
  }) as Array<{ q: string; a: string }>;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqArray.map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  const sections = t('pillar_incoterms:sections', {
    returnObjects: true,
  }) as IncotermSection[];

  return (
    <div className="pt-16">
      <SEO title={seoTitle} description={seoDescription} jsonLd={[breadcrumb, articleLd, faqLd]} />

      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">{t('pillar_incoterms:hero_h1')}</h1>
          <p className="mt-4 text-xl text-gray-100">
            {t('pillar_incoterms:hero_intro')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LocalizedLink
              to="services/fret-maritime/france-congo"
              className="underline text-accent-300"
            >
              {t('pillar_incoterms:hero_links.congo')}
            </LocalizedLink>
            <LocalizedLink
              to="services/fret-maritime/france-angola"
              className="underline text-accent-300"
            >
              {t('navbar:route_france_angola', 'France ↔ Angola')}
            </LocalizedLink>
          </div>
        </div>
      </section>

      <article className="prose prose-lg max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sections.map((sec, idx) => (
          <div key={`sec-${idx}`}>
            {sec.h2 && <h2>{sec.h2}</h2>}
            {(sec.p || []).map((p, i) => <p key={`p-${idx}-${i}`}>{p}</p>)}
            {sec.ul && sec.ul.length > 0 && (
              <ul>
                {sec.ul.map((li, i) => (
                  <li key={`ul-${idx}-${i}`}>{li}</li>
                ))}
              </ul>
            )}
            {sec.ol && sec.ol.length > 0 && (
              <ol>
                {sec.ol.map((li: string, i: number) => (
                  <li key={`ol-${idx}-${i}`}>{li}</li>
                ))}
              </ol>
            )}
            {(sec.sub || []).map((sub: IncotermSubSection, i: number) => (
              <div key={`sub-${idx}-${i}`}>
                {sub.h3 && <h3>{sub.h3}</h3>}
                {(sub.p || []).map((p: string, j: number) => (
                  <p key={`subp-${idx}-${i}-${j}`}>{p}</p>
                ))}
                {sub.ul && sub.ul.length > 0 && (
                  <ul>
                    {sub.ul.map((li: string, j: number) => (
                      <li key={`subul-${idx}-${i}-${j}`}>{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="not-prose bg-blue-50 border-l-4 border-accent-500 p-4 rounded my-8">
          <p className="text-sm">
            {t('pillar_incoterms:links_block.guides_label', 'Related guides:')}&nbsp;
            <LocalizedLink to="guides/fcl-vs-lcl" className="text-accent-700 underline">
              {t(
                'pillar_incoterms:links_block.fcl_guide_label',
                'FCL vs LCL — how to decide?'
              )}
            </LocalizedLink>
            &nbsp;| {t('pillar_incoterms:links_block.routes_label', 'Route pages:')}&nbsp;
            <LocalizedLink
              to="services/fret-maritime/france-congo"
              className="text-accent-700 underline"
            >
              {t('pillar_incoterms:hero_links.congo')}
            </LocalizedLink>
            ,&nbsp;
            <LocalizedLink
              to="services/fret-maritime/france-angola"
              className="text-accent-700 underline"
            >
              {t('navbar:route_france_angola', 'France ↔ Angola')}
            </LocalizedLink>
            .
          </p>
        </div>

        <h2>{t('pillar_incoterms:faq_title', 'FAQ')}</h2>
        {faqArray.map((qa, i) => (
          <details key={`faq-${i}`}>
            <summary>{qa.q}</summary>
            <p>{qa.a}</p>
          </details>
        ))}

        <div className="not-prose mt-10">
          <h3 className="text-xl font-semibold text-primary-900">
            {t('pillar_incoterms:cta_title', 'Besoin d’aide pour choisir vos Incoterms ?')}
          </h3>
          <p className="text-gray-700">
            {t(
              'pillar_incoterms:cta_desc',
              'Nous vous aidons à aligner Incoterms, assurance et douane sur vos flux France ↔ Congo/Angola.'
            )}
          </p>
          <div className="mt-3 flex gap-3 flex-wrap">
            <LocalizedLink
              to="contact"
              state={{ source: 'pillar_incoterms' }}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-900 text-white hover:bg-primary-800 text-sm font-semibold"
            >
              {t('pillar_incoterms:cta_label', 'Parler à un expert Incoterms')}
            </LocalizedLink>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PillarIncoterms;