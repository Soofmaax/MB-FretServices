# ARCHITECTURE

Ce document décrit l’architecture du site vitrine MB Fret Services (React + Vite + TypeScript) et les choix de conception.

## 1. Arborescence

- `src/`
  - `components/`
    - `Navbar`, `Footer`, `Hero`, `ResponsiveImage`, `SEO`, `SiteSEO`, `LangLayout`, `ScrollToTop`, `CookieConsent`, `ValuePropositions`, `DestinationsShowcase`
  - `pages/`
    - `Home`, `Services`, `Destinations`, `FreightMaritime`, `Contact`, `Legal`, `NotFound`
  - `utils/`
    - `seo.ts` (canonical), `seoHelpers.ts` (hreflang + OG locale), `siteUrl.ts` (SITE_URL), `paths.ts` (localisation des routes)
  - `analytics.ts` (GTAG avec Consent Mode), `clarity.ts` (Microsoft Clarity, Do Not Track)
  - `i18n.ts` (i18next)
- `public/`
  - `locales/{lng}/*.json` (traductions)
  - `robots.txt`, `sitemap.xml`, `ai.txt`, `favicon.svg`, `404.html`, `screenshots/`
- `scripts/`
  - `generate-sitemap.mjs`, `generate-robots.mjs`, `generate-ai-txt.mjs`
  - `ssg-prerender.mjs` (pré‑rendu FR/EN/PT)
  - `pr-audit.mjs` (audit PR), `audit-site.mjs` (audit d’URL), `screenshots.mjs`
- `.github/workflows/`
  - `ci.yml` (lint, test, typecheck, build, artefact)
  - `pages.yml` (déploiement GitHub Pages)
  - `pr-audit.yml` (audit PR avec Quality Gate)

## 2. Routage & Langues

- SPA via `react-router-dom`, préfixe `/:lng/...`
- `LangLayout` positionne `lang` et `dir` sur `<html>` et déclenche `trackPageview`
- `LocalizedLink` construit les URLs localisées à partir des clés (`paths.ts`)

## 3. SEO & Données structurées

- `SEO.tsx`: `<title>`, `<meta>` (description, OG/Twitter), canonical, hreflang
- `SiteSEO.tsx`: JSON‑LD (Organization, WebSite, LocalBusiness); `openingHours`, `sameAs` placeholders
- `ai.txt`: manifeste IA (pages clés, services, langues, régions)

## 4. SSG / Pré‑rendu

- `scripts/ssg-prerender.mjs`: snapshots HTML des pages FR/EN/PT pour un HTML initial riche
- Objectif: SEO (crawlers), social unfurling, IA

## 5. Sécurité

- En‑têtes via Netlify (`netlify.toml`) et configuration de plateforme: CSP sans nonce, XFO, XCTO, Referrer‑Policy, COOP/CORP, Permissions‑Policy
- HSTS: à activer côté domaine (CDN) si disponible
- Liens externes: `rel="noopener noreferrer"` systématique

## 6. Performance & Accessibilité

- Images: `ResponsiveImage` + dimensions explicites, preload hero
- Accessibilité: skip link `#main`, focus automatique, `aria-hidden` sur icônes décoratives
- Scroll: `ScrollToTop` déclenché sur `pathname`, `search`, `hash`

## 7. CI / Qualité

- Audit PR (`pr-audit.yml`): Liens (404), Headers, Lighthouse, A11y (pa11y), commentaire auto
- Seuils: Perf ≥ 90, pas de 404, headers critiques présents, pas d’erreur a11y

## 8. Déploiement

- GitHub Pages: base path auto (user/org vs project pages), fallback 404
- Netlify: configuration via `netlify.toml` (headers de sécurité, redirections, cache)