import axios from 'axios';

const RAW_API = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://localhost:5000/api'
).replace(/\/+$/, '');
const API_BASE = RAW_API.endsWith('/api') ? RAW_API : `${RAW_API}/api`;

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
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export type PassRegistration = {
  id: string;
  registrationNumber: string;
  publicCode: string;
  name: string;
  company: string;
  designation: string | null;
  phone: string;
  email: string | null;
  area: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pinCode: string | null;
  source: string | null;
  interests: string[];
  channel: string;
  status: string;
  verifiedAt: string | null;
  issuedAt: string | null;
  sentAt: string | null;
  sentVia: string | null;
  sentStatus: string | null;
  checkedInAt: string | null;
  createdAt: string;
  updatedAt: string;
  passUrl: string;
  badgeUrl: string;
  badgeDesign: string;
  cmsSync: {
    status: string;
    leadId: string | null;
    syncedAt: string | null;
    attempts: number;
    lastError: string | null;
    nextAttemptAt: string | null;
  };
};

export type PassRegistrationList = {
  success: true;
  registrations: PassRegistration[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  cmsConfigured: boolean;
};

export async function fetchPassRegistrations(
  params: { page: number; limit: number; search: string; status: string },
  signal?: AbortSignal
) {
  const { data } = await api.get<PassRegistrationList>('/passes/admin/registrations', { params, signal });
  return data;
}
