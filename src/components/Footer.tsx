import type { FC } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import LocalizedLink from './LocalizedLink';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation('footer');

  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-accent-400">{t('brand')}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t('about')}
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
            <h4 className="text-lg font-semibold text-accent-400">{t('nav_title')}</h4>
            <ul className="space-y-2">
              <li>
                <LocalizedLink to="" className="text-gray-300 hover:text-accent-400 transition-colors duration-200">
                  {t('home')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="services" className="text-gray-300 hover:text-accent-400 transition-colors duration-200">
                  {t('services')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="destinations" className="text-gray-300 hover:text-accent-400 transition-colors duration-200">
                  {t('destinations')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="contact" className="text-gray-300 hover:text-accent-400 transition-colors duration-200">
                  {t('contact')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="legal" className="text-gray-300 hover:text-accent-400 transition-colors duration-200">
                  {t('legal')}
                </LocalizedLink>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-accent-400">{t('contact_title')}</h4>
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
                  {t('whatsapp_label')}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-accent-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  {t('city')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} MB Fret Services. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;