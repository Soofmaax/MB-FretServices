# Architecture

Ce document décrit l’architecture du site statique MB Fret Services (React + Vite + TypeScript).

## Arborescence

- `src/`
  - `components/`
    - `Navbar`, `Footer`, `Hero`, `ResponsiveImage`, `SEO`, `SiteSEO`, `LangLayout`, `ScrollToTop`, `CookieConsent`
  - `pages/`
    - `Home`, `Services`, `Destinations`, `FreightMaritime`, `Contact`, `Legal`, `NotFound`
  - `utils/`
    - `seo.ts`, `seoHelpers.ts`, `siteUrl.ts`, `paths.ts`
  - `analytics.ts` — initialisation GA, pageviews
  - `clarity.ts` — initialisation Microsoft Clarity (facultatif)
  - `i18n.ts` — configuration i18next
- `public/`
  - `locales/{lng}/*.json` — traductions
  - `robots.txt`, `sitemap.xml`, `ai.txt`, `404.html`, `favicon.svg`
  - `_headers`, `_redirects` — Cloudflare/GitHub Pages
- `scripts/`
  - `generate-sitemap.mjs`, `generate-robots.mjs`, `generate-ai-txt.mjs`
  - `ssg-prerender.mjs` — pré‑rendu FR/EN/PT
  - `pr-audit.mjs` — audit PR (liens/headers/Lighthouse/a11y)
  - `audit-site.mjs` — audit d’une URL de preview/production
  - `screenshots.mjs` — captures d’écran

## Routage

- SPA via `react-router-dom`, préfixe `/:lng/...`
- `LocalizedLink` gère les URLs localisées
- `LangLayout` positionne `lang` et `dir` sur `<html>`

## SEO

- `SEO.tsx` — métadonnées par page
- `SiteSEO.tsx` — JSON‑LD global (Organization, WebSite, LocalBusiness)
- Canonical/hreflang via `seo.ts`/`seoHelpers.ts`
- `ai.txt` — manifeste IA pour recommandations

## i18n

- i18next avec backend HTTP (chargement JSON depuis `public/locales`)
- Langues activées: fr, en, pt, es, ar, tr, de, it, sw
- Synchronisation best‑effort via `scripts/translate-missing.mjs`

## Sécurité

- CSP orientée `self` dans `_headers` (ajuster domaines tiers si Analytics/Clarity)
- XFO (DENY), XCTO (nosniff), Referrer‑Policy, COOP/CORP, Permissions‑Policy
- HSTS: à activer côté plateforme/domaine (Cloudflare)

## SSG

- `scripts/ssg-prerender.mjs` génère des snapshots HTML pour FR/EN/PT
- Objectif: SEO/unfurl/IA (HTML initial riche)

## Accessibilité

- Skip link `#main`, focus automatique sur `<main>`, scroll‑to‑top sur navigation
- Icônes décoratives `aria-hidden="true"`

## CI/CD

- GitHub Actions:
  - `pages.yml` — déploiement GitHub Pages (base path auto)
  - `pr-audit.yml` — audit de qualité avec commentaire PR
  - `ci.yml` — lint, test, typecheck, build, fallback 404, artefacts