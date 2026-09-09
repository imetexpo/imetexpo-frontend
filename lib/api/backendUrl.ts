const DEFAULT_BACKEND_URL = 'http://localhost:5000';

export function getBackendUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    DEFAULT_BACKEND_URL;

  return url.replace(/\/$/, '').replace(/\/api$/, '');
}
