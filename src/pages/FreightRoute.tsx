import type { FC } from 'react';
import SEO from '../components/SEO';
import CtaButton from '../components/CtaButton';
import ResponsiveImage from '../components/ResponsiveImage';
import { getSiteUrl } from '../utils/siteUrl';
import { keyFromPath, detectLangFromPath, pathForLang } from '../utils/paths';
import CBMCalculator from '../components/CBMCalculator';
import QuoteForm from '../components/QuoteForm';
import LocalizedLink from '../components/LocalizedLink';

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
    heroImg: string;
    ports: { from: string[]; to: string[] };
    transit: string;
    faq: Array<{ q: string; a: string }>;
    areaServed: Array<{ '@type': 'Country'; name: string }>;
  }
> = {
  services_freight_france_china: {
    title: "Fret maritime France ↔ Chine (FCL & LCL)",
    subtitle:
      "Solutions FCL/LCL fiables entre les principaux ports français (Le Havre, Marseille-Fos) et les hubs chinois (Shanghai, Ningbo, Shenzhen).",
    heroImg:
      'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ports: {
      from: ['Le Havre', 'Marseille-Fos', 'Dunkerque'],
      to: ['Shanghai', 'Ningbo', 'Shenzhen', 'Qingdao'],
    },
    transit: "Délais indicatifs: 35–50 jours selon l'itinéraire et l'armateur.",
    faq: [
      {
        q: 'FCL ou LCL: que choisir sur l’axe France–Chine ?',
        a: "FCL convient aux volumes importants avec un meilleur contrôle et sécurité. LCL est optimal en dessous de ~13–15 m³, avec consolidation et coûts partagés.",
      },
      {
        q: 'Quels Incoterms privilégier (FOB/CIF/CIP) ?',
        a: "FOB/CIF restent les plus répandus. Le choix dépend de votre appétence au risque et du contrôle souhaité sur le transport principal.",
      },
      {
        q: 'Gérez‑vous la documentation douanière ?',
        a: "Oui: DAU, certificats, contrôle conformité et conseils réglementaires selon la nature des marchandises.",
      },
    ],
    areaServed: [{ '@type': 'Country', name: 'France' }, { '@type': 'Country', name: 'China' }],
  },
  services_freight_france_congo: {
    title: "Fret maritime France ↔ Congo (FCL & LCL)",
    subtitle:
      "Groupage LCL et conteneurs complets vers Pointe‑Noire avec options de ramassage en France (IDF, Lyon, Marseille).",
    heroImg:
      'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ports: {
      from: ['Le Havre', 'Marseille-Fos'],
      to: ['Pointe‑Noire'],
    },
    transit: 'Délais indicatifs: 20–30 jours selon départs et escales.',
    faq: [
      {
        q: 'Proposez‑vous le ramassage et l’emballage ?',
        a: "Oui, ramassage B2B dans les principaux hubs français et emballage export conforme pour réduire le risque en transit.",
      },
      {
        q: 'Puis‑je suivre mon expédition ?',
        a: "Oui, suivi en temps réel et visibilité des étapes clés (embarquement, transbordement, arrivée).",
      },
      {
        q: 'Accompagnez‑vous sur le dédouanement ?',
        a: "Oui, accompagnement de bout en bout avec nos partenaires locaux.",
      },
    ],
    areaServed: [{ '@type': 'Country', name: 'France' }, { '@type': 'Country', name: 'Congo' }],
  },
  services_freight_france_turkey: {
    title: "Fret maritime France ↔ Turquie (FCL & LCL)",
    subtitle:
      "Liaisons régulières avec Istanbul/Izmir. Solutions multimodales (Mer/Route/Air) et délais optimisés.",
    heroImg:
      'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ports: {
      from: ['Marseille-Fos', 'Le Havre'],
      to: ['Istanbul', 'Izmir', 'Mersin'],
    },
    transit: 'Délais indicatifs: 7–15 jours selon le port et la saison.',
    faq: [
      {
        q: 'Faites‑vous du cross‑trade (ex: Chine → Turquie → Afrique) ?',
        a: "Oui, étude au cas par cas avec planification documentaire et choix d’armateur/réseau.",
      },
      {
        q: 'Quelles assurances recommandez‑vous ?',
        a: "Assurance cargo ad valorem couvrant les risques majeurs du départ à la livraison.",
      },
      {
        q: 'Pouvez‑vous gérer les flux urgents ?',
        a: "Oui, via options express (aérien) ou multimodal pour respecter les contraintes de délai.",
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
        jsonLd={[breadcrumb, serviceLd, faqLd]}
      />

      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <ResponsiveImage
            src={c.heroImg}
            alt={c.title}
            width={1600}
            height={900}
            sizes="100vw"
            priority
            className="w-full h-full object-cover"
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