// Composants spécifiques logistique
import type { FC } from 'react';
import SEO from '../SEO';
import CtaButton from '../ui/CtaButton';
import ResponsiveImage from '../ui/ResponsiveImage';
import { getSiteUrl } from '../../utils/siteUrl';
import { keyFromPath, detectLangFromPath, pathForLang } from '../../utils/paths';
import CBMCalculator from './CBMCalculator';
import QuoteForm from './QuoteForm';
import LocalizedLink from '../LocalizedLink';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Clock, Ship, MapPin, Home, Car, Package } from 'lucide-react';

type RouteKey = 'services_freight_france_congo' | 'services_freight_france_angola';

function detectRouteKey(): RouteKey | null {
  if (typeof window === 'undefined') return null;
  const k = keyFromPath(window.location.pathname);
  if (k === 'services_freight_france_congo' || k === 'services_freight_france_angola') {
    return k;
  }
  return null;
}

const contentMap: Record<
  RouteKey,
  {
    heroBase: string;
    ports: { from: string[]; to: string[] };
    areaServed: Array<{ '@type': 'Country'; name: string }>;
  }
> = {
  services_freight_france_congo: {
    heroBase: 'hero-congo',
    ports: {
      from: ['Le Havre', 'Marseille-Fos'],
      to: ['Pointe‑Noire'],
    },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Congo' },
    ],
  },
  services_freight_france_angola: {
    heroBase: 'hero-angola',
    ports: {
      from: ['Le Havre', 'Marseille-Fos', 'Anvers', 'Rotterdam'],
      to: ['Luanda'],
    },
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Angola' },
    ],
  },
};

const FreightRoute: FC = () => {
  const routeKey = detectRouteKey();
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';
  const { t } = useTranslation(['routes_main', 'routes_sub', 'navbar', 'common', 'freight']);

  if (!routeKey) {
    return null;
  }

  const c = contentMap[routeKey];
  const ogImagePath = `/images/og-${c.heroBase.replace('hero-', '')}.webp`;
  const routeId = routeKey === 'services_freight_france_congo' ? 'france_congo' : 'france_angola';
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
  const faq = t(`routes_main:${routeId}.faq`, {
    returnObjects: true,
  }) as Array<{ q: string; a: string }>;

  const servicesBlock =
    lang === 'fr' || lang === 'en'
      ? (t(`routes_main:${routeId}.services_block`, {
          returnObjects: true,
        }) as { title?: string; intro?: string; items?: string[] })
      : null;

  const howItWorks = t('freight:how_it_works', {
    returnObjects: true,
  }) as {
    title?: string;
    subtitle?: string;
    items?: Array<{ title?: string; text?: string }>;
  };
  const howItems = Array.isArray(howItWorks.items) ? howItWorks.items : [];

  const segments = t('freight:segments', {
    returnObjects: true,
  }) as {
    title?: string;
    subtitle?: string;
    items?: Array<{ title?: string; text?: string }>;
  };
  const segmentItems = Array.isArray(segments.items) ? segments.items : [];

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('navbar:home', 'Home'),
        item: SITE_URL + '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('navbar:services', 'Services'),
        item: SITE_URL + pathForLang('services', lang),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t('routes_sub:labels.route_root', 'Sea freight'),
        item: SITE_URL + pathForLang('services_freight_maritime', lang),
      },
    ],
  };

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: titleT || routeLabel,
    serviceType: t('freight:service_type', 'Sea freight'),
    areaServed: c.areaServed,
    provider: {
      '@type': 'Organization',
      name: 'MB Fret Services',
      url: SITE_URL,
    },
  };

  const contactSource =
    routeKey === 'services_freight_france_congo'
      ? 'route_france_congo'
      : routeKey === 'services_freight_france_angola'
      ? 'route_france_angola'
      : undefined;

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (faq || []).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  // Placeholder image for recent departures: currently reuse hero image.
  // When real photos are available, you can replace this path with e.g.
  // `/images/departs/france-congo-first.jpg` or `/images/departs/france-angola-first.jpg`.
  const recentDepartureImage = `/images/${c.heroBase}.jpg`;

  return (
    <div className="pt-16">
      <SEO
        title={`${titleT} — Fast quote & reliable lead times | MB Fret Services`}
        description={`${subtitleT} ${transitT} ${t(
          'routes_main:headings.ready_to_ship_desc',
          'Quote within 24 hours. FCL/LCL experts. 24/7 tracking.'
        )}`}
        ogImage={ogImagePath}
        jsonLd={[breadcrumb, serviceLd, faqLd]}
      />
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={`/images/${c.heroBase}-1200.jpg`}
          imageSrcSet={`/images/${c.heroBase}-800.jpg 800w, /images/${c.heroBase}-1200.jpg 1200w, /images/${c.heroBase}-1600.jpg 1600w`}
          imageSizes="100vw"
        />
      </Helmet>

      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <ResponsiveImage
            src={`/images/${c.heroBase}.jpg`}
            webpSrc={`/images/${c.heroBase}.webp`}
            avifSrc={`/images/${c.heroBase}.avif`}
            alt={titleT || routeLabel}
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
            <CtaButton
              href="contact"
              variant="primary"
              className="text-lg px-8 py-4"
              state={contactSource ? { source: contactSource } : undefined}
            >
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

      {/* Comment ça marche ? */}
      {howItems.length > 0 && (
        <section className="py-10 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900">
                {howItWorks.title}
              </h2>
              <p className="text-gray-600 text-base md:text-lg max-w-xl">
                {howItWorks.subtitle ||
                  t(
                    'freight:how_it_works.subtitle',
                    'Simple process: fast quote, FCL/LCL recommendation and optional door-to-door handling.'
                  )}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItems.map((item, index) => {
                const Icon = index === 0 ? Clock : index === 1 ? Ship : MapPin;
                return (
                  <div
                    key={item.title || index}
                    className="bg-gray-50 rounded-xl px-6 py-5 shadow-sm flex items-start gap-4"
                  >
                    <div className="w-11 h-11 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                      <Icon size={22} className="text-accent-700" aria-hidden="true" />
                    </div>
                    <div>
                      {item.title && (
                        <h3 className="text-base md:text-lg font-semibold text-primary-900 mb-1">
                          {item.title}
                        </h3>
                      )}
                      {item.text && (
                        <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                          {item.text}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
                    <span className="w-2 h-2 bg-accent-700 rounded-full mr-3 mt-2"></span>
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
              <h3 className="text-2xl font-bold text-primary-900 mb-4">
                {t('routes_main:headings.cbm_calc')}
              </h3>
              <CBMCalculator />
              <p className="text-sm text-gray-500 mt-3">
                {t(
                  'routes_main:common.cbm_note',
                  "Indicative only: 20' ≈ 33 m³, 40' ≈ 67 m³. Tolerances and weight/volume limits depend on carrier and service."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Déménagement / Véhicule / Marchandises */}
      {segmentItems.length > 0 && (
        <section className="py-12 bg-white border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-3">
                {segments.title}
              </h2>
              {segments.subtitle && (
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  {segments.subtitle}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {segmentItems.map((item, index) => {
                const Icon = index === 0 ? Home : index === 1 ? Car : Package;
                return (
                  <div
                    key={item.title || index}
                    className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary-900/90 flex items-center justify-center mx-auto mb-5">
                      <Icon size={26} className="text-white" aria-hidden="true" />
                    </div>
                    {item.title && (
                      <h3 className="text-lg font-semibold text-primary-900 mb-3">
                        {item.title}
                      </h3>
                    )}
                    {item.text && (
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                        {item.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Section: Coûts & modes / Douane / Assurance / USP */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
                {t('routes_main:headings.costs_modes')} — {routeLabel}
              </h2>
              {(costsParas || []).map((p, i) => (
                <p key={i} className="text-lg text-gray-700 mb-4">
                  {p}
                </p>
              ))}

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                <CtaButton
                  href="contact"
                  variant="primary"
                  state={contactSource ? { source: contactSource } : undefined}
                >
                  {t('routes_main:common.cta_get_quote')}
                </CtaButton>
                <div className="flex flex-wrap gap-3">
                  <LocalizedLink
                    to="guides/fcl-vs-lcl"
                    className="text-accent-600 hover:text-accent-700 font-medium"
                  >
                    {t('routes_main:links.fcl_understand', 'Understand FCL vs LCL')}
                  </LocalizedLink>
                  <LocalizedLink
                    to="guides/prix-conteneur-congo-angola"
                    className="text-accent-600 hover:text-accent-700 font-medium"
                  >
                    {t(
                      'routes_main:links.pricing_guide',
                      "Container price guide 20'/40' Congo / Angola"
                    )}
                  </LocalizedLink>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                  {t('routes_main:headings.customs_docs')}
                </h3>
                {(customsParas || []).map((p, i) => (
                  <p key={i} className="text-gray-700 mb-4">
                    {p}
                  </p>
                ))}

                <h4 className="text-lg font-semibold text-primary-900 mb-2">
                  {t('routes_main:headings.insurance_risks')}
                </h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  {(insuranceRisks || []).map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>

                <div className="mt-6 space-y-2">
                  <LocalizedLink
                    to="documentation/incoterms-2020"
                    className="block text-accent-600 hover:text-accent-700 font-medium"
                  >
                    {t('routes_main:links.incoterms_guide', 'Understand Incoterms')}
                  </LocalizedLink>
                  <LocalizedLink
                    to={pathForLang('services_customs', lang)}
                    className="block text-accent-600 hover:text-accent-700 font-medium"
                  >
                    {t(
                      'routes_main:links.customs_service',
                      'View our France–Africa customs clearance service'
                    )}
                  </LocalizedLink>
                  <LocalizedLink
                    to={pathForLang('services_insurance', lang)}
                    className="block text-accent-600 hover:text-accent-700 font-medium"
                  >
                    {t(
                      'routes_main:links.insurance_service',
                      'View our cargo insurance service'
                    )}
                  </LocalizedLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {servicesBlock && Array.isArray(servicesBlock.items) && servicesBlock.items.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
              {servicesBlock.title}
            </h2>
            {servicesBlock.intro && (
              <p className="text-lg text-gray-700 mb-6">{servicesBlock.intro}</p>
            )}
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              {servicesBlock.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
                <CtaButton
                  href="contact"
                  variant="primary"
                  state={contactSource ? { source: contactSource } : undefined}
                >
                  {t('routes_main:common.cta_get_detailed_quote')}
                </CtaButton>
                <LocalizedLink
                  to="documentation/incoterms-2020"
                  className="ml-4 text-accent-600 hover:text-accent-700 font-medium"
                >
                  {t('routes_main:links.incoterms_guide', 'Understand Incoterms')}
                </LocalizedLink>
              </div>
            </div>

            <aside>
              <div className="bg-gray-50 rounded-xl p-6 shadow">
                <h3 className="text-2xl font-bold text-primary-900 mb-3">
                  {t('routes_main:headings.ports_corridors').replace('__ROUTE__', routeLabel)}
                </h3>
                {routeKey === 'services_freight_france_congo' && (
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>France: Le Havre, Marseille‑Fos</li>
                    <li>Congo: Pointe‑Noire</li>
                    <li>Spécificités: visibilité jalons LCL, contrôles douaniers</li>
                  </ul>
                )}
                {routeKey === 'services_freight_france_angola' && (
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>France / Europe: Le Havre, Marseille‑Fos, Anvers, Rotterdam</li>
                    <li>Angola: Luanda</li>
                    <li>Atouts: rotations régulières, solutions FCL &amp; LCL, expertise douanière Angola</li>
                  </ul>
                )}
                <div className="mt-6">
                  <LocalizedLink
                    to="guides/fcl-vs-lcl"
                    className="text-accent-600 hover:text-accent-700 font-medium"
                  >
                    {t('routes_main:links.fcl_guide_short', 'FCL/LCL guide')}
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
            {(faq || []).map((f, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-semibold text-primary-900 mb-2">{f.q}</h3>
                <p className="text-gray-700">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {routeKey === 'services_freight_france_congo' && (
              <>
                <div className="bg-white rounded-lg p-5 shadow">
                  <h3 className="font-semibold text-primary-900 mb-2">
                    {t(
                      'routes_sub:congo.fcl_lcl.h1',
                      'FCL vs LCL — France ↔ Congo'
                    )}
                  </h3>
                  <LocalizedLink
                    to="services/fret-maritime/france-congo/fcl-lcl"
                    className="text-accent-600 hover:text-accent-700"
                  >
                    {t('routes_sub:labels.view', 'View')}
                  </LocalizedLink>
                </div>
                <div className="bg-white rounded-lg p-5 shadow">
                  <h3 className="font-semibold text-primary-900 mb-2">
                    {t(
                      'routes_sub:congo.customs.h1',
                      'Customs procedures — France ↔ Congo'
                    )}
                  </h3>
                  <LocalizedLink
                    to="services/fret-maritime/france-congo/douane"
                    className="text-accent-600 hover:text-accent-700"
                  >
                    {t('routes_sub:labels.view', 'View')}
                  </LocalizedLink>
                </div>
                <div className="bg-white rounded-lg p-5 shadow">
                  <h3 className="font-semibold text-primary-900 mb-2">
                    {t(
                      'routes_sub:congo.checklist.h1',
                      'Document checklist — France ↔ Congo'
                    )}
                  </h3>
                  <LocalizedLink
                    to="services/fret-maritime/france-congo/checklist"
                    className="text-accent-600 hover:text-accent-700"
                  >
                    {t('routes_sub:labels.view', 'View')}
                  </LocalizedLink>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Bloc \"Nos premiers départs\" / \"Recent departures\" */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-4">
            {t('routes_main:headings.recent_departures', 'Nos premiers départs')}
          </h2>
          <p className="text-gray-700 mb-6">
            {t(
              'routes_main:headings.recent_departures_desc',
              \"Nous afficherons ici les photos de nos premiers conteneurs au départ de la France vers __ROUTE__.\"
            ).replace('__ROUTE__', routeLabel)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-56 bg-gray-100">
                <ResponsiveImage
                  src={recentDepartureImage}
                  alt={t(
                    'routes_main:headings.recent_departures_alt',
                    'Photo de conteneur récent sur le corridor'
                  ).replace('__ROUTE__', routeLabel)}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  {t(
                    'routes_main:headings.recent_departures_note',
                    'Dès que vos premiers conteneurs seront partis, vous pourrez remplacer cette image par vos propres photos (chargement, scellés, départ portuaire).'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('routes_main:headings.ready_to_ship')}</h2>
          <p className="text-gray-200 mb-6">{t('routes_main:headings.ready_to_ship_desc')}</p>
          <CtaButton
            href="contact"
            variant="primary"
            className="text-lg px-8 py-4"
            state={contactSource ? { source: contactSource } : undefined}
          >
            {t('routes_main:common.cta_get_quote')}
          </CtaButton>
        </div>
      </section>
    </div>
  );
};

export default FreightRoute;