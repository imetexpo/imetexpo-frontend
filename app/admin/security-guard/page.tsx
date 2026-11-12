"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Edit,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Info,
  Clock,
  Shield,
  Users,
  Calendar,
} from "lucide-react";
import {
  getSecurityGuardConfig,
  updateSecurityGuardConfig,
  resetSecurityGuardConfig,
  validateSecurityGuardRate,
  SecurityGuardConfig,
} from "@/lib/api/securityGuard";

export default function SecurityGuardAdminPage() {
  const [config, setConfig] = useState<SecurityGuardConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rateInput, setRateInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSecurityGuardConfig();
      setConfig(data);
      setRateInput(data.ratePerGuardPerDay.toString());
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to load security guard configuration");
      console.error("Error fetching config:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const rate = parseFloat(rateInput);
    const validation = validateSecurityGuardRate(rate);

    if (!validation.valid) {
      setError(validation.message || "Invalid rate");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      const updated = await updateSecurityGuardConfig(rate);
      setConfig(updated);
      setRateInput(updated.ratePerGuardPerDay.toString());
      setIsEditing(false);
      setSuccess("Security guard rate updated successfully");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to update rate");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Are you sure you want to reset the security guard rate to default (₹2,000)?")) {
      return;
    }

    try {
      setResetting(true);
      setError(null);
      const reset = await resetSecurityGuardConfig();
      setConfig(reset);
      setRateInput(reset.ratePerGuardPerDay.toString());
      setIsEditing(false);
      setSuccess("Security guard rate reset to default (₹2,000)");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to reset rate");
    } finally {
      setResetting(false);
    }
  };

  const handleCancel = () => {
    if (config) {
      setRateInput(config.ratePerGuardPerDay.toString());
    }
    setIsEditing(false);
    setError(null);
  };

  const parsedPreviewRate = !isNaN(parseFloat(rateInput)) && parseFloat(rateInput) >= 0 ? parseFloat(rateInput) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#003A77] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-600 font-medium mt-4">Loading security guard configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#003A77]/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#003A77]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#003A77]">Security Guard Configuration</h1>
                  <p className="text-sm text-slate-600 mt-1">
                    Configure daily rate per security guard for exhibitor booth protection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <p className="text-sm font-medium text-emerald-800">{success}</p>
            </div>
            <button onClick={() => setSuccess(null)} className="text-emerald-600 hover:text-emerald-800 text-sm">
              ✕
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800 text-sm">
              ✕
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Current Rate</p>
                <p className="text-3xl font-bold text-[#003A77] mt-1 flex items-center gap-1">
                  <IndianRupee className="w-6 h-6" />
                  {config?.ratePerGuardPerDay?.toLocaleString("en-IN") || "2,000"}
                </p>
                <p className="text-xs text-slate-500 mt-1">per guard / day</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#003A77]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#003A77]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Daily Cost (2 Guards)</p>
                <p className="text-3xl font-bold text-[#00A1B1] mt-1 flex items-center gap-1">
                  <IndianRupee className="w-6 h-6" />
                  {((config?.ratePerGuardPerDay || 2000) * 2).toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-slate-500 mt-1">for 1 day</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#00A1B1]/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#00A1B1]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">3 Days Cost (2 Guards)</p>
                <p className="text-3xl font-bold text-slate-800 mt-1 flex items-center gap-1">
                  <IndianRupee className="w-6 h-6" />
                  {((config?.ratePerGuardPerDay || 2000) * 2 * 3).toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-slate-500 mt-1">total for 3-day event</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Configuration Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gradient-to-r from-[#003A77]/5 to-transparent border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#003A77]" />
                <h2 className="text-lg font-bold text-[#003A77]">Daily Rate Configuration</h2>
              </div>
              {config?.updatedAt && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  Last updated: {new Date(config.updatedAt).toLocaleString()}
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            {!isEditing ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Rate per Guard per Day</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-[#003A77] flex items-center">
                      <IndianRupee className="w-7 h-7" />
                      {config?.ratePerGuardPerDay?.toLocaleString("en-IN") || "2,000"}
                    </span>
                    <span className="text-sm text-slate-500">/ guard / day</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    This rate applies to all exhibitors requesting security guards for their booths.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#003A77] text-white rounded-lg text-sm font-medium hover:bg-[#002957] transition-all cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Rate
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={resetting}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <RotateCcw className={`w-4 h-4 ${resetting ? "animate-spin" : ""}`} />
                    Reset to Default
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Rate per Guard per Day (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative max-w-xs">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={rateInput}
                      onChange={(e) => setRateInput(e.target.value)}
                      className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003A77]/20 focus:border-[#003A77] text-lg font-semibold text-slate-900"
                      placeholder="2000"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">Minimum rate: ₹0 (free)</p>
                </div>

                {/* Preview Calculation */}
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-xs font-medium text-slate-600 mb-2">Preview Calculations</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-slate-500">1 guard/day:</span>
                      <p className="font-bold text-slate-900">₹{parsedPreviewRate.toLocaleString("en-IN")}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">2 guards/day:</span>
                      <p className="font-bold text-slate-900">₹{(parsedPreviewRate * 2).toLocaleString("en-IN")}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">3 days (2 guards):</span>
                      <p className="font-bold text-[#003A77]">₹{(parsedPreviewRate * 6).toLocaleString("en-IN")}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">5 days (2 guards):</span>
                      <p className="font-bold text-[#00A1B1]">₹{(parsedPreviewRate * 10).toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#003A77] text-white rounded-lg text-sm font-medium hover:bg-[#002957] transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReset}
                    disabled={resetting}
                    className="ml-auto inline-flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:text-slate-800 rounded-lg text-sm font-medium transition-all cursor-pointer"
                    title="Reset to default ₹2,000"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00A1B1]/10 flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-[#00A1B1]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#003A77]">About Security Guard Rates</h3>
              <p className="text-xs text-slate-600 mt-1">
                The rate configured here is used to automatically calculate the total security guard cost when
                exhibitors submit extra requirements. Formula:{" "}
                <code className="bg-slate-100 px-1.5 py-0.5 rounded">Total Cost = Quantity × Number of Days × Rate</code>
              </p>
              <p className="text-xs text-slate-500 mt-2">Default rate is ₹2,000 per guard per day.</p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        {config?.createdAt && (
          <div className="mt-6 text-xs text-slate-500 text-center">
            Configuration created: {new Date(config.createdAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}
