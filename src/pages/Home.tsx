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
import { useInViewAnimation } from '../components/ui/useInViewAnimation';

const Home: FC = () => {
  const SITE_URL = getSiteUrl();
  const { t } = useTranslation(['home', 'navbar', 'common']);
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';

  const langTagMap: Record<string, string> = {
    fr: 'fr-FR',
    en: 'en-GB',
    pt: 'pt-PT',
  };
  const langTag = langTagMap[lang] || 'fr-FR';

  const seoTitle = t(
    'home:seo.title',
    'MB Fret Services - International transport between Europe and Africa'
  );
  const seoDescription = t(
    'home:seo.description',
    'MB Fret Services: your international transport specialist. Sea freight in containers (FCL/LCL) from France and Europe to Africa, with customs clearance and cargo insurance.'
  );

  const { ref: commitmentsRef, inView: commitmentsInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: finalRef, inView: finalInView } = useInViewAnimation<HTMLDivElement>();
  const commitments = t('home:commitments.items', {
    returnObjects: true,
  }) as Array<{ label: string; description: string }>;

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

      {/* Nos engagements / Our commitments */}
      {Array.isArray(commitments) && commitments.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div
            ref={commitmentsRef}
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
              commitmentsInView ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                {t('home:commitments.title', 'Our commitments from day one')}
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                {t(
                  'home:commitments.subtitle',
                  'A young company, but with clear standards on responsiveness, focus and communication.'
                )}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {commitments.map((item, index) => (
                <div
                  key={item.label}
                  className={`rounded-xl border border-gray-100 bg-gray-50 p-8 shadow-sm hover:shadow-md transition-all duration-700 ${
                    commitmentsInView
                      ? `animate-slide-up opacity-100 translate-y-0 ${
                          index === 0 ? 'animate-delay-0' : index === 1 ? 'animate-delay-150' : 'animate-delay-300'
                        }`
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-primary-900 mb-3">
                    {item.label}
                  </div>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div
          ref={finalRef}
          className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${
            finalInView ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home:final_cta_title', 'Ready to ship your goods?')}
          </h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            {t(
              'home:final_cta_text',
              'Get a personalized quote in under 24 hours. Our experts support you at every step of your logistics project.'
            )}
          </p>

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