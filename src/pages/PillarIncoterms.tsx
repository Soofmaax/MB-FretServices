import type { FC } from 'react';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';
import { getSiteUrl } from '../utils/siteUrl';
import { detectLangFromPath, pathForLang } from '../utils/paths';

const PillarIncoterms: FC = () => {
  const SITE_URL = getSiteUrl();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL + '/' },
      { '@type': 'ListItem', position: 2, name: 'Ressources', item: SITE_URL + (lang === 'fr' ? '/fr/documentation/incoterms-2020' : pathForLang('pillar_incoterms', lang)) },
      { '@type': 'ListItem', position: 3, name: 'Incoterms 2020' },
    ],
  };

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Incoterms 2020 — Guide complet pour le fret maritime B2B',
    author: { '@type': 'Organization', name: 'MB Fret Services' },
    publisher: { '@type': 'Organization', name: 'MB Fret Services' },
    mainEntityOfPage: SITE_URL + pathForLang('pillar_incoterms', lang),
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'FOB ou CIF : quelle différence en pratique ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            "FOB (Free On Board) signifie que le vendeur supporte les coûts/risques jusqu’à l’embarquement. CIF (Cost, Insurance and Freight) inclut coût, assurance et fret jusqu’au port d’arrivée. En B2B maritime, CIF apporte de la prévisibilité sur le coût total, FOB offre plus de contrôle à l’importateur.",
        },
      },
      {
        '@type': 'Question',
        name: 'Quels Incoterms privilégier pour une importation depuis la Chine ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            "FOB et CIF sont les plus utilisés. Le choix dépend du contrôle souhaité, de la capacité à gérer la logistique principale, et des besoins d’assurance. Nos équipes peuvent recommander l’option la plus pertinente selon vos flux et vos contraintes.",
        },
      },
      {
        '@type': 'Question',
        name: 'Les Incoterms influencent-ils le dédouanement ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            "Oui, ils définissent la répartition des responsabilités et des coûts. Ils n’uniformisent pas la réglementation douanière, mais conditionnent qui s’occupe des démarches et à quel moment.",
        },
      },
    ],
  };

  return (
    <div className="pt-16">
      <SEO
        title="Incoterms 2020 — Guide complet (FOB, CIF…) | MB Fret Services"
        description="Comprendre les Incoterms 2020 pour le fret maritime B2B: responsabilités, coûts, risques, cas pratiques Chine/Turquie. Choix FOB vs CIF, impacts assurance et délais."
        jsonLd={[breadcrumb, articleLd, faqLd]}
      />

      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold">Incoterms 2020 — Guide complet B2B</h1>
          <p className="mt-4 text-xl text-gray-100">
            Maîtrisez la répartition des coûts et des risques en fret maritime. Des cas pratiques appliqués à vos routes clés
            (France–Chine, France–Turquie) pour des décisions d’achat éclairées.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LocalizedLink to="services/fret-maritime/france-chine" className="underline text-accent-300">
              France ↔ Chine
            </LocalizedLink>
            <LocalizedLink to="services/fret-maritime/france-turquie" className="underline text-accent-300">
              France ↔ Turquie
            </LocalizedLink>
            <LocalizedLink to="services/fret-maritime/france-congo" className="underline text-accent-300">
              France ↔ Congo
            </LocalizedLink>
          </div>
        </div>
      </section>

      <article className="prose prose-lg max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2>Pourquoi les Incoterms sont stratégiques en B2B</h2>
        <p>
          Les Incoterms définissent la répartition des responsabilités, des risques et des coûts entre vendeur et acheteur le long
          de la chaîne logistique. En environnement B2B, ils conditionnent le niveau de contrôle opérationnel, la visibilité sur
          les coûts et l’alignement contractuel avec les partenaires (fournisseurs, transitaires, assureurs).
        </p>
        <p>
          Une lecture stricte des Incoterms permet de prévenir les litiges, d’optimiser le prix final et d’accélérer les
          décisions. Dans un contexte de volatilité tarifaire, l’objectif n’est pas de “payer le moins cher” mais d’acheter la
          fiabilité et la prévisibilité nécessaire à la continuité de vos flux.
        </p>

        <h2>Panorama des Incoterms 2020 pertinents au maritime</h2>
        <ul>
          <li>
            <strong>EXW (Ex Works)</strong> — Le vendeur met à disposition la marchandise dans ses locaux. L’acheteur prend en
            charge le transport, les formalités et le risque dès l’enlèvement.
          </li>
          <li>
            <strong>FCA (Free Carrier)</strong> — Le vendeur livre la marchandise au transporteur de l’acheteur à un lieu convenu.
          </li>
          <li>
            <strong>FOB (Free On Board)</strong> — Spécifique au maritime: transfert des risques au moment de l’embarquement à
            bord du navire au port de départ.
          </li>
          <li>
            <strong>CFR (Cost and Freight)</strong> — Le vendeur paie le fret jusqu’au port d’arrivée. Le risque transfère au
            chargement (FOB-like).
          </li>
          <li>
            <strong>CIF (Cost, Insurance and Freight)</strong> — Le vendeur paie fret + assurance jusqu’au port d’arrivée avec
            garanties minimales. Idéal si vous souhaitez une prévisibilité coût/logistique.
          </li>
          <li>
            <strong>DAP/DPU/DDP</strong> — Les livraisons à l’arrivée (jusqu’au site destinataire, selon variantes) offrent une
            expérience “porte-à-porte” mais déplacent les responsabilités douanières et fiscales.
          </li>
        </ul>

        <h2>FOB vs CIF: arbitrer contrôle vs prévisibilité</h2>
        <p>
          <strong>FOB</strong> favorise le contrôle de l’acheteur sur le transport principal (choix de l’armateur, contrats, suivi).
          Vous optimisez coûts et performance si vous disposez de ressources logistiques aguerries. <strong>CIF</strong> procure
          une <em>prévisibilité budgétaire</em> (fret et assurance à charge vendeur) et réduit la coordination côté acheteur au
          prix d’un contrôle moindre.
        </p>

        <h2>Glossaire des responsabilités (version simplifiée)</h2>
        <ul>
          <li><strong>Livraison</strong>: point où la charge passe du vendeur à l’acheteur (Incoterm-dépendant)</li>
          <li><strong>Transfert de risque</strong>: moment exact où le risque change de partie</li>
          <li><strong>Frais principaux</strong>: transport maritime et surcharges (BAF/CAF/PSS)</li>
          <li><strong>Formalités douanières</strong>: export/import selon l’Incoterm choisi</li>
          <li><strong>Assurance</strong>: recommandée ad valorem pour protéger la trésorerie</li>
        </ul>

        <h2>Matrice (textualisée) de responsabilités</h2>
        <p>
          Règle générale: <em>FOB/CFR/CIF</em> transfèrent le risque à l’embarquement; <em>DAP/DPU/DDP</em> déplacent le point de
          livraison au pays d’arrivée; <em>EXW/FCA</em> responsabilisent fortement l’acheteur sur l’amont.
        </p>
        <ul>
          <li><strong>FOB</strong>: Export vendeur; fret/assurance à la charge acheteur; risque à l’embarquement</li>
          <li><strong>CFR</strong>: Export + fret vendeur; risque dès l’embarquement pour l’acheteur</li>
          <li><strong>CIF</strong>: Export + fret + assurance vendeur; risque dès l’embarquement pour l’acheteur</li>
          <li><strong>DAP</strong>: Vendeur supporte transport jusqu’au site; import à charge acheteur</li>
          <li><strong>DDP</strong>: Vendeur assume jusqu’à la livraison, droits & taxes inclus</li>
        </ul>

        <h2>Cas pratiques et routes clés</h2>
        <h3>France ↔ Chine</h3>
        <p>
          Les délais de transit varient en fonction des ports (Le Havre/Marseille-Fos ↔ Shanghai/Ningbo/Shenzhen). Sur des flux
          réguliers, FOB convient aux importateurs expérimentés capables de négocier leur fret et d’optimiser le CBM. CIF apporte
          une sécurité administrative lorsqu’on privilégie la rapidité d’exécution et la visibilité budgétaire.
        </p>

        <h3>France ↔ Turquie</h3>
        <p>
          Sur cet axe court/moyen-courrier, la flexibilité (multimodal mer/route/air) est primordiale. CIF peut simplifier la
          coordination multi-acteurs. FOB reste pertinent si vous maîtrisez le flux et souhaitez arbitrer finement délais/coûts.
        </p>

        <h2>Impact sur assurance et conformité</h2>
        <p>
          En CIF, l’assurance minimale <em>Institute Cargo Clauses (C)</em> n’est pas toujours suffisante pour vos besoins. En B2B,
          la couverture <strong>ad valorem</strong> est recommandée pour sécuriser la continuité d’activité. La conformité
          documentaire (facture, packing list, certificats d’origine) doit être parfaitement alignée à l’Incoterm pour limiter les
          risques douaniers.
        </p>

        <h2>Erreurs fréquentes et comment les éviter</h2>
        <ul>
          <li>Confusion entre point de livraison et transfert de risque</li>
          <li>Oublier d’ajuster l’assurance quand le risque bascule tôt (FOB/CFR)</li>
          <li>Incohérences documentaires (quantités, poids, descriptions) → retards</li>
          <li>Choix d’Incoterm non aligné à la maturité logistique interne</li>
        </ul>

        <h2>Processus de décision (pas-à-pas)</h2>
        <ol>
          <li>Évaluer capacité interne (ressources, SI, partenaires)</li>
          <li>Comparer scénarios (FOB/CIF/DAP) sur coût total livré et risque</li>
          <li>Vérifier l’adéquation documentaire et l’assurance</li>
          <li>Fixer l’Incoterm dans le contrat et communiquer aux parties</li>
        </ol>

        <h2>Bonnes pratiques</h2>
        <ul>
          <li>Évaluer la maturité logistique interne (ressources, SI, partenaires).</li>
          <li>Analyser la sensibilité délai/coût/risque par route, marchandise et saisonnalité.</li>
          <li>Comparer des scénarios chiffrés FOB vs CIF incluant assurance et coûts cachés (pré/ post-acheminement).</li>
          <li>Miser sur la <strong>traçabilité</strong> et le <strong>suivi 24/7</strong> pour sécuriser la relation client interne.</li>
        </ul>

        <div className="not-prose bg-blue-50 border-l-4 border-accent-500 p-4 rounded my-8">
          <p className="text-sm">
            Guides associés:&nbsp;
            <LocalizedLink to="guides/fcl-vs-lcl" className="text-accent-700 underline">
              FCL vs LCL — comment décider ?
            </LocalizedLink>
            &nbsp;| Pages routes:&nbsp;
            <LocalizedLink to="services/fret-maritime/france-chine" className="text-accent-700 underline">France–Chine</LocalizedLink>
            ,&nbsp;
            <LocalizedLink to="services/fret-maritime/france-turquie" className="text-accent-700 underline">France–Turquie</LocalizedLink>
            ,&nbsp;
            <LocalizedLink to="services/fret-maritime/france-congo" className="text-accent-700 underline">France–Congo</LocalizedLink>.
          </p>
        </div>

        <h2>FAQ</h2>
        <details>
          <summary>Les Incoterms impactent-ils la responsabilité en cas d’avarie ?</summary>
          <p>Oui. Ils déterminent le point de transfert des risques. La bonne police d’assurance et la preuve documentaire sont clés.</p>
        </details>
        <details>
          <summary>Peut-on changer d’Incoterm en cours de négociation ?</summary>
          <p>Oui, s’il est consigné contractuellement et que les effets sont intégrés dans le prix, le planning et les assurances.</p>
        </details>
        <details>
          <summary>FOB et FCA sont-ils interchangeables ?</summary>
          <p>Non. FCA convient mieux au non-maritime jusqu’à remise au transporteur; FOB est spécifique maritime avec risque à l’embarquement.</p>
        </details>
        <details>
          <summary>DDP est-il toujours recommandé ?</summary>
          <p>Pratique pour l’acheteur mais exigeant pour le vendeur (fiscalité, import). À utiliser selon vos capacités locales.</p>
        </details>
      </article>
    </div>
  );
};

export default PillarIncoterms;