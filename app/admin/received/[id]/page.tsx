// app/admin/received/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, XCircle, Clock, Package, User, Mail, Phone, Calendar, FileText, Building } from "lucide-react";
import LoadingDots from '@/components/ui/LoadingDots';

interface RequirementDetail {
    id: string;
    company: string;
    boothNumber: string;
    contactPerson: string;
    email: string;
    phone: string;
    requestType: string;
    description: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "approved" | "rejected" | "completed";
    submittedAt: string;
    adminNotes: string;
    items: { name: string; quantity: number; unitPrice: string; total: string }[];
}

const sampleRequirement: RequirementDetail = {
    id: "REQ001",
    company: "Sudeep Polymers (P) Ltd",
    boothNumber: "A47",
    contactPerson: "Mr. Devanand S",
    email: "devanand.s@sudeeppolymers.com",
    phone: "+91 91300 56911",
    requestType: "Extra Power Supply",
    description: "Need additional 15A power outlet for metallurgical testing and heavy equipment display",
    priority: "high",
    status: "pending",
    submittedAt: "2027-01-15",
    adminNotes: "",
    items: [
        { name: "Additional Power Outlet (15A)", quantity: 2, unitPrice: "₹3,000", total: "₹6,000" },
        { name: "Extension Cable (10m)", quantity: 2, unitPrice: "₹1,500", total: "₹3,000" },
        { name: "Voltage Stabilizer", quantity: 1, unitPrice: "₹5,000", total: "₹5,000" },
    ],
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "high": return "bg-rose-50 text-rose-700 border border-rose-200";
        case "medium": return "bg-amber-50 text-amber-700 border border-amber-200";
        case "low": return "bg-emerald-50 text-emerald-700 border border-emerald-200";
        default: return "bg-gray-100 text-gray-700 border border-gray-200";
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "pending": return "bg-amber-50 text-amber-700 border border-amber-200";
        case "approved": return "bg-emerald-50 text-emerald-700 border border-emerald-200";
        case "rejected": return "bg-rose-50 text-rose-700 border border-rose-200";
        case "completed": return "bg-blue-50 text-blue-700 border border-blue-200";
        default: return "bg-gray-100 text-gray-700 border border-gray-200";
    }
};

export default function RequirementDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [requirement, setRequirement] = useState(sampleRequirement);
    const [status, setStatus] = useState(requirement.status);
    const [adminNotes, setAdminNotes] = useState(requirement.adminNotes);
    const [updating, setUpdating] = useState(false);

    const handleUpdateStatus = () => {
        setUpdating(true);
        setTimeout(() => {
            setRequirement(prev => ({ ...prev, status: status as any, adminNotes }));
            setUpdating(false);
        }, 800);
    };

    const totalAmount = requirement.items.reduce((sum, item) => {
        const totalNum = parseInt(item.total.replace(/[^0-9]/g, ""));
        return sum + totalNum;
    }, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.back()} className="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-600 shadow-xs transition">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Requirement Details</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Request ID: {requirement.id}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleUpdateStatus}
                        disabled={updating}
                        className="px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg shadow-xs transition flex items-center gap-2"
                    >
                        {updating ? (
                            <LoadingDots size="sm" tone="light" />
                        ) : (
                            <CheckCircle size={16} />
                        )}
                        {updating ? "Updating..." : "Update Status"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Request Info */}
                    <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs">
                        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText size={18} className="text-[#00A1B1]" />
                            Request Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Request Type</p>
                                <p className="text-gray-900 font-semibold text-sm mt-1">{requirement.requestType}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</p>
                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getPriorityColor(requirement.priority)}`}>
                                    {requirement.priority.toUpperCase()}
                                </span>
                            </div>
                            <div className="col-span-2">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Description</p>
                                <p className="text-gray-700 text-sm mt-1 leading-relaxed">{requirement.description}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</p>
                                <div className="flex items-center gap-1.5 mt-1 text-gray-700 text-sm">
                                    <Calendar size={13} className="text-gray-400" />
                                    <span>{requirement.submittedAt}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Current Status</p>
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusColor(requirement.status)}`}>
                                    {requirement.status === "pending" && <Clock size={11} />}
                                    {requirement.status === "approved" && <CheckCircle size={11} />}
                                    {requirement.status === "rejected" && <XCircle size={11} />}
                                    {requirement.status.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-gray-200">
                            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                <Package size={18} className="text-[#00A1B1]" />
                                Requested Items
                            </h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-5 py-3.5">Item</th>
                                        <th className="px-5 py-3.5">Quantity</th>
                                        <th className="px-5 py-3.5">Unit Price</th>
                                        <th className="px-5 py-3.5 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-gray-700">
                                    {requirement.items.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/70 transition">
                                            <td className="px-5 py-3.5 font-medium text-gray-900">{item.name}</td>
                                            <td className="px-5 py-3.5 text-gray-600">{item.quantity}</td>
                                            <td className="px-5 py-3.5 text-gray-600">{item.unitPrice}</td>
                                            <td className="px-5 py-3.5 text-right font-semibold text-[#003A77]">{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-slate-50 border-t border-gray-200">
                                    <tr>
                                        <td colSpan={3} className="px-5 py-3.5 text-right text-xs font-semibold uppercase text-gray-700">Total Amount:</td>
                                        <td className="px-5 py-3.5 text-right text-base font-bold text-emerald-700">₹{totalAmount.toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Exhibitor Info */}
                    <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs">
                        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Building size={16} className="text-[#00A1B1]" />
                            Exhibitor Information
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2.5">
                                <Building size={15} className="text-gray-400" />
                                <span className="font-semibold text-gray-900">{requirement.company}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <User size={15} className="text-gray-400" />
                                <span className="text-gray-700">{requirement.contactPerson}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Mail size={15} className="text-gray-400" />
                                <span className="text-gray-700">{requirement.email}</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone size={15} className="text-gray-400" />
                                <span className="text-gray-700">{requirement.phone}</span>
                            </div>
                            <div className="pt-3 border-t border-gray-100">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Booth Number:</span>
                                <p className="text-gray-900 font-bold text-base mt-0.5">{requirement.boothNumber}</p>
                            </div>
                        </div>
                    </div>

                    {/* Status Update */}
                    <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs">
                        <h2 className="text-base font-bold text-gray-900 mb-4">Update Status</h2>
                        <div className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Action Status</label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value as any)}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1]"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Admin Notes</label>
                                <textarea
                                    placeholder="Add admin notes..."
                                    rows={3}
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
