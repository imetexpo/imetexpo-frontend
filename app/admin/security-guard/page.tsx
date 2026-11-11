// app/admin/security-guard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Save, Pencil, Shield, RefreshCw, AlertCircle, History, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";
import {
    getSecurityGuardConfig,
    updateSecurityGuardConfig,
    resetSecurityGuardConfig,
    validateSecurityGuardRate,
    getSecurityGuardRateHistory,
    type SecurityGuardConfig
} from "@/lib/api/securityGuard";
import LoadingDots from '@/components/ui/LoadingDots';

export default function AdminSecurityGuardPage() {
    const [rate, setRate] = useState(2500);
    const [editing, setEditing] = useState(false);
    const [tempRate, setTempRate] = useState("2500");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [resetting, setResetting] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [rateHistory, setRateHistory] = useState<any[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [historyError, setHistoryError] = useState(false);

    useEffect(() => {
        fetchConfig();
        fetchRateHistory();
    }, []);

    const fetchConfig = async () => {
        try {
            setLoading(true);
            const config = await getSecurityGuardConfig();
            setRate(config.ratePerGuardPerDay);
            setTempRate(config.ratePerGuardPerDay.toString());
        } catch (error: any) {
            console.error('Failed to fetch config:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to load configuration');
        } finally {
            setLoading(false);
        }
    };

    const fetchRateHistory = async () => {
        try {
            setHistoryError(false);
            const history = await getSecurityGuardRateHistory();
            setRateHistory(Array.isArray(history) ? history : []);
        } catch (error) {
            console.warn('Rate history not available:', error);
            setHistoryError(true);
            setRateHistory([]);
        }
    };

    const handleRateChange = (value: string) => {
        setTempRate(value);
        const numericRate = parseFloat(value);
        const validation = validateSecurityGuardRate(numericRate);
        setValidationError(validation.valid ? null : validation.message || null);
    };

    const handleSave = async () => {
        const numericRate = parseFloat(tempRate);
        const validation = validateSecurityGuardRate(numericRate);

        if (!validation.valid) {
            setValidationError(validation.message || 'Invalid rate');
            toast.error(validation.message || 'Invalid rate');
            return;
        }

        try {
            setUpdating(true);
            const updated = await updateSecurityGuardConfig(numericRate);
            setRate(updated.ratePerGuardPerDay);
            setEditing(false);
            setValidationError(null);
            toast.success('Security guard rate updated successfully');
            fetchRateHistory();
        } catch (error: any) {
            console.error('Update error:', error);
            toast.error(error.response?.data?.message || 'Failed to update rate');
        } finally {
            setUpdating(false);
        }
    };

    const handleReset = async () => {
        if (!confirm('Are you sure you want to reset to the default rate (₹2,500)?')) {
            return;
        }

        try {
            setResetting(true);
            const reset = await resetSecurityGuardConfig();
            setRate(reset.ratePerGuardPerDay);
            setTempRate(reset.ratePerGuardPerDay.toString());
            setEditing(false);
            setValidationError(null);
            toast.success('Rate reset to default');
            fetchRateHistory();
        } catch (error: any) {
            console.error('Reset error:', error);
            toast.error(error.response?.data?.message || 'Failed to reset rate');
        } finally {
            setResetting(false);
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Invalid date';
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl border border-gray-200/80 p-12 flex items-center justify-center min-h-[300px]">
                <LoadingDots tone="dark" className="mx-auto flex" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="h-11 w-11 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center">
                    <Shield className="h-5 w-5 text-[#00A1B1]" />
                </div>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Security Guard Configuration</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Set rate per security guard per day</p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Current Rate</p>
                            <p className="text-2xl font-bold text-[#003A77] mt-1">{formatCurrency(rate)}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">per guard per day</p>
                        </div>
                        <Shield className="h-8 w-8 text-teal-600/30" />
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Rate History</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{rateHistory.length}</p>
                            <p className="text-[11px] text-gray-400 mt-0.5">total updates</p>
                        </div>
                        <History className="h-8 w-8 text-blue-600/30" />
                    </div>
                </div>
            </div>

            {/* Main Configuration Card */}
            <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs">
                {!editing ? (
                    <div className="text-center py-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 border border-teal-100 rounded-full mb-3">
                            <Shield className="h-8 w-8 text-[#00A1B1]" />
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Current Rate per Security Guard</p>
                        <p className="text-4xl font-extrabold text-[#003A77]">{formatCurrency(rate)}</p>
                        <p className="text-xs text-gray-500 mt-1">per guard per day</p>

                        <div className="flex gap-3 justify-center mt-6">
                            <button
                                onClick={() => { setEditing(true); setTempRate(rate.toString()); setValidationError(null); }}
                                className="px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg shadow-xs flex items-center gap-1.5 transition"
                                disabled={updating}
                            >
                                <Pencil size={15} /> Edit Rate
                            </button>

                            <button
                                onClick={handleReset}
                                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium rounded-lg flex items-center gap-1.5 transition"
                                disabled={resetting}
                            >
                                {resetting ? (
                                    <LoadingDots size="sm" tone="dark" />
                                ) : (
                                    <RefreshCw size={15} />
                                )}
                                Reset to Default
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Rate per Guard per Day (₹) <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                <input
                                    type="number"
                                    value={tempRate}
                                    onChange={(e) => handleRateChange(e.target.value)}
                                    className={`w-full pl-7 pr-3.5 py-2 bg-white border rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1] transition ${
                                        validationError ? 'border-rose-400' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter rate in INR"
                                    min="0"
                                    step="100"
                                />
                            </div>
                            {validationError && (
                                <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                                    <AlertCircle size={12} />
                                    {validationError}
                                </p>
                            )}
                            <p className="text-[11px] text-gray-400 mt-1">
                                Recommended range: ₹500 - ₹10,000 per day
                            </p>
                        </div>

                        <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                            <button
                                onClick={() => setEditing(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                disabled={updating}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg flex items-center gap-1.5 hover:bg-emerald-700 disabled:opacity-50 transition shadow-xs"
                                disabled={updating || !!validationError}
                            >
                                {updating ? (
                                    <>
                                        <LoadingDots size="sm" tone="light" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={15} />
                                        Save
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Rate History Section */}
            <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs">
                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50/70 transition"
                >
                    <div className="flex items-center gap-2">
                        <History className="h-5 w-5 text-[#00A1B1]" />
                        <h3 className="text-sm font-semibold text-gray-900">Rate History</h3>
                        <span className="text-xs text-gray-500">Last updates</span>
                    </div>
                    <RefreshCw size={15} className={`text-gray-400 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
                </button>

                {showHistory && (
                    <div className="border-t border-gray-200">
                        {historyError ? (
                            <div className="p-6 text-center text-gray-500">
                                <History className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm">Rate history feature coming soon</p>
                                <p className="text-xs text-gray-400 mt-0.5">Current rate: {formatCurrency(rate)} per day</p>
                            </div>
                        ) : rateHistory.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                <History className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm">No rate history available yet</p>
                                <p className="text-xs text-gray-400 mt-0.5">Current rate: {formatCurrency(rate)} per day</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                                        <tr>
                                            <th className="px-5 py-3">Rate per Day</th>
                                            <th className="px-5 py-3">Updated At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-700">
                                        {rateHistory.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50/70 transition">
                                                <td className="px-5 py-3 font-semibold text-[#003A77]">
                                                    {formatCurrency(item.ratePerGuardPerDay)}
                                                    <span className="text-xs font-normal text-gray-500 ml-1">per day</span>
                                                </td>
                                                <td className="px-5 py-3 text-xs text-gray-600">
                                                    {formatDate(item.updatedAt)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Info Card */}
            <div className="bg-blue-50/70 rounded-xl p-4 border border-blue-200">
                <p className="text-xs text-blue-900 font-medium flex items-center gap-2">
                    <span>📌</span>
                    <span>This rate will be shown to exhibitors when they request security guards</span>
                </p>
                <p className="text-[11px] text-blue-700 mt-1 ml-5">
                    Total cost = Quantity × Number of Days × Rate per day (₹{rate.toLocaleString()})
                </p>
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs">
                <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                    <TrendingUp size={14} className="text-[#00A1B1]" />
                    Cost Calculator Preview
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                        <p className="text-xs text-gray-500">Per Guard (1 day)</p>
                        <p className="text-gray-900 font-bold text-base mt-0.5">{formatCurrency(rate)}</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                        <p className="text-xs text-gray-500">2 Guards × 3 Days</p>
                        <p className="text-gray-900 font-bold text-base mt-0.5">{formatCurrency(rate * 2 * 3)}</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                        <p className="text-xs text-gray-500">5 Guards × 5 Days</p>
                        <p className="text-gray-900 font-bold text-base mt-0.5">{formatCurrency(rate * 5 * 5)}</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                        <p className="text-xs text-gray-500">10 Guards × 7 Days</p>
                        <p className="text-gray-900 font-bold text-base mt-0.5">{formatCurrency(rate * 10 * 7)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
