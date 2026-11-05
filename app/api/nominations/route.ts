import { randomUUID } from 'node:crypto';
import { after } from 'next/server';
import { PROJECT_ID_VAR } from '@/lib/graphql-client';
import { processNomination } from '@/lib/nominationProcessing';
import {
  NOMINATION_STEP_FIELDS, normalizeNomination, validateNominationStep,
} from '@/lib/nominationForm';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const input: unknown = await request.json();
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid form');
    body = input as Record<string, unknown>;
  } catch {
    return Response.json({ success: false, message: 'Please submit a valid nomination.' }, { status: 400 });
  }

  const data = normalizeNomination(body);
  for (let step = 0; step < NOMINATION_STEP_FIELDS.length - 1; step++) {
    const errors = validateNominationStep(data, step);
    if (Object.keys(errors).length) {
      return Response.json({
        success: false, message: 'Please check the highlighted fields.', step, errors,
      }, { status: 400 });
    }
  }
  if (body.consent !== true) {
    return Response.json({ success: false, message: 'Please confirm the details and accept the privacy policy.' }, { status: 400 });
  }
  if (!PROJECT_ID_VAR.projectId || !process.env.NEXT_PUBLIC_CMS_GRAPHQL_ENDPOINT ||
      !process.env.RESEND_API_KEY || !process.env.RESEND_FROM) {
    return Response.json({
      success: false, message: 'Nominations are temporarily unavailable. Your details are still here; please try again later.',
    }, { status: 503 });
  }

  const submissionId = randomUUID();
  const submittedAt = new Date().toISOString();
  after(() => processNomination(data, submissionId, submittedAt));
  return Response.json({ success: true, submissionId }, { status: 202 });
}
