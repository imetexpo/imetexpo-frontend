// app/admin/furniture/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, X, Upload } from "lucide-react";
import { createFurniture } from "@/lib/api/furniture";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';

const categories = ["Tables", "Chairs", "Seating", "Counters", "Storage", "Display", "Decor"];

export default function CreateFurniturePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        code: "",
        description: "",
        size: "",
        cost3Days: "",
        category: "Tables",
        inStock: true,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image must be less than 5MB");
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.code) {
            toast.error("Item code is required");
            return;
        }
        if (!formData.description) {
            toast.error("Description is required");
            return;
        }
        if (!formData.cost3Days || parseInt(formData.cost3Days) <= 0) {
            toast.error("Valid rental price is required");
            return;
        }

        setLoading(true);

        try {
            const response = await createFurniture({
                code: formData.code.toUpperCase(),
                description: formData.description,
                size: formData.size || undefined,
                cost3Days: parseInt(formData.cost3Days),
                category: formData.category,
                inStock: formData.inStock,
            }, imageFile || undefined);

            if (response.success) {
                toast.success("Furniture created successfully!");
                router.push("/admin/furniture");
            } else {
                toast.error(response.message || "Failed to create furniture");
            }
        } catch (error: any) {
            console.error("Create furniture error:", error);
            const errorMsg = error.response?.data?.message || error.message || "Failed to create furniture";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-600 shadow-xs transition">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Add New Furniture</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Add furniture item to exhibition catalog</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="bg-white rounded-xl border border-gray-200/80 p-6 mb-6 shadow-xs">
                    {/* Image Upload */}
                    <div className="mb-6">
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Furniture Image
                        </label>
                        <div className="border-2 border-dashed border-gray-300 hover:border-[#00A1B1] rounded-xl p-5 text-center bg-gray-50/50 transition">
                            {imagePreview ? (
                                <div className="relative inline-block">
                                    <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow-xs" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImageFile(null);
                                            setImagePreview(null);
                                        }}
                                        className="absolute top-2 right-2 p-1.5 bg-rose-500 hover:bg-rose-600 rounded-full text-white shadow-xs transition"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm font-medium text-gray-700 mb-1">Click or drag to upload image</p>
                                    <p className="text-xs text-gray-400">JPEG, PNG, GIF, WebP up to 5MB</p>
                                    <label className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition cursor-pointer shadow-xs">
                                        <Upload size={14} />
                                        Select Image
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </label>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Item Code <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                placeholder="e.g., TBL-001"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Description <span className="text-rose-500">*</span>
                            </label>
                            <textarea
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                placeholder="Detailed description of the furniture item"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Size
                                </label>
                                <input
                                    type="text"
                                    value={formData.size}
                                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                    placeholder="e.g., 6ft x 3ft"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Category <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1]"
                                >
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Rental Price (3 days) <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                    <input
                                        type="number"
                                        value={formData.cost3Days}
                                        onChange={(e) => setFormData({ ...formData, cost3Days: e.target.value })}
                                        className="w-full pl-7 pr-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Stock Status
                                </label>
                                <select
                                    value={formData.inStock ? "true" : "false"}
                                    onChange={(e) => setFormData({ ...formData, inStock: e.target.value === "true" })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1]"
                                >
                                    <option value="true">In Stock</option>
                                    <option value="false">Out of Stock</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg shadow-xs transition flex items-center gap-1.5 disabled:opacity-50"
                    >
                        {loading ? (
                            <LoadingDots size="sm" tone="light" />
                        ) : (
                            <Save size={16} />
                        )}
                        {loading ? "Creating..." : "Create Furniture"}
                    </button>
                </div>
            </form>
        </div>
    );
}
