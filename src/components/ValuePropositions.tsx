import React from 'react';
import { Ship, Plane, Shield } from 'lucide-react';

const ValuePropositions: React.FC = () => {
  const propositions = [
    {
      icon: Ship,
      title: 'Fret Maritime',
      description: 'Solutions économiques pour vos envois volumineux vers l\'Afrique et l\'Asie avec suivi en temps réel.',
      features: ['Conteneurs 20\' et 40\'', 'FCL et LCL', 'Port à port ou porte à porte']
    },
    {
      icon: Plane,
      title: 'Fret Aérien',
      description: 'Transport rapide et sécurisé pour vos marchandises urgentes et de haute valeur.',
      features: ['Livraison express', 'Température contrôlée', 'Suivi GPS en continu']
    },
    {
      icon: Shield,
      title: 'Dédouanement',
      description: 'Expertise complète en procédures douanières pour faciliter vos échanges internationaux.',
      features: ['Déclarations douanières', 'Conformité réglementaire', 'Support administratif']
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Pourquoi choisir MB Fret Services ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous combinons expertise, technologie et réseau mondial pour offrir 
            des solutions de transport adaptées à vos besoins spécifiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {propositions.map((prop, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 group hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <prop.icon size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-primary-900 mb-4 group-hover:text-accent-500 transition-colors duration-300">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;