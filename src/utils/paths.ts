export type Lang = 'fr' | 'en' | 'pt';

export type RouteKey =
  | 'home'
  | 'services'
  | 'destinations'
  | 'contact'
  | 'legal'
  | 'services_freight_maritime';

const SLUGS: Record<Lang, Record<RouteKey, string>> = {
  fr: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'mentions-legales',
    services_freight_maritime: 'services/fret-maritime',
  },
  en: {
    home: '',
    services: 'services',
    destinations: 'destinations',
    contact: 'contact',
    legal: 'legal-notice',
    services_freight_maritime: 'services/maritime-freight',
  },
  pt: {
    home: '',
    services: 'servicos',
    destinations: 'destinos',
    contact: 'contacto',
    legal: 'aviso-legal',
    services_freight_maritime: 'servicos/frete-maritimo',
  },
};

export function detectLangFromPath(pathname: string): Lang {
  const seg = pathname.split('/').filter(Boolean)[0];
  if (seg === 'fr' || seg === 'en' || seg === 'pt') return seg;
  return 'fr';
}

export function keyFromPath(pathname: string): RouteKey {
  const parts = pathname.split('/').filter(Boolean);
  // drop language segment if present
  if (parts[0] === 'fr' || parts[0] === 'en' || parts[0] === 'pt') {
    parts.shift();
  }
  const rest = parts.join('/');

  if (rest === '' || rest === '/') return 'home';

  // Map known slugs to keys
  if (['services', 'servicos'].includes(rest)) return 'services';
  if (['destinations', 'destinos'].includes(rest)) return 'destinations';
  if (['contact', 'contacto'].includes(rest)) return 'contact';
  if (['legal', 'legal-notice', 'mentions-legales', 'aviso-legal'].includes(rest)) return 'legal';
  if (['services/fret-maritime', 'servicos/frete-maritimo', 'services/maritime-freight'].includes(rest)) return 'services_freight_maritime';

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
 * - nested: 'services/fret-maritime'
 */
export function localizeTo(to: string, lang: Lang): string {
  const normalized = to.replace(/^\/+/, ''); // remove leading slash
  const key = keyFromPath(`/${lang}/${normalized}`);
  return pathForLang(key, lang);
}