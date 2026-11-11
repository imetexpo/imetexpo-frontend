// app/admin/financial/payments/page.tsx
"use client";

import { useState } from "react";
import { Search, Eye, Download, Filter, CheckCircle, XCircle, Clock, DollarSign, Receipt, CreditCard, Banknote } from "lucide-react";
import Link from "next/link";

interface Payment {
    id: string;
    invoiceId: string;
    company: string;
    boothNumber: string;
    amount: string;
    method: "card" | "bank" | "cash" | "upi";
    status: "completed" | "pending" | "failed" | "refunded";
    transactionId: string;
    date: string;
}

const samplePayments: Payment[] = [
    { id: "PAY001", invoiceId: "INV-2024-001", company: "Hexagon Metrology", boothNumber: "A-101", amount: "₹1,50,000", method: "card", status: "completed", transactionId: "TXN123456", date: "2024-01-15" },
    { id: "PAY002", invoiceId: "INV-2024-002", company: "Carl Zeiss India", boothNumber: "B-205", amount: "₹2,00,000", method: "bank", status: "pending", transactionId: "TXN123457", date: "2024-01-14" },
    { id: "PAY003", invoiceId: "INV-2024-003", company: "Mitutoyo South Asia", boothNumber: "C-312", amount: "₹2,50,000", method: "upi", status: "completed", transactionId: "TXN123458", date: "2024-01-13" },
    { id: "PAY004", invoiceId: "INV-2024-004", company: "Renishaw Metrology", boothNumber: "D-408", amount: "₹1,50,000", method: "card", status: "failed", transactionId: "TXN123459", date: "2024-01-12" },
    { id: "PAY005", invoiceId: "INV-2024-005", company: "Faro Technologies", boothNumber: "E-515", amount: "₹2,00,000", method: "bank", status: "completed", transactionId: "TXN123460", date: "2024-01-11" },
    { id: "PAY006", invoiceId: "INV-2024-006", company: "Tokyo Seimitsu", boothNumber: "F-620", amount: "₹2,50,000", method: "cash", status: "completed", transactionId: "TXN123461", date: "2024-01-10" },
    { id: "PAY007", invoiceId: "INV-2024-007", company: "Taylor Hobson", boothNumber: "G-725", amount: "₹1,80,000", method: "upi", status: "refunded", transactionId: "TXN123462", date: "2024-01-09" },
];

const getMethodIcon = (method: string) => {
    switch (method) {
        case "card": return <CreditCard size={14} />;
        case "bank": return <Banknote size={14} />;
        case "cash": return <DollarSign size={14} />;
        case "upi": return <CreditCard size={14} />;
        default: return <Receipt size={14} />;
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "completed": return "bg-emerald-50 text-emerald-700 border border-emerald-200/80";
        case "pending": return "bg-amber-50 text-amber-700 border border-amber-200/80";
        case "failed": return "bg-rose-50 text-rose-700 border border-rose-200/80";
        case "refunded": return "bg-orange-50 text-orange-700 border border-orange-200/80";
        default: return "bg-gray-100 text-gray-600 border border-gray-200";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "completed": return <CheckCircle size={14} />;
        case "pending": return <Clock size={14} />;
        case "failed": return <XCircle size={14} />;
        case "refunded": return <XCircle size={14} />;
        default: return <Clock size={14} />;
    }
};

export default function PaymentsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [methodFilter, setMethodFilter] = useState("all");

    const filteredPayments = samplePayments.filter(payment => {
        const matchesSearch = payment.company.toLowerCase().includes(search.toLowerCase()) ||
            payment.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
            payment.transactionId.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
        const matchesMethod = methodFilter === "all" || payment.method === methodFilter;
        return matchesSearch && matchesStatus && matchesMethod;
    });

    const totalAmount = filteredPayments.reduce((sum, p) => {
        const amountNum = parseInt(p.amount.replace(/[^0-9]/g, ""));
        return sum + amountNum;
    }, 0);

    const completedAmount = filteredPayments.filter(p => p.status === "completed").reduce((sum, p) => {
        const amountNum = parseInt(p.amount.replace(/[^0-9]/g, ""));
        return sum + amountNum;
    }, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payments</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and audit all exhibitor payment transactions</p>
                </div>
                <button className="px-4 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-gray-700 text-sm font-medium transition flex items-center gap-2 cursor-pointer shadow-2xs">
                    <Download size={16} className="text-gray-500" />
                    Export Report
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-gray-900">{samplePayments.length}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Total Transactions</p>
                </div>
                <div className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-emerald-700">₹{(completedAmount / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-emerald-600 font-medium mt-0.5">Completed</p>
                </div>
                <div className="bg-amber-50/40 rounded-xl p-4 border border-amber-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-amber-700">{samplePayments.filter(p => p.status === "pending").length}</p>
                    <p className="text-xs text-amber-600 font-medium mt-0.5">Pending</p>
                </div>
                <div className="bg-sky-50/40 rounded-xl p-4 border border-sky-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-[#003A77]">₹{(totalAmount / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-sky-700 font-medium mt-0.5">Total Value</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by company, invoice, or transaction ID..."
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
                        <option value="all">All Payment Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                    <select
                        value={methodFilter}
                        onChange={(e) => setMethodFilter(e.target.value)}
                        className="px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                    >
                        <option value="all">All Methods</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="upi">UPI</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/80 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment ID</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Invoice</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Method</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-slate-50/70 transition-colors">
                                    <td className="px-6 py-4 font-mono font-semibold text-[#003A77] text-sm">{payment.id}</td>
                                    <td className="px-6 py-4 text-xs font-mono text-gray-500">{payment.invoiceId}</td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-gray-900 text-sm">{payment.company}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">Booth: {payment.boothNumber}</p>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-[#003A77] text-sm">{payment.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 border border-gray-200 text-gray-700">
                                            {getMethodIcon(payment.method)}
                                            {payment.method.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-2xs ${getStatusColor(payment.status)}`}>
                                            {getStatusIcon(payment.status)}
                                            <span className="capitalize">{payment.status}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-500">{payment.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <Link href={`/admin/financial/payments/${payment.id}`} className="p-1.5 text-gray-500 hover:text-[#003A77] hover:bg-slate-100 rounded-lg transition inline-flex">
                                                <Eye size={16} />
                                            </Link>
                                            <button className="p-1.5 text-gray-500 hover:text-[#00A1B1] hover:bg-teal-50 rounded-lg transition inline-flex cursor-pointer">
                                                <Download size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPayments.length === 0 && (
                    <div className="text-center py-16">
                        <DollarSign className="h-10 w-10 text-gray-300 mx-auto mb-2.5" />
                        <p className="text-gray-500 font-medium">No payments found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
