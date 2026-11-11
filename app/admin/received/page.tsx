// app/admin/received/page.tsx
"use client";

import { useState } from "react";
import { Eye, CheckCircle, XCircle, Clock, Search, Package, Users, Wrench, Filter, Download } from "lucide-react";
import Link from "next/link";

interface Requirement {
    id: string;
    company: string;
    boothNumber: string;
    contactPerson: string;
    requestType: string;
    description: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "approved" | "rejected" | "completed";
    submittedAt: string;
}

const sampleRequirements: Requirement[] = [
    { id: "REQ001", company: "Hexagon Metrology", boothNumber: "A-101", contactPerson: "Rajesh Kumar", requestType: "Extra 3-Phase Power", description: "Need additional 32A 3-phase outlet for CMM machine demonstration", priority: "high", status: "pending", submittedAt: "2024-01-15" },
    { id: "REQ002", company: "Carl Zeiss India", boothNumber: "B-205", contactPerson: "Sundar P", requestType: "Dedicated WiFi", description: "High-speed dedicated lease line for live cloud telemetry", priority: "medium", status: "approved", submittedAt: "2024-01-14" },
    { id: "REQ003", company: "Mitutoyo South Asia", boothNumber: "C-312", contactPerson: "Kenji Tanaka", requestType: "LED Wall Display", description: "65\" Ultra-HD 4K display for optical measurement showcase", priority: "high", status: "pending", submittedAt: "2024-01-13" },
    { id: "REQ004", company: "Renishaw Metrology", boothNumber: "D-408", contactPerson: "Anil Sharma", requestType: "Executive Furniture", description: "2 glass tables and 8 cushioned executive chairs", priority: "low", status: "completed", submittedAt: "2024-01-12" },
    { id: "REQ005", company: "Faro Technologies", boothNumber: "E-515", contactPerson: "Vikram Singh", requestType: "Security Guard", description: "Overnight dedicated security guard for portable laser scanners", priority: "high", status: "pending", submittedAt: "2024-01-11" },
    { id: "REQ006", company: "Tokyo Seimitsu", boothNumber: "F-620", contactPerson: "Mark Weber", requestType: "Compressed Air", description: "6 bar continuous compressed air connection", priority: "medium", status: "approved", submittedAt: "2024-01-10" },
];

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "high": return "bg-rose-50 text-rose-700 border border-rose-200/80";
        case "medium": return "bg-amber-50 text-amber-700 border border-amber-200/80";
        case "low": return "bg-emerald-50 text-emerald-700 border border-emerald-200/80";
        default: return "bg-gray-100 text-gray-600 border border-gray-200";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "pending": return <Clock size={12} />;
        case "approved": return <CheckCircle size={12} />;
        case "rejected": return <XCircle size={12} />;
        case "completed": return <CheckCircle size={12} />;
        default: return <Clock size={12} />;
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "pending": return "bg-amber-50 text-amber-700 border border-amber-200/80";
        case "approved": return "bg-emerald-50 text-emerald-700 border border-emerald-200/80";
        case "rejected": return "bg-rose-50 text-rose-700 border border-rose-200/80";
        case "completed": return "bg-sky-50 text-[#003A77] border border-sky-200/80";
        default: return "bg-gray-100 text-gray-600 border border-gray-200";
    }
};

export default function ReceivedRequirementsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredRequirements = sampleRequirements.filter(req => {
        const matchesSearch = req.company.toLowerCase().includes(search.toLowerCase()) ||
            req.requestType.toLowerCase().includes(search.toLowerCase()) ||
            req.boothNumber.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || req.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Extra Requirements Received</h1>
                    <p className="text-sm text-gray-500 mt-1">Review, approve, and manage custom utility orders from exhibitors</p>
                </div>
                <button className="px-4 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-gray-700 text-sm font-medium transition flex items-center gap-2 cursor-pointer shadow-2xs">
                    <Download size={16} className="text-gray-500" />
                    Export
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <div className="flex items-center gap-2 text-gray-500 mb-1.5">
                        <Package size={16} className="text-[#003A77]" />
                        <span className="text-xs font-medium">Total Requests</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{sampleRequirements.length}</p>
                </div>
                <div className="bg-amber-50/40 rounded-xl p-4 border border-amber-200/80 shadow-xs">
                    <div className="flex items-center gap-2 text-amber-700 mb-1.5">
                        <Clock size={16} />
                        <span className="text-xs font-medium">Pending Review</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-700">{sampleRequirements.filter(r => r.status === "pending").length}</p>
                </div>
                <div className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-200/80 shadow-xs">
                    <div className="flex items-center gap-2 text-emerald-700 mb-1.5">
                        <CheckCircle size={16} />
                        <span className="text-xs font-medium">Approved</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-700">{sampleRequirements.filter(r => r.status === "approved").length}</p>
                </div>
                <div className="bg-sky-50/40 rounded-xl p-4 border border-sky-200/80 shadow-xs">
                    <div className="flex items-center gap-2 text-[#003A77] mb-1.5">
                        <CheckCircle size={16} />
                        <span className="text-xs font-medium">Fulfilled</span>
                    </div>
                    <p className="text-2xl font-bold text-[#003A77]">{sampleRequirements.filter(r => r.status === "completed").length}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by company, booth number, or request type..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                    >
                        <option value="all">All Request Status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Requirements Table */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/80 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Submitted</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredRequirements.map((req) => (
                                <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                                    <td className="px-6 py-4 font-mono font-semibold text-[#003A77] text-sm">{req.id}</td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-gray-900 text-sm">{req.company}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">Booth: {req.boothNumber}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <Wrench size={14} className="text-[#00A1B1] shrink-0" />
                                            <span className="text-sm font-medium text-gray-800">{req.requestType}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-600 max-w-xs truncate">{req.description}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize shadow-2xs ${getPriorityColor(req.priority)}`}>
                                            {req.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-2xs capitalize ${getStatusColor(req.status)}`}>
                                            {getStatusIcon(req.status)}
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-500">{req.submittedAt}</td>
                                    <td className="px-6 py-4">
                                        <Link href={`/admin/received/${req.id}`} className="p-1.5 text-gray-500 hover:text-[#003A77] hover:bg-slate-100 rounded-lg transition inline-flex">
                                            <Eye size={16} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredRequirements.length === 0 && (
                    <div className="text-center py-16">
                        <Package className="h-10 w-10 text-gray-300 mx-auto mb-2.5" />
                        <p className="text-gray-500 font-medium">No requirements found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
