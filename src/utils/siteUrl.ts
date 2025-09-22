export function getSiteUrl(): string {
  const fromEnv = import.meta.env?.VITE_SITE_URL;
  if (fromEnv) return fromEnv;
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  // Fallback sensible for non-browser environments
  return 'https://mb-fretservices.com';
}