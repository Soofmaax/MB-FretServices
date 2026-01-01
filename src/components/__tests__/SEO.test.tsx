import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { render, waitFor } from '@testing-library/react';
import SEO from '../SEO';

describe('SEO component', () => {
  it('injects basic meta and canonical', async () => {
    render(
      <HelmetProvider>
        <SEO
          title="Test Title"
          description="Test Description"
          canonical="https://example.com/fr"
        />
      </HelmetProvider>
    );

    await waitFor(() => {
      const head = document.head;

      const title = head.querySelector('title');
      expect(title?.textContent).toBe('Test Title');

      const metaDesc = Array.from(head.querySelectorAll('meta')).find(
        (m) => m.getAttribute('name') === 'description'
      );
      expect(metaDesc?.getAttribute('content')).toBe('Test Description');

      const canonical = Array.from(head.querySelectorAll('link')).find(
        (l) => l.getAttribute('rel') === 'canonical'
      );
      expect(canonical?.getAttribute('href')).toBe('https://example.com/fr');
    });
  });

  it('injects JSON-LD structured data when provided', async () => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Test',
    };

    render(
      <HelmetProvider>
        <SEO title="Test" description="Desc" jsonLd={jsonLd} />
      </HelmetProvider>
    );

    await waitFor(() => {
      const script = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      )[0];

      expect(script).toBeTruthy();

      const content = script?.textContent ?? '';
      expect(content).toContain('"@type":"WebPage"');
      expect(content).toContain('"name":"Test"');
    });
  });
});