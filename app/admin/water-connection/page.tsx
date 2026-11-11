// app/admin/water-connection/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Save, Pencil, Droplet, DollarSign, RotateCcw, Clock, History, Calculator, RefreshCw } from "lucide-react";
import {
    getWaterConnectionConfig,
    updateWaterConnectionConfig,
    resetWaterConnectionToDefault,
    getWaterConnectionStatistics,
    getWaterConnectionRateHistory,
    WaterConnectionConfig,
    RateHistoryItem,
    StatisticsData
} from "@/lib/api/waterConnection";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';

export default function AdminWaterConnectionPage() {
    const [config, setConfig] = useState<WaterConnectionConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [tempRate, setTempRate] = useState("");
    const [statistics, setStatistics] = useState<StatisticsData | null>(null);
    const [rateHistory, setRateHistory] = useState<RateHistoryItem[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    const fetchConfig = async () => {
        try {
            setLoading(true);
            const response = await getWaterConnectionConfig();

            if (response.success) {
                const configData = response.data;
                setConfig(configData);
                setTempRate(configData.costPerConnection.toString());
            }
        } catch (error) {
            console.error("Failed to fetch water connection config:", error);
            toast.error("Failed to load water connection configuration");
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        try {
            const response = await getWaterConnectionStatistics();
            if (response.success) {
                setStatistics(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
        }
    };

    const fetchRateHistory = async () => {
        try {
            const response = await getWaterConnectionRateHistory();
            if (response.success) {
                setRateHistory(response.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch rate history:", error);
        }
    };

    useEffect(() => {
        fetchConfig();
        fetchStatistics();
        fetchRateHistory();
    }, []);

    const handleSave = async () => {
        const rate = parseInt(tempRate);
        if (!rate || rate <= 0) {
            toast.error("Please enter a valid rate");
            return;
        }

        try {
            const response = await updateWaterConnectionConfig(rate);

            if (response.success) {
                setConfig(response.data);
                toast.success("Water connection rate updated successfully");
                setEditing(false);
                fetchStatistics();
                fetchRateHistory();
            } else {
                toast.error(response.message || "Failed to update configuration");
            }
        } catch (error: any) {
            console.error("Save error:", error);
            toast.error(error.response?.data?.message || "Failed to update configuration");
        }
    };

    const handleReset = async () => {
        if (confirm("Are you sure you want to reset water connection rate to default (₹15,000)?")) {
            try {
                const response = await resetWaterConnectionToDefault();
                if (response.success) {
                    setConfig(response.data);
                    setTempRate(response.data.costPerConnection.toString());
                    toast.success("Reset to default rate successfully");
                    setEditing(false);
                    fetchStatistics();
                    fetchRateHistory();
                } else {
                    toast.error(response.message || "Failed to reset");
                }
            } catch (error) {
                toast.error("Failed to reset to default");
            }
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
                    <Droplet className="h-5 w-5 text-[#00A1B1]" />
                </div>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Water Connection Configuration</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Set rate per water connection for exhibitors</p>
                </div>
            </div>

            {/* Statistics Cards */}
            {statistics && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Current Rate</p>
                                <p className="text-2xl font-bold text-[#003A77] mt-1">{formatCurrency(statistics.currentRate)}</p>
                            </div>
                            <DollarSign className="h-7 w-7 text-teal-600/30" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Updates</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{statistics.totalUpdates}</p>
                            </div>
                            <History className="h-7 w-7 text-blue-600/30" />
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</p>
                                <p className="text-xs font-semibold text-gray-800 mt-1.5">{formatDate(statistics.lastUpdated)}</p>
                            </div>
                            <Clock className="h-7 w-7 text-gray-400" />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Configuration Card */}
            <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs">
                {!editing ? (
                    <div className="text-center py-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 border border-teal-100 rounded-full mb-3">
                            <Droplet className="h-8 w-8 text-[#00A1B1]" />
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Current Rate per Water Connection</p>
                        <p className="text-4xl font-extrabold text-[#003A77]">{formatCurrency(config?.costPerConnection || 0)}</p>
                        <p className="text-xs text-gray-500 mt-1">per connection</p>
                        <div className="flex justify-center gap-3 mt-6">
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-1.5"
                            >
                                <RotateCcw size={15} />
                                Reset to Default
                            </button>
                            <button
                                onClick={() => setEditing(true)}
                                className="px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg shadow-xs transition flex items-center gap-1.5"
                            >
                                <Pencil size={15} />
                                Edit Rate
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="text-center mb-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Edit Water Connection Rate</p>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Rate per Connection (₹) <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                <input
                                    type="number"
                                    value={tempRate}
                                    onChange={(e) => setTempRate(e.target.value)}
                                    className="w-full pl-7 pr-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 text-lg font-semibold focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                    placeholder="15000"
                                />
                            </div>
                            <p className="text-[11px] text-gray-500 mt-1">Cost per water connection for exhibitors</p>
                        </div>
                        <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setEditing(false);
                                    if (config) {
                                        setTempRate(config.costPerConnection.toString());
                                    }
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-xs transition flex items-center gap-1.5"
                            >
                                <Save size={15} />
                                Save Changes
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
                        {rateHistory.length === 0 ? (
                            <div className="p-6 text-center text-sm text-gray-500">
                                No rate history available
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                                        <tr>
                                            <th className="px-5 py-3">Rate per Connection</th>
                                            <th className="px-5 py-3">Updated At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-700">
                                        {rateHistory.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50/70 transition">
                                                <td className="px-5 py-3 font-semibold text-[#003A77]">
                                                    {formatCurrency(item.costPerConnection)}
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
            <div className="bg-blue-50/70 rounded-xl border border-blue-200 p-4">
                <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calculator className="h-4 w-4 text-[#003A77]" />
                    </div>
                    <div>
                        <h3 className="text-xs font-semibold text-[#003A77] uppercase tracking-wider">Cost Calculation</h3>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                            Total cost = Number of connections × Rate per connection.
                            Current rate: {formatCurrency(config?.costPerConnection || 0)} per water connection.
                            For multiple connections, the cost is calculated proportionally.
                        </p>
                    </div>
                </div>
            </div>

            {/* Sample Calculation Preview */}
            <div className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs">
                <h4 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                    <Calculator size={14} className="text-[#00A1B1]" />
                    Sample Calculations
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                        <span className="text-xs text-gray-500">1 connection:</span>
                        <p className="text-gray-900 font-bold text-base mt-0.5">{formatCurrency(config?.costPerConnection || 0)}</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                        <span className="text-xs text-gray-500">2 connections:</span>
                        <p className="text-gray-900 font-bold text-base mt-0.5">{formatCurrency((config?.costPerConnection || 0) * 2)}</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                        <span className="text-xs text-gray-500">5 connections:</span>
                        <p className="text-gray-900 font-bold text-base mt-0.5">{formatCurrency((config?.costPerConnection || 0) * 5)}</p>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg">
                        <span className="text-xs text-gray-500">10 connections:</span>
                        <p className="text-gray-900 font-bold text-base mt-0.5">{formatCurrency((config?.costPerConnection || 0) * 10)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
