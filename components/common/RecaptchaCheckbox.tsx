'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';

type GoogleRecaptchaApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback': () => void;
      'error-callback': () => void;
    },
  ) => number;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: GoogleRecaptchaApi;
  }
}

export default function RecaptchaCheckbox({ onVerify }: { onVerify: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<number | null>(null);
  const [loadError, setLoadError] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const renderWidget = useCallback(() => {
    const api = window.grecaptcha;
    if (!api || !container.current || !siteKey || widget.current !== null) return;

    widget.current = api.render(container.current, {
      sitekey: siteKey,
      callback: (token) => {
        setLoadError(false);
        onVerify(token);
      },
      'expired-callback': () => onVerify(''),
      'error-callback': () => {
        setLoadError(true);
        onVerify('');
      },
    });
  }, [onVerify, siteKey]);

  useEffect(() => {
    renderWidget();
    return () => {
      if (widget.current !== null) window.grecaptcha?.reset(widget.current);
      widget.current = null;
    };
  }, [renderWidget]);

  if (!siteKey) {
    return (
      <p role="alert" className="text-sm text-red-600">
        Security verification is not configured. Please try again later.
      </p>
    );
  }

  return (
    <div>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        onReady={renderWidget}
        onError={() => {
          setLoadError(true);
          onVerify('');
        }}
      />
      <div ref={container} />
      {loadError && (
        <p role="alert" className="mt-2 text-sm text-red-600">
          Security verification could not load. Please refresh and try again.
        </p>
      )}
    </div>
  );
}
