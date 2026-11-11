"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Key,
  Search,
  Building,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Package,
  Copy,
  Check,
  X,
  ShieldAlert
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { exhibitorsAPI, Exhibitor, ExhibitorStatus } from "@/lib/api/exhibitors";
import LoadingDots from "@/components/ui/LoadingDots";

export default function ExhibitorsPage() {
  const router = useRouter();
  const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);

  // Password Modal State
  const [passwordModal, setPasswordModal] = useState<{
    isOpen: boolean;
    company: string;
    email: string;
    password: string;
  }>({
    isOpen: false,
    company: "",
    email: "",
    password: "",
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchExhibitors();
  }, []);

  const fetchExhibitors = async () => {
    try {
      setLoading(true);
      const response = await exhibitorsAPI.getAll();
      setExhibitors(response.data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to load exhibitors");
    } finally {
      setLoading(false);
    }
  };

  const deleteExhibitor = async (id: string, email: string) => {
    if (!confirm(`Delete exhibitor ${email}? This cannot be undone.`)) return;

    try {
      setDeletingId(id);
      await exhibitorsAPI.delete(id);
      toast.success("Exhibitor deleted successfully");
      fetchExhibitors();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete exhibitor");
    } finally {
      setDeletingId(null);
    }
  };

  const resendCredentials = async (id: string, email: string) => {
    if (!confirm(`Resend credentials to ${email}?`)) return;

    try {
      setResendingId(id);
      const res = await exhibitorsAPI.resendCredentials(id);
      toast.success(res?.message || `Credentials resent to ${email}`);
      fetchExhibitors();
    } catch (error: any) {
      toast.error(error.message || "Failed to resend credentials");
    } finally {
      setResendingId(null);
    }
  };

  const showPassword = (exhibitor: Exhibitor) => {
    const password = exhibitor.originalPassword;
    if (password) {
      setPasswordModal({
        isOpen: true,
        company: exhibitor.company,
        email: exhibitor.email,
        password: password,
      });
      setCopied(false);
    } else {
      toast.error("No password available for this exhibitor");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Password copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const updateStatus = async (id: string, status: ExhibitorStatus) => {
    try {
      await exhibitorsAPI.update(id, { status });
      toast.success(`Status updated to ${status.toUpperCase()}`);
      fetchExhibitors();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const formatJoinedDate = (dateString?: string) => {
    if (!dateString) return "03/11/2026";
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return "03/11/2026";
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return "03/11/2026";
    }
  };

  const getStatusBadge = (status: string) => {
    const s = (status || "pending").toLowerCase();
    switch (s) {
      case "active":
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="h-3 w-3 text-emerald-600" />
            ACTIVE
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="h-3 w-3 text-amber-600" />
            PENDING
          </span>
        );
      case "inactive":
      case "rejected":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="h-3 w-3 text-rose-600" />
            INACTIVE
          </span>
        );
    }
  };

  const filteredExhibitors = exhibitors.filter((exhibitor) => {
    const matchesSearch =
      (exhibitor.company || "").toLowerCase().includes(search.toLowerCase()) ||
      (exhibitor.email || "").toLowerCase().includes(search.toLowerCase()) ||
      (exhibitor.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (exhibitor.booth || "").toLowerCase().includes(search.toLowerCase()) ||
      (exhibitor.boothNumber || "").toLowerCase().includes(search.toLowerCase());

    const s = (exhibitor.status || "pending").toLowerCase();
    const normalizedStatus = s === "approved" ? "active" : s;
    const matchesStatus = statusFilter === "all" || normalizedStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Exhibitors</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Manage all exhibition exhibitors ({exhibitors.length} registered)
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/exhibition/exhibitors/new")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg shadow-xs transition"
        >
          <Plus className="h-4 w-4" />
          Add Exhibitor
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200/80 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search exhibitors by company, contact, email, or booth..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00A1B1] focus:ring-1 focus:ring-[#00A1B1]"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#00A1B1]"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="pending">Pending Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
            <button
              onClick={fetchExhibitors}
              className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition flex items-center gap-1.5"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Exhibitors Table */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200/80 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <LoadingDots tone="brand" className="mx-auto flex" />
            <span className="ml-3 text-sm font-medium text-gray-500">Loading exhibitors...</span>
          </div>
        ) : filteredExhibitors.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Building className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-900 mb-1">No exhibitors found</h3>
            <p className="text-xs text-gray-500 mb-4 max-w-sm mx-auto">
              {search
                ? "No exhibitors matched your search criteria. Try a different query."
                : "Get started by adding your first exhibition exhibitor."}
            </p>
            {!search && (
              <button
                onClick={() => router.push("/admin/exhibition/exhibitors/new")}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#003A77] hover:bg-[#002855] text-white text-sm font-medium rounded-lg transition"
              >
                <Plus className="h-4 w-4" />
                Add First Exhibitor
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Company & Contact
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Password
                  </th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredExhibitors.map((exhibitor) => (
                  <tr key={exhibitor.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Column 1: Company & Contact */}
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-[#00A1B1] mt-0.5">
                          <Building className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 leading-snug">
                            {exhibitor.company || "Unnamed Company"}
                          </div>
                          <div className="text-xs text-gray-600 mt-0.5 font-medium">
                            {exhibitor.name || "Primary Contact"}
                          </div>
                          {exhibitor.email && (
                            <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                              <Mail className="h-3 w-3 text-gray-400 shrink-0" />
                              <span className="truncate max-w-[200px]">{exhibitor.email}</span>
                            </div>
                          )}
                          {exhibitor.phone && (
                            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-500">
                              <Phone className="h-3 w-3 text-gray-400 shrink-0" />
                              <span>{exhibitor.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Details */}
                    <td className="px-6 py-4 align-top">
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Sector:</span>
                          <span className="font-medium text-gray-800">
                            {exhibitor.sector || "Not specified"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Booth:</span>
                          <span className="font-bold text-[#003A77]">
                            {exhibitor.booth || exhibitor.boothNumber || "Not assigned"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-gray-500">Booth Size:</span>
                          <span className="font-medium text-gray-800">
                            {exhibitor.boothSize || exhibitor.stallDetails?.size || "Not specified"}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-400 pt-0.5">
                          Joined {formatJoinedDate(exhibitor.createdAt)}
                        </div>
                      </div>
                    </td>

                    {/* Column 3: Status */}
                    <td className="px-6 py-4 align-top">
                      <div>
                        {getStatusBadge(exhibitor.status)}
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-xs">
                        <button
                          onClick={() => updateStatus(exhibitor.id, "active")}
                          className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline cursor-pointer"
                        >
                          Active
                        </button>
                        <span className="text-gray-300">•</span>
                        <button
                          onClick={() => updateStatus(exhibitor.id, "pending")}
                          className="text-amber-600 hover:text-amber-800 font-medium hover:underline cursor-pointer"
                        >
                          Pending
                        </button>
                        <span className="text-gray-300">•</span>
                        <button
                          onClick={() => updateStatus(exhibitor.id, "inactive")}
                          className="text-rose-600 hover:text-rose-800 font-medium hover:underline cursor-pointer"
                        >
                          Inactive
                        </button>
                      </div>
                    </td>

                    {/* Column 4: Password */}
                    <td className="px-6 py-4 align-top">
                      <button
                        onClick={() => showPassword(exhibitor)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition shadow-2xs cursor-pointer"
                      >
                        <Key className="h-3.5 w-3.5 text-gray-500" />
                        <span>Show Password</span>
                      </button>
                      <div className="mt-1.5 text-[11px]">
                        {exhibitor.originalPassword ? (
                          <span className="text-emerald-600 font-medium">Password available</span>
                        ) : (
                          <span className="text-gray-400">Password encrypted</span>
                        )}
                      </div>
                    </td>

                    {/* Column 5: Email */}
                    <td className="px-6 py-4 align-top">
                      <button
                        onClick={() => resendCredentials(exhibitor.id, exhibitor.email)}
                        disabled={resendingId === exhibitor.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200/80 hover:bg-blue-100 text-[#003A77] text-xs font-semibold rounded-lg transition shadow-2xs disabled:opacity-50 cursor-pointer"
                      >
                        <RefreshCw
                          className={`h-3.5 w-3.5 ${resendingId === exhibitor.id ? "animate-spin" : ""}`}
                        />
                        <span>{resendingId === exhibitor.id ? "Sending..." : "Resend Email"}</span>
                      </button>
                      <div className="mt-1.5 text-[11px] text-gray-400">
                        Send credentials to exhibitor
                      </div>
                    </td>

                    {/* Column 6: Actions */}
                    <td className="px-6 py-4 align-top text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => router.push(`/admin/exhibition/exhibitors/${exhibitor.id}`)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/exhibition/exhibitors/${exhibitor.id}/requirements`)}
                          className="p-1.5 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-lg transition"
                          title="Extra Requirements"
                        >
                          <Package className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => router.push(`/admin/exhibition/exhibitors/${exhibitor.id}/edit`)}
                          className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteExhibitor(exhibitor.id, exhibitor.email)}
                          disabled={deletingId === exhibitor.id}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                          title="Delete"
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
        )}
      </div>

      {/* Password Popup Modal */}
      {passwordModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 border border-gray-200 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                  <Key className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Exhibitor Password</h3>
                  <p className="text-xs text-gray-400">{passwordModal.company}</p>
                </div>
              </div>
              <button
                onClick={() => setPasswordModal({ ...passwordModal, isOpen: false })}
                className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 mb-1">Login Email:</p>
                <p className="text-xs font-mono font-medium text-gray-800 bg-gray-50 p-2 rounded-lg border border-gray-200 break-all">
                  {passwordModal.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Plaintext Password:</p>
                <div className="flex items-center gap-2 bg-amber-50/70 border border-amber-200 rounded-lg p-2.5">
                  <span className="font-mono text-base font-bold text-gray-900 flex-1 tracking-wider">
                    {passwordModal.password}
                  </span>
                  <button
                    onClick={() => copyToClipboard(passwordModal.password)}
                    className="p-1.5 bg-white hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-md transition shadow-2xs"
                    title="Copy Password"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-blue-50/70 border border-blue-200 p-2.5 rounded-lg text-[11px] text-[#003A77] mt-3">
                <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-[#00A1B1]" />
                <span>
                  Share this password securely with the exhibitor representative. Never send passwords over insecure channels.
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setPasswordModal({ ...passwordModal, isOpen: false })}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

