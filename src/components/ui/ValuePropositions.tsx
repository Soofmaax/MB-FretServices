import type { FC } from 'react';
import { Ship, Plane, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useInViewAnimation } from './useInViewAnimation';

type PropItem = {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
};

const ValuePropositions: FC = () => {
  const { t } = useTranslation('home');
  const { ref: headerRef, inView: headerInView } = useInViewAnimation<HTMLDivElement>();
  const { ref: gridRef, inView: gridInView } = useInViewAnimation<HTMLDivElement>();

  const items = (t('valueProps.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    features: string[];
  }>).map((it, idx) => {
    const iconMap: Record<number, LucideIcon> = {
      0: Ship,
      1: Plane,
      2: Shield,
    };
    return { ...it, icon: iconMap[idx] || Ship } as PropItem;
  });

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerInView ? 'animate-fade-in opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            {t('valueProps.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('valueProps.subtitle')}
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {items.map((prop, index) => {
            const Icon = prop.icon;
            return (
              <div
                key={prop.title}
                className={`bg-white rounded-xl shadow-lg hover:shadow-xl p-8 group hover:-translate-y-2 transition-all duration-700 ${
                  gridInView
                    ? `animate-slide-up opacity-100 translate-y-0 ${
                        index === 0 ? 'animate-delay-0' : index === 1 ? 'animate-delay-200' : 'animate-delay-400'
                      }`
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={32} className="text-white" aria-hidden="true" />
                </div>

                <h3 className="text-2xl font-bold text-primary-900 mb-4 group-hover:text-accent-700 transition-colors duration-300">
                  {prop.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {prop.description}
                </p>

                <ul className="space-y-2">
                  {prop.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-accent-500 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;