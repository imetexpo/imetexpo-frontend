'use client';

import React, { useState, useEffect } from 'react';
import { COUNTRIES } from '@/lib/registrationOptions';
import { useLocationOptions } from '@/hooks/useLocationOptions';
import LoadingDots from '@/components/ui/LoadingDots';

const OTHER_VALUE = '__other__';

interface CountryStateCityFieldsProps {
  country: string;
  state: string;
  city: string;
  onCountryChange: (country: string) => void;
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
  required?: boolean;
  disabled?: boolean;
  inputClassName?: string;
  labelClassName?: string;
}

export default function CountryStateCityFields({
  country,
  state,
  city,
  onCountryChange,
  onStateChange,
  onCityChange,
  required = true,
  disabled = false,
  inputClassName = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] outline-none transition bg-white text-sm',
  labelClassName = 'block text-sm font-medium text-gray-700 mb-1',
}: CountryStateCityFieldsProps) {
  const statesResult = useLocationOptions(country);
  const citiesResult = useLocationOptions(country, state, 'cities');

  const [customState, setCustomState] = useState(false);
  const [customCity, setCustomCity] = useState(false);

  // Sync custom input state with incoming values
  useEffect(() => {
    if (state && !statesResult.loading && statesResult.options.length > 0 && !statesResult.options.includes(state)) {
      setCustomState(true);
    }
  }, [state, statesResult.loading, statesResult.options]);

  useEffect(() => {
    if (city && !citiesResult.loading && citiesResult.options.length > 0 && !citiesResult.options.includes(city)) {
      setCustomCity(true);
    }
  }, [city, citiesResult.loading, citiesResult.options]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextCountry = e.target.value;
    onCountryChange(nextCountry);
    onStateChange('');
    onCityChange('');
    setCustomState(false);
    setCustomCity(false);
  };

  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === OTHER_VALUE) {
      setCustomState(true);
      onStateChange('');
    } else {
      setCustomState(false);
      onStateChange(val);
    }
    onCityChange('');
    setCustomCity(false);
  };

  const handleCitySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === OTHER_VALUE) {
      setCustomCity(true);
      onCityChange('');
    } else {
      setCustomCity(false);
      onCityChange(val);
    }
  };

  const statesAvailable = !statesResult.loading && statesResult.options.length > 0 && !statesResult.error;
  const citiesAvailable = !citiesResult.loading && citiesResult.options.length > 0 && !citiesResult.error;

  return (
    <>
      {/* 1. COUNTRY */}
      <div>
        <label className={labelClassName}>
          Country {required && <span className="text-[#00A1B1]">*</span>}
        </label>
        <select
          name="country"
          value={country}
          onChange={handleCountryChange}
          required={required}
          disabled={disabled}
          className={`${inputClassName} cursor-pointer`}
        >
          <option value="">Select Country</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 2. STATE & 3. CITY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* STATE */}
        <div>
          <label className={labelClassName}>
            State / Province {required && <span className="text-[#00A1B1]">*</span>}
          </label>
          <div className="relative">
            {customState || (!statesResult.loading && statesResult.options.length === 0 && country) ? (
              <div className="space-y-1.5">
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => onStateChange(e.target.value)}
                  placeholder="Enter state / province"
                  required={required}
                  disabled={disabled || !country}
                  className={inputClassName}
                />
                {statesResult.options.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomState(false);
                      onStateChange('');
                    }}
                    className="text-xs text-[#00A1B1] hover:underline"
                  >
                    ← Choose from list
                  </button>
                )}
              </div>
            ) : (
              <>
                <select
                  name="state"
                  value={state}
                  onChange={handleStateSelect}
                  required={required}
                  disabled={disabled || !country || statesResult.loading}
                  className={`${inputClassName} cursor-pointer`}
                >
                  <option value="">
                    {statesResult.loading
                      ? 'Loading states...'
                      : !country
                      ? 'Select country first'
                      : 'Select State'}
                  </option>
                  {statesResult.options.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                  {country && statesAvailable && (
                    <option value={OTHER_VALUE}>Other / Not listed</option>
                  )}
                </select>
                {statesResult.loading && (
                  <LoadingDots
                    size="sm"
                    className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2"
                    label="Loading states..."
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* CITY */}
        <div>
          <label className={labelClassName}>
            City {required && <span className="text-[#00A1B1]">*</span>}
          </label>
          <div className="relative">
            {customCity || (!citiesResult.loading && citiesResult.options.length === 0 && state) ? (
              <div className="space-y-1.5">
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => onCityChange(e.target.value)}
                  placeholder="Enter city"
                  required={required}
                  disabled={disabled || !state}
                  className={inputClassName}
                />
                {citiesResult.options.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomCity(false);
                      onCityChange('');
                    }}
                    className="text-xs text-[#00A1B1] hover:underline"
                  >
                    ← Choose from list
                  </button>
                )}
              </div>
            ) : (
              <>
                <select
                  name="city"
                  value={city}
                  onChange={handleCitySelect}
                  required={required}
                  disabled={disabled || !state || citiesResult.loading}
                  className={`${inputClassName} cursor-pointer`}
                >
                  <option value="">
                    {citiesResult.loading
                      ? 'Loading cities...'
                      : !state
                      ? 'Select state first'
                      : 'Select City'}
                  </option>
                  {citiesResult.options.map((ct) => (
                    <option key={ct} value={ct}>
                      {ct}
                    </option>
                  ))}
                  {state && citiesAvailable && (
                    <option value={OTHER_VALUE}>Other / Not listed</option>
                  )}
                </select>
                {citiesResult.loading && (
                  <LoadingDots
                    size="sm"
                    className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2"
                    label="Loading cities..."
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

