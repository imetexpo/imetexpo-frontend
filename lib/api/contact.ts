import { getContactApiUrl } from './backendUrl';

type ContactEmailResponse = {
  success?: boolean;
  emailSent?: boolean;
  message?: string;
};

export async function sendContactEmail(
  payload: Record<string, unknown>,
  options: { signal?: AbortSignal } = {},
): Promise<void> {
  const fallbackMessage =
    'We could not confirm your email was sent. Your details may already be saved. Please contact pad@maxxmedia.in for help.';

  let response: Response;
  try {
    response = await fetch(getContactApiUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: options.signal,
    });
  } catch {
    throw new Error(fallbackMessage);
  }

  const result: ContactEmailResponse | null = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true || result.emailSent === false) {
    throw new Error(result?.message || fallbackMessage);
  }
}
