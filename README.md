# MB Fret Services — Site fictif de logistique

![Node](https://img.shields.io/badge/node-20%2B-3c873a) ![License](https://img.shields.io/badge/license-MIT-green) ![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blue)

Ce projet est un **site fictif** développé à des fins de **démonstration technique** (portfolio). Il ne représente pas une entreprise réelle.

## Présentation

Ce projet est un site web fictif représentant une entreprise de fret international.

Il a été développé dans le but de démontrer des compétences en développement web moderne, SEO technique et architecture frontend.

Le projet est utilisé comme démonstration technique dans le cadre de mon activité de développement web.

## Objectifs du projet

- démontrer la création d'un site vitrine professionnel
- mettre en place une architecture SEO internationale
- construire une interface responsive moderne
- implémenter une pipeline qualité (CI/CD)

## Démo

- Site (démo) : https://mb-fretservices.com/
- robots.txt : https://mb-fretservices.com/robots.txt
- sitemap.xml : https://mb-fretservices.com/sitemap.xml
- ai.txt : https://mb-fretservices.com/ai.txt

## Technologies utilisées

- React
- TypeScript
- Vite
- TailwindCSS
- i18next
- GitHub Actions

## Fonctionnalités

- site multilingue
- SEO international (canonical + hreflang)
- sitemap et robots générés automatiquement
- JSON-LD (Organization, WebSite, WebPage, BreadcrumbList)
- optimisation Core Web Vitals
- accessibilité (WCAG)
- CI/CD GitHub Actions (lint, typecheck, tests, build + audit)

## Screenshots

Ajoutez des captures dans `public/screenshots/` (idéalement 1200×630 ou 1440×900).

- Génération automatisée (Puppeteer) :
  - `BASE_URL="https://mb-fretservices.com" npm run screenshots`

Exemples attendus :

- `public/screenshots/home.png`
- `public/screenshots/services.png`
- `public/screenshots/destinations.png`
- `public/screenshots/contact.png`

Puis référencez-les ici :

- `![Accueil](public/screenshots/home.png)`
- `![Services](public/screenshots/services.png)`

## Architecture

- SPA React (React Router) avec URLs localisées `/:lng/...`.
- SEO par page via `react-helmet-async` (title, metas, OG/Twitter, canonical, hreflang).
- Données structurées JSON‑LD via composants dédiés.
- Génération post-build : `sitemap.xml`, `robots.txt`, `ai.txt`.
- Pré‑rendu (SSG) via Puppeteer pour fournir un HTML initial riche sur certaines langues/pages.

Détails : voir `documentation/ARCHITECTURE.md`.

## Déploiement

### Prérequis

- Node.js 20+
- `npm ci`

### Développement

- `npm run dev`

### Build

- `npm run build`
- `npm run preview`

### GitHub Pages

- Workflow : `.github/workflows/pages.yml`
- Base path : contrôlé par `VITE_BASE` (auto sur Actions)
- Fallback SPA : copie `dist/index.html` → `dist/404.html`

### Netlify

- Build : `npm run build` → `dist/`
- Configuration : `netlify.toml` (redirects, headers de sécurité)
- Variables utiles :
  - `VITE_SITE_URL`
  - `VITE_GA_ID` (optionnel)

## À propos du développeur

Ce projet a été développé par :

SmarterLogicWeb  
https://www.smarterlogicweb.com/

Ce projet fait partie de mon portfolio de développeur web et sert à démontrer mes compétences en création de sites professionnels.

---

### Mention explicite (important)

Ce projet est un site fictif développé à des fins de démonstration technique. Aucune information commerciale ne doit être considérée comme réelle.
