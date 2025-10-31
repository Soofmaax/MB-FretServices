/**
 * Microsoft Clarity lightweight integration.
 * Configure via VITE_CLARITY_ID=YOUR_PROJECT_ID
 * CSP: allow https://www.clarity.ms, https://*.clarity.ms and https://c.bing.com in script-src and connect-src.
 * We respect Do Not Track by default.
 */

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

function shouldTrack(): boolean {
  try {
    const dnt =
      (navigator as any).doNotTrack ||
      (window as any).doNotTrack ||
      (navigator as any).msDoNotTrack;
    if (dnt === '1' || dnt === 'yes') return false;
  } catch {
    // ignore
  }
  return true;
}

export function initClarity() {
  const id = (import.meta.env?.VITE_CLARITY_ID as string | undefined) || '';
  if (!id) return;
  if (!shouldTrack()) return;

  // Stub window.clarity to queue calls until the script loads
  if (!window.clarity) {
    const fn = function clarity(this: any) {
      (fn.q = fn.q || []).push(arguments);
    } as unknown as ((...args: unknown[]) => void) & { q?: unknown[] };
    window.clarity = fn;
  }

  // Load Clarity tag script
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
  s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
}