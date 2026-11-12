// app/admin/water-connection/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  PencilIcon,
  XMarkIcon,
  ScaleIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ClockIcon,
  ExclamationCircleIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import LoadingDots from "@/components/ui/LoadingDots";
import {
  getWaterConnectionConfig,
  updateWaterConnectionConfig,
  resetWaterConnectionToDefault,
  getWaterConnectionStatistics,
  getWaterConnectionRateHistory,
  type WaterConnectionConfig,
  type RateHistoryItem,
  type StatisticsData,
} from "@/lib/api/waterConnection";

function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("adminToken") ||
    localStorage.getItem("admin_token") ||
    localStorage.getItem("token")
  );
}

export default function AdminWaterConnectionPage() {
  const router = useRouter();
  const [config, setConfig] = useState<WaterConnectionConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [formValue, setFormValue] = useState("15000");
  const [submitting, setSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<RateHistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [showStats, setShowStats] = useState(false);

  const loadConfig = async () => {
    const token = getAdminToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await getWaterConnectionConfig();
      if (response.success && response.data) {
        setConfig(response.data);
        setFormValue(String(response.data.costPerConnection ?? 15000));
      } else {
        throw new Error(response.message || "Failed to load configuration");
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }
      const msg =
        err?.response?.data?.message || err?.message || "Failed to load water connection config";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const handleSave = async () => {
    const costValue = parseInt(formValue, 10);
    if (isNaN(costValue) || costValue < 0) {
      setError("Please enter a valid positive number");
      toast.error("Please enter a valid positive number");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      const response = await updateWaterConnectionConfig(costValue);
      if (response.success && response.data) {
        setConfig(response.data);
        setFormValue(String(response.data.costPerConnection));
        setEditing(false);
        toast.success("Water connection rate updated successfully");
        if (showHistory) loadHistory();
        if (showStats) loadStats();
      } else {
        throw new Error(response.message || "Update failed");
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/admin/login");
        return;
      }
      const msg = err?.response?.data?.message || err?.message || "Failed to update rate";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Are you sure you want to reset to default rate (₹15,000)?")) return;

    try {
      setSubmitting(true);
      setError("");
      const response = await resetWaterConnectionToDefault();
      if (response.success && response.data) {
        setConfig(response.data);
        setFormValue(String(response.data.costPerConnection));
        setEditing(false);
        toast.success("Rate reset to default successfully");
        if (showHistory) loadHistory();
        if (showStats) loadStats();
      } else {
        throw new Error(response.message || "Reset failed");
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/admin/login");
        return;
      }
      const msg = err?.response?.data?.message || err?.message || "Failed to reset rate";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const loadHistory = async () => {
    try {
      setLoadingHistory(true);
      const response = await getWaterConnectionRateHistory();
      if (response.success) {
        setHistory(response.data || []);
      }
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await getWaterConnectionStatistics();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  const toggleHistory = () => {
    if (!showHistory) loadHistory();
    setShowHistory(!showHistory);
    setShowStats(false);
  };

  const toggleStats = () => {
    if (!showStats) loadStats();
    setShowStats(!showStats);
    setShowHistory(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <LoadingDots tone="brand" className="mx-auto flex" />
          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading water connection configuration...
          </p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <ExclamationCircleIcon className="h-14 w-14 text-rose-500 mx-auto" />
          <p className="mt-4 text-base text-gray-600 font-medium">
            {error || "Failed to load configuration"}
          </p>
          <button
            onClick={loadConfig}
            className="mt-4 px-4 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002855] text-sm cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Water Connection Management</h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
          Configure and manage water connection pricing for exhibitions
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-center text-rose-800">
          <ExclamationCircleIcon className="h-5 w-5 mr-2 text-rose-600 shrink-0" />
          <span className="flex-1 text-sm">{error}</span>
          <button
            onClick={() => setError("")}
            className="ml-4 text-rose-600 hover:text-rose-800 cursor-pointer"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Stats Cards (Diemex 4 cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-3.5 sm:p-4 border border-sky-200">
          <p className="text-xs text-[#003A77] font-medium mb-1">Current Rate</p>
          <p className="text-lg sm:text-xl font-bold text-[#003A77]">
            {formatCurrency(config.costPerConnection)}
          </p>
          <p className="text-xs text-[#005999] mt-1">per connection</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-3.5 sm:p-4 border border-emerald-200">
          <p className="text-xs text-emerald-700 font-medium mb-1">2 Connections</p>
          <p className="text-lg sm:text-xl font-bold text-emerald-700">
            {formatCurrency(config.costPerConnection * 2)}
          </p>
          <p className="text-xs text-emerald-600 mt-1">small booth</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3.5 sm:p-4 border border-purple-200">
          <p className="text-xs text-purple-700 font-medium mb-1">5 Connections</p>
          <p className="text-lg sm:text-xl font-bold text-purple-700">
            {formatCurrency(config.costPerConnection * 5)}
          </p>
          <p className="text-xs text-purple-600 mt-1">medium booth</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3.5 sm:p-4 border border-orange-200">
          <p className="text-xs text-orange-700 font-medium mb-1">10 Connections</p>
          <p className="text-lg sm:text-xl font-bold text-orange-700">
            {formatCurrency(config.costPerConnection * 10)}
          </p>
          <p className="text-xs text-orange-600 mt-1">large booth</p>
        </div>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
          <div className="p-3 bg-sky-50 border border-sky-100 rounded-full">
            <BeakerIcon className="h-6 w-6 text-[#00A1B1]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Water Connection Rate</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Set the cost per water connection for exhibitors
            </p>
          </div>
        </div>

        {!editing ? (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-gray-50 rounded-xl gap-3">
              <div>
                <span className="text-xs text-gray-600 block mb-1">Current Rate</span>
                <div className="flex items-baseline">
                  <span className="text-3xl sm:text-4xl font-bold text-[#003A77]">
                    {formatCurrency(config.costPerConnection)}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 ml-2">per connection</span>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleReset}
                  disabled={submitting}
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                  title="Reset to default"
                >
                  <ArrowPathIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setEditing(true)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002855] transition-colors text-sm font-medium cursor-pointer"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Rate
                </button>
              </div>
            </div>

            {config.updatedAt && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-100 gap-3">
                <div className="flex items-center text-xs text-gray-500">
                  <ClockIcon className="h-3.5 w-3.5 mr-1" />
                  Last updated: {new Date(config.updatedAt).toLocaleString("en-IN")}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={toggleHistory}
                    className="text-xs sm:text-sm text-[#003A77] hover:text-[#00A1B1] flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <ClockIcon className="h-4 w-4" />
                    {showHistory ? "Hide History" : "View History"}
                  </button>
                  <button
                    onClick={toggleStats}
                    className="text-xs sm:text-sm text-[#003A77] hover:text-[#00A1B1] flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <ChartBarIcon className="h-4 w-4" />
                    {showStats ? "Hide Stats" : "View Stats"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            <div className="p-4 sm:p-5 bg-gray-50 rounded-xl">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cost per Connection (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 text-sm">₹</span>
                <input
                  type="number"
                  value={formValue}
                  onChange={(e) => setFormValue(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg pl-7 pr-4 py-2 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] bg-white"
                  min="0"
                  step="100"
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Default rate: ₹15,000 per connection</p>
            </div>

            {/* Preview Calculations */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-sky-50 rounded-xl text-center border border-sky-100">
                <p className="text-xs text-[#003A77] mb-1">1 Connection</p>
                <p className="text-sm sm:text-base font-bold text-[#003A77]">
                  {formatCurrency(parseInt(formValue, 10) || 0)}
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-emerald-50 rounded-xl text-center border border-emerald-100">
                <p className="text-xs text-emerald-700 mb-1">5 Connections</p>
                <p className="text-sm sm:text-base font-bold text-emerald-700">
                  {formatCurrency((parseInt(formValue, 10) || 0) * 5)}
                </p>
              </div>
              <div className="p-3 sm:p-4 bg-purple-50 rounded-xl text-center border border-purple-100">
                <p className="text-xs text-purple-700 mb-1">10 Connections</p>
                <p className="text-sm sm:text-base font-bold text-purple-700">
                  {formatCurrency((parseInt(formValue, 10) || 0) * 10)}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={handleSave}
                disabled={submitting}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 text-sm font-medium cursor-pointer"
              >
                <ScaleIcon className="h-4 w-4 mr-2" />
                {submitting ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setFormValue(String(config.costPerConnection));
                }}
                disabled={submitting}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                disabled={submitting}
                className="px-3.5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm cursor-pointer"
                title="Reset to default"
              >
                <ArrowPathIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* History Section */}
      {showHistory && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ClockIcon className="h-5 w-5 text-[#00A1B1]" />
            Rate Change History
          </h3>

          {loadingHistory ? (
            <div className="flex justify-center py-8">
              <LoadingDots tone="brand" />
            </div>
          ) : history.length > 0 ? (
            <div className="space-y-2">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 px-4 bg-gray-50 rounded-xl gap-1"
                >
                  <span className="text-base font-semibold text-[#003A77]">
                    {formatCurrency(item.costPerConnection)}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(item.updatedAt).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4 text-sm">No history available</p>
          )}
        </div>
      )}

      {/* Statistics Section */}
      {showStats && stats && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ChartBarIcon className="h-5 w-5 text-[#00A1B1]" />
            Configuration Statistics
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3.5 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Current Rate</p>
              <p className="text-base font-bold text-[#003A77]">
                {formatCurrency(stats.currentRate)}
              </p>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Total Updates</p>
              <p className="text-base font-bold text-purple-600">{stats.totalUpdates || 0}</p>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Created</p>
              <p className="text-xs font-medium text-gray-900">
                {stats.createdAt ? new Date(stats.createdAt).toLocaleDateString("en-IN") : "N/A"}
              </p>
            </div>
            <div className="p-3.5 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">Last Updated</p>
              <p className="text-xs font-medium text-gray-900">
                {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString("en-IN") : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Information Card */}
      <div className="bg-sky-50/80 rounded-xl p-4 sm:p-5 border border-sky-200">
        <h3 className="text-sm font-semibold text-[#003A77] mb-2">About Water Connections</h3>
        <ul className="text-xs text-slate-700 space-y-1.5">
          <li className="flex items-start gap-2">
            <span className="text-[#00A1B1] font-bold">•</span>
            Each water connection includes supply line and basic fitting
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00A1B1] font-bold">•</span>
            Rate is per connection for the entire exhibition duration
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00A1B1] font-bold">•</span>
            Multiple connections can be booked for larger booths
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00A1B1] font-bold">•</span>
            Default rate is ₹15,000 per connection
          </li>
        </ul>
      </div>
    </div>
  );
}
