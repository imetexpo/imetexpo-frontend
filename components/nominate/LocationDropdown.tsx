'use client';

import { useState } from 'react';
import LoadingDots from '@/components/ui/LoadingDots';


const OTHER = '__other__';
const inputClass = 'w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1] disabled:cursor-not-allowed disabled:bg-gray-100';

type Props = {
  label: string;
  name: string;
  value: string;
  options: string[];
  loading: boolean;
  error: boolean;
  disabled: boolean;
  validationError?: string;
  onChange: (value: string) => void;
};

export default function LocationDropdown({ label, name, value, options, loading, error, disabled, validationError, onChange }: Props) {
  const [manual, setManual] = useState(false);
  const custom = manual || Boolean(value && !loading && !options.includes(value));

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} <span className="text-[#00A1B1]">*</span>
      </label>
      <div className="relative"><select
        id={name}
        name={custom ? name + 'Selection' : name}
        value={custom ? OTHER : value}
        disabled={disabled}
        aria-busy={loading}
        aria-invalid={validationError && !custom ? true : undefined}
        aria-describedby={validationError ? name + '-error' : undefined}
        required
        className={inputClass}
        onChange={(event) => {
          const next = event.target.value;
          setManual(next === OTHER);
          onChange(next === OTHER ? '' : next);
        }}
      >
        <option value="">{loading ? 'Loading...' : 'Select ' + label.toLowerCase()}</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
        <option value={OTHER}>Other / Not listed</option>
      </select>{loading && <LoadingDots size="sm" className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2" label="Loading..." />}</div>
      {custom && (
        <>
          <label htmlFor={name + 'Custom'} className="sr-only">Enter {label.toLowerCase()}</label>
          <input
            id={name + 'Custom'}
            name={name}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={'Enter ' + label.toLowerCase()}
            disabled={disabled}
            required
            maxLength={200}
            aria-invalid={validationError ? true : undefined}
            aria-describedby={validationError ? name + '-error' : undefined}
            className={inputClass}
          />
        </>
      )}
      {validationError && <p id={name + '-error'} className="text-sm text-red-600">{validationError}</p>}
      {error && <p className="text-xs text-gray-600" role="status">Locations could not be loaded. Choose Other / Not listed to enter yours.</p>}
    </div>
  );
}
