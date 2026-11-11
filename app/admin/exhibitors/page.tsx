// app/admin/exhibitors/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit, Trash2, Mail, Phone, Building, CheckCircle, Clock, XCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { getExhibitors, deleteExhibitor, resendCredentials, Exhibitor } from "@/lib/api/exhibitors";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';

const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { icon: any; color: string; label: string }> = {
        approved: { icon: CheckCircle, color: "bg-emerald-50 text-emerald-700 border border-emerald-200/80", label: "Active" },
        active: { icon: CheckCircle, color: "bg-emerald-50 text-emerald-700 border border-emerald-200/80", label: "Active" },
        pending: { icon: Clock, color: "bg-amber-50 text-amber-700 border border-amber-200/80", label: "Pending" },
        rejected: { icon: XCircle, color: "bg-rose-50 text-rose-700 border border-rose-200/80", label: "Rejected" },
        inactive: { icon: XCircle, color: "bg-gray-100 text-gray-600 border border-gray-200", label: "Inactive" },
    };
    return statusMap[status] || statusMap.pending;
};

export default function ExhibitorsPage() {
    const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });

    const fetchExhibitors = async () => {
        try {
            setLoading(true);
            const response = await getExhibitors({
                page: pagination.page,
                limit: pagination.limit,
                search: search || undefined,
                status: statusFilter !== "all" ? statusFilter : undefined,
            });

            if (response.success) {
                setExhibitors(response.data);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error("Failed to fetch exhibitors:", error);
            toast.error("Failed to load exhibitors");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExhibitors();
    }, [pagination.page, statusFilter]);

    const handleSearch = () => {
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchExhibitors();
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                await deleteExhibitor(id);
                toast.success("Exhibitor deleted successfully");
                fetchExhibitors();
            } catch (error) {
                toast.error("Failed to delete exhibitor");
            }
        }
    };

    const handleResendCredentials = async (id: string, email: string) => {
        try {
            const response = await resendCredentials(id);
            if (response.success) {
                toast.success(`Credentials sent to ${email}`);
            }
        } catch (error) {
            toast.error("Failed to send credentials");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Exhibitors</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage all exhibition exhibitors</p>
                </div>
                <Link
                    href="/admin/exhibitors/new"
                    className="px-4 py-2.5 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm hover:shadow transition-all font-medium flex items-center gap-2 cursor-pointer"
                >
                    <Plus size={18} />
                    Add Exhibitor
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, company, or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPagination(prev => ({ ...prev, page: 1 }));
                        }}
                        className="px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="approved">Active</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <button
                        onClick={fetchExhibitors}
                        className="px-4 py-2.5 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition flex items-center justify-center gap-2 text-sm font-medium cursor-pointer shadow-2xs"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Exhibitors Table */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/80 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Booth</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <LoadingDots tone="dark" className="mx-auto flex" />
                                        <p className="text-gray-500 mt-2 text-sm">Loading exhibitors...</p>
                                    </td>
                                </tr>
                            ) : exhibitors.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <Building className="h-10 w-10 text-gray-300 mx-auto mb-2.5" />
                                        <p className="text-gray-500 font-medium">No exhibitors found</p>
                                    </td>
                                </tr>
                            ) : (
                                exhibitors.map((exhibitor) => {
                                    const badge = getStatusBadge(exhibitor.status);
                                    const StatusIcon = badge.icon;
                                    return (
                                        <tr key={exhibitor.id} className="hover:bg-slate-50/70 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-[#003A77]/10 flex items-center justify-center shrink-0">
                                                        <Building className="h-5 w-5 text-[#003A77]" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900 text-sm">{exhibitor.company}</p>
                                                        <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {exhibitor.id.slice(0, 8)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900 text-sm">{exhibitor.name}</p>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                                    <span className="text-xs text-gray-500">{exhibitor.email}</span>
                                                </div>
                                                {exhibitor.phone && (
                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                        <Phone className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                                                        <span className="text-xs text-gray-500">{exhibitor.phone}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-[#003A77] text-sm">
                                                {exhibitor.boothNumber || <span className="text-gray-400 font-normal text-xs italic">Not assigned</span>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-2xs ${badge.color}`}>
                                                    <StatusIcon size={12} />
                                                    {badge.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Link
                                                        href={`/admin/exhibitors/${exhibitor.id}`}
                                                        className="p-1.5 text-gray-500 hover:text-[#003A77] hover:bg-slate-100 rounded-lg transition"
                                                        title="View Details"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/exhibitors/${exhibitor.id}/edit`}
                                                        className="p-1.5 text-gray-500 hover:text-[#00A1B1] hover:bg-teal-50 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleResendCredentials(exhibitor.id, exhibitor.email)}
                                                        className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer"
                                                        title="Resend Credentials"
                                                    >
                                                        <Mail size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(exhibitor.id, exhibitor.company)}
                                                        className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-3.5 border-t border-gray-200 bg-white gap-3">
                        <span className="text-xs text-gray-500">
                            Showing <span className="font-medium text-gray-700">{((pagination.page - 1) * pagination.limit) + 1}</span> to <span className="font-medium text-gray-700">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of <span className="font-medium text-gray-700">{pagination.total}</span>
                        </span>
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                disabled={pagination.page === 1}
                                className="px-3 py-1.5 border border-gray-300 bg-white text-gray-700 text-xs font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition cursor-pointer"
                            >
                                Previous
                            </button>
                            <span className="px-3 py-1.5 bg-[#003A77] text-white text-xs font-semibold rounded-lg shadow-2xs">
                                {pagination.page}
                            </span>
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                disabled={pagination.page === pagination.totalPages}
                                className="px-3 py-1.5 border border-gray-300 bg-white text-gray-700 text-xs font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
