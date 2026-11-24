import { PROJECT_ID_VAR, submitContactForm } from './graphql-client';
import { sendContactEmail } from './api/contact';

const REQUEST_TIMEOUT_MS = 20000;

type ContactSubmission = Record<string, unknown> & {
  email: string;
  formType: string;
};

const CMS_FIELDS = new Set([
  'formType', 'email', 'name', 'firstName', 'lastName', 'contactPerson',
  'companyName', 'company', 'jobTitle', 'designation', 'phone', 'mobile',
  'country', 'state', 'city', 'message', 'comments', 'profile',
]);

function formatCmsValue(value: unknown): string {
  if (Array.isArray(value)) return value.map(formatCmsValue).join(', ');
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (value && typeof value === 'object') return JSON.stringify(value) ?? String(value);
  return String(value);
}

function buildCmsMessage(data: ContactSubmission, submissionId: string): string {
  const originalMessage = [data.message, data.comments, data.profile]
    .find((value) => typeof value === 'string' && value.trim());

  const additionalDetails = Object.entries(data)
    .filter(([key, value]) =>
      !CMS_FIELDS.has(key) &&
      key !== 'captchaToken' &&
      key !== 'verificationToken' &&
      value !== undefined &&
      value !== null &&
      value !== '',
    )
    .map(([key, value]) => key + ': ' + formatCmsValue(value));

  return [
    ...(typeof originalMessage === 'string' ? ['Message: ' + originalMessage] : []),
    ...additionalDetails,
    'Submission reference: ' + submissionId,
  ].join('\n');
}

async function saveToCms(data: ContactSubmission, submissionId: string) {
  const result = await submitContactForm(
    PROJECT_ID_VAR.projectId!,
    { ...data, message: buildCmsMessage(data, submissionId) },
    { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) },
  );

  if (result.errors?.length || !result.data?.createLead?.id) {
    throw new Error('CMS did not confirm the contact submission was saved.');
  }
}

async function sendConfirmationAndAdminNotification(data: ContactSubmission) {
  await sendContactEmail(data, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
}

export async function processContactSubmission(data: ContactSubmission, submissionId: string) {
  const results = await Promise.allSettled([
    saveToCms(data, submissionId),
    sendConfirmationAndAdminNotification(data),
  ]);

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error('Contact submission background processing failed', {
        submissionId,
        task: index === 0 ? 'cms' : 'confirmation-and-admin-email',
      });
    }
  });
}
