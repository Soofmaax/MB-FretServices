// Composants spécifiques logistique
import type { FC } from 'react';
import { useState } from 'react';

type Row = { l: number; w: number; h: number; qty: number };

const CBMCalculator: FC = () => {
  const [rows, setRows] = useState<Row[]>([{ l: 0, w: 0, h: 0, qty: 1 }]);

  const onChange = (index: number, key: keyof Row, value: number) => {
    const next = rows.slice();
    next[index] = { ...next[index], [key]: Number.isFinite(value) ? value : 0 };
    setRows(next);
  };

  const addRow = () => setRows((r) => [...r, { l: 0, w: 0, h: 0, qty: 1 }]);
  const removeRow = (idx: number) => setRows((r) => r.filter((_, i) => i !== idx));

  const cbmFor = (r: Row) => (r.l * r.w * r.h * r.qty) / 1_000_000; // cm -> m
  const total = rows.reduce((sum, r) => sum + cbmFor(r), 0);

  const suggestion = (() => {
    if (total <= 15) return 'LCL recommandé (<≈15 m³).';
    if (total <= 33) return '20’ possible (≈33 m³).';
    if (total <= 67) return '40’ possible (≈67 m³).';
    return '40’ High Cube / multiple conteneurs.';
  })();

  return (
    <div>
      <div className="space-y-3">
        {rows.map((r, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 items-end">
            <div className="col-span-3">
              <label className="block text-xs text-gray-600">Longueur (cm)</label>
              <input
                type="number"
                inputMode="decimal"
                className="w-full border rounded px-2 py-1"
                value={r.l}
                onChange={(e) => onChange(idx, 'l', parseFloat(e.target.value))}
                min={0}
              />
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-600">Largeur (cm)</label>
              <input
                type="number"
                inputMode="decimal"
                className="w-full border rounded px-2 py-1"
                value={r.w}
                onChange={(e) => onChange(idx, 'w', parseFloat(e.target.value))}
                min={0}
              />
            </div>
            <div className="col-span-3">
              <label className="block text-xs text-gray-600">Hauteur (cm)</label>
              <input
                type="number"
                inputMode="decimal"
                className="w-full border rounded px-2 py-1"
                value={r.h}
                onChange={(e) => onChange(idx, 'h', parseFloat(e.target.value))}
                min={0}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-gray-600">Quantité</label>
              <input
                type="number"
                className="w-full border rounded px-2 py-1"
                value={r.qty}
                onChange={(e) => onChange(idx, 'qty', parseFloat(e.target.value))}
                min={1}
              />
            </div>
            <div className="col-span-1">
              <button
                type="button"
                onClick={() => removeRow(idx)}
                className="text-xs text-red-600 hover:underline"
                aria-label="Supprimer la ligne"
              >
                Suppr.
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={addRow}
          className="px-3 py-1 rounded bg-primary-900 text-white hover:bg-primary-800 text-sm"
        >
          Ajouter une ligne
        </button>
        <div className="text-sm text-gray-700">
          Volume total: <strong>{total.toFixed(2)} m³</strong> — {suggestion}
        </div>
      </div>
    </div>
  );
};

export default CBMCalculator;