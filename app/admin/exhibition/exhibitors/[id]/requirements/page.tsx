"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchExhibitorRequirements,
  type ExtraRequirementRequest,
} from "@/lib/api/extraRequirements";
import LoadingDots from "@/components/ui/LoadingDots";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount || 0);

function isRequestPaid(request: ExtraRequirementRequest) {
  return String(request.payment?.status || "").toLowerCase() === "paid";
}

export default function ExhibitorExtraRequirementsPage() {
  const params = useParams();
  const router = useRouter();
  const exhibitorId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [paymentFilter, setPaymentFilter] = useState<"all" | "paid" | "pending">("all");
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchExhibitorRequirements>> | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchExhibitorRequirements(exhibitorId);
        setData(result);
      } catch (error: any) {
        if (error.message === "unauthorized") {
          router.push("/admin/login");
          return;
        }
        toast.error(error.message || "Failed to load exhibitor requirements");
      } finally {
        setLoading(false);
      }
    };

    if (exhibitorId) load();
  }, [exhibitorId, router]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingDots tone="brand" className="mx-auto flex" />
        <span className="ml-3 text-sm text-gray-500 font-medium">Loading extra requirements...</span>
      </div>
    );
  }

  if (!data) return null;

  const filteredRequests = (data.requests || []).filter((request) => {
    if (paymentFilter === "paid") return isRequestPaid(request);
    if (paymentFilter === "pending") return !isRequestPaid(request);
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <button
        onClick={() => router.push("/admin/exhibition/exhibitors")}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all exhibitors
      </button>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{data.exhibitor.company || "Exhibitor"}</h1>
          <p className="text-xs text-gray-500 mt-1">
            {data.exhibitor.name} · {data.exhibitor.email}
            {data.exhibitor.booth ? ` · Booth ${data.exhibitor.booth}` : ""}
          </p>
        </div>
        <Link
          href={`/admin/exhibition/exhibitors/${exhibitorId}`}
          className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-[#003A77] bg-blue-50 border border-blue-200/80 rounded-lg hover:bg-blue-100 transition"
        >
          View exhibitor profile
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl border border-gray-200/80 p-4 shadow-xs">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{data.summary.requestCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-teal-100 p-4 shadow-xs">
          <p className="text-xs text-teal-700 font-medium uppercase tracking-wider">Total Value</p>
          <p className="text-2xl font-bold text-[#003A77] mt-1">{formatCurrency(data.summary.totalAmount)}</p>
        </div>
        <div className="bg-white rounded-xl border border-emerald-100 p-4 shadow-xs">
          <p className="text-xs text-emerald-700 font-medium uppercase tracking-wider">Paid Amount</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{formatCurrency(data.summary.paidAmount)}</p>
        </div>
        <div className="bg-white rounded-xl border border-amber-100 p-4 shadow-xs">
          <p className="text-xs text-amber-700 font-medium uppercase tracking-wider">Pending Amount</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{formatCurrency(data.summary.pendingAmount)}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setPaymentFilter("all")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
            paymentFilter === "all"
              ? "bg-[#003A77] text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          All Requests ({data.requests.length})
        </button>
        <button
          onClick={() => setPaymentFilter("paid")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
            paymentFilter === "paid"
              ? "bg-[#003A77] text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          Paid ({data.summary.paidCount})
        </button>
        <button
          onClick={() => setPaymentFilter("pending")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
            paymentFilter === "pending"
              ? "bg-[#003A77] text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          Pending ({data.summary.pendingCount})
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200/80 p-12 text-center shadow-xs">
            <Package className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-gray-700">No extra requirements found for this filter</p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div key={req.id} className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-100">
                <div>
                  <span className="text-xs font-mono font-bold text-gray-900">REQ: {req.requirementId}</span>
                  <span className="text-xs text-gray-400 ml-2">
                    {new Date(req.submittedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  {isRequestPaid(req) ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle size={11} /> PAID
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <Clock size={11} /> PAYMENT PENDING
                    </span>
                  )}
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                    <tr>
                      <th className="px-3 py-2">Item</th>
                      <th className="px-3 py-2">Qty</th>
                      <th className="px-3 py-2">Unit Price</th>
                      <th className="px-3 py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {(req.items || []).map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-2 font-medium text-gray-900">{item.description || item.type}</td>
                        <td className="px-3 py-2">{item.quantity}</td>
                        <td className="px-3 py-2">{formatCurrency(item.unitPrice || 0)}</td>
                        <td className="px-3 py-2 text-right font-semibold text-[#003A77]">{formatCurrency(item.totalPrice || 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 font-bold text-gray-900 border-t border-gray-200">
                    <tr>
                      <td colSpan={3} className="px-3 py-2 text-right">Grand Total:</td>
                      <td className="px-3 py-2 text-right text-emerald-700">{formatCurrency(req.totals?.total || 0)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

