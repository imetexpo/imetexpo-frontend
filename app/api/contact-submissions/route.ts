import { randomUUID } from 'node:crypto';
import { after } from 'next/server';
import { getContactApiUrl } from '@/lib/api/backendUrl';
import { PROJECT_ID_VAR } from '@/lib/graphql-client';
import { processContactSubmission } from '@/lib/contactSubmissionProcessing';

export const runtime = 'nodejs';
export const maxDuration = 60;

const ALLOWED_FORM_TYPES = new Set([
  'exhibitor-enquiry',
  'event-brochure',
  'sponsor-registration',
  'partner-registration',
]);
const CAPTCHA_REQUIRED_FORM_TYPES = new Set([
  'exhibitor-enquiry',
  'event-brochure',
  'sponsor-registration',
  'partner-registration',
]);

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    const input: unknown = await request.json();
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      throw new Error('Invalid submission');
    }
    body = input as Record<string, unknown>;
  } catch {
    return Response.json({ success: false, message: 'Please submit a valid form.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const formType = typeof body.formType === 'string' ? body.formType : '';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (!ALLOWED_FORM_TYPES.has(formType)) {
    return Response.json({ success: false, message: 'This form type is not supported.' }, { status: 400 });
  }

  const submissionBody = { ...body };
  delete submissionBody.captchaToken;

  if (CAPTCHA_REQUIRED_FORM_TYPES.has(formType)) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const proxySecret = process.env.RECAPTCHA_PROXY_SECRET;
    const token = body.captchaToken;
    const hasBackendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!siteKey || !proxySecret || (!hasBackendUrl && process.env.NODE_ENV === 'production')) {
      return Response.json({
        success: false,
        message: 'Security verification is temporarily unavailable. Please try again later.',
      }, { status: 503 });
    }
    if (typeof token !== 'string' || !token || token.length > 4096) {
      return Response.json({ success: false, message: 'Please complete security verification.' }, { status: 400 });
    }

    try {
      const userIpAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
      const verification = await fetch(getContactApiUrl() + '/recaptcha/assess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-recaptcha-proxy-secret': proxySecret,
          'x-recaptcha-token': token,
          'x-recaptcha-user-agent': request.headers.get('user-agent') || '',
          'x-recaptcha-user-ip': userIpAddress,
        },
        body: JSON.stringify({ formType, siteKey }),
        signal: AbortSignal.timeout(10000),
      });
      const result = await verification.json().catch(() => null) as { success?: boolean } | null;
      if (!verification.ok || result?.success !== true) {
        return Response.json({
          success: false,
          message: verification.status === 400
            ? 'Security verification failed. Please try again.'
            : 'Security verification is temporarily unavailable. Please try again.',
        }, { status: verification.status === 400 ? 400 : 503 });
      }
    } catch {
      return Response.json({
        success: false,
        message: 'Security verification is temporarily unavailable. Please try again.',
      }, { status: 503 });
    }
  }

  if (!PROJECT_ID_VAR.projectId || !process.env.NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT) {
    return Response.json({
      success: false,
      message: 'Submissions are temporarily unavailable. Your details are still here; please try again later.',
    }, { status: 503 });
  }

  const submissionId = randomUUID();
  const data = {
    ...submissionBody,
    email,
    formType,
    submittedAt: new Date().toISOString(),
  };

  after(() => processContactSubmission(data, submissionId));
  return Response.json({ success: true, submissionId }, { status: 202 });
}
