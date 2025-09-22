import type { FC } from 'react';
import CtaButton from './CtaButton';
import { useTranslation } from 'react-i18next';

const HERO_IMG =
  'https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1600';

const Hero: FC = () => {
  const { t } = useTranslation('hero');

  return (
    <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white overflow-hidden">
      {/* Background image as real <img> for better LCP and sizing */}
      <img
        src={HERO_IMG}
        alt={t('alt_hero')}
        fetchPriority="high"
        decoding="async"
        loading="eager"
        width={1600}
        height={900}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('title_line1')}
            <span className="text-accent-400 block">{t('title_line2')}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CtaButton href="contact" variant="primary" className="text-lg px-8 py-4">
              {t('cta_primary')}
            </CtaButton>
            <CtaButton href="services" variant="outline" className="text-lg px-8 py-4">
              {t('cta_secondary')}
            </CtaButton>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;