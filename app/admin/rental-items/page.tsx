// app/admin/rental-items/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ComputerDesktopIcon,
  XMarkIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  DevicePhoneMobileIcon,
  TvIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import LoadingDots from "@/components/ui/LoadingDots";
import {
  getRentalItems,
  createRentalItem,
  updateRentalItem,
  deleteRentalItem,
  updateRentalItemStatus,
  type RentalItem,
} from "@/lib/api/rentalItems";

interface FormDataState {
  itemKey: string;
  description: string;
  costFor3Days: string;
  category: "AV" | "IT" | "Other";
  isActive: boolean;
  displayOrder: string;
}

function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("adminToken") ||
    localStorage.getItem("admin_token") ||
    localStorage.getItem("token")
  );
}

export default function AdminRentalItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<RentalItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const [formData, setFormData] = useState<FormDataState>({
    itemKey: "",
    description: "",
    costFor3Days: "",
    category: "AV",
    isActive: true,
    displayOrder: "",
  });

  const loadItems = async () => {
    const token = getAdminToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await getRentalItems();
      if (response.success) {
        setItems(response.data || []);
      } else {
        setError(response.message || "Failed to load items. Please try again.");
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }
      setError(err?.response?.data?.message || err?.message || "Failed to load items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const stats = useMemo(() => {
    const activeItems = items.filter((i) => Boolean(i.isActive)).length;
    const totalValue = items.reduce((acc, i) => acc + (Number(i.costFor3Days) || 0), 0);
    return {
      totalItems: items.length,
      activeItems,
      inactiveItems: items.length - activeItems,
      avItems: items.filter((i) => i.category === "AV").length,
      itItems: items.filter((i) => i.category === "IT").length,
      otherItems: items.filter((i) => i.category === "Other").length,
      totalValue,
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return items.filter((item) => {
      if (query) {
        const matchesSearch =
          item.description?.toLowerCase().includes(query) ||
          item.itemKey?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      if (selectedStatus !== "all") {
        const isActive = Boolean(item.isActive);
        if (selectedStatus === "active" && !isActive) return false;
        if (selectedStatus === "inactive" && isActive) return false;
      }
      return true;
    });
  }, [items, searchTerm, selectedCategory, selectedStatus]);

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
      itemKey: "",
      description: "",
      costFor3Days: "",
      category: "AV",
      isActive: true,
      displayOrder: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingItem(null);
    setShowModal(false);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      itemKey: "",
      description: "",
      costFor3Days: "",
      category: "AV",
      isActive: true,
      displayOrder: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const editItem = (item: RentalItem) => {
    setEditingItem(item);
    setFormData({
      itemKey: item.itemKey || "",
      description: item.description || "",
      costFor3Days: String(item.costFor3Days ?? 0),
      category: item.category || "AV",
      isActive: Boolean(item.isActive),
      displayOrder: item.displayOrder !== undefined ? String(item.displayOrder) : "",
    });
    setImageFile(null);
    setImagePreview(item.imageUrl || null);
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.itemKey.trim() || !formData.description.trim() || formData.costFor3Days === "") {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        itemKey: formData.itemKey.trim().replace(/\s+/g, ""),
        description: formData.description.trim(),
        costFor3Days: parseInt(formData.costFor3Days, 10) || 0,
        category: formData.category,
        isActive: formData.isActive,
        displayOrder: formData.displayOrder ? parseInt(formData.displayOrder, 10) : undefined,
      };

      const response = editingItem
        ? await updateRentalItem(editingItem.id, payload, imageFile || undefined)
        : await createRentalItem(payload, imageFile || undefined);

      if (!response.success) {
        throw new Error(response.message || "Failed to save rental item");
      }

      toast.success(editingItem ? "Item updated successfully" : "Item added successfully");
      await loadItems();
      resetForm();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }
      const msg = err?.response?.data?.message || err?.message || "Failed to save item";
      if (msg.toLowerCase().includes("unique") || msg.toLowerCase().includes("already exists")) {
        const dupMsg = "Item key already exists. Please use a unique key.";
        setError(dupMsg);
        toast.error(dupMsg);
      } else {
        setError(msg);
        toast.error(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: RentalItem) => {
    if (!confirm(`Are you sure you want to delete "${item.description}"?`)) return;

    try {
      setError("");
      const response = await deleteRentalItem(item.id);
      if (!response.success) {
        throw new Error(response.message || "Failed to delete");
      }
      toast.success("Item deleted successfully");
      await loadItems();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/admin/login");
        return;
      }
      const msg = err?.response?.data?.message || err?.message || "Failed to delete item";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleToggleActive = async (item: RentalItem) => {
    try {
      setError("");
      const nextStatus = !Boolean(item.isActive);
      const response = await updateRentalItemStatus(item.id, nextStatus);
      if (!response.success) {
        throw new Error(response.message || "Failed to update status");
      }
      toast.success(`Item ${nextStatus ? "activated" : "deactivated"} successfully`);
      await loadItems();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/admin/login");
        return;
      }
      const msg = err?.response?.data?.message || err?.message || "Failed to update status";
      setError(msg);
      toast.error(msg);
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "AV":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "IT":
        return "bg-sky-100 text-[#003A77] border-sky-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "AV":
        return <TvIcon className="h-4 w-4" />;
      case "IT":
        return <ComputerDesktopIcon className="h-4 w-4" />;
      default:
        return <DevicePhoneMobileIcon className="h-4 w-4" />;
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
          <p className="mt-4 text-sm font-medium text-gray-600">Loading rental items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">AV & IT Rental Items</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
            Manage rental items with pricing
          </p>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={loadItems}
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

      {/* Stats Cards (Diemex 6 cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-xs p-3.5 sm:p-4 border border-gray-200/80">
          <p className="text-xs text-gray-500 font-medium">Total</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">{stats.totalItems}</p>
        </div>
        <div className="bg-emerald-50/40 rounded-xl shadow-xs p-3.5 sm:p-4 border border-emerald-200/80">
          <p className="text-xs text-emerald-700 font-medium">Active</p>
          <p className="text-lg sm:text-xl font-bold text-emerald-600 mt-0.5">{stats.activeItems}</p>
        </div>
        <div className="bg-purple-50/40 rounded-xl shadow-xs p-3.5 sm:p-4 border border-purple-200/80">
          <p className="text-xs text-purple-700 font-medium">AV</p>
          <p className="text-lg sm:text-xl font-bold text-purple-600 mt-0.5">{stats.avItems}</p>
        </div>
        <div className="bg-sky-50/40 rounded-xl shadow-xs p-3.5 sm:p-4 border border-sky-200/80">
          <p className="text-xs text-[#003A77] font-medium">IT</p>
          <p className="text-lg sm:text-xl font-bold text-[#003A77] mt-0.5">{stats.itItems}</p>
        </div>
        <div className="bg-gray-50 rounded-xl shadow-xs p-3.5 sm:p-4 border border-gray-200/80">
          <p className="text-xs text-gray-600 font-medium">Other</p>
          <p className="text-lg sm:text-xl font-bold text-gray-700 mt-0.5">{stats.otherItems}</p>
        </div>
        <div className="bg-teal-50/40 rounded-xl shadow-xs p-3.5 sm:p-4 border border-teal-200/80">
          <p className="text-xs text-teal-700 font-medium">Total Value</p>
          <p className="text-base sm:text-lg font-bold text-[#00A1B1] truncate mt-0.5">
            {formatCurrency(stats.totalValue)}
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
              placeholder="Search by key or description..."
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
                <option value="AV">AV Equipment</option>
                <option value="IT">IT Equipment</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex-1 sm:w-36">
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

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl shadow-xs border overflow-hidden hover:shadow-md transition-all group ${
                !item.isActive
                  ? "opacity-60 border-gray-300"
                  : "border-gray-200/80 hover:border-[#00A1B1]/50"
              }`}
            >
              {/* Image */}
              <div className="aspect-video bg-gray-100 relative overflow-hidden">
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
                    <ComputerDesktopIcon className="h-12 w-12 text-gray-300" />
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm border flex items-center gap-1 ${getCategoryBadgeColor(
                      item.category
                    )}`}
                  >
                    {getCategoryIcon(item.category)}
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
                      title={item.isActive ? "Deactivate" : "Activate"}
                    >
                      {item.isActive ? (
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
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-semibold text-[#003A77] bg-sky-50 px-2 py-0.5 rounded border border-sky-100 truncate">
                    {item.itemKey}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleToggleActive(item)}
                      className="p-1 text-gray-500 hover:text-orange-600 rounded transition cursor-pointer"
                      title={item.isActive ? "Deactivate" : "Activate"}
                    >
                      {item.isActive ? (
                        <EyeSlashIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
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

                <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.description}
                </h3>

                <div className="flex justify-between items-center mb-2">
                  <span className="text-base font-bold text-[#003A77]">
                    {formatCurrency(item.costFor3Days)}
                  </span>
                  <span className="text-xs text-gray-500">3 days</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      item.isActive
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                  <span className="text-xs text-gray-400">Order #{item.displayOrder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <ComputerDesktopIcon className="h-14 w-14 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-medium text-gray-900 mb-1">No Rental Items Found</h3>
          <p className="text-sm text-gray-500 mb-4 px-4">
            {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
              ? "No items match your search criteria. Try adjusting your filters."
              : "Get started by adding your first rental item."}
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
          <div className="bg-white rounded-2xl max-w-md w-full my-4 sm:my-8 max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-5 sm:p-6">
              <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  {editingItem ? "Edit Rental Item" : "Add New Rental Item"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Image
                  </label>
                  <div className="flex items-start gap-3">
                    <div className="w-20 h-20 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <PhotoIcon className="h-7 w-7 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="cursor-pointer inline-flex items-center px-3.5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1.5">Max 5MB (JPEG, PNG, GIF, WebP)</p>
                    </div>
                  </div>
                </div>

                {/* Item Key */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Key <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.itemKey}
                    onChange={(e) => setFormData({ ...formData, itemKey: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                    placeholder="e.g., lcdProjector"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Unique identifier (no spaces)</p>
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
                    placeholder="Item description"
                    required
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
                      value={formData.costFor3Days}
                      onChange={(e) => setFormData({ ...formData, costFor3Days: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg pl-7 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as "AV" | "IT" | "Other" })
                    }
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] bg-white"
                    required
                  >
                    <option value="AV">AV Equipment</option>
                    <option value="IT">IT Equipment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                    min="1"
                    placeholder={!editingItem ? `Default: ${items.length + 1}` : ""}
                  />
                </div>

                {/* Active Checkbox */}
                <div className="flex items-center pt-1">
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
                    className="px-5 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002855] transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? "Saving..." : editingItem ? "Update" : "Save"}
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
