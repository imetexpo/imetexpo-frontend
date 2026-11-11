// app/admin/financial/invoices/page.tsx
"use client";

import { useState } from "react";
import { Search, Eye, Download, Printer, CheckCircle, Clock, XCircle, FileText, DollarSign } from "lucide-react";
import Link from "next/link";

interface Invoice {
    id: string;
    invoiceNumber: string;
    company: string;
    boothNumber: string;
    amount: string;
    tax: string;
    total: string;
    status: "paid" | "pending" | "overdue" | "draft";
    issueDate: string;
    dueDate: string;
}

const sampleInvoices: Invoice[] = [
    { id: "1", invoiceNumber: "INV-2024-001", company: "Hexagon Metrology", boothNumber: "A-101", amount: "₹1,50,000", tax: "₹27,000", total: "₹1,77,000", status: "paid", issueDate: "2024-01-01", dueDate: "2024-01-15" },
    { id: "2", invoiceNumber: "INV-2024-002", company: "Carl Zeiss India", boothNumber: "B-205", amount: "₹2,00,000", tax: "₹36,000", total: "₹2,36,000", status: "pending", issueDate: "2024-01-05", dueDate: "2024-01-20" },
    { id: "3", invoiceNumber: "INV-2024-003", company: "Mitutoyo South Asia", boothNumber: "C-312", amount: "₹2,50,000", tax: "₹45,000", total: "₹2,95,000", status: "paid", issueDate: "2024-01-10", dueDate: "2024-01-25" },
    { id: "4", invoiceNumber: "INV-2024-004", company: "Renishaw Metrology", boothNumber: "D-408", amount: "₹1,50,000", tax: "₹27,000", total: "₹1,77,000", status: "overdue", issueDate: "2024-01-15", dueDate: "2024-01-30" },
    { id: "5", invoiceNumber: "INV-2024-005", company: "Faro Technologies", boothNumber: "E-515", amount: "₹2,00,000", tax: "₹36,000", total: "₹2,36,000", status: "draft", issueDate: "2024-01-20", dueDate: "2024-02-04" },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "paid": return "bg-emerald-50 text-emerald-700 border border-emerald-200/80";
        case "pending": return "bg-amber-50 text-amber-700 border border-amber-200/80";
        case "overdue": return "bg-rose-50 text-rose-700 border border-rose-200/80";
        case "draft": return "bg-gray-100 text-gray-600 border border-gray-200";
        default: return "bg-gray-100 text-gray-600 border border-gray-200";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "paid": return <CheckCircle size={14} />;
        case "pending": return <Clock size={14} />;
        case "overdue": return <XCircle size={14} />;
        case "draft": return <FileText size={14} />;
        default: return <Clock size={14} />;
    }
};

export default function InvoicesPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredInvoices = sampleInvoices.filter(invoice => {
        const matchesSearch = invoice.company.toLowerCase().includes(search.toLowerCase()) ||
            invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = filteredInvoices.reduce((sum, inv) => {
        const totalNum = parseInt(inv.total.replace(/[^0-9]/g, ""));
        return sum + totalNum;
    }, 0);

    const paidRevenue = filteredInvoices.filter(inv => inv.status === "paid").reduce((sum, inv) => {
        const totalNum = parseInt(inv.total.replace(/[^0-9]/g, ""));
        return sum + totalNum;
    }, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Invoices</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and issue exhibitor invoices</p>
                </div>
                <button className="px-4 py-2.5 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm hover:shadow transition flex items-center gap-2 text-sm font-medium cursor-pointer">
                    <FileText size={16} />
                    Create Invoice
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-gray-900">{sampleInvoices.length}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Total Invoices</p>
                </div>
                <div className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-emerald-700">₹{(paidRevenue / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-emerald-600 font-medium mt-0.5">Paid Amount</p>
                </div>
                <div className="bg-amber-50/40 rounded-xl p-4 border border-amber-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-amber-700">{sampleInvoices.filter(i => i.status === "pending").length}</p>
                    <p className="text-xs text-amber-600 font-medium mt-0.5">Pending</p>
                </div>
                <div className="bg-rose-50/40 rounded-xl p-4 border border-rose-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-rose-700">{sampleInvoices.filter(i => i.status === "overdue").length}</p>
                    <p className="text-xs text-rose-600 font-medium mt-0.5">Overdue</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by company or invoice number..."
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
                        <option value="all">All Invoice Status</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/80 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Invoice #</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Booth</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Tax (18%)</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-slate-50/70 transition-colors">
                                    <td className="px-6 py-4 font-mono font-semibold text-[#003A77] text-sm">{invoice.invoiceNumber}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 text-sm">{invoice.company}</td>
                                    <td className="px-6 py-4 font-medium text-[#003A77] text-xs">{invoice.boothNumber}</td>
                                    <td className="px-6 py-4 text-xs text-gray-600">{invoice.amount}</td>
                                    <td className="px-6 py-4 text-xs text-gray-400">{invoice.tax}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900 text-sm">{invoice.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-2xs ${getStatusColor(invoice.status)}`}>
                                            {getStatusIcon(invoice.status)}
                                            <span className="capitalize">{invoice.status}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-gray-500">{invoice.dueDate}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <Link href={`/admin/financial/invoices/${invoice.id}`} className="p-1.5 text-gray-500 hover:text-[#003A77] hover:bg-slate-100 rounded-lg transition inline-flex">
                                                <Eye size={16} />
                                            </Link>
                                            <button className="p-1.5 text-gray-500 hover:text-[#00A1B1] hover:bg-teal-50 rounded-lg transition inline-flex cursor-pointer">
                                                <Download size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition inline-flex cursor-pointer">
                                                <Printer size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredInvoices.length === 0 && (
                    <div className="text-center py-16">
                        <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2.5" />
                        <p className="text-gray-500 font-medium">No invoices found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
