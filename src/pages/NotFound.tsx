import type { FC } from 'react';
import SEO from '../components/SEO';
import LocalizedLink from '../components/LocalizedLink';
import { Ship, Plane } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NotFound: FC = () => {
  const { t } = useTranslation('notFound');

  return (
    <div className="pt-16">
      <SEO
        title={t('seo.title')}
        description={t('seo.description')}
        noindex
      />
      <section className="relative overflow-hidden py-24 bg-gray-50">
        {/* Decorative animated icons */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <Ship
            size={56}
            className="text-accent-500/20 absolute -left-6 top-10 animate-drift-slow"
          />
          <Plane
            size={48}
            className="text-accent-500/20 absolute right-6 top-20 animate-float-slow"
          />
          <Ship
            size={40}
            className="text-accent-500/10 absolute right-10 bottom-10 animate-drift-slow"
          />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-7xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
              {t('ui.code')}
            </h1>
            <p className="text-2xl md:text-3xl text-primary-900 font-semibold mb-4">
              {t('ui.heading')}
            </p>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('ui.message')}
            </p>

            <LocalizedLink
              to=""
              className="inline-flex items-center px-6 py-3 rounded-lg bg-accent-500 text-white hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500 transition-colors"
            >
              {t('ui.cta')}
            </LocalizedLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;