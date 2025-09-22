import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { buildCanonical } from '../utils/seo';
import { getSiteUrl } from '../utils/siteUrl';

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

const SUP_LANGS = ['fr', 'en', 'pt'] as const;
type Lang = typeof SUP_LANGS[number];

const OG_LOCALE_MAP: Record<Lang, string> = {
  fr: 'fr_FR',
  en: 'en_GB',
  pt: 'pt_PT',
};

function isLang(val: string | undefined): val is Lang {
  return !!val && (SUP_LANGS as readonly string[]).includes(val);
}

function getCurrentLangFromPath(): Lang {
  if (typeof window === 'undefined') return 'fr';
  const seg = window.location.pathname.split('/').filter(Boolean)[0];
  return isLang(seg) ? seg : 'fr';
}

function buildAlternateLinks(): { href: string; hrefLang: string }[] {
  if (typeof window === 'undefined') return [];
  const site = getSiteUrl();
  const parts = window.location.pathname.split('/');
  const pathRest = (() => {
    const [, ...rest] = parts; // drop leading empty string
    if (isLang(rest[0])) {
      rest.shift(); // drop existing lang
    }
    const p = rest.join('/');
    return p ? `/${p}` : '';
  })();

  const alternates = (SUP_LANGS as readonly Lang[]).map((lng) => {
    const href = new URL(`/${lng}${pathRest}`, site).href.replace(/\/$/, '');
    const hrefLang = lng === 'fr' ? 'fr-FR' : lng === 'en' ? 'en-GB' : 'pt-PT';
    return { href, hrefLang };
  });

  return alternates;
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
      {alternates
        .filter((a) => a.hrefLang !== ogLocale.replace('_', '-'))
        .map((a) => (
          <meta key={a.hrefLang} property="og:locale:alternate" content={a.hrefLang.replace('-', '_')} />
        ))}
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
        <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
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