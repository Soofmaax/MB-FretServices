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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(['routes_main', 'common']);

  if (!routeKey) {
    return null;
  }

  const c = contentMap[routeKey];
  const ogImagePath = `/images/og-${c.heroBase.replace('hero-', '')}.webp`;
  const routeId =
    routeKey === 'services_freight_france_china'
      ? 'france_china'
      : routeKey === 'services_freight_france_congo'
      ? 'france_congo'
      : 'france_turkey';
  const routeLabel = t(`routes_main:${routeId}.label`);

  // Localized content (titles, subtitles, lists)
  const titleT = t(`routes_main:${routeId}.title`);
  const subtitleT = t(`routes_main:${routeId}.subtitle`);
  const transitT = t(`routes_main:${routeId}.transit`);
  const portsFrom = t(`routes_main:${routeId}.ports_from`, { returnObjects: true }) as string[];
  const portsTo = t(`routes_main:${routeId}.ports_to`, { returnObjects: true }) as string[];
  const bulletsPorts = t('routes_main:common.bullets_ports', { returnObjects: true }) as string[];
  const costsParas = t(`routes_main:${routeId}.costs`, { returnObjects: true }) as string[];
  const customsParas = t(`routes_main:${routeId}.customs`, { returnObjects: true }) as string[];
  const insuranceRisks = t(`routes_main:${routeId}.insurance_risks`, { returnObjects: true }) as string[];
  const whyUsBullets = t(`routes_main:${routeId}.why_us`, { returnObjects: true }) as string[];
  const keyServices = t('routes_main:common.key_services', { returnObjects: true }) as string[];
  const opsSteps = t('routes_main:common.ops_steps', { returnObjects: true }) as string[];
  const opsBest = t('routes_main:common.ops_best_practices');
  const incotermsIntro = t('routes_main:common.incoterms_intro');
  const incotermsList = t('routes_main:common.incoterms_list', { returnObjects: true }) as string[];
  const deliveredCostList = t('routes_main:common.delivered_cost_list', { returnObjects: true }) as string[];
  const deliveredCostNote = t('routes_main:common.delivered_cost_note');
  const useCases = t(`routes_main:${routeId}.use_cases`, { returnObjects: true }) as string[];
  const checklist = t('routes_main:common.checklist', { returnObjects: true }) as string[];
  const advicePlanningTitle = t(`routes_main:${routeId}.advice.planning_title`);
  const advicePlanning = t(`routes_main:${routeId}.advice.planning`, { returnObjects: true }) as string[];
  const adviceDocsTitle = t(`routes_main:${routeId}.advice.documentation_title`);
  const adviceDocs = t(`routes_main:${routeId}.advice.documentation`, { returnObjects: true }) as string[];
  const adviceKpisTitle = t(`routes_main:${routeId}.advice.kpis_title`);
  const adviceKpis = t(`routes_main:${routeId}.advice.kpis`, { returnObjects: true }) as string[];
  const faq = t(`routes_main:${routeId}.faq`, { returnObjects: true }) as Array<{ q: string; a: string }>;

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
        title={`${titleT} — Devis Rapide & Délais Garantis | MB Fret Services`}
        description={`${subtitleT} ${transitT} ${t('routes_main:headings.ready_to_ship_desc')}`}
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{titleT}</h1>
          <p className="text-xl md:text-2xl text-accent-300 font-medium mt-2">{subtitleT}</p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <CtaButton href="contact" variant="primary" className="text-lg px-8 py-4">
              {t('routes_main:common.cta_get_quote')}
            </CtaButton>
            <a
              href="https://wa.me/33749235539"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              {t('routes_main:common.cta_whatsapp')}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">{t('routes_main:headings.ports_delais')}</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>{t('routes_main:labels.departures_fr')}</strong> {(portsFrom || c.ports.from).join(', ')}
              </p>
              <p>
                <strong>{t('routes_main:labels.arrivals')}</strong> {(portsTo || c.ports.to).join(', ')}
              </p>
              <p>
                <strong>{t('routes_main:labels.transit')}</strong> {transitT}
              </p>
              <ul className="mt-4 space-y-2">
                {(bulletsPorts || []).map((bp, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-accent-500 rounded-full mr-3 mt-2"></span>
                    {bp}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <QuoteForm defaultRoute={routeKey} />
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-xl p-6 shadow">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">{t('routes_main:headings.cbm_calc')}</h3>
              <CBMCalculator />
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
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">{t('routes_main:headings.costs_modes')} — {routeLabel}</h2>
              {(costsParas || []).map((p, i) => (
                <p key={i} className="text-lg text-gray-700 mb-4">{p}</p>
              ))}

              <div className="mt-6">
                <CtaButton href="contact" variant="primary">{t('routes_main:common.cta_get_quote')}</CtaButton>
                <LocalizedLink to="guides/fcl-vs-lcl" className="ml-4 text-accent-600 hover:text-accent-700 font-medium">Comprendre FCL vs LCL</LocalizedLink>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-2xl font-bold text-primary-900 mb-4">{t('routes_main:headings.customs_docs')}</h3>
                {(customsParas || []).map((p, i) => (
                  <p key={i} className="text-gray-700 mb-4">{p}</p>
                ))}

                <h4 className="text-lg font-semibold text-primary-900 mb-2">{t('routes_main:headings.insurance_risks')}</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  {(insuranceRisks || []).map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
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
              <h3 className="text-2xl font-bold text-primary-900 mb-4">
                {t('routes_main:headings.why_choose').replace('__ROUTE__', routeLabel)}
              </h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {(whyUsBullets || []).map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary-900 mb-4">{t('routes_main:headings.key_services')}</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {(keyServices || []).map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
              <div className="mt-6">
                <CtaButton href="contact" variant="primary">{t('routes_main:common.cta_get_quote')}</CtaButton>
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
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">{t('routes_main:headings.ops_steps')}</h2>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                {(opsSteps || []).map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ol>
              <div className="mt-6">
                <p className="text-gray-700">
                  {opsBest}
                </p>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-10 mb-4">{t('routes_main:headings.incoterms')}</h2>
              <p className="text-gray-700 mb-3">
                {incotermsIntro}
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {(incotermsList || []).map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>

              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-10 mb-4">{t('routes_main:headings.delivered_cost')}</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {(deliveredCostList || []).map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
              <p className="text-gray-700 mt-2">
                {deliveredCostNote}
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-10 mb-4">{t('routes_main:headings.use_cases')}</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {(useCases || []).map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>

              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mt-10 mb-4">{t('routes_main:headings.checklist')}</h2>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {(checklist || []).map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>

              <div className="mt-8">
                <CtaButton href="contact" variant="primary">{t('routes_main:common.cta_get_detailed_quote')}</CtaButton>
                <LocalizedLink to="documentation/incoterms-2020" className="ml-4 text-accent-600 hover:text-accent-700 font-medium">
                  Comprendre les Incoterms
                </LocalizedLink>
              </div>
            </div>

            <aside>
              <div className="bg-gray-50 rounded-xl p-6 shadow">
                <h3 className="text-2xl font-bold text-primary-900 mb-3">
                  {t('routes_main:headings.ports_corridors').replace('__ROUTE__', routeLabel)}
                </h3>
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
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
            {t('routes_main:headings.advanced_tips').replace('__ROUTE__', routeLabel)}
          </h2>
          <>
            <h3 className="text-xl font-semibold text-primary-900 mb-2">{advicePlanningTitle}</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              {(advicePlanning || []).map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">{adviceDocsTitle}</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              {(adviceDocs || []).map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold text-primary-900 mt-6 mb-2">{adviceKpisTitle}</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              {(adviceKpis || []).map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
          </>
          <div className="mt-8">
            <CtaButton href="contact" variant="primary">{t('routes_main:common.cta_build_plan')}</CtaButton>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">{t('routes_main:headings.faq')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(faq || contentMap[routeKey].faq).map((f, idx) => (
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
          <h2 className="text-3xl font-bold mb-4">{t('routes_main:headings.ready_to_ship')}</h2>
          <p className="text-gray-200 mb-6">{t('routes_main:headings.ready_to_ship_desc')}</p>
          <CtaButton href="contact" variant="primary" className="text-lg px-8 py-4">
            {t('routes_main:common.cta_get_quote')}
          </CtaButton>
        </div>
      </section>
    </div>
  );
};

export default FreightRoute;