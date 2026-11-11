"use client";

import { useState, useEffect } from "react";
import {
    Plus, Edit, Trash2, Save, X, Wind, Gauge, Zap,
    CheckCircle, XCircle, RefreshCw,
    MoveUp, MoveDown, Search
} from "lucide-react";
import {
    getCompressedAirOptions,
    createCompressedAirOption,
    updateCompressedAirOption,
    deleteCompressedAirOption,
    toggleCompressedAirStatus,
    CompressedAirOption
} from "@/lib/api/compressedAir";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';

export default function AdminCompressedAirPage() {
    const [options, setOptions] = useState<CompressedAirOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingOption, setEditingOption] = useState<CompressedAirOption | null>(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [statistics, setStatistics] = useState({
        totalOptions: 0,
        activeOptions: 0,
        inactiveOptions: 0,
        avgCost: 0,
        avgPower: 0
    });
    const [formData, setFormData] = useState({
        cfmRange: "",
        costPerConnection: "",
        powerKW: "",
        isActive: true,
        displayOrder: 1,
    });

    const calculateLocalStatistics = (optionsList: CompressedAirOption[]) => {
        const totalOptions = optionsList.length;
        const activeOptions = optionsList.filter(opt => opt.isActive).length;
        const inactiveOptions = totalOptions - activeOptions;
        const avgCost = optionsList.length > 0
            ? optionsList.reduce((sum, opt) => sum + opt.costPerConnection, 0) / optionsList.length
            : 0;
        const avgPower = optionsList.length > 0
            ? optionsList.reduce((sum, opt) => sum + opt.powerKW, 0) / optionsList.length
            : 0;

        setStatistics({
            totalOptions,
            activeOptions,
            inactiveOptions,
            avgCost,
            avgPower
        });
    };

    const fetchOptions = async () => {
        try {
            setLoading(true);
            const response = await getCompressedAirOptions();
            if (response.success) {
                const fetchedOptions = response.data || [];
                setOptions(fetchedOptions);
                calculateLocalStatistics(fetchedOptions);
            } else {
                toast.error(response.message || "Failed to load compressed air options");
            }
        } catch (error) {
            console.error("Failed to fetch compressed air options:", error);
            toast.error("Failed to load compressed air options");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOptions();
    }, []);

    const handleDelete = async (id: string, cfmRange: string) => {
        if (confirm(`Are you sure you want to delete the CFM option "${cfmRange}"?`)) {
            try {
                const response = await deleteCompressedAirOption(id);
                if (response.success) {
                    toast.success("Compressed air option deleted successfully");
                    fetchOptions();
                } else {
                    toast.error(response.message || "Failed to delete");
                }
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete option");
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await toggleCompressedAirStatus(id, !currentStatus);
            if (response.success) {
                toast.success(`Option ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
                fetchOptions();
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Toggle status error:", error);
            toast.error("Failed to update status");
        }
    };

    const handleMoveOrder = async (id: string, currentOrder: number, direction: 'up' | 'down') => {
        const newOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;
        if (newOrder < 1 || newOrder > options.length) return;

        try {
            const response = await updateCompressedAirOption(id, { displayOrder: newOrder });
            if (response.success) {
                toast.success("Display order updated");
                fetchOptions();
            }
        } catch (error) {
            console.error("Order update error:", error);
            toast.error("Failed to update order");
        }
    };

    const handleSearch = () => {
        let filtered = [...options];
        if (search) {
            filtered = filtered.filter(opt =>
                opt.cfmRange.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (statusFilter !== "all") {
            filtered = filtered.filter(opt =>
                statusFilter === "active" ? opt.isActive : !opt.isActive
            );
        }
        setOptions(filtered);
    };

    const formatCurrency = (amount: number) => {
        return `₹${amount.toLocaleString()}`;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-11 w-11 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center">
                        <Wind className="h-5 w-5 text-[#00A1B1]" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Compressed Air Configuration</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage CFM ranges and pricing for compressed air</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setEditingOption(null);
                        setFormData({
                            cfmRange: "",
                            costPerConnection: "",
                            powerKW: "",
                            isActive: true,
                            displayOrder: options.length + 1,
                        });
                        setShowModal(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg shadow-xs transition"
                >
                    <Plus size={16} />
                    Add CFM Option
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Options</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{statistics.totalOptions}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-xs">
                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Active</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">{statistics.activeOptions}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-rose-100 shadow-xs">
                    <p className="text-xs font-medium text-rose-700 uppercase tracking-wider">Inactive</p>
                    <p className="text-2xl font-bold text-rose-600 mt-1">{statistics.inactiveOptions}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-teal-100 shadow-xs">
                    <p className="text-xs font-medium text-teal-700 uppercase tracking-wider">Avg Cost</p>
                    <p className="text-2xl font-bold text-[#00A1B1] mt-1">{formatCurrency(statistics.avgCost)}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-xs col-span-2 sm:col-span-1">
                    <p className="text-xs font-medium text-blue-700 uppercase tracking-wider">Avg Power</p>
                    <p className="text-2xl font-bold text-[#003A77] mt-1">{statistics.avgPower.toFixed(1)} kW</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by CFM range..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#00A1B1]"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active Only</option>
                        <option value="inactive">Inactive Only</option>
                    </select>
                    <button
                        onClick={fetchOptions}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={15} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Options Table */}
            {loading ? (
                <div className="bg-white rounded-xl border border-gray-200/80 p-12 flex items-center justify-center min-h-[300px]">
                    <LoadingDots tone="dark" className="mx-auto flex" />
                </div>
            ) : options.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200/80 p-12 text-center shadow-xs">
                    <Wind className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-gray-900 mb-1">No Compressed Air Options Configured</h3>
                    <p className="text-xs text-gray-500 mb-4">Add CFM ranges and pricing for compressed air connections</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg transition"
                    >
                        <Plus size={16} />
                        Add CFM Option
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <tr>
                                    <th className="px-5 py-3.5">Order</th>
                                    <th className="px-5 py-3.5">CFM Range</th>
                                    <th className="px-5 py-3.5">Connection Cost</th>
                                    <th className="px-5 py-3.5">Power (kW)</th>
                                    <th className="px-5 py-3.5">Total Cost</th>
                                    <th className="px-5 py-3.5">Status</th>
                                    <th className="px-5 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                {options.map((option) => (
                                    <tr key={option.id} className="hover:bg-gray-50/70 transition">
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-semibold text-gray-900">{option.displayOrder}</span>
                                                <div className="flex flex-col">
                                                    <button
                                                        onClick={() => handleMoveOrder(option.id, option.displayOrder, 'up')}
                                                        disabled={option.displayOrder === 1}
                                                        className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                                                    >
                                                        <MoveUp size={11} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleMoveOrder(option.id, option.displayOrder, 'down')}
                                                        disabled={option.displayOrder === options.length}
                                                        className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-30"
                                                    >
                                                        <MoveDown size={11} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <Gauge size={16} className="text-[#00A1B1]" />
                                                <span className="font-medium text-gray-900">{option.cfmRange}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="font-semibold text-[#003A77]">{formatCurrency(option.costPerConnection)}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-1 text-gray-700">
                                                <Zap size={14} className="text-amber-500" />
                                                <span>{option.powerKW} kW</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="font-bold text-emerald-700">{formatCurrency(option.costPerConnection + (option.powerKW * 3500))}</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                option.isActive 
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                                {option.isActive ? <CheckCircle size={11} /> : <XCircle size={11} />}
                                                {option.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleToggleStatus(option.id, option.isActive)}
                                                    className={`p-1.5 rounded-lg transition ${
                                                        option.isActive
                                                            ? 'text-gray-400 hover:text-rose-600 hover:bg-rose-50'
                                                            : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'
                                                    }`}
                                                    title={option.isActive ? "Deactivate" : "Activate"}
                                                >
                                                    {option.isActive ? <XCircle size={15} /> : <CheckCircle size={15} />}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingOption(option);
                                                        setFormData({
                                                            cfmRange: option.cfmRange,
                                                            costPerConnection: option.costPerConnection.toString(),
                                                            powerKW: option.powerKW.toString(),
                                                            isActive: option.isActive,
                                                            displayOrder: option.displayOrder,
                                                        });
                                                        setShowModal(true);
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-[#003A77] hover:bg-gray-100 rounded-lg transition"
                                                    title="Edit"
                                                >
                                                    <Edit size={15} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(option.id, option.cfmRange)}
                                                    className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-200 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editingOption ? 'Edit CFM Option' : 'Add New CFM Option'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition">
                                <X size={18} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    CFM Range <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.cfmRange}
                                    onChange={(e) => setFormData({ ...formData, cfmRange: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                    placeholder="e.g., 0-100 CFM"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Connection Cost (₹) <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                    <input
                                        type="number"
                                        value={formData.costPerConnection}
                                        onChange={(e) => setFormData({ ...formData, costPerConnection: e.target.value })}
                                        className="w-full pl-7 pr-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                        placeholder="5000"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Power Required (kW) <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.powerKW}
                                    onChange={(e) => setFormData({ ...formData, powerKW: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                    placeholder="5.5"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Electrical load required for this connection</p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.displayOrder}
                                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                    placeholder="1"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Status
                                </label>
                                <select
                                    value={formData.isActive ? "active" : "inactive"}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "active" })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1]"
                                >
                                    <option value="active">Active (Visible to exhibitors)</option>
                                    <option value="inactive">Inactive (Hidden from exhibitors)</option>
                                </select>
                            </div>

                            {formData.costPerConnection && formData.powerKW && (
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                                    <p className="text-xs text-gray-500 mb-0.5">Total Cost Preview:</p>
                                    <p className="text-lg font-bold text-emerald-700">
                                        {formatCurrency(parseInt(formData.costPerConnection) + (parseFloat(formData.powerKW) * 3500))}
                                    </p>
                                    <p className="text-[11px] text-gray-500 mt-0.5">
                                        Connection: {formatCurrency(parseInt(formData.costPerConnection) || 0)} +
                                        Power: {formatCurrency((parseFloat(formData.powerKW) || 0) * 3500)}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    if (!formData.cfmRange || !formData.costPerConnection || !formData.powerKW) {
                                        toast.error("Please fill all required fields");
                                        return;
                                    }

                                    try {
                                        if (editingOption) {
                                            const response = await updateCompressedAirOption(editingOption.id, {
                                                cfmRange: formData.cfmRange,
                                                costPerConnection: parseInt(formData.costPerConnection),
                                                powerKW: parseFloat(formData.powerKW),
                                                isActive: formData.isActive,
                                                displayOrder: formData.displayOrder,
                                            });
                                            if (response.success) {
                                                toast.success("Compressed air option updated successfully");
                                                setShowModal(false);
                                                fetchOptions();
                                            } else {
                                                toast.error(response.message || "Failed to update");
                                            }
                                        } else {
                                            const response = await createCompressedAirOption({
                                                cfmRange: formData.cfmRange,
                                                costPerConnection: parseInt(formData.costPerConnection),
                                                powerKW: parseFloat(formData.powerKW),
                                                isActive: formData.isActive,
                                                displayOrder: formData.displayOrder,
                                            });
                                            if (response.success) {
                                                toast.success("Compressed air option created successfully");
                                                setShowModal(false);
                                                fetchOptions();
                                            } else {
                                                toast.error(response.message || "Failed to create");
                                            }
                                        }
                                    } catch (error: any) {
                                        console.error("Operation error:", error);
                                        toast.error(error.response?.data?.message || "Operation failed");
                                    }
                                }}
                                className="flex-1 px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-1.5 shadow-xs"
                            >
                                <Save size={15} />
                                {editingOption ? 'Update Option' : 'Create Option'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
