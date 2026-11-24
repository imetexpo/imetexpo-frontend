type ContactSubmissionResponse = {
  success?: boolean;
  message?: string;
  submissionId?: string;
};

export async function queueContactSubmission(payload: Record<string, unknown>): Promise<void> {
  let response: Response;
  try {
    response = await fetch('/api/contact-submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('We could not submit your details. Please check your connection and try again.');
  }

  const result: ContactSubmissionResponse | null = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true) {
    throw new Error(result?.message || 'We could not submit your details. Please try again.');
  }
}
