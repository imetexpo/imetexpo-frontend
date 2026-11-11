// app/admin/bookings/page.tsx
"use client";

import { useState } from "react";
import { Search, Eye, CheckCircle, Clock, XCircle, Download, Calendar, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

interface Booking {
    id: string;
    company: string;
    boothNumber: string;
    boothSize: string;
    bookingDate: string;
    amount: string;
    status: "confirmed" | "pending" | "cancelled" | "payment_due";
    paymentStatus: "paid" | "pending" | "overdue";
}

const sampleBookings: Booking[] = [
    { id: "B001", company: "Hexagon Metrology", boothNumber: "A-101", boothSize: "9x9 m", bookingDate: "2024-01-15", amount: "₹1,50,000", status: "confirmed", paymentStatus: "paid" },
    { id: "B002", company: "Carl Zeiss India", boothNumber: "B-205", boothSize: "12x12 m", bookingDate: "2024-01-14", amount: "₹2,00,000", status: "pending", paymentStatus: "pending" },
    { id: "B003", company: "Mitutoyo South Asia", boothNumber: "C-312", boothSize: "15x15 m", bookingDate: "2024-01-13", amount: "₹2,50,000", status: "confirmed", paymentStatus: "paid" },
    { id: "B004", company: "Renishaw Metrology", boothNumber: "D-408", boothSize: "9x9 m", bookingDate: "2024-01-12", amount: "₹1,50,000", status: "cancelled", paymentStatus: "pending" },
    { id: "B005", company: "Faro Technologies", boothNumber: "E-515", boothSize: "12x12 m", bookingDate: "2024-01-11", amount: "₹2,00,000", status: "confirmed", paymentStatus: "pending" },
    { id: "B006", company: "Tokyo Seimitsu", boothNumber: "F-620", boothSize: "15x15 m", bookingDate: "2024-01-10", amount: "₹2,50,000", status: "confirmed", paymentStatus: "paid" },
];

const statusColors = {
    confirmed: { bg: "bg-emerald-50 text-emerald-700 border border-emerald-200/80", icon: CheckCircle, label: "Confirmed" },
    pending: { bg: "bg-amber-50 text-amber-700 border border-amber-200/80", icon: Clock, label: "Pending" },
    cancelled: { bg: "bg-rose-50 text-rose-700 border border-rose-200/80", icon: XCircle, label: "Cancelled" },
    payment_due: { bg: "bg-orange-50 text-orange-700 border border-orange-200/80", icon: DollarSign, label: "Payment Due" },
};

const paymentStatusColors = {
    paid: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    pending: "bg-amber-50 text-amber-700 border border-amber-200/80",
    overdue: "bg-rose-50 text-rose-700 border border-rose-200/80",
};

export default function BookingsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    const filteredBookings = sampleBookings.filter(booking => {
        const matchesSearch = booking.company.toLowerCase().includes(search.toLowerCase()) ||
            booking.boothNumber.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
        const matchesPayment = paymentFilter === "all" || booking.paymentStatus === paymentFilter;
        return matchesSearch && matchesStatus && matchesPayment;
    });

    const totalAmount = filteredBookings.reduce((sum, b) => sum + parseInt(b.amount.replace(/[^0-9]/g, "")), 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Booth Bookings</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and track all exhibition booth reservations</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-gray-700 text-sm font-medium transition flex items-center gap-2 cursor-pointer shadow-2xs">
                    <Download size={16} className="text-gray-500" />
                    Export Report
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-gray-900">{sampleBookings.length}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Total Bookings</p>
                </div>
                <div className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-emerald-700">{sampleBookings.filter(b => b.status === "confirmed").length}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-0.5">Confirmed</p>
                </div>
                <div className="bg-amber-50/40 rounded-xl p-4 border border-amber-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-amber-700">{sampleBookings.filter(b => b.status === "pending").length}</p>
                    <p className="text-xs text-amber-600 font-medium mt-0.5">Pending Review</p>
                </div>
                <div className="bg-sky-50/40 rounded-xl p-4 border border-sky-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-[#003A77]">₹{totalAmount.toLocaleString()}</p>
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
                            placeholder="Search by company or booth number..."
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
                        <option value="all">All Booking Status</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="payment_due">Payment Due</option>
                    </select>
                    <select
                        value={paymentFilter}
                        onChange={(e) => setPaymentFilter(e.target.value)}
                        className="px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                    >
                        <option value="all">All Payments</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                    </select>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/80 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Booking ID</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Booth</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredBookings.map((booking) => {
                                const statusConfig = statusColors[booking.status] || statusColors.pending;
                                const StatusIcon = statusConfig.icon;
                                const payClass = paymentStatusColors[booking.paymentStatus] || paymentStatusColors.pending;
                                return (
                                    <tr key={booking.id} className="hover:bg-slate-50/70 transition-colors">
                                        <td className="px-6 py-4 font-mono font-semibold text-[#003A77] text-sm">{booking.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900 text-sm">{booking.company}</td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">{booking.boothNumber}</p>
                                                <p className="text-xs text-gray-400">{booking.boothSize}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-[#003A77] text-sm">{booking.amount}</td>
                                        <td className="px-6 py-4 text-xs text-gray-500">{booking.bookingDate}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-2xs ${statusConfig.bg}`}>
                                                <StatusIcon size={12} />
                                                {statusConfig.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-2xs capitalize ${payClass}`}>
                                                {booking.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/admin/bookings/${booking.id}`} className="p-1.5 text-gray-500 hover:text-[#003A77] hover:bg-slate-100 rounded-lg transition inline-flex">
                                                <Eye size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredBookings.length === 0 && (
                    <div className="text-center py-16">
                        <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-2.5" />
                        <p className="text-gray-500 font-medium">No bookings found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
