// app/admin/tyre-specs/page.tsx
"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search, Gauge, Ruler, Weight, Thermometer, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface TyreSpecification {
    id: string;
    name: string;
    unit: string;
    description: string;
    values: string[];
    isRequired: boolean;
    status: "active" | "inactive";
}

const sampleSpecs: TyreSpecification[] = [
    { id: "1", name: "Measuring Range (XYZ)", unit: "mm", description: "Coordinate measuring volume (X x Y x Z)", values: ["500x500x400 mm", "700x1000x600 mm", "900x1500x800 mm", "1200x2000x1000 mm"], isRequired: true, status: "active" },
    { id: "2", name: "Volumetric Accuracy (MPE_E)", unit: "μm", description: "Maximum permissible error per ISO 10360", values: ["0.7 + L/400 μm", "1.2 + L/350 μm", "1.8 + L/300 μm", "2.5 + L/250 μm"], isRequired: true, status: "active" },
    { id: "3", name: "Scanning Speed", unit: "pts/s", description: "Point acquisition rate", values: ["500,000", "1,200,000", "2,000,000", "5,000,000"], isRequired: true, status: "active" },
    { id: "4", name: "Probe Configuration", unit: "", description: "Sensor & probing system", values: ["Tactile Trigger", "Continuous Scanning", "Blue Laser Scanner", "Optical Multisensor"], isRequired: true, status: "active" },
    { id: "5", name: "Max Workpiece Weight", unit: "kg", description: "Maximum permissible table load", values: ["250", "500", "1000", "2500"], isRequired: false, status: "active" },
    { id: "6", name: "Repeatability", unit: "μm", description: "Measurement repeatability (MPE_P)", values: ["0.3", "0.5", "1.0", "1.5"], isRequired: true, status: "active" },
    { id: "7", name: "Operating Temperature", unit: "°C", description: "Permissible ambient temperature range", values: ["18 - 22", "15 - 30", "10 - 40"], isRequired: false, status: "active" },
];

export default function TyreSpecsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredSpecs = sampleSpecs.filter(spec => {
        const matchesSearch = spec.name.toLowerCase().includes(search.toLowerCase()) ||
            spec.description.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || spec.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Measurement Specifications</h1>
                    <p className="text-gray-400 mt-1">Manage metrology and inspection equipment specification attributes</p>
                </div>
                <Link
                    href="/admin/tyre-specs/new"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Specification
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Gauge size={16} />
                        <span className="text-sm">Total Specs</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{sampleSpecs.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <CheckCircle size={16} />
                        <span className="text-sm">Active</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400">{sampleSpecs.filter(s => s.status === "active").length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Ruler size={16} />
                        <span className="text-sm">Required</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-400">{sampleSpecs.filter(s => s.isRequired).length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Weight size={16} />
                        <span className="text-sm">Optional</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">{sampleSpecs.filter(s => !s.isRequired).length}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search specifications..."
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

            {/* Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSpecs.map((spec) => (
                    <div key={spec.id} className={`bg-gray-800/50 rounded-xl border ${spec.status === "active" ? "border-gray-700" : "border-gray-700 opacity-70"} overflow-hidden hover:border-orange-500/30 transition-all`}>
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                                        {spec.name.includes("Measuring") && <Ruler className="h-6 w-6 text-orange-400" />}
                                        {spec.name.includes("Accuracy") && <Gauge className="h-6 w-6 text-orange-400" />}
                                        {spec.name.includes("Weight") && <Weight className="h-6 w-6 text-orange-400" />}
                                        {spec.name.includes("Temperature") && <Thermometer className="h-6 w-6 text-orange-400" />}
                                        {!spec.name.includes("Measuring") && !spec.name.includes("Accuracy") && !spec.name.includes("Weight") && !spec.name.includes("Temperature") && <Gauge className="h-6 w-6 text-orange-400" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-white">{spec.name}</h3>
                                            {spec.isRequired && (
                                                <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">Required</span>
                                            )}
                                            <span className={`px-1.5 py-0.5 rounded-full text-xs ${spec.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                                                {spec.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">{spec.description}</p>
                                        {spec.unit && <p className="text-xs text-gray-500 mt-1">Unit: {spec.unit}</p>}
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                        <Edit size={16} />
                                    </button>
                                    <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-xs text-gray-500 mb-2">Common Values</p>
                                <div className="flex flex-wrap gap-2">
                                    {spec.values.slice(0, 5).map((value, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-gray-700 rounded-lg text-sm text-gray-300">{value}</span>
                                    ))}
                                    {spec.values.length > 5 && (
                                        <span className="px-2 py-1 bg-gray-700 rounded-lg text-sm text-gray-400">+{spec.values.length - 5} more</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredSpecs.length === 0 && (
                <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                    <Gauge className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No specifications found</p>
                </div>
            )}
        </div>
    );
}