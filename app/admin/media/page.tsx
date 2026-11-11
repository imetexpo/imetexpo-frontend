// app/admin/media/page.tsx
"use client";

import { useState } from "react";
import { Search, Plus, Trash2, Download, Image, Video, File, Grid, List, Upload } from "lucide-react";

interface MediaItem {
    id: string;
    name: string;
    type: "image" | "video" | "document";
    url: string;
    size: string;
    uploadedAt: string;
    category: string;
}

const sampleMedia: MediaItem[] = [
    { id: "1", name: "indiamet-hall-1-layout.jpg", type: "image", url: "/placeholder.jpg", size: "2.4 MB", uploadedAt: "2027-01-15", category: "Floor Plan" },
    { id: "2", name: "metallurgical-summit-promo.mp4", type: "video", url: "/placeholder.mp4", size: "45.2 MB", uploadedAt: "2027-01-14", category: "Promotional" },
    { id: "3", name: "indiamet-exhibitor-manual.pdf", type: "document", url: "/placeholder.pdf", size: "1.8 MB", uploadedAt: "2027-01-13", category: "Documents" },
    { id: "4", name: "steel-machinery-booth.jpg", type: "image", url: "/placeholder.jpg", size: "3.1 MB", uploadedAt: "2027-01-12", category: "Booth Images" },
    { id: "5", name: "metals-extrusion-display.jpg", type: "image", url: "/placeholder.jpg", size: "2.8 MB", uploadedAt: "2027-01-11", category: "Product Images" },
    { id: "6", name: "inauguration-ceremony.mp4", type: "video", url: "/placeholder.mp4", size: "68.3 MB", uploadedAt: "2027-01-10", category: "Event" },
];

export default function MediaPage() {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const categories = ["all", "Floor Plan", "Promotional", "Documents", "Booth Images", "Product Images", "Event"];

    const filteredMedia = sampleMedia.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "image": return <Image className="h-8 w-8 text-[#00A1B1]" />;
            case "video": return <Video className="h-8 w-8 text-rose-500" />;
            default: return <File className="h-8 w-8 text-blue-500" />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Media Gallery</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage exhibition images, videos, and documents</p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg shadow-xs transition">
                    <Upload size={16} />
                    Upload Media
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search media..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#00A1B1]"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
                        ))}
                    </select>
                    <div className="flex gap-1.5 border border-gray-200 rounded-lg p-0.5 bg-gray-50">
                        <button 
                            onClick={() => setViewMode("grid")} 
                            className={`p-1.5 rounded-md transition ${viewMode === "grid" ? "bg-white text-[#003A77] shadow-xs" : "text-gray-500 hover:text-gray-900"}`}
                        >
                            <Grid size={16} />
                        </button>
                        <button 
                            onClick={() => setViewMode("list")} 
                            className={`p-1.5 rounded-md transition ${viewMode === "list" ? "bg-white text-[#003A77] shadow-xs" : "text-gray-500 hover:text-gray-900"}`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Media Grid/List */}
            {viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredMedia.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl border border-gray-200/80 overflow-hidden group relative shadow-xs hover:border-[#00A1B1]/40 transition">
                            <div className="aspect-square bg-slate-50 flex items-center justify-center border-b border-gray-100">
                                {getTypeIcon(item.type)}
                            </div>
                            <div className="p-3">
                                <p className="text-xs font-semibold text-gray-900 truncate">{item.name}</p>
                                <div className="flex items-center justify-between mt-1.5">
                                    <span className="text-[11px] text-gray-400">{item.size}</span>
                                    <span className="text-[11px] font-medium text-gray-500 capitalize">{item.type}</span>
                                </div>
                                <p className="text-[11px] text-[#00A1B1] font-medium mt-1">{item.category}</p>
                            </div>
                            <div className="absolute inset-0 bg-[#003A77]/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                <button className="p-2 bg-white rounded-full hover:bg-gray-100 shadow-xs transition" title="Download">
                                    <Download size={15} className="text-gray-800" />
                                </button>
                                <button className="p-2 bg-white rounded-full hover:bg-gray-100 text-rose-600 shadow-xs transition" title="Delete">
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                    <div className="divide-y divide-gray-100">
                        {filteredMedia.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50/70 transition">
                                <div className="flex items-center gap-3.5">
                                    <div className="p-2 bg-gray-50 rounded-lg">
                                        {getTypeIcon(item.type)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-[#00A1B1] font-medium">{item.category}</span>
                                            <span className="text-xs text-gray-300">•</span>
                                            <span className="text-xs text-gray-400">{item.size}</span>
                                            <span className="text-xs text-gray-300">•</span>
                                            <span className="text-xs text-gray-400">{item.uploadedAt}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition" title="Download">
                                        <Download size={15} />
                                    </button>
                                    <button className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete">
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {filteredMedia.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200/80 shadow-xs">
                    <Image className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-600">No media found</p>
                </div>
            )}
        </div>
    );
}
