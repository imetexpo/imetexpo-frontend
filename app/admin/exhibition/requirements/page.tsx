"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Eye,
  Package,
  Building,
  Mail,
  Clock,
  CheckCircle,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import { exhibitorsAPI, type Exhibitor } from "@/lib/api/exhibitors";
import {
  fetchExhibitorRequirementsSummary,
  type ExhibitorRequirementsSummary,
} from "@/lib/api/extraRequirements";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);

type ExhibitorRow = ExhibitorRequirementsSummary & {
  hasRequests: boolean;
};

export default function ExhibitionExtraRequirementsPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ExhibitorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [exhibitorsRes, summary] = await Promise.all([
          exhibitorsAPI.getAll({ limit: 1000 }),
          fetchExhibitorRequirementsSummary().catch(() => [] as ExhibitorRequirementsSummary[]),
        ]);

        const summaryById = new Map(
          (summary || [])
            .filter((item) => item.exhibitorId)
            .map((item) => [item.exhibitorId, item])
        );

        const merged: ExhibitorRow[] = (exhibitorsRes.data || []).map((exhibitor: Exhibitor) => {
          const extra = summaryById.get(exhibitor.id);
          return {
            exhibitorId: exhibitor.id,
            companyName: exhibitor.company || extra?.companyName || "Unknown",
            contactPerson: exhibitor.name || extra?.contactPerson || "",
            email: exhibitor.email || extra?.email || "",
            phone: exhibitor.phone || extra?.phone || "",
            stallNumber: exhibitor.booth || extra?.stallNumber || "",
            requestCount: extra?.requestCount || 0,
            paidCount: extra?.paidCount || 0,
            pendingCount: extra?.pendingCount || 0,
            totalAmount: extra?.totalAmount || 0,
            paidAmount: extra?.paidAmount || 0,
            pendingAmount: extra?.pendingAmount || 0,
            latestSubmittedAt: extra?.latestSubmittedAt || "",
            hasRequests: Boolean(extra?.requestCount),
          };
        });

        merged.sort((a, b) => {
          if (a.hasRequests !== b.hasRequests) return a.hasRequests ? -1 : 1;
          return a.companyName.localeCompare(b.companyName);
        });

        setRows(merged);
      } catch (error: any) {
        if (error.message === "unauthorized" || error.response?.status === 401) {
          router.push("/admin/login");
          return;
        }
        toast.error(error.message || "Failed to load exhibitors");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const filtered = useMemo(
    () =>
      rows.filter((row) => {
        const q = search.toLowerCase();
        return (
          row.companyName?.toLowerCase().includes(q) ||
          row.contactPerson?.toLowerCase().includes(q) ||
          row.email?.toLowerCase().includes(q) ||
          row.stallNumber?.toLowerCase().includes(q)
        );
      }),
    [rows, search]
  );

  const openExhibitor = (exhibitorId: string) => {
    router.push(`/admin/exhibition/exhibitors/${exhibitorId}/requirements`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Exhibitor Extra Requirements</h1>
        <p className="text-gray-600 mt-1 text-sm">
          All exhibitors. Click one to see extra requirement requests and payment status.
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm font-medium text-gray-500">All exhibitors</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{rows.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm font-medium text-gray-500">With requests</p>
          <p className="text-2xl font-bold text-[#003A77] mt-1">
            {rows.filter((row) => row.hasRequests).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm font-medium text-gray-500">Paid</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {formatCurrency(rows.reduce((sum, row) => sum + row.paidAmount, 0))}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm font-medium text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {formatCurrency(rows.reduce((sum, row) => sum + row.pendingAmount, 0))}
          </p>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search exhibitors by company, contact, email, or booth..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white transition"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-7 w-7 animate-spin text-[#00A1B1]" />
            <span className="ml-3 text-sm text-gray-600 font-medium">Loading exhibitors...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-700 font-medium text-base">No exhibitors found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Exhibitor
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Booth
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Requests
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Paid
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pending
                  </th>
                  <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {filtered.map((row) => (
                  <tr
                    key={row.exhibitorId}
                    onClick={() => openExhibitor(row.exhibitorId)}
                    className="hover:bg-cyan-50/40 transition cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-[#00A1B1]">
                          <Building className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-[#003A77] transition">
                            {row.companyName}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">{row.contactPerson}</p>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
                            <Mail className="h-3 w-3" />
                            {row.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      {row.stallNumber ? (
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-800 text-xs font-semibold">
                          {row.stallNumber}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {row.requestCount}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                        <CheckCircle className="h-4 w-4" />
                        {formatCurrency(row.paidAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="inline-flex items-center gap-1 font-semibold text-amber-600">
                        <Clock className="h-4 w-4" />
                        {formatCurrency(row.pendingAmount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openExhibitor(row.exhibitorId);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#003A77] bg-blue-50 border border-blue-100 rounded-lg group-hover:bg-[#003A77] group-hover:text-white transition cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

