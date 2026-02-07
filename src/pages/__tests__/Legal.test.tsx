import { describe, it, expect } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Legal from '../Legal';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => defaultValue ?? key,
  }),
}));

type JsonLdNode = Record<string, unknown>;

describe('Legal page', () => {
  it('rend un JSON-LD localisé et un meta robots noindex,follow', async () => {
    window.history.pushState({}, '', '/fr/mentions-legales');

    const { container } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/fr/mentions-legales']}>
          <Legal />
        </MemoryRouter>
      </HelmetProvider>
    );

    // Pas de placeholders moustache
    expect(container.textContent || '').not.toContain('{{');

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
      const lastItem = breadcrumb.itemListElement[1];
      expect(lastItem.item).toMatch(/\/fr\/mentions-legales$/);

      const webPage = nodes.find((n) => n['@type'] === 'WebPage') as { inLanguage: string };
      expect(webPage).toBeTruthy();
      expect(webPage.inLanguage).toBe('fr-FR');
    });

    // Meta robots
    const robotsMeta = Array.from(document.head.querySelectorAll('meta')).find(
      (m) => m.getAttribute('name') === 'robots'
    );
    expect(robotsMeta?.getAttribute('content')).toBe('noindex,follow');
  });
});
