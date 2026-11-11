"use client";

import { useState, useEffect } from "react";
import { Save, Pencil, Home, Clock, Users, RotateCcw, DollarSign, TrendingUp, Calculator } from "lucide-react";
import {
    getHousekeepingConfig,
    updateHousekeepingConfig,
    resetHousekeepingToDefault,
    getHousekeepingStatistics,
    HousekeepingConfig
} from "@/lib/api/housekeeping";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';

export default function AdminHousekeepingPage() {
    const [config, setConfig] = useState<HousekeepingConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [statistics, setStatistics] = useState({ totalConfigs: 0, currentRate: 0, averageRate: 0 });
    const [tempConfig, setTempConfig] = useState({ ratePerShift: "", shiftHours: "" });

    const fetchConfig = async () => {
        try {
            setLoading(true);
            const response = await getHousekeepingConfig();

            if (response && response.success !== false) {
                const configData = response.data || response;
                setConfig(configData);
                setTempConfig({
                    ratePerShift: configData.ratePerShift?.toString() || "2000",
                    shiftHours: configData.shiftHours?.toString() || "10",
                });
            } else {
                setTempConfig({
                    ratePerShift: "2000",
                    shiftHours: "10",
                });
            }
        } catch (error) {
            console.error("Failed to fetch housekeeping config:", error);
            toast.error("Failed to load housekeeping configuration");
            setTempConfig({
                ratePerShift: "2000",
                shiftHours: "10",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        try {
            const response = await getHousekeepingStatistics();
            if (response && response.success) {
                const statsData = response.data;
                setStatistics({
                    totalConfigs: statsData?.totalConfigs || 0,
                    currentRate: statsData?.currentRate || 2000,
                    averageRate: statsData?.averageRate || 2000,
                });
            }
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
        }
    };

    useEffect(() => {
        fetchConfig();
        fetchStatistics();
    }, []);

    const handleSave = async () => {
        const rate = parseInt(tempConfig.ratePerShift);
        const hours = parseInt(tempConfig.shiftHours);

        if (!rate || rate <= 0) {
            toast.error("Please enter a valid rate per shift");
            return;
        }

        if (!hours || hours <= 0 || hours > 24) {
            toast.error("Shift hours must be between 1 and 24");
            return;
        }

        try {
            const response = await updateHousekeepingConfig({
                ratePerShift: rate,
                shiftHours: hours,
            });

            if (response && response.success !== false) {
                const updatedData = response.data || response;
                setConfig(updatedData);
                toast.success("Housekeeping configuration updated successfully");
                setEditing(false);
                fetchStatistics();
            } else {
                toast.error(response?.message || "Failed to update configuration");
            }
        } catch (error: any) {
            console.error("Save error:", error);
            toast.error(error.response?.data?.message || "Failed to update configuration");
        }
    };

    const handleReset = async () => {
        if (confirm("Are you sure you want to reset housekeeping configuration to default?")) {
            try {
                const response = await resetHousekeepingToDefault();
                if (response && response.success !== false) {
                    const resetData = response.data || response;
                    setConfig(resetData);
                    setTempConfig({
                        ratePerShift: resetData.ratePerShift?.toString() || "2000",
                        shiftHours: resetData.shiftHours?.toString() || "10",
                    });
                    toast.success("Reset to default values successfully");
                    setEditing(false);
                    fetchStatistics();
                } else {
                    toast.error(response?.message || "Failed to reset");
                }
            } catch (error) {
                toast.error("Failed to reset to default");
            }
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

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
                    <Home className="h-5 w-5 text-[#00A1B1]" />
                </div>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Housekeeping Configuration</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Set rates and working hours for housekeeping staff</p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Configurations</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{statistics.totalConfigs}</p>
                        </div>
                        <TrendingUp className="h-7 w-7 text-gray-400" />
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-xs">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Current Rate</p>
                            <p className="text-2xl font-bold text-emerald-600 mt-1">{formatCurrency(statistics.currentRate)}</p>
                        </div>
                        <DollarSign className="h-7 w-7 text-emerald-500/40" />
                    </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-teal-100 shadow-xs">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-teal-700 uppercase tracking-wider">Average Rate</p>
                            <p className="text-2xl font-bold text-[#00A1B1] mt-1">{formatCurrency(statistics.averageRate)}</p>
                        </div>
                        <Calculator className="h-7 w-7 text-teal-500/40" />
                    </div>
                </div>
            </div>

            {/* Main Configuration Card */}
            <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs">
                {!editing ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="text-center p-6 bg-slate-50 border border-slate-200/80 rounded-xl">
                                <div className="flex items-center justify-center gap-1.5 mb-2">
                                    <DollarSign className="h-5 w-5 text-[#003A77]" />
                                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">Rate per Shift</p>
                                </div>
                                <p className="text-3xl font-bold text-[#003A77]">
                                    {formatCurrency(config?.ratePerShift || 2000)}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">per staff per shift</p>
                            </div>
                            <div className="text-center p-6 bg-slate-50 border border-slate-200/80 rounded-xl">
                                <div className="flex items-center justify-center gap-1.5 mb-2">
                                    <Clock className="h-5 w-5 text-[#00A1B1]" />
                                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">Shift Hours</p>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{config?.shiftHours || 10} hours</p>
                                <p className="text-xs text-gray-500 mt-1">per shift</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2"
                            >
                                <RotateCcw size={15} />
                                Reset to Default
                            </button>
                            <button
                                onClick={() => setEditing(true)}
                                className="px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg shadow-xs transition flex items-center gap-2"
                            >
                                <Pencil size={15} />
                                Edit Rates
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Rate per Shift (₹) <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                    <input
                                        type="number"
                                        value={tempConfig.ratePerShift}
                                        onChange={(e) => setTempConfig({ ...tempConfig, ratePerShift: e.target.value })}
                                        className="w-full pl-7 pr-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                        placeholder="2000"
                                    />
                                </div>
                                <p className="text-[11px] text-gray-500 mt-1">Cost per housekeeping staff member per shift</p>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Shift Hours <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={tempConfig.shiftHours}
                                    onChange={(e) => setTempConfig({ ...tempConfig, shiftHours: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                    placeholder="10"
                                />
                                <p className="text-[11px] text-gray-500 mt-1">Hours per shift (1-24 hours)</p>
                            </div>
                        </div>

                        {/* Preview calculated costs */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <h3 className="text-xs font-semibold text-gray-700 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
                                <Calculator size={14} className="text-[#00A1B1]" />
                                Cost Preview
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-xs text-gray-500">For 1 staff, 1 day (1 shift):</span>
                                    <p className="text-lg font-bold text-[#003A77]">
                                        {formatCurrency(parseInt(tempConfig.ratePerShift) || 0)}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500">For 2 staff, 3 days:</span>
                                    <p className="text-lg font-bold text-[#003A77]">
                                        {formatCurrency((parseInt(tempConfig.ratePerShift) || 0) * 2 * 3)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setEditing(false);
                                    if (config) {
                                        setTempConfig({
                                            ratePerShift: config.ratePerShift?.toString() || "2000",
                                            shiftHours: config.shiftHours?.toString() || "10",
                                        });
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

            {/* Info Card */}
            <div className="bg-blue-50/70 rounded-xl border border-blue-200 p-4">
                <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 text-[#003A77]" />
                    </div>
                    <div>
                        <h3 className="text-xs font-semibold text-[#003A77] uppercase tracking-wider">Housekeeping Staff Information</h3>
                        <p className="text-xs text-gray-600 mt-1">
                            Rate applies per staff member per shift. Each shift lasts {config?.shiftHours || 10} hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
