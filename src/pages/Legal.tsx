import type { FC } from 'react';
import SEO from '../components/SEO';
import { getSiteUrl } from '../utils/siteUrl';
import { useTranslation } from 'react-i18next';
import { detectLangFromPath, pathForLang } from '../utils/paths';

const Legal: FC = () => {
  const SITE_URL = getSiteUrl();
  const { t } = useTranslation('legal');
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';
  const legalPath = pathForLang('legal', lang);

  return (
    <div className="pt-16">
      <SEO
        title="Mentions Légales | MB Fret Services"
        description="Mentions légales de MB Fret Services - Informations légales et conditions d'utilisation du site."
        robotsContent="noindex,follow"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Accueil',
                item: SITE_URL + '/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Mentions légales',
                item: SITE_URL + legalPath,
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
              {t('page_title')}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">{t('sections.info.heading')}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>{t('sections.info.labels.raison_sociale')} :</strong> MB Fret Services<br />
                  <strong>{t('sections.info.labels.forme_juridique')} :</strong> {"{{FORME_JURIDIQUE}}"}<br />
                  <strong>{t('sections.info.labels.capital_social')} :</strong> {"{{CAPITAL}}"}<br />
                  <strong>{t('sections.info.labels.siege_social')} :</strong> {"{{SIEGE_SOCIAL}}"}<br />
                  <strong>{t('sections.info.labels.siret')} :</strong> {"{{SIRET}}"}<br />
                  <strong>{t('sections.info.labels.code_ape')} :</strong> {"{{APE}}"}<br />
                  <strong>{t('sections.info.labels.rc_pro')} :</strong> {"{{RC_PRO}}"}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">{t('sections.contact.heading')}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>{t('sections.contact.labels.telephone')} :</strong> +33 7 49 23 55 39<br />
                  <strong>{t('sections.contact.labels.email')} :</strong> contact@mb-fretservices.com<br />
                  <strong>{t('sections.contact.labels.adresse')} :</strong> Paris, France
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">{t('sections.hosting.heading')}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('sections.hosting.content_line1')}<br />
                  {t('sections.hosting.content_line2')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">{t('sections.ip.heading')}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('sections.ip.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">{t('sections.terms.heading')}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('sections.terms.content')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">{t('sections.privacy.heading')}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('sections.privacy.content1')}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('sections.privacy.content2')}
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">{t('sections.cookies.heading')}</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('sections.cookies.content')}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-primary-900 mb-4">{t('sections.liability.heading')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('sections.liability.content')}
                </p>
              </section>

              {/* Credits */}
              <section className="mt-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">{t('sections.credits.heading', 'Crédits')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('sections.credits.content', 'Conception & développement:')}{' '}
                  <a
                    href="https://smarterlogiqueweb.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-600 hover:text-accent-700"
                  >
                    SmarterLogic Web
                  </a>
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  Pour tout problème ou demande, merci de nous contacter via notre site :{' '}
                  <a
                    href="https://smarterlogiqueweb.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-600 hover:text-accent-700"
                  >
                    smarterlogiqueweb.com
                  </a>
                </p>
              </section>
            </div>

            <div className="border-t border-gray-200 mt-12 pt-8 text-center">
              <p className="text-gray-600">
                {t('sections.last_update', { date: new Date().toLocaleDateString('fr-FR') })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Legal;