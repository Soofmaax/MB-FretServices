import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Privacy from '../Privacy';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue ?? key,
  }),
}));

type JsonLdNode = Record<string, unknown>;

describe('Privacy page', () => {
  it('expose un breadcrumb localisé et un WebPage en fr-FR', async () => {
    window.history.pushState({}, '', '/fr/politique-confidentialite');

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/fr/politique-confidentialite']}>
          <Privacy />
        </MemoryRouter>
      </HelmetProvider>
    );

    await waitFor(() => {
      const script = document.head.querySelector('script[type="application/ld+json"]');
      expect(script).not.toBeNull();
      const json = JSON.parse(script!.textContent || 'null');
      expect(Array.isArray(json)).toBe(true);

      const nodes = json as JsonLdNode[];

      const breadcrumb = nodes.find((n) => n['@type'] === 'BreadcrumbList') as {
        itemListElement: Array<{ item: string }>;
      };
      expect(breadcrumb).toBeTruthy();
      const homeItem = breadcrumb.itemListElement[0];
      const privacyItem = breadcrumb.itemListElement[1];

      const homeUrl = new URL(homeItem.item);
      expect(homeUrl.pathname).toBe('/fr');
      const privacyUrl = new URL(privacyItem.item);
      expect(privacyUrl.pathname).toBe('/fr/politique-confidentialite');

      const webPage = nodes.find((n) => n['@type'] === 'WebPage') as { inLanguage: string };
      expect(webPage).toBeTruthy();
      expect(webPage.inLanguage).toBe('fr-FR');
    });
  });
});
