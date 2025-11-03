# MB Fret Services — Site statique (React + Vite + TS)

Projet de site vitrine multilingue (FR/EN/PT/ES/AR/TR/DE/IT/SW) pour services de transport international. Stack moderne : React 18, Vite 5, TypeScript, Tailwind CSS, i18next, react-helmet-async.

Note : ce dépôt est destiné au développement. Les URLs finales (production) se configurent via `VITE_SITE_URL` au moment du déploiement.

## Démarrage

- Node.js 20+
- npm 9+

Installer et lancer :
- `npm ci`
- `npm run dev`  → http://localhost:5173

Vérifications :
- `npm run lint`
- `npm run typecheck`

Build :
- `npm run build`
- `npm run preview`  → sert `dist/` en local

## Internationalisation (i18n)

Traductions dans `public/locales/{lng}/{ns}.json`. Langues activées : fr, en, pt, es, ar, tr, de, it, sw.

Synchroniser les clés manquantes :
- `npm run i18n:sync`

Variables supportées :
- `DEEPL_API_KEY` (optionnel, sinon fallback LibreTranslate)
- `DEEPL_API_URL`, `LIBRETRANSLATE_URL`
- `I18N_TARGET_LANGS`, `I18N_CONCURRENCY`, `DRY_RUN`

Cache : `.cache/i18n-cache.json`.

## SEO

- Balises par page via `react-helmet-async` (`src/components/SEO.tsx`).
- Données structurées globales via `SiteSEO` (Organization, WebSite) + `LocalBusiness` avec coordonnées géo (Paris).
- Sitemap XML généré poste-build par `scripts/generate-sitemap.mjs` et copié dans `public/` (+ dist/).
- robots.txt généré poste-build par `scripts/generate-robots.mjs` (autorise explicitement GPTBot, Google-Extended, ClaudeBot, PerplexityBot, CCBot, Applebot-Extended) et référence le sitemap.
- ai.txt (manifest pour LLM) généré poste-build par `scripts/generate-ai-txt.mjs` à la racine du site. Ce fichier résume les services, langues, zones desservies, pages clés et exemples d’intentions pour faciliter la compréhension des IA génératives.

Astuce : définissez `VITE_SITE_URL` (ex : `.env.production`) pour produire des canoniques/hreflang/sitemap/ai.txt corrects en production.

### Déploiement Cloudflare Pages

Le site est désormais prévu pour Cloudflare Pages (statique + SPA fallback).  
Build :
- Commande : `npm run build`
- Dossier de sortie : `dist`

Fichiers de configuration inclus :
- `public/_headers` — en-têtes de sécurité et cache (copié en `dist/` au build)
- `public/_redirects` — redirections SEO et fallback SPA

Variables d’environnement à définir dans Pages :
- `VITE_SITE_URL` (URL publique)
- `VITE_GA_ID` (optionnel, Analytics)
- `VITE_GSC_VERIFICATION` / `VITE_BING_VERIFICATION` (optionnels, vérifs moteur)

Tests rapides :
- Redirections : `curl -I https://mb-fretservices.com/fret-maritime` (301 vers `/fr/services/fret-maritime`)
- Headers : `curl -I https://mb-fretservices.com/` (CSP, X-Frame-Options…)
- Fallback SPA : accéder à une route non listée → renvoie `index.html`

Prerendering (alternative à Netlify) :
- Cloudflare Pages n’a pas de prerender intégré. Deux options :
  - SSG (pré-rendu au build) avec Vite SSG pour les pages/langues principales
  - Workers + service externe (ex. Prerender.io) pour servir HTML pré-rendu aux bots Prerendering (Netlify)

Pour les SPA, Netlify peut servir une version pré-rendue aux crawlers (SEO, unfurling social, IA).

- Activer : Netlify → Project configuration → Build & deploy → Post processing → Prerendering (toggle).
- Cache : les pages pré-rendues sont mises en cache 24–48h (non invalidé par un nouveau déploiement).
- Test manuel :
  - `curl -A twitterbot https://mb-fretservices.com/fr` (UA crawler reconnu)
  - `https://mb-fretservices.com/fr/?_escaped_fragment_=` (forçage)
- Bonnes pratiques :
  - Vérifier les balises OG/Twitter (Helmet) et <title>/<meta>.
  - Éviter d’ajouter des `<script>` critiques en tête qui pourraient perturber l’extraction des meta par certains crawlers.
- Alternative : Netlify Prerender Extension (UI) si vous souhaitez plus de visibilité/logs.

## Analytics

- Google Analytics 4 (GTAG) léger, respectant Do Not Track et anonymisation IP.
- Variables :
  - `VITE_GA_ID=G-XXXXXXXXXX` (laisser vide pour désactiver)
- Intégration : initialisation dans `src/main.tsx`, page_view sur chaque navigation dans `LangLayout`.

## Accessibilité

- Lien d’évitement « Passer au contenu principal ».
- Focus automatique sur `<main id="main">` après navigation.
- Icônes décoratives marquées `aria-hidden="true"`.

## Sécurité (front)

CSP dans `index.html` :
- script-src `self` + GTM
- connect-src pour GA
- style-src `self` + Google Fonts (avec `'unsafe-inline'`)
- font-src Google Fonts
- img-src `self` + images.pexels.com + GA + `data:`
- frame-ancestors 'none', upgrade-insecure-requests

Adapter si vous ajoutez d’autres domaines (CDN/analytics).

## Performance

- Preload de l’image « hero ».
- Preconnect vers images.pexels.com, Google Fonts, GTM/GA.
- Dimensions d’images explicites (réduction du CLS).

## Routage et langues

- SPA via React Router, préfixe `/:lng/...`.
- `LocalizedLink` pour la construction des URLs localisées.
- `LangLayout` positionne `lang`/`dir` sur `<html>`.

## Variables d’environnement

Exemple (`.env.example`) :
- `VITE_SITE_URL=https://example.com`
- `VITE_GA_ID=G-XXXXXXXXXX`
- `VITE_GSC_VERIFICATION=...` (optionnel, Google Search Console)
- `VITE_BING_VERIFICATION=...` (optionnel)

## Scripts

- `dev` — serveur Vite
- `build` — build de prod
- `preview` — prévisualisation du build
- `lint` — ESLint
- `typecheck` — TypeScript
- `prebuild` — i18n sync (best-effort)
- `postbuild` — sitemap + robots + ai.txt

## Déploiement

- Définir `VITE_SITE_URL` (URL publique finale).
- `npm run build` (sitemap/robots/ai.txt générés).
- Servir `dist/` avec fallback SPA (/* → /index.html) si nécessaire.

### GitHub Pages

Support pour GitHub Pages (SPA) inclus :
- Workflow : `.github/workflows/pages.yml` (build + upload + deploy Pages)
- Fallback SPA : copie automatique `dist/index.html` → `dist/404.html` (voir CI)
- VITE_BASE :
  - User/Organization Pages (`username.github.io`) : laissez `VITE_BASE=/`
  - Project Pages (`username.github.io/repo`) : définissez `VITE_BASE=/REPO-NAME/`
  - Configurable via env ou `.env.production`

Activer Pages :
- Settings → Pages → Source: GitHub Actions
- Pousser sur `main`, le workflow déploie vers Pages.

### Cloudflare Pages

Voir section dédiée plus haut (build `dist`, fichiers `public/_headers` et `public/_redirects` pris en charge).

En-têtes de sécurité côté plateforme recommandés (HSTS, Permissions-Policy…).

## Licence

Ce dépôt inclut un fichier `LICENSE` (MIT). Adapter si nécessaire.

## Développé par

Ce projet a été conçu et développé par SmarterLogic Web.

Pour en savoir plus ou pour nous contacter, visitez notre site : https://smarterlogiqueweb.com.

- Branding & Identité Visuelle
- Développement Front-End
- Optimisation SEO
