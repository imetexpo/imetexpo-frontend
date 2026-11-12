// app/admin/electrical-rates/page.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  PencilIcon,
  BoltIcon,
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  ExclamationCircleIcon,
  CalendarIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import LoadingDots from "@/components/ui/LoadingDots";
import {
  getElectricalRates,
  createElectricalRate,
  updateElectricalRate,
  deleteElectricalRate,
  toggleElectricalRateStatus,
  type ElectricalRate,
} from "@/lib/api/electricalRates";

interface FormDataState {
  type: "temporary" | "exhibition" | "both";
  ratePerKW: string;
  effectiveFrom: string;
  effectiveTo: string;
  isActive: boolean;
  description: string;
}

function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("adminToken") ||
    localStorage.getItem("admin_token") ||
    localStorage.getItem("token")
  );
}

export default function AdminElectricalRatesPage() {
  const router = useRouter();
  const [rates, setRates] = useState<ElectricalRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingRate, setEditingRate] = useState<ElectricalRate | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataState>({
    type: "both",
    ratePerKW: "3500",
    effectiveFrom: new Date().toISOString().split("T")[0],
    effectiveTo: "",
    isActive: true,
    description: "",
  });

  const loadRates = async () => {
    const token = getAdminToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await getElectricalRates();
      if (response.success) {
        setRates(response.data || []);
      } else {
        setError(response.message || "Failed to load rates. Please try again.");
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }
      setError(
        err?.response?.data?.message || err?.message || "Failed to load rates. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
  }, []);

  const stats = useMemo(() => {
    const total = rates.length;
    const active = rates.filter((r) => r.isActive).length;
    const inactive = total - active;
    const avg = total
      ? Math.round(rates.reduce((acc, r) => acc + (Number(r.ratePerKW) || 0), 0) / total)
      : 0;
    return { total, active, inactive, avg };
  }, [rates]);

  const resetForm = () => {
    setFormData({
      type: "both",
      ratePerKW: "3500",
      effectiveFrom: new Date().toISOString().split("T")[0],
      effectiveTo: "",
      isActive: true,
      description: "",
    });
    setEditingRate(null);
    setShowModal(false);
  };

  const openAddModal = () => {
    setEditingRate(null);
    setFormData({
      type: "both",
      ratePerKW: "3500",
      effectiveFrom: new Date().toISOString().split("T")[0],
      effectiveTo: "",
      isActive: true,
      description: "",
    });
    setShowModal(true);
  };

  const editRate = (rate: ElectricalRate) => {
    setEditingRate(rate);
    setFormData({
      type: rate.type,
      ratePerKW: String(rate.ratePerKW ?? 0),
      effectiveFrom: rate.effectiveFrom ? String(rate.effectiveFrom).split("T")[0] : "",
      effectiveTo: rate.effectiveTo ? String(rate.effectiveTo).split("T")[0] : "",
      isActive: Boolean(rate.isActive),
      description: rate.description || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.ratePerKW === "" || !formData.effectiveFrom) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        type: formData.type,
        ratePerKW: parseInt(formData.ratePerKW, 10) || 0,
        effectiveFrom: formData.effectiveFrom,
        effectiveTo: formData.effectiveTo || null,
        isActive: formData.isActive,
        description: formData.description,
      };

      const response = editingRate
        ? await updateElectricalRate(editingRate.id, payload)
        : await createElectricalRate(payload);

      if (!response.success) {
        throw new Error(response.message || "Failed to save rate");
      }

      toast.success(editingRate ? "Rate updated successfully" : "Rate added successfully");
      await loadRates();
      resetForm();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin_token");
        router.push("/admin/login");
        return;
      }
      const rawMsg = err?.response?.data?.message || err?.message || "Failed to save rate";
      const friendlyMsg = rawMsg.includes("Active rate conflict")
        ? "Cannot activate this rate: Another active rate already exists for the same period and type."
        : rawMsg;
      setError(friendlyMsg);
      toast.error(friendlyMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (rate: ElectricalRate) => {
    if (!confirm(`Are you sure you want to delete the rate ₹${rate.ratePerKW}/KW?`)) return;

    try {
      setError("");
      const response = await deleteElectricalRate(rate.id);
      if (!response.success) {
        throw new Error(response.message || "Failed to delete rate");
      }
      toast.success("Rate deleted successfully");
      await loadRates();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/admin/login");
        return;
      }
      const msg = err?.response?.data?.message || err?.message || "Failed to delete rate";
      setError(msg);
      toast.error(msg);
    }
  };

  const handleToggleStatus = async (rate: ElectricalRate) => {
    try {
      setError("");
      const nextStatus = !Boolean(rate.isActive);
      const response = await toggleElectricalRateStatus(rate.id, nextStatus);
      if (!response.success) {
        throw new Error(response.message || "Failed to update status");
      }
      toast.success(`Rate ${nextStatus ? "activated" : "deactivated"} successfully`);
      await loadRates();
    } catch (err: any) {
      if (err?.response?.status === 401) {
        router.push("/admin/login");
        return;
      }
      const rawMsg = err?.response?.data?.message || err?.message || "Failed to update status";
      const friendlyMsg = rawMsg.includes("Active rate conflict")
        ? "Cannot activate this rate: Another active rate already exists for the same period and type."
        : rawMsg;
      setError(friendlyMsg);
      toast.error(friendlyMsg);
    }
  };

  const getTypeLabel = (type: string): string => {
    switch (type) {
      case "both":
        return "Temporary & Exhibition";
      case "temporary":
        return "Temporary Load";
      case "exhibition":
        return "Exhibition Load";
      default:
        return type;
    }
  };

  const getTypeBadgeColor = (type: string): string => {
    switch (type) {
      case "both":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "temporary":
        return "bg-sky-100 text-[#003A77] border-sky-200";
      case "exhibition":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <LoadingDots tone="brand" className="mx-auto flex" />
          <p className="mt-4 text-sm font-medium text-gray-600">Loading electrical rates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Electrical Load Rates</h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
            Manage per KW rates for electrical loads
          </p>
        </div>
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={loadRates}
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
            Add New Rate
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
          <p className="text-xs sm:text-sm text-gray-500 font-medium">Total Rates</p>
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
          <p className="text-xs sm:text-sm text-[#003A77] font-medium">Avg. Rate</p>
          <p className="text-xl sm:text-2xl font-bold text-[#003A77] mt-1">
            ₹{stats.avg.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Rates List - Card View (matching Diemex) */}
      <div className="grid gap-3 sm:gap-4">
        {rates.length > 0 ? (
          rates.map((rate) => (
            <div
              key={rate.id}
              className={`rounded-xl shadow-xs border p-4 sm:p-6 transition-all hover:shadow-md ${
                rate.isActive
                  ? "border-emerald-200 bg-emerald-50/30"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <BoltIcon
                      className={`h-5 w-5 ${rate.isActive ? "text-[#003A77]" : "text-gray-400"}`}
                    />
                    <span
                      className={`px-3 py-0.5 text-xs font-semibold rounded-full border ${getTypeBadgeColor(
                        rate.type
                      )}`}
                    >
                      {getTypeLabel(rate.type)}
                    </span>
                    <button
                      onClick={() => handleToggleStatus(rate)}
                      className={`px-3 py-0.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                        rate.isActive
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {rate.isActive ? "Active" : "Inactive"}
                    </button>
                  </div>

                  <div className="text-2xl sm:text-3xl font-bold text-[#003A77] mb-1.5">
                    ₹{(Number(rate.ratePerKW) || 0).toLocaleString()}
                    <span className="text-xs sm:text-sm font-normal text-gray-500 ml-1">/ KW</span>
                  </div>

                  {rate.description && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">{rate.description}</p>
                  )}

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="font-medium mr-1">From:</span>
                      {rate.effectiveFrom
                        ? new Date(rate.effectiveFrom).toLocaleDateString("en-IN")
                        : "N/A"}
                    </div>
                    {rate.effectiveTo && (
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="font-medium mr-1">To:</span>
                        {new Date(rate.effectiveTo).toLocaleDateString("en-IN")}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 self-end sm:self-start w-full sm:w-auto justify-end">
                  <button
                    onClick={() => editRate(rate)}
                    className="p-2 text-[#003A77] hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit Rate"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(rate)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Rate"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-8 sm:p-12 text-center">
            <BoltIcon className="h-14 w-14 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No Rates Found</h3>
            <p className="text-sm text-gray-500 mb-4">
              Get started by adding your first electrical rate
            </p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center px-4 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002855] transition-colors text-sm font-medium cursor-pointer"
            >
              <PlusIcon className="h-4 w-4 mr-1.5" />
              Add New Rate
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-xl my-4 sm:my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {editingRate ? "Edit Electrical Rate" : "Add New Electrical Rate"}
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
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Rate Type <span className="text-rose-500">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "temporary" | "exhibition" | "both",
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] bg-white"
                  required
                >
                  <option value="both">Both Temporary &amp; Exhibition</option>
                  <option value="temporary">Temporary Only</option>
                  <option value="exhibition">Exhibition Only</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="ratePerKW"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Rate per KW (₹) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500 text-sm">₹</span>
                  <input
                    type="number"
                    id="ratePerKW"
                    name="ratePerKW"
                    value={formData.ratePerKW}
                    onChange={(e) => setFormData({ ...formData, ratePerKW: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg pl-7 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="effectiveFrom"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Effective From <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  id="effectiveFrom"
                  name="effectiveFrom"
                  value={formData.effectiveFrom}
                  onChange={(e) => setFormData({ ...formData, effectiveFrom: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="effectiveTo"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Effective To (Optional)
                </label>
                <input
                  type="date"
                  id="effectiveTo"
                  name="effectiveTo"
                  value={formData.effectiveTo}
                  onChange={(e) => setFormData({ ...formData, effectiveTo: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                  min={formData.effectiveFrom}
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty for ongoing rates</p>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                  placeholder="Additional notes about this rate..."
                />
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
                  Active (apply this rate to new bookings)
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
                  {submitting ? "Saving..." : editingRate ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
