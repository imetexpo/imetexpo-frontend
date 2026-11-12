import axios from 'axios';

const RAW_API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/+$/, '');
const API_BASE_URL = RAW_API_URL.endsWith('/api') ? RAW_API_URL : `${RAW_API_URL}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
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

export type BadgeDesignId = 'design1' | 'design2';
export type BadgeDesign = { id: BadgeDesignId; name: string; description: string };
export type BadgeDesignSettings = {
  success: true;
  design: BadgeDesignId;
  designs: BadgeDesign[];
  updatedAt: string | null;
};

export async function fetchBadgeDesignSettings() {
  const { data } = await api.get<BadgeDesignSettings>('/passes/badge-design');
  return data;
}

export async function saveBadgeDesign(design: BadgeDesignId) {
  const { data } = await api.put<BadgeDesignSettings>('/passes/badge-design', { design });
  return data;
}

export async function fetchBadgeDesignPreview(design: BadgeDesignId) {
  const { data } = await api.get<Blob>(`/passes/badge-designs/${design}/preview`, { responseType: 'blob' });
  return data;
}

