import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';
import SEO from '../components/SEO';
import { getSiteUrl } from '../utils/siteUrl';
import { useTranslation } from 'react-i18next';
import { detectLangFromPath } from '../utils/paths';

const Contact: FC = () => {
  const SITE_URL = getSiteUrl();
  const { t } = useTranslation(['contact', 'navbar']);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const location = useLocation();
  const lang = typeof window !== 'undefined' ? detectLangFromPath(window.location.pathname) : 'fr';

  const source = (location.state as { source?: string } | null | undefined)?.source;

  const defaultMessage =
    source === 'pillar_container_prices'
      ? lang === 'fr'
        ? "Bonjour, je viens du guide sur le prix d'un conteneur 20'/40' vers le Congo / l’Angola. Voici mon projet (volume approximatif, type de biens, ports ou villes de départ/arrivée, délais souhaités) :"
        : "Hello, I’m coming from the guide about the cost of a 20'/40' container to Congo / Angola. Here is my project (approximate volume, cargo types, departure/arrival ports or cities, desired lead times):"
      : source === 'pillar_fcl_lcl'
      ? lang === 'fr'
        ? "Bonjour, je viens du guide FCL vs LCL. Voici mon projet (volume approximatif, type de marchandises, destination, contraintes de délais) pour que vous puissiez me conseiller sur le bon mode :"
        : "Hello, I’m coming from the FCL vs LCL guide. Here is my project (approximate volume, cargo type, destination, time constraints) so you can advise on the best mode:"
      : source === 'pillar_incoterms'
      ? lang === 'fr'
        ? "Bonjour, je viens du guide Incoterms 2020. Voici mon flux (origine, destination, type de marchandise, mode de transport) pour que vous puissiez me recommander l’Incoterm adapté :"
        : "Hello, I’m coming from the Incoterms 2020 guide. Here is my flow (origin, destination, cargo type, transport mode) so you can recommend the appropriate Incoterm:"
      : source === 'route_france_congo'
      ? lang === 'fr'
        ? "Bonjour, je viens de la page route France ↔ Congo (Pointe‑Noire). Voici mon projet (type d’envoi : déménagement, marchandises, véhicule…, volume approximatif en m³ ou nombre de palettes, ville de départ, ville d’arrivée, délais souhaités) :"
        : "Hello, I’m coming from the France ↔ Congo (Pointe-Noire) route page. Here is my project (shipment type: move, cargo, vehicle…, approximate volume in m³ or number of pallets, departure city, arrival city, desired lead times):"
      : source === 'route_france_angola'
      ? lang === 'fr'
        ? "Bonjour, je viens de la page route France ↔ Angola (Luanda). Voici mon projet (type d’envoi : déménagement, marchandises, véhicule…, volume approximatif en m³ ou nombre de palettes, ville de départ, ville d’arrivée, délais souhaités) :"
        : "Hello, I’m coming from the France ↔ Angola (Luanda) route page. Here is my project (shipment type: move, cargo, vehicle…, approximate volume in m³ or number of pallets, departure city, arrival city, desired lead times):"
      : source === 'service_freight_maritime'
      ? lang === 'fr'
        ? "Bonjour, je viens de la page Fret maritime (conteneurs FCL/LCL vers l’Afrique). Voici mon projet (type d’envoi, pays/port de départ, pays/port d’arrivée, volume approximatif en m³ ou nombre de palettes, délais souhaités) :"
        : "Hello, I’m coming from the Sea freight service page (FCL/LCL containers to Africa). Here is my project (shipment type, origin country/port, destination country/port, approximate volume in m³ or number of pallets, desired lead times):"
      : source === 'service_customs'
      ? lang === 'fr'
        ? "Bonjour, je viens de la page Dédouanement & conformité France ↔ Afrique. Merci de préciser s’il s’agit d’une importation ou d’une exportation, le pays de départ, le pays d’arrivée, le type de marchandise, la valeur, l’Incoterm envisagé et vos contraintes de délais :"
        : "Hello, I’m coming from the Customs & compliance service page for France ↔ Africa flows. Please specify whether this is an import or export, origin country, destination country, cargo type, value, intended Incoterm and your lead-time constraints:"
      : source === 'service_insurance'
      ? lang === 'fr'
        ? "Bonjour, je viens de la page Assurance cargo pour conteneurs FCL/LCL. Merci d’indiquer le type d’envoi (déménagement, marchandises, véhicules…), la valeur assurée souhaitée, le pays/port de départ, le pays/port d’arrivée et les dates estimées d’expédition :"
        : "Hello, I’m coming from the Cargo insurance service page for FCL/LCL containers. Please indicate shipment type (move, cargo, vehicles…), desired insured value, origin country/port, destination country/port and estimated shipping dates:"
      : source === 'service_air_freight'
      ? lang === 'fr'
        ? "Bonjour, je viens de la page Fret aérien. Voici mon projet (type de marchandise, poids/volume approximatif, aéroport de départ, aéroport d’arrivée, délais souhaités) :"
        : "Hello, I’m coming from the Air freight service page. Here is my project (cargo type, approximate weight/volume, departure airport, arrival airport, desired lead times):"
      : '';

  const subjectLabel =
    source === 'pillar_container_prices'
      ? lang === 'fr'
        ? "Demande via guide prix conteneur 20'/40' Congo / Angola"
        : "Request via container price guide 20'/40' Congo / Angola"
      : source === 'pillar_fcl_lcl'
      ? lang === 'fr'
        ? 'Demande via guide FCL vs LCL'
        : 'Request via FCL vs LCL guide'
      : source === 'pillar_incoterms'
      ? lang === 'fr'
        ? 'Demande via guide Incoterms 2020'
        : 'Request via Incoterms 2020 guide'
      : source === 'route_france_congo'
      ? lang === 'fr'
        ? 'Demande de devis — Route France ↔ Congo (Pointe‑Noire)'
        : 'Quote request – France ↔ Congo (Pointe-Noire) route'
      : source === 'route_france_angola'
      ? lang === 'fr'
        ? 'Demande de devis — Route France ↔ Angola (Luanda)'
        : 'Quote request – France ↔ Angola (Luanda) route'
      : source === 'service_freight_maritime'
      ? lang === 'fr'
        ? 'Demande de devis — Service Fret maritime (Afrique)'
        : 'Quote request – Sea freight service (Africa)'
      : source === 'service_customs'
      ? lang === 'fr'
        ? 'Demande — Service Dédouanement & conformité'
        : 'Request – Customs & compliance service'
      : source === 'service_insurance'
      ? lang === 'fr'
        ? 'Demande — Service Assurance cargo FCL/LCL'
        : 'Request – Cargo insurance service (FCL/LCL)'
      : source === 'service_air_freight'
      ? lang === 'fr'
        ? 'Demande de devis — Service Fret aérien'
        : 'Quote request – Air freight service'
      : '';

  const subject =
    subjectLabel ||
    (lang === 'fr'
      ? 'Demande de devis transport international'
      : 'International freight quote request');

  const langTagMap: Record<string, string> = {
    fr: 'fr-FR',
    en: 'en-GB',
    pt: 'pt-PT',
    ar: 'ar',
    es: 'es-ES',
    tr: 'tr-TR',
    sw: 'sw-KE',
    de: 'de-DE',
    it: 'it-IT',
  };
  const langTag = langTagMap[lang] || 'fr-FR';

  const seoTitle = t(
    'contact:seo.title',
    'Contact - Devis Gratuit Transport International | MB Fret Services'
  );
  const seoDescription = t(
    'contact:seo.description',
    'Contactez MB Fret Services pour un devis gratuit. Experts en transport maritime et aérien. WhatsApp, email ou téléphone. Réponse sous 24h garantie.'
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const body = new URLSearchParams(
        Array.from(formData.entries()).map(([key, value]) => [key, String(value)])
      ).toString();

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="pt-16">
      <SEO
        title={seoTitle}
        description={seoDescription}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: t('navbar:home', 'Accueil'),
                item: SITE_URL + '/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: t('navbar:contact', 'Contact'),
                item: SITE_URL + '/contact',
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: `${t('navbar:contact', 'Contact')} - MB Fret Services`,
            inLanguage: langTag,
          },
        ]}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Email */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 animate-slide-up group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mail size={32} className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-4">{t('methods.email')}</h3>
              <a
                href="mailto:contact@mb-fretservices.com"
                className="text-accent-700 hover:text-accent-600 transition-colors duration-200 font-medium"
              >
                contact@mb-fretservices.com
              </a>
              <p className="text-gray-700 mt-2 text-sm">
                {t('methods.email_hint')}
              </p>
            </div>

            {/* Téléphone */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 animate-slide-up group animate-delay-200">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone size={32} className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-4">{t('methods.phone')}</h3>
              <a
                href="tel:+33749235539"
                className="text-accent-700 hover:text-accent-600 transition-colors duration-200 font-medium"
              >
                +33 7 49 23 55 39
              </a>
              <p className="text-gray-700 mt-2 text-sm">
                {t('methods.phone_hours')}
              </p>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 animate-slide-up group animate-delay-400">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MessageCircle size={32} className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-4">{t('methods.whatsapp')}</h3>
              <a
                href="https://wa.me/33749235539"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-700 hover:text-accent-600 transition-colors duration-200 font-medium"
              >
                {t('methods.chat_direct')}
              </a>
              <p className="text-gray-700 mt-2 text-sm">
                {t('methods.whatsapp_hint')}
              </p>
            </div>

            {/* Bureau */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 animate-slide-up group animate-delay-600">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin size={32} className="text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-4">{t('methods.office')}</h3>
              <p className="text-gray-700 font-medium">
                {t('methods.office_city')}
              </p>
              <p className="text-gray-700 mt-2 text-sm">
                {t('methods.office_hint')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de contact */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6 text-center">
            {t('hero.title')}
          </h2>
          {source && (
            <div className="mb-6 rounded-lg border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-primary-900">
              <p className="font-semibold mb-1">
                {source === 'pillar_container_prices'
                  ? t(
                      'contact:source_banner.container_prices',
                      "Vous venez du guide sur le prix d'un conteneur 20'/40' vers le Congo / l’Angola."
                    )
                  : source === 'pillar_fcl_lcl'
                  ? t('contact:source_banner.fcl_lcl', 'Vous venez du guide FCL vs LCL.')
                  : source === 'pillar_incoterms'
                  ? t(
                      'contact:source_banner.incoterms',
                      'Vous venez du guide Incoterms 2020.'
                    )
                  : source === 'route_france_congo'
                  ? t(
                      'contact:source_banner.route_congo',
                      'Vous venez de la page route France ↔ Congo (Pointe‑Noire).'
                    )
                  : source === 'route_france_angola'
                  ? t(
                      'contact:source_banner.route_angola',
                      'Vous venez de la page route France ↔ Angola (Luanda).'
                    )
                  : ''}
              </p>
              <p className="text-gray-700">
                {t(
                  'contact:source_banner.cta',
                  'Les informations ci-dessous nous aideront à affiner votre devis.'
                )}
              </p>
            </div>
          )}
          <form
            name="contact"
            data-netlify="true"
            className="bg-white rounded-xl shadow-lg p-8"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            {subjectLabel && <input type="hidden" name="subject" value={subjectLabel} />}
            {source && <input type="hidden" name="source" value={source} />}
            <div className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('form.name')}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent-700 focus:ring-2 focus:ring-accent-700"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('form.email')}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent-700 focus:ring-2 focus:ring-accent-700"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('form.message')}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  defaultValue={defaultMessage}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-accent-700 focus:ring-2 focus:ring-accent-700"
                />
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              {t('form.gdpr_notice')}
            </p>
            {status === 'success' && (
              <p className="mt-4 text-sm text-green-700">
                {t('form.success', 'Merci, nous vous répondrons sous 24h.')}
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm text-red-700">
                {t('form.error', 'Une erreur est survenue. Merci de réessayer ou de nous contacter directement par email ou téléphone.')}
              </p>
            )}
            <div className="mt-6">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center px-6 py-3 rounded-lg bg-accent-700 text-white hover:bg-accent-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-700 text-sm font-medium disabled:opacity-75"
              >
                {status === 'submitting' ? t('form.submitting', 'Envoi en cours...') : t('form.submit')}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Guide pour demande de devis */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">
              {t('guide.title')}
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              {t('guide.intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6 flex items-center">
                <Send size={24} className="text-accent-700 mr-3" aria-hidden="true" />
                {t('guide.info_title')}
              </h3>
              <ul className="space-y-4">
                {(t('guide.items', { returnObjects: true }) as Array<{ title: string; desc: string }>).map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-accent-700 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-primary-900">{item.title}</span>
                      <p className="text-gray-700 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-8">
              <h3 className="text-xl font-bold text-primary-900 mb-6 flex items-center">
                <Clock size={24} className="text-accent-700 mr-3" aria-hidden="true" />
                {t('guide.commitment_title')}
              </h3>
              <ul className="space-y-4">
                {(t('guide.commitment', { returnObjects: true }) as Array<{ title: string; desc: string }>).map((c, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-accent-700 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-primary-900">{c.title}</span>
                      <p className="text-gray-700 text-sm">{c.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-gray-200 mb-8 leading-relaxed">
            {t('cta.text')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href={`mailto:contact@mb-fretservices.com?subject=${encodeURIComponent(subject)}`}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-accent-700 text-white hover:bg-accent-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Mail size={20} className="mr-2" aria-hidden="true" />
              {t('cta.email')}
            </a>

            <a
              href={`https://wa.me/33749235539?text=${encodeURIComponent('Bonjour, je souhaite obtenir un devis pour un transport international')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <MessageCircle size={20} className="mr-2" aria-hidden="true" />
              {t('cta.whatsapp')}
            </a>

            <a
              href="tel:+33749235539"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-white text-white hover:bg-white hover:text-primary-900 transition-all duration-200"
            >
              <Phone size={20} className="mr-2" aria-hidden="true" />
              {t('cta.call')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;