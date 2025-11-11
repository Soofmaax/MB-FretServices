import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import './i18n';
import { initAnalytics } from './analytics';
import { initClarity } from './clarity';
import { loadConsent } from './consent';

// GitHub Pages SPA fallback support:
// If the 404.html redirected to "/?p=/xxx", normalize back to "/xxx" before the app mounts.
try {
  const params = new URLSearchParams(window.location.search);
  const p = params.get('p');
  if (p) {
    const target = p + window.location.hash;
    window.history.replaceState(null, '', target);
  }
} catch {
  // ignore
}

const consent = loadConsent();

// Initialize analytics with Consent Mode defaults (denied unless user already accepted)
try {
  const analyticsDefaultGranted = !!consent?.analytics;
  initAnalytics(analyticsDefaultGranted);
} catch {
  // ignore
}

// Initialize Microsoft Clarity only if user has already accepted analytics
try {
  if (consent?.analytics) {
    initClarity();
  }
} catch {
  // ignore
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
