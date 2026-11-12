// app/admin/received/page.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DocumentTextIcon,
  EyeIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  WrenchIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
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
  CoffeeIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import LoadingDots from "@/components/ui/LoadingDots";
import {
  fetchReceivedRequirements,
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

export default function AdminReceivedRequirementsPage() {
  const router = useRouter();
  const [requirements, setRequirements] = useState<ExtraRequirementRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadRequirements = async () => {
    try {
      setLoading(true);
      const list = await fetchReceivedRequirements({ limit: 1000 });
      const cleaned = (list || []).map((req) => ({
        ...req,
        items: (req.items || []).map((item) => ({
          ...item,
          specifications: stripCostFromSpecs(item.specifications),
        })),
      }));
      setRequirements(cleaned);
    } catch (error: any) {
      if (error.message === "unauthorized") {
        router.push("/admin/login");
        return;
      }
      toast.error(error.message || "Failed to load received requirements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequirements();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const stats = useMemo(
    () => ({
      total: requirements.length,
      pending: requirements.filter((req) => req.status === "pending").length,
      approved: requirements.filter((req) => req.status === "approved").length,
      rejected: requirements.filter((req) => req.status === "rejected").length,
      completed: requirements.filter((req) => req.status === "completed").length,
    }),
    [requirements]
  );

  const filteredRequirements = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return requirements.filter((req) => {
      const matchesStatus = statusFilter === "all" || req.status === statusFilter;
      if (!matchesStatus) return false;
      if (!query) return true;
      return (
        req.companyName?.toLowerCase().includes(query) ||
        req.contactPerson?.toLowerCase().includes(query) ||
        req.email?.toLowerCase().includes(query) ||
        (req.stallNumber && req.stallNumber.toLowerCase().includes(query)) ||
        req.requirementId?.toLowerCase().includes(query)
      );
    });
  }, [requirements, searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
      rejected: "bg-rose-50 text-rose-700 border-rose-200",
      completed: "bg-sky-50 text-[#003A77] border-sky-200",
    };
    const icons: Record<string, React.ReactElement> = {
      pending: <ClockIcon className="h-3.5 w-3.5" />,
      approved: <CheckCircleIcon className="h-3.5 w-3.5" />,
      rejected: <XCircleIcon className="h-3.5 w-3.5" />,
      completed: <CheckCircleIcon className="h-3.5 w-3.5" />,
    };

    const normalized = (status || "pending").toLowerCase();
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-2xs ${
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
    if (typeLower.includes("furniture")) return <SofaIcon className="h-3.5 w-3.5" />;
    if (typeLower.includes("av") || typeLower.includes("it")) return <MonitorIcon className="h-3.5 w-3.5" />;
    if (typeLower.includes("electrical")) return <ZapIcon className="h-3.5 w-3.5" />;
    if (typeLower.includes("hostess")) return <UsersIcon className="h-3.5 w-3.5" />;
    if (typeLower.includes("air")) return <CableIcon className="h-3.5 w-3.5" />;
    if (typeLower.includes("water")) return <DropletIcon className="h-3.5 w-3.5" />;
    if (typeLower.includes("security")) return <ShieldCheckIcon className="h-3.5 w-3.5" />;
    if (typeLower.includes("internet") || typeLower.includes("wifi")) return <WifiIcon className="h-3.5 w-3.5" />;
    if (typeLower.includes("lighting")) return <LightbulbIcon className="h-3.5 w-3.5" />;
    if (typeLower.includes("housekeeping")) return <SparklesIcon className="h-3.5 w-3.5" />;
    if (typeLower.includes("coffee")) return <CoffeeIcon className="h-3.5 w-3.5" />;
    return <WrenchIcon className="h-3.5 w-3.5" />;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) return "N/A";
    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const groupAndCombineItems = (items: ExtraRequirementItem[]) => {
    const grouped: Record<string, { totalQuantity: number; items: ExtraRequirementItem[] }> = {};
    (items || []).forEach((item) => {
      const key = item.type || "General";
      if (!grouped[key]) {
        grouped[key] = { totalQuantity: 0, items: [] };
      }
      grouped[key].totalQuantity += Number(item.quantity) || 0;
      grouped[key].items.push(item);
    });
    return grouped;
  };

  const downloadCSV = () => {
    const headers = [
      "Requirement ID",
      "Company Name",
      "Booth / Stall Number",
      "Contact Person",
      "Email",
      "Phone",
      "Status",
      "Submitted Date",
      "Items Required",
    ];

    const rows = filteredRequirements.map((req) => [
      req.requirementId,
      req.companyName,
      req.stallNumber || "N/A",
      req.contactPerson,
      req.email,
      req.phone,
      req.status,
      formatDate(req.submittedAt),
      (req.items || [])
        .map((item) => `${item.type}: ${item.description} (x${item.quantity})`)
        .join("; "),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `indiamet_requirements_${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequirements = filteredRequirements.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequirements.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <LoadingDots tone="brand" className="mx-auto flex" />
          <p className="mt-4 text-sm font-medium text-gray-600">Loading received requirements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Received Requirements
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage exhibitor extra requirements
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-sm text-sm font-medium cursor-pointer"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-2xs text-sm font-medium cursor-pointer"
          >
            <PrinterIcon className="h-4 w-4 text-gray-500" />
            Print
          </button>
          <button
            onClick={loadRequirements}
            className="flex items-center gap-2 px-4 py-2 bg-[#003A77] text-white rounded-xl hover:bg-[#002855] transition-all shadow-sm text-sm font-medium cursor-pointer"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl shadow-xs p-4 border border-gray-200/80 hover:shadow-md transition group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Total</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-slate-100 transition">
              <DocumentTextIcon className="h-6 w-6 text-[#003A77]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xs p-4 border border-amber-200/80 hover:shadow-md transition group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-700 font-semibold uppercase tracking-wide">Pending</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{stats.pending}</p>
            </div>
            <div className="p-2.5 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition">
              <ClockIcon className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xs p-4 border border-emerald-200/80 hover:shadow-md transition group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">Approved</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.approved}</p>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition">
              <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xs p-4 border border-rose-200/80 hover:shadow-md transition group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-rose-700 font-semibold uppercase tracking-wide">Rejected</p>
              <p className="text-2xl font-bold text-rose-600 mt-1">{stats.rejected}</p>
            </div>
            <div className="p-2.5 bg-rose-50 rounded-xl group-hover:bg-rose-100 transition">
              <XCircleIcon className="h-6 w-6 text-rose-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xs p-4 border border-sky-200/80 hover:shadow-md transition group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#003A77] font-semibold uppercase tracking-wide">Completed</p>
              <p className="text-2xl font-bold text-[#003A77] mt-1">{stats.completed}</p>
            </div>
            <div className="p-2.5 bg-sky-50 rounded-xl group-hover:bg-sky-100 transition">
              <PackageIcon className="h-6 w-6 text-[#00A1B1]" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by company, contact person, booth number, or requirement ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] focus:bg-white transition"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-gray-50/50 border border-gray-300 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00A1B1] focus:border-[#00A1B1] cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>
            {(searchTerm || statusFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Requirements Cards View */}
      <div className="space-y-4">
        {filteredRequirements.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs text-center py-16">
            <PackageIcon className="h-14 w-14 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No requirements found</h3>
            <p className="text-sm text-gray-500">
              {requirements.length === 0
                ? "No extra requirements have been submitted yet."
                : "No requirements match your search criteria."}
            </p>
          </div>
        ) : (
          currentRequirements.map((requirement) => {
            const groupedItems = groupAndCombineItems(requirement.items);
            return (
              <div
                key={requirement.id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-[#003A77] to-[#005999] px-6 py-4">
                  <div className="flex justify-between items-start flex-wrap gap-3">
                    <div>
                      <p className="text-[11px] text-sky-100 font-semibold uppercase tracking-wider">
                        REQUIREMENT ID
                      </p>
                      <p className="text-lg font-bold text-white font-mono">
                        {requirement.requirementId}
                      </p>
                      <p className="text-xs text-sky-100 mt-1 flex items-center gap-1.5">
                        <CalendarIcon className="h-3.5 w-3.5" />
                        {formatDate(requirement.submittedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(requirement.status)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Company Info */}
                  <div className="flex flex-wrap gap-6 mb-6 pb-4 border-b border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Company</p>
                      <p className="text-base font-semibold text-gray-900">
                        {requirement.companyName}
                      </p>
                    </div>
                    {requirement.stallNumber && (
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Booth / Stall</p>
                        <p className="text-base font-semibold text-[#003A77]">
                          {requirement.stallNumber}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Contact Person</p>
                      <p className="text-base font-semibold text-gray-900">
                        {requirement.contactPerson}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Contact</p>
                      <p className="text-sm text-gray-700">{requirement.email}</p>
                      <p className="text-sm text-gray-700">{requirement.phone}</p>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <PackageIcon className="h-4 w-4 text-[#00A1B1]" />
                      Items Required
                    </h3>
                    {Object.keys(groupedItems).length === 0 ? (
                      <p className="text-xs text-gray-500 italic">No line items specified</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(groupedItems).map(([type, { items, totalQuantity }]) => (
                          <div
                            key={type}
                            className="bg-gray-50/90 border border-gray-200/60 rounded-xl p-3.5 hover:bg-gray-100/80 transition"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-[#003A77]/10 rounded-lg text-[#003A77]">
                                  {getItemIcon(type)}
                                </div>
                                <span className="text-sm font-semibold text-gray-800">{type}</span>
                              </div>
                              <span className="text-xs font-semibold bg-white px-2.5 py-0.5 rounded-full text-[#003A77] border border-gray-200/80 shadow-2xs">
                                Total: {totalQuantity}
                              </span>
                            </div>
                            <div className="space-y-1 ml-7">
                              {items.map((item) => (
                                <div
                                  key={item.id}
                                  className="text-xs text-gray-600 flex justify-between items-center gap-2"
                                >
                                  <span className="truncate">• {item.description}</span>
                                  <span className="text-[#00A1B1] font-semibold shrink-0">
                                    x{item.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Notes if any */}
                  {requirement.notes && (
                    <div className="mt-4 p-3.5 bg-amber-50 rounded-xl border-l-4 border-amber-400">
                      <p className="text-xs text-amber-700 font-semibold mb-1">Notes:</p>
                      <p className="text-sm text-gray-700">{requirement.notes}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-gray-100 flex justify-end">
                    <Link
                      href={`/admin/received/${requirement.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#003A77]/10 text-[#003A77] rounded-xl hover:bg-[#003A77] hover:text-white transition font-semibold text-sm"
                    >
                      <EyeIcon className="h-4 w-4" />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 text-sm font-semibold rounded-lg transition cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-[#003A77] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
