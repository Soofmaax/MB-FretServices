import type { FC } from 'react';
import SEO from '../components/SEO';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, keyFromPath, pathForLang, type RouteKey } from '../utils/paths';
import CtaButton from '../components/CtaButton';
import LocalizedLink from '../components/LocalizedLink';

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

function titles(country: Country, sub: SubTopic) {
  const routeName = country === 'china' ? 'France ↔ Chine'
    : country === 'congo' ? 'France ↔ Congo'
    : 'France ↔ Turquie';

  if (sub === 'fcl_lcl') {
    return {
      h1: `FCL vs LCL — ${routeName}`,
      title: `FCL vs LCL sur ${routeName} — Choisir le bon mode | MB Fret Services`,
      desc: `Seuils volumétriques (~13–15 m³), sécurité, coûts. Comparez FCL et LCL sur l’axe ${routeName} et optimisez votre budget.`,
    };
  } else if (sub === 'customs') {
    return {
      h1: `Procédures douanières — ${routeName}`,
      title: `Douanes & documents — ${routeName} | MB Fret Services`,
      desc: `Documents, conformité et Incoterms sur ${routeName}. Réduisez les risques grâce à un contrôle documentaire rigoureux.`,
    };
  }
  return {
    h1: `Checklist documentaire — ${routeName}`,
    title: `Checklist documentaire — ${routeName} | MB Fret Services`,
    desc: `La liste de contrôle pour expédier sur ${routeName}: facture, packing list, BL, certificats et assurances.`,
  };
}

function buildJsonLd(siteUrl: string, langPath: string, parentUrl: string, h1: string) {
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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quel est le seuil pour préférer le FCL au LCL ?',
        acceptedAnswer: { '@type': 'Answer', text: 'À partir de ~13–15 m³, le FCL devient souvent plus économique et plus sûr que le LCL.' },
      },
      {
        '@type': 'Question',
        name: 'Quels documents éviter d’oublier ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Facture, packing list, BL, certificats d’origine/assurance selon la marchandise et la route.' },
      },
      {
        '@type': 'Question',
        name: 'Pouvez-vous assister sur la douane ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, contrôle documentaire, représentation en douane et paramétrage Incoterms adaptés.' },
      },
    ],
  };

  return [breadcrumb, article, faq];
}

const FreightRouteSubpage: FC = () => {
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';
  const langPath = `/${lang}`;

  const k = typeof window !== 'undefined' ? keyFromPath(window.location.pathname) : 'home';
  const ctx = resolveContextFromKey(k as RouteKey);
  if (!ctx) return null;

  const parentUrl = SITE_URL + pathForLang(ctx.parentKey, lang);
  const t = titles(ctx.country, ctx.sub);
  const jsonLd = typeof window !== 'undefined' ? buildJsonLd(SITE_URL, langPath, parentUrl, t.h1) : [];

  return (
    <div className="pt-16">
      <SEO
        title={t.title}
        description={t.desc}
        jsonLd={jsonLd as any}
      />

      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-2">
            <a href={parentUrl} className="text-accent-600 hover:text-accent-700">Retour à la page route</a>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">{t.h1}</h1>
          {ctx.sub === 'fcl_lcl' && (
            <>
              <p className="text-lg text-gray-700 mb-6">
                FCL (conteneur complet) offre sécurité et contrôle. LCL (groupage) optimise les coûts pour les volumes inférieurs à ~13–15 m³.
                Sur cette route, nous recommandons FCL dès que le volume ou la valeur justifie une sécurité accrue et des délais plus prévisibles.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Seuils indicatifs: 20’ ≈ 33 m³, 40’ ≈ 67 m³</li>
                <li>FCL: moins de manipulations, meilleur contrôle, assurance simplifiée</li>
                <li>LCL: coûts partagés, consolidation hebdomadaire selon ports</li>
              </ul>
            </>
          )}
          {ctx.sub === 'customs' && (
            <>
              <p className="text-lg text-gray-700 mb-6">
                Dédouanement: vérifiez facture, packing list, codes SH, certificats d’origine et règles spécifiques pays.
                Nous assurons la représentation et la conformité documentaire bout en bout.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Incoterms adaptés (FOB/CIF/DAP) selon votre tolérance au risque</li>
                <li>Anticipez droits & taxes et éventuels contrôles</li>
                <li>Synchronisation avec l’armateur et le terminal portuaire</li>
              </ul>
            </>
          )}
          {ctx.sub === 'checklist' && (
            <>
              <p className="text-lg text-gray-700 mb-6">
                Utilisez cette checklist pour fluidifier l’embarquement et éviter les retards:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Facture commerciale et packing list signées</li>
                <li>BL (à valider) et certificat d’origine si requis</li>
                <li>Assurance (ad valorem) et photos d’emballage</li>
                <li>Contact réceptionnaire et modalités de livraison</li>
              </ul>
            </>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <CtaButton href="contact" variant="primary">Demander un devis</CtaButton>
            <LocalizedLink to="documentation/incoterms-2020" className="text-accent-600 hover:text-accent-700 font-medium">
              Guide Incoterms 2020
            </LocalizedLink>
            <LocalizedLink to="guides/fcl-vs-lcl" className="text-accent-600 hover:text-accent-700 font-medium">
              Comprendre FCL vs LCL
            </LocalizedLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FreightRouteSubpage;