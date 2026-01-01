import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import SEO from '../SEO';

describe('SEO component', () => {
  it('injects basic meta and canonical', () => {
    const helmetContext: Record<string, unknown> = {};
    render(
      <HelmetProvider context={helmetContext}>
        <SEO
          title="Test Title"
          description="Test Description"
          canonical="https://example.com/fr"
        />
      </HelmetProvider>
    );

    const helmet = (helmetContext as any).helmet;
    const titleStr = helmet.title.toString();
    const metaStr = helmet.meta.toString();
    const linkStr = helmet.link.toString();

    expect(titleStr).toContain('<title>Test Title</title>');
    expect(metaStr).toContain('name="description"');
    expect(metaStr).toContain('content="Test Description"');

    expect(linkStr).toContain('rel="canonical"');
    expect(linkStr).toContain('href="https://example.com/fr"');
  });

  it('injects JSON-LD structured data when provided', () => {
    const helmetContext: Record<string, unknown> = {};
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Test',
    };

    render(
      <HelmetProvider context={helmetContext}>
        <SEO title="Test" description="Desc" jsonLd={jsonLd} />
      </HelmetProvider>
    );

    const helmet = (helmetContext as any).helmet;
    const scriptStr = helmet.script.toString();

    // One JSON-LD script with our content
    expect(scriptStr).toContain('type="application/ld+json"');
    expect(scriptStr).toContain('"@type":"WebPage"');
    expect(scriptStr).toContain('"name":"Test"');
  });
});