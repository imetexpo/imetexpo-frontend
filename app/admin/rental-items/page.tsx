"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Package, Tv, Printer, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { getRentalItems, deleteRentalItem, updateRentalItemStatus, RentalItem } from "@/lib/api/rentalItems";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';

const categories = [
    { value: "All", label: "All Categories" },
    { value: "AV", label: "AV Equipment", icon: Tv },
    { value: "IT", label: "IT Equipment", icon: Printer },
    { value: "Other", label: "Other", icon: Package }
];

const getCategoryIcon = (category: string) => {
    switch (category) {
        case "AV": return <Tv size={15} />;
        case "IT": return <Printer size={15} />;
        default: return <Package size={15} />;
    }
};

const getCategoryLabel = (category: string) => {
    switch (category) {
        case "AV": return "AV Equipment";
        case "IT": return "IT Equipment";
        default: return "Other";
    }
};

export default function AdminRentalItemsPage() {
    const [items, setItems] = useState<RentalItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("all");
    const [statistics, setStatistics] = useState({ total: 0, active: 0, inactive: 0, categories: 0 });

    const calculateLocalStatistics = (itemsList: RentalItem[]) => {
        const total = itemsList.length;
        const active = itemsList.filter(item => item.isActive).length;
        const inactive = total - active;
        const uniqueCategories = new Set(itemsList.map(item => item.category)).size;

        setStatistics({ total, active, inactive, categories: uniqueCategories });
    };

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await getRentalItems({
                category: categoryFilter !== "All" ? categoryFilter : undefined,
                isActive: statusFilter !== "all" ? (statusFilter === "active" ? true : false) : undefined,
                search: search || undefined
            });

            if (response.success) {
                const fetchedItems = response.data || [];
                setItems(fetchedItems);
                calculateLocalStatistics(fetchedItems);
            } else {
                toast.error(response.message || "Failed to load rental items");
            }
        } catch (error) {
            console.error("Failed to fetch rental items:", error);
            toast.error("Failed to load rental items");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [categoryFilter, statusFilter]);

    const handleSearch = () => {
        fetchItems();
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                const response = await deleteRentalItem(id);
                if (response.success) {
                    toast.success("Rental item deleted successfully");
                    fetchItems();
                } else {
                    toast.error(response.message || "Failed to delete item");
                }
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete rental item");
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await updateRentalItemStatus(id, !currentStatus);
            if (response.success) {
                toast.success(`Item ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
                fetchItems();
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Status update error:", error);
            toast.error("Failed to update item status");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">AV & IT Rental Catalog</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage rental items visible to exhibitors</p>
                </div>
                <Link 
                    href="/admin/rental-items/new" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg shadow-xs transition"
                >
                    <Plus size={16} />
                    Add Rental Item
                </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{statistics.total}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-emerald-100 shadow-xs">
                    <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">Active</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">{statistics.active}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-rose-100 shadow-xs">
                    <p className="text-xs font-medium text-rose-700 uppercase tracking-wider">Inactive</p>
                    <p className="text-2xl font-bold text-rose-600 mt-1">{statistics.inactive}</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-teal-100 shadow-xs">
                    <p className="text-xs font-medium text-teal-700 uppercase tracking-wider">Categories</p>
                    <p className="text-2xl font-bold text-[#00A1B1] mt-1">{statistics.categories}</p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or code..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#00A1B1]"
                    >
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#00A1B1]"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <button
                        onClick={fetchItems}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={15} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="bg-white rounded-xl border border-gray-200/80 p-12 flex items-center justify-center min-h-[300px]">
                    <LoadingDots tone="dark" className="mx-auto flex" />
                </div>
            ) : items.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200/80 p-12 text-center shadow-xs">
                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-gray-900 mb-1">No Rental Items Found</h3>
                    <p className="text-xs text-gray-500 mb-4">Add your first rental item to get started</p>
                    <Link 
                        href="/admin/rental-items/new" 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg transition"
                    >
                        <Plus size={16} />
                        Add Rental Item
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs hover:border-[#00A1B1]/40 transition">
                            <div className="h-44 bg-gray-50 relative flex items-center justify-center border-b border-gray-100">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-gray-300">
                                        {getCategoryIcon(item.category)}
                                    </div>
                                )}
                                <span className={`absolute top-2.5 right-2.5 px-2 py-0.5 text-[11px] font-medium rounded-full border ${
                                    item.isActive 
                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                        : "bg-gray-100 text-gray-600 border-gray-200"
                                }`}>
                                    {item.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 bg-slate-100 rounded-md text-gray-600 mb-1.5">
                                            {getCategoryIcon(item.category)} {getCategoryLabel(item.category)}
                                        </span>
                                        <h3 className="text-base font-bold text-gray-900 line-clamp-1">{item.name}</h3>
                                        <p className="text-xs text-gray-400 font-mono mt-0.5">{item.code}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleToggleStatus(item.id, item.isActive)}
                                            className={`p-1.5 rounded-lg transition ${
                                                item.isActive
                                                    ? 'text-gray-400 hover:text-rose-600 hover:bg-rose-50'
                                                    : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'
                                            }`}
                                            title={item.isActive ? "Deactivate" : "Activate"}
                                        >
                                            {item.isActive ? <CheckCircle size={15} /> : <XCircle size={15} />}
                                        </button>
                                        <Link href={`/admin/rental-items/${item.id}/edit`}>
                                            <button className="p-1.5 text-gray-400 hover:text-[#003A77] hover:bg-gray-100 rounded-lg transition">
                                                <Edit size={15} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id, item.name)}
                                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">{item.description}</p>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                    <div>
                                        <span className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">Rental (3 days)</span>
                                        <p className="text-lg font-bold text-[#003A77]">₹{item.costFor3Days.toLocaleString()}</p>
                                    </div>
                                    <Link href={`/admin/rental-items/${item.id}/edit`}>
                                        <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition">
                                            Edit
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
