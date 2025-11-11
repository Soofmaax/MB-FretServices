# STYLEGUIDE

Conventions de style et bonnes pratiques pour garder un code propre, maintenable et performant.

## 1. TypeScript & React

- Types d’abord: préférez `type` et `interface` pour les props et données.
- Composants: fonctions (`FC`) avec props typées.
- Pas d’`any`; utilisez des types explicites.
- Évitez le `default export` pour les utilitaires; gardez le `export default` pour les pages/composants principaux uniquement.

## 2. JSX & Accessibilité

- Sémantique HTML5: `<main>`, `<section>`, `<nav>`, `<footer>`.
- Icônes purement décoratives: `aria-hidden="true"`.
- Focus visible: styles Tailwind cohérents (`focus-visible:ring-2` + `ring-offset-2`).
- Skip link: toujours présent et visible au focus.

## 3. Tailwind CSS

- Utilisez des classes utilitaires simples et stables.
- Évitez les styles inline (CSP).
- Variables: préférez des palettes cohérentes (`primary`, `accent`).
- Animations: discrètes, respect de `prefers-reduced-motion`.

## 4. SEO & Méta

- `SEO.tsx`: renseigner `title`, `description`, `canonical` si nécessaire.
- OG/Twitter: images stables, taille et poids raisonnables (WebP recommandé).
- `SiteSEO.tsx`: JSON‑LD complet (Organization, WebSite, LocalBusiness).

## 5. Liens & Routage

- `LocalizedLink` pour URLs localisées (évite les erreurs de slug).
- Liens externes: toujours `target="_blank"` + `rel="noopener noreferrer"`.

## 6. Performance

- Images: `ResponsiveImage` + `srcset/sizes` si local; `width/height` pour stabilité (CLS).
- Preload: image hero (mobile-friendly).
- Lazy loading: pour sections non critiques (React.lazy + Suspense).

## 7. Sécurité

- CSP sans `unsafe-inline`; pas de JSON‑LD inline avec nonce.
- En‑têtes: XFO=DENY, XCTO=nosniff, Referrer‑Policy=strict-origin-when-cross-origin, COOP/CORP=same-origin.
- HSTS: côté CDN.

## 8. Commits & PR

- Conventional Commits: `feat`, `fix`, `docs`, `chore`.
- Branches: `feature/*`, `fix/*`, `docs/*`.
- PR: description claire, audit PR auto doit être vert.

## 9. Assets & visuels

- Favicons: `public/favicon.svg`.
- OG/Twitter: images sous `public/` (WebP).
- Voir `VISUELS.md` pour les assets manquants et emplacements.