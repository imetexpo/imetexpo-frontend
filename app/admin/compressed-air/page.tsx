// app/admin/compressed-air/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  BoltIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import LoadingDots from "@/components/ui/LoadingDots";
import {
  getCompressedAirOptions,
  createCompressedAirOption,
  updateCompressedAirOption,
  deleteCompressedAirOption,
  toggleCompressedAirStatus,
  type CompressedAirOption,
} from "@/lib/api/compressedAir";

interface FormDataState {
  cfmRange: string;
  costPerConnection: string;
  powerKW: string;
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

export default function AdminCompressedAirPage() {
  const router = useRouter();
  const [options, setOptions] = useState<CompressedAirOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingOption, setEditingOption] = useState<CompressedAirOption | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataState>({
    cfmRange: "",
    costPerConnection: "",
    powerKW: "",
    isActive: true,
    displayOrder: "",
  });

  const loadOptions = async () => {
    const token = getAdminToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await getCompressedAirOptions();
      if (response.success) {
        setOptions(response.data || []);
      } else {
        setError(response.message || "Failed to load options. Please try again.");
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }
      setError(
        err?.response?.data?.message || err?.message || "Failed to load options. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  const calculateTotalCost = (option: CompressedAirOption): number => {
    return (Number(option.costPerConnection) || 0) + (Number(option.powerKW) || 0) * 3500;
  };

  const stats = useMemo(() => {
    const total = options.length;
    const active = options.filter((o) => o.isActive).length;
    const inactive = total - active;
    const avgTotal = total
      ? Math.round(options.reduce((acc, o) => acc + calculateTotalCost(o), 0) / total)
      : 0;
    return { total, active, inactive, avgTotal };
  }, [options]);

  const resetForm = () => {
    setFormData({
      cfmRange: "",
      costPerConnection: "",
      powerKW: "",
      isActive: true,
      displayOrder: "",
    });
    setEditingOption(null);
    setShowModal(false);
  };

  const openAddModal = () => {
    setEditingOption(null);
    setFormData({
      cfmRange: "",
      costPerConnection: "",
      powerKW: "",
      isActive: true,
      displayOrder: "",
    });
    setShowModal(true);
  };

  const editOption = (option: CompressedAirOption) => {
    setEditingOption(option);
    setFormData({
      cfmRange: option.cfmRange || "",
      costPerConnection: String(option.costPerConnection ?? 0),
      powerKW: String(option.powerKW ?? 0),
      isActive: Boolean(option.isActive),
      displayOrder: option.displayOrder !== undefined ? String(option.displayOrder) : "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.cfmRange.trim() || formData.costPerConnection === "" || formData.powerKW === "") {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        cfmRange: formData.cfmRange.trim(),
        costPerConnection: parseInt(formData.costPerConnection, 10) || 0,
        powerKW: parseFloat(formData.powerKW) || 0,
        isActive: formData.isActive,
        displayOrder: formData.displayOrder ? parseInt(formData.displayOrder, 10) : undefined,
      };

      const response = editingOption
        ? await updateCompressedAirOption(editingOption.id, payload)
        : await createCompressedAirOption(payload);

      if (!response.success) {
        throw new Error(response.message || "Failed to save option");
      }

      toast.success(editingOption ? "Option updated successfully" : "Option added successfully");
      await loadOptions();
      resetForm();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }
      const msg = err?.response?.data?.message || err?.message || "Failed to save option";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (option: CompressedAirOption) => {
    if (!confirm(`Are you sure you want to delete "${option.cfmRange}"?`)) return;

    try {
      setError("");
      const response = await deleteCompressedAirOption(option.id);
      if (!response.success) {
        throw new Error(response.message || "Failed to delete option");
      }
      toast.success("Option deleted successfully");
      await loadOptions();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/admin/login");
        return;
      }
      const msg = err?.response?.data?.message || err?.message || "Failed to delete option";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleToggleStatus = async (option: CompressedAirOption) => {
    try {
      setError("");
      const nextStatus = !Boolean(option.isActive);
      const response = await toggleCompressedAirStatus(option.id, nextStatus);
      if (!response.success) {
        throw new Error(response.message || "Failed to update status");
      }
      toast.success(`Option ${nextStatus ? "activated" : "deactivated"} successfully`);
      await loadOptions();
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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <LoadingDots tone="brand" className="mx-auto flex" />
          <p className="mt-4 text-sm font-medium text-gray-600">
            Loading compressed air options...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Compressed Air Options</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
            Manage compressed air connection options and rates
          </p>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={loadOptions}
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
            Add New Option
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

      {/* Stats Cards (Diemex 4 cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-xs p-4 border border-gray-200/80">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">Total Options</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-emerald-50/40 rounded-xl shadow-xs p-4 border border-emerald-200/80">
          <p className="text-xs sm:text-sm text-emerald-700 font-medium">Active</p>
          <p className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">{stats.active}</p>
        </div>
        <div className="bg-gray-50 rounded-xl shadow-xs p-4 border border-gray-200/80">
          <p className="text-xs sm:text-sm text-gray-500 font-medium">Inactive</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-500 mt-1">{stats.inactive}</p>
        </div>
        <div className="bg-sky-50/40 rounded-xl shadow-xs p-4 border border-sky-200/80">
          <p className="text-xs sm:text-sm text-[#003A77] font-medium">Avg. Total</p>
          <p className="text-xl sm:text-2xl font-bold text-[#003A77] mt-1">
            ₹{stats.avgTotal.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-xs overflow-hidden border border-gray-200/80">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  CFM Range
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Connection Cost
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Power
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Cost
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {options.length > 0 ? (
                options.map((option) => (
                  <tr key={option.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 sm:px-6 py-3.5 text-sm text-gray-600">
                      {option.displayOrder}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-sm font-semibold text-gray-900">
                      {option.cfmRange}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-sm text-gray-900">
                      ₹{(Number(option.costPerConnection) || 0).toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-sm text-gray-900">
                      {option.powerKW} KW
                    </td>
                    <td className="px-4 sm:px-6 py-3.5 text-sm font-bold text-[#003A77]">
                      ₹{calculateTotalCost(option).toLocaleString()}
                    </td>
                    <td className="px-4 sm:px-6 py-3.5">
                      <button
                        onClick={() => handleToggleStatus(option)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                          option.isActive
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {option.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-3.5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => editOption(option)}
                          className="text-[#003A77] hover:text-[#00A1B1] hover:bg-sky-50 rounded-lg transition-colors p-1.5 cursor-pointer"
                          title="Edit Option"
                        >
                          <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(option)}
                          className="text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors p-1.5 cursor-pointer"
                          title="Delete Option"
                        >
                          <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <BoltIcon className="h-12 w-12 text-gray-300 mb-3" />
                      <p className="text-base font-medium text-gray-700 mb-1">No options found</p>
                      <p className="text-sm text-gray-400 mb-4">
                        Get started by adding your first compressed air option
                      </p>
                      <button
                        onClick={openAddModal}
                        className="inline-flex items-center px-4 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002855] transition-colors text-sm font-medium cursor-pointer"
                      >
                        <PlusIcon className="h-4 w-4 mr-1.5" />
                        Add New Option
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-xl my-4 sm:my-8">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {editingOption ? "Edit Compressed Air Option" : "Add New Compressed Air Option"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="cfmRange"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  CFM Range <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="cfmRange"
                  name="cfmRange"
                  value={formData.cfmRange}
                  onChange={(e) => setFormData({ ...formData, cfmRange: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                  placeholder="e.g., Upto 10 cfm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="costPerConnection"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Connection Cost (₹) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500 text-sm">₹</span>
                  <input
                    type="number"
                    id="costPerConnection"
                    name="costPerConnection"
                    value={formData.costPerConnection}
                    onChange={(e) =>
                      setFormData({ ...formData, costPerConnection: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg pl-7 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="powerKW"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Power (KW) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  id="powerKW"
                  name="powerKW"
                  value={formData.powerKW}
                  onChange={(e) => setFormData({ ...formData, powerKW: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                  min="0"
                  step="0.1"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Power cost: ₹3,500 per KW</p>
              </div>

              <div>
                <label
                  htmlFor="displayOrder"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Display Order
                </label>
                <input
                  type="number"
                  id="displayOrder"
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                  min="1"
                  placeholder={!editingOption ? `Default: ${options.length + 1}` : ""}
                />
                {!editingOption && !formData.displayOrder && (
                  <p className="text-xs text-gray-500 mt-1">
                    Will be set to {options.length + 1}
                  </p>
                )}
              </div>

              <div className="flex items-center py-1">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 text-[#003A77] rounded border-gray-300 focus:ring-[#00A1B1]"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Active (visible to exhibitors)
                </label>
              </div>

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
                  className="px-5 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002855] transition-colors min-w-[90px] disabled:opacity-50 text-sm font-medium cursor-pointer"
                >
                  {submitting ? "Saving..." : editingOption ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
