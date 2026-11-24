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
  if (!PROJECT_ID_VAR.projectId || !process.env.NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT) {
    return Response.json({
      success: false,
      message: 'Submissions are temporarily unavailable. Your details are still here; please try again later.',
    }, { status: 503 });
  }

  const submissionId = randomUUID();
  const data = {
    ...body,
    email,
    formType,
    submittedAt: new Date().toISOString(),
  };

  after(() => processContactSubmission(data, submissionId));
  return Response.json({ success: true, submissionId }, { status: 202 });
}
