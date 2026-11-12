// app/admin/received/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  WrenchIcon,
  ShieldCheckIcon,
  UserIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  PencilIcon,
  XMarkIcon,
  CheckIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import {
  SofaIcon,
  MonitorIcon,
  ZapIcon,
  CableIcon,
  DropletIcon,
  PackageIcon,
  UsersIcon,
  WifiIcon,
  LightbulbIcon,
  SparklesIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import LoadingDots from "@/components/ui/LoadingDots";
import {
  fetchReceivedRequirementById,
  updateReceivedRequirementStatus,
  type ExtraRequirementItem,
  type ExtraRequirementRequest,
} from "@/lib/api/extraRequirements";

function stripCostFromSpecs(specs?: string): string | undefined {
  if (!specs) return specs;
  return specs
    .replace(/Cost:\s*₹[\d,]+/gi, "")
    .replace(/Total:\s*₹[\d,]+/gi, "")
    .replace(/,\s*$/, "")
    .trim();
}

export default function AdminRequirementDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const requirementId = params.id as string;

  const [requirement, setRequirement] = useState<ExtraRequirementRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    status: "pending",
    adminNotes: "",
  });

  const loadRequirement = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchReceivedRequirementById(requirementId);
      const cleanItems = (data.items || []).map((item) => ({
        ...item,
        specifications: stripCostFromSpecs(item.specifications),
      }));
      setRequirement({ ...data, items: cleanItems });
      setEditData({
        status: data.status || "pending",
        adminNotes: data.adminNotes || "",
      });
    } catch (err: any) {
      if (err.message === "unauthorized") {
        router.push("/admin/login");
        return;
      }
      setError(err.message || "Failed to load requirement details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (requirementId) {
      loadRequirement();
    }
  }, [requirementId]);

  const handleUpdateStatus = async () => {
    if (!requirement?.id) return;

    setUpdating(true);
    try {
      const updated = await updateReceivedRequirementStatus(requirement.id, {
        status: editData.status,
        adminNotes: editData.adminNotes,
      });
      const cleanItems = (updated.items || []).map((item) => ({
        ...item,
        specifications: stripCostFromSpecs(item.specifications),
      }));
      setRequirement({ ...updated, items: cleanItems });
      setShowEditModal(false);
      toast.success("Requirement status updated");
    } catch (err: any) {
      if (err.message === "unauthorized") {
        router.push("/admin/login");
        return;
      }
      toast.error(err.message || "Failed to update requirement");
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) return "N/A";
    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
      rejected: "bg-rose-50 text-rose-700 border-rose-200",
      completed: "bg-sky-50 text-[#003A77] border-sky-200",
    };
    const icons: Record<string, React.ReactElement> = {
      pending: <ClockIcon className="h-4 w-4" />,
      approved: <CheckCircleIcon className="h-4 w-4" />,
      rejected: <XCircleIcon className="h-4 w-4" />,
      completed: <CheckCircleIcon className="h-4 w-4" />,
    };

    const normalized = (status || "pending").toLowerCase();
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${
          badges[normalized] || badges.pending
        }`}
      >
        {icons[normalized] || icons.pending}
        {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
      </span>
    );
  };

  const getItemIcon = (type: string) => {
    const typeLower = (type || "").toLowerCase();
    if (typeLower.includes("furniture")) return <SofaIcon className="h-5 w-5" />;
    if (typeLower.includes("av") || typeLower.includes("it")) return <MonitorIcon className="h-5 w-5" />;
    if (typeLower.includes("electrical")) return <ZapIcon className="h-5 w-5" />;
    if (typeLower.includes("hostess")) return <UsersIcon className="h-5 w-5" />;
    if (typeLower.includes("air")) return <CableIcon className="h-5 w-5" />;
    if (typeLower.includes("water")) return <DropletIcon className="h-5 w-5" />;
    if (typeLower.includes("security")) return <ShieldCheckIcon className="h-5 w-5" />;
    if (typeLower.includes("internet") || typeLower.includes("wifi")) return <WifiIcon className="h-5 w-5" />;
    if (typeLower.includes("lighting")) return <LightbulbIcon className="h-5 w-5" />;
    if (typeLower.includes("housekeeping")) return <SparklesIcon className="h-5 w-5" />;
    return <WrenchIcon className="h-5 w-5" />;
  };

  const getItemTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      furniture: "Furniture",
      "av & it rentals": "AV & IT Rentals",
      av: "AV & IT Rentals",
      "electrical load": "Electrical Load",
      electrical: "Electrical Load",
      "hostess rates": "Hostess Services",
      "hostess services": "Hostess Services",
      hostess: "Hostess Services",
      "compressed air": "Compressed Air",
      "water connection": "Water Connection",
      water: "Water Connection",
      "security guard": "Security Guard",
      security: "Security Guard",
      housekeeping: "Housekeeping",
      internet: "Internet & WiFi",
      lighting: "Lighting",
    };
    return labels[(type || "").toLowerCase()] || type;
  };

  const groupItemsByType = (items: ExtraRequirementItem[]) => {
    const grouped: Record<string, ExtraRequirementItem[]> = {};
    (items || []).forEach((item) => {
      const key = item.type || "General";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });
    return grouped;
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadAsHTML = () => {
    if (!requirement) return;

    const groupedItems = groupItemsByType(requirement.items);
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Requirement Details - ${requirement.requirementId}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Segoe UI', Arial, sans-serif;
              background: white;
              padding: 40px;
              line-height: 1.5;
              color: #0f172a;
            }
            .container { max-width: 900px; margin: 0 auto; }
            .header {
              text-align: center;
              margin-bottom: 36px;
              padding-bottom: 20px;
              border-bottom: 2px solid #003A77;
            }
            .header h1 { font-size: 26px; color: #003A77; margin-bottom: 6px; }
            .header p { color: #64748b; font-size: 13px; }
            .section { margin-bottom: 28px; page-break-inside: avoid; }
            .section-title {
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 14px;
              padding-bottom: 6px;
              border-bottom: 2px solid #e2e8f0;
              color: #003A77;
            }
            .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
            .info-item { background: #f8fafc; padding: 12px; border-radius: 8px; }
            .info-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; }
            .info-value { font-size: 14px; font-weight: 500; margin-top: 4px; }
            .items-group { background: #f8fafc; border-radius: 10px; padding: 14px; margin-bottom: 16px; }
            .group-header { font-size: 15px; font-weight: 600; color: #003A77; margin-bottom: 10px; }
            .item-entry {
              padding: 8px 0;
              border-bottom: 1px solid #e2e8f0;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .item-entry:last-child { border-bottom: none; }
            .item-desc { font-size: 14px; color: #334155; }
            .specs { font-size: 12px; color: #64748b; margin-top: 2px; }
            .item-qty { font-size: 12px; background: #e2e8f0; padding: 2px 8px; border-radius: 20px; }
            .notes-box { background: #fef3c7; padding: 14px; border-radius: 10px; border-left: 4px solid #f59e0b; }
            .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #94a3b8; padding-top: 16px; border-top: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>IndiaMET 2027 — Extra Requirements Request</h1>
              <p>${requirement.requirementId}</p>
              <p>Submitted: ${formatDate(requirement.submittedAt)}</p>
            </div>
            <div class="section">
              <div class="section-title">Exhibitor Information</div>
              <div class="info-grid">
                <div class="info-item"><div class="info-label">Company Name</div><div class="info-value">${requirement.companyName}</div></div>
                <div class="info-item"><div class="info-label">Booth / Stall Number</div><div class="info-value">${requirement.stallNumber || "Not Assigned"}</div></div>
                <div class="info-item"><div class="info-label">Contact Person</div><div class="info-value">${requirement.contactPerson}</div></div>
                <div class="info-item"><div class="info-label">Email</div><div class="info-value">${requirement.email}</div></div>
                <div class="info-item"><div class="info-label">Phone</div><div class="info-value">${requirement.phone}</div></div>
                ${
                  requirement.metadata?.boothArea
                    ? `<div class="info-item"><div class="info-label">Booth Area</div><div class="info-value">${requirement.metadata.boothArea}</div></div>`
                    : ""
                }
              </div>
            </div>
            <div class="section">
              <div class="section-title">Items Required</div>
              ${Object.entries(groupedItems)
                .map(
                  ([type, items]) => `
                <div class="items-group">
                  <div class="group-header">${getItemTypeLabel(type)}</div>
                  ${items
                    .map(
                      (item) => `
                    <div class="item-entry">
                      <div>
                        <div class="item-desc">${item.description}</div>
                        ${item.specifications ? `<div class="specs">${item.specifications}</div>` : ""}
                      </div>
                      <div class="item-qty">x${item.quantity}</div>
                    </div>`
                    )
                    .join("")}
                </div>`
                )
                .join("")}
            </div>
            ${
              requirement.notes
                ? `<div class="section"><div class="section-title">Exhibitor Notes</div><div class="notes-box"><p>${requirement.notes}</p></div></div>`
                : ""
            }
            ${
              requirement.adminNotes
                ? `<div class="section"><div class="section-title">Admin Notes</div><div class="notes-box" style="background:#dbeafe;border-left-color:#003A77;"><p>${requirement.adminNotes}</p></div></div>`
                : ""
            }
            <div class="footer">
              Generated on ${new Date().toLocaleString()}<br>
              IndiaMET 2027 Exhibition Management
            </div>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([printContent], { type: "text/html" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `requirement_${requirement.requirementId}.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <LoadingDots tone="brand" className="mx-auto flex" />
          <p className="mt-4 text-sm font-medium text-gray-600">Loading requirement details...</p>
        </div>
      </div>
    );
  }

  if (error || !requirement) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 max-w-md w-full text-center">
          <XCircleIcon className="h-12 w-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {error || "Requirement Not Found"}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            The requirement you&apos;re looking for doesn&apos;t exist or could not be loaded.
          </p>
          <Link
            href="/admin/received"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77] text-white rounded-xl hover:bg-[#002855] text-sm font-medium transition"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Requirements
          </Link>
        </div>
      </div>
    );
  }

  const metadata = requirement.metadata || {};
  const groupedItems = groupItemsByType(requirement.items);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Action Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <Link
          href="/admin/received"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:text-gray-900 hover:bg-gray-50 shadow-2xs text-sm font-medium transition"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Requirements
        </Link>

        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => setShowEditModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77] text-white rounded-xl hover:bg-[#002855] transition shadow-sm text-sm font-medium cursor-pointer"
          >
            <PencilIcon className="h-4 w-4" />
            Update Status
          </button>
          <button
            onClick={downloadAsHTML}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition shadow-sm text-sm font-medium cursor-pointer"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl hover:bg-gray-50 border border-gray-200 transition shadow-2xs text-sm font-medium cursor-pointer"
          >
            <PrinterIcon className="h-4 w-4" />
            Print
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-[#003A77] to-[#005999] px-6 py-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <p className="text-xs text-sky-100 font-semibold uppercase tracking-wider">
                REQUIREMENT REQUEST
              </p>
              <h1 className="text-2xl font-bold text-white mt-1 font-mono">
                {requirement.requirementId}
              </h1>
              <p className="text-sky-100 text-sm mt-2 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Submitted on {formatDate(requirement.submittedAt)}
              </p>
            </div>
            <div>{getStatusBadge(requirement.status)}</div>
          </div>
        </div>

        {/* Exhibitor Information */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BuildingOfficeIcon className="h-4 w-4 text-[#00A1B1]" />
            Exhibitor Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">Company Name</p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {requirement.companyName}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium">Booth / Stall Number</p>
              <p className="text-sm font-semibold text-[#003A77] mt-1">
                {requirement.stallNumber || "Not Assigned Yet"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <UserIcon className="h-3.5 w-3.5" />
                Contact Person
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {requirement.contactPerson}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <EnvelopeIcon className="h-3.5 w-3.5" />
                Email
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">{requirement.email}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                <PhoneIcon className="h-3.5 w-3.5" />
                Phone
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">{requirement.phone}</p>
            </div>
            {metadata.boothArea && (
              <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">
                <p className="text-xs text-gray-500 font-medium">Booth Area</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{metadata.boothArea}</p>
              </div>
            )}
          </div>
        </div>

        {/* Items Required - Grouped */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <PackageIcon className="h-4 w-4 text-[#00A1B1]" />
            Items Required
          </h3>

          {Object.keys(groupedItems).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(groupedItems).map(([type, items]) => (
                <div
                  key={type}
                  className="bg-gray-50/90 border border-gray-200/70 rounded-xl overflow-hidden"
                >
                  <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100">
                    <div className="p-2 bg-[#003A77]/10 rounded-lg text-[#003A77]">
                      {getItemIcon(type)}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-base">
                      {getItemTypeLabel(type)}
                    </h4>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {items.map((item, index) => (
                      <div
                        key={item.id || index}
                        className="px-4 py-3 hover:bg-gray-100/70 transition"
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">
                              {item.description}
                            </p>
                            {item.specifications && (
                              <p className="text-xs text-gray-500 mt-1">{item.specifications}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 px-2.5 py-1 bg-[#003A77]/10 rounded-full shrink-0">
                            <TagIcon className="h-3 w-3 text-[#003A77]" />
                            <span className="text-xs font-semibold text-[#003A77]">
                              x{item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <WrenchIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No items specified</p>
            </div>
          )}
        </div>

        {/* Notes */}
        {(requirement.notes || requirement.adminNotes) && (
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <ClipboardDocumentListIcon className="h-4 w-4 text-[#00A1B1]" />
              Notes
            </h3>

            {requirement.notes && (
              <div className="mb-4 bg-amber-50 rounded-xl p-4 border-l-4 border-amber-400">
                <p className="text-xs text-amber-700 font-semibold mb-1">Exhibitor Notes:</p>
                <p className="text-sm text-gray-700">{requirement.notes}</p>
              </div>
            )}

            {requirement.adminNotes && (
              <div className="bg-sky-50 rounded-xl p-4 border-l-4 border-[#003A77]">
                <p className="text-xs text-[#003A77] font-semibold mb-1">Admin Notes:</p>
                <p className="text-sm text-gray-800">{requirement.adminNotes}</p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 text-xs text-gray-500 flex justify-between flex-wrap gap-2">
          <span>Requirement ID: {requirement.requirementId}</span>
          <span>Last Updated: {formatDate(requirement.updatedAt)}</span>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Update Status</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={editData.status}
                  onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Notes
                </label>
                <textarea
                  value={editData.adminNotes}
                  onChange={(e) => setEditData({ ...editData, adminNotes: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1]"
                  placeholder="Add notes about this requirement..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                disabled={updating}
                className="px-4 py-2 bg-[#003A77] text-white rounded-xl hover:bg-[#002855] disabled:opacity-50 flex items-center gap-2 text-sm font-medium transition cursor-pointer"
              >
                {updating ? (
                  <LoadingDots size="sm" tone="light" />
                ) : (
                  <CheckIcon className="h-4 w-4" />
                )}
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
