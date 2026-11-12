"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Pencil,
  RotateCcw,
  Save,
  Calculator,
  Clock,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Users,
} from "lucide-react";
import {
  getHousekeepingConfig,
  updateHousekeepingConfig,
  resetHousekeepingToDefault,
  getHousekeepingRateHistory,
  getHousekeepingStatistics,
  HousekeepingConfig,
  HousekeepingHistoryItem,
  HousekeepingStats,
} from "@/lib/api/housekeeping";

interface CalculationResult {
  chargesPerShift: number;
  shiftHours: number;
  numberOfShifts?: number;
  numberOfStaff?: number;
  hours?: number;
  hourlyRate?: number;
  totalCost: number;
}

export default function AdminHousekeepingPage() {
  const [config, setConfig] = useState<HousekeepingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [formValue, setFormValue] = useState("2000");
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HousekeepingHistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const [stats, setStats] = useState<HousekeepingStats | null>(null);
  const [showStats, setShowStats] = useState(false);

  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorInput, setCalculatorInput] = useState({ shifts: "1", hours: "10", staff: "1" });
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  const loadConfig = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getHousekeepingConfig();
      const data = res?.data || res;
      const rate = data?.ratePerShift ?? data?.chargesPerShift;
      if (data && rate !== undefined) {
        setConfig({ ...data, ratePerShift: rate });
        setFormValue(rate.toString());
      } else {
        setError("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Failed to load housekeeping configuration:", err);
      setError(err.response?.data?.message || err.message || "Failed to load housekeeping configuration");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const showToastSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleSave = async () => {
    const costValue = parseInt(formValue, 10);
    if (isNaN(costValue) || costValue < 0) {
      setError("Please enter a valid positive number");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      const res = await updateHousekeepingConfig({ ratePerShift: costValue });
      const updated = res?.data || res;
      const rate = updated?.ratePerShift ?? updated?.chargesPerShift;
      if (updated && rate !== undefined) {
        setConfig({ ...updated, ratePerShift: rate });
        setFormValue(rate.toString());
      }
      setEditing(false);
      showToastSuccess("Housekeeping rate updated successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to update rate");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Are you sure you want to reset to default rate (₹2,000 per shift)?")) return;

    try {
      setSubmitting(true);
      setError("");
      const res = await resetHousekeepingToDefault();
      const resetData = res?.data || res;
      const rate = resetData?.ratePerShift ?? resetData?.chargesPerShift;
      if (resetData && rate !== undefined) {
        setConfig({ ...resetData, ratePerShift: rate });
        setFormValue(rate.toString());
      }
      setEditing(false);
      showToastSuccess("Rate reset to default successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to reset rate");
    } finally {
      setSubmitting(false);
    }
  };

  const loadHistory = async () => {
    try {
      setLoadingHistory(true);
      const res = await getHousekeepingRateHistory();
      setHistory(res?.data || []);
    } catch (err) {
      console.error("Failed to load history:", err);
      setHistory([
        {
          ratePerShift: config?.ratePerShift || 2000,
          shiftHours: config?.shiftHours || 10,
          updatedAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await getHousekeepingStatistics();
      if (res?.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error("Failed to load statistics:", err);
      const rate = config?.ratePerShift || 2000;
      const hours = config?.shiftHours || 10;
      setStats({
        currentRate: rate,
        shiftHours: hours,
        hourlyRate: Math.round(rate / hours),
        createdAt: config?.createdAt || new Date().toISOString(),
        lastUpdated: config?.updatedAt || new Date().toISOString(),
        totalUpdates: 1,
      });
    }
  };

  const handleCalculate = () => {
    const shifts = parseInt(calculatorInput.shifts, 10);
    if (shifts > 0 && config) {
      setCalculationResult({
        chargesPerShift: config.ratePerShift,
        shiftHours: config.shiftHours,
        numberOfShifts: shifts,
        totalCost: config.ratePerShift * shifts,
      });
    }
  };

  const handleCustomCalculate = () => {
    const hours = parseInt(calculatorInput.hours, 10);
    const staff = parseInt(calculatorInput.staff, 10);
    if (hours > 0 && staff > 0 && config) {
      const hourlyRate = Math.round(config.ratePerShift / (config.shiftHours || 10));
      setCalculationResult({
        chargesPerShift: config.ratePerShift,
        shiftHours: config.shiftHours,
        numberOfStaff: staff,
        hours,
        hourlyRate,
        totalCost: hourlyRate * hours * staff,
      });
    }
  };

  const toggleHistory = () => {
    if (!showHistory) loadHistory();
    setShowHistory(!showHistory);
    setShowStats(false);
    setShowCalculator(false);
  };

  const toggleStats = () => {
    if (!showStats) loadStats();
    setShowStats(!showStats);
    setShowHistory(false);
    setShowCalculator(false);
  };

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
    setShowHistory(false);
    setShowStats(false);
    if (!showCalculator) setCalculationResult(null);
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  const currentRate = config?.ratePerShift || 0;
  const shiftHours = config?.shiftHours || 10;
  const hourlyRate = Math.round(currentRate / shiftHours);
  const previewRate = parseInt(formValue, 10) || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#003A77] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-600 font-medium mt-4">Loading housekeeping configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#003A77]/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#003A77]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#003A77]">Housekeeping Staff</h1>
              <p className="text-sm text-slate-600 mt-0.5">Manage housekeeping staff rates and shifts</p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <p className="text-sm font-medium text-emerald-800">{successMessage}</p>
            </div>
            <button onClick={() => setSuccessMessage("")} className="text-emerald-600 hover:text-emerald-800 text-sm">
              ✕
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
            <button onClick={() => setError("")} className="text-red-600 hover:text-red-800 text-sm">
              ✕
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Rate per Shift</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#003A77] mt-1">{formatCurrency(currentRate)}</p>
                <p className="text-xs text-slate-500 mt-1">{shiftHours} hour shift</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#003A77]/10 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-[#003A77]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Hourly Rate</p>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1">{formatCurrency(hourlyRate)}</p>
                <p className="text-xs text-slate-500 mt-1">per hour per staff</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Daily Cost (2 staff)</p>
                <p className="text-2xl sm:text-3xl font-bold text-[#00A1B1] mt-1">{formatCurrency(currentRate * 2)}</p>
                <p className="text-xs text-slate-500 mt-1">for 2 staff, 1 shift</p>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#00A1B1]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#00A1B1]" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Configuration Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-[#003A77]/10 rounded-lg">
              <Sparkles className="h-5 w-5 text-[#003A77]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#003A77]">Housekeeping Rate</h2>
              <p className="text-sm text-slate-500">Charges per shift ({shiftHours} hours)</p>
            </div>
          </div>

          {!editing ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-lg gap-4">
                <div>
                  <span className="text-xs text-slate-600 block mb-1">Current Rate</span>
                  <span className="text-3xl sm:text-4xl font-bold text-[#003A77]">{formatCurrency(currentRate)}</span>
                  <span className="text-sm text-slate-500 ml-2">per shift</span>
                  <p className="text-xs text-slate-500 mt-1">Hourly rate: {formatCurrency(hourlyRate)}/hour</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleReset}
                    disabled={submitting}
                    className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    title="Reset to default"
                  >
                    <RotateCcw className={`h-5 w-5 ${submitting ? "animate-spin" : ""}`} />
                  </button>
                  <button
                    onClick={() => setEditing(true)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002957] transition-colors text-sm font-medium cursor-pointer"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Rate
                  </button>
                </div>
              </div>

              {config?.updatedAt && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-slate-200 gap-3">
                  <div className="text-xs text-slate-500">
                    Last updated: {new Date(config.updatedAt).toLocaleString()}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={toggleCalculator}
                      className="text-sm text-[#003A77] hover:text-[#00A1B1] flex items-center gap-1.5 font-medium cursor-pointer"
                    >
                      <Calculator className="h-4 w-4" />
                      {showCalculator ? "Hide Calculator" : "Calculator"}
                    </button>
                    <button
                      onClick={toggleHistory}
                      className="text-sm text-[#003A77] hover:text-[#00A1B1] flex items-center gap-1.5 font-medium cursor-pointer"
                    >
                      <Clock className="h-4 w-4" />
                      {showHistory ? "Hide History" : "View History"}
                    </button>
                    <button
                      onClick={toggleStats}
                      className="text-sm text-[#003A77] hover:text-[#00A1B1] flex items-center gap-1.5 font-medium cursor-pointer"
                    >
                      <BarChart3 className="h-4 w-4" />
                      {showStats ? "Hide Stats" : "View Stats"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-lg">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Charges per Shift (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
                  <input
                    type="number"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg pl-8 pr-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-[#003A77]/20 focus:border-[#003A77]"
                    min="0"
                    step="100"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">Default rate: ₹2,000 per shift</p>
              </div>

              {/* Preview Calculations */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-[#003A77]/5 rounded-lg border border-[#003A77]/10">
                <div>
                  <p className="text-xs text-[#003A77] mb-1">1 Shift</p>
                  <p className="text-base font-semibold text-[#003A77]">{formatCurrency(previewRate)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#003A77] mb-1">2 Shifts</p>
                  <p className="text-base font-semibold text-[#003A77]">{formatCurrency(previewRate * 2)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#003A77] mb-1">3 Shifts</p>
                  <p className="text-base font-semibold text-[#003A77]">{formatCurrency(previewRate * 3)}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSave}
                  disabled={submitting}
                  className="inline-flex items-center justify-center px-4 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002957] transition-colors disabled:opacity-50 text-sm font-medium cursor-pointer"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setFormValue(config?.ratePerShift?.toString() || "2000");
                  }}
                  disabled={submitting}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 text-sm font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  disabled={submitting}
                  className="sm:ml-auto inline-flex items-center justify-center px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 text-sm font-medium cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Calculator Section */}
        {showCalculator && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#003A77] mb-4 flex items-center gap-2">
              <Calculator className="h-5 w-5 text-[#00A1B1]" />
              Cost Calculator
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Number of Shifts</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={calculatorInput.shifts}
                    onChange={(e) => setCalculatorInput({ ...calculatorInput, shifts: e.target.value })}
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003A77]"
                    min="1"
                  />
                  <button
                    onClick={handleCalculate}
                    className="px-4 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002957] transition-colors text-sm font-medium cursor-pointer"
                  >
                    Calculate
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Custom Hours</label>
                <div className="flex flex-wrap gap-2 items-center">
                  <input
                    type="number"
                    value={calculatorInput.hours}
                    onChange={(e) => setCalculatorInput({ ...calculatorInput, hours: e.target.value })}
                    className="w-20 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003A77]"
                    min="1"
                  />
                  <span className="text-sm text-slate-500">hours</span>
                  <input
                    type="number"
                    value={calculatorInput.staff}
                    onChange={(e) => setCalculatorInput({ ...calculatorInput, staff: e.target.value })}
                    className="w-20 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003A77]"
                    min="1"
                  />
                  <span className="text-sm text-slate-500">staff</span>
                  <button
                    onClick={handleCustomCalculate}
                    className="px-4 py-2 bg-[#00A1B1] text-white rounded-lg hover:bg-[#008996] transition-colors text-sm font-medium cursor-pointer"
                  >
                    Go
                  </button>
                </div>
              </div>
            </div>

            {calculationResult && (
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-2 text-sm">Calculation Result:</h4>
                {calculationResult.numberOfShifts ? (
                  <div>
                    <p className="text-sm text-slate-600">
                      {calculationResult.numberOfShifts} shift(s) × {formatCurrency(calculationResult.chargesPerShift)}
                    </p>
                    <p className="text-xl font-bold text-[#003A77] mt-2">
                      Total: {formatCurrency(calculationResult.totalCost)}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-slate-600">
                      {calculationResult.hours} hours × {calculationResult.numberOfStaff} staff
                    </p>
                    <p className="text-sm text-slate-600">
                      Hourly rate: {formatCurrency(calculationResult.hourlyRate || 0)} × {calculationResult.hours} hours
                      × {calculationResult.numberOfStaff} staff
                    </p>
                    <p className="text-xl font-bold text-[#00A1B1] mt-2">
                      Total: {formatCurrency(calculationResult.totalCost)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* History Section */}
        {showHistory && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#003A77] mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#00A1B1]" />
              Rate Change History
            </h3>

            {loadingHistory ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-7 w-7 border-2 border-slate-200 border-t-[#003A77]" />
              </div>
            ) : history.length > 0 ? (
              <div className="space-y-2">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 px-2 rounded gap-1"
                  >
                    <div>
                      <span className="font-medium text-[#003A77]">{formatCurrency(item.ratePerShift ?? item.chargesPerShift ?? 0)}</span>
                      <span className="text-xs text-slate-500 ml-2">({item.shiftHours} hrs shift)</span>
                    </div>
                    <span className="text-xs text-slate-500">{new Date(item.updatedAt).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-4 text-sm">No history available</p>
            )}
          </div>
        )}

        {/* Statistics Section */}
        {showStats && stats && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-[#003A77] mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#00A1B1]" />
              Configuration Statistics
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-600 mb-1">Current Rate</p>
                <p className="text-xl font-bold text-[#003A77]">{formatCurrency(stats.currentRate)}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-600 mb-1">Shift Hours</p>
                <p className="text-xl font-bold text-[#00A1B1]">{stats.shiftHours} hrs</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-600 mb-1">Hourly Rate</p>
                <p className="text-xl font-bold text-emerald-600">{formatCurrency(stats.hourlyRate)}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-600 mb-1">Total Updates</p>
                <p className="text-xl font-bold text-slate-800">{stats.totalUpdates || 0}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-600 mb-1">Created</p>
                <p className="text-sm font-medium text-slate-900">
                  {stats.createdAt ? new Date(stats.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-600 mb-1">Last Updated</p>
                <p className="text-sm font-medium text-slate-900">
                  {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Reference Card */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
          <h3 className="text-base font-semibold text-[#003A77] mb-3">Quick Reference</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 mb-1">1 Shift</p>
              <p className="text-lg font-bold text-[#003A77]">{formatCurrency(currentRate)}</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 mb-1">2 Shifts</p>
              <p className="text-lg font-bold text-[#003A77]">{formatCurrency(currentRate * 2)}</p>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <p className="text-xs text-slate-600 mb-1">3 Shifts</p>
              <p className="text-lg font-bold text-[#003A77]">{formatCurrency(currentRate * 3)}</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center">
            Hourly rate: {formatCurrency(hourlyRate)} per hour per staff
          </p>
        </div>
      </div>
    </div>
  );
}
