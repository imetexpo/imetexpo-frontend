'use client';

import type { ReactNode } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function RecaptchaV3Provider({ children }: { children: ReactNode }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
      useEnterprise
      scriptProps={{ async: true, defer: true, appendTo: 'head' }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
