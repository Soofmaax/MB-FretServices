import '@testing-library/jest-dom';
import { expect } from 'vitest';

// Wire jest-dom matchers into Vitest's expect
expect.extend({ ...((await import('@testing-library/jest-dom/matchers')).default as object) });

// Provide default env values expected by the app in tests
// Note: Vitest doesn't inject Vite env automatically. We simulate the minimal ones used.
const meta = import.meta as unknown as { env: Record<string, unknown> };
meta.env = {
  ...(meta.env || {}),
  VITE_SITE_URL: 'https://mb-fretservices.com',
};