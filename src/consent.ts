export type ConsentPrefs = {
  analytics: boolean;
};

const KEY = 'cookie-consent';

export function loadConsent(): ConsentPrefs | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (typeof obj?.analytics === 'boolean') {
      return { analytics: obj.analytics };
    }
  } catch {
    // ignore
  }
  return null;
}

export function saveConsent(prefs: ConsentPrefs): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}