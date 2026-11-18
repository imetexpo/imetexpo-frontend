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
  const company = escapeHtml(data.nominatorName);
  const jobTitle = escapeHtml(data.designation);
  const phone = escapeHtml(data.mobile);
  const email = escapeHtml(data.email);
  const address = [data.address, data.nominatorCity, data.nominatorState, data.nominatorCountry, data.pinCode].filter(Boolean).map(escapeHtml).join(", ") || "Not provided";

  const html = `<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#f2f2f2; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f2f2f2; padding:25px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #E2E8F0;">
          
          <!-- LOGO HEADER (REDUCED COLOR, NO DARK BANNER) -->
          <tr>
            <td align="center" style="background:#F2F8FA; padding:25px 24px; border-bottom:1px solid #E2E8F0;">
              <img 
                src="https://res.cloudinary.com/deo4vpw8f/image/upload/v1793946695/indimet_LOGO_cusfu7.png"
                style="max-width:180px; display:block; margin:0 auto;"
                alt="IndiaMET 2027 Logo"
              />
            </td>
          </tr>

          <!-- MAIN BODY OF THE CARD -->
          <tr>
            <td style="padding:30px; color:#333; font-family:Arial, sans-serif; text-align:left;">
              <p style="font-size:16px; margin:0 0 16px 0; color:#1e293b;">
                Dear ${name},
              </p>

              <p style="font-size:16px; line-height:1.6; margin:0 0 20px 0; color:#334155;">
                Thank you for your interest in submitting your nomination for <strong>IndiaMET 2027 – Dedicated Industrial Metrology Exhibition &amp; Summit</strong>. Below are your registration details:
              </p>

              <table width="100%" cellpadding="8" cellspacing="0" 
                style="background:#F2F8FA; margin:20px 0; border:1px solid #CBD5E1; border-radius:6px; border-collapse:collapse; font-size:14px; text-align:left;">
                <tr>
                  <td width="35%" style="border-bottom:1px solid #CBD5E1; color:#003A77; padding:8px 12px;"><strong>Name</strong></td>
                  <td style="border-bottom:1px solid #CBD5E1; font-weight:600; color:#1e293b; padding:8px 12px;">: ${name}</td>
                </tr>
                <tr>
                  <td style="border-bottom:1px solid #CBD5E1; color:#003A77; padding:8px 12px;"><strong>Company</strong></td>
                  <td style="border-bottom:1px solid #CBD5E1; color:#1e293b; padding:8px 12px;">: ${company}</td>
                </tr>
                <tr>
                  <td style="border-bottom:1px solid #CBD5E1; color:#003A77; padding:8px 12px;"><strong>Job Title</strong></td>
                  <td style="border-bottom:1px solid #CBD5E1; color:#1e293b; padding:8px 12px;">: ${jobTitle}</td>
                </tr>
                <tr>
                  <td style="border-bottom:1px solid #CBD5E1; color:#003A77; padding:8px 12px;"><strong>Phone Number</strong></td>
                  <td style="border-bottom:1px solid #CBD5E1; color:#1e293b; padding:8px 12px;">: ${phone}</td>
                </tr>
                <tr>
                  <td style="border-bottom:1px solid #CBD5E1; color:#003A77; padding:8px 12px;"><strong>Email</strong></td>
                  <td style="border-bottom:1px solid #CBD5E1; color:#1e293b; padding:8px 12px;">: ${email}</td>
                </tr>
                <tr>
                  <td style="color:#003A77; padding:8px 12px;"><strong>Address</strong></td>
                  <td style="color:#1e293b; padding:8px 12px;">: ${address}</td>
                </tr>
              </table>

              <p style="font-size:14px; color:#555; margin:20px 0 0 0; line-height:1.5;">
                If you have any questions, feel free to contact us at <a href="mailto:pad@maxxmedia.in" style="color:#003A77; text-decoration:none; font-weight:bold;">pad@maxxmedia.in</a>.
              </p>

              <p style="font-size:15px; margin:20px 0 0 0; line-height:1.5; color:#1e293b;">
                Best regards,<br/>
                <strong style="color:#003A77;">IndiaMET 2027 Awards Team</strong>
              </p>
            </td>
          </tr>

          <!-- FOOTER: DATE & VENUE -->
          <tr>
            <td style="background:#003A77; color:#ffffff; padding:15px; text-align:center; font-size:14px;">
              <strong>13-15 May 2027</strong> • Auto Cluster Exhibition Centre, Pune, India
            </td>
          </tr>

          <!-- FOOTER: ORGANIZER (LEFT LOGO, RIGHT END ADDRESS) -->
          <tr>
            <td style="background:#E6EEF7; padding:20px; font-size:12px; color:#333;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="38%" align="left" valign="middle">
                    <span style="font-size:11px; color:#666; font-weight:bold; text-transform:uppercase; display:block; margin-bottom:6px;">Organized By:</span>
                    <img 
                      src="https://res.cloudinary.com/deo4vpw8f/image/upload/v1774687173/maxxlogo_lulkwh.png"
                      style="max-width:140px; display:block;"
                      alt="Maxx Business Media Logo"
                    />
                  </td>
                  <td width="62%" align="right" valign="middle" style="font-size:12px; color:#333; line-height:1.6; text-align:right;">
                    <strong>Maxx Business Media Pvt Ltd</strong><br/>
                    T9, Swastik Manandi Arcade, Bengaluru, India<br/>
                    Tel: +91 91483 19993 | pad@maxxmedia.in | www.indiametexpo.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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
      subject: 'Award Nomination Confirmed - IndiaMET 2027',
      html,
      text: [
        'Dear ' + data.contactPerson + ',',
        '',
        'Thank you for your interest in submitting your nomination for IndiaMET 2027 – Dedicated Industrial Metrology Exhibition & Summit.',
        '',
        'Name: ' + data.contactPerson,
        'Company: ' + data.nominatorName,
        'Job Title: ' + data.designation,
        'Phone Number: ' + data.mobile,
        'Email: ' + data.email,
        'Address: ' + address,
        '',
        'If you have any questions, feel free to contact us at pad@maxxmedia.in.',
        '',
        'Best regards,',
        'IndiaMET 2027 Awards Team',
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
