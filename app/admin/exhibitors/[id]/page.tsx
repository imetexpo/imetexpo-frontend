// app/admin/exhibitors/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Mail, Phone, MapPin, Building, Calendar, CheckCircle, Clock, XCircle, Package, FileText, CreditCard, Lock } from "lucide-react";
import Link from "next/link";
import { getExhibitor, getExhibitorProducts, getExhibitorBrands, getExhibitorBrochures, Exhibitor, StallDetails, resendCredentials } from "@/lib/api/exhibitors";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';

const getStatusColor = (status: string) => {
    switch (status) {
        case "approved":
        case "active": return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
        case "pending": return "bg-amber-50 text-amber-700 border-amber-200/80";
        case "rejected": return "bg-rose-50 text-rose-700 border-rose-200/80";
        case "inactive": return "bg-gray-100 text-gray-600 border-gray-200";
        default: return "bg-gray-100 text-gray-600 border-gray-200";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "approved":
        case "active": return <CheckCircle size={16} className="text-emerald-600" />;
        case "pending": return <Clock size={16} className="text-amber-600" />;
        case "rejected": return <XCircle size={16} className="text-rose-600" />;
        default: return <Clock size={16} className="text-gray-500" />;
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case "approved": return "Active";
        case "active": return "Active";
        case "pending": return "Pending";
        case "rejected": return "Rejected";
        case "inactive": return "Inactive";
        default: return status;
    }
};

export default function ExhibitorDetailPage() {
    const params = useParams();
    const router = useRouter();
    const exhibitorId = params.id as string;

    const [exhibitor, setExhibitor] = useState<Exhibitor | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [brochures, setBrochures] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [resending, setResending] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [exhibitorRes, productsRes, brandsRes, brochuresRes] = await Promise.all([
                    getExhibitor(exhibitorId),
                    getExhibitorProducts(exhibitorId).catch(() => ({ data: [] })),
                    getExhibitorBrands(exhibitorId).catch(() => ({ data: [] })),
                    getExhibitorBrochures(exhibitorId).catch(() => ({ data: [] })),
                ]);

                if (exhibitorRes.success) {
                    setExhibitor(exhibitorRes.data);
                } else {
                    toast.error("Failed to load exhibitor data");
                    router.push("/admin/exhibitors");
                }

                if (productsRes.success) setProducts(productsRes.data || []);
                if (brandsRes.success) setBrands(brandsRes.data || []);
                if (brochuresRes.success) setBrochures(brochuresRes.data || []);

            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Failed to load exhibitor data");
                router.push("/admin/exhibitors");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [exhibitorId, router]);

    const handleResendCredentials = async () => {
        if (!exhibitor) return;

        setResending(true);
        try {
            const response = await resendCredentials(exhibitor.id);
            if (response.success) {
                toast.success(`Credentials sent to ${exhibitor.email}`);
                if (response.data?.note) {
                    toast.success(response.data.note);
                }
            } else {
                toast.error(response.error || "Failed to send credentials");
            }
        } catch (error) {
            toast.error("Failed to send credentials");
        } finally {
            setResending(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                <LoadingDots tone="dark" className="flex" />
                <p className="text-gray-500 mt-3 text-sm">Loading exhibitor details...</p>
            </div>
        );
    }

    if (!exhibitor) {
        return (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 font-medium">Exhibitor not found</p>
            </div>
        );
    }

    const stallDetails: StallDetails = exhibitor.stallDetails || {};
    const statusLabel = getStatusLabel(exhibitor.status);
    const statusColor = getStatusColor(exhibitor.status);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3.5">
                    <button 
                        onClick={() => router.back()} 
                        className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg text-gray-600 transition cursor-pointer shadow-2xs"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{exhibitor.company}</h1>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">Exhibitor ID: {exhibitor.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={handleResendCredentials}
                        disabled={resending}
                        className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2 text-sm font-medium disabled:opacity-50 cursor-pointer shadow-2xs"
                    >
                        {resending ? <LoadingDots size="sm" tone="dark" /> : <Mail size={16} />}
                        Resend Credentials
                    </button>
                    <Link 
                        href={`/admin/exhibitors/${exhibitor.id}/edit`} 
                        className="px-4 py-2 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm hover:shadow transition flex items-center gap-2 text-sm font-medium cursor-pointer"
                    >
                        <Edit size={16} />
                        Edit Exhibitor
                    </Link>
                </div>
            </div>

            {/* Status Banner */}
            <div className={`flex items-center justify-between p-4 rounded-xl border ${statusColor}`}>
                <div className="flex items-center gap-3">
                    {getStatusIcon(exhibitor.status)}
                    <span className="font-semibold text-sm">{statusLabel}</span>
                    <span className="text-xs opacity-75">
                        • Registered on {new Date(exhibitor.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Company Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Company Information */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Building size={18} className="text-[#003A77]" />
                            Company Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Company Name</p>
                                <p className="text-gray-900 font-semibold text-sm mt-0.5">{exhibitor.company}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Sector / Industry</p>
                                <p className="text-gray-900 text-sm mt-0.5">{exhibitor.sector || "Not specified"}</p>
                            </div>
                            {exhibitor.website && (
                                <div className="md:col-span-2">
                                    <p className="text-xs text-gray-500 font-medium">Website</p>
                                    <a href={exhibitor.website} target="_blank" rel="noopener noreferrer" className="text-[#00A1B1] hover:underline text-sm font-medium mt-0.5 inline-block">
                                        {exhibitor.website}
                                    </a>
                                </div>
                            )}
                            {exhibitor.address && (
                                <div className="md:col-span-2">
                                    <p className="text-xs text-gray-500 font-medium">Address</p>
                                    <p className="text-gray-900 text-sm mt-0.5">{exhibitor.address}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Mail size={18} className="text-[#003A77]" />
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Contact Person</p>
                                <p className="text-gray-900 font-semibold text-sm mt-0.5">{exhibitor.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Email Address</p>
                                <p className="text-gray-900 text-sm mt-0.5">{exhibitor.email}</p>
                            </div>
                            {exhibitor.phone && (
                                <div>
                                    <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                                    <p className="text-gray-900 text-sm mt-0.5">{exhibitor.phone}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Products */}
                    {products.length > 0 && (
                        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6">
                            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Package size={18} className="text-[#003A77]" />
                                Products ({products.length})
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {products.map((product: any) => (
                                    <span key={product.id} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                                        {product.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Brands */}
                    {brands.length > 0 && (
                        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6">
                            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <CreditCard size={18} className="text-[#003A77]" />
                                Brands ({brands.length})
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {brands.map((brand: any) => (
                                    <span key={brand.id} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700">
                                        {brand.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Brochures */}
                    {brochures.length > 0 && (
                        <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6">
                            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-[#003A77]" />
                                Brochures ({brochures.length})
                            </h2>
                            <div className="space-y-2">
                                {brochures.map((brochure: any) => (
                                    <a
                                        key={brochure.id}
                                        href={brochure.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2.5 p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
                                    >
                                        <FileText size={16} className="text-[#003A77]" />
                                        <span className="font-medium">{brochure.title || "Brochure"}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Booth & Actions */}
                <div className="space-y-6">
                    {/* Booth Information */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-[#003A77]" />
                            Booth Details
                        </h2>
                        <div className="space-y-3.5 divide-y divide-gray-100 text-sm">
                            <div className="flex justify-between items-center pt-1">
                                <span className="text-gray-500">Booth Number:</span>
                                <span className="font-bold text-[#003A77]">{exhibitor.boothNumber || "Not assigned"}</span>
                            </div>
                            <div className="flex justify-between items-center pt-3.5">
                                <span className="text-gray-500">Booth Type:</span>
                                <span className="font-medium text-gray-900">{stallDetails.type || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between items-center pt-3.5">
                                <span className="text-gray-500">Booth Size:</span>
                                <span className="font-medium text-gray-900">{stallDetails.size || "Not specified"}</span>
                            </div>
                            {stallDetails.dimensions && (
                                <div className="flex justify-between items-center pt-3.5">
                                    <span className="text-gray-500">Dimensions:</span>
                                    <span className="font-medium text-gray-900">{stallDetails.dimensions}</span>
                                </div>
                            )}
                            {stallDetails.price && (
                                <div className="flex justify-between items-center pt-3.5">
                                    <span className="text-gray-500">Price:</span>
                                    <span className="font-semibold text-gray-900">₹{parseInt(stallDetails.price).toLocaleString()}</span>
                                </div>
                            )}
                        </div>
                        {stallDetails.notes && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 font-medium">Notes:</p>
                                <p className="text-xs text-gray-700 mt-1">{stallDetails.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <button
                                onClick={() => window.location.href = `mailto:${exhibitor.email}`}
                                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition border border-gray-200 cursor-pointer font-medium"
                            >
                                <span>Send Email</span>
                                <Mail size={16} className="text-gray-400" />
                            </button>
                            {exhibitor.phone && (
                                <button
                                    onClick={() => window.location.href = `tel:${exhibitor.phone}`}
                                    className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition border border-gray-200 cursor-pointer font-medium"
                                >
                                    <span>Call Contact</span>
                                    <Phone size={16} className="text-gray-400" />
                                </button>
                            )}
                            <button
                                onClick={handleResendCredentials}
                                disabled={resending}
                                className="w-full flex items-center justify-between px-3.5 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition border border-gray-200 cursor-pointer font-medium disabled:opacity-50"
                            >
                                <span>Resend Credentials</span>
                                <Lock size={16} className="text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
