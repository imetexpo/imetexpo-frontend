"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import {
  getSecurityDeposits,
  createSecurityDeposit,
  updateSecurityDeposit,
  deleteSecurityDeposit,
  toggleSecurityDepositStatus,
  SecurityDeposit,
} from "@/lib/api/securityDeposit";

interface SecurityDepositTier {
  id: string;
  tierNo: number;
  boothSq: string;
  category: "0-36" | "37-100" | "101+";
  amountINR: number;
  amountUSD: number;
  isActive: boolean;
  createdAt: string;
  minSqMtr: number;
  maxSqMtr: number;
}

const getBoothSqDisplay = (category: string, min?: number, max?: number) => {
  if (category === "0-36") return "0 - 36 sq mtr";
  if (category === "37-100") return "37 - 100 sq mtr";
  if (category === "101+") return "101 and above sq mtr";
  return `${min || 0} - ${max || 0} sq mtr`;
};

const getCategoryRange = (boothSq: string): { category: "0-36" | "37-100" | "101+"; min: number; max: number } => {
  if (boothSq.includes("0 - 36") || boothSq.includes("0-36")) {
    return { category: "0-36", min: 0, max: 36 };
  }
  if (boothSq.includes("37 - 100") || boothSq.includes("37-100")) {
    return { category: "37-100", min: 37, max: 100 };
  }
  return { category: "101+", min: 101, max: 999999 };
};

export default function AdminSecurityDepositPage() {
  const [tiers, setTiers] = useState<SecurityDepositTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTier, setEditingTier] = useState<SecurityDepositTier | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<{
    tierNo: number | undefined;
    boothSq: string;
    amountINR: number;
    amountUSD: number;
    isActive: boolean;
  }>({
    tierNo: 1,
    boothSq: "",
    amountINR: 0,
    amountUSD: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchTiers();
  }, []);

  const showToastSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const fetchTiers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getSecurityDeposits();

      if (response.success) {
        const mappedTiers: SecurityDepositTier[] = (response.data || []).map(
          (item: SecurityDeposit, index: number) => ({
            id: item.id,
            tierNo: item.displayOrder || index + 1,
            boothSq: getBoothSqDisplay(item.category, item.minSqMtr, item.maxSqMtr),
            category: item.category,
            amountINR: item.amountINR,
            amountUSD: item.amountUSD,
            isActive: item.isActive,
            createdAt: item.createdAt,
            minSqMtr: item.minSqMtr,
            maxSqMtr: item.maxSqMtr,
          })
        );
        setTiers(mappedTiers);
      } else {
        setError(response.message || "Failed to load data");
      }
    } catch (err: any) {
      console.error("Error fetching tiers:", err);
      setError(err.response?.data?.message || err.message || "Failed to load security deposits");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      const { category, min, max } = getCategoryRange(formData.boothSq);

      const payload = {
        category,
        minSqMtr: min,
        maxSqMtr: max,
        amountINR: formData.amountINR,
        amountUSD: formData.amountUSD,
        isActive: formData.isActive,
        displayOrder: formData.tierNo || tiers.length + 1,
      };

      if (editingTier) {
        await updateSecurityDeposit(editingTier.id, payload);
        showToastSuccess("Tier updated successfully");
      } else {
        await createSecurityDeposit(payload);
        showToastSuccess("Tier added successfully");
      }

      await fetchTiers();
      resetForm();
    } catch (err: any) {
      console.error("Error saving tier:", err);
      setError(err.response?.data?.message || err.message || "Failed to save security deposit");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tier?")) return;

    try {
      setError("");
      await deleteSecurityDeposit(id);
      setTiers((prev) => prev.filter((t) => t.id !== id));
      showToastSuccess("Tier deleted successfully");
    } catch (err: any) {
      console.error("Error deleting tier:", err);
      setError(err.response?.data?.message || err.message || "Failed to delete security deposit");
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await toggleSecurityDepositStatus(id, !currentStatus);
      setTiers((prev) =>
        prev.map((tier) => (tier.id === id ? { ...tier, isActive: !currentStatus } : tier))
      );
      showToastSuccess(`Tier ${!currentStatus ? "activated" : "deactivated"} successfully`);
    } catch (err: any) {
      console.error("Error toggling status:", err);
      setError(err.response?.data?.message || err.message || "Failed to update status");
    }
  };

  const resetForm = () => {
    setFormData({
      tierNo: tiers.length + 1,
      boothSq: "",
      amountINR: 0,
      amountUSD: 0,
      isActive: true,
    });
    setEditingTier(null);
    setShowModal(false);
    setError("");
  };

  const handleEdit = (tier: SecurityDepositTier) => {
    setEditingTier(tier);
    setFormData({
      tierNo: tier.tierNo,
      boothSq: tier.boothSq,
      amountINR: tier.amountINR,
      amountUSD: tier.amountUSD,
      isActive: tier.isActive,
    });
    setShowModal(true);
    setError("");
  };

  const openAddModal = () => {
    setEditingTier(null);
    setFormData({
      tierNo: tiers.length + 1,
      boothSq: "",
      amountINR: 0,
      amountUSD: 0,
      isActive: true,
    });
    setShowModal(true);
    setError("");
  };

  const activeCount = tiers.filter((t) => t.isActive).length;
  const inactiveCount = tiers.filter((t) => !t.isActive).length;
  const avgINR = tiers.length
    ? Math.round(tiers.reduce((acc, t) => acc + t.amountINR, 0) / tiers.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#003A77] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium">
            Loading security deposit tiers...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#003A77]/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#003A77]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#003A77]">Security Deposit Tiers</h1>
              <p className="text-sm text-slate-600 mt-0.5">Manage contractor security deposit amounts</p>
            </div>
          </div>
          <button
            onClick={openAddModal}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 bg-[#003A77] text-white rounded-lg hover:bg-[#002957] transition-colors shadow-sm text-sm font-medium cursor-pointer"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Tier
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between text-red-800">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
            <button onClick={() => setError("")} className="text-red-600 hover:text-red-800 text-sm">
              ✕
            </button>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center justify-between text-emerald-800">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span className="text-sm font-medium">{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage("")} className="text-emerald-600 hover:text-emerald-800 text-sm">
              ✕
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Tiers</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{tiers.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{activeCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Inactive</p>
            <p className="text-2xl font-bold text-slate-400 mt-1">{inactiveCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Avg. Deposit</p>
            <p className="text-2xl font-bold text-[#003A77] mt-1 truncate">
              ₹{avgINR.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Tier
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Booth Sq.
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    INR
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    USD
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {tiers.map((tier) => (
                  <tr key={tier.id} className="hover:bg-slate-50">
                    <td className="px-4 sm:px-6 py-4 text-sm font-medium text-slate-900">{tier.tierNo}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-slate-600">{tier.boothSq}</td>
                    <td className="px-4 sm:px-6 py-4 text-sm font-medium text-slate-900">
                      ₹{tier.amountINR.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm font-medium text-slate-900">
                      ${tier.amountUSD.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(tier.id, tier.isActive)}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                          tier.isActive
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {tier.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(tier)}
                          className="p-1.5 text-[#003A77] hover:bg-[#003A77]/10 rounded-lg transition-colors cursor-pointer"
                          title="Edit tier"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(tier.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete tier"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {tiers.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <ShieldCheck className="h-14 w-14 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-medium text-slate-700">No security deposit tiers found.</p>
              <p className="text-sm text-slate-400 mt-1">Click &quot;Add New Tier&quot; to create one.</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-md w-full my-8 max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#003A77]">
                    {editingTier ? "Edit Tier" : "Add New Tier"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tier Number</label>
                    <input
                      type="number"
                      value={Number.isFinite(formData.tierNo) ? formData.tierNo : ""}
                      onChange={(e) => {
                        const parsed = parseInt(e.target.value, 10);
                        setFormData({
                          ...formData,
                          tierNo: Number.isNaN(parsed) ? undefined : parsed,
                        });
                      }}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003A77]/20 focus:border-[#003A77]"
                      min="1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Booth Square Range
                    </label>
                    <select
                      value={formData.boothSq}
                      onChange={(e) => setFormData({ ...formData, boothSq: e.target.value })}
                      className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003A77]/20 focus:border-[#003A77]"
                      required
                    >
                      <option value="">Select range</option>
                      <option value="0 - 36 sq mtr">0 - 36 sq mtr</option>
                      <option value="37 - 100 sq mtr">37 - 100 sq mtr</option>
                      <option value="101 and above sq mtr">101 and above sq mtr</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Amount (INR)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                      <input
                        type="number"
                        value={formData.amountINR}
                        onChange={(e) =>
                          setFormData({ ...formData, amountINR: parseInt(e.target.value, 10) || 0 })
                        }
                        className="w-full border border-slate-300 rounded-lg pl-7 pr-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003A77]/20 focus:border-[#003A77]"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Amount (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                      <input
                        type="number"
                        value={formData.amountUSD}
                        onChange={(e) =>
                          setFormData({ ...formData, amountUSD: parseInt(e.target.value, 10) || 0 })
                        }
                        className="w-full border border-slate-300 rounded-lg pl-7 pr-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#003A77]/20 focus:border-[#003A77]"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="h-4 w-4 text-[#003A77] rounded border-slate-300 focus:ring-[#003A77]"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm text-slate-700">
                      Active
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-4 py-2 bg-[#003A77] text-white rounded-lg hover:bg-[#002957] transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? "Saving..." : editingTier ? "Update" : "Save"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
