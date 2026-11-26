import axios from 'axios';

const RAW_API = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://localhost:5000/api'
).replace(/\/+$/, '');
const API_BASE = RAW_API.endsWith('/api') ? RAW_API : RAW_API + '/api';

export function getDelegatePassViewUrl(publicCode: string) {
  return '/passes/view/' + encodeURIComponent(publicCode);
}

export function getDelegatePassBadgeUrl(publicCode: string) {
  return API_BASE + '/passes/' + encodeURIComponent(publicCode) + '/badge';
}

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token =
      localStorage.getItem('adminToken') ||
      localStorage.getItem('admin_token') ||
      localStorage.getItem('token');
    if (token) config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

export type DelegatePass = {
  id: string;
  registrationNumber: string;
  publicCode: string;
  name: string;
  company: string;
  designation: string | null;
  phone: string;
  email: string | null;
  package: string | null;
  packageAmount: number | null;
  city: string | null;
  state: string | null;
  country: string | null;
  status: string;
  issuedAt: string | null;
  checkedInAt: string | null;
  createdAt: string;
  passUrl: string;
  badgeUrl: string;
};

export type DelegatePassList = {
  success: true;
  registrations: DelegatePass[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export async function fetchDelegatePasses(
  params: { page: number; limit: number; search: string; status: string },
  signal?: AbortSignal
) {
  const { data } = await api.get<DelegatePassList>('/passes/admin/delegate-registrations', {
    params,
    signal,
  });
  return data;
}