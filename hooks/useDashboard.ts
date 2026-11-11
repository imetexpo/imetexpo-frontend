// hooks/useDashboard.ts
import { useEffect, useState, useCallback } from 'react';
import { dashboardAPI, DashboardSummary } from '@/lib/api/dashboard';

export function useDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const summaryRes = await dashboardAPI.getSummary();

      if (summaryRes.success && summaryRes.data) {
        setSummary(summaryRes.data);
      } else {
        setError(summaryRes.error || 'Failed to load dashboard data');
      }
    } catch (err: any) {
      console.error('Dashboard fetch error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const refresh = useCallback(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    summary,
    isLoading,
    error,
    refresh,
  };
}

