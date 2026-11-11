// app/admin/floor-plan/page.tsx - UPDATED
"use client";

import { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, Upload, Map, RefreshCw, X, Save, Image as ImageIcon, Maximize, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { getAdminToken } from "@/lib/api/auth";
import LoadingDots from '@/components/ui/LoadingDots';


interface Booth {
    id: string;
    number: string;
    status: "available" | "booked" | "reserved";
    company?: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface FloorPlanData {
    imageUrl: string | null;
    booths: Booth[];
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "available": return "bg-green-500/60 border-green-400 hover:bg-green-500/80";
        case "booked": return "bg-blue-500/60 border-blue-400 hover:bg-blue-500/80";
        case "reserved": return "bg-yellow-500/60 border-yellow-400 hover:bg-yellow-500/80";
        default: return "bg-gray-500/60 border-gray-400";
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case "available": return "Available";
        case "booked": return "Booked";
        case "reserved": return "Reserved";
        default: return status;
    }
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function FloorPlanPage() {
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [floorPlan, setFloorPlan] = useState<FloorPlanData | null>(null);
    const [loading, setLoading] = useState(true);
    const [zoom, setZoom] = useState(1);
    const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [updatingBooth, setUpdatingBooth] = useState(false);
    const [editBoothData, setEditBoothData] = useState<Partial<Booth>>({});
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            console.log("❌ Not authenticated, redirecting to login");
            window.location.href = "/admin/login";
        }
    }, [isAuthenticated, authLoading]);

    // Fetch floor plan data
    const fetchFloorPlan = async () => {
        const token = getAdminToken();
        if (!token) {
            console.log("❌ No token found");
            toast.error("Please login again");
            window.location.href = "/admin/login";
            return;
        }

        try {
            setLoading(true);
            setError(null);

            console.log("📡 Fetching floor plan with token:", token.substring(0, 20) + "...");

            const response = await fetch(`${API_BASE_URL}/floor-plan`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log("📡 Response status:", response.status);

            // If unauthorized, redirect to login
            if (response.status === 401) {
                console.log("❌ Unauthorized - Token invalid or expired");
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminUser');
                toast.error("Session expired. Please login again.");
                window.location.href = "/admin/login";
                return;
            }

            const data = await response.json();
            console.log('📡 Floor plan response:', data);

            if (data.success && data.data) {
                const imageUrl = data.data.imageUrl || data.data.baseImageUrl || null;
                const booths = data.data.booths || [];
                setFloorPlan({ imageUrl, booths });

                if (!imageUrl) {
                    setShowUploadModal(true);
                }
            } else {
                setFloorPlan({ imageUrl: null, booths: [] });
                setShowUploadModal(true);
            }
        } catch (error) {
            console.error("Failed to fetch floor plan:", error);
            setError("Failed to load floor plan. Please check if backend is running.");
            toast.error("Failed to load floor plan");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchFloorPlan();
        }
    }, [isAuthenticated]);

    // Rest of your component remains the same...
    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.5));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
    const handleZoomReset = () => setZoom(1);

    const handleBoothClick = (booth: Booth) => {
        setSelectedBooth(booth);
        setEditBoothData({ ...booth });
        setShowModal(true);
    };

    const handleUpdateBooth = async () => {
        if (!selectedBooth) return;

        const token = getAdminToken();
        if (!token) {
            toast.error("Please login again");
            window.location.href = "/admin/login";
            return;
        }

        setUpdatingBooth(true);
        try {
            const response = await fetch(`${API_BASE_URL}/floor-plan/booth/${selectedBooth.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editBoothData)
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Booth updated successfully");
                await fetchFloorPlan();
                setShowModal(false);
            } else {
                toast.error(data.error || "Failed to update booth");
            }
        } catch (error) {
            console.error("Update booth error:", error);
            toast.error("Failed to update booth");
        } finally {
            setUpdatingBooth(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const token = getAdminToken();
        if (!token) {
            toast.error("Please login again");
            window.location.href = "/admin/login";
            return;
        }

        if (!file.type.startsWith('image/')) {
            toast.error("Please upload an image file");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            toast.error("Image must be less than 10MB");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${API_BASE_URL}/floor-plan/upload-image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                toast.success("Floor plan uploaded successfully");
                await fetchFloorPlan();
                setShowUploadModal(false);
            } else {
                toast.error(data.error || "Failed to upload image");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload floor plan image");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <LoadingDots tone="light" className="mx-auto flex" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const stats = {
        total: floorPlan?.booths?.length || 0,
        available: floorPlan?.booths?.filter(b => b.status === "available").length || 0,
        booked: floorPlan?.booths?.filter(b => b.status === "booked").length || 0,
        reserved: floorPlan?.booths?.filter(b => b.status === "reserved").length || 0,
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Floor Plan Manager</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {floorPlan?.imageUrl ? "Interactive exhibition floor plan active" : "No floor plan uploaded"}
                    </p>
                </div>
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="px-4 py-2.5 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm hover:shadow transition flex items-center gap-2 text-sm font-medium cursor-pointer"
                    >
                        <Upload size={16} />
                        Upload Layout
                    </button>
                    <button
                        onClick={fetchFloorPlan}
                        className="px-4 py-2.5 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 text-sm font-medium cursor-pointer shadow-2xs"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                    <button onClick={fetchFloorPlan} className="mt-2 text-xs text-[#003A77] hover:underline font-semibold cursor-pointer">
                        Try again
                    </button>
                </div>
            )}

            {!floorPlan?.imageUrl && !error && (
                <div className="bg-white rounded-xl border border-gray-200/80 p-12 text-center shadow-xs">
                    <Map className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">No Floor Plan Uploaded</h3>
                    <p className="text-gray-500 text-sm mb-6">Upload a floor plan image to manage booth allocations visually</p>
                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="px-5 py-2.5 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm hover:shadow transition flex items-center gap-2 mx-auto text-sm font-medium cursor-pointer"
                    >
                        <Upload size={16} />
                        Upload Floor Plan
                    </button>
                </div>
            )}

            {floorPlan?.imageUrl && (
                <>
                    <div className="bg-white rounded-xl border border-gray-200/80 p-3 shadow-xs flex items-center gap-3">
                        <button onClick={handleZoomOut} className="p-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg transition cursor-pointer text-gray-700">
                            <ZoomOut size={16} />
                        </button>
                        <span className="text-gray-900 font-semibold text-sm min-w-12 text-center">{Math.round(zoom * 100)}%</span>
                        <button onClick={handleZoomIn} className="p-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg transition cursor-pointer text-gray-700">
                            <ZoomIn size={16} />
                        </button>
                        <button onClick={handleZoomReset} className="px-3 py-1.5 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 transition cursor-pointer flex items-center gap-1">
                            <Maximize size={12} />
                            Reset
                        </button>
                    </div>

                    <div className="bg-slate-100 rounded-xl border border-gray-200/80 overflow-auto shadow-inner" style={{ height: "600px" }}>
                        <div className="relative" style={{ transform: `scale(${zoom})`, transformOrigin: "top left", width: "fit-content", minWidth: "100%" }}>
                            <div className="relative inline-block">
                                <img src={floorPlan.imageUrl} alt="Floor Plan" className="block max-w-none" />
                                {floorPlan.booths?.map((booth) => (
                                    <div
                                        key={booth.id}
                                        onClick={() => handleBoothClick(booth)}
                                        className={`absolute border-2 rounded-lg cursor-pointer transition-all hover:shadow-lg hover:brightness-105 ${getStatusColor(booth.status)}`}
                                        style={{
                                            left: `${booth.x}%`,
                                            top: `${booth.y}%`,
                                            width: `${booth.width}%`,
                                            height: `${booth.height}%`,
                                        }}
                                    >
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                                            <span className="text-white font-bold text-xs md:text-sm text-center truncate w-full drop-shadow-sm">{booth.number}</span>
                                            {booth.company && <span className="text-[11px] text-white/90 truncate w-full text-center hidden sm:block drop-shadow-sm">{booth.company}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-4 text-center border border-gray-200/80 shadow-xs">
                            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            <p className="text-xs text-gray-500 font-medium mt-0.5">Total Booths</p>
                        </div>
                        <div className="bg-emerald-50/40 rounded-xl p-4 text-center border border-emerald-200/80 shadow-xs">
                            <p className="text-2xl font-bold text-emerald-700">{stats.available}</p>
                            <p className="text-xs text-emerald-600 font-medium mt-0.5">Available</p>
                        </div>
                        <div className="bg-sky-50/40 rounded-xl p-4 text-center border border-sky-200/80 shadow-xs">
                            <p className="text-2xl font-bold text-[#003A77]">{stats.booked}</p>
                            <p className="text-xs text-sky-700 font-medium mt-0.5">Booked</p>
                        </div>
                        <div className="bg-amber-50/40 rounded-xl p-4 text-center border border-amber-200/80 shadow-xs">
                            <p className="text-2xl font-bold text-amber-700">{stats.reserved}</p>
                            <p className="text-xs text-amber-600 font-medium mt-0.5">Reserved</p>
                        </div>
                    </div>
                </>
            )}

            {/* Modals */}
            {showModal && selectedBooth && (
                <div className="fixed inset-0 bg-[#003A77]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-200 shadow-2xl">
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">Booth {selectedBooth.number}</h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition cursor-pointer">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Booth Number</label>
                                <input type="text" value={editBoothData.number || ""} onChange={(e) => setEditBoothData({ ...editBoothData, number: e.target.value })} className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:bg-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                                <select value={editBoothData.status || "available"} onChange={(e) => setEditBoothData({ ...editBoothData, status: e.target.value as any })} className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:bg-white cursor-pointer">
                                    <option value="available">Available</option>
                                    <option value="booked">Booked</option>
                                    <option value="reserved">Reserved</option>
                                </select>
                            </div>
                            {(editBoothData.status === "booked" || editBoothData.status === "reserved") && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                                    <input type="text" value={editBoothData.company || ""} onChange={(e) => setEditBoothData({ ...editBoothData, company: e.target.value })} className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:bg-white" />
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                            <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm font-medium cursor-pointer">
                                Cancel
                            </button>
                            <button onClick={handleUpdateBooth} disabled={updatingBooth} className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm font-medium transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm cursor-pointer">
                                {updatingBooth ? <LoadingDots size="sm" tone="light" /> : <Save size={16} />}
                                {updatingBooth ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showUploadModal && (
                <div className="fixed inset-0 bg-[#003A77]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-200 shadow-2xl">
                        <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">Upload Floor Plan</h3>
                            <button onClick={() => setShowUploadModal(false)} className="p-1 hover:bg-gray-100 rounded-lg transition cursor-pointer">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 hover:border-[#00A1B1] rounded-xl p-8 text-center transition bg-gray-50/50">
                                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-700 font-medium mb-1 text-sm">Click or drag to upload floor plan image</p>
                                <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 10MB</p>
                                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="floorPlanUpload" />
                                <label htmlFor="floorPlanUpload" className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm text-sm font-medium transition cursor-pointer">
                                    Select Image
                                </label>
                            </div>
                            {uploading && (
                                <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                                    <LoadingDots size="sm" tone="dark" />
                                    <span>Uploading layout...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}