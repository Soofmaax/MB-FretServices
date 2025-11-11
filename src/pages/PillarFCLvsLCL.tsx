import type { FC } from 'react';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, pathForLang } from '../utils/paths';

const PillarFCLvsLCL: FC = () => {
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: SITE_URL + (lang === 'fr' ? '/fr/guides/fcl-vs-lcl' : pathForLang('pillar_fcl_lcl', lang)) },
      { '@type': 'ListItem', position: 3, name: 'FCL vs LCL' },
    ],
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'FCL vs LCL — Décider selon volume, délai et risques',
    author: { '@type': 'Organization', name: 'MB Fret Services' },
    publisher: { '@type': 'Organization', name: 'MB Fret Services' },
    mainEntityOfPage: SITE_URL + pathForLang('pillar_fcl_lcl', lang),
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quel seuil de volume pour passer du LCL au FCL ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            "En pratique, autour de 13–15 m³, le FCL devient souvent plus intéressant économiquement et en sécurité. Mais l’arbitrage dépend du port, de la saisonnalité et des contraintes de délai.",
        },
      },
      {
        '@type': 'Question',
        name: 'Le LCL est-il plus risqué ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            "Le groupage implique des manipulations supplémentaires. Un emballage export et une assurance ad valorem réduisent fortement le risque. Pour des marchandises de valeur/sensibles, FCL reste recommandé.",
        },
      },
      {
        '@type': 'Question',
        name: 'Peut-on mixer LCL et aérien pour accélérer une partie du flux ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            "Oui, la multimodalité est un levier utile pour respecter vos jalons clés. Nous calibrons un plan de transport adapté avec consolidation partielle.",
        },
      },
    ],
  };

  return (
    <div className="pt-16">
      <SEO
        title="FCL vs LCL — Comment décider ? | MB Fret Services"
        description="Choisir entre FCL et LCL en B2B maritime: seuils 13–15 m³, sécurité, délais, coûts. Méthode de décision et cas d’usage routes France–Chine/Turquie/Afrique."
        jsonLd={[breadcrumb, articleLd, faqLd]}
      />

      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">FCL vs LCL — Méthode de décision</h1>
          <p className="mt-4 text-xl text-gray-100">
            Optimisez le coût total, la sécurité et le <em>time-to-market</em>. Une méthode claire pour arbitrer selon votre
            volume, vos délais et la sensibilité de la marchandise.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LocalizedLink to="services/fret-maritime" className="underline text-accent-300">Fret maritime</LocalizedLink>
            <LocalizedLink to="services/fret-maritime/france-chine" className="underline text-accent-300">France–Chine</LocalizedLink>
            <LocalizedLink to="services/fret-maritime/france-turquie" className="underline text-accent-300">France–Turquie</LocalizedLink>
            <LocalizedLink to="services/fret-maritime/france-congo" className="underline text-accent-300">France–Congo</LocalizedLink>
          </div>
        </div>
      </section>

      <article className="prose prose-lg max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2>Rappels: définitions et implications</h2>
        <p>
          <strong>FCL (Full Container Load)</strong> implique un conteneur réservé à votre chargement; vous gagnez en sécurité,
          traçabilité et délais. <strong>LCL (Less than Container Load)</strong> est un groupage: la marchandise est consolidée
          avec d’autres expéditeurs sur la même unité.
        </p>

        <h2>Seuils volumétriques et économiques</h2>
        <p>
          En-dessous de <strong>13–15 m³</strong>, le LCL est habituellement plus compétitif. Au-delà, le FCL devient rapidement
          avantageux en coût par m³ et en gestion des risques (moins de manipulations). Restez pragmatique: certains ports,
          saisons et situations de capacité peuvent décaler ce seuil.
        </p>

        <h2>Critères de décision</h2>
        <ul>
          <li><strong>Volume/poids</strong> — CBM et masse. Le calculateur CBM vous donne une première estimation.</li>
          <li><strong>Valeur/sensibilité</strong> — Marchandises fragiles ou à forte valeur → FCL favorisé.</li>
          <li><strong>Délais</strong> — FCL est en moyenne plus direct; LCL implique consolidation/déconsolidation.</li>
          <li><strong>Budget</strong> — Comparez FCL vs LCL sur coût total (pré/post-acheminement inclus).</li>
          <li><strong>Capacité interne</strong> — SI, partenaires, et aptitude à gérer l’embarquement contribuent au choix optimal.</li>
        </ul>

        <h2>Méthode rapide</h2>
        <ol>
          <li>Estimez le CBM (hauteur × largeur × longueur × quantité / 1 000 000).</li>
          <li>Projetez un coût total FCL vs LCL selon vos ports et votre saison.</li>
          <li>Arbitrez selon criticité délai et exposition au risque.</li>
        </ol>

        <h2>Coûts détaillés: comparer “coût total livré”</h2>
        <ul>
          <li>Fret maritime + surcharges (BAF/CAF/PSS)</li>
          <li>THC origine/destination, documentation (BL), manutentions</li>
          <li>Pré/post‑acheminement (route/fer), éventuels stationnements</li>
          <li>Assurance ad valorem, droits & taxes, frais de dossier</li>
        </ul>
        <p>Le meilleur choix n’est pas le tarif le plus bas, mais celui qui minimise le coût total avec le niveau de risque acceptable.</p>

        <h2>Risques et emballage</h2>
        <ul>
          <li>LCL: davantage de manipulations → emballage export impératif (calage, renforts, marquage)</li>
          <li>FCL: sécurise les risques mécaniques; surveiller le gerbage, l’arrimage et la ventilation</li>
          <li>Tous modes: documentation cohérente et assurance proportionnée à la valeur</li>
        </ul>

        <h2>Scénarios comparatifs (simplifiés)</h2>
        <ul>
          <li><strong>Petit volume, délai souple</strong>: LCL, consolidation hebdomadaire</li>
          <li><strong>Volume moyen, valeur sensible</strong>: FCL 20’ avec emballage pro et assurance</li>
          <li><strong>Fort volume récurrent</strong>: FCL 40’/40’HC, slots et planning fixés</li>
        </ul>

        <div className="not-prose bg-blue-50 border-l-4 border-accent-500 p-4 rounded my-8">
          <p className="text-sm">
            Outil associé:&nbsp;
            <a href="#cbm" className="text-accent-700 underline">Calculateur CBM</a>. Guides:&nbsp;
            <LocalizedLink to="documentation/incoterms-2020" className="text-accent-700 underline">Incoterms 2020</LocalizedLink>.
          </p>
        </div>

        <h2>Cas d’usage par route</h2>
        <h3>France ↔ Chine</h3>
        <p>
          Flux planifiés et volumétriques: FCL sécurise délais et qualité. Pour des petits volumes tests, LCL reste viable, en
          anticipant les consolidations.
        </p>
        <h3>France ↔ Turquie</h3>
        <p>
          LCL est pertinent pour des campagnes ponctuelles faibles volumes; FCL s’impose vite sur des récurrences B2B avec
          contraintes délai et contrôle.
        </p>
        <h3>France ↔ Afrique (Congo)</h3>
        <p>
          Les <em>groupages</em> LCL adressent les petits volumes (colis, palettes) avec ramassage multi‑hubs (IDF, Lyon,
          Marseille). Pour les chargements sensibles, basculez au FCL.
        </p>

        <h2 id="cbm">CBM, TEU et dimensionnement</h2>
        <p>
          20’ ≈ 33 m³, 40’ ≈ 67 m³. Le taux de chargement utile dépend du type de marchandise et des contraintes (poids, ADR,
          empilement). Optimisez l’emballage export pour limiter l’espace perdu et les avaries.
        </p>

        <h2>Erreurs fréquentes</h2>
        <ul>
          <li>Comparer uniquement le fret sans intégrer les coûts annexes</li>
          <li>Ignorer la saisonnalité et la congestion sur l’axe considéré</li>
          <li>Minimiser l’importance de l’emballage export et de l’assurance</li>
        </ul>

        <h2>Checklist décisionnelle</h2>
        <ul>
          <li>CBM/poids validés; sensibilité marchandises appréciée</li>
          <li>Ports/services choisis; planning et cut‑offs compris</li>
          <li>Scénarios FCL/LCL chiffrés sur coût total</li>
          <li>Assurance/emballage documentés</li>
        </ul>

        <h2>FAQ</h2>
        <details>
          <summary>Quand le LCL est-il risqué ?</summary>
          <p>Marchandises fragiles/haute valeur et supply chain sous tension. Privilégiez emballage pro et/ou FCL.</p>
        </details>
        <details>
          <summary>Peut-on “splitter” une commande en LCL multiple ?</summary>
          <p>Oui. Cela permet d’aligner livraisons et trésorerie, au prix d’une complexité à coordonner.</p>
        </details>
        <details>
          <summary>Le 40’HC est-il toujours plus avantageux qu’un 40’DV ?</summary>
          <p>Souvent en volume utile, mais à confirmer selon la nature des biens, la masse et le port de départ.</p>
        </details>

        <div className="not-prose mt-10">
          <h3 className="text-xl font-semibold text-primary-900">Prêt à comparer FCL/LCL ?</h3>
          <p className="text-gray-700">Nos experts recommandent une option selon votre volume, votre risque et vos délais.</p>
          <div className="mt-3 flex gap-3">
            <LocalizedLink to="services/fret-maritime/france-chine" className="text-accent-700 underline">France–Chine</LocalizedLink>
            <LocalizedLink to="services/fret-maritime/france-turquie" className="text-accent-700 underline">France–Turquie</LocalizedLink>
            <LocalizedLink to="services/fret-maritime/france-congo" className="text-accent-700 underline">France–Congo</LocalizedLink>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PillarFCLvsLCL;