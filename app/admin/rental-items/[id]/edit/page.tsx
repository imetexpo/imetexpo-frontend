// app/admin/rental-items/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Upload, Image as ImageIcon, X } from "lucide-react";
import { getRentalItemById, updateRentalItem, RentalItem } from "@/lib/api/rentalItems";
import toast from "react-hot-toast";
import LoadingDots from '@/components/ui/LoadingDots';

const categories = [
    { value: "AV", label: "AV Equipment" },
    { value: "IT", label: "IT Equipment" },
    { value: "Other", label: "Other" }
];

export default function EditRentalItemPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [existingImage, setExistingImage] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        description: "",
        costFor3Days: "",
        category: "AV" as "AV" | "IT" | "Other",
        isActive: true,
        displayOrder: 1,
    });

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await getRentalItemById(id);
                if (response.success) {
                    const item = response.data;
                    setFormData({
                        code: item.code,
                        name: item.name,
                        description: item.description,
                        costFor3Days: item.costFor3Days.toString(),
                        category: item.category,
                        isActive: item.isActive,
                        displayOrder: item.displayOrder || 1,
                    });
                    setExistingImage(item.imageUrl);
                } else {
                    toast.error("Rental item not found");
                    router.push("/admin/rental-items");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Failed to load rental item");
                router.push("/admin/rental-items");
            } finally {
                setFetching(false);
            }
        };

        fetchItem();
    }, [id, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image must be less than 5MB");
                return;
            }
            if (!file.type.startsWith('image/')) {
                toast.error("Please upload an image file");
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
        if (!formData.name) {
            toast.error("Item name is required");
            return;
        }
        if (!formData.description) {
            toast.error("Description is required");
            return;
        }
        if (!formData.costFor3Days || parseInt(formData.costFor3Days) <= 0) {
            toast.error("Valid rental cost for 3 days is required");
            return;
        }

        setLoading(true);

        try {
            const response = await updateRentalItem(id, {
                code: formData.code.toUpperCase(),
                name: formData.name,
                description: formData.description,
                costFor3Days: parseInt(formData.costFor3Days),
                category: formData.category,
                isActive: formData.isActive,
                displayOrder: formData.displayOrder,
            }, imageFile || undefined);

            if (response.success) {
                toast.success("Rental item updated successfully!");
                router.push("/admin/rental-items");
            } else {
                toast.error(response.message || "Failed to update rental item");
            }
        } catch (error: any) {
            console.error("Update rental item error:", error);
            toast.error(error.response?.data?.message || "Failed to update rental item");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="bg-white rounded-xl border border-gray-200/80 p-12 flex items-center justify-center min-h-[300px]">
                <LoadingDots tone="dark" className="mx-auto flex" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <button onClick={() => router.back()} className="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-600 shadow-xs transition">
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Rental Item</h1>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Update rental item details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl">
                <div className="bg-white rounded-xl border border-gray-200/80 p-6 mb-6 shadow-xs">
                    {/* Image Upload Section */}
                    <div className="mb-6">
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Item Image
                        </label>
                        <div className="border-2 border-dashed border-gray-300 hover:border-[#00A1B1] rounded-xl p-5 text-center bg-gray-50/50 transition">
                            {(imagePreview || existingImage) ? (
                                <div className="relative inline-block">
                                    <img
                                        src={imagePreview || existingImage!}
                                        alt="Preview"
                                        className="max-h-48 rounded-lg mx-auto shadow-xs"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImageFile(null);
                                            setImagePreview(null);
                                            setExistingImage(null);
                                        }}
                                        className="absolute top-2 right-2 p-1.5 bg-rose-500 hover:bg-rose-600 rounded-full text-white shadow-xs transition"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm font-medium text-gray-700 mb-1">Click or drag to upload new image</p>
                                    <p className="text-xs text-gray-400">Leave empty to keep current image</p>
                                    <label className="mt-3.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-300 text-gray-700 text-xs font-semibold rounded-lg hover:bg-gray-50 transition cursor-pointer shadow-xs">
                                        <Upload size={14} />
                                        Select Image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
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
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Item Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
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
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Category <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1]"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Rental Cost (3 days) <span className="text-rose-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                                    <input
                                        type="number"
                                        value={formData.costFor3Days}
                                        onChange={(e) => setFormData({ ...formData, costFor3Days: e.target.value })}
                                        className="w-full pl-7 pr-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.displayOrder}
                                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                    Status
                                </label>
                                <select
                                    value={formData.isActive ? "active" : "inactive"}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "active" })}
                                    className="w-full px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-[#00A1B1]"
                                >
                                    <option value="active">Active (Visible to exhibitors)</option>
                                    <option value="inactive">Inactive (Hidden from exhibitors)</option>
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
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
