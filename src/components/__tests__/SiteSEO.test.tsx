import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import SiteSEO from '../SiteSEO';

type HelmetTags = { toString(): string };

type HelmetTestContext = {
  helmet?: {
    script?: HelmetTags;
  };
};

describe('SiteSEO', () => {
  it('injects organization, website and localBusiness JSON-LD', () => {
    // Simulate env
    const meta = import.meta as unknown as { env: Record<string, unknown> };
    meta.env = {
      ...meta.env,
      VITE_SITE_URL: 'https://mb-fretservices.com',
    };

    const helmetContext: HelmetTestContext = {};
    render(
      <HelmetProvider context={helmetContext}>
        <SiteSEO />
      </HelmetProvider>
    );

    const helmet = helmetContext.helmet;
    if (!helmet) {
      throw new Error('Helmet context not populated by HelmetProvider');
    }

    const scriptStr = helmet.script?.toString() ?? '';

    expect(scriptStr).toContain('"@type":"Organization"');
    expect(scriptStr).toContain('"@type":"WebSite"');
    expect(scriptStr).toContain('"@type":"LocalBusiness"');
  });
});