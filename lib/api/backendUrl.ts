const DEFAULT_BACKEND_URL = 'http://localhost:5000';

export function getBackendUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    DEFAULT_BACKEND_URL;

  return url.replace(/\/$/, '').replace(/\/api$/, '');
}

export function getContactApiUrl(): string {
  const raw = (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    'http://localhost:5000/api'
  ).replace(/\/+$/, '');
  return raw.endsWith('/api') ? `${raw}/contact` : `${raw}/api/contact`;
}
