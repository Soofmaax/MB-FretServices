import type { FC } from 'react';
import SEO from '../components/SEO';
import { getSiteUrl } from '../utils/siteUrl';
import { useTranslation } from 'react-i18next';
import { detectLangFromPath, pathForLang } from '../utils/paths';
import { useInViewAnimation } from '../components/ui/useInViewAnimation';

const Privacy: FC = () => {
  const SITE_URL = getSiteUrl();
  const { t } = useTranslation(['legal', 'navbar']);
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';
  const privacyPath = pathForLang('privacy', lang);

  const langTagMap: Record<string, string> = {
    fr: 'fr-FR',
    en: 'en-GB',
    pt: 'pt-PT',
  };
  const langTag = langTagMap[lang] || 'fr-FR';

  const seoTitle = t('legal:privacy_seo_title', 'Politique de confidentialité | MB Fret Services');
  const seoDescription = t(
    'legal:privacy_seo_description',
    'Politique de confidentialité et protection des données personnelles pour MB Fret Services.'
  );

  const { ref: contentRef, inView: contentInView } = useInViewAnimation<HTMLDivElement>();

  return (
    <div className="pt-16">
      <SEO
        title={seoTitle}
        description={seoDescription}
        robotsContent="noindex,follow"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: t('navbar:home', 'Accueil'),
                item: SITE_URL + '/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: t('legal:privacy.heading', 'Politique de confidentialité'),
                item: SITE_URL + privacyPath,
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: `${t('legal:privacy.heading', 'Politique de confidentialité')} - MB Fret Services`,
            inLanguage: langTag,
          },
        ]}
      />
      <section className="py-16 lg:py-24 bg-gray-50">
        <div
          ref={contentRef}
          className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            contentInView ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-primary-900 mb-6">
              {t('privacy.heading', 'Politique de confidentialité')}
            </h1>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                {t(
                  'privacy.content1',
                  "Cette page décrit la manière dont nous traitons vos données personnelles, en complément des mentions légales. Nous collectons uniquement les données nécessaires au traitement de vos demandes (contact, devis, suivi client)."
                )}
              </p>
              <p className="mb-4">
                {t(
                  'privacy.content2',
                  "Les informations fournies via les formulaires de contact ou par email sont utilisées exclusivement pour répondre à vos demandes et ne font pas l'objet de prospection automatique sans votre consentement explicite."
                )}
              </p>
              <p className="mb-4">
                {t(
                  'privacy.content3',
                  "Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression de vos données. Pour exercer ces droits, veuillez nous contacter à l'adresse indiquée dans les mentions légales."
                )}
              </p>
              <p className="mb-4">
                {t(
                  'privacy.content4',
                  "Les cookies optionnels (statistiques, mesure d'audience) sont soumis à votre consentement. Vous pouvez modifier vos préférences à tout moment via le lien « Gérer les cookies » en pied de page."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;