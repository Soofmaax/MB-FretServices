import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import SEO from '../SEO';

describe('SEO component', () => {
  it('injects basic meta and canonical', () => {
    const helmetContext: any = {};
    render(
      <HelmetProvider context={helmetContext}>
        <SEO
          title="Test Title"
          description="Test Description"
          canonical="https://example.com/fr"
        />
      </HelmetProvider>
    );

    const head = document.head;
    expect(head.querySelector('title')?.textContent).toBe('Test Title');

    const metaDesc = Array.from(head.querySelectorAll('meta')).find(
      (m) => m.getAttribute('name') === 'description'
    );
    expect(metaDesc?.getAttribute('content')).toBe('Test Description');

    const canonical = Array.from(head.querySelectorAll('link')).find(
      (l) => l.getAttribute('rel') === 'canonical'
    );
    expect(canonical?.getAttribute('href')).toBe('https://example.com/fr');
  });

  it('injects JSON-LD with CSP nonce', () => {
    const helmetContext: any = {};
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

    const script = Array.from(document.head.querySelectorAll('script')).find(
      (s) => s.getAttribute('type') === 'application/ld+json'
    );
    expect(script).toBeTruthy();
    expect(script?.getAttribute('nonce')).toBe('abc123');
    // JSON content should be present
    const content = script?.textContent ?? '';
    expect(content).toContain('"@type":"WebPage"');
    expect(content).toContain('"name":"Test"');
  });
});