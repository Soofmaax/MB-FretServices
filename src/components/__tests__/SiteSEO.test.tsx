import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import SiteSEO from '../SiteSEO';

describe('SiteSEO', () => {
  it('injects organization, website and localBusiness JSON-LD', async () => {
    // Simulate env
    const meta = import.meta as unknown as { env: Record<string, unknown> };
    meta.env = {
      ...meta.env,
      VITE_SITE_URL: 'https://mb-fretservices.com',
    };

    render(
      <HelmetProvider>
        <SiteSEO />
      </HelmetProvider>
    );

    await waitFor(() => {
      const scripts = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );

      expect(scripts.length).toBeGreaterThanOrEqual(3);

      const contents = scripts.map((s) => s.textContent ?? '');

      const hasOrganization = contents.some((c) =>
        c.includes('"@type":"Organization"')
      );
      const hasWebsite = contents.some((c) =>
        c.includes('"@type":"WebSite"')
      );
      const hasLocalBusiness = contents.some((c) =>
        c.includes('"@type":"LocalBusiness"')
      );

      expect(hasOrganization).toBe(true);
      expect(hasWebsite).toBe(true);
      expect(hasLocalBusiness).toBe(true);
    });
  });
});