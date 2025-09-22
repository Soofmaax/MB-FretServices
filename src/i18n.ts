import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Languages supported
export const SUPPORTED_LANGS = ['fr', 'en', 'pt', 'ar', 'es', 'tr', 'sw', 'de', 'it'] as const;
export type SupportedLang = typeof SUPPORTED_LANGS[number];

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    fallbackLng: 'fr',
    // Load namespaces from /public/locales/{{lng}}/{{ns}}.json
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
    ns: ['common', 'navbar', 'hero', 'footer', 'home', 'services', 'destinations', 'contact', 'legal', 'freight', 'notFound'],
    detection: {
      order: ['path', 'navigator', 'htmlTag', 'cookie', 'localStorage'],
      caches: ['localStorage'],
    },
    returnNull: false,
  });

export default i18n;