// Composants spécifiques logistique
import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type RouteKey =
  | 'services_freight_france_china'
  | 'services_freight_france_congo'
  | 'services_freight_france_angola'
  | 'services_freight_france_turkey';

type Props = {
  defaultRoute?: RouteKey | null;
};

const ROUTES: { key: RouteKey; labelKey: string; fallback: string }[] = [
  {
    key: 'services_freight_france_china',
    labelKey: 'routes_main:france_china.label',
    fallback: 'France ↔ China',
  },
  {
    key: 'services_freight_france_congo',
    labelKey: 'routes_main:france_congo.label',
    fallback: 'France ↔ Congo',
  },
  {
    key: 'services_freight_france_angola',
    labelKey: 'routes_main:france_angola.label',
    fallback: 'France ↔ Angola',
  },
  {
    key: 'services_freight_france_turkey',
    labelKey: 'routes_main:france_turkey.label',
    fallback: 'France ↔ Turkey',
  },
];

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
  const { t } = useTranslation(['quote', 'routes_main']);
  const [step, setStep] = useState(1);
  const [route, setRoute] = useState<RouteKey>(defaultRoute || ROUTES[0].key);
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

  const routeOptions = ROUTES.map((r) => ({
    key: r.key,
    label: t(r.labelKey, r.fallback),
  }));

  const currentRouteLabel = routeOptions.find((r) => r.key === route)?.label || '';

  const next = () => {
    setStep((s) => {
      const nextStep = Math.min(3, s + 1);
      if (nextStep === 2) {
        track('lead_progress', { step: 2, route, service });
      } else if (nextStep === 3) {
        track('lead_progress', {
          step: 3,
          route,
          service,
          cbm: Number.isFinite(cbm) ? Number(cbm.toFixed(2)) : 0,
        });
      }
      return nextStep;
    });
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submitMail = () => {
    const r = currentRouteLabel;
    track('lead_submit', {
      route,
      service,
      cbm: Number.isFinite(cbm) ? Number(cbm.toFixed(2)) : 0,
    });

    const subjectTemplate = t(
      'quote:email_subject',
      'Quote request — __ROUTE__ (__SERVICE__)'
    );
    const subject = encodeURIComponent(
      subjectTemplate.replace('__ROUTE__', r).replace('__SERVICE__', service)
    );

    const bodyLines = [
      t('quote:email_body.route', 'Route: __ROUTE__').replace('__ROUTE__', r),
      t('quote:email_body.service', 'Service: __SERVICE__').replace(
        '__SERVICE__',
        service
      ),
      '',
      t('quote:email_body.cargo_heading', 'Cargo:'),
      t(
        'quote:email_body.dims',
        ' - Dimensions (cm): __L__ x __W__ x __H__'
      )
        .replace('__L__', dims.length || '')
        .replace('__W__', dims.width || '')
        .replace('__H__', dims.height || ''),
      t('quote:email_body.qty', ' - Quantity: __QTY__').replace(
        '__QTY__',
        dims.qty || ''
      ),
      t(
        'quote:email_body.weight',
        ' - Total weight (kg): __WEIGHT__'
      ).replace('__WEIGHT__', dims.weight || ''),
      t(
        'quote:email_body.volume',
        ' - Estimated volume: __CBM__ m³'
      ).replace('__CBM__', cbm.toFixed(2)),
      '',
      t('quote:email_body.contact_heading', 'Contact:'),
      t(
        'quote:email_body.company',
        ' - Company: __COMPANY__'
      ).replace('__COMPANY__', contact.company || ''),
      t('quote:email_body.name', ' - Name: __NAME__').replace(
        '__NAME__',
        contact.name || ''
      ),
      t('quote:email_body.email', ' - Email: __EMAIL__').replace(
        '__EMAIL__',
        contact.email || ''
      ),
      t('quote:email_body.phone', ' - Phone: __PHONE__').replace(
        '__PHONE__',
        contact.phone || ''
      ),
    ];

    const body = encodeURIComponent(bodyLines.join('\n'));

    window.location.href = `mailto:contact@mb-fretservices.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <h3 className="text-xl font-bold text-primary-900 mb-3">
        {t('quote:title', 'Quick quote request')}
      </h3>

      {step === 1 && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              {t('quote:route_label', 'Route')}
            </label>
            <select
              value={route}
              onChange={(e) => setRoute(e.target.value as RouteKey)}
              className="w-full border rounded px-3 py-2"
            >
              {routeOptions.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              {t('quote:service_label', 'Service type')}
            </label>
            <div className="flex gap-3">
              {(['LCL', 'FCL'] as const).map((opt) => (
                <label
                  key={opt}
                  className={`cursor-pointer px-3 py-2 rounded border ${
                    service === opt
                      ? 'bg-accent-50 border-accent-500 text-accent-700'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="service"
                    value={opt}
                    checked={service === opt}
                    onChange={() => setService(opt)}
                    className="mr-2"
                  />
                  {opt === 'LCL'
                    ? t('quote:service_LCL', 'LCL')
                    : t('quote:service_FCL', 'FCL')}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={next}
              className="px-4 py-2 rounded bg-primary-900 text-white hover:bg-primary-800 text-sm"
            >
              {t('quote:step1_next', 'Continue')}
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t('quote:length_label', 'Length (cm)')}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={dims.length}
                onChange={(e) => setDims({ ...dims, length: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t('quote:width_label', 'Width (cm)')}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={dims.width}
                onChange={(e) => setDims({ ...dims, width: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t('quote:height_label', 'Height (cm)')}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={dims.height}
                onChange={(e) => setDims({ ...dims, height: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t('quote:qty_label', 'Quantity')}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={dims.qty}
                onChange={(e) => setDims({ ...dims, qty: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t('quote:weight_label', 'Total weight (kg)')}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={dims.weight}
                onChange={(e) => setDims({ ...dims, weight: e.target.value })}
              />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {t('quote:volume_prefix', 'Estimated volume:')}{' '}
            <strong>{cbm.toFixed(2)} m³</strong>
          </p>

          <div className="flex justify-between gap-2 mt-2">
            <button
              onClick={prev}
              className="px-4 py-2 rounded border border-gray-300 text-sm"
            >
              {t('quote:step2_back', 'Back')}
            </button>
            <button
              onClick={next}
              className="px-4 py-2 rounded bg-primary-900 text-white hover:bg-primary-800 text-sm"
            >
              {t('quote:step2_next', 'Continue')}
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t('quote:company_label', 'Company')}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={contact.company}
                onChange={(e) =>
                  setContact({ ...contact, company: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t('quote:name_label', 'Name')}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={contact.name}
                onChange={(e) =>
                  setContact({ ...contact, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t('quote:email_label', 'Email')}
              </label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t('quote:phone_label', 'Phone')}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-between gap-2 mt-2">
            <button
              onClick={prev}
              className="px-4 py-2 rounded border border-gray-300 text-sm"
            >
              {t('quote:step3_back', 'Back')}
            </button>
            <button
              onClick={submitMail}
              className="px-4 py-2 rounded bg-accent-700 text-white hover:bg-accent-800 text-sm"
            >
              {t('quote:step3_submit', 'Send request')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteForm;