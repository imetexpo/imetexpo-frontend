// app/admin/financial/revenue/page.tsx
"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Calendar, Download, Filter, PieChart, BarChart3 } from "lucide-react";

interface RevenueMetric {
    title: string;
    value: string;
    change: string;
    trend: "up" | "down";
    colorScheme: string;
}

const metrics: RevenueMetric[] = [
    { title: "Total Revenue", value: "₹45,20,000", change: "+23%", trend: "up", colorScheme: "text-emerald-700 bg-emerald-50 border-emerald-200/80" },
    { title: "Booth Sales", value: "₹32,50,000", change: "+18%", trend: "up", colorScheme: "text-[#003A77] bg-sky-50 border-sky-200/80" },
    { title: "Add-on Services", value: "₹8,70,000", change: "+35%", trend: "up", colorScheme: "text-teal-700 bg-teal-50 border-teal-200/80" },
    { title: "Pending Collections", value: "₹3,50,000", change: "-12%", trend: "down", colorScheme: "text-amber-700 bg-amber-50 border-amber-200/80" },
];

const monthlyRevenue = [
    { month: "Jan", amount: 320000, addons: 65000 },
    { month: "Feb", amount: 280000, addons: 58000 },
    { month: "Mar", amount: 350000, addons: 72000 },
    { month: "Apr", amount: 420000, addons: 85000 },
    { month: "May", amount: 380000, addons: 78000 },
    { month: "Jun", amount: 450000, addons: 92000 },
];

const revenueByCategory = [
    { category: "Standard Booths", percentage: 35, amount: "₹15,82,000" },
    { category: "Corner Booths", percentage: 25, amount: "₹11,30,000" },
    { category: "Double Booths", percentage: 20, amount: "₹9,04,000" },
    { category: "Island Booths", percentage: 12, amount: "₹5,42,400" },
    { category: "Add-on Services", percentage: 8, amount: "₹3,61,600" },
];

export default function RevenuePage() {
    const [period, setPeriod] = useState("year");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Revenue Analytics</h1>
                    <p className="text-sm text-gray-500 mt-1">Track and analyze exhibition financial performance</p>
                </div>
                <div className="flex items-center gap-2.5">
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                    <button className="px-4 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-gray-700 text-sm font-medium transition flex items-center gap-2 cursor-pointer shadow-2xs">
                        <Download size={16} className="text-gray-500" />
                        Export
                    </button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => (
                    <div key={metric.title} className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-gray-500 text-xs font-medium">{metric.title}</p>
                            <div className={`p-2 rounded-xl border ${metric.colorScheme}`}>
                                <DollarSign className="h-4 w-4" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                            {metric.trend === "up" ? (
                                <TrendingUp size={14} className="text-emerald-600" />
                            ) : (
                                <TrendingDown size={14} className="text-rose-600" />
                            )}
                            <span className={`text-xs font-semibold ${metric.trend === "up" ? "text-emerald-600" : "text-rose-600"}`}>
                                {metric.change}
                            </span>
                            <span className="text-xs text-gray-400 ml-1">vs last period</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">Revenue Trend</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Monthly breakdown of booth & addon collections</p>
                        </div>
                        <BarChart3 className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="h-80">
                        <div className="h-full flex flex-col justify-end">
                            <div className="flex justify-around items-end h-64 border-b border-gray-100 pb-2">
                                {monthlyRevenue.map((data, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-2 w-16">
                                        <div className="relative w-full flex flex-col items-center">
                                            <div
                                                className="w-10 bg-[#00A1B1] rounded-t-sm shadow-xs transition-all hover:opacity-90"
                                                style={{ height: `${(data.addons / 500000) * 80}px` }}
                                                title={`Addons: ₹${data.addons.toLocaleString()}`}
                                            ></div>
                                            <div
                                                className="w-10 bg-[#003A77] rounded-b-sm shadow-xs transition-all hover:opacity-90"
                                                style={{ height: `${(data.amount / 500000) * 140}px` }}
                                                title={`Booth Sales: ₹${data.amount.toLocaleString()}`}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-500 font-medium">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-6 mt-4 pt-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm bg-[#003A77]"></div>
                                    <span className="text-xs text-gray-600 font-medium">Booth Sales</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-sm bg-[#00A1B1]"></div>
                                    <span className="text-xs text-gray-600 font-medium">Add-on Services</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revenue by Category */}
                <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">Revenue by Category</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Allocation by stall configuration type</p>
                        </div>
                        <PieChart className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {revenueByCategory.map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-xs font-medium mb-1.5">
                                    <span className="text-gray-700">{item.category}</span>
                                    <div className="flex gap-3">
                                        <span className="text-gray-400">{item.percentage}%</span>
                                        <span className="font-semibold text-[#003A77]">{item.amount}</span>
                                    </div>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#003A77] to-[#00A1B1] rounded-full"
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total Summary */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 font-medium">Total Exhibition Projected</span>
                            <span className="text-xl font-bold text-[#003A77]">₹45,20,000</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500 font-medium">Average Per Exhibitor</span>
                            <span className="text-sm font-semibold text-gray-800">₹2,89,743</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                    <h3 className="text-base font-semibold text-gray-900">Recent Transactions</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {[
                        { company: "Hexagon Metrology", amount: "₹1,77,000", date: "2024-01-15", status: "completed" },
                        { company: "Mitutoyo South Asia", amount: "₹2,95,000", date: "2024-01-13", status: "completed" },
                        { company: "Carl Zeiss India", amount: "₹2,36,000", date: "2024-01-14", status: "pending" },
                        { company: "Renishaw Metrology", amount: "₹1,77,000", date: "2024-01-12", status: "failed" },
                    ].map((transaction, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 px-6 hover:bg-slate-50/70 transition-colors">
                            <div>
                                <p className="font-semibold text-gray-900 text-sm">{transaction.company}</p>
                                <p className="text-xs text-gray-400 mt-0.5">{transaction.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-[#003A77] text-sm">{transaction.amount}</p>
                                <span className={`inline-block text-xs font-medium capitalize mt-0.5 ${
                                    transaction.status === "completed" ? "text-emerald-600" : transaction.status === "pending" ? "text-amber-600" : "text-rose-600"
                                }`}>
                                    {transaction.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
