import type { FC } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound: FC = () => {
  return (
    <div className="pt-16">
      <SEO
        title="Page introuvable - MB Fret Services"
        description="La page demandée est introuvable."
        noindex
      />
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-primary-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NotFound;