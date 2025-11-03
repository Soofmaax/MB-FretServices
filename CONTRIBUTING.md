# Contributing

Merci de contribuer à ce projet. Voici les lignes directrices.

## Branches

- `feature/<slug>` — nouvelles fonctionnalités (ex: `feature/branding-smarterlogic`)
- `fix/<slug>` — corrections (ex: `fix/legal-contact`)
- `docs/<slug>` — documentation

## Commits

Utilisez les Conventional Commits:
- `feat: ...` — nouvelle fonctionnalité
- `fix: ...` — correction
- `docs: ...` — documentation
- `chore: ...` — CI/tooling

## Pull Requests

- Cible: `main`
- Décrire clairement les changements (screenshots si UI)
- La CI déclenche un audit PR:
  - Liens brisés (404)
  - En‑têtes HTTP (CSP, XFO, XCTO, Referrer‑Policy)
  - Lighthouse (Perf/A11y/BP/SEO)
  - Accessibilité (pa11y)
- Le Quality Gate doit être vert (sinon expliquer et fournir un plan d’action)

## Tests & Qualité

- `npm run lint`, `npm run typecheck`, `npm run test`
- `npm run build` (postbuild génère sitemap/robots/ai.txt + SSG)
- `npm run preview` pour tester le build

## i18n

- Ajouter les clés dans `public/locales/{lng}/...`
- Lancer `npm run i18n:sync` pour aligner les traductions

## Déploiement

### GitHub Pages
- Settings → Pages → Source: GitHub Actions
- Push sur `main` → déploiement auto
- Base path (`VITE_BASE`) déterminé automatiquement (user/org vs project pages)

### Cloudflare Pages
- Build `dist`, fichiers `_headers` et `_redirects` pris en charge
- Activer HSTS côté domaine, HTTP/3 et Brotli

Merci !