// app/admin/tyre-categories/page.tsx
"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Search, Package, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import Link from "next/link";

interface TyreCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    tyreCount: number;
    imageUrl?: string;
    status: "active" | "inactive";
    subCategories: string[];
}

const sampleCategories: TyreCategory[] = [
    { id: "1", name: "Coordinate Measuring Machines (CMM)", slug: "cmm", description: "Bridge, gantry, horizontal, and portable coordinate measuring systems", tyreCount: 142, status: "active", subCategories: ["Bridge CMM", "Gantry CMM", "Shop-Floor CMM", "Multisensor CMM"] },
    { id: "2", name: "Optical & 3D Scanning Systems", slug: "optical-3d-scanning", description: "Structured light scanners, laser scanners, and photogrammetry", tyreCount: 186, status: "active", subCategories: ["Blue Light Scanners", "Handheld 3D Scanners", "Photogrammetry", "Automated Cells"] },
    { id: "3", name: "Laser Trackers & Metrology Arms", slug: "laser-trackers-arms", description: "Large volume measurement systems and articulated arms", tyreCount: 98, status: "active", subCategories: ["Laser Trackers", "Articulated Arms", "Target Probing", "Dynamic Tracking"] },
    { id: "4", name: "Surface & Form Metrology", slug: "surface-form", description: "Roughness, roundness, contour, and profilometry measurement", tyreCount: 124, status: "active", subCategories: ["Roughness Testers", "Roundness Testers", "Contour Measuring", "Optical Profilers"] },
    { id: "5", name: "Non-Destructive Testing (NDT)", slug: "ndt-inspection", description: "Ultrasonic, X-ray, industrial CT scanning and Eddy current testing", tyreCount: 78, status: "active", subCategories: ["Industrial CT", "Ultrasonic", "Eddy Current", "X-Ray Inspection"] },
    { id: "6", name: "Calibration Standards & Gauges", slug: "calibration-gauges", description: "Gauge blocks, air gauges, micrometers, and calibration standards", tyreCount: 156, status: "active", subCategories: ["Gauge Blocks", "Air Gauges", "Digital Calipers", "Torque Standards"] },
    { id: "7", name: "Vision Systems & Microscopes", slug: "vision-systems", description: "Industrial vision inspection systems and digital microscopes", tyreCount: 82, status: "active", subCategories: ["Automated Vision", "Digital Microscopes", "Toolmaker Microscopes", "AI Inspection"] },
];

export default function TyreCategoriesPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredCategories = sampleCategories.filter(cat => {
        const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase()) ||
            cat.description.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || cat.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalTyres = filteredCategories.reduce((acc, cat) => acc + cat.tyreCount, 0);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Metrology Categories</h1>
                    <p className="text-gray-400 mt-1">Manage industrial metrology and inspection equipment categories</p>
                </div>
                <Link
                    href="/admin/tyre-categories/new"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Category
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Package size={16} />
                        <span className="text-sm">Total Categories</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{sampleCategories.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <CheckCircle size={16} />
                        <span className="text-sm">Active</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400">{sampleCategories.filter(c => c.status === "active").length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <TrendingUp size={16} />
                        <span className="text-sm">Total Products</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-400">{totalTyres.toLocaleString()}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                    <div key={category.id} className={`bg-gray-800/50 rounded-xl border ${category.status === "active" ? "border-gray-700" : "border-gray-700 opacity-70"} overflow-hidden hover:border-orange-500/30 transition-all`}>
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${category.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                                            {category.status}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                                    <p className="text-sm text-gray-400 mt-1">{category.slug}</p>
                                </div>
                                <div className="flex gap-1">
                                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                        <Eye size={16} />
                                    </button>
                                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                        <Edit size={16} />
                                    </button>
                                    <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{category.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {category.subCategories.map((sub, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300">{sub}</span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                                <div>
                                    <span className="text-xs text-gray-500">Products</span>
                                    <p className="text-white font-semibold">{category.tyreCount}</p>
                                </div>
                                <Link
                                    href={`/admin/tyres?category=${category.slug}`}
                                    className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1"
                                >
                                    View Products <TrendingUp size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCategories.length === 0 && (
                <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                    <Package className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No categories found</p>
                </div>
            )}
        </div>
    );
}