# MB Fret Services — Site vitrine (React + Vite + TS)

![Node](https://img.shields.io/badge/node-20%2B-3c873a) ![License](https://img.shields.io/badge/license-MIT-green) ![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)

Site multilingue optimisé pour le SEO international (Europe ↔ Afrique ↔ Asie), prêt pour GitHub Pages et Netlify. Stack moderne, CI stricte, accessibilité et sécurité soignées.

## Sommaire
- Aperçu
- Démo & Liens
- Captures (Screenshots)
- Stack & Architecture
- Fonctionnalités clés
- Qualité & CI
- Démarrage & Scripts
- Déploiement (GitHub Pages, Netlify)
- Audit automatisé (PR & site)
- Sécurité & Headers
- Accessibilité (WCAG AA)
- Performance (Core Web Vitals)
- SEO technique
- Variables d’environnement
- Infos à renseigner (TODO)
- Contribuer
- Changelog
- Développé par

## Aperçu
Ce projet React + TypeScript (Vite) propose:
- Pages multilingues (FR/EN/PT + autres)
- Métadonnées par page (Helmet), JSON‑LD (Organization, WebSite, LocalBusiness)
- Sitemap & robots générés automatiquement
- SSG partiel (pré‑rendu FR/EN/PT) pour un HTML initial riche (SEO/unfurl/IA)
- Design Tailwind épuré, animations discrètes, CTA principaux bien mis en avant

## Démo & Liens
- Live: https://mb-fretservices.com/
- robots.txt: https://mb-fretservices.com/robots.txt
- sitemap.xml: https://mb-fretservices.com/sitemap.xml
- ai.txt: https://mb-fretservices.com/ai.txt

## Captures (Screenshots)
Générez des captures et placez‑les dans `public/screenshots`:
- Installer Puppeteer si nécessaire
- `npm run screenshots` (BASE_URL=... pour pointer vers prod ou preview)

## Stack & Architecture
- React 18, TypeScript 5, Vite 5, Tailwind CSS 3
- Routing via React Router
- Helmet pour SEO (title, description, canonical, OG/Twitter)
- i18next pour i18n (9 langues)
- SSG via Puppeteer postbuild (FR/EN/PT)
- Détails: voir documentation/ARCHITECTURE.md

## Fonctionnalités clés
- SEO International:
  - Canonical/hreflang par page
  - JSON‑LD (Organization, WebSite, LocalBusiness) avec `openingHours`
  - Sitemap postbuild, robots.txt pointant vers le sitemap
- Accessibilité:
  - Skip link (`#main`), focus automatique, scroll‑to‑top à chaque navigation
  - Icônes décoratives `aria-hidden="true"`
- UX:
  - Hero avec messages clairs, badges de réassurance
  - Liens rapides vers Services/Destinations/Contact
- SSG:
  - Snapshots FR/EN/PT dans `dist/<route>/index.html`

## Qualité & CI
- ESLint (type‑aware), TypeScript strict, Vitest
- CI GitHub Actions (lint, typecheck, test, build)
- Audit PR automatique: `.github/workflows/pr-audit.yml`
  - Liens brisés (404)
  - En‑têtes HTTP (CSP, XFO, XCTO, Referrer‑Policy)
  - Lighthouse (Perf/A11y/Best Practices/SEO)
  - Accessibilité (pa11y)
  - Quality Gate: Perf ≥ 90, pas de 404, headers critiques présents, pas d’erreurs a11y

## Démarrage & Scripts
Installer:
- `npm ci`

Développement:
- `npm run dev`

Format / Lint / Typecheck / Tests:
- `npm run lint`
- `npm run typecheck`
- `npm run test`

Build & Preview:
- `npm run build` (minification JS/CSS, optimisation des assets par Vite)
- `npm run preview`

SSG & Génération:
- Postbuild: sitemap.xml, robots.txt, ai.txt, SSG FR/EN/PT

Audit manuel (site):
- `BASE_URL="https://example-preview" npm run audit:site`
- Produit `audit-report.md` (liens, robots/sitemap, metas homepage)

Screenshots:
- `BASE_URL="https://example" npm run screenshots`
- Images sous `public/screenshots/*.png`

## Déploiement

### GitHub Pages
- Workflow: `.github/workflows/pages.yml` (build + deploy)
- Fallback SPA: copie `dist/index.html` → `dist/404.html`
- Base path (VITE_BASE):
  - User/Org Pages (`username.github.io`): `VITE_BASE=/`
  - Project Pages (`username.github.io/repo`): `VITE_BASE=/REPO-NAME/`
  - Détermination automatique côté Actions

### Netlify
- Build: `npm run build` → `dist/`
- Configuration: `netlify.toml` (publish, redirects, en‑têtes de sécurité)
- Variables: `VITE_SITE_URL`, `VITE_GA_ID` (optionnel), `VITE_GSC_VERIFICATION` / `VITE_BING_VERIFICATION` (optionnels)
- Redirections SEO et fallback SPA définis dans `netlify.toml`

## Audit automatisé (PR & site)
- PR: audit qualité avec commentaire (voir `.github/workflows/pr-audit.yml`)
- Site: `npm run audit:site` avec `BASE_URL` (sitemap + metas)

## Sécurité & Headers
- CSP: `default-src 'self'`, script‑src autorise GTAG/Clarity si activés
- X‑Frame‑Options: DENY
- X‑Content‑Type‑Options: nosniff
- Referrer‑Policy: no-referrer
- COOP/CORP: same-origin
- Permissions‑Policy: fonctionnalités critiques désactivées
- Cache‑Control: immutable sur `/assets/*`, no‑cache sur pages clés
- HSTS: activer côté domaine (CDN / Netlify si supporté)

## Accessibilité (WCAG AA)
- Navigation clavier: skip link “Passer au contenu”
- Landmarks: `<main id="main">` focus auto
- Contrastes: palette lisible, hover/focus visibles
- Images: alt descriptifs, dimensions explicites

## Performance (Core Web Vitals)
- Preload hero, preconnect vers ressources externes
- Dimensions d’images explicites (réduction du CLS)
- Recommandé:
  - WebP/AVIF + srcset/sizes pour hero/sections
  - Fonts locales si CSP stricte (font‑src)

## SEO technique
- Canonical/OG/Twitter alignés sur domaine prod
- JSON‑LD (Organization, WebSite, LocalBusiness)
- robots.txt & sitemap.xml générés
- hreflang + variantes régionales (fr‑CI, en‑GB, pt‑AO, etc.)

## Variables d’environnement
Exemple (`.env.example`):
- `VITE_SITE_URL=https://example.com`
- `VITE_BASE=/` (ou `/REPO-NAME/` pour Project Pages)
- `VITE_GA_ID=G-XXXXXXXXXX`
- `VITE_GSC_VERIFICATION=...` (optionnel)
- `VITE_BING_VERIFICATION=...` (optionnel)

## Infos à renseigner (TODO)
- SIRET / Immatriculation: à compléter (Legal / Footer)
- Hébergeur: nom + adresse (Legal)
- Réseaux sociaux (sameAs JSON‑LD): LinkedIn, X/Twitter, Instagram, Facebook
- `og:image` par défaut: possibilité d’ajouter `public/og-default.webp` et référencer dans Helmet
- Images hero: personnalisation future (actuellement image Pexels)
- Micro‑animations: optionnel (gardez `prefers-reduced-motion`)

## Contribuer
Voir CONTRIBUTING.md pour les conventions de commits, branches, CI et guidelines. Consultez également documentation/STYLEGUIDE.md pour les conventions de style.


## Changelog
- 2025‑01‑03 — Docs: refonte complète du README et ajout ARCHITECTURE/CONTRIBUTING/VISUELS
- 2025‑01‑03 — Branding: intégration SmarterLogic Web (Footer, Mentions Légales, JSON‑LD, ai.txt)
- 2025‑01‑03 — Qualité: audit PR (liens, headers, Lighthouse, a11y, Quality Gate)
- 2025‑01‑03 — SSG: pré‑rendu FR/EN/PT via Puppeteer
- 2025‑01‑03 — Sécurité: CSP sans nonce + headers Pages

## Développé par
Développé par **SmarterLogicWeb**.

Pour en savoir plus ou pour nous contacter, visitez notre site: https://smarterlogiqueweb.com.

- Branding & Identité Visuelle
- Développement Front‑End
- Optimisation SEO
