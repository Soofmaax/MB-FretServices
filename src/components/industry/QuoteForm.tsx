// Composants spécifiques logistique
import type { FC } from 'react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type RouteKey = 'services_freight_france_angola';

type ClientType = 'business' | 'individual' | 'association';

type ShipmentTypeKey = 'moving' | 'b2b' | 'vehicles' | 'motorbikes' | 'machines';

type VolumeBandKey =
  | 'band_1_3'
  | 'band_3_5'
  | 'band_5_7'
  | 'band_7_10'
  | 'band_10_plus'
  | 'band_unknown';

type FrequencyKey = 'oneoff' | 'regular';

type MetaState = {
  declaredValue: string;
  fromCountry: string;
  fromCity: string;
  toCountry: string;
  toCity: string;
  frequency: FrequencyKey;
};

type Props = {
  defaultRoute?: RouteKey | null;
};

const ROUTES: { key: RouteKey; labelKey: string; fallback: string }[] = [
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
];

const CLIENT_TYPES: { key: ClientType; labelKey: string; fallback: string }[] = [
  {
    key: 'business',
    labelKey: 'quote:client_type.business',
    fallback: 'Business',
  },
  {
    key: 'individual',
    labelKey: 'quote:client_type.individual',
    fallback: 'Individual',
  },
  {
    key: 'association',
    labelKey: 'quote:client_type.association',
    fallback: 'Association',
  },
];

const SHIPMENT_TYPES: { key: ShipmentTypeKey; labelKey: string; fallback: string }[] = [
  {
    key: 'moving',
    labelKey: 'quote:shipment_types.moving',
    fallback: 'International move / personal effects',
  },
  {
    key: 'b2b',
    labelKey: 'quote:shipment_types.b2b',
    fallback: 'B2B goods (pallets, boxes, parts...)',
  },
  {
    key: 'vehicles',
    labelKey: 'quote:shipment_types.vehicles',
    fallback: 'Vehicles',
  },
  {
    key: 'motorbikes',
    labelKey: 'quote:shipment_types.motorbikes',
    fallback: 'Motorbikes (on wheels, without dismantling when possible)',
  },
  {
    key: 'machines',
    labelKey: 'quote:shipment_types.machines',
    fallback: 'Machines / equipment',
  },
];

const VOLUME_BANDS: { key: VolumeBandKey; labelKey: string; fallback: string }[] = [
  {
    key: 'band_1_3',
    labelKey: 'quote:volume_band.band_1_3',
    fallback: '1–3 m³',
  },
  {
    key: 'band_3_5',
    labelKey: 'quote:volume_band.band_3_5',
    fallback: '3–5 m³',
  },
  {
    key: 'band_5_7',
    labelKey: 'quote:volume_band.band_5_7',
    fallback: '5–7 m³',
  },
  {
    key: 'band_7_10',
    labelKey: 'quote:volume_band.band_7_10',
    fallback: '7–10 m³',
  },
  {
    key: 'band_10_plus',
    labelKey: 'quote:volume_band.band_10_plus',
    fallback: 'More than 10 m³',
  },
  {
    key: 'band_unknown',
    labelKey: 'quote:volume_band.band_unknown',
    fallback: "I don't know",
  },
];

const FREQUENCY_OPTIONS: { key: FrequencyKey; labelKey: string; fallback: string }[] = [
  {
    key: 'oneoff',
    labelKey: 'quote:frequency.oneoff',
    fallback: 'One-off shipment',
  },
  {
    key: 'regular',
    labelKey: 'quote:frequency.regular',
    fallback: 'Regular shipments',
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
  const [clientType, setClientType] = useState<ClientType>('business');
  const [shipmentTypes, setShipmentTypes] = useState<ShipmentTypeKey[]>([]);
  const [volumeBand, setVolumeBand] = useState<VolumeBandKey | ''>('');
  const [meta, setMeta] = useState<MetaState>({
    declaredValue: '',
    fromCountry: '',
    fromCity: '',
    toCountry: '',
    toCity: '',
    frequency: 'oneoff',
  });

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

  const toggleShipmentType = (key: ShipmentTypeKey) => {
    setShipmentTypes((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  };

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

    const clientTypeLabel = t(
      `quote:client_type.${clientType}`,
      clientType
    );

    const shipmentTypeLabels =
      shipmentTypes.length > 0
        ? shipmentTypes
            .map((key) => t(`quote:shipment_types.${key}`))
            .join(', ')
        : t('quote:shipment_types.none', 'Not specified');

    const volumeBandLabel = volumeBand
      ? t(`quote:volume_band.${volumeBand}`)
      : t('quote:volume_band.none', 'Not specified');

    const frequencyLabel = t(
      `quote:frequency.${meta.frequency}`,
      meta.frequency
    );

    const bodyLines = [
      t('quote:email_body.route', 'Route: __ROUTE__').replace('__ROUTE__', r),
      t('quote:email_body.service', 'Service: __SERVICE__').replace(
        '__SERVICE__',
        service
      ),
      t(
        'quote:email_body.client_type',
        'Client type: __TYPE__'
      ).replace('__TYPE__', clientTypeLabel),
      t(
        'quote:email_body.shipment_types',
        'Shipment types: __TYPES__'
      ).replace('__TYPES__', shipmentTypeLabels),
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
      t(
        'quote:email_body.volume_band',
        ' - Volume band: __BAND__'
      ).replace('__BAND__', volumeBandLabel),
      t(
        'quote:email_body.declared_value',
        ' - Declared value (approx.): __VALUE__'
      ).replace('__VALUE__', meta.declaredValue || ''),
      '',
      t(
        'quote:email_body.from',
        'From: __FROM_COUNTRY__ — __FROM_CITY__'
      )
        .replace('__FROM_COUNTRY__', meta.fromCountry || '')
        .replace('__FROM_CITY__', meta.fromCity || ''),
      t('quote:email_body.to', 'To: __TO_COUNTRY__ — __TO_CITY__')
        .replace('__TO_COUNTRY__', meta.toCountry || '')
        .replace('__TO_CITY__', meta.toCity || ''),
      t(
        'quote:email_body.frequency',
        'Frequency: __FREQUENCY__'
      ).replace('__FREQUENCY__', frequencyLabel),
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
            <div className="flex flex-wrap gap-3">
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

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              {t('quote:client_type.label', 'You are')}
            </label>
            <div className="flex flex-wrap gap-3">
              {CLIENT_TYPES.map((ct) => (
                <label
                  key={ct.key}
                  className={`cursor-pointer px-3 py-2 rounded border ${
                    clientType === ct.key
                      ? 'bg-accent-50 border-accent-500 text-accent-700'
                      : 'border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="clientType"
                    value={ct.key}
                    checked={clientType === ct.key}
                    onChange={() => setClientType(ct.key)}
                    className="mr-2"
                  />
                  {t(ct.labelKey, ct.fallback)}
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

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              {t('quote:shipment_types.label', 'What do you want to ship?')}
            </label>
            <div className="flex flex-wrap gap-2">
              {SHIPMENT_TYPES.map((st) => {
                const checked = shipmentTypes.includes(st.key);
                return (
                  <label
                    key={st.key}
                    className={`cursor-pointer px-3 py-2 rounded border text-sm ${
                      checked
                        ? 'bg-accent-50 border-accent-500 text-accent-700'
                        : 'border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={checked}
                      onChange={() => toggleShipmentType(st.key)}
                    />
                    {t(st.labelKey, st.fallback)}
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              {t(
                'quote:volume_band.label',
                "Approximate volume (if you don't know the exact dimensions)"
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {VOLUME_BANDS.map((band) => {
                const checked = volumeBand === band.key;
                return (
                  <label
                    key={band.key}
                    className={`cursor-pointer px-3 py-2 rounded border text-sm ${
                      checked
                        ? 'bg-accent-50 border-accent-500 text-accent-700'
                        : 'border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="volumeBand"
                      className="mr-2"
                      checked={checked}
                      onChange={() => setVolumeBand(band.key)}
                    />
                    {t(band.labelKey, band.fallback)}
                  </label>
                );
              })}
            </div>
          </div>

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

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t(
                  'quote:meta.from_country_label',
                  'Departure country'
                )}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={meta.fromCountry}
                onChange={(e) =>
                  setMeta({ ...meta, fromCountry: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t('quote:meta.from_city_label', 'Departure city / place')}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={meta.fromCity}
                onChange={(e) =>
                  setMeta({ ...meta, fromCity: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t(
                  'quote:meta.to_country_label',
                  'Destination country'
                )}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={meta.toCountry}
                onChange={(e) =>
                  setMeta({ ...meta, toCountry: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t(
                  'quote:meta.to_city_label',
                  'Destination city / place'
                )}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={meta.toCity}
                onChange={(e) =>
                  setMeta({ ...meta, toCity: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t(
                  'quote:meta.declared_value_label',
                  'Approximate declared value (for insurance)'
                )}
              </label>
              <input
                className="w-full border rounded px-3 py-2"
                value={meta.declaredValue}
                onChange={(e) =>
                  setMeta({ ...meta, declaredValue: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                {t('quote:frequency.label', 'Shipment frequency')}
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                value={meta.frequency}
                onChange={(e) =>
                  setMeta({
                    ...meta,
                    frequency: e.target.value as FrequencyKey,
                  })
                }
              >
                {FREQUENCY_OPTIONS.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {t(opt.labelKey, opt.fallback)}
                  </option>
                ))}
              </select>
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