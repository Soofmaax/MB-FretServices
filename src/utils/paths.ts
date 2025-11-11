export type Lang = 'fr' | 'en' | 'pt' | 'ar' | 'es' | 'tr' | 'sw' | 'de' | 'it';

export type RouteKey =
  | 'home'
  | 'services'
  | 'destinations'
  | 'contact'
  | 'legal'
  | 'services_freight_maritime'
  | 'services_freight_france_china'
  | 'services_freight_france_congo'
  | 'services_freight_france_turkey'
  | 'pillar_incoterms'
  | 'pillar_fcl_lcl';

const SLUGS: Record<Lang, Record<RouteKey, string>> = {
  fr: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'mentions-legales',
    services_freight_maritime: 'services/fret-maritime',
    services_freight_france_china: 'services/fret-maritime/france-chine',
    services_freight_france_congo: 'services/fret-maritime/france-congo',
    services_freight_france_turkey: 'services/fret-maritime/france-turquie',
    pillar_incoterms: 'documentation/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  en: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal-notice',
    services_freight_maritime: 'services/maritime-freight',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  pt: {
    home: '',
    services: 'servicos',
    destinations: 'destinos',
    contact: 'contacto',
    legal: 'aviso-legal',
    services_freight_maritime: 'servicos/frete-maritimo',
    services_freight_france_china: 'servicos/frete-maritimo/franca-china',
    services_freight_france_congo: 'servicos/frete-maritimo/franca-congo',
    services_freight_france_turkey: 'servicos/frete-maritimo/franca-turquia',
    pillar_incoterms: 'documentacao/incoterms-2020',
    pillar_fcl_lcl: 'guias/fcl-vs-lcl',
  },
  // New languages use international slugs (English) by default
  ar: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal',
    services_freight_maritime: 'services/maritime-freight',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  es: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal',
    services_freight_maritime: 'services/maritime-freight',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  tr: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal',
    services_freight_maritime: 'services/maritime-freight',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  sw: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal',
    services_freight_maritime: 'services/maritime-freight',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  de: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal',
    services_freight_maritime: 'services/maritime-freight',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
  it: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal',
    services_freight_maritime: 'services/maritime-freight',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    pillar_incoterms: 'resources/incoterms-2020',
    pillar_fcl_lcl: 'guides/fcl-vs-lcl',
  },
};

// Alias sets for slug recognition
const SERVICE_ALIASES = new Set([
  'services', 'servicos', 'servicios', 'hizmetler', 'servizi', 'leistungen', 'huduma', 'خدمات'
]);
const DEST_ALIASES = new Set([
  'destinations', 'destinos', 'destinazioni', 'ziele', 'destinasyonlar', 'vituo', 'وجهات'
]);
const CONTACT_ALIASES = new Set([
  'contact', 'contacto', 'kontakt', 'contatti', 'iletisim', 'mawasiliano', 'اتصال'
]);
const LEGAL_ALIASES = new Set([
  'legal', 'mentions-legales', 'legal-notice', 'aviso-legal', 'impressum', 'note-legali', 'yasal-uyari', 'إشعار-قانوني'
]);
const FREIGHT_ALIASES = new Set([
  'services/fret-maritime',
  'servicos/frete-maritimo',
  'services/maritime-freight',
  'servicios/transporte-maritimo',
  'hizmetler/deniz-tasimaciligi',
  'servizi/trasporto-marittimo',
  'leistungen/seefracht',
  'huduma/usafirishaji-wa-baharini',
  'خدمات/الشحن-البحري'
]);

// Route-specific maritime pages aliases (multi-lang)
const FREIGHT_FRANCE_CHINA_ALIASES = new Set<string>([
  'services/fret-maritime/france-chine',
  'services/maritime-freight/france-china',
  'servicos/frete-maritimo/franca-china',
]);
const FREIGHT_FRANCE_CONGO_ALIASES = new Set<string>([
  'services/fret-maritime/france-congo',
  'services/maritime-freight/france-congo',
  'servicos/frete-maritimo/franca-congo',
]);
const FREIGHT_FRANCE_TURKEY_ALIASES = new Set<string>([
  'services/fret-maritime/france-turquie',
  'services/maritime-freight/france-turkey',
  'servicos/frete-maritimo/franca-turquia',
]);

// Pillar pages aliases (multi-lang)
const PILLAR_INCOTERMS_ALIASES = new Set<string>([
  'documentation/incoterms-2020',
  'resources/incoterms-2020',
  'documentacao/incoterms-2020',
]);
const PILLAR_FCL_LCL_ALIASES = new Set<string>([
  'guides/fcl-vs-lcl',
  'guias/fcl-vs-lcl',
]);

function stripBase(pathname: string): string {
  const base = (import.meta.env?.BASE_URL as string) || '/';
  const normBase = base.endsWith('/') ? base : base + '/';
  if (normBase !== '/' && pathname.startsWith(normBase)) {
    // Keep leading slash for downstream logic
    return pathname.slice(normBase.length - 1);
  }
  return pathname;
}

export function detectLangFromPath(pathname: string): Lang {
  const p = stripBase(pathname);
  const seg = p.split('/').filter(Boolean)[0];
  if (['fr','en','pt','ar','es','tr','sw','de','it'].includes(seg || '')) return seg as Lang;
  return 'fr';
}

export function keyFromPath(pathname: string): RouteKey {
  const p = stripBase(pathname);
  const parts = p.split('/').filter(Boolean);
  // drop language segment if present
  if (['fr','en','pt','ar','es','tr','sw','de','it'].includes(parts[0])) {
    parts.shift();
  }
  const rest = parts.join('/');

  if (rest === '' || rest === '/') return 'home';

  if (SERVICE_ALIASES.has(rest)) return 'services';
  if (DEST_ALIASES.has(rest)) return 'destinations';
  if (CONTACT_ALIASES.has(rest)) return 'contact';
  if (LEGAL_ALIASES.has(rest)) return 'legal';
  if (FREIGHT_ALIASES.has(rest)) return 'services_freight_maritime';
  if (FREIGHT_FRANCE_CHINA_ALIASES.has(rest)) return 'services_freight_france_china';
  if (FREIGHT_FRANCE_CONGO_ALIASES.has(rest)) return 'services_freight_france_congo';
  if (FREIGHT_FRANCE_TURKEY_ALIASES.has(rest)) return 'services_freight_france_turkey';
  if (PILLAR_INCOTERMS_ALIASES.has(rest)) return 'pillar_incoterms';
  if (PILLAR_FCL_LCL_ALIASES.has(rest)) return 'pillar_fcl_lcl';

  // default to home
  return 'home';
}

export function pathForLang(key: RouteKey, lang: Lang): string {
  const slug = SLUGS[lang][key];
  return `/${lang}${slug ? `/${slug}` : ''}`;
}

/**
 * Transform a generic "to" value into the localized path.
 * Accepts:
 * - '' | '/' | 'services' | 'destinations' | 'contact' | 'legal'
 * - nested: 'services/fret-maritime', 'services/fret-maritime/france-chine'
 * - pillars: 'documentation/incoterms-2020', 'guides/fcl-vs-lcl'
 */
export function localizeTo(to: string, lang: Lang): string {
  const normalized = to.replace(/^\/*/, ''); // remove leading slash
  const key = keyFromPath(`/${lang}/${normalized}`);
  return pathForLang(key, lang);
}