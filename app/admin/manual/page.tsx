"use client";

import { useState, useEffect } from "react";
import {
    Plus, Edit, Trash2, Save, X, FileText, Upload,
    CheckCircle, XCircle, RefreshCw, Search, Eye,
    ChevronDown, ChevronRight, Trash, Download,
    File, Image as ImageIcon, Link as LinkIcon
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import LoadingDots from '@/components/ui/LoadingDots';


interface ManualSection {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt?: string;
    updatedAt?: string;
}

interface ManualPDF {
    id: string;
    title: string;
    description: string;
    category: string;
    version: string;
    file_name: string | null;
    file_size: string | null;
    file_path: string | null;
    mime_type?: string;
    last_updated: string;
    updated_by?: string;
    downloads: number;
    status: 'published' | 'draft';
    type: 'section' | 'pdf';

    content?: string; // ✅ ADD THIS
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminManualPage() {
    const [manuals, setManuals] = useState<ManualPDF[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<ManualPDF | null>(null);
    const [modalType, setModalType] = useState<'section' | 'pdf'>('section');
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [statistics, setStatistics] = useState({
        totalManuals: 0,
        publishedManuals: 0,
        draftManuals: 0,
        totalDownloads: 0,
        categoryStats: []
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "general",
        version: "1.0",
        status: "published"
    });

    // Fetch all manuals - FIXED: Use correct API endpoint
    const fetchManuals = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("adminToken");

            // Use the correct endpoint from your routes
            const response = await axios.get(`${API_BASE_URL}/manuals`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                let data = response.data.data || [];

                // Format data to include type
                data = data.map((item: any) => ({
                    ...item,
                    type: 'pdf',
                    description: item.description || '',
                    last_updated: item.last_updated || item.updatedAt || item.createdAt,
                }));

                // Also fetch text sections
                const sectionsResponse = await axios.get(`${API_BASE_URL}/manuals/sections`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                let allManuals = [...data];

                if (sectionsResponse.data.success) {
                    const sections = (sectionsResponse.data.data || []).map((section: any) => ({
                        id: section.id,
                        title: section.title,
                        description: section.content,
                        category: section.category,
                        version: '1.0',
                        file_name: null,
                        file_size: null,
                        file_path: null,
                        last_updated: section.updatedAt || section.createdAt,
                        downloads: 0,
                        status: 'published',
                        type: 'section',
                        content: section.content
                    }));
                    allManuals = [...allManuals, ...sections];
                }

                // Apply filters
                if (categoryFilter !== "all") {
                    allManuals = allManuals.filter(m => m.category?.toLowerCase() === categoryFilter.toLowerCase());
                }
                if (statusFilter !== "all") {
                    allManuals = allManuals.filter(m => m.status === statusFilter);
                }
                if (search) {
                    const searchLower = search.toLowerCase();
                    allManuals = allManuals.filter(m =>
                        m.title?.toLowerCase().includes(searchLower) ||
                        (m.description && m.description.toLowerCase().includes(searchLower))
                    );
                }

                setManuals(allManuals);
            }
        } catch (error) {
            console.error("Failed to fetch manuals:", error);
            toast.error("Failed to load manuals");
        } finally {
            setLoading(false);
        }
    };

    // Fetch statistics - FIXED: Use correct API endpoint
    const fetchStatistics = async () => {
        try {
            const token = localStorage.getItem("adminToken");

            // Get PDFs count
            const pdfsResponse = await axios.get(`${API_BASE_URL}/manuals`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Get sections count
            const sectionsResponse = await axios.get(`${API_BASE_URL}/manuals/sections`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const pdfs = pdfsResponse.data.data || [];
            const sections = sectionsResponse.data.data || [];

            const totalManuals = pdfs.length + sections.length;
            const publishedManuals = pdfs.filter((p: any) => p.status === 'published').length + sections.length;
            const draftManuals = pdfs.filter((p: any) => p.status === 'draft').length;
            const totalDownloads = pdfs.reduce((sum: number, p: any) => sum + (p.downloads || 0), 0);

            setStatistics({
                totalManuals,
                publishedManuals,
                draftManuals,
                totalDownloads,
                categoryStats: []
            });
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
        }
    };

    useEffect(() => {
        fetchManuals();
        fetchStatistics();
    }, [categoryFilter, statusFilter]);

    // Create text section - FIXED endpoint
    const createSection = async () => {
        if (!formData.title || !formData.content) {
            toast.error("Title and content are required");
            return;
        }

        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.post(`${API_BASE_URL}/manuals/sections`, {
                title: formData.title,
                content: formData.content,
                category: formData.category
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                toast.success("Manual section created successfully");
                setShowModal(false);
                fetchManuals();
                fetchStatistics();
                resetForm();
            }
        } catch (error) {
            console.error("Failed to create section:", error);
            toast.error("Failed to create section");
        }
    };

    // Upload PDF - FIXED endpoint
    const uploadPDF = async () => {
        if (!formData.title || !selectedFile) {
            toast.error("Title and file are required");
            return;
        }

        const formDataObj = new FormData();
        formDataObj.append('title', formData.title);
        formDataObj.append('description', formData.content);
        formDataObj.append('category', formData.category);
        formDataObj.append('version', formData.version);
        formDataObj.append('status', formData.status);
        formDataObj.append('file', selectedFile);

        try {
            const token = localStorage.getItem("adminToken");
            const response = await axios.post(`${API_BASE_URL}/manuals`, formDataObj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success) {
                toast.success("PDF uploaded successfully");
                setShowModal(false);
                fetchManuals();
                fetchStatistics();
                resetForm();
                setSelectedFile(null);
            }
        } catch (error) {
            console.error("Failed to upload PDF:", error);
            toast.error("Failed to upload PDF");
        }
    };

    // Update manual
    const updateManual = async () => {
        if (!formData.title) {
            toast.error("Title is required");
            return;
        }

        try {
            const token = localStorage.getItem("adminToken");

            if (editingItem?.type === 'section') {
                const response = await axios.put(`${API_BASE_URL}/manuals/sections/${editingItem.id}`, {
                    title: formData.title,
                    content: formData.content,
                    category: formData.category
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.success) {
                    toast.success("Section updated successfully");
                    setShowModal(false);
                    fetchManuals();
                    fetchStatistics();
                    resetForm();
                }
            } else {
                const formDataObj = new FormData();
                formDataObj.append('title', formData.title);
                formDataObj.append('description', formData.content);
                formDataObj.append('category', formData.category);
                formDataObj.append('version', formData.version);
                formDataObj.append('status', formData.status);
                if (selectedFile) {
                    formDataObj.append('file', selectedFile);
                }

                const response = await axios.put(`${API_BASE_URL}/manuals/${editingItem?.id}`, formDataObj, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.data.success) {
                    toast.success("Manual updated successfully");
                    setShowModal(false);
                    fetchManuals();
                    fetchStatistics();
                    resetForm();
                    setSelectedFile(null);
                }
            }
        } catch (error) {
            console.error("Failed to update manual:", error);
            toast.error("Failed to update manual");
        }
    };

    // Delete manual
    const handleDelete = async (item: ManualPDF) => {
        if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;

        try {
            const token = localStorage.getItem("adminToken");
            let response;

            if (item.type === 'section') {
                response = await axios.delete(`${API_BASE_URL}/manuals/sections/${item.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                response = await axios.delete(`${API_BASE_URL}/manuals/${item.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }

            if (response.data.success) {
                toast.success("Deleted successfully");
                fetchManuals();
                fetchStatistics();
            }
        } catch (error) {
            console.error("Failed to delete:", error);
            toast.error("Failed to delete");
        }
    };

    // Update manual status
    const handleToggleStatus = async (item: ManualPDF) => {
        const newStatus = item.status === 'published' ? 'draft' : 'published';

        try {
            const token = localStorage.getItem("adminToken");

            if (item.type === 'section') {
                // Sections don't have status toggle yet, just update normally
                const response = await axios.put(`${API_BASE_URL}/manuals/sections/${item.id}`, {
                    title: item.title,
                    content: item.content || item.description,
                    category: item.category
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.success) {
                    toast.success(`Section updated`);
                    fetchManuals();
                }
            } else {
                const response = await axios.patch(`${API_BASE_URL}/manuals/${item.id}/status`, {
                    status: newStatus
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.success) {
                    toast.success(`Status updated to ${newStatus}`);
                    fetchManuals();
                    fetchStatistics();
                }
            }
        } catch (error) {
            console.error("Failed to update status:", error);
            toast.error("Failed to update status");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            content: "",
            category: "general",
            version: "1.0",
            status: "published"
        });
        setEditingItem(null);
        setSelectedFile(null);
    };

    const openCreateModal = (type: 'section' | 'pdf') => {
        setModalType(type);
        setEditingItem(null);
        resetForm();
        setShowModal(true);
    };

    const openEditModal = (item: ManualPDF) => {
        setEditingItem(item);
        setModalType(item.type);
        setFormData({
            title: item.title || "",
            content: item.description || item.content || "",
            category: item.category?.toLowerCase() || "general",
            version: item.version || "1.0",
            status: item.status || "published"
        });
        setShowModal(true);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatFileSize = (size?: string | null) => {
        if (!size) return '0 KB';
        return size;
    };

    const getCategoryBadge = (category: string) => {
        const colors: Record<string, string> = {
            general: 'bg-blue-50 text-blue-700 border border-blue-200',
            rules: 'bg-red-50 text-red-700 border border-red-200',
            setup: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
            technical: 'bg-purple-50 text-purple-700 border border-purple-200',
            logistics: 'bg-amber-50 text-amber-700 border border-amber-200',
            schedule: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
            contact: 'bg-pink-50 text-pink-700 border border-pink-200'
        };
        return colors[category?.toLowerCase()] || 'bg-gray-100 text-gray-600 border border-gray-200';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-11 w-11 bg-[#003A77]/10 rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="h-6 w-6 text-[#003A77]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Exhibitor Manual Manager</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Manage manual sections and downloadable PDF documents</p>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={() => openCreateModal('section')}
                        className="px-4 py-2.5 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition flex items-center gap-2 cursor-pointer shadow-2xs"
                    >
                        <Plus size={16} />
                        Add Text Section
                    </button>
                    <button
                        onClick={() => openCreateModal('pdf')}
                        className="px-4 py-2.5 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm hover:shadow transition flex items-center gap-2 text-sm font-medium cursor-pointer"
                    >
                        <Upload size={16} />
                        Upload PDF
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-gray-900">{statistics.totalManuals}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Total Items</p>
                </div>
                <div className="bg-emerald-50/40 rounded-xl p-4 border border-emerald-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-emerald-700">{statistics.publishedManuals}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-0.5">Published</p>
                </div>
                <div className="bg-amber-50/40 rounded-xl p-4 border border-amber-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-amber-700">{statistics.draftManuals}</p>
                    <p className="text-xs text-amber-600 font-medium mt-0.5">Drafts</p>
                </div>
                <div className="bg-sky-50/40 rounded-xl p-4 border border-sky-200/80 shadow-xs">
                    <p className="text-2xl font-bold text-[#003A77]">{statistics.totalDownloads}</p>
                    <p className="text-xs text-sky-700 font-medium mt-0.5">Total Downloads</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-gray-200/80 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by title or description..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && fetchManuals()}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                    >
                        <option value="all">All Categories</option>
                        <option value="general">General</option>
                        <option value="rules">Rules</option>
                        <option value="setup">Setup</option>
                        <option value="technical">Technical</option>
                        <option value="logistics">Logistics</option>
                        <option value="schedule">Schedule</option>
                        <option value="contact">Contact</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                    <button
                        onClick={fetchManuals}
                        className="px-4 py-2.5 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition flex items-center justify-center gap-2 text-sm font-medium cursor-pointer shadow-2xs"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Manuals List */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[300px]">
                    <LoadingDots tone="dark" className="mx-auto flex" />
                </div>
            ) : manuals.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200/80 p-12 text-center shadow-xs">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No Manual Items Found</h3>
                    <p className="text-gray-500 text-sm mb-6">Add text sections or upload PDFs to get started</p>
                    <div className="flex justify-center gap-3">
                        <button
                            onClick={() => openCreateModal('section')}
                            className="px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition cursor-pointer"
                        >
                            Add Text Section
                        </button>
                        <button
                            onClick={() => openCreateModal('pdf')}
                            className="px-4 py-2 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg text-sm font-medium transition cursor-pointer"
                        >
                            Upload PDF
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/80 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Version/Size</th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Updated</th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Downloads</th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {manuals.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                                        <td className="px-6 py-4">
                                            {item.type === 'section' ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-sky-50 text-sky-700 border border-sky-200/80 font-medium">
                                                    <FileText size={12} /> Text
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 font-medium">
                                                    <File size={12} /> PDF
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-gray-900 font-semibold text-sm">{item.title}</p>
                                                {item.description && (
                                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.description}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2.5 py-1 text-xs rounded-full font-medium ${getCategoryBadge(item.category)}`}>
                                                {item.category || 'General'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.type === 'section' ? (
                                                <span className="text-gray-500 text-xs font-mono">v{item.version}</span>
                                            ) : (
                                                <span className="text-gray-500 text-xs font-mono">{formatFileSize(item.file_size)}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-500 text-xs">{formatDate(item.last_updated)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-900 font-semibold text-sm">{item.downloads || 0}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleStatus(item)}
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${item.status === 'published'
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100'
                                                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {item.status === 'published' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                                {item.status === 'published' ? 'Published' : 'Draft'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                {item.type === 'pdf' && item.file_path && (
                                                    <a
                                                        href={item.file_path}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-1.5 text-gray-500 hover:text-[#003A77] hover:bg-slate-100 rounded-lg transition"
                                                        title="View/Download"
                                                    >
                                                        <Eye size={16} />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="p-1.5 text-gray-500 hover:text-[#00A1B1] hover:bg-teal-50 rounded-lg transition cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item)}
                                                    className="p-1.5 text-gray-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-[#003A77]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-gray-200 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">
                                {editingItem ? 'Edit' : 'Add'} {modalType === 'section' ? 'Text Section' : 'PDF Document'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition cursor-pointer">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                    placeholder="Enter title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                                >
                                    <option value="general">General</option>
                                    <option value="rules">Rules & Regulations</option>
                                    <option value="setup">Setup Guidelines</option>
                                    <option value="schedule">Schedule</option>
                                    <option value="technical">Technical Requirements</option>
                                    <option value="logistics">Logistics</option>
                                    <option value="contact">Contact</option>
                                </select>
                            </div>

                            {modalType === 'section' ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Content <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                        placeholder="Enter content here..."
                                        required
                                    />
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Description
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                            placeholder="Enter description"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Version
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.version}
                                            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                            placeholder="1.0"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            File {!editingItem && <span className="text-red-500">*</span>}
                                        </label>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx,.txt"
                                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#003A77] file:text-white hover:file:bg-[#002855] file:cursor-pointer"
                                        />
                                        {editingItem && (
                                            <p className="text-xs text-gray-500 mt-1">Leave empty to keep current file</p>
                                        )}
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                                >
                                    <option value="published">Published (Visible to exhibitors)</option>
                                    <option value="draft">Draft (Hidden from exhibitors)</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm font-medium cursor-pointer shadow-2xs"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    if (editingItem) {
                                        await updateManual();
                                    } else if (modalType === 'section') {
                                        await createSection();
                                    } else {
                                        await uploadPDF();
                                    }
                                }}
                                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm font-medium transition flex items-center justify-center gap-2 text-sm cursor-pointer"
                            >
                                <Save size={16} />
                                {editingItem ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}