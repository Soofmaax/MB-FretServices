export type Lang = 'fr' | 'en' | 'pt' | 'ar' | 'es' | 'tr' | 'sw' | 'de' | 'it';

export type RouteKey =
  | 'home'
  | 'services'
  | 'destinations'
  | 'contact'
  | 'legal'
  | 'services_freight_maritime'
  | 'services_air_freight'
  | 'services_customs'
  | 'services_insurance'
  | 'services_freight_france_china'
  | 'services_freight_france_congo'
  | 'services_freight_france_turkey'
  | 'services_freight_france_china_fcl_lcl'
  | 'services_freight_france_china_customs'
  | 'services_freight_france_china_checklist'
  | 'services_freight_france_congo_fcl_lcl'
  | 'services_freight_france_congo_customs'
  | 'services_freight_france_congo_checklist'
  | 'services_freight_france_turkey_fcl_lcl'
  | 'services_freight_france_turkey_customs'
  | 'services_freight_france_turkey_checklist'
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
    services_air_freight: 'services/fret-aerien',
    services_customs: 'services/dedouanement',
    services_insurance: 'services/assurance-cargo',
    services_freight_france_china: 'services/fret-maritime/france-chine',
    services_freight_france_congo: 'services/fret-maritime/france-congo',
    services_freight_france_turkey: 'services/fret-maritime/france-turquie',
    services_freight_france_china_fcl_lcl: 'services/fret-maritime/france-chine/fcl-lcl',
    services_freight_france_china_customs: 'services/fret-maritime/france-chine/douane',
    services_freight_france_china_checklist: 'services/fret-maritime/france-chine/checklist',
    services_freight_france_congo_fcl_lcl: 'services/fret-maritime/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/fret-maritime/france-congo/douane',
    services_freight_france_congo_checklist: 'services/fret-maritime/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/fret-maritime/france-turquie/fcl-lcl',
    services_freight_france_turkey_customs: 'services/fret-maritime/france-turquie/douane',
    services_freight_france_turkey_checklist: 'services/fret-maritime/france-turquie/checklist',
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
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
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
    services_air_freight: 'servicos/frete-aereo',
    services_customs: 'servicos/despacho-aduaneiro',
    services_insurance: 'servicos/seguro-carga',
    services_freight_france_china: 'servicos/frete-maritimo/franca-china',
    services_freight_france_congo: 'servicos/frete-maritimo/franca-congo',
    services_freight_france_turkey: 'servicos/frete-maritimo/franca-turquia',
    services_freight_france_china_fcl_lcl: 'servicos/frete-maritimo/franca-china/fcl-lcl',
    services_freight_france_china_customs: 'servicos/frete-maritimo/franca-china/despacho-aduaneiro',
    services_freight_france_china_checklist: 'servicos/frete-maritimo/franca-china/checklist',
    services_freight_france_congo_fcl_lcl: 'servicos/frete-maritimo/franca-congo/fcl-lcl',
    services_freight_france_congo_customs: 'servicos/frete-maritimo/franca-congo/despacho-aduaneiro',
    services_freight_france_congo_checklist: 'servicos/frete-maritimo/franca-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'servicos/frete-maritimo/franca-turquia/fcl-lcl',
    services_freight_france_turkey_customs: 'servicos/frete-maritimo/franca-turquia/despacho-aduaneiro',
    services_freight_france_turkey_checklist: 'servicos/frete-maritimo/franca-turquia/checklist',
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
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
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
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
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
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
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
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
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
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
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
    services_air_freight: 'services/air-freight',
    services_customs: 'services/customs-clearance',
    services_insurance: 'services/cargo-insurance',
    services_freight_france_china: 'services/maritime-freight/france-china',
    services_freight_france_congo: 'services/maritime-freight/france-congo',
    services_freight_france_turkey: 'services/maritime-freight/france-turkey',
    services_freight_france_china_fcl_lcl: 'services/maritime-freight/france-china/fcl-lcl',
    services_freight_france_china_customs: 'services/maritime-freight/france-china/customs',
    services_freight_france_china_checklist: 'services/maritime-freight/france-china/checklist',
    services_freight_france_congo_fcl_lcl: 'services/maritime-freight/france-congo/fcl-lcl',
    services_freight_france_congo_customs: 'services/maritime-freight/france-congo/customs',
    services_freight_france_congo_checklist: 'services/maritime-freight/france-congo/checklist',
    services_freight_france_turkey_fcl_lcl: 'services/maritime-freight/france-turkey/fcl-lcl',
    services_freight_france_turkey_customs: 'services/maritime-freight/france-turkey/customs',
    services_freight_france_turkey_checklist: 'services/maritime-freight/france-turkey/checklist',
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
const AIR_ALIASES = new Set([
  'services/fret-aerien',
  'services/air-freight',
  'servicos/frete-aereo',
]);
const CUSTOMS_ALIASES = new Set([
  'services/dedouanement',
  'services/customs-clearance',
  'servicos/despacho-aduaneiro',
]);
const INSURANCE_ALIASES = new Set([
  'services/assurance-cargo',
  'services/cargo-insurance',
  'servicos/seguro-carga',
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

// Subpages per route (FCL/LCL, Customs, Checklist)
const FR_CHINA_FCL_ALIASES = new Set<string>([
  'services/fret-maritime/france-chine/fcl-lcl',
  'services/maritime-freight/france-china/fcl-lcl',
  'servicos/frete-maritimo/franca-china/fcl-lcl',
]);
const FR_CHINA_CUSTOMS_ALIASES = new Set<string>([
  'services/fret-maritime/france-chine/douane',
  'services/maritime-freight/france-china/customs',
  'servicos/frete-maritimo/franca-china/despacho-aduaneiro',
]);
const FR_CHINA_CHECKLIST_ALIASES = new Set<string>([
  'services/fret-maritime/france-chine/checklist',
  'services/maritime-freight/france-china/checklist',
  'servicos/frete-maritimo/franca-china/checklist',
]);

const FR_CONGO_FCL_ALIASES = new Set<string>([
  'services/fret-maritime/france-congo/fcl-lcl',
  'services/maritime-freight/france-congo/fcl-lcl',
  'servicos/frete-maritimo/franca-congo/fcl-lcl',
]);
const FR_CONGO_CUSTOMS_ALIASES = new Set<string>([
  'services/fret-maritime/france-congo/douane',
  'services/maritime-freight/france-congo/customs',
  'servicos/frete-maritimo/franca-congo/despacho-aduaneiro',
]);
const FR_CONGO_CHECKLIST_ALIASES = new Set<string>([
  'services/fret-maritime/france-congo/checklist',
  'services/maritime-freight/france-congo/checklist',
  'servicos/frete-maritimo/franca-congo/checklist',
]);

const FR_TURKEY_FCL_ALIASES = new Set<string>([
  'services/fret-maritime/france-turquie/fcl-lcl',
  'services/maritime-freight/france-turkey/fcl-lcl',
  'servicos/frete-maritimo/franca-turquia/fcl-lcl',
]);
const FR_TURKEY_CUSTOMS_ALIASES = new Set<string>([
  'services/fret-maritime/france-turquie/douane',
  'services/maritime-freight/france-turkey/customs',
  'servicos/frete-maritimo/franca-turquia/despacho-aduaneiro',
]);
const FR_TURKEY_CHECKLIST_ALIASES = new Set<string>([
  'services/fret-maritime/france-turquie/checklist',
  'services/maritime-freight/france-turkey/checklist',
  'servicos/frete-maritimo/franca-turquia/checklist',
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
  if (AIR_ALIASES.has(rest)) return 'services_air_freight';
  if (CUSTOMS_ALIASES.has(rest)) return 'services_customs';
  if (INSURANCE_ALIASES.has(rest)) return 'services_insurance';

  // Route main pages
  if (FREIGHT_FRANCE_CHINA_ALIASES.has(rest)) return 'services_freight_france_china';
  if (FREIGHT_FRANCE_CONGO_ALIASES.has(rest)) return 'services_freight_france_congo';
  if (FREIGHT_FRANCE_TURKEY_ALIASES.has(rest)) return 'services_freight_france_turkey';

  // Route subpages
  if (FR_CHINA_FCL_ALIASES.has(rest)) return 'services_freight_france_china_fcl_lcl';
  if (FR_CHINA_CUSTOMS_ALIASES.has(rest)) return 'services_freight_france_china_customs';
  if (FR_CHINA_CHECKLIST_ALIASES.has(rest)) return 'services_freight_france_china_checklist';

  if (FR_CONGO_FCL_ALIASES.has(rest)) return 'services_freight_france_congo_fcl_lcl';
  if (FR_CONGO_CUSTOMS_ALIASES.has(rest)) return 'services_freight_france_congo_customs';
  if (FR_CONGO_CHECKLIST_ALIASES.has(rest)) return 'services_freight_france_congo_checklist';

  if (FR_TURKEY_FCL_ALIASES.has(rest)) return 'services_freight_france_turkey_fcl_lcl';
  if (FR_TURKEY_CUSTOMS_ALIASES.has(rest)) return 'services_freight_france_turkey_customs';
  if (FR_TURKEY_CHECKLIST_ALIASES.has(rest)) return 'services_freight_france_turkey_checklist';

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