/**
 * Microsoft Clarity lightweight integration.
 * Configure via VITE_CLARITY_ID=YOUR_PROJECT_ID
 * CSP: allow https://www.clarity.ms, https://*.clarity.ms and https://c.bing.com in script-src and connect-src.
 * We respect Do Not Track by default.
 */

declare global {
  interface Window {
    clarity?: ClarityFn;
  }
}

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };

function getDoNotTrack(): string | null {
  try {
    const nav = navigator as Navigator & { msDoNotTrack?: string; doNotTrack?: string };
    const win = window as Window & { doNotTrack?: string };
    return nav.doNotTrack ?? win.doNotTrack ?? nav.msDoNotTrack ?? null;
  } catch {
    return null;
  }
}

function shouldTrack(): boolean {
  const dnt = getDoNotTrack();
  if (dnt === '1' || dnt === 'yes') return false;
  return true;
}

export function initClarity() {
  const id = (import.meta.env?.VITE_CLARITY_ID as string | undefined) || '';
  if (!id) return;
  if (!shouldTrack()) return;

  // Stub window.clarity to queue calls until the script loads
  if (!window.clarity) {
    const fn: ClarityFn = (...args: unknown[]) => {
      (fn.q = fn.q || []).push(args);
    };
    window.clarity = fn;
  }

  // Load Clarity tag script
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${encodeURIComponent(id)}`;
  s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
}