// app/admin/tyres/page.tsx
"use client";

import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2, Truck, Gauge, Fuel, Calendar, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface EquipmentItem {
    id: string;
    brand: string;
    model: string;
    category: string;
    size: string;
    loadIndex: string;
    speedRating: string;
    price: string;
    stock: number;
    status: "active" | "inactive";
    imageUrl?: string;
}

const sampleEquipment: EquipmentItem[] = [
    { id: "1", brand: "Zeiss", model: "PRISMO CMM", category: "CMM", size: "900x1200x700 mm", loadIndex: "0.7+L/400 μm", speedRating: "VAST gold", price: "₹45,00,000", stock: 5, status: "active" },
    { id: "2", brand: "Mitutoyo", model: "Crysta-Apex V", category: "CMM", size: "700x1000x600 mm", loadIndex: "1.7+L/333 μm", speedRating: "SP25M", price: "₹32,50,000", stock: 8, status: "active" },
    { id: "3", brand: "Hexagon", model: "Absolute Arm 7-Axis", category: "Laser Trackers", size: "2.5 m volume", loadIndex: "0.025 mm", speedRating: "RS6 Scanner", price: "₹28,00,000", stock: 6, status: "active" },
    { id: "4", brand: "Renishaw", model: "Equator 300", category: "Calibration", size: "300 mm diameter", loadIndex: "±2 μm", speedRating: "SP25", price: "₹18,50,000", stock: 12, status: "active" },
    { id: "5", brand: "Faro", model: "Quantum Max ScanArm", category: "Optical 3D Scanning", size: "3.0 m reach", loadIndex: "0.020 mm", speedRating: "8-Axis", price: "₹35,00,000", stock: 4, status: "active" },
    { id: "6", brand: "Keyence", model: "VR-6000 3D Profilometer", category: "Surface Metrology", size: "200x100 mm", loadIndex: "0.1 μm", speedRating: "High Speed", price: "₹22,00,000", stock: 7, status: "active" },
];

const categories = ["All", "CMM", "Optical 3D Scanning", "Laser Trackers", "Surface Metrology", "Vision Systems", "Calibration"];

export default function TyresPage() {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    const filteredEquipment = sampleEquipment.filter(item => {
        const matchesSearch = item.brand.toLowerCase().includes(search.toLowerCase()) ||
            item.model.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Metrology Equipment</h1>
                    <p className="text-gray-400 mt-1">Manage industrial metrology and inspection systems in the exhibition</p>
                </div>
                <Link
                    href="/admin/tyres/new"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Equipment
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Truck size={16} />
                        <span className="text-sm">Total Equipment</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{sampleEquipment.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <CheckCircle size={16} />
                        <span className="text-sm">Active</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400">{sampleEquipment.filter(t => t.status === "active").length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Gauge size={16} />
                        <span className="text-sm">Categories</span>
                    </div>
                    <p className="text-2xl font-bold text-white">6</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Fuel size={16} />
                        <span className="text-sm">Brands</span>
                    </div>
                    <p className="text-2xl font-bold text-white">6</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by brand or model..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${categoryFilter === cat
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Equipment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEquipment.map((item) => (
                    <div key={item.id} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500/30 transition-all">
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full">{item.category}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{item.brand} {item.model}</h3>
                                </div>
                                <div className="flex gap-1">
                                    <Link href={`/admin/tyres/${item.id}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                        <Eye size={16} />
                                    </Link>
                                    <Link href={`/admin/tyres/${item.id}/edit`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                        <Edit size={16} />
                                    </Link>
                                    <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 mt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Range:</span>
                                    <span className="text-white font-medium">{item.size}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Accuracy:</span>
                                    <span className="text-white">{item.loadIndex}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Sensor:</span>
                                    <span className="text-white">{item.speedRating}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Available:</span>
                                    <span className={`font-medium ${item.stock < 10 ? "text-red-400" : "text-green-400"}`}>{item.stock} units</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                                <span className="text-xl font-bold text-orange-400">{item.price}</span>
                                <span className="text-sm text-gray-500">per unit</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTyres.length === 0 && (
                <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                    <Truck className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No metrology equipment found</p>
                </div>
            )}
        </div>
    );
}