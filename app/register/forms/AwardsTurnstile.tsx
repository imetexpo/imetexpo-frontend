'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';

type TurnstileApi = {
  render: (container: HTMLElement, options: {
    sitekey: string;
    action: string;
    callback: (token: string) => void;
    'expired-callback': () => void;
    'error-callback': () => void;
  }) => string;
  remove: (id: string) => void;
};

export default function AwardsTurnstile({ onVerify }: { onVerify: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const [error, setError] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const render = useCallback(() => {
    const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
    if (!api || !container.current || !siteKey || widget.current !== null) return;
    widget.current = api.render(container.current, {
      sitekey: siteKey,
      action: 'awards-registration',
      callback: (token) => { setError(false); onVerify(token); },
      'expired-callback': () => onVerify(''),
      'error-callback': () => { setError(true); onVerify(''); },
    });
  }, [onVerify, siteKey]);

  useEffect(() => {
    render();
    return () => {
      const api = (window as Window & { turnstile?: TurnstileApi }).turnstile;
      if (widget.current !== null) api?.remove(widget.current);
      widget.current = null;
    };
  }, [render]);

  if (!siteKey) return null;

  return (
    <div>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={render}
        onError={() => { setError(true); onVerify(''); }}
      />
      <div ref={container} />
      {error && <p role="alert" className="mt-2 text-sm text-red-600">Security verification could not load. Please refresh and try again.</p>}
    </div>
  );
}
