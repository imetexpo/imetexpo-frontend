// app/admin/tyres/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Truck, Gauge, Ruler, Weight, Thermometer, CheckCircle, XCircle, DollarSign, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

interface TyreDetail {
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
    description: string;
    specifications: { key: string; value: string }[];
    images: string[];
}

const sampleTyre: TyreDetail = {
    id: "1",
    brand: "Zeiss",
    model: "PRISMO CMM",
    category: "CMM",
    size: "900x1200x700 mm",
    loadIndex: "0.7+L/400 μm",
    speedRating: "VAST gold",
    price: "₹45,00,000",
    stock: 5,
    status: "active",
    description: "The Zeiss PRISMO coordinate measuring machine is the reference standard in high-precision measurement. It delivers exceptional volumetric accuracy, high scanning speeds, and robust resistance to environmental fluctuations.",
    specifications: [
        { key: "Measuring Range", value: "900 x 1200 x 700 mm" },
        { key: "Accuracy (MPE_E)", value: "0.7 + L/400 μm" },
        { key: "Max Table Load", value: "1,000 kg" },
        { key: "Probe System", value: "VAST gold active scanning" },
        { key: "Controller", value: "C99 with CALYPSO software" },
    ],
    images: [],
};

export default function TyreDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [equipment] = useState(sampleTyre);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-lg transition">
                        <ArrowLeft className="h-5 w-5 text-gray-400" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{equipment.brand} {equipment.model}</h1>
                        <p className="text-gray-400 mt-1">Product ID: {params.id}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href={`/admin/tyres/${params.id}/edit`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                        <Edit size={18} />
                        Edit Product
                    </Link>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
                        <Trash2 size={18} />
                        Delete
                    </button>
                </div>
            </div>

            {/* Status Banner */}
            <div className={`flex items-center justify-between p-4 rounded-xl border ${equipment.status === "active" ? "bg-green-500/10 border-green-500/30" : "bg-gray-500/10 border-gray-500/30"}`}>
                <div className="flex items-center gap-3">
                    {equipment.status === "active" ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                    <span className="font-medium text-white">{equipment.status.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">Stock: {equipment.stock} units</span>
                    <button className="text-sm text-orange-400 hover:underline">Update Stock</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Product Information */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Truck size={18} className="text-orange-400" />
                            Product Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400">Brand</p>
                                <p className="text-white font-medium">{equipment.brand}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Model</p>
                                <p className="text-white">{equipment.model}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Category</p>
                                <p className="text-white">{equipment.category}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Range / Size</p>
                                <p className="text-white">{equipment.size}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Accuracy</p>
                                <p className="text-white">{equipment.loadIndex}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Sensor</p>
                                <p className="text-white">{equipment.speedRating}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Price</p>
                                <p className="text-orange-400 font-bold text-xl">{equipment.price}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Stock Status</p>
                                <p className={`font-medium ${equipment.stock > 10 ? "text-green-400" : equipment.stock > 0 ? "text-yellow-400" : "text-red-400"}`}>
                                    {equipment.stock > 10 ? "In Stock" : equipment.stock > 0 ? "Low Stock" : "Out of Stock"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
                        <p className="text-gray-300 leading-relaxed">{equipment.description}</p>
                    </div>

                    {/* Technical Specifications */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Gauge size={18} className="text-orange-400" />
                            Technical Specifications
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {equipment.specifications.map((spec, idx) => (
                                <div key={idx} className="flex justify-between py-2 border-b border-gray-700">
                                    <span className="text-gray-400">{spec.key}</span>
                                    <span className="text-white font-medium">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Quick Stats</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <DollarSign size={14} />
                                    <span>Monthly Sales</span>
                                </div>
                                <span className="text-white">245 units</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <TrendingUp size={14} />
                                    <span>Revenue</span>
                                </div>
                                <span className="text-orange-400">₹11,02,500</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Users size={14} />
                                    <span>Exhibitors</span>
                                </div>
                                <span className="text-white">8 companies</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <button className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                Update Stock
                            </button>
                            <button className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                View Sales Report
                            </button>
                            <button className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                Add to Promotion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}