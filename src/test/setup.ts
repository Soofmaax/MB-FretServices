import '@testing-library/jest-dom';

// Provide default env values expected by the app in tests
// Note: Vitest doesn't inject Vite env automatically. We simulate the minimal ones used.
const meta = import.meta as unknown as { env: Record<string, unknown> };
meta.env = {
  ...(meta.env || {}),
  VITE_SITE_URL: 'https://mb-fretservices.com',
};