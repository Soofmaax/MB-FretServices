import { getSiteUrl } from './siteUrl';
import { detectLangFromPath, keyFromPath, pathForLang, type Lang } from './paths';

export const DEFAULT_SITE_NAME = 'MB Fret Services';

// Prefer env-defined OG image (can be /og-default.webp), else external fallback
export const DEFAULT_OG_IMAGE =
  (import.meta.env?.VITE_OG_IMAGE as string | undefined) || '/logo-mbfs.png';

const ENV_SUP_LANGS = (import.meta.env?.VITE_SUP_LANGS as string | undefined)
  ? (import.meta.env.VITE_SUP_LANGS as string).split(',').map((s) => s.trim()).filter(Boolean)
  : [];

// Only three primary languages are exposed: French, English and Portuguese.
export const SUP_LANGS: Lang[] =
  (ENV_SUP_LANGS.length ? (ENV_SUP_LANGS as Lang[]) : (['fr', 'en', 'pt'] as Lang[]));

export const OG_LOCALE_MAP: Record<Lang, string> = {
  fr: 'fr_FR',
  en: 'en_GB',
  pt: 'pt_PT',
};

export function getCurrentLangFromPath(): Lang {
  if (typeof window === 'undefined') return 'fr';
  return detectLangFromPath(window.location.pathname);
}

export function buildAlternateLinks(): { href: string; hrefLang: string }[] {
  if (typeof window === 'undefined') return [];
  const site = getSiteUrl();
  const key = keyFromPath(window.location.pathname);

  const hreflangMap: Record<Lang, string> = {
    fr: 'fr-FR',
    en: 'en-GB',
    pt: 'pt-PT',
  };

  const alternates = SUP_LANGS.map((lng) => {
    const rel = pathForLang(key, lng).replace(/^\//, ''); // make relative so BASE_URL is preserved
    const href = new URL(rel, site).href.replace(/\/$/, '');
    const hrefLang = hreflangMap[lng];
    return { href, hrefLang };
  });

  const regional: Array<{ href: string; hrefLang: string }> = [];
  for (const lng of SUP_LANGS) {
    const rel = pathForLang(key, lng).replace(/^\//, '');
    const baseHref = new URL(rel, site).href.replace(/\/$/, '');
    if (lng === 'fr') {
      ['fr-CI','fr-CM','fr-CD','fr-SN','fr-GA','fr-BJ','fr-TG','fr-FR'].forEach((code) => regional.push({ href: baseHref, hrefLang: code }));
    } else if (lng === 'en') {
      ['en-GB','en-US','en-NG','en-GH','en-KE','en-ZA','en-UG','en-RW','en-TZ'].forEach((code) => regional.push({ href: baseHref, hrefLang: code }));
    } else if (lng === 'pt') {
      ['pt-PT','pt-AO','pt-MZ','pt-BR'].forEach((code) => regional.push({ href: baseHref, hrefLang: code }));
    }
  }

  return [...alternates, ...regional];
}