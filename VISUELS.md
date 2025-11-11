# VISUELS (Logos, Favicons, OpenGraph, Hero)

Ce fichier liste les visuels manquants/à fournir et leur emplacement exact pour finaliser le portfolio.

## 1) OpenGraph/Twitter (image par défaut)

- Fichier: `index.html`, lignes ~24–33
  - `<meta property="og:image" ...>` et `<meta property="twitter:image" ...>` pointent vers une image Pexels.
  - À fournir: `public/og-default.webp` (1200×630 ou 1600×900), poids < 300 Ko.
  - Action: mettre à jour `index.html` et `src/utils/seoHelpers.ts` (const `DEFAULT_OG_IMAGE`, ligne ~5).

## 2) Hero (home)

- Fichier: `src/components/Hero.tsx`, constante `HERO_IMG` (ligne ~7) et `<ResponsiveImage ...>` (lignes ~15–28).
  - Actuel: image Pexels distant.
  - À fournir: `/public/images/hero-{800,1200,1600}.{avif,webp,jpg}`.
  - Action: remplacer `HERO_IMG` par `/images/hero-1600.webp` + prop `webpSrc`/`avifSrc` si local.

## 3) Freight Maritime (hero + section)

- Fichier: `src/pages/FreightMaritime.tsx`
  - Hero `<ResponsiveImage ...>` (ligne ~39) — Pexels 1600.
  - Image section détaillée `<ResponsiveImage ...>` (ligne ~130) — Pexels 800.
  - À fournir: `/public/images/freight-hero-{800,1200,1600}.{avif,webp,jpg}`, `/public/images/freight-detail-{800,1200,1600}.{avif,webp,jpg}`.

## 4) Services (grid visuels)

- Fichier: `src/pages/Services.tsx`
  - Images Pexels dynamiques (lignes ~89–116).
  - À fournir: `/public/images/services-{maritime,air,customs,insurance}-{800,1200,1600}.{avif,webp,jpg}`.

## 5) Destinations Showcase (home)

- Fichier: `src/components/DestinationsShowcase.tsx`, `<ResponsiveImage ...>` (lignes ~32–41).
  - Actuel: URL d’images dans `public/locales/*/home.json` (4 visuels par langue).
  - À fournir: `/public/images/showcase-{1..4}-{800,1200,1600}.{avif,webp,jpg}` et mise à jour des fichiers `home.json` pour utiliser les chemins locaux.

## 6) JSON‑LD LocalBusiness (image)

- Fichier: `src/components/SiteSEO.tsx`, propriété `image` (ligne ~34).
  - Actuel: Pexels 1200.
  - À fournir: `/public/images/localbusiness-1200.webp`.

## 7) Favicons & manifest

- Fichier: `public/favicon.svg` — OK.
- Optionnel: `public/site.webmanifest` + icônes 192×192, 512×512.

## 8) Screenshots (portfolio)

- Script: `scripts/screenshots.mjs`
- Sortie: `public/screenshots/*.png`
- À intégrer au README si souhaité.

Notes:
- Nomenclature recommandée pour srcset: `{name}-{800,1200,1600}.{avif,webp,jpg}`.
- Toujours fournir `width`/`height` ou un ratio CSS pour éviter le CLS.
- Vérifier le chargement en production (PSI/Lighthouse) et ajuster `sizes` si nécessaire.