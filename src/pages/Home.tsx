import type { FC } from 'react';
import Hero from '../components/Hero';
import ValuePropositions from '../components/ValuePropositions';
import DestinationsShowcase from '../components/DestinationsShowcase';
import CtaButton from '../components/CtaButton';
import SEO from '../components/SEO';
import { getSiteUrl } from '../utils/siteUrl';

const Home: FC = () => {
  const SITE_URL = getSiteUrl();

  return (
    <div className="pt-16">
      <SEO
        title="MB Fret Services - Transport International entre Europe, Asie et Afrique"
        description="MB Fret Services : Votre spécialiste du transport international. Fret maritime et aérien vers l'Afrique, l'Asie et l'Europe. Dédouanement et logistique intégrée."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Accueil - MB Fret Services',
          url: SITE_URL + '/',
          inLanguage: 'fr-FR',
        }}
      />
      <Hero />
      <ValuePropositions />
      <DestinationsShowcase />
      
      {/* Final CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-900 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à expédier vos marchandises ?
          </h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            Obtenez un devis personnalisé en moins de 24h. Notre équipe d'experts 
            vous accompagne à chaque étape de votre projet logistique.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CtaButton href="/contact" variant="primary" className="text-lg px-8 py-4">
              Demander un Devis
            </CtaButton>
            <a 
              href="https://wa.me/33123456789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
            >
              Nous contacter via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;