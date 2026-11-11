// app/admin/furniture/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Package, CheckCircle, XCircle, Eye, RefreshCw, Upload, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { getFurniture, deleteFurniture, updateStockStatus, Furniture } from "@/lib/api/furniture";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';

const categories = ["All", "Tables", "Chairs", "Seating", "Counters", "Storage", "Display", "Decor"];

export default function AdminFurniturePage() {
    const [furniture, setFurniture] = useState<Furniture[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("all");
    const [statistics, setStatistics] = useState({ total: 0, inStock: 0, outOfStock: 0, categories: [] });

    const fetchFurniture = async () => {
        try {
            setLoading(true);
            const response = await getFurniture({
                category: categoryFilter !== "All" ? categoryFilter : undefined,
                inStock: statusFilter !== "all" ? (statusFilter === "active" ? true : false) : undefined,
                search: search || undefined
            });

            if (response.success) {
                setFurniture(response.data || []);
            } else {
                toast.error(response.message || "Failed to load furniture");
            }
        } catch (error) {
            console.error("Failed to fetch furniture:", error);
            toast.error("Failed to load furniture");
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/furniture/statistics`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setStatistics({
                    total: data.data.totalItems || 0,
                    inStock: data.data.inStock || 0,
                    outOfStock: data.data.outOfStock || 0,
                    categories: data.data.categories || []
                });
            }
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
        }
    };

    useEffect(() => {
        fetchFurniture();
        fetchStatistics();
    }, [categoryFilter, statusFilter]);

    const handleSearch = () => {
        fetchFurniture();
    };

    const handleDelete = async (id: string, code: string) => {
        if (confirm(`Are you sure you want to delete furniture item ${code}?`)) {
            try {
                const response = await deleteFurniture(id);
                if (response.success) {
                    toast.success("Furniture deleted successfully");
                    fetchFurniture();
                    fetchStatistics();
                } else {
                    toast.error(response.message || "Failed to delete");
                }
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete furniture");
            }
        }
    };

    const handleToggleStock = async (id: string, currentStatus: boolean) => {
        const newStatus = !currentStatus;

        try {
            const response = await updateStockStatus(id, newStatus);
            if (response.success) {
                toast.success(`Marked as ${newStatus ? 'In Stock' : 'Out of Stock'}`);
                fetchFurniture();
                fetchStatistics();
            } else {
                toast.error(response.message || "Failed to update stock");
            }
        } catch (error) {
            console.error("Stock update error:", error);
            toast.error("Failed to update stock status");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Furniture Catalog</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage furniture rental items available to exhibitors</p>
                </div>
                <Link 
                    href="/admin/furniture/new" 
                    className="px-4 py-2.5 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm hover:shadow transition flex items-center gap-2 text-sm font-medium cursor-pointer"
                >
                    <Plus size={16} />
                    Add Furniture
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-gray-900">{statistics.total}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Total Catalog Items</p>
                </div>
                <div className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-emerald-700">{statistics.inStock}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-0.5">In Stock</p>
                </div>
                <div className="bg-rose-50/40 rounded-xl p-4 border border-rose-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-rose-700">{statistics.outOfStock}</p>
                    <p className="text-xs text-rose-600 font-medium mt-0.5">Out of Stock</p>
                </div>
                <div className="bg-sky-50/40 rounded-xl p-4 border border-sky-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-[#003A77]">{statistics.categories.length || categories.length - 1}</p>
                    <p className="text-xs text-sky-700 font-medium mt-0.5">Categories</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by code or description..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                    >
                        <option value="all">All Stock Status</option>
                        <option value="active">In Stock</option>
                        <option value="inactive">Out of Stock</option>
                    </select>
                    <button
                        onClick={fetchFurniture}
                        className="px-4 py-2.5 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2 text-sm font-medium cursor-pointer shadow-2xs"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Furniture Grid */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[300px]">
                    <LoadingDots tone="dark" className="mx-auto flex" />
                </div>
            ) : furniture.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200/80 p-12 text-center shadow-xs">
                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No Furniture Found</h3>
                    <p className="text-gray-500 text-sm mb-6">Add furniture items to the exhibition catalog</p>
                    <Link href="/admin/furniture/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm text-sm font-medium transition cursor-pointer">
                        <Plus size={16} />
                        Add First Item
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {furniture.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-[#00A1B1]/40 transition-all">
                            {/* Image */}
                            <div className="h-44 bg-slate-100 relative">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.code} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="h-10 w-10 text-gray-300" />
                                    </div>
                                )}
                                <span className={`absolute top-3 right-3 px-2.5 py-0.5 text-xs font-semibold rounded-full shadow-xs ${
                                    item.inStock 
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                                        : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}>
                                    {item.inStock ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                            <div className="p-5">
                                <div className="mb-3">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                                        {item.category}
                                    </span>
                                    <h3 className="text-base font-bold text-gray-900 mt-1.5">{item.code}</h3>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                                    {item.size && (
                                        <p className="text-xs text-gray-400 mt-1">Size: {item.size}</p>
                                    )}
                                </div>

                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                    <div>
                                        <span className="text-[11px] text-gray-400 block font-medium">Rental (3 days)</span>
                                        <p className="text-lg font-bold text-[#003A77]">₹{item.cost3Days.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => handleToggleStock(item.id, item.inStock)}
                                            className={`p-1.5 rounded-lg transition cursor-pointer ${
                                                item.inStock
                                                    ? 'text-emerald-600 hover:bg-emerald-50'
                                                    : 'text-rose-600 hover:bg-rose-50'
                                            }`}
                                            title={item.inStock ? "Mark as Out of Stock" : "Mark as In Stock"}
                                        >
                                            {item.inStock ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                        </button>
                                        <Link href={`/admin/furniture/${item.id}/edit`}>
                                            <button className="p-1.5 text-gray-500 hover:text-[#00A1B1] hover:bg-teal-50 rounded-lg transition cursor-pointer">
                                                <Edit size={16} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id, item.code)}
                                            className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
