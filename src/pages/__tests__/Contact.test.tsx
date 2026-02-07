import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Contact from '../Contact';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue ?? key,
  }),
}));

type JsonLdNode = Record<string, unknown>;

describe('Contact page', () => {
  it('expose un honeypot Netlify et un JSON-LD ContactPage en fr-FR', async () => {
    window.history.pushState({}, '', '/fr/contact');

    const { container } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/fr/contact']}>
          <Contact />
        </MemoryRouter>
      </HelmetProvider>
    );

    // Form + honeypot
    const form = container.querySelector(
      'form[name="contact"][data-netlify-honeypot="bot-field"]'
    );
    expect(form).not.toBeNull();

    const honeypotWrapper = container.querySelector('div.sr-only');
    const honeypotInput = container.querySelector('input#bot-field[name="bot-field"]');
    expect(honeypotWrapper).not.toBeNull();
    expect(honeypotInput).not.toBeNull();

    // JSON-LD ContactPage
    await waitFor(() => {
      const script = document.head.querySelector('script[type="application/ld+json"]');
      expect(script).not.toBeNull();
      const json = JSON.parse(script!.textContent || 'null');
      expect(Array.isArray(json)).toBe(true);
      const nodes = json as JsonLdNode[];
      const contactNode = nodes.find((n) => n['@type'] === 'ContactPage') as {
        inLanguage: string;
      };
      expect(contactNode).toBeTruthy();
      expect(contactNode.inLanguage).toBe('fr-FR');
    });
  });
});
