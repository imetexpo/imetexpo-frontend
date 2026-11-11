// app/admin/exhibitors/new/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Building, User, Mail, Phone, MapPin, CreditCard, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { createExhibitor } from "@/lib/api/exhibitors";
import { getAdminToken, isAuthenticated } from "@/lib/api/auth";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';
import ExhibitorPaymentFields, {
    defaultPaymentFormValue,
    type PaymentFormValue,
} from "@/components/admin/ExhibitorPaymentFields";

export default function AddExhibitorPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [payment, setPayment] = useState<PaymentFormValue>(defaultPaymentFormValue);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        sector: "",
        boothNumber: "",
        password: "",
        confirmPassword: "",
        status: "pending",
        boothSize: "",
        boothType: "",
        boothDimensions: "",
        boothNotes: "",
        boothPrice: "",
        address: "",
        website: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Check authentication
    useEffect(() => {
        const token = getAdminToken();
        if (!token) {
            router.push("/admin/login");
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.company.trim()) newErrors.company = "Company name is required";
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setLoading(true);

        try {
            const submitData = {
                name: formData.name.trim(),
                email: formData.email.toLowerCase().trim(),
                phone: formData.phone,
                company: formData.company.trim(),
                sector: formData.sector,
                boothNumber: formData.boothNumber,
                password: formData.password,
                status: formData.status,
                boothSize: formData.boothSize,
                boothType: formData.boothType,
                boothDimensions: formData.boothDimensions,
                boothNotes: formData.boothNotes,
                boothPrice: formData.boothPrice || undefined,
                stallCost: payment.stallCost,
                gstPercent: payment.gstPercent || "18",
                discount: payment.discount,
                paymentPhases: payment.phases.map((phase, index) => ({
                    phase: index + 1,
                    dueDate: phase.dueDate,
                    status: phase.status,
                })),
                address: formData.address,
                website: formData.website,
            };

            const response = await createExhibitor(submitData);

            if (response.success) {
                toast.success("Exhibitor created successfully!");
                router.push("/admin/exhibitors");
            } else {
                toast.error(response.error || "Failed to create exhibitor");
            }
        } catch (error: any) {
            console.error("Create exhibitor error:", error);
            if (error.response?.status === 401) {
                toast.error("Session issue. Please login again.");
            } else {
                toast.error(error.response?.data?.error || "Failed to create exhibitor");
            }
        } finally {
            setLoading(false);
        }
    };

    const boothTypes = ["standard", "corner", "double", "island", "premium"];
    const boothSizes = ["3m x 3m", "6m x 6m", "9m x 9m", "12m x 12m", "15m x 15m"];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => router.back()} 
                    className="p-2 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg text-gray-600 transition cursor-pointer shadow-2xs"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Exhibitor</h1>
                    <p className="text-sm text-gray-500 mt-1">Register a new exhibitor for IndiaMET 2027</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl">
                {/* Company Information */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6 mb-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
                        <Building size={18} className="text-[#003A77]" />
                        Company Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="company"
                                required
                                value={formData.company}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 bg-gray-50/50 border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition`}
                                placeholder="e.g., Precision Metrology Systems Ltd"
                            />
                            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Sector/Industry
                            </label>
                            <input
                                type="text"
                                name="sector"
                                value={formData.sector}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                placeholder="e.g., Metrology & Testing Equipment"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Website
                            </label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                placeholder="https://example.com"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Address
                            </label>
                            <textarea
                                name="address"
                                rows={2}
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                placeholder="Street address, City, State"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6 mb-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
                        <User size={18} className="text-[#003A77]" />
                        Contact Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Contact Person Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 bg-gray-50/50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition`}
                                placeholder="Full name"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 bg-gray-50/50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition`}
                                placeholder="email@company.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                placeholder="+91 XXXXXXXXXX"
                            />
                        </div>
                    </div>
                </div>

                {/* Login Credentials */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6 mb-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
                        <Lock size={18} className="text-[#003A77]" />
                        Login Credentials
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 bg-gray-50/50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white pr-10 transition`}
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 bg-gray-50/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition`}
                                placeholder="Confirm password"
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                </div>

                {/* Booth Information */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6 mb-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
                        <MapPin size={18} className="text-[#003A77]" />
                        Booth Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Booth Number
                            </label>
                            <input
                                type="text"
                                name="boothNumber"
                                value={formData.boothNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                placeholder="e.g., A-101"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Booth Type
                            </label>
                            <select
                                name="boothType"
                                value={formData.boothType}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                            >
                                <option value="">Select booth type</option>
                                {boothTypes.map(type => (
                                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Booth Size
                            </label>
                            <select
                                name="boothSize"
                                value={formData.boothSize}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                            >
                                <option value="">Select booth size</option>
                                {boothSizes.map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Booth Price (₹)
                            </label>
                            <input
                                type="text"
                                name="boothPrice"
                                value={formData.boothPrice}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                placeholder="e.g., 250000"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Booth Dimensions / Notes
                            </label>
                            <textarea
                                name="boothNotes"
                                rows={2}
                                value={formData.boothNotes}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
                                placeholder="Special requirements or notes about the booth"
                            />
                        </div>
                    </div>
                </div>

                {/* Stall Cost & Payment Schedule */}
                <div className="mb-6">
                    <ExhibitorPaymentFields value={payment} onChange={setPayment} />
                </div>

                {/* Status */}
                <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-6 mb-6">
                    <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
                        <CreditCard size={18} className="text-[#003A77]" />
                        Account Status
                    </h2>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-lg text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition cursor-pointer"
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved (Active)</option>
                                <option value="rejected">Rejected</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition text-sm font-medium cursor-pointer shadow-2xs"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 bg-gradient-to-r from-[#003A77] to-[#004A96] hover:from-[#002855] hover:to-[#003A77] text-white rounded-lg shadow-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                    >
                        {loading ? (
                            <LoadingDots size="sm" tone="light" />
                        ) : (
                            <Save size={18} />
                        )}
                        {loading ? "Creating..." : "Register Exhibitor"}
                    </button>
                </div>
            </form>
        </div>
    );
}
