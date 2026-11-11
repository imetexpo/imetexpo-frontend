"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Users, Building, Mail, MapPin, Loader2, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchExhibitorTeamSummaries,
  type ExhibitorTeamSummary,
} from "@/lib/api/exhibitorTeam";

export default function ExhibitorsTeamPage() {
  const router = useRouter();
  const [rows, setRows] = useState<ExhibitorTeamSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchExhibitorTeamSummaries();
        setRows(data);
      } catch (error: any) {
        if (error.message === "unauthorized") {
          router.push("/admin/login");
          return;
        }
        toast.error(error.message || "Failed to load exhibitor teams");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const companyOptions = useMemo(() => {
    const unique = new Map<string, string>();
    rows.forEach((row) => {
      const name = (row.companyName || "").trim();
      if (name && !unique.has(name.toLowerCase())) {
        unique.set(name.toLowerCase(), name);
      }
    });
    return Array.from(unique.values()).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" })
    );
  }, [rows]);

  const filtered = useMemo(() => {
    const sorted = [...rows].sort((a, b) =>
      String(a.companyName || "").localeCompare(String(b.companyName || ""), undefined, {
        sensitivity: "base",
      })
    );
    if (selectedCompany === "all") return sorted;
    return sorted.filter(
      (row) => row.companyName?.toLowerCase() === selectedCompany.toLowerCase()
    );
  }, [rows, selectedCompany]);

  const submittedCount = useMemo(() => rows.filter((r) => r.hasTeam).length, [rows]);
  const totalMembersCount = useMemo(
    () => rows.reduce((sum, r) => sum + (r.memberCount || 0), 0),
    [rows]
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Exhibitors Team</h1>
        <p className="text-gray-600 mt-1 text-sm">
          All exhibitors. Click one to see company name, city, and team details.
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">All Exhibitors</p>
            <div className="h-9 w-9 rounded-lg bg-blue-50 text-[#003A77] flex items-center justify-center">
              <Building className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{rows.length}</p>
          <p className="text-xs text-gray-400 mt-1">Total participating companies</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Teams Submitted</p>
            <div className="h-9 w-9 rounded-lg bg-teal-50 text-[#00A1B1] flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{submittedCount}</p>
          <p className="text-xs text-teal-600 mt-1 font-medium">
            {rows.length > 0 ? `${Math.round((submittedCount / rows.length) * 100)}% completion rate` : "0% completion"}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Total Team Members</p>
            <div className="h-9 w-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totalMembersCount}</p>
          <p className="text-xs text-gray-400 mt-1">Personnel registered on floor</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
          Filter by Company
        </label>
        <div className="relative max-w-md">
          <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white transition"
          >
            <option value="all">All companies ({rows.length})</option>
            {companyOptions.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Teams Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-7 w-7 animate-spin text-[#00A1B1]" />
            <span className="ml-3 text-sm text-gray-600 font-medium">Loading exhibitor teams...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-700 font-medium text-base">No exhibitors found</p>
            <p className="text-gray-400 text-xs mt-1">No company matches the selected filter.</p>
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
                    City
                  </th>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Team Members
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
                    onClick={() => router.push(`/admin/exhibition/teams/${row.exhibitorId}`)}
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
                          <p className="text-xs text-gray-500 mt-0.5">{row.exhibitorName}</p>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
                            <Mail className="h-3 w-3" />
                            {row.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {row.city ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-50 text-gray-700 border border-gray-200 text-xs">
                          <MapPin className="h-3.5 w-3.5 text-[#00A1B1]" />
                          {row.city}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {row.hasTeam ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Users className="h-3.5 w-3.5" />
                          {row.memberCount} member{row.memberCount === 1 ? "" : "s"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium">
                          <AlertCircle className="h-3.5 w-3.5" />
                          Not submitted
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#003A77] bg-blue-50 border border-blue-100 rounded-lg group-hover:bg-[#003A77] group-hover:text-white transition">
                        <Eye className="h-3.5 w-3.5" />
                        View team
                      </span>
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

