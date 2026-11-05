import { setTimeout as delay } from 'node:timers/promises';
import { PROJECT_ID_VAR, submitContactForm } from './graphql-client';
import { NOMINATION_LABELS, NOMINATION_STEP_FIELDS, type NominationData } from './nominationForm';

const REQUEST_TIMEOUT_MS = 8000;

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  };
  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

async function withRetry(task: () => Promise<void>) {
  try {
    await task();
  } catch {
    await delay(300);
    await task();
  }
}

async function saveToCms(data: NominationData, submissionId: string, submittedAt: string) {
  const result = await submitContactForm(PROJECT_ID_VAR.projectId!, {
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
      'Submission reference: ' + submissionId,
      ...NOMINATION_STEP_FIELDS.slice(0, 4).flatMap((fields) =>
        fields.map((field) => NOMINATION_LABELS[field] + ': ' + (data[field] || 'Not provided')),
      ),
      'Details confirmed and privacy policy accepted: Yes',
      'Submitted at: ' + submittedAt,
    ].join('\n'),
  }, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  if (result.errors?.length || !result.data?.createLead?.id) {
    throw new Error('CMS did not confirm the nomination was saved.');
  }
}

async function sendConfirmation(data: NominationData, submissionId: string) {
  const name = escapeHtml(data.contactPerson);
  const nominee = escapeHtml(data.nomineeName);
  const category = escapeHtml(data.category);
  const reference = escapeHtml(submissionId);
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#FCF8F3;font-family:Arial,sans-serif;color:#374151">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:32px 16px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border:1px solid #e5e7eb;border-radius:12px">
        <tr><td style="padding:28px;background:#003A77;color:#fff;border-radius:12px 12px 0 0">
          <p style="margin:0 0 8px;font-size:13px;letter-spacing:2px">INDIAMET EXPO</p>
          <h1 style="margin:0;font-size:26px">Thank you for your nomination</h1>
        </td></tr>
        <tr><td style="padding:28px;line-height:1.7">
          <p>Dear ${name},</p>
          <p>Thank you for nominating <strong>${nominee}</strong> for the INDIAMET Expo Awards.</p>
          <p><strong>Award category:</strong> ${category}</p>
          <p>Our team will review your nomination and contact you if further information is needed.</p>
          <p style="padding:14px;background:#FCF8F3;font-size:13px"><strong>Submission reference:</strong> ${reference}</p>
          <p>Best regards,<br><strong>INDIAMET Expo Awards Team</strong></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + process.env.RESEND_API_KEY,
      'Content-Type': 'application/json',
      'Idempotency-Key': 'nomination-confirmation/' + submissionId,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM,
      to: [data.email],
      subject: 'Thank you for your nomination | INDIAMET Expo Awards',
      html,
      text: [
        'Dear ' + data.contactPerson + ',',
        '',
        'Thank you for nominating ' + data.nomineeName + ' for the INDIAMET Expo Awards.',
        'Award category: ' + data.category,
        'Our team will review your nomination and contact you if further information is needed.',
        '',
        'Submission reference: ' + submissionId,
        'INDIAMET Expo Awards Team',
      ].join('\n'),
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  const result = await response.json();
  if (!response.ok || typeof result.id !== 'string' || !result.id) {
    throw new Error('Confirmation email was not accepted by the provider.');
  }
}

export async function processNomination(data: NominationData, submissionId: string, submittedAt: string) {
  const results = await Promise.allSettled([
    withRetry(() => saveToCms(data, submissionId, submittedAt)),
    withRetry(() => sendConfirmation(data, submissionId)),
  ]);
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error('Nomination background processing failed', {
        submissionId,
        task: index === 0 ? 'cms' : 'confirmation-email',
      });
    }
  });
}
