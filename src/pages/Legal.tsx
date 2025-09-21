import React from 'react';
import SEO from '../components/SEO';

const Legal: React.FC = () => {
  return (
    <div className="pt-16">
      <SEO
        title="Mentions Légales | MB Fret Services"
        description="Mentions légales de MB Fret Services - Informations légales et conditions d'utilisation du site."
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Accueil',
                item: (import.meta as any).env?.VITE_SITE_URL ? (import.meta as any).env?.VITE_SITE_URL + '/' : 'https://mb-fretservices.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Mentions légales',
                item: (import.meta as any).env?.VITE_SITE_URL ? (import.meta as any).env?.VITE_SITE_URL + '/legal' : 'https://mb-fretservices.com/legal',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Mentions légales - MB Fret Services',
            inLanguage: 'fr-FR',
          },
        ]}
      />
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-primary-900 mb-8">
              Mentions Légales
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">Informations légales</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Raison sociale :</strong> MB Fret Services<br />
                  <strong>Forme juridique :</strong> [À compléter]<br />
                  <strong>Capital social :</strong> [À compléter]<br />
                  <strong>Siège social :</strong> Paris, France<br />
                  <strong>SIRET :</strong> [À compléter]<br />
                  <strong>Code APE :</strong> [À compléter]
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">Contact</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Téléphone :</strong> +33 1 23 45 67 89<br />
                  <strong>Email :</strong> contact@mb-fretservices.com<br />
                  <strong>Adresse :</strong> Paris, France
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">Hébergement</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ce site est hébergé par [Nom de l'hébergeur]<br />
                  [Adresse de l'hébergeur]
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">Propriété intellectuelle</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">Conditions d'utilisation</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  L'utilisation de ce site implique l'acceptation pleine et entière des conditions générales d'utilisation décrites ci-après. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">Protection des données personnelles</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  En conformité avec la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et le Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de vos données personnelles.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Pour exercer ces droits, veuillez nous contacter à l'adresse : contact@mb-fretservices.com
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ce site utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visites. En continuant votre navigation, vous acceptez l'utilisation de ces cookies.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-900 mb-4">Responsabilité</h2>
                <p className="text-gray-700 leading-relaxed">
                  MB Fret Services s'efforce de fournir des informations aussi précises que possible. Toutefois, elle ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                </p>
              </section>
            </div>

            <div className="border-t border-gray-200 mt-12 pt-8 text-center">
              <p className="text-gray-600">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Legal;