'use client';

import { useEffect, useState } from 'react';

type LocationResult = {
  key: string;
  options: string[];
  error: boolean;
};

const COUNTRY_ALIASES: Record<string, string> = {
  'Cape Verde': 'Cabo Verde',
  'Congo (Brazzaville)': 'Republic of the Congo',
  'Congo (Kinshasa)': 'Democratic Republic of the Congo',
  'Myanmar (Burma)': 'Myanmar',
};

export function useLocationOptions(country: string, state = '', type: 'states' | 'cities' = 'states') {
  const requestKey = type === 'states' ? country : JSON.stringify([country, state]);
  const enabled = Boolean(country && (type === 'states' || state));
  const [result, setResult] = useState<LocationResult>({ key: '', options: [], error: false });

  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch(
          'https://countriesnow.space/api/v0.1/countries/' + (type === 'states' ? 'states' : 'state/cities'),
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              country: COUNTRY_ALIASES[country] || country,
              ...(type === 'cities' ? { state } : {}),
            }),
            signal: controller.signal,
          },
        );
        if (!response.ok) throw new Error('Unable to load locations');
        const body = await response.json();
        if (body.error) throw new Error('Unable to load locations');
        const data = type === 'states' ? body.data?.states : body.data;
        if (!Array.isArray(data)) throw new Error('Invalid location response');
        const names: string[] = data
          .map((item: string | { name: string }) => typeof item === 'string' ? item : item.name)
          .filter((name: unknown): name is string => typeof name === 'string' && name.length > 0);
        if (!cancelled) {
          setResult({ key: requestKey, options: [...new Set(names)].sort((a, b) => a.localeCompare(b)), error: false });
        }
      } catch {
        if (!cancelled) setResult({ key: requestKey, options: [], error: true });
      } finally {
        clearTimeout(timeout);
      }
    }

    void load();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [country, state, type, requestKey, enabled]);

  const current = enabled && result.key === requestKey;
  return {
    options: current ? result.options : [],
    loading: enabled && !current,
    error: current && result.error,
  };
}
