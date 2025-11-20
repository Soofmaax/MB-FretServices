import { siteColors } from './site-colors';

export const siteConfig = {
  businessName: 'MB Fret Services',
  businessType: 'logistics' as const,
  
  contact: {
    phone: '+33 X XX XX XX XX',
    email: 'contact@mb-fretservices.com',
  },
  
  address: {
    street: '', // À compléter
    postal: '75000',
    city: 'Paris',
    country: 'FR',
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