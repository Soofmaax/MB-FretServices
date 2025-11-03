# VISUELS (Logos, Favicons, OpenGraph, Hero)

Guide pour gérer les assets visuels (logos, favicons, images OG/Twitter, images de hero).

## Favicons & Manifest

- `public/favicon.svg` — favicon principal
- Optionnel: `site.webmanifest` si vous ajoutez un PWA manifest

## OpenGraph & Twitter

- Image par défaut:
  - Index/Helmet: `og:image` pointant vers une image de 1200–1600px large
  - Ratio conseillé: 1200×630 (Twitter: 1200×600)
- Hébergement:
  - Placer les images OG/Twitter sous `public/` ou un CDN stable
- Bonnes pratiques:
  - Poids < 300 Ko si possible (WebP)
  - Titre/description cohérents avec la page

## Hero images

- Utiliser `<picture>` et `ResponsiveImage` pour fournir WebP/AVIF + fallback JPEG
- Définir `width`/`height` ou styles CSS avec aspect ratio pour limiter le CLS
- Preload d’une version adaptée mobile (ex: 1200px)
- `object-position` pour cadrage (ex: `0% 50%`)

## Prise de captures

- Script: `npm run screenshots`
- BASE_URL:
  - `http://localhost:4173` via `npm run preview`
  - ou l’URL de production
- Sortie:
  - Images enregistrées dans `public/screenshots/*.png`
- Intégration au README:
  - Ajoutez des liens Markdown vers `public/screenshots/...` si souhaité

## Conseils de performance

- Préférer WebP/AVIF pour les grandes images
- Éviter des dimensions supérieures à l’espace d’affichage
- `decoding="async"` et lazy loading pour images hors‑écran