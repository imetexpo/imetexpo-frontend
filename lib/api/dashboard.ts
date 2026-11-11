// lib/api/dashboard.ts
import axios from 'axios';
import { getBackendUrl } from './backendUrl';

const API_BASE_URL = getBackendUrl();

export interface VisitorDay {
  date: string;
  count: number;
}

export interface PageView {
  page: string;
  views: number;
}

export interface VisitorData {
  total: number;
  today: number;
  week: number;
  month?: number;
  source?: string;
  last7Days?: VisitorDay[];
  pages?: PageView[];
  devices?: Array<{ device: string; count: number }>;
  locations?: Array<{ location: string; count: number }>;
}

export interface ExhibitorStatsData {
  total: number;
  active: number;
  pending: number;
  approved: number;
  rejected: number;
  inactive: number;
  newThisWeek: number;
  bySector: Array<{ sector: string; count: number }>;
}

export interface UserStatsData {
  total: number;
  active: number;
  inactive: number;
  admins: number;
  editors: number;
  viewers: number;
  newThisWeek: number;
}

export interface RevenueData {
  totalRevenue: number;
  monthRevenue: number;
  pendingAmount: number;
  invoices?: {
    total: number;
    paid: number;
    pending: number;
  };
}

export interface ArticlesData {
  total: number;
  published: number;
  recent: Array<{
    id: number;
    title: string;
    views: number;
    status: string;
  }>;
}

export interface DashboardSummary {
  users?: UserStatsData;
  exhibitors?: ExhibitorStatsData;
  visitors?: VisitorData;
  revenue?: RevenueData;
  articles?: ArticlesData;
  activities?: Array<{
    id: number;
    action: string;
    user: string;
    time: string;
  }>;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
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

export const dashboardAPI = {
  getSummary: async (): Promise<{ success: boolean; data?: DashboardSummary; error?: string }> => {
    try {
      const response = await api.get('/api/dashboard/summary');
      if (response.data && response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      }
      return {
        success: false,
        error: response.data?.error || 'Failed to load dashboard data',
      };
    } catch (error: any) {
      console.error('Dashboard summary error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to fetch dashboard data',
      };
    }
  },

  getHealth: async () => {
    try {
      const response = await api.get('/api/dashboard/health');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};
