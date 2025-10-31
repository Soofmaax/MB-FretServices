import '@testing-library/jest-dom';

// Provide default env values expected by the app in tests
// Note: Vitest doesn't inject Vite env automatically. We simulate the minimal ones used.
const anyImportMeta = import.meta as any;
anyImportMeta.env = {
  ...(anyImportMeta.env || {}),
  VITE_SITE_URL: 'https://mb-fretservices.com',
};