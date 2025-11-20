import type { FC } from 'react';
import { useMemo, useState } from 'react';

type Props = {
  defaultRoute?: 'services_freight_france_china' | 'services_freight_france_congo' | 'services_freight_france_turkey' | null;
};

const routes = [
  { key: 'services_freight_france_china', label: 'France ↔ Chine' },
  { key: 'services_freight_france_congo', label: 'France ↔ Congo' },
  { key: 'services_freight_france_turkey', label: 'France ↔ Turquie' },
] as const;

function track(event: string, params?: Record<string, unknown>) {
  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, params || {});
    }
  } catch {
    // ignore
  }
}

const QuoteForm: FC<Props> = ({ defaultRoute = null }) => {
  const [step, setStep] = useState(1);
  const [route, setRoute] = useState<string>(defaultRoute || routes[0].key);
  const [service, setService] = useState<'FCL' | 'LCL'>('LCL');

  const [dims, setDims] = useState({ length: '', width: '', height: '', weight: '', qty: '1' });
  const [contact, setContact] = useState({ company: '', name: '', email: '', phone: '' });

  const cbm = useMemo(() => {
    const l = parseFloat(dims.length) || 0;
    const w = parseFloat(dims.width) || 0;
    const h = parseFloat(dims.height) || 0;
    const q = parseInt(dims.qty || '1', 10) || 1;
    return (l * w * h * q) / 1_000_000;
  }, [dims]);

  const next = () => {
    setStep((s) => {
      const nextStep = Math.min(3, s + 1);
      if (nextStep === 2) {
        track('lead_progress', { step: 2, route, service });
      } else if (nextStep === 3) {
        track('lead_progress', { step: 3, route, service, cbm: Number.isFinite(cbm) ? Number(cbm.toFixed(2)) : 0 });
      }
      return nextStep;
    });
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submitMail = () => {
    const r = routes.find((r) => r.key === route)?.label || '';
    track('lead_submit', {
      route,
      service,
      cbm: Number.isFinite(cbm) ? Number(cbm.toFixed(2)) : 0,
    });
    const subject = encodeURIComponent(`Demande de devis — ${r} (${service})`);
    const body = encodeURIComponent(
      [
        `Route: ${r}`,
        `Service: ${service}`,
        '',
        'Marchandise:',
        ` - Dimensions (cm): ${dims.length} x ${dims.width} x ${dims.height}`,
        ` - Quantité: ${dims.qty}`,
        ` - Poids total (kg): ${dims.weight}`,
        ` - Volume estimé: ${cbm.toFixed(2)} m³`,
        '',
        'Contact:',
        ` - Société: ${contact.company}`,
        ` - Nom: ${contact.name}`,
        ` - Email: ${contact.email}`,
        ` - Téléphone: ${contact.phone}`,
      ].join('\n')
    );
    window.location.href = `mailto:contact@mb-fretservices.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <h3 className="text-xl font-bold text-primary-900 mb-3">Demande de devis rapide</h3>

      {step === 1 && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Route</label>
            <select
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              {routes.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Type de service</label>
            <div className="flex gap-3">
              {(['LCL', 'FCL'] as const).map((opt) => (
                <label key={opt} className={`cursor-pointer px-3 py-2 rounded border ${service === opt ? 'bg-accent-50 border-accent-500 text-accent-700' : 'border-gray-300'}`}>
                  <input type="radio" name="service" value={opt} checked={service === opt} onChange={() => setService(opt)} className="mr-2" />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button onClick={next} className="px-4 py-2 rounded bg-primary-900 text-white hover:bg-primary-800 text-sm">
              Continuer
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Longueur (cm)</label>
              <input className="w-full border rounded px-3 py-2" value={dims.length} onChange={(e) => setDims({ ...dims, length: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Largeur (cm)</label>
              <input className="w-full border rounded px-3 py-2" value={dims.width} onChange={(e) => setDims({ ...dims, width: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Hauteur (cm)</label>
              <input className="w-full border rounded px-3 py-2" value={dims.height} onChange={(e) => setDims({ ...dims, height: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Quantité</label>
              <input className="w-full border rounded px-3 py-2" value={dims.qty} onChange={(e) => setDims({ ...dims, qty: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Poids total (kg)</label>
              <input className="w-full border rounded px-3 py-2" value={dims.weight} onChange={(e) => setDims({ ...dims, weight: e.target.value })} />
            </div>
          </div>
          <p className="text-sm text-gray-600">Volume estimé: <strong>{cbm.toFixed(2)} m³</strong></p>

          <div className="flex justify-between gap-2 mt-2">
            <button onClick={prev} className="px-4 py-2 rounded border border-gray-300 text-sm">Retour</button>
            <button onClick={next} className="px-4 py-2 rounded bg-primary-900 text-white hover:bg-primary-800 text-sm">Continuer</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Société</label>
              <input className="w-full border rounded px-3 py-2" value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Nom</label>
              <input className="w-full border rounded px-3 py-2" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full border rounded px-3 py-2" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Téléphone</label>
              <input className="w-full border rounded px-3 py-2" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
            </div>
          </div>

          <div className="flex justify-between gap-2 mt-2">
            <button onClick={prev} className="px-4 py-2 rounded border border-gray-300 text-sm">Retour</button>
            <button onClick={submitMail} className="px-4 py-2 rounded bg-accent-500 text-white hover:bg-accent-600 text-sm">Envoyer la demande</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteForm;