import type { FC } from 'react';
import SEO from '../components/SEO';
import CtaButton from '../components/CtaButton';
import ResponsiveImage from '../components/ResponsiveImage';
import { getSiteUrl } from '../utils/siteUrl';
import { keyFromPath, detectLangFromPath, pathForLang } from '../utils/paths';
import CBMCalculator from '../components/CBMCalculator';
import QuoteForm from '../components/QuoteForm';
import LocalizedLink from '../components/LocalizedLink';
import { Helmet } from 'react-helmet-async';

type RouteKey =
  | 'services_freight_france_china'
  | 'services_freight_france_congo'
  | 'services_freight_france_turkey';

function detectRouteKey(): RouteKey | null {
  if (typeof window === 'undefined') return null;
  const k = keyFromPath(window.location.pathname);
  if (
    k === 'services_freight_france_china' ||
    k === 'services_freight_france_congo' ||
    k === 'services_freight_france_turkey'
  ) {
    return k;
  }
  return null;
}

const contentMap: Record<
  RouteKey,
  {
    title: string;
    subtitle: string;
    heroBase: string;
    ports: { from: string[]; to: string[] };
    transit: string;
    faq: Array<{ q: string; a: string }>;
    areaServed: Array<{ '@type': 'Country'; name: string }>;
  }
> = {
  services_freight_france_china: {
    title: "Fret maritime France ↔ Chine (FCL & LCL)",
    subtitle:
      "Solutions FCL/LCL fiables entre les principaux ports français (Le Havre, Marseille-Fos, Dunkerque) et les hubs chinois (Shanghai, Ningbo, Shenzhen, Qingdao).",
    heroBase: 'hero-china',
    ports: {
      from: ['Le Havre', 'Marseille-Fos', 'Dunkerque'],
      to: ['Shanghai', 'Ningbo', 'Shenzhen', 'Qingdao'],
    },
    transit: "Délais indicatifs: 35–50 jours selon l'itinéraire, la saison et la congestion.",
    faq: [
      {
        q: 'FCL ou LCL: que choisir sur l’axe France–Chine ?',
        a: "Au‑delà de ~13–15 m³, le FCL est souvent plus économique et plus sûr (moins de manipulations). En‑dessous, le LCL reste pertinent pour optimiser le budget.",
      },
      {
        q: 'Quels Incoterms privilégier (FOB/CIF/DAP/DDP) ?',
        a: "FOB/CIF restent courants sur la Chine; DAP/DDP offrent une prise en charge élargie. Le choix dépend du contrôle voulu et du profil de risque.",
      },
      {
        q: 'Gérez‑vous la documentation douanière ?',
        a: "Oui: BL, facture commerciale, liste de colisage, certificats éventuels; plus contrôle conformité et assistance dédouanement.",
      },
      {
        q: 'Le fret ferroviaire peut‑il remplacer le maritime ?',
        a: "Pour certains corridors, le rail offre ~18–22 jours de transit. C’est un compromis vitesse/coût intéressant entre l’aérien et le maritime.",
      },
      {
        q: 'Quelles périodes sont les plus tendues ?',
        a: "Le Nouvel An chinois et le Q4 avant Noël. Mieux vaut réserver en amont et conserver des alternatives de service.",
      },
      {
        q: 'Proposez‑vous une assurance cargo ?',
        a: "Oui, couverture ad valorem du départ à la livraison, avec conseils d’emballage pour réduire le risque.",
      },
    ],
    areaServed: [{ '@type': 'Country', name: 'France' }, { '@type': 'Country', name: 'China' }],
  },
  services_freight_france_congo: {
    title: "Fret maritime France ↔ Congo (FCL & LCL)",
    subtitle:
      "Groupage LCL et conteneurs complets vers Pointe‑Noire, avec ramassage B2B en France (IDF, Lyon, Marseille) et accompagnement documentaire.",
    heroBase: 'hero-congo',
    ports: {
      from: ['Le Havre', 'Marseille-Fos'],
      to: ['Pointe‑Noire'],
    },
    transit: 'Délais indicatifs: 20–30 jours selon départs, escales et saison.',
    faq: [
      {
        q: 'Le LCL est‑il adapté pour le Congo ?',
        a: "Oui, le groupage est pertinent pour colis/volumes modestes. Nous opérons des consolidations régulières avec visibilité sur les jalons.",
      },
      {
        q: 'Assurez‑vous le ramassage et l’emballage ?',
        a: "Ramassage B2B dans les hubs français; emballage export pour limiter les avaries et respecter les exigences portuaires.",
      },
      {
        q: 'Suivi et notifications: quel niveau de visibilité ?',
        a: "Suivi en temps réel, mises à jour aux étapes clés (embarquement, transit, arrivée) et relances proactives.",
      },
      {
        q: 'Quelles pièces sont requises à l’import au Congo ?',
        a: "BL, facture, PL, certificat d’origine si requis, et documents spécifiques selon la marchandise. Assistance au dédouanement disponible.",
      },
      {
        q: 'Recommandez‑vous une assurance ?',
        a: "Oui, une police ad valorem est conseillée. Nous calibrons la couverture selon la valeur et la sensibilité des biens.",
      },
      {
        q: 'FCL vs LCL vers Pointe‑Noire: seuil de bascule ?',
        a: "Autour de 13–15 m³, le FCL devient souvent compétitif et plus prévisible; en‑dessous, le LCL reste intéressant.",
      },
    ],
    areaServed: [{ '@type': 'Country', name: 'France' }, { '@type': 'Country', name: 'Congo' }],
  },
  services_freight_france_turkey: {
    title: "Fret maritime France ↔ Turquie (FCL & LCL)",
    subtitle:
      "Liaisons régulières avec Istanbul, Izmir et Mersin. Options multimodales Mer/Route/Air pour des délais courts et une planification souple.",
    heroBase: 'hero-turkey',
    ports: {
      from: ['Marseille-Fos', 'Le Havre'],
      to: ['Istanbul', 'Izmir', 'Mersin'],
    },
    transit: 'Délais indicatifs: 7–15 jours selon port et saison.',
    faq: [
      {
        q: 'Quelles sont les forces du corridor France–Turquie ?',
        a: "Délais courts, fréquences élevées, bonnes alternatives multimodales. Idéal pour flux réguliers et chaînes d’approvisionnement réactives.",
      },
      {
        q: 'Proposez‑vous des schémas multimodaux ?',
        a: "Oui: Mer/Route pour optimiser le coût; recours à l’aérien en cas d’urgence; orchestration selon vos contraintes.",
      },
      {
        q: 'Le cross‑trade est‑il possible (ex: Chine→Turquie→Europe/Afrique) ?',
        a: "Oui, étude au cas par cas avec verrouillage documentaire et sélection d’armateurs/partenaires.",
      },
      {
        q: 'Quels documents et Incoterms recommandez‑vous ?',
        a: "BL, facture, PL; Incoterms au choix (FOB/CIF/DAP/DDP) selon partage des responsabilités et du risque.",
      },
      {
        q: 'FCL vs LCL sur la Turquie: que privilégier ?',
        a: "FCL pour volumes significatifs et délais plus stables; LCL compétitif pour petits envois ou flux irréguliers.",
      },
      {
        q: 'Assurance et gestion des risques ?',
        a: "Assurance ad valorem recommandée; conseils d’emballage et préparation documentaire pour éviter litiges et retards.",
      },
    ],
    areaServed: [{ '@type': 'Country', name: 'France' }, { '@type': 'Country', name: 'Turkey' }],
  },
};

const FreightRoute: FC = () => {
  const routeKey = detectRouteKey();
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';

  if (!routeKey) {
    return null;
  }

  const c = contentMap[routeKey];
  const ogImagePath = `/images/og-${c.heroBase.replace('hero-', '')}.webp`;
  const routeLabel =
    routeKey === 'services_freight_france_china'
      ? 'France ↔ Chine'
      : routeKey === 'services_freight_france_congo'
      ? 'France ↔ Congo'
      : 'France ↔ Turquie';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: SITE_URL + pathForLang('services', lang) },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Fret maritime',
        item: SITE_URL + pathForLang('services_freight_maritime', lang),
      },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: c.title,
    serviceType: 'Fret maritime',
    areaServed: c.areaServed,
    provider: {
      '@type': 'Organization',
      name: 'MB Fret Services',
      url: SITE_URL,
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="pt-16">
      <SEO
        title={`${c.title} — Devis Rapide & Délais Garantis | MB Fret Services`}
        description={`${c.subtitle} ${c.transit} Devis sous 24h, suivi 24/7, accompagnement douanier.`}
        ogImage={ogImagePath}
        jsonLd={[breadcrumb, serviceLd, faqLd]}
      />
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={`/images/${c.heroBase}-1200.jpg`}
          imagesrcset={`/images/${c.heroBase}-800.jpg 800w, /images/${c.heroBase}-1200.jpg 1200w, /images/${c.heroBase}-1600.jpg 1600w`}
          imagesizes="100vw"
        />
      </Helmet>

      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <ResponsiveImage
            src={`/images/${c.heroBase}.jpg`}
            webpSrc={`/images/${c.heroBase}.webp`}
            avifSrc={`/images/${c.heroBase}.avif`}
            alt={c.title}
            width={1600}
            height={900}
            sizes="100vw"
            priority
            className="w-full h-full object-cover"
            type="image/jpeg"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{c.title}</h1>
          <p className="text-xl md:text-2xl text-accent-300 font-medium mt-2">{c.subtitle}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <CtaButton href="contact" variant="primary" className="text-lg px-8 py-4">
              Demander un devis
            </CtaButton>
            <a
              href="https://wa.me/33749235539"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              Nous contacter via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">Ports & délais</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Départs France:</strong> {c.ports.from.join(', ')}
              </p>
              <p>
                <strong>Arrivées:</strong> {c.ports.to.join(', ')}
              </p>
              <p>
                <strong>Transit:</strong> {c.transit}
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 mt-2"></span>
                  Suivi en temps réel et visibilité des jalons.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 mt-2"></span>
                  Dédouanement et conformité documentaire.
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 mt-2"></span>
                  Assurance cargo ad valorem (optionnelle).
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <QuoteForm defaultRoute={routeKey} />
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-xl p-6 shadow">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">Calculateur CBM (Volume)</h3>
              <CBMCalculator />
            </div>
            <p className="text-sm text-gray-500 mt-3">
              À titre indicatif: 20’ ≈ 33 m³, 40’ ≈ 67 m³. Les tolérances et limites de poids/volume dépendent de
              l’armateur et du service.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Coûts & modes / Douane / Assurance / USP */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">Coûts & modes (FCL/LCL) — {routeLabel}</h2>
              {routeKey === 'services_freight_france_china' && (
                <>
                  <p className="text-lg text-gray-700 mb-4">
                    Sur l’axe {routeLabel}, le FCL devient souvent optimal au‑delà d’environ 13–15 m³: moins de manipulations, sécurité renforcée et délais plus stables.
                    En‑dessous, le LCL (groupage) est un bon levier pour contenir les coûts.
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    Les prix varient selon la saison, l’armateur et la charge des navires (BAF/CAF/PSS). Utilisez le Calculateur CBM et demandez un devis pour une
                    estimation transparente et à jour.
                  </p>
                </>
              )}
              {routeKey === 'services_freight_france_congo' && (
                <>
                  <p className="text-lg text-gray-700 mb-4">
                    Vers Pointe‑Noire, le groupage LCL est très pertinent pour les petits volumes et colis B2B. Au‑delà de ~13–15 m³, le FCL devient progressivement
                    plus compétitif et plus prévisible.
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    Les coûts tiennent compte des surcharges maritimes et des opérations portuaires. Nous vous guidons sur le meilleur schéma selon le budget et l’échéance.
                  </p>
                </>
              )}
              {routeKey === 'services_freight_france_turkey' && (
                <>
                  <p className="text-lg text-gray-700 mb-4">
                    {routeLabel} bénéficie de délais courts et de fréquences élevées. FCL pour volumes consolidés et régularité; LCL reste une alternative pragmatique
                    pour des flux irréguliers.
                  </p>
                  <p className="text-lg text-gray-700 mb-4">
                    En cas d’urgence, des options multimodales (Mer/Route/Air) permettent de respecter des jalons critiques sans exploser les coûts.
                  </p>
                </>
              )}

              <div className="mt-6">
                <CtaButton href="contact" variant="primary">Demander un devis</CtaButton>
                <LocalizedLink to="guides/fcl-vs-lcl" className="ml-4 text-accent-600 hover:text-accent-700 font-medium">Comprendre FCL vs LCL</LocalizedLink>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-2xl font-bold text-primary-900 mb-4">Douane & documentation</h3>
                {routeKey === 'services_freight_france_china' && (
                  <p className="text-gray-700 mb-4">
                    Nous gérons BL, facture, liste de colisage, certificats d’origine (si requis) et contrôles conformité. Incoterms courants: FOB/CIF; DAP/DDP pour
                    une prise en charge élargie. Assistance dédouanement incluse.
                  </p>
                )}
                {routeKey === 'services_freight_france_congo' && (
                  <p className="text-gray-700 mb-4">
                    Contrôle documentaire rigoureux: facture, PL, BL, certificat d’origine si requis, et pièces spécifiques à la marchandise. Représentation en douane
                    et accompagnement sur les droits & taxes.
                  </p>
                )}
                {routeKey === 'services_freight_france_turkey' && (
                  <p className="text-gray-700 mb-4">
                    BL, facture, PL; Incoterms adaptés (FOB/CIF/DAP/DDP) selon partage des responsabilités. Paramétrage documentaire et coordination portuaire
                    pour éviter retards.
                  </p>
                )}

                <h4 className="text-lg font-semibold text-primary-900 mb-2">Assurance & risques</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Assurance cargo ad valorem: couverture du départ à la livraison</li>
                  <li>Conseils d’emballage export pour réduire avaries et litiges</li>
                  <li>Visibilité des jalons et relances proactives</li>
                </ul>

                <div className="mt-6">
                  <LocalizedLink to="documentation/incoterms-2020" className="text-accent-600 hover:text-accent-700 font-medium">
                    Guide Incoterms 2020
                  </LocalizedLink>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-primary-900 mb-4">Pourquoi nous choisir sur {routeLabel}</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {routeKey === 'services_freight_france_china' && (
                  <>
                    <li>Planification sur pics (CNY, Q4) et alternatives de service</li>
                    <li>Options rail en complément pour gagner du temps quand nécessaire</li>
                    <li>Réseau d’armateurs et hubs pour lisser les congestions</li>
                  </>
                )}
                {routeKey === 'services_freight_france_congo' && (
                  <>
                    <li>Forte expertise LCL/colis vers Pointe‑Noire avec consolidations régulières</li>
                    <li>Ramassage B2B dans les principaux hubs français</li>
                    <li>Accompagnement documentaire et dédouanement local</li>
                  </>
                )}
                {routeKey === 'services_freight_france_turkey' && (
                  <>
                    <li>Délais courts et orchestration multimodale (Mer/Route/Air)</li>
                    <li>Études cross‑trade et verrouillage documentaire</li>
                    <li>Suivi 24/7 et communication réactive</li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary-900 mb-4">Services clés</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>FCL: 20’, 40’, 40’HC; options Reefer/Open Top selon étude</li>
                <li>LCL (groupage): départs réguliers, visibilité jalons</li>
                <li>Pré/Post‑acheminement (Route/Fer) selon budget et délais</li>
                <li>Gestion documentaire: BL, facture, PL, certificats</li>
                <li>Assurance ad valorem, conseils d’emballage</li>
              </ul>
              <div className="mt-6">
                <CtaButton href="contact" variant="primary">Obtenir un devis</CtaButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Étapes, Incoterms, Cas d'usage, Checklist (contenu étendu) */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">Étapes opérationnelles et bonnes pratiques</h2>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                <li>Qualification du besoin (volume CBM/poids, sensibilité marchandise, Incoterm souhaité)</li>
                <li>Choix du port et du service (direct/transbordement), arbitrage FCL/LCL</li>
                <li>Préparation documentaire (facture, PL, certificats) et conformité (codes SH)</li>
                <li>Réservation et cut-offs (booking, VGM, cut-off documentaire)</li>
                <li>Embarquement, suivi et notifications jalons</li>
                <li>Dédouanement à l’import, mainlevée, livraison finale</li>
              </ol>
              <div className="mt-6">
                <p className="text-gray-700">
                  Bonnes pratiques: anticiper les pics (saisons, jours fériés), soigner l’emballage export (calage, cerclage),
                  sécuriser l’assurance ad valorem et garder une marge sur les délais critiques.
                </p>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-10 mb-4">Incoterms & responsabilités</h2>
              <p className="text-gray-700 mb-3">
                Le choix d’Incoterm influence le contrôle, la répartition des coûts et le point de transfert des risques.
                Exemples courants: FOB/CIF pour les flux maritimes standards; DAP/DDP pour une expérience porte‑à‑porte.
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>FOB: contrôle acheteur sur transport principal; exige une maturité logistique</li>
                <li>CIF: prévisibilité budgétaire via fret+assurance côté vendeur; contrôle moindre</li>
                <li>DAP/DDP: prise en charge étendue, fluidité opérationnelle, exigences douane/fiscalité</li>
              </ul>

              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-10 mb-4">Calcul du coût total livré</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Sea freight + surcharges (BAF, CAF, PSS)</li>
                <li>THC origine/destination, BL, manutentions</li>
                <li>Pré/post‑acheminement route/fer</li>
                <li>Assurance, droits & taxes, frais de dossier</li>
              </ul>
              <p className="text-gray-700 mt-2">
                Comparez toujours FCL vs LCL sur la base du coût total et pas uniquement du tarif au m³.
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-10 mb-4">Cas d’usage</h2>
              {routeKey === 'services_freight_france_china' && (
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Séries régulières: FCL pour sécuriser délais/capacité; rail ponctuel pour accélérer</li>
                  <li>Lancements produits: LCL pour pilotes puis bascule FCL dès montée en volume</li>
                  <li>Marchandises sensibles: FCL + emballage pro + assurance ad valorem</li>
                </ul>
              )}
              {routeKey === 'services_freight_france_congo' && (
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Colis/petits lots: LCL groupé vers Pointe‑Noire avec visibilité des jalons</li>
                  <li>Équipements lourds: FCL/Open Top selon étude, ramassage orchestré</li>
                  <li>Flux projet: coordination documentaire et assistance locale au dédouanement</li>
                </ul>
              )}
              {routeKey === 'services_freight_france_turkey' && (
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Réassort rapide: LCL ou route/multimodal pour tenir des fenêtres serrées</li>
                  <li>Programmes récurrents: FCL avec planification hebdo et slots réservés</li>
                  <li>Cross‑trade: verrouillage documentaire, partenaires adaptés par segment</li>
                </ul>
              )}

              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-10 mb-4">Checklist d’expédition</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Facture commerciale, packing list, BL (à valider)</li>
                <li>Certificat d’origine et documents spécifiques (si requis)</li>
                <li>Assurance ad valorem et photos d’emballage</li>
                <li>Coordonnées réceptionnaire, créneau de livraison, contraintes site</li>
              </ul>

              <div className="mt-8">
                <CtaButton href="contact" variant="primary">Demander un devis détaillé</CtaButton>
                <LocalizedLink to="documentation/incoterms-2020" className="ml-4 text-accent-600 hover:text-accent-700 font-medium">
                  Comprendre les Incoterms
                </LocalizedLink>
              </div>
            </div>

            <aside>
              <div className="bg-gray-50 rounded-xl p-6 shadow">
                <h3 className="text-2xl font-bold text-primary-900 mb-3">Ports & corridors {routeLabel}</h3>
                {routeKey === 'services_freight_france_china' && (
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>France: Le Havre, Marseille‑Fos, Dunkerque</li>
                    <li>Chine: Shanghai, Ningbo, Shenzhen, Qingdao</li>
                    <li>Services: directs vs transbordement selon saison/capacité</li>
                  </ul>
                )}
                {routeKey === 'services_freight_france_congo' && (
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>France: Le Havre, Marseille‑Fos</li>
                    <li>Congo: Pointe‑Noire</li>
                    <li>Spécificités: visibilité jalons LCL, contrôles douaniers</li>
                  </ul>
                )}
                {routeKey === 'services_freight_france_turkey' && (
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>France: Marseille‑Fos, Le Havre</li>
                    <li>Turquie: Istanbul, Izmir, Mersin</li>
                    <li>Atouts: délais courts, options route/multimodal</li>
                  </ul>
                )}
                <div className="mt-6">
                  <LocalizedLink to="guides/fcl-vs-lcl" className="text-accent-600 hover:text-accent-700 font-medium">
                    Guide FCL/LCL
                  </LocalizedLink>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">Conseils opérationnels avancés — {routeLabel}</h2>
          {routeKey === 'services_freight_france_china' && (
            <>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Planification & capacité</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Anticiper les hausses de demande (CNY, Q4) et réserver des slots</li>
                <li>Comparer services directs vs transbordements selon le port chinois</li>
                <li>Prévoir une marge calendrier pour absorber congestions et météo</li>
              </ul>
              <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">Documentation & conformité</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Descriptions produits alignées codes SH; éviter les libellés ambigus</li>
                <li>BL: vérifier brouillon (draft) avant émission pour éviter corrections coûteuses</li>
                <li>Assurance: calibrer couverture selon la valeur et la sensibilité</li>
              </ul>
              <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">KPIs à suivre</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>OTD (on-time delivery) port à port et porte à porte</li>
                <li>Taux d’anomalies documentaires</li>
                <li>Écart coût réel vs devis (coût total livré)</li>
              </ul>
            </>
          )}
          {routeKey === 'services_freight_france_congo' && (
            <>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Groupage LCL & visibilité</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Planifier les consolidations pour limiter l’attente entre départs</li>
                <li>Assurer une traçabilité claire des colis et étiquetages</li>
                <li>Valider en amont les exigences documentaires locales</li>
              </ul>
              <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">Prévention des risques</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Emballage export renforcé, photos datées, scellés si nécessaire</li>
                <li>Choisir FCL dès que la valeur/volume le justifie pour réduire manipulations</li>
                <li>Coordonner le ramassage B2B sur des créneaux compatibles réception terminal</li>
              </ul>
              <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">KPIs à suivre</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Taux de réclamations/avarie</li>
                <li>Délai moyen de dédouanement</li>
                <li>Respect des créneaux de livraison</li>
              </ul>
            </>
          )}
          {routeKey === 'services_freight_france_turkey' && (
            <>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Multimodal & réactivité</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Comparer Mer/Route/Air selon jalons; basculer en express si nécessaire</li>
                <li>Programmer des départs fréquents pour lisser l’activité</li>
                <li>Préparer alternatives portuaires (Izmir/Mersin) selon période</li>
              </ul>
              <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">Qualité documentaire</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>BL/facture/PL cohérents; anticiper certificats d’origine si requis</li>
                <li>Incoterms adaptés au niveau de contrôle désiré</li>
                <li>Assurance correctement dimensionnée au risque</li>
              </ul>
              <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">KPIs à suivre</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Délai moyen door-to-door</li>
                <li>Taux de non-conformité documentaire</li>
                <li>Coût total par m³ vs budget</li>
              </ul>
            </>
          )}
          <div className="mt-8">
            <CtaButton href="contact" variant="primary">Construire mon plan de transport</CtaButton>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">Questions fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contentMap[routeKey].faq.map((f, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">{f.q}</h3>
                <p className="text-gray-700">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {routeKey === 'services_freight_france_china' && (
              <>
                <div className="bg-white rounded-lg p-5 shadow">
                  <h3 className="font-semibold text-primary-900 mb-2">FCL vs LCL — France ↔ Chine</h3>
                  <LocalizedLink to="services/fret-maritime/france-chine/fcl-lcl" className="text-accent-600 hover:text-accent-700">Consulter</LocalizedLink>
                </div>
                <div className="bg-white rounded-lg p-5 shadow">
                  <h3 className="font-semibold text-primary-900 mb-2">Douane — France ↔ Chine</h3>
                  <LocalizedLink to="services/fret-maritime/france-chine/douane" className="text-accent-600 hover:text-accent-700">Consulter</LocalizedLink>
                </div>
                <div className="bg-white rounded-lg p-5 shadow">
                  <h3 className="font-semibold text-primary-900 mb-2">Checklist documentaire — France ↔ Chine</h3>
                  <LocalizedLink to="services/fret-maritime/france-chine/checklist" className="text-accent-600 hover:text-accent-700">Consulter</LocalizedLink>
                </div>
              </>
            )}
            {routeKey === 'services_freight_france_congo' && (
              <>
                <div className="bg-white rounded-lg p-5 shadow">
                  <h3 className="font-semibold text-primary-900 mb-2">FCL vs LCL — France ↔ Congo</h3>
                  <LocalizedLink to="services/fret-maritime/france-congo/fcl-lcl" className="text-accent-600 hover:text-accent-700">Consulter</LocalizedLink>
                </div>
                <div className="bg-white rounded-lg p-5 shadow">
                  <h3 className="font-semibold text-primary-900 mb-2">Douane — France ↔ Congo</h3>
                  <LocalizedLink to="services/fret-maritime/france-congo/douane" className="text-accent-600 hover:text-accent-700">Consulter</LocalizedLink>
                </div>
                <div className="bg-white rounded-lg p-5 shadow">
                  <h3 className="font-semibold text-primary-900 mb-2">Checklist — France ↔ Congo</h3>
                  <LocalizedLink to="services/fret-maritime/france-congo/checklist" className="text-accent-600 hover:text-accent-700">Consulter</LocalizedLink>
                </div>
              </>
            )}
            {routeKey === 'services_freight_france_turkey' && (
              <>
                <div className="bg-white rounded-lg p-5 shadow">
                  <h3 className="font-semibold text-primary-900 mb-2">FCL vs LCL — France ↔ Turquie</h3>
                  <LocalizedLink to="services/fret-maritime/france-turquie/fcl-lcl" className="text-accent-600 hover:text-accent-700">Consulter</LocalizedLink>
                </div>
                <div className="bg-white rounded-lg p-5 shadow">
                  <h3 className="font-semibold text-primary-900 mb-2">Douane — France ↔ Turquie</h3>
                  <LocalizedLink to="services/fret-maritime/france-turquie/douane" className="text-accent-600 hover:text-accent-700">Consulter</LocalizedLink>
                </div>
                <div className="bg-white rounded-lg p-5 shadow">
                  <h3 className="font-semibold text-primary-900 mb-2">Checklist — France ↔ Turquie</h3>
                  <LocalizedLink to="services/fret-maritime/france-turquie/checklist" className="text-accent-600 hover:text-accent-700">Consulter</LocalizedLink>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à expédier ?</h2>
          <p className="text-gray-200 mb-6">Devis sous 24h. Experts FCL/LCL. Suivi 24/7.</p>
          <CtaButton href="contact" variant="primary" className="text-lg px-8 py-4">
            Demander un devis
          </CtaButton>
        </div>
      </section>
    </div>
  );
};

export default FreightRoute;