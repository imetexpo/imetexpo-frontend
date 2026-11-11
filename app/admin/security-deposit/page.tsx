"use client";

import { useState, useEffect } from "react";
import {
    Plus, Edit, Trash2, Save, X, Shield,
    CheckCircle, XCircle, RefreshCw,
    MoveUp, MoveDown
} from "lucide-react";
import {
    getSecurityDeposits,
    createSecurityDeposit,
    updateSecurityDeposit,
    deleteSecurityDeposit,
    toggleSecurityDepositStatus,
    SecurityDeposit
} from "@/lib/api/securityDeposit";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';

const categoryOptions = [
    { value: '0-36', label: '0-36 sq.m', min: 0, max: 36 },
    { value: '37-100', label: '37-100 sq.m', min: 37, max: 100 },
    { value: '101+', label: '101+ sq.m', min: 101, max: 9999 }
];

export default function AdminSecurityDepositPage() {
    const [deposits, setDeposits] = useState<SecurityDeposit[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingDeposit, setEditingDeposit] = useState<SecurityDeposit | null>(null);
    const [statusFilter, setStatusFilter] = useState("all");
    const [statistics, setStatistics] = useState({
        totalDeposits: 0,
        activeDeposits: 0,
        inactiveDeposits: 0,
        avgINR: 0,
        avgUSD: 0
    });
    const [formData, setFormData] = useState({
        category: '0-36' as '0-36' | '37-100' | '101+',
        minSqMtr: 0,
        maxSqMtr: 36,
        amountINR: '',
        amountUSD: '',
        isActive: true,
        displayOrder: 1,
        description: '',
    });

    const calculateLocalStatistics = (depositsList: SecurityDeposit[]) => {
        const totalDeposits = depositsList.length;
        const activeDeposits = depositsList.filter(d => d.isActive).length;
        const inactiveDeposits = totalDeposits - activeDeposits;
        const avgINR = depositsList.length > 0
            ? depositsList.reduce((sum, d) => sum + d.amountINR, 0) / depositsList.length
            : 0;
        const avgUSD = depositsList.length > 0
            ? depositsList.reduce((sum, d) => sum + d.amountUSD, 0) / depositsList.length
            : 0;

        setStatistics({
            totalDeposits,
            activeDeposits,
            inactiveDeposits,
            avgINR,
            avgUSD
        });
    };

    const fetchDeposits = async () => {
        try {
            setLoading(true);
            const response = await getSecurityDeposits({
                isActive: statusFilter !== "all" ? (statusFilter === "active" ? true : false) : undefined,
            });

            if (response.success) {
                const fetchedDeposits = response.data || [];
                setDeposits(fetchedDeposits);
                calculateLocalStatistics(fetchedDeposits);
            } else {
                toast.error(response.message || "Failed to load security deposits");
            }
        } catch (error) {
            console.error("Failed to fetch security deposits:", error);
            toast.error("Failed to load security deposits");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeposits();
    }, [statusFilter]);

    const handleDelete = async (id: string, category: string) => {
        if (confirm(`Are you sure you want to delete the "${category}" deposit tier?`)) {
            try {
                const response = await deleteSecurityDeposit(id);
                if (response.success) {
                    toast.success("Security deposit tier deleted successfully");
                    fetchDeposits();
                } else {
                    toast.error(response.message || "Failed to delete");
                }
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete deposit tier");
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await toggleSecurityDepositStatus(id, !currentStatus);
            if (response.success) {
                toast.success(`Tier ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
                fetchDeposits();
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Toggle status error:", error);
            toast.error("Failed to update status");
        }
    };

    const handleCategoryChange = (categoryValue: string) => {
        const option = categoryOptions.find(opt => opt.value === categoryValue);
        if (option) {
            setFormData({
                ...formData,
                category: categoryValue as any,
                minSqMtr: option.min,
                maxSqMtr: option.max,
            });
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
    const formatUSD = (amount: number) => `$${amount.toLocaleString()}`;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-11 w-11 bg-teal-50 border border-teal-100 rounded-xl flex items-center justify-center">
                        <Shield className="h-5 w-5 text-[#00A1B1]" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Security Deposit Configuration</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage refundable security deposit tiers by booth area</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setEditingDeposit(null);
                        setFormData({
                            category: '0-36',
                            minSqMtr: 0,
                            maxSqMtr: 36,
                            amountINR: '',
                            amountUSD: '',
                            isActive: true,
                            displayOrder: deposits.length + 1,
                            description: '',
                        });
                        setShowModal(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg shadow-xs transition"
                >
                    <Plus size={16} />
                    Add Tier
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Tiers</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{statistics.totalDeposits}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-xs">
                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Active</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">{statistics.activeDeposits}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-rose-100 shadow-xs">
                    <p className="text-xs font-medium text-rose-700 uppercase tracking-wider">Inactive</p>
                    <p className="text-2xl font-bold text-rose-600 mt-1">{statistics.inactiveDeposits}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-teal-100 shadow-xs">
                    <p className="text-xs font-medium text-teal-700 uppercase tracking-wider">Avg Deposit (INR)</p>
                    <p className="text-2xl font-bold text-[#003A77] mt-1">{formatCurrency(statistics.avgINR)}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-xs col-span-2 sm:col-span-1">
                    <p className="text-xs font-medium text-blue-700 uppercase tracking-wider">Avg Deposit (USD)</p>
                    <p className="text-2xl font-bold text-[#00A1B1] mt-1">{formatUSD(statistics.avgUSD)}</p>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
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
                        onClick={fetchDeposits}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={15} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Tiers Grid */}
            {loading ? (
                <div className="bg-white rounded-xl border border-gray-200/80 p-12 flex items-center justify-center min-h-[300px]">
                    <LoadingDots tone="dark" className="mx-auto flex" />
                </div>
            ) : deposits.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200/80 p-12 text-center shadow-xs">
                    <Shield className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-gray-900 mb-1">No Security Deposit Tiers Configured</h3>
                    <p className="text-xs text-gray-500 mb-4">Add deposit tiers based on booth area</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg transition"
                    >
                        <Plus size={16} />
                        Add Tier
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {deposits.map((deposit) => (
                        <div key={deposit.id} className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs hover:border-[#00A1B1]/40 transition">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-lg font-bold text-gray-900">{deposit.category} sq.m</h3>
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                            deposit.isActive 
                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                                : 'bg-gray-100 text-gray-600 border-gray-200'
                                        }`}>
                                            {deposit.isActive ? <CheckCircle size={10} /> : <XCircle size={10} />}
                                            {deposit.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">{deposit.minSqMtr} - {deposit.maxSqMtr === 9999 ? "Above" : deposit.maxSqMtr} sq.m</p>
                                    {deposit.description && (
                                        <p className="text-xs text-gray-400 mt-1">{deposit.description}</p>
                                    )}
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleToggleStatus(deposit.id, deposit.isActive)}
                                        className={`p-1.5 rounded-lg transition ${
                                            deposit.isActive
                                                ? 'text-gray-400 hover:text-rose-600 hover:bg-rose-50'
                                                : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'
                                        }`}
                                        title={deposit.isActive ? "Deactivate" : "Activate"}
                                    >
                                        {deposit.isActive ? <XCircle size={15} /> : <CheckCircle size={15} />}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditingDeposit(deposit);
                                            setFormData({
                                                category: deposit.category,
                                                minSqMtr: deposit.minSqMtr,
                                                maxSqMtr: deposit.maxSqMtr,
                                                amountINR: deposit.amountINR.toString(),
                                                amountUSD: deposit.amountUSD.toString(),
                                                isActive: deposit.isActive,
                                                displayOrder: deposit.displayOrder,
                                                description: deposit.description || '',
                                            });
                                            setShowModal(true);
                                        }}
                                        className="p-1.5 text-gray-400 hover:text-[#003A77] hover:bg-gray-100 rounded-lg transition"
                                        title="Edit"
                                    >
                                        <Edit size={15} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(deposit.id, deposit.category)}
                                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                        title="Delete"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                            <div className="pt-3 mt-3 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Security Deposit</p>
                                        <p className="text-xl font-bold text-[#003A77]">{formatCurrency(deposit.amountINR)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 font-medium">USD Equivalent</p>
                                        <p className="text-base font-bold text-[#00A1B1]">{formatUSD(deposit.amountUSD)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-200 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editingDeposit ? 'Edit Deposit Tier' : 'Add New Deposit Tier'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition">
                                <X size={18} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Category <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] disabled:bg-gray-100"
                                    disabled={!!editingDeposit}
                                >
                                    {categoryOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {editingDeposit && (
                                    <p className="text-[11px] text-gray-400 mt-1">Category cannot be changed after creation</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                        Min (sq.m)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.minSqMtr}
                                        readOnly
                                        className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                        Max (sq.m)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.maxSqMtr}
                                        readOnly
                                        className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Deposit Amount (INR) <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                    <input
                                        type="number"
                                        value={formData.amountINR}
                                        onChange={(e) => setFormData({ ...formData, amountINR: e.target.value })}
                                        className="w-full pl-7 pr-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                        placeholder="25000"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Deposit Amount (USD) <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                    <input
                                        type="number"
                                        value={formData.amountUSD}
                                        onChange={(e) => setFormData({ ...formData, amountUSD: e.target.value })}
                                        className="w-full pl-7 pr-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                        placeholder="300"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Description (Optional)
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1]"
                                    placeholder="Additional notes about this deposit tier"
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
                                    if (!formData.amountINR || !formData.amountUSD) {
                                        toast.error("Please fill all required fields");
                                        return;
                                    }

                                    try {
                                        if (editingDeposit) {
                                            const response = await updateSecurityDeposit(editingDeposit.id, {
                                                amountINR: parseInt(formData.amountINR),
                                                amountUSD: parseInt(formData.amountUSD),
                                                isActive: formData.isActive,
                                                displayOrder: formData.displayOrder,
                                                description: formData.description,
                                            });
                                            if (response.success) {
                                                toast.success("Security deposit tier updated successfully");
                                                setShowModal(false);
                                                fetchDeposits();
                                            } else {
                                                toast.error(response.message || "Failed to update");
                                            }
                                        } else {
                                            const response = await createSecurityDeposit({
                                                category: formData.category,
                                                minSqMtr: formData.minSqMtr,
                                                maxSqMtr: formData.maxSqMtr,
                                                amountINR: parseInt(formData.amountINR),
                                                amountUSD: parseInt(formData.amountUSD),
                                                isActive: formData.isActive,
                                                displayOrder: formData.displayOrder,
                                                description: formData.description,
                                            });
                                            if (response.success) {
                                                toast.success("Security deposit tier created successfully");
                                                setShowModal(false);
                                                fetchDeposits();
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
                                {editingDeposit ? 'Update Tier' : 'Create Tier'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
