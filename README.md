# MB Fret Services — Site statique (React + Vite + TS)

Projet de site vitrine multilingue (FR/EN/PT/ES/AR/TR/DE/IT/SW) pour services de transport international. Stack moderne : React 18, Vite 5, TypeScript, Tailwind CSS, i18next, react-helmet-async.

Note : ce dépôt est destiné au développement. Les URLs finales (production) se configurent via `VITE_SITE_URL` au moment du déploiement.

## Sommaire

- Démarrage rapide
- Internationalisation (i18n)
- SEO & Données structurées (JSON‑LD)
- SSG (pré‑rendu) FR/EN/PT
- Qualité & CI/CD (Audit PR)
- Sécurité & En-têtes HTTP
- Déploiement (Cloudflare Pages, GitHub Pages)
- Performance & Accessibilité
- Variables d’environnement
- Scripts
- FAQ & Dépannage
- Développé par

## Démarrage rapide

Prérequis :
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

## SEO & JSON‑LD

- Balises par page via `react-helmet-async` (`src/components/SEO.tsx`).
- Données structurées globales via `SiteSEO` (Organization, WebSite, LocalBusiness).
  - `openingHours` fourni, `sameAs` avec placeholders sociaux.
- Sitemap XML généré poste-build par `scripts/generate-sitemap.mjs` et copié dans `public/` (+ dist/).
- robots.txt généré poste-build par `scripts/generate-robots.mjs` (autorise explicitement GPTBot, Google-Extended, ClaudeBot, PerplexityBot, CCBot, Applebot-Extended) et référence le sitemap.
- ai.txt (manifest pour LLM) généré poste-build par `scripts/generate-ai-txt.mjs`.

Astuce : définissez `VITE_SITE_URL` (ex : `.env.production`) pour produire des canoniques/hreflang/sitemap/ai.txt corrects en production.

## SSG (pré‑rendu) FR/EN/PT

Le pré‑rendu statique des pages clés FR/EN/PT est exécuté après `vite build`.

- Script : `scripts/ssg-prerender.mjs` (Puppeteer)
- Sortie : snapshots HTML dans `dist/<route>/index.html`
- Routes couvertes : `/fr`, `/en`, `/pt`, et principales pages services/contact/destinations.

L’objectif est d’améliorer le SEO, l’unfurl social et l’indexation en fournissant un HTML initial riche.

## Qualité & CI/CD (Audit PR)

Un audit automatique est lancé sur chaque Pull Request.

- Workflow : `.github/workflows/pr-audit.yml`
- Vérifications :
  - Liens brisés (404)
  - En‑têtes HTTP (CSP, X‑Frame‑Options, X‑Content‑Type‑Options, Referrer‑Policy)
  - Lighthouse (Performance, A11y, Best Practices, SEO)
  - Accessibilité (pa11y) sur Home/Services/Contact
- Quality Gate (bloquant) :
  - Liens brisés > 0
  - XFO/XCTO/CSP manquants
  - Performance Lighthouse < 85
  - Violations a11y de niveau error
- Rapport : publié en commentaire dans la PR (audit-report.md)

## Sécurité & En‑têtes HTTP

En‑têtes côté Pages (Cloudflare/GitHub Pages) via `public/_headers` :
- Content‑Security‑Policy : `default-src 'self'` + domaines autorisés (GTAG/Clarity)
- X‑Frame‑Options : DENY
- X‑Content‑Type‑Options : nosniff
- Referrer‑Policy : strict-origin-when-cross-origin
- COOP/CORP : same-origin
- Permissions‑Policy : toutes fonctionnalités critiques désactivées
- Cache‑Control : immutable pour assets, no‑cache pour pages clés

Note : activer HSTS au niveau du domaine (Cloudflare → Security) pour `Strict-Transport-Security`.

## Déploiement

- Définir `VITE_SITE_URL` (URL publique finale).
- `npm run build` (sitemap/robots/ai.txt + SSG générés).
- Servir `dist/` avec fallback SPA (/* → /index.html) si nécessaire.

### Cloudflare Pages

Le site est prévu pour Pages (statique + SPA fallback).

Build :
- Commande : `npm run build`
- Sortie : `dist`

Fichiers de configuration :
- `public/_headers` — en‑têtes sécurité et cache
- `public/_redirects` — redirections SEO et fallback SPA

Variables d’environnement (Pages) :
- `VITE_SITE_URL`, `VITE_GA_ID` (optionnel), `VITE_GSC_VERIFICATION` / `VITE_BING_VERIFICATION` (optionnels)

Tests rapides :
- Redirections : `curl -I https://mb-fretservices.com/fret-maritime`
- Headers : `curl -I https://mb-fretservices.com/`
- Fallback SPA : route non listée → `index.html`

### GitHub Pages

Support SPA inclus :
- Workflow : `.github/workflows/pages.yml` (build + deploy)
- Fallback SPA : copie `dist/index.html` → `dist/404.html`

Base path (VITE_BASE) :
- User/Organization Pages (`username.github.io`) : `VITE_BASE=/`
- Project Pages (`username.github.io/repo`) : `VITE_BASE=/REPO-NAME/`
- Détermination automatique côté Actions (pages.yml)

## Performance & Accessibilité

- Hero image en preload, preconnect vers ressources externes.
- Dimensions d’images explicites (réduction CLS).
- A11y : skip link « Passer au contenu », focus visuel, icônes décoratives avec `aria-hidden="true"`.

## Variables d’environnement

Exemple (`.env.example`) :
- `VITE_SITE_URL=https://example.com`
- `VITE_BASE=/` (ou `/REPO-NAME/` pour GitHub Project Pages)
- `VITE_GA_ID=G-XXXXXXXXXX`
- `VITE_GSC_VERIFICATION=...` (optionnel)
- `VITE_BING_VERIFICATION=...` (optionnel)

## Scripts

- `dev` — serveur Vite
- `build` — build de prod
- `preview` — prévisualisation du build
- `lint` — ESLint
- `typecheck` — TypeScript
- `prebuild` — i18n sync (best‑effort)
- `postbuild` — sitemap + robots + ai.txt + SSG
- `test` — Vitest (jsdom)
- `i18n:sync` — synchronisation i18n

## FAQ & Dépannage

- Les metas OG/Twitter ne s’affichent pas sur les partages ?
  - Vérifiez les balises via `SEO.tsx` et exécutez un partage test (Twitter Card Validator, Facebook Debugger).
- Des liens 404 dans l’audit PR ?
  - Consultez le commentaire de PR; corrigez les chemins dans `LocalizedLink` ou les routes.
- HSTS absent dans l’audit PR ?
  - Activez HSTS dans le dashboard de votre CDN (Cloudflare) — l’en‑tête ne peut pas toujours être injecté côté Pages.
- Perf Lighthouse < 85 ?
  - Réduisez les images (WebP/AVIF), vérifiez le poids JS/CSS, limitez les connexions externes.

## Licence

Ce dépôt inclut un fichier `LICENSE` (MIT). Adapter si nécessaire.

## Contribuer

Lignes directrices pour contribuer au projet :

- Branches :
  - `feature/<slug>` pour les nouvelles fonctionnalités (ex : `feature/branding-smarterlogic`)
  - `fix/<slug>` pour les corrections (ex : `fix/footer-link`)
  - `docs/<slug>` pour les changements de documentation
- Commits (conventional commits recommandés) :
  - `feat: ...` nouvelle fonctionnalité
  - `fix: ...` correction de bug
  - `docs: ...` documentation uniquement
  - `chore: ...` tâches diverses (CI, tooling)
- Pull Requests :
  - Base : `main`
  - Inclure une description claire, des screenshots si UI
  - Lancement automatique de l’audit PR (liens, headers, Lighthouse, a11y)
  - Le Quality Gate doit être vert (sinon indiquer la raison et le plan d’action)

Processus de revue :
- Vérifier que le build passe (`npm run build`)
- Lire le rapport d’audit PR posté par la CI
- Résoudre les points bloquants (liens 404, headers manquants, perf < 85, violations a11y)

Guides additionnels :
- i18n : si vous ajoutez des clés, lancez `npm run i18n:sync`
- SEO : assurez-vous que `SEO.tsx` est correctement renseigné sur les nouvelles pages
- SSG : ajoutez la route dans `scripts/ssg-prerender.mjs` si vous souhaitez pré‑rendre une nouvelle page

## Changelog

Ce projet suit un changelog simple (KEEP A CHANGELOG inspiré). Les entrées majeures sont consignées ci‑dessous :

- 2025‑01‑03 — Docs : refonte complète du README (Sommaire, SSG, Qualité, Sécurité, Déploiement, FAQ)
- 2025‑01‑03 — Branding : intégration SmarterLogic Web (Footer, Mentions Légales, JSON‑LD, ai.txt)
- 2025‑01‑03 — Qualité : ajout d’un audit PR (links, headers, Lighthouse, a11y, Quality Gate)
- 2025‑01‑03 — SSG : pré‑rendu FR/EN/PT via Puppeteer
- 2025‑01‑03 — Sécurité : CSP sans nonce + headers Pages

Pour les versions futures, utilisez le format :
- YYYY‑MM‑DD — Type : description concise (module/fichiers)

## Développé par

Ce projet a été conçu et développé par SmarterLogic Web.

Pour en savoir plus ou pour nous contacter, visitez notre site : https://smarterlogiqueweb.com.

- Branding & Identité Visuelle
- Développement Front‑End
- Optimisation SEO

---

## English quick note

Contributing:
- Branches: `feature/<slug>`, `fix/<slug>`, `docs/<slug>`
- Conventional commits: `feat`, `fix`, `docs`, `chore`
- PRs target `main`, CI posts an audit report; Quality Gate must pass.

Changelog:
- Keep a simple dated log (see examples above).

Deployment:
- Cloudflare Pages or GitHub Pages; set `VITE_SITE_URL` and (for project pages) `VITE_BASE=/REPO-NAME/`.
