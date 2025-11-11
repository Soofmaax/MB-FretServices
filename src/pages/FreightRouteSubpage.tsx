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

  const k = typeof window !== 'undefined' ? keyFromPath(window.location.pathname) : 'home';
  const ctx = resolveContextFromKey(k as RouteKey);
  if (!ctx) return null;

  const parentUrl = SITE_URL + pathForLang(ctx.parentKey, lang);
  const t = titles(ctx.country, ctx.sub);
  const ogImage = `/images/og-${ctx.country}.webp`;
  const faqEntities = faqFor(ctx.country, ctx.sub);
  const jsonLd = typeof window !== 'undefined' ? buildJsonLd(SITE_URL, langPath, parentUrl, t.h1, faqEntities) : [];

  return (
    <div className="pt-16">
      <SEO
        title={t.title}
        description={t.desc}
        ogImage={ogImage}
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
                FCL (conteneur complet) maximise le contrôle et limite les manipulations; LCL (groupage) optimise le budget pour des
                volumes inférieurs à ~13–15 m³. L’arbitrage doit considérer volume, valeur, délai et sensibilité de la marchandise.
              </p>
              <h2 className="text-2xl font-bold text-primary-900 mb-3">Seuils, coûts et risques</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Seuils indicatifs: 20’ ≈ 33 m³, 40’ ≈ 67 m³, 40’HC ≈ 76 m³</li>
                <li>Coût total: comparer FCL vs LCL (pré/post‑acheminement, THC, surcharges, assurance, douane)</li>
                <li>Risque: LCL implique consolidation; privilégier emballage export et assurance ad valorem</li>
              </ul>
              <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">Cas d’usage {ctx.country === 'china' ? 'Chine' : ctx.country === 'congo' ? 'Congo' : 'Turquie'}</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {ctx.country === 'china' && (
                  <>
                    <li>Programmes récurrents: FCL prioritaire; LCL pour prototypes/petites séries</li>
                    <li>Pics saisonniers (CNY, Q4): sécuriser capacité et anticiper cut‑offs</li>
                  </>
                )}
                {ctx.country === 'congo' && (
                  <>
                    <li>Colis/Palettes: LCL groupé vers Pointe‑Noire; visibilité jalons</li>
                    <li>Équipements sensibles: bascule FCL + préparation documentaire stricte</li>
                  </>
                )}
                {ctx.country === 'turkey' && (
                  <>
                    <li>Délais courts: FCL pour stabilité; LCL ou route pour ponctuels</li>
                    <li>Cross‑trade: verrouillage documentaire multi‑pays</li>
                  </>
                )}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <CtaButton href="contact" variant="primary">Comparer FCL/LCL avec un expert</CtaButton>
                <LocalizedLink to="guides/fcl-vs-lcl" className="text-accent-600 hover:text-accent-700 font-medium">Guide FCL vs LCL</LocalizedLink>
              </div>
            </>
          )}

          {ctx.sub === 'customs' && (
            <>
              <p className="text-lg text-gray-700 mb-6">
                Réussir la douane, c’est d’abord une documentation impeccable (facture, PL, BL, certificats). Nous pilotons la
                représentation, le calcul droits & taxes et la coordination terminal/armateur pour éviter retards et coûts additionnels.
              </p>
              <h2 className="text-2xl font-bold text-primary-900 mb-3">Documents & Incoterms</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Facture, packing list, BL, certificat d’origine (si requis), autres certificats spécifiques</li>
                <li>Incoterms: FOB/CIF fréquents; DAP/DDP pour prise en charge élargie et expérience porte‑à‑porte</li>
                <li>Codes SH précis: conditionnent droits & taxes, contrôles potentiels</li>
              </ul>
              <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">Pièges fréquents</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Incohérences entre documents (quantités, poids, descriptions)</li>
                <li>Cut‑offs manqués (documentaire/VGM) et absence de preuve d’emballage</li>
                <li>Assurance sous‑dimensionnée vs valeur réelle</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <CtaButton href="contact" variant="primary">Parler à un spécialiste douane</CtaButton>
                <LocalizedLink to="documentation/incoterms-2020" className="text-accent-600 hover:text-accent-700 font-medium">Incoterms 2020</LocalizedLink>
              </div>
            </>
          )}

          {ctx.sub === 'checklist' && (
            <>
              <p className="text-lg text-gray-700 mb-6">
                Suivez cette checklist pour fluidifier l’embarquement et la livraison. Elle couvre préparation, documents, assurance
                et coordination avec les parties prenantes.
              </p>
              <h2 className="text-2xl font-bold text-primary-900 mb-3">Avant l’expédition</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>CBM/poids estimés (outil CBM), choix FCL/LCL</li>
                <li>Port/service sélectionnés (direct vs transbordement)</li>
                <li>Emballage export (calage, cerclage, marquages)</li>
              </ul>
              <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">Documents</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Facture commerciale, packing list</li>
                <li>BL (brouillon à valider), certificat d’origine si requis</li>
                <li>Assurance ad valorem: police et preuves</li>
              </ul>
              <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">Au port et à l’arrivée</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Cut‑offs respectés, VGM transmis</li>
                <li>Coordination terminal, créneau de livraison, contraintes site</li>
                <li>Dédouanement, mainlevée et preuve de livraison</li>
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <CtaButton href="contact" variant="primary">Demander un accompagnement</CtaButton>
                <LocalizedLink to="services/fret-maritime" className="text-accent-600 hover:text-accent-700 font-medium">Voir les services</LocalizedLink>
              </div>
            </>
          )}

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-primary-900 mb-3">FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqEntities.map((f, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-primary-900 mb-1">{f.name}</h3>
                  <p className="text-gray-700">{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
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