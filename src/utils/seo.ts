import { getSiteUrl } from './siteUrl';

/**
 * Build a canonical URL using the explicit absolute URL if provided,
 * otherwise from the current window.location pathname joined to SITE_URL.
 * Returns undefined on server without explicit value.
 */
export function buildCanonical(explicit?: string): string | undefined {
  if (explicit) return explicit;
  if (typeof window === 'undefined') return undefined;

  const { pathname } = window.location;
  const base = getSiteUrl();

  try {
    const url = new URL(pathname, base);
    // Ensure no trailing slash for non-root paths
    if (pathname !== '/') {
      return url.href.replace(/\/$/, '');
    }
    return url.href;
  } catch {
    return window.location.origin + pathname;
  }
}