// Lightweight Google Analytics (GA4) integration with DNT and Consent Mode.
// Configure via VITE_GA_ID=G-XXXXXXXXXX
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

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
  // Respect Do Not Track
  const dnt = getDoNotTrack();
  if (dnt === '1' || dnt === 'yes') return false;
  return true;
}

export function initAnalytics(defaultAnalyticsGranted = false) {
  const id = import.meta.env?.VITE_GA_ID as string | undefined;
  if (!id) return; // not configured
  if (!shouldTrack()) return;

  // Avoid double-initialization if gtag is already defined
  if (typeof window.gtag === 'function') {
    return;
  }

  // Initialize dataLayer/gtag early
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };

  // Consent defaults before config
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: defaultAnalyticsGranted ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  });

  // Inject gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', id, {
    anonymize_ip: true,
    page_path: location.pathname + location.search + location.hash,
  });
}

export function updateAnalyticsConsent(granted: boolean) {
  const id = import.meta.env?.VITE_GA_ID as string | undefined;
  if (!id || typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

export function trackPageview(path: string, title?: string) {
  const id = import.meta.env?.VITE_GA_ID as string | undefined;
  if (!id || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
  });
}