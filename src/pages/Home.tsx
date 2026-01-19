import type { FC } from 'react';
import Hero from '../components/Hero';
import { lazy, Suspense } from 'react';
const ValuePropositions = lazy(() => import('../components/ValuePropositions'));
const DestinationsShowcase = lazy(() => import('../components/DestinationsShowcase'));
import CtaButton from '../components/CtaButton';
import SEO from '../components/SEO';
import { getSiteUrl } from '../utils/siteUrl';
import { useTranslation } from 'react-i18next';
import { detectLangFromPath } from '../utils/paths';

const Home: FC = () => {
  const SITE_URL = getSiteUrl();
  const { t } = useTranslation(['home', 'navbar', 'common']);
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';

  const langTagMap: Record<string, string> = {
    fr: 'fr-FR',
    en: 'en-GB',
    pt: 'pt-PT',
    ar: 'ar',
    es: 'es-ES',
    tr: 'tr-TR',
    sw: 'sw-KE',
    de: 'de-DE',
    it: 'it-IT',
  };
  const langTag = langTagMap[lang] || 'fr-FR';

  const seoTitle = t(
    'home:seo.title',
    'MB Fret Services - International transport between Europe, Asia and Africa'
  );
  const seoDescription = t(
    'home:seo.description',
    'MB Fret Services: your international transport specialist. Sea and air freight to Africa, Asia and Europe. Customs clearance and integrated logistics.'
  );

  return (
    <div className="pt-16">
      <SEO
        title={seoTitle}
        description={seoDescription}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `${t('navbar:home', 'Home')} - MB Fret Services`,
          url: SITE_URL + '/',
          inLanguage: langTag,
        }}
      />
      <Hero />
      <Suspense fallback={null}>
        <ValuePropositions />
      </Suspense>
      <Suspense fallback={null}>
        <DestinationsShowcase />
      </Suspense>

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home:final_cta_title', 'Ready to ship your goods?')}
          </h2>
          <p className="text-xl text-gray-200 mb-6 leading-relaxed">
            {t(
              'home:final_cta_text',
              'Get a personalized quote in under 24 hours. Our experts support you at every step of your logistics project.'
            )}
          </p>

          {/* Mise en avant des corridors RDC / Congo / Angola */}
          <div className="bg-primary-800/60 rounded-xl border border-primary-600 px-4 py-5 sm:px-6 sm:py-6 mb-8 text-left">
            <p className="text-sm font-semibold text-accent-200 mb-2">
              {t('home:final_cta_routes_intro', 'Our main corridors to Central Africa:')}
            </p>
            <ul className="space-y-1 text-sm text-gray-100">
              {(t('home:final_cta_routes', {
                returnObjects: true,
                defaultValue: [
                  'France ↔ Congo (Pointe-Noire) — déménagements, effets personnels, véhicules.',
                  'France ↔ RDC (Kinshasa / Matadi) — déménagements, groupage LCL et conteneurs FCL.',
                  'France ↔ Angola (Luanda) — flux particuliers et B2B, FCL/LCL.',
                ],
              }) as string[]).map((line, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mr-2 mt-1.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-3">
              <CtaButton href="services/fret-maritime/france-congo" variant="secondary" className="text-sm px-4 py-2">
                France ↔ Congo
              </CtaButton>
              <CtaButton href="services/fret-maritime/france-rdc" variant="secondary" className="text-sm px-4 py-2">
                France ↔ RDC
              </CtaButton>
              <CtaButton href="services/fret-maritime/france-angola" variant="secondary" className="text-sm px-4 py-2">
                France ↔ Angola
              </CtaButton>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaButton href="/contact" variant="primary" className="text-lg px-8 py-4">
              {t('common:get_quote', 'Get a Quote')}
            </CtaButton>
            <a
              href="https://wa.me/33749235539"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              {t('home:whatsapp', 'Contact us on WhatsApp')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;