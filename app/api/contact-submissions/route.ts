import { randomUUID } from 'node:crypto';
import { after } from 'next/server';
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
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const token = body.captchaToken;

    if (!siteKey || !secret) {
      return Response.json({
        success: false,
        message: 'Security verification is temporarily unavailable. Please try again later.',
      }, { status: 503 });
    }
    if (typeof token !== 'string' || !token || token.length > 2048) {
      return Response.json({ success: false, message: 'Please complete security verification.' }, { status: 400 });
    }

    try {
      const verification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
        signal: AbortSignal.timeout(10000),
      });
      if (!verification.ok) throw new Error('Verification service unavailable');
      const result = await verification.json() as { success?: boolean };
      if (result.success !== true) {
        return Response.json({
          success: false,
          message: 'Security verification expired or failed. Please try again.',
        }, { status: 400 });
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
