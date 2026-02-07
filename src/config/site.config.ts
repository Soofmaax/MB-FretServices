import { siteColors } from './site-colors';

export const siteConfig = {
  businessName: 'MB Fret Services',
  businessType: 'logistics' as const,

  contact: {
    phone: '+33 7 49 23 55 39',
    email: 'contact@mb-fretservices.com',
  },

  address: {
    street: '',
    postal: '75000',
    city: 'Paris',
    country: 'FR',
  },

  legal: {
    legalForm: '',
    capital: '',
    siret: '',
    ape: '',
    rcPro: '',
  },

  seo: {
    defaultLocale: 'fr',
    localBusinessType: 'LocalBusiness',
  },

  colors: siteColors,

  features: {
    multiLanguage: true,
    calculator: true,
  },
};