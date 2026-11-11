// app/admin/profile/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, User, Mail, Phone, Shield, Camera, Upload } from "lucide-react";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';

export default function AdminProfilePage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "Administrator",
        email: "admin@indiamet.com",
        phone: "+91 98765 43210",
        role: "Super Admin",
        department: "Exhibition Administration",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            toast.success("Profile updated successfully");
        }, 800);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Manage your administrator account information</p>
            </div>

            <div className="max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Profile Image */}
                    <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="h-20 w-20 rounded-full bg-linear-to-br from-[#003A77] to-[#00A1B1] flex items-center justify-center text-white shadow-xs">
                                    <User className="h-9 w-9 text-white" />
                                </div>
                                <button type="button" className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-200 rounded-full hover:bg-gray-50 shadow-xs transition">
                                    <Camera size={13} className="text-gray-600" />
                                </button>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Profile Photo</h3>
                                <p className="text-xs text-gray-400 mt-0.5">JPG, PNG or GIF. Max 2MB.</p>
                                <button type="button" className="mt-2.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition flex items-center gap-1.5">
                                    <Upload size={13} />
                                    Upload Photo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs">
                        <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <User size={16} className="text-[#00A1B1]" />
                            Personal Information
                        </h2>
                        <div className="space-y-3.5">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Role Information */}
                    <div className="bg-white rounded-xl border border-gray-200/80 p-6 shadow-xs">
                        <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Shield size={16} className="text-[#00A1B1]" />
                            Role & Permissions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    disabled
                                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    value={formData.department}
                                    disabled
                                    className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Change Password Link */}
                    <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Change Password</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Update your password regularly for security</p>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => router.push("/admin/settings")}
                                className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition"
                            >
                                Settings
                            </button>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-5 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg shadow-xs transition flex items-center gap-1.5"
                        >
                            {saving ? (
                                <LoadingDots size="sm" tone="light" />
                            ) : (
                                <Save size={16} />
                            )}
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
