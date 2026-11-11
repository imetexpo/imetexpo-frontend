"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Building, Mail, MapPin, Phone, Users, Loader2, ShieldCheck, Hash } from "lucide-react";
import toast from "react-hot-toast";
import {
  fetchExhibitorTeamDetail,
  type ExhibitorTeamDetail,
} from "@/lib/api/exhibitorTeam";

export default function ExhibitorTeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const exhibitorId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ExhibitorTeamDetail | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const result = await fetchExhibitorTeamDetail(exhibitorId);
        setData(result);
      } catch (error: any) {
        if (error.message === "unauthorized") {
          router.push("/admin/login");
          return;
        }
        toast.error(error.message || "Failed to load exhibitor team");
      } finally {
        setLoading(false);
      }
    };

    if (exhibitorId) load();
  }, [exhibitorId, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#00A1B1]" />
        <span className="ml-3 text-sm text-gray-600 font-medium">Loading exhibitor team...</span>
      </div>
    );
  }

  if (!data) return null;

  const companyName = data.team?.companyName || data.exhibitor.company;
  const city = data.team?.city || "";
  const members = data.team?.members || [];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <button
        onClick={() => router.push("/admin/exhibition/teams")}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#003A77] transition cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Exhibitors Team
      </button>

      {/* Exhibitor Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-[#003A77] to-[#00A1B1] text-white flex items-center justify-center shrink-0 shadow-md">
            <Building className="h-7 w-7" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{companyName}</h1>
              {data.exhibitor.boothNumber && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#003A77] border border-blue-200">
                  <Hash className="h-3 w-3" />
                  Booth {data.exhibitor.boothNumber}
                </span>
              )}
            </div>
            <p className="text-gray-600 font-medium mt-1">{data.exhibitor.name}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                <Mail className="h-3.5 w-3.5 text-gray-400" />
                {data.exhibitor.email}
              </span>
              {data.exhibitor.phone && (
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                  <Phone className="h-3.5 w-3.5 text-gray-400" />
                  {data.exhibitor.phone}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Company Name</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">{companyName}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Designated City</p>
          <p className="text-lg font-semibold text-gray-900 mt-1 inline-flex items-center gap-2">
            <MapPin className="h-5 w-5 text-[#00A1B1]" />
            {city || <span className="text-gray-400 text-sm font-normal">Not submitted</span>}
          </p>
        </div>
      </div>

      {/* Team Members List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/70 flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900 inline-flex items-center gap-2">
            <Users className="h-5 w-5 text-[#00A1B1]" />
            Team Members
          </h2>
          <span className="text-xs font-semibold text-gray-500">
            {members.length} registered member{members.length === 1 ? "" : "s"}
          </span>
        </div>

        {members.length === 0 ? (
          <div className="text-center py-16">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-700 font-medium text-base">This exhibitor has not submitted a team yet.</p>
            <p className="text-gray-400 text-xs mt-1">Team members submitted from the exhibitor portal will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Designation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {members.map((member, index) => (
                  <tr key={member.id || `${member.name}-${index}`} className="hover:bg-cyan-50/30 transition">
                    <td className="px-6 py-4 text-xs font-medium text-gray-400">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                        {member.designation}
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

