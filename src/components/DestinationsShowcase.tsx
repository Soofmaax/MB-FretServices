import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DestinationsShowcase: React.FC = () => {
  const destinations = [
    {
      country: 'Congo',
      city: 'Pointe-Noire',
      image: 'https://images.pexels.com/photos/5668842/pexels-photo-5668842.jpeg?auto=compress&cs=tinysrgb&w=800',
      routes: ['Maritime depuis Le Havre', 'Aérien depuis Paris CDG']
    },
    {
      country: 'Angola',
      city: 'Luanda',
      image: 'https://images.pexels.com/photos/9638839/pexels-photo-9638839.jpeg?auto=compress&cs=tinysrgb&w=800',
      routes: ['Maritime depuis Anvers', 'Aérien depuis Marseille']
    },
    {
      country: 'Chine',
      city: 'Shanghai',
      image: 'https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&w=800',
      routes: ['Maritime transpacifique', 'Aérien direct']
    },
    {
      country: 'Turquie',
      city: 'Istanbul',
      image: 'https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=800',
      routes: ['Transport routier', 'Aérien depuis Lyon']
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Nos Destinations Principales
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nous desservons les principaux marchés mondiaux avec des solutions 
            adaptées à chaque région et type de marchandise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={`Transport vers ${destination.country}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <MapPin size={18} className="text-accent-400 mr-2" />
                  <h3 className="text-xl font-bold">{destination.country}</h3>
                </div>
                <p className="text-gray-200 mb-3">{destination.city}</p>
                
                <div className="space-y-1">
                  {destination.routes.map((route, routeIndex) => (
                    <div key={routeIndex} className="flex items-center text-sm text-gray-300">
                      <ArrowRight size={14} className="mr-2 text-accent-400" />
                      {route}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="absolute inset-0 bg-accent-500/0 group-hover:bg-accent-500/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Besoin d'une destination spécifique ? Nous étudions toutes les demandes.
          </p>
          <Link 
            to="/destinations" 
            className="inline-flex items-center text-accent-500 hover:text-accent-600 font-medium transition-colors duration-200"
          >
            Voir toutes nos destinations
           <AArrowRight size={18} className="ml-2" />
         </a>
        </div>
      </div>
    </section>
  );
};

export default DestinationsShowcase;