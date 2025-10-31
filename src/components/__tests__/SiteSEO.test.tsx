import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import SiteSEO from '../SiteSEO';

describe('SiteSEO', () => {
  it('injects organization/website/localBusiness JSON-LD with nonce', () => {
    // Simulate env
    (import.meta as any).env = {
      ...(import.meta as any).env,
      VITE_SITE_URL: 'https://mb-fretservices.com',
    };

    const helmetContext: any = {};
    render(
      <HelmetProvider context={helmetContext}>
        <SiteSEO />
      </HelmetProvider>
    );

    const scripts = Array.from(
      document.head.querySelectorAll('script[type="application/ld+json"]')
    );
    expect(scripts.length).toBeGreaterThanOrEqual(3);
    for (const s of scripts) {
      expect(s.getAttribute('nonce')).toBe('abc123');
    }

    const hasOrganization = scripts.some((s) =>
      (s.textContent ?? '').includes('"@type":"Organization"')
    );
    const hasWebsite = scripts.some((s) =>
      (s.textContent ?? '').includes('"@type":"WebSite"')
    );
    const hasLocalBusiness = scripts.some((s) =>
      (s.textContent ?? '').includes('"@type":"LocalBusiness"')
    );

    expect(hasOrganization).toBe(true);
    expect(hasWebsite).toBe(true);
    expect(hasLocalBusiness).toBe(true);
  });
});