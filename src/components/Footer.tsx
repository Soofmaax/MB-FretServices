import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Footer: FC = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-accent-400">MB Fret Services</h3>
            <p className="text-gray-300 leading-relaxed">
              Votre pont logistique entre l'Europe, l'Asie et l'Afrique. 
              Nous connectons les continents avec des solutions de transport 
              fiables et efficaces.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://wa.me/33123456789" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 p-2 rounded-full transition-colors duration-200"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-accent-400">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent-400 transition-colors duration-200">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-accent-400 transition-colors duration-200">
                  Nos Services
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-300 hover:text-accent-400 transition-colors duration-200">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-accent-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-gray-300 hover:text-accent-400 transition-colors duration-200">
                  Mentions Légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-accent-400">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-accent-400 flex-shrink-0" />
                <a 
                  href="mailto:contact@mb-fretservices.com" 
                  className="text-gray-300 hover:text-accent-400 transition-colors duration-200"
                >
                  contact@mb-fretservices.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-accent-400 flex-shrink-0" />
                <a 
                  href="tel:+33123456789" 
                  className="text-gray-300 hover:text-accent-400 transition-colors duration-200"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle size={18} className="text-accent-400 flex-shrink-0" />
                <a 
                  href="https://wa.me/33123456789" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent-400 transition-colors duration-200"
                >
                  WhatsApp: +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-accent-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  Paris, France
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} MB Fret Services. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;