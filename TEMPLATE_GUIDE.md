# Guide de réutilisation du template

## Adaptation rapide (2-3h)
1. Modifier `src/config/site.config.ts` (nom, coordonnées, couleurs)
2. Remplacer tous les JSON dans `public/locales/fr/`
3. Remplacer les images dans `public/images/`
4. Compléter `legal.json` avec les vraies données client

## Adaptation complète (1 jour)
- Remplacer les composants dans `src/components/industry/` par vos besoins métier
- Ajuster les pages dans `src/pages/`
- Adapter le type de `LocalBusiness` dans le schema (SiteSEO) en fonction du secteur

## Checklist pré-déploiement
- [ ] Mentions légales complètes
- [ ] RGPD : politique de confidentialité
- [ ] Images optimisées et avec texte alternatif (alt)
- [ ] Score Lighthouse ≥ 90 (Perf / A11y / Best Practices / SEO)