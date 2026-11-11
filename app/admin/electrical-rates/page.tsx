"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, BoltIcon, Calendar, CheckCircle, XCircle, Eye, Power, Zap } from "lucide-react";
import { getElectricalRates, deleteElectricalRate, toggleElectricalRateStatus, ElectricalRate, updateElectricalRate, createElectricalRate } from "@/lib/api/electricalRates";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';

export default function AdminElectricalRatesPage() {
    const [rates, setRates] = useState<ElectricalRate[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingRate, setEditingRate] = useState<ElectricalRate | null>(null);
    const [statistics, setStatistics] = useState({ total: 0, active: 0, exhibition: 0, temporary: 0 });
    const [formData, setFormData] = useState({
        type: 'both' as 'temporary' | 'exhibition' | 'both',
        ratePerKW: '',
        effectiveFrom: '',
        effectiveTo: '',
        description: '',
    });

    const calculateLocalStatistics = (ratesList: ElectricalRate[]) => {
        const total = ratesList.length;
        const active = ratesList.filter(rate => rate.isActive).length;
        const exhibition = ratesList.filter(rate => rate.type === 'exhibition' || rate.type === 'both').length;
        const temporary = ratesList.filter(rate => rate.type === 'temporary' || rate.type === 'both').length;

        setStatistics({ total, active, exhibition, temporary });
    };

    const fetchRates = async () => {
        try {
            setLoading(true);
            const response = await getElectricalRates();
            if (response.success) {
                const fetchedRates = response.data || [];
                setRates(fetchedRates);
                calculateLocalStatistics(fetchedRates);
            } else {
                toast.error(response.message || "Failed to load electrical rates");
            }
        } catch (error) {
            console.error("Failed to fetch electrical rates:", error);
            toast.error("Failed to load electrical rates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    const handleDelete = async (id: string, ratePerKW: number) => {
        if (confirm(`Are you sure you want to delete the rate ₹${ratePerKW}/KW?`)) {
            try {
                const response = await deleteElectricalRate(id);
                if (response.success) {
                    toast.success("Electrical rate deleted successfully");
                    fetchRates();
                } else {
                    toast.error(response.message || "Failed to delete");
                }
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete electrical rate");
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await toggleElectricalRateStatus(id);
            if (response.success) {
                toast.success(`Rate ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
                const updatedRates = rates.map(rate =>
                    rate.id === id ? { ...rate, isActive: !currentStatus } : rate
                );
                setRates(updatedRates);
                calculateLocalStatistics(updatedRates);
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Toggle status error:", error);
            toast.error("Failed to update status");
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'exhibition':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"><Eye size={12} /> Exhibition</span>;
            case 'temporary':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200"><Zap size={12} /> Temporary</span>;
            default:
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200"><Power size={12} /> Both</span>;
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-11 w-11 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center">
                        <BoltIcon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Electrical Rates Configuration</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Set pricing for electrical requirements per KW</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setEditingRate(null);
                        setFormData({
                            type: 'both',
                            ratePerKW: '',
                            effectiveFrom: '',
                            effectiveTo: '',
                            description: '',
                        });
                        setShowModal(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg shadow-xs transition"
                >
                    <Plus size={16} />
                    Add Rate
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Rates</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{statistics.total}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-xs">
                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Active Rates</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">{statistics.active}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-xs">
                    <p className="text-xs font-medium text-blue-700 uppercase tracking-wider">Exhibition Rates</p>
                    <p className="text-2xl font-bold text-[#003A77] mt-1">{statistics.exhibition}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-purple-100 shadow-xs">
                    <p className="text-xs font-medium text-purple-700 uppercase tracking-wider">Temporary Rates</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">{statistics.temporary}</p>
                </div>
            </div>

            {/* Rates Table */}
            {loading ? (
                <div className="bg-white rounded-xl border border-gray-200/80 p-12 flex items-center justify-center min-h-[300px]">
                    <LoadingDots tone="dark" className="mx-auto flex" />
                </div>
            ) : rates.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200/80 p-12 text-center shadow-xs">
                    <BoltIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-gray-900 mb-1">No Electrical Rates Configured</h3>
                    <p className="text-xs text-gray-500 mb-4">Add your first electrical rate configuration</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg transition"
                    >
                        <Plus size={16} />
                        Add Rate
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                <tr>
                                    <th className="px-5 py-3.5">Type</th>
                                    <th className="px-5 py-3.5">Rate per KW</th>
                                    <th className="px-5 py-3.5">Effective From</th>
                                    <th className="px-5 py-3.5">Effective To</th>
                                    <th className="px-5 py-3.5">Status</th>
                                    <th className="px-5 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                {rates.map((rate) => (
                                    <tr key={rate.id} className="hover:bg-gray-50/70 transition">
                                        <td className="px-5 py-3.5">
                                            {getTypeBadge(rate.type)}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-base font-bold text-[#003A77]">{formatCurrency(rate.ratePerKW)}</span>
                                            <span className="text-xs text-gray-500 ml-1">/KW</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-1.5 text-gray-700">
                                                <Calendar size={13} className="text-gray-400" />
                                                <span>{formatDate(rate.effectiveFrom)}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            {rate.effectiveTo ? (
                                                <div className="flex items-center gap-1.5 text-gray-700">
                                                    <Calendar size={13} className="text-gray-400" />
                                                    <span>{formatDate(rate.effectiveTo)}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs">No expiry</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                                rate.isActive 
                                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                                {rate.isActive ? <CheckCircle size={11} /> : <XCircle size={11} />}
                                                {rate.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleToggleStatus(rate.id, rate.isActive)}
                                                    className={`p-1.5 rounded-lg transition ${
                                                        rate.isActive
                                                            ? 'text-gray-400 hover:text-rose-600 hover:bg-rose-50'
                                                            : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'
                                                    }`}
                                                    title={rate.isActive ? "Deactivate" : "Activate"}
                                                >
                                                    {rate.isActive ? <XCircle size={15} /> : <CheckCircle size={15} />}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingRate(rate);
                                                        setFormData({
                                                            type: rate.type,
                                                            ratePerKW: rate.ratePerKW.toString(),
                                                            effectiveFrom: rate.effectiveFrom,
                                                            effectiveTo: rate.effectiveTo || '',
                                                            description: rate.description || '',
                                                        });
                                                        setShowModal(true);
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-[#003A77] hover:bg-gray-100 rounded-lg transition"
                                                    title="Edit"
                                                >
                                                    <Edit size={15} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(rate.id, rate.ratePerKW)}
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
                                {editingRate ? 'Edit Electrical Rate' : 'Add New Electrical Rate'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition">
                                <X size={18} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Rate Type <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1]"
                                >
                                    <option value="both">Both (Exhibition & Temporary)</option>
                                    <option value="exhibition">Exhibition Only</option>
                                    <option value="temporary">Temporary Only</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Rate per KW (₹) <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                    <input
                                        type="number"
                                        value={formData.ratePerKW}
                                        onChange={(e) => setFormData({ ...formData, ratePerKW: e.target.value })}
                                        className="w-full pl-7 pr-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                        placeholder="3500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Effective From <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.effectiveFrom}
                                    onChange={(e) => setFormData({ ...formData, effectiveFrom: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Effective To (Optional)
                                </label>
                                <input
                                    type="date"
                                    value={formData.effectiveTo}
                                    onChange={(e) => setFormData({ ...formData, effectiveTo: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                />
                                <p className="text-[11px] text-gray-400 mt-1">Leave empty for no expiry</p>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Description (Optional)
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                    placeholder="Additional notes about this rate"
                                />
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
                                    if (!formData.ratePerKW || !formData.effectiveFrom) {
                                        toast.error("Please fill all required fields");
                                        return;
                                    }

                                    try {
                                        if (editingRate) {
                                            const response = await updateElectricalRate(editingRate.id, {
                                                type: formData.type,
                                                ratePerKW: parseInt(formData.ratePerKW),
                                                effectiveFrom: formData.effectiveFrom,
                                                effectiveTo: formData.effectiveTo || null,
                                                description: formData.description,
                                            });
                                            if (response.success) {
                                                toast.success("Electrical rate updated successfully");
                                                setShowModal(false);
                                                fetchRates();
                                            } else {
                                                toast.error(response.message || "Failed to update");
                                            }
                                        } else {
                                            const response = await createElectricalRate({
                                                type: formData.type,
                                                ratePerKW: parseInt(formData.ratePerKW),
                                                effectiveFrom: formData.effectiveFrom,
                                                effectiveTo: formData.effectiveTo || null,
                                                description: formData.description,
                                            });
                                            if (response.success) {
                                                toast.success("Electrical rate created successfully");
                                                setShowModal(false);
                                                fetchRates();
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
                                {editingRate ? 'Update Rate' : 'Create Rate'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
