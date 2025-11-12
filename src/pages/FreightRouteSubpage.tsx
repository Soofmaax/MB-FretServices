import type { FC } from 'react';
import SEO from '../components/SEO';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, keyFromPath, pathForLang, type RouteKey } from '../utils/paths';
import CtaButton from '../components/CtaButton';
import LocalizedLink from '../components/LocalizedLink';
import { useTranslation } from 'react-i18next';

type SubTopic = 'fcl_lcl' | 'customs' | 'checklist';
type Country = 'china' | 'congo' | 'turkey';

function resolveContextFromKey(k: RouteKey): { country: Country; sub: SubTopic; parentKey: RouteKey } | null {
  switch (k) {
    case 'services_freight_france_china_fcl_lcl':
      return { country: 'china', sub: 'fcl_lcl', parentKey: 'services_freight_france_china' };
    case 'services_freight_france_china_customs':
      return { country: 'china', sub: 'customs', parentKey: 'services_freight_france_china' };
    case 'services_freight_france_china_checklist':
      return { country: 'china', sub: 'checklist', parentKey: 'services_freight_france_china' };
    case 'services_freight_france_congo_fcl_lcl':
      return { country: 'congo', sub: 'fcl_lcl', parentKey: 'services_freight_france_congo' };
    case 'services_freight_france_congo_customs':
      return { country: 'congo', sub: 'customs', parentKey: 'services_freight_france_congo' };
    case 'services_freight_france_congo_checklist':
      return { country: 'congo', sub: 'checklist', parentKey: 'services_freight_france_congo' };
    case 'services_freight_france_turkey_fcl_lcl':
      return { country: 'turkey', sub: 'fcl_lcl', parentKey: 'services_freight_france_turkey' };
    case 'services_freight_france_turkey_customs':
      return { country: 'turkey', sub: 'customs', parentKey: 'services_freight_france_turkey' };
    case 'services_freight_france_turkey_checklist':
      return { country: 'turkey', sub: 'checklist', parentKey: 'services_freight_france_turkey' };
    default:
      return null;
  }
}

// Localized content will be loaded from routes_sub namespace

function buildJsonLd(siteUrl: string, langPath: string, parentUrl: string, h1: string, faqEntities: Array<{ name: string; text: string }>) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: siteUrl + '/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: siteUrl + langPath + '/services' },
      { '@type': 'ListItem', position: 3, name: 'Fret maritime', item: parentUrl },
      { '@type': 'ListItem', position: 4, name: h1, item: siteUrl + langPath + window.location.pathname.split(langPath)[1] },
    ],
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: h1,
    author: { '@type': 'Organization', name: 'MB Fret Services' },
    publisher: { '@type': 'Organization', name: 'MB Fret Services' },
    mainEntityOfPage: siteUrl + window.location.pathname,
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqEntities.map((e) => ({
      '@type': 'Question',
      name: e.name,
      acceptedAnswer: { '@type': 'Answer', text: e.text },
    })),
  };

  return [breadcrumb, article, faq];
}

function faqFor(country: Country, sub: SubTopic) {
  if (sub === 'fcl_lcl') {
    return [
      { name: 'Quel seuil pour basculer du LCL au FCL ?', text: 'Autour de 13–15 m³ selon ports/saison. Évaluez aussi valeur/risque/délais.' },
      { name: 'Le LCL est-il plus risqué ?', text: 'Il implique consolidation/déconsolidation. Emballage export + assurance ad valorem réduisent significativement le risque.' },
      { name: 'Peut-on mixer LCL et aérien ?', text: 'Oui, pour respecter un jalon critique. Nous calibrons un schéma multimodal adapté.' },
      { name: 'Quels conteneurs FCL existent ?', text: '20’, 40’, 40’HC; options Reefer/Open Top selon étude de faisabilité et nature des biens.' },
      { name: 'Comment estimer mon CBM ?', text: 'Longueur×Largeur×Hauteur×Quantité / 1 000 000. Utilisez notre calculateur CBM en ligne.' },
    ];
  }
  if (sub === 'customs') {
    const routeHint = country === 'china' ? 'Chine' : country === 'congo' ? 'Congo' : 'Turquie';
    return [
      { name: `Quels documents pour ${routeHint} ?`, text: 'Facture, packing list, BL, certificat d’origine si requis; autres certificats selon la marchandise.' },
      { name: 'Quel Incoterm choisir ?', text: 'FOB/CIF fréquents en maritime; DAP/DDP pour prise en charge étendue. Nous conseillons selon risque/contrôle/budget.' },
      { name: 'Pouvez-vous représenter en douane ?', text: 'Oui. Contrôle documentaire, droits & taxes, coordination avec le terminal.' },
      { name: 'Comment éviter les retards ?', text: 'Anticiper les cut-offs, valider les codes SH, qualité documentaire, échanges proactifs avec l’armateur.' },
      { name: 'L’assurance est-elle obligatoire ?', text: 'Recommandée ad valorem. Elle sécurise trésorerie et continuité d’activité en cas d’avarie/perte.' },
    ];
  }
  // checklist
  return [
    { name: 'Que vérifier en priorité ?', text: 'Facture/PL signées, BL (brouillon), certificats requis, coordonnées réceptionnaire, contraintes site.' },
    { name: 'Comment documenter l’emballage ?', text: 'Photos datées, matériaux adaptés, calage; joindre schémas si sensible.' },
    { name: 'Faut-il un RDV au port ?', text: 'Selon terminal. Nous coordonnons créneaux et consignes d’accès.' },
    { name: 'Quid des assurances ?', text: 'Souscrire ad valorem, préciser exclusions, conserver preuves et numéros de lot.' },
  ];
}

const FreightRouteSubpage: FC = () => {
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';
  const langPath = `/${lang}`;
  const { t } = useTranslation(['routes_sub']);

  const k = typeof window !== 'undefined' ? keyFromPath(window.location.pathname) : 'home';
  const ctx = resolveContextFromKey(k as RouteKey);
  if (!ctx) return null;

  const parentUrl = SITE_URL + pathForLang(ctx.parentKey, lang);
  const subData = t(`routes_sub:${ctx.country}.${ctx.sub}`, { returnObjects: true }) as any;
  const labels = t('routes_sub:labels', { returnObjects: true }) as Record<string, string>;
  const ogImage = `/images/og-${ctx.country}.webp`;
  const faqEntities = (subData?.faq || []) as Array<{ q: string; a: string }>;
  const jsonLd = typeof window !== 'undefined'
    ? buildJsonLd(SITE_URL, langPath, parentUrl, subData?.h1 || '', faqEntities.map((f: any) => ({ name: f.q, text: f.a })))
    : [];

  return (
    <div className="pt-16">
      <SEO
        title={subData?.title || ''}
        description={subData?.desc || ''}
        ogImage={ogImage}
        jsonLd={jsonLd as any}
      />

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-2">
            <a href={parentUrl} className="text-accent-600 hover:text-accent-700">{labels?.back_to_route || 'Retour à la page route'}</a>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">{subData?.h1}</h1>

          {(subData?.intro || []).map((p: string, i: number) => (
            <p key={`intro-${i}`} className="text-lg text-gray-700 mb-6">{p}</p>
          ))}

          {(subData?.sections || []).map((sec: any, idx: number) => (
            <div key={`sec-${idx}`} className="mb-4">
              {sec.h2 && <h2 className="text-2xl font-bold text-primary-900 mb-3">{sec.h2}</h2>}
              {sec.h3 && <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">{sec.h3}</h3>}
              {Array.isArray(sec.ul) && (
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {sec.ul.map((li: string, i: number) => <li key={`li-${idx}-${i}`}>{li}</li>)}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-6 flex flex-wrap gap-3">
            {ctx.sub === 'fcl_lcl' && (
              <>
                <CtaButton href="contact" variant="primary">{labels?.cta_compare_fcl_lcl || 'Comparer FCL/LCL avec un expert'}</CtaButton>
                <LocalizedLink to="guides/fcl-vs-lcl" className="text-accent-600 hover:text-accent-700 font-medium">{labels?.guide_fcl || 'Guide FCL vs LCL'}</LocalizedLink>
              </>
            )}
            {ctx.sub === 'customs' && (
              <>
                <CtaButton href="contact" variant="primary">{labels?.cta_customs_specialist || 'Parler à un spécialiste douane'}</CtaButton>
                <LocalizedLink to="documentation/incoterms-2020" className="text-accent-600 hover:text-accent-700 font-medium">{labels?.guide_incoterms || 'Incoterms 2020'}</LocalizedLink>
              </>
            )}
            {ctx.sub === 'checklist' && (
              <>
                <CtaButton href="contact" variant="primary">{labels?.cta_assistance || 'Demander un accompagnement'}</CtaButton>
                <LocalizedLink to="services/fret-maritime" className="text-accent-600 hover:text-accent-700 font-medium">{labels?.see_services || 'Voir les services'}</LocalizedLink>
              </>
            )}
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-primary-900 mb-3">{labels?.faq || 'FAQ'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqEntities.map((f, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-primary-900 mb-1">{f.q}</h3>
                  <p className="text-gray-700">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <CtaButton href="contact" variant="primary">{labels?.cta_quote || 'Demander un devis'}</CtaButton>
            <LocalizedLink to="documentation/incoterms-2020" className="text-accent-600 hover:text-accent-700 font-medium">
              {labels?.guide_incoterms || 'Incoterms 2020'}
            </LocalizedLink>
            <LocalizedLink to="guides/fcl-vs-lcl" className="text-accent-600 hover:text-accent-700 font-medium">
              {labels?.guide_fcl || 'Comprendre FCL vs LCL'}
            </LocalizedLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreightRouteSubpage;