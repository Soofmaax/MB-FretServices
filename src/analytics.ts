// Lightweight Google Analytics (GA4) integration with DNT and Consent Mode.
 // Configure via VITE_GA_ID=G-XXXXXXXXXX
 declare global {
   interface Window {
     dataLayer?: unknown[];
     gtag?: (...args: unknown[]) => void;
   }
 }
 
 function shouldTrack(): boolean {
   try {
     // Respect Do Not Track
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
 
 export function initAnalytics(defaultAnalyticsGranted = false) {
   const id = import.meta.env?.VITE_GA_ID as string | undefined;
   if (!id) return; // not configured
   if (!shouldTrack()) return;
 
   // Initialize dataLayer/gtag early
   window.dataLayer = window.dataLayer || [];
   window.gtag = function gtag() {
     window.dataLayer!.push(arguments);
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