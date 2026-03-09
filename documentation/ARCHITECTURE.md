# ARCHITECTURE

Ce projet est un **site fictif** développé à des fins de **démonstration technique** (portfolio). Il ne représente pas une entreprise réelle.

Ce document décrit l’architecture du site vitrine (React + Vite + TypeScript) et les choix de conception orientés **SEO technique**, **performance** et **qualité**.

## 1. Structure du projet

- `src/`
  - `pages/` : pages routées (Home, Services, Destinations, Contact, Legal, pages “pillar”, etc.)
  - `components/`
    - composants transverses (Navbar, Footer, SEO, SiteSEO, CookieConsent, etc.)
    - `components/ui/` : UI générique (Hero, ResponsiveImage, animations, etc.)
    - `components/industry/` : composants “métier” (logistique/fret) — facilement remplaçables pour un autre secteur
  - `utils/` : helpers (URL de site, hreflang, routes i18n, etc.)
  - `i18n.ts` : configuration i18next
- `public/`
  - `locales/{lng}/*.json` : traductions
  - fichiers générés post-build : `robots.txt`, `sitemap.xml`, `ai.txt`
  - `screenshots/` : captures (README)
- `scripts/` : scripts Node post-build (sitemap/robots/ai.txt/SSG + audits)
- `.github/workflows/` : CI/CD (lint/typecheck/tests/build + déploiement + audits)

## 2. Routage & i18n

### 2.1 Routage

- SPA via `react-router-dom`.
- URLs localisées via préfixe `/:lng/...`.
- Les liens internes utilisent `LocalizedLink` pour générer des URLs cohérentes (et éviter les erreurs de traduction de routes).

### 2.2 Gestion des traductions

- i18n via `i18next` + `react-i18next`.
- Fichiers JSON par namespace (ex: `home.json`, `services.json`, `footer.json`) et par langue (ex: `public/locales/fr`).
- Objectif : maintenir un contenu traduisible, versionné, et compatible avec une stratégie SEO multilingue.

## 3. SEO technique

### 3.1 Balises meta (par page)

- `src/components/SEO.tsx` :
  - `<title>`
  - `<meta name="description">`
  - Open Graph / Twitter Card
  - canonical
  - hreflang alternates

### 3.2 Données structurées (JSON‑LD)

- `src/components/SiteSEO.tsx` : JSON‑LD global (site / organisation) et patterns réutilisables.
- Pages spécifiques : ajout de JSON‑LD contextuel (ex: `BreadcrumbList`, `WebPage`).

### 3.3 SEO international

- Hreflang : généré par `src/utils/seoHelpers.ts` + rendu via `SEO.tsx`.
- Sitemap multilingue : généré via `scripts/generate-sitemap.mjs` (avec alternates hreflang dans le XML).

## 4. Génération post-build (robots/sitemap/ai.txt)

Scripts exécutés en `postbuild` :

- `scripts/generate-sitemap.mjs`
- `scripts/generate-robots.mjs`
- `scripts/generate-ai-txt.mjs`

Ces fichiers sont produits dans `dist/` afin d’être servis correctement après déploiement.

## 5. Pré-rendu (SSG)

- `scripts/ssg-prerender.mjs` : génère des snapshots HTML pour un ensemble de routes/langues.
- Objectif :
  - améliorer l’HTML initial (SEO, partage social, crawlers)
  - limiter le coût de mise en place d’un SSR complet (pour un site vitrine)

## 6. Qualité, accessibilité et performance

- ESLint + TypeScript strict.
- Tests via Vitest + Testing Library.
- Patterns a11y : landmarks (`<main>`), gestion du focus, labels, `aria-hidden` sur icônes décoratives.
- Images : composant `ResponsiveImage` (dimensions explicites pour réduire le CLS).

## 7. CI/CD

Workflows clés :

- `ci.yml` : lint, typecheck, tests, build
- `pages.yml` : déploiement GitHub Pages
- `pr-audit.yml` : audit automatisé (liens, headers, Lighthouse, a11y) + Quality Gate

## 8. Déploiement

- GitHub Pages : base path automatique (user/org vs project pages) + fallback SPA (404).
- Netlify : `netlify.toml` configure build/publish, redirects, headers de sécurité et cache.