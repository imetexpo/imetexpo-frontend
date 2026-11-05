import { PROJECT_ID_VAR, submitContactForm } from '@/lib/graphql-client';
import {
  NOMINATION_LABELS, NOMINATION_STEP_FIELDS, normalizeNomination, validateNominationStep,
} from '@/lib/nominationForm';

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
  if (!PROJECT_ID_VAR.projectId) {
    return Response.json({
      success: false, message: 'Nominations are temporarily unavailable. Your details are still here; please try again later.',
    }, { status: 503 });
  }

  try {
    const result = await submitContactForm(PROJECT_ID_VAR.projectId, {
      formType: 'award-nomination',
      name: data.contactPerson,
      email: data.email,
      companyName: data.nominatorName,
      jobTitle: data.designation,
      phone: data.mobile,
      country: data.nominatorCountry,
      state: data.nominatorState,
      city: data.nominatorCity,
      message: [
        'Award nomination',
        ...NOMINATION_STEP_FIELDS.slice(0, 4).flatMap((fields) =>
          fields.map((field) => NOMINATION_LABELS[field] + ': ' + (data[field] || 'Not provided')),
        ),
        'Details confirmed and privacy policy accepted: Yes',
        'Submitted at: ' + new Date().toISOString(),
      ].join('\n'),
    });
    if (result.errors?.length || !result.data?.createLead?.id) throw new Error('Nomination was not saved');
    return Response.json({ success: true });
  } catch {
    return Response.json({
      success: false, message: 'Your nomination could not be saved. Your details are still here; please try again.',
    }, { status: 502 });
  }
}
