import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { saveConsent, loadConsent } from '../consent';
import { updateAnalyticsConsent } from '../analytics';
import { initClarity } from '../clarity';
import { useTranslation } from 'react-i18next';
import LocalizedLink from './LocalizedLink';

const CookieConsent: FC = () => {
  const { t } = useTranslation('consent');
  const [visible, setVisible] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const prefs = loadConsent();
    if (prefs) {
      // Already decided, reflect state (used by Manage if reopened)
      setAnalytics(!!prefs.analytics);
      setVisible(false);
    } else {
      // First visit: show banner
      setVisible(true);
      setAnalytics(false);
    }
  }, []);

  // Allow reopening via a custom event dispatched from anywhere (e.g., footer link)
  useEffect(() => {
    const handler = () => {
      const prefs = loadConsent();
      setAnalytics(!!prefs?.analytics);
      setManageOpen(true);
      setVisible(true);
    };
    window.addEventListener('open-cookie-consent', handler as EventListener);
    return () => window.removeEventListener('open-cookie-consent', handler as EventListener);
  }, []);

  const applyConsent = (analyticsGranted: boolean) => {
    saveConsent({ analytics: analyticsGranted });
    updateAnalyticsConsent(analyticsGranted);
    if (analyticsGranted) {
      try {
        initClarity();
      } catch {
        // ignore
      }
    }
  };

  const onAccept = () => {
    applyConsent(true);
    setVisible(false);
  };

  const onRefuse = () => {
    applyConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
        <div className="rounded-lg bg-white shadow-xl border border-gray-200 p-4 sm:p-6">
          <div className="sm:flex sm:items-start sm:justify-between">
            <div className="sm:flex-1 sm:pr-6">
              <h2 className="text-lg font-semibold text-primary-900 mb-2">{t('title', 'Gestion des cookies')}</h2>
              <p className="text-sm text-gray-700">
                {t('desc', 'Nous utilisons des cookies facultatifs pour améliorer votre expérience (statistiques et ergonomie) et, le cas échéant, pour afficher de la publicité personnalisée. Si vous refusez, seuls les cookies nécessaires seront utilisés. Vous pouvez modifier votre sélection via “Gérer les cookies”.')}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {t('privacy_note', 'Consultez notre Déclaration de confidentialité pour plus d’informations.')}{' '}
                <LocalizedLink
                  to="legal"
                  className="text-accent-600 hover:text-accent-700 underline underline-offset-2"
                >
                  {t('privacy_link', 'Politique de confidentialité')}
                </LocalizedLink>
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center sm:gap-2">
              <button
                onClick={onRefuse}
                className="px-4 py-2 rounded-md border border-gray-300 text-primary-700 hover:bg-gray-100 transition-colors text-sm"
              >
                {t('refuse', 'Refuser')}
              </button>
              <button
                onClick={() => setManageOpen(!manageOpen)}
                className="px-4 py-2 rounded-md border border-accent-500 text-accent-600 hover:bg-accent-50 transition-colors text-sm ml-2"
                aria-expanded={manageOpen}
              >
                {t('manage', 'Gérer les cookies')}
              </button>
              <button
                onClick={onAccept}
                className="px-4 py-2 rounded-md bg-accent-700 text-white hover:bg-accent-800 transition-colors text-sm ml-2"
              >
                {t('accept', 'Accepter')}
              </button>
            </div>
          </div>

          {manageOpen && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex items-center">
                <input
                  id="consent-analytics"
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-4 w-4 text-accent-700 border-gray-300 rounded focus:ring-accent-700"
                />
                <label htmlFor="consent-analytics" className="ml-2 text-sm text-primary-900">
                  {t('analytics_label', 'Statistiques et amélioration (Google Analytics, Microsoft Clarity)')}
                </label>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => {
                    applyConsent(analytics);
                    setVisible(false);
                  }}
                  className="px-4 py-2 rounded-md bg-primary-900 text-white hover:bg-primary-800 transition-colors text-sm"
                >
                  {t('save', 'Enregistrer')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;