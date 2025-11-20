import type { FC } from 'react';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, pathForLang } from '../utils/paths';
import { useTranslation } from 'react-i18next';

const PillarIncoterms: FC = () => {
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';
  const { t } = useTranslation(['pillar_incoterms']);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Ressources', item: SITE_URL + (lang === 'fr' ? '/fr/documentation/incoterms-2020' : pathForLang('pillar_incoterms', lang)) },
      { '@type': 'ListItem', position: 3, name: 'Incoterms 2020' },
    ],
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t('pillar_incoterms:hero_h1'),
    author: { '@type': 'Organization', name: 'MB Fret Services' },
    publisher: { '@type': 'Organization', name: 'MB Fret Services' },
    mainEntityOfPage: SITE_URL + pathForLang('pillar_incoterms', lang),
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (t('pillar_incoterms:faq', { returnObjects: true }) as Array<{ q: string; a: string }>).map((qa) => ({
      '@type': 'Question',
      name: qa.q,
      acceptedAnswer: { '@type': 'Answer', text: qa.a },
    })),
  };

  const sections = t('pillar_incoterms:sections', { returnObjects: true }) as Array<any>;

  return (
    <div className="pt-16">
      <SEO
        title={t('pillar_incoterms:title')}
        description={t('pillar_incoterms:description')}
        jsonLd={[breadcrumb, articleLd, faqLd]}
      />

      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">{t('pillar_incoterms:hero_h1')}</h1>
          <p className="mt-4 text-xl text-gray-100">
            {t('pillar_incoterms:hero_intro')}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LocalizedLink to="services/fret-maritime/france-chine" className="underline text-accent-300">
              {t('pillar_incoterms:hero_links.china')}
            </LocalizedLink>
            <LocalizedLink to="services/fret-maritime/france-turquie" className="underline text-accent-300">
              {t('pillar_incoterms:hero_links.turkey')}
            </LocalizedLink>
            <LocalizedLink to="services/fret-maritime/france-congo" className="underline text-accent-300">
              {t('pillar_incoterms:hero_links.congo')}
            </LocalizedLink>
          </div>
        </div>
      </section>

      <article className="prose prose-lg max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sections.map((sec, idx) => (
          <div key={`sec-${idx}`}>
            {sec.h2 && <h2>{sec.h2}</h2>}
            {(sec.p || []).map((p: string, i: number) => <p key={`p-${idx}-${i}`}>{p}</p>)}
            {(sec.ul || []).length > 0 && (
              <ul>
                {sec.ul.map((li: string, i: number) => <li key={`ul-${idx}-${i}`}>{li}</li>)}
              </ul>
            )}
            {(sec.ol || []).length > 0 && (
              <ol>
                {sec.ol.map((li: string, i: number) => <li key={`ol-${idx}-${i}`}>{li}</li>)}
              </ol>
            )}
            {(sec.sub || []).map((sub: any, i: number) => (
              <div key={`sub-${idx}-${i}`}>
                {sub.h3 && <h3>{sub.h3}</h3>}
                {(sub.p || []).map((p: string, j: number) => <p key={`subp-${idx}-${i}-${j}`}>{p}</p>)}
                {(sub.ul || []).length > 0 && (
                  <ul>
                    {sub.ul.map((li: string, j: number) => <li key={`subul-${idx}-${i}-${j}`}>{li}</li>)}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}

        <div className="not-prose bg-blue-50 border-l-4 border-accent-500 p-4 rounded my-8">
          <p className="text-sm">
            Guides associés:&nbsp;
            <LocalizedLink to="guides/fcl-vs-lcl" className="text-accent-700 underline">
              FCL vs LCL — comment décider ?
            </LocalizedLink>
            &nbsp;| Pages routes:&nbsp;
            <LocalizedLink to="services/fret-maritime/france-chine" className="text-accent-700 underline">{t('pillar_incoterms:hero_links.china')}</LocalizedLink>
            ,&nbsp;
            <LocalizedLink to="services/fret-maritime/france-turquie" className="text-accent-700 underline">{t('pillar_incoterms:hero_links.turkey')}</LocalizedLink>
            ,&nbsp;
            <LocalizedLink to="services/fret-maritime/france-congo" className="text-accent-700 underline">{t('pillar_incoterms:hero_links.congo')}</LocalizedLink>.
          </p>
        </div>

        <h2>FAQ</h2>
        {(t('pillar_incoterms:faq', { returnObjects: true }) as Array<{ q: string; a: string }>).map((qa, i) => (
          <details key={`faq-${i}`}>
            <summary>{qa.q}</summary>
            <p>{qa.a}</p>
          </details>
        ))}
      </article>
    </div>
  );
};

export default PillarIncoterms;