// app/admin/furniture/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  EyeSlashIcon,
  CubeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import LoadingDots from "@/components/ui/LoadingDots";
import {
  getFurniture,
  createFurniture,
  updateFurniture,
  deleteFurniture,
  updateStockStatus,
  toggleFurnitureActive,
  type Furniture,
} from "@/lib/api/furniture";

const DEFAULT_CATEGORIES = [
  "Furniture",
  "Tables",
  "Chairs",
  "Seating",
  "Counters",
  "Display",
  "Storage",
  "Lighting",
  "Electrical",
  "Decor",
  "Accessories",
];

function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("adminToken") ||
    localStorage.getItem("admin_token") ||
    localStorage.getItem("token")
  );
}

export default function AdminFurniturePage() {
  const router = useRouter();
  const [furnitureItems, setFurnitureItems] = useState<Furniture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Furniture | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    size: "",
    cost3Days: 0,
    category: "Furniture",
    inStock: true,
    isActive: true,
  });

  const loadFurniture = async () => {
    const token = getAdminToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await getFurniture();
      if (response.success) {
        setFurnitureItems(response.data || []);
      } else {
        setError(response.message || "Failed to load furniture items");
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }
      setError(err?.response?.data?.message || err?.message || "Failed to load furniture items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFurniture();
  }, []);

  const discoveredCategories = useMemo(() => {
    const unique = new Set<string>();
    furnitureItems.forEach((item) => {
      if (item.category) unique.add(item.category);
    });
    return Array.from(unique).sort();
  }, [furnitureItems]);

  const modalCategories = useMemo(() => {
    return Array.from(new Set([...DEFAULT_CATEGORIES, ...discoveredCategories]));
  }, [discoveredCategories]);

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return furnitureItems.filter((item) => {
      if (query) {
        const matchesSearch =
          item.description?.toLowerCase().includes(query) ||
          item.code?.toLowerCase().includes(query) ||
          item.size?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== "all") {
        const isItemActive = item.isActive !== false;
        if (selectedStatus === "active" && !isItemActive) return false;
        if (selectedStatus === "inactive" && isItemActive) return false;
      }
      return true;
    });
  }, [furnitureItems, searchTerm, selectedCategory, selectedStatus]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData({
      code: "",
      description: "",
      size: "",
      cost3Days: 0,
      category: "Furniture",
      inStock: true,
      isActive: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingItem(null);
    setShowModal(false);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      code: "",
      description: "",
      size: "",
      cost3Days: 0,
      category: "Furniture",
      inStock: true,
      isActive: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const editItem = (item: Furniture) => {
    setEditingItem(item);
    setFormData({
      code: item.code || "",
      description: item.description || "",
      size: item.size || "",
      cost3Days: Number(item.cost3Days) || 0,
      category: item.category || "Furniture",
      inStock: Boolean(item.inStock),
      isActive: item.isActive !== false,
    });
    setImageFile(null);
    setImagePreview(item.imageUrl || null);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.code.trim() || !formData.description.trim() || formData.cost3Days < 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim(),
        size: formData.size.trim(),
        cost3Days: Number(formData.cost3Days) || 0,
        category: formData.category || "Furniture",
        inStock: formData.inStock,
        isActive: formData.isActive,
      };

      const response = editingItem
        ? await updateFurniture(editingItem.id, payload, imageFile || undefined)
        : await createFurniture(payload, imageFile || undefined);

      if (!response.success) {
        throw new Error(response.message || "Failed to save item");
      }

      toast.success(editingItem ? "Item updated successfully" : "Item added successfully");
      await loadFurniture();
      resetForm();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }
      const msg = err?.response?.data?.message || err?.message || "Failed to save item";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: Furniture) => {
    if (!confirm(`Are you sure you want to delete ${item.code}?`)) return;

    try {
      const response = await deleteFurniture(item.id);
      if (!response.success) {
        throw new Error(response.message || "Failed to delete item");
      }
      toast.success("Item deleted successfully");
      await loadFurniture();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/admin/login");
        return;
      }
      const msg = err?.response?.data?.message || err?.message || "Failed to delete item";
      toast.error(msg);
    }
  };

  const handleToggleStock = async (item: Furniture) => {
    try {
      const nextInStock = !Boolean(item.inStock);
      const response = await updateStockStatus(item.id, nextInStock);
      if (!response.success) {
        throw new Error(response.message || "Failed to update stock status");
      }
      toast.success(`Item marked as ${nextInStock ? "In Stock" : "Out of Stock"}`);
      await loadFurniture();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/admin/login");
        return;
      }
      const msg = err?.response?.data?.message || err?.message || "Failed to update stock status";
      toast.error(msg);
    }
  };

  const handleToggleActive = async (item: Furniture) => {
    try {
      const nextActive = !(item.isActive !== false);
      const response = await toggleFurnitureActive(item.id, nextActive);
      if (!response.success) {
        throw new Error(response.message || "Failed to update active status");
      }
      toast.success(`Item ${nextActive ? "activated" : "deactivated"} successfully`);
      await loadFurniture();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/admin/login");
        return;
      }
      const msg = err?.response?.data?.message || err?.message || "Failed to update status";
      toast.error(msg);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <LoadingDots tone="brand" className="mx-auto flex" />
          <p className="mt-4 text-sm font-medium text-gray-600">Loading furniture catalog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Furniture Catalog</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
            Manage furniture rental items available to exhibitors
          </p>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={loadFurniture}
            className="inline-flex items-center justify-center px-3.5 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-2xs text-sm cursor-pointer"
          >
            <ArrowPathIcon className="h-4 w-4 mr-1.5" />
            Refresh
          </button>
          <button
            onClick={openAddModal}
            className="flex-1 sm:flex-none inline-flex items-center justify-center px-4 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002855] transition-colors shadow-sm text-sm font-medium cursor-pointer"
          >
            <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5" />
            Add New Item
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 flex items-center text-rose-800">
          <ExclamationCircleIcon className="h-5 w-5 mr-2 text-rose-600 shrink-0" />
          <span className="flex-1 text-sm">{error}</span>
          <button
            onClick={() => setError("")}
            className="ml-4 text-rose-600 hover:text-rose-800 cursor-pointer"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-xs p-4 border border-gray-200/80">
          <p className="text-xs text-gray-500 font-medium">Total Items</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">
            {furnitureItems.length}
          </p>
        </div>
        <div className="bg-emerald-50/40 rounded-xl shadow-xs p-4 border border-emerald-200/80">
          <p className="text-xs text-emerald-700 font-medium">In Stock</p>
          <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-0.5">
            {furnitureItems.filter((i) => i.inStock).length}
          </p>
        </div>
        <div className="bg-sky-50/40 rounded-xl shadow-xs p-4 border border-sky-200/80">
          <p className="text-xs text-[#003A77] font-medium">Active</p>
          <p className="text-xl sm:text-2xl font-bold text-[#003A77] mt-0.5">
            {furnitureItems.filter((i) => i.isActive !== false).length}
          </p>
        </div>
        <div className="bg-purple-50/40 rounded-xl shadow-xs p-4 border border-purple-200/80">
          <p className="text-xs text-purple-700 font-medium">Categories</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-0.5">
            {discoveredCategories.length}
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-xs p-4 border border-gray-200/80">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by code, description, or size..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 sm:w-44 relative">
              <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] bg-white cursor-pointer"
              >
                <option value="all">All Categories</option>
                {discoveredCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 sm:w-40">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] bg-white cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Furniture Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl shadow-xs border overflow-hidden hover:shadow-md transition-all group ${
                item.isActive === false
                  ? "opacity-60 border-gray-300"
                  : "border-gray-200/80 hover:border-[#00A1B1]/50"
              }`}
            >
              {/* Image */}
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.description}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PhotoIcon className="h-12 w-12 text-gray-300" />
                  </div>
                )}

                {/* Status Badges */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm ${
                      item.inStock
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-rose-100 text-rose-800 border border-rose-200"
                    }`}
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                  {item.isActive === false && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm bg-gray-100 text-gray-800 border border-gray-200">
                      Inactive
                    </span>
                  )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-[#003A77] border border-sky-200 shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => editItem(item)}
                      className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all transform hover:scale-110 cursor-pointer"
                      title="Edit Item"
                    >
                      <PencilIcon className="h-4 w-4 text-[#003A77]" />
                    </button>
                    <button
                      onClick={() => handleToggleActive(item)}
                      className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all transform hover:scale-110 cursor-pointer"
                      title={item.isActive !== false ? "Deactivate" : "Activate"}
                    >
                      {item.isActive !== false ? (
                        <EyeSlashIcon className="h-4 w-4 text-orange-600" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-emerald-600" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all transform hover:scale-110 cursor-pointer"
                      title="Delete Item"
                    >
                      <TrashIcon className="h-4 w-4 text-rose-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono font-semibold text-[#003A77] bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                    {item.code}
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    {formatCurrency(item.cost3Days)}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                  {item.description}
                </h3>
                {item.size && <p className="text-xs text-gray-500">Size: {item.size}</p>}

                {/* Footer Actions & Timestamp */}
                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>
                    Updated: {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString("en-IN") : "N/A"}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleStock(item)}
                      className="p-1 text-gray-500 hover:text-emerald-600 rounded transition cursor-pointer"
                      title={item.inStock ? "Mark Out of Stock" : "Mark In Stock"}
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => editItem(item)}
                      className="p-1 text-gray-500 hover:text-[#00A1B1] rounded transition cursor-pointer"
                      title="Edit Item"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-1 text-gray-500 hover:text-rose-600 rounded transition cursor-pointer"
                      title="Delete Item"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <CubeIcon className="h-14 w-14 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Furniture Items Found</h3>
          <p className="text-sm text-gray-500 mb-4 px-4">
            {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
              ? "No items match your search criteria. Try adjusting your filters."
              : "Get started by adding your first furniture item to the catalog."}
          </p>
          {searchTerm || selectedCategory !== "all" || selectedStatus !== "all" ? (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setSelectedStatus("all");
              }}
              className="text-sm text-[#003A77] hover:text-[#00A1B1] font-semibold cursor-pointer"
            >
              Clear Filters
            </button>
          ) : (
            <button
              onClick={openAddModal}
              className="inline-flex items-center px-4 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002855] text-sm font-medium transition cursor-pointer"
            >
              <PlusIcon className="h-4 w-4 mr-1.5" />
              Add First Item
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-4 sm:my-8 max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-5 sm:p-6">
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {editingItem ? "Edit Furniture Item" : "Add New Furniture Item"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Image
                  </label>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <PhotoIcon className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        JPEG, PNG, GIF, WebP (Max 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Code and Category Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Code <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({ ...formData, code: e.target.value.toUpperCase() })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                      placeholder="e.g., PI-01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] bg-white"
                    >
                      {modalCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                    placeholder="e.g., Executive Chair"
                    required
                  />
                </div>

                {/* Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Size / Dimensions
                  </label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                    placeholder="e.g., 70CM x 75CM"
                  />
                </div>

                {/* Cost for 3 Days */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost for 3 Days (₹) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500 text-sm">₹</span>
                    <input
                      type="number"
                      value={formData.cost3Days}
                      onChange={(e) =>
                        setFormData({ ...formData, cost3Days: parseInt(e.target.value, 10) || 0 })
                      }
                      className="w-full border border-gray-300 rounded-lg pl-7 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                      placeholder="2000"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Status Checkboxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="h-4 w-4 text-[#003A77] rounded border-gray-300 focus:ring-[#00A1B1]"
                    />
                    <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                      Item is in stock
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="h-4 w-4 text-[#003A77] rounded border-gray-300 focus:ring-[#00A1B1]"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                      Active (visible to exhibitors)
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002855] transition-colors min-w-[120px] flex items-center justify-center disabled:opacity-50 text-sm font-medium cursor-pointer"
                  >
                    {submitting ? "Saving..." : editingItem ? "Update Item" : "Add Item"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
