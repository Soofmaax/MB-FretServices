import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import SiteSEO from '../SiteSEO';

describe('SiteSEO', () => {
  it('injects organization, website and localBusiness JSON-LD', () => {
    // Simulate env
    const meta = import.meta as unknown as { env: Record<string, unknown> };
    meta.env = {
      ...meta.env,
      VITE_SITE_URL: 'https://mb-fretservices.com',
    };

    const helmetContext: Record<string, unknown> = {};
    render(
      <HelmetProvider context={helmetContext}>
        <SiteSEO />
      </HelmetProvider>
    );

    const helmet = (helmetContext as any).helmet;
    const scriptStr = helmet.script.toString();

    expect(scriptStr).toContain('"@type":"Organization"');
    expect(scriptStr).toContain('"@type":"WebSite"');
    expect(scriptStr).toContain('"@type":"LocalBusiness"');
  });
});