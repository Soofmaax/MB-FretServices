import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { buildCanonical } from '../utils/seo';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, keyFromPath, pathForLang, type Lang } from '../utils/paths';

type SEOProps = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const DEFAULT_SITE_NAME = 'MB Fret Services';
const DEFAULT_OG_IMAGE =
  'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1600';

const SUP_LANGS: Lang[] = ['fr', 'en', 'pt', 'ar', 'es', 'tr', 'sw', 'de', 'it'];
const OG_LOCALE_MAP: Record<Lang, string> = {
  fr: 'fr_FR',
  en: 'en_GB',
  pt: 'pt_PT',
  ar: 'ar_AR',
  es: 'es_ES',
  tr: 'tr_TR',
  sw: 'sw_KE',
  de: 'de_DE',
  it: 'it_IT',
};

function getCurrentLangFromPath(): Lang {
  if (typeof window === 'undefined') return 'fr';
  return detectLangFromPath(window.location.pathname);
}

function buildAlternateLinks(): { href: string; hrefLang: string }[] {
  if (typeof window === 'undefined') return [];
  const site = getSiteUrl();
  const key = keyFromPath(window.location.pathname);

  const hreflangMap: Record<Lang, string> = {
    fr: 'fr-FR',
    en: 'en-GB',
    pt: 'pt-PT',
    ar: 'ar',
    es: 'es-ES',
    tr: 'tr-TR',
    sw: 'sw-KE',
    de: 'de-DE',
    it: 'it-IT',
  };

  const alternates = SUP_LANGS.map((lng) => {
    const href = new URL(pathForLang(key, lng), site).href.replace(/\/$/, '');
    const hrefLang = hreflangMap[lng];
    return { href, hrefLang };
  });

  // Regional variants per language (point to same URL)
  const regional: Array<{ href: string; hrefLang: string }> = [];
  for (const lng of SUP_LANGS) {
    const baseHref = new URL(pathForLang(key, lng), site).href.replace(/\/$/, '');
    if (lng === 'fr') {
      ['fr-CI','fr-CM','fr-CD','fr-SN','fr-GA','fr-BJ','fr-TG','fr-FR'].forEach((code) => regional.push({ href: baseHref, hrefLang: code }));
    } else if (lng === 'en') {
      ['en-GB','en-US','en-NG','en-GH','en-KE','en-ZA','en-UG','en-RW','en-TZ'].forEach((code) => regional.push({ href: baseHref, hrefLang: code }));
    } else if (lng === 'pt') {
      ['pt-PT','pt-AO','pt-MZ','pt-BR'].forEach((code) => regional.push({ href: baseHref, hrefLang: code }));
    } else if (lng === 'es') {
      ['es-ES','es-MX','es-CL','es-AR','es-CO','es-PE'].forEach((code) => regional.push({ href: baseHref, hrefLang: code }));
    } else if (lng === 'ar') {
      ['ar','ar-MA','ar-DZ','ar-TN','ar-EG','ar-SA','ar-AE'].forEach((code) => regional.push({ href: baseHref, hrefLang: code }));
    } else if (lng === 'tr') {
      ['tr-TR'].forEach((code) => regional.push({ href: baseHref, hrefLang: code }));
    } else if (lng === 'sw') {
      ['sw-KE','sw-TZ'].forEach((code) => regional.push({ href: baseHref, hrefLang: code }));
    } else if (lng === 'de') {
      ['de-DE','de-AT','de-CH'].forEach((code) => regional.push({ href: baseHref, hrefLang: code }));
    } else if (lng === 'it') {
      ['it-IT','it-CH'].forEach((code) => regional.push({ href: baseHref, hrefLang: code }));
    }
  }

  return [...alternates, ...regional];
}

const SEO: FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
  jsonLd,
}) => {
  const url = buildCanonical(canonical);
  const currentLang = getCurrentLangFromPath();
  const ogLocale = OG_LOCALE_MAP[currentLang] ?? 'fr_FR';
  const alternates = buildAlternateLinks();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {!noindex && <meta name="robots" content="index,follow" />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={DEFAULT_SITE_NAME} />
      <meta property="og:locale" content={ogLocale} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Canonical */}
      {url && <link rel="canonical" href={url} />}

      {/* Hreflang alternates */}
      {alternates.map((alt) => (
        <link key={`${alt.hrefLang}-${alt.href}`} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
      ))}
      {/* x-default to EN by convention */}
      {alternates.find((a) => a.hrefLang === 'en-GB') && (
        <link rel="alternate" hrefLang="x-default" href={alternates.find((a) => a.hrefLang === 'en-GB')!.href} />
      )}

      {/* Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;