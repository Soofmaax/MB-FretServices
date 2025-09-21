import React from 'react';
import CtaButton from './CtaButton';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/906982/pexels-photo-906982.jpeg?auto=compress&cs=tinysrgb&w=1600")'
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Votre pont logistique entre
            <span className="text-accent-400 block">l'Europe, l'Asie et l'Afrique</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Solutions de transport maritime et aérien fiables pour connecter vos marchés. 
            Expertise en fret international, dédouanement et logistique intégrée.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CtaButton href="/contact" variant="primary" className="text-lg px-8 py-4">
              Demander un Devis Gratuit
            </CtaButton>
            <CtaButton href="/services" variant="outline" className="text-lg px-8 py-4">
              Découvrir nos Services
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