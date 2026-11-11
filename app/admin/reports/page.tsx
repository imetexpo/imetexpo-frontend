// app/admin/reports/page.tsx
"use client";

import { useState } from "react";
import { Download, Calendar, TrendingUp, Users, Package, DollarSign, BarChart3, PieChart, FileText, Printer } from "lucide-react";

interface ReportCard {
    title: string;
    value: string;
    change: string;
    icon: any;
    colorClasses: string;
}

const reportStats: ReportCard[] = [
    { title: "Total Exhibitors", value: "156", change: "+12%", icon: Users, colorClasses: "bg-sky-50 text-[#003A77] border-sky-200" },
    { title: "Booths Booked", value: "89", change: "+8%", icon: Package, colorClasses: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { title: "Revenue Generated", value: "₹45.2L", change: "+23%", icon: DollarSign, colorClasses: "bg-teal-50 text-[#00A1B1] border-teal-200" },
    { title: "Products Listed", value: "1,284", change: "+18%", icon: TrendingUp, colorClasses: "bg-indigo-50 text-indigo-700 border-indigo-200" },
];

const recentReports = [
    { id: 1, name: "Exhibitor Registration Report", date: "2024-01-15", size: "2.4 MB", type: "PDF" },
    { id: 2, name: "Booth Booking Summary", date: "2024-01-14", size: "1.8 MB", type: "PDF" },
    { id: 3, name: "Revenue Report - January", date: "2024-01-13", size: "3.2 MB", type: "PDF" },
    { id: 4, name: "Product Category Analysis", date: "2024-01-12", size: "1.5 MB", type: "PDF" },
    { id: 5, name: "Visitor Traffic Report", date: "2024-01-11", size: "2.1 MB", type: "PDF" },
];

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState("month");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reports & Analytics</h1>
                    <p className="text-sm text-gray-500 mt-1">Generate, visualize, and download comprehensive exhibition reports</p>
                </div>
                <div className="flex items-center gap-2.5">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                    <button className="px-4 py-2.5 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm hover:shadow transition flex items-center gap-2 text-sm font-medium cursor-pointer">
                        <Download size={16} />
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {reportStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.title} className="bg-white rounded-xl p-5 border border-gray-200/80 shadow-xs">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-xl border ${stat.colorClasses}`}>
                                    <Icon size={18} />
                                </div>
                                <span className="text-xs font-semibold text-emerald-600">{stat.change}</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-xs text-gray-500 font-medium mt-1">{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">Revenue Progression</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Weekly intake across current period</p>
                        </div>
                        <BarChart3 className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="h-64 flex flex-col justify-end">
                        <div className="flex justify-around items-end h-48 border-b border-gray-100 pb-2">
                            <div className="text-center w-14">
                                <div className="h-20 bg-[#00A1B1]/40 rounded-t-sm hover:bg-[#00A1B1]/60 transition-all"></div>
                                <p className="text-xs text-gray-500 font-medium mt-2">Week 1</p>
                            </div>
                            <div className="text-center w-14">
                                <div className="h-28 bg-[#00A1B1]/60 rounded-t-sm hover:bg-[#00A1B1]/80 transition-all"></div>
                                <p className="text-xs text-gray-500 font-medium mt-2">Week 2</p>
                            </div>
                            <div className="text-center w-14">
                                <div className="h-36 bg-[#003A77]/80 rounded-t-sm hover:bg-[#003A77] transition-all"></div>
                                <p className="text-xs text-gray-500 font-medium mt-2">Week 3</p>
                            </div>
                            <div className="text-center w-14">
                                <div className="h-44 bg-[#003A77] rounded-t-sm shadow-xs transition-all"></div>
                                <p className="text-xs text-gray-500 font-medium mt-2">Week 4</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">Booth Category Distribution</h3>
                            <p className="text-xs text-gray-500 mt-0.5">Percentage breakdown by stall specification</p>
                        </div>
                        <PieChart className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-xs font-medium mb-1.5">
                                <span className="text-gray-700">Standard Booths</span>
                                <span className="font-semibold text-gray-900">42%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#003A77] rounded-full" style={{ width: "42%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-medium mb-1.5">
                                <span className="text-gray-700">Corner Booths</span>
                                <span className="font-semibold text-gray-900">28%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#00A1B1] rounded-full" style={{ width: "28%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-medium mb-1.5">
                                <span className="text-gray-700">Double Booths</span>
                                <span className="font-semibold text-gray-900">18%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: "18%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-xs font-medium mb-1.5">
                                <span className="text-gray-700">Island Booths</span>
                                <span className="font-semibold text-gray-900">12%</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-600 rounded-full" style={{ width: "12%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Reports */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                    <h3 className="text-base font-semibold text-gray-900">Available Reports</h3>
                    <button className="text-[#003A77] hover:text-[#00A1B1] text-xs font-semibold flex items-center gap-1 cursor-pointer transition">
                        <Printer size={14} /> Print Summary
                    </button>
                </div>
                <div className="divide-y divide-gray-100">
                    {recentReports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 px-6 hover:bg-slate-50/70 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-[#003A77]/10 text-[#003A77] rounded-lg shrink-0">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900 text-sm">{report.name}</p>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Calendar size={12} /> {report.date}
                                        </span>
                                        <span className="text-xs text-gray-400 font-mono">{report.size}</span>
                                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">{report.type}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <button className="p-2 text-gray-500 hover:text-[#003A77] hover:bg-slate-100 rounded-lg transition cursor-pointer" title="Download">
                                    <Download size={16} />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition cursor-pointer" title="Print">
                                    <Printer size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
