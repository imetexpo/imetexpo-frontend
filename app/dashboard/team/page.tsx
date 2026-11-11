"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  UserGroupIcon,
  PlusIcon,
  TrashIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import { INDIA_CITIES } from "@/lib/indiaCities";
import { fetchMyTeam, submitMyTeam, type TeamMember } from "@/lib/api/exhibitorTeam";

type MemberDraft = TeamMember & { key: string };

function newMember(): MemberDraft {
  return {
    key: `member-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: "",
    designation: "",
  };
}

export default function TeamMembersPage() {
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [members, setMembers] = useState<MemberDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const cityBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const team = await fetchMyTeam();
        setCompanyName(team.companyName || "");
        setCity(team.city || "");
        setCityQuery(team.city || "");
        setSubmittedAt(team.submittedAt || null);
        setMembers(
          (team.members || []).map((member, index) => ({
            key: member.id || `saved-${index}`,
            name: member.name,
            designation: member.designation,
          }))
        );
      } catch (error: any) {
        if (error.message === "unauthorized") {
          window.location.href = "/login";
          return;
        }
        toast.error(error.message || "Failed to load team members");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (cityBoxRef.current && !cityBoxRef.current.contains(event.target as Node)) {
        setCityOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filteredCities = useMemo(() => {
    const q = cityQuery.trim().toLowerCase();
    if (!q) return INDIA_CITIES;
    return INDIA_CITIES.filter((item) => item.toLowerCase().includes(q));
  }, [cityQuery]);

  const addTeammate = () => {
    setMembers((prev) => [...prev, newMember()]);
  };

  const removeTeammate = (key: string) => {
    setMembers((prev) => prev.filter((member) => member.key !== key));
  };

  const updateTeammate = (key: string, field: "name" | "designation", value: string) => {
    setMembers((prev) =>
      prev.map((member) => (member.key === key ? { ...member, [field]: value } : member))
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const cleanedMembers = members
      .map((member) => ({
        name: member.name.trim(),
        designation: member.designation.trim(),
      }))
      .filter((member) => member.name && member.designation);

    const selectedCity =
      city.trim() ||
      INDIA_CITIES.find(
        (item) => item.toLowerCase() === cityQuery.trim().toLowerCase()
      ) ||
      "";

    if (!companyName.trim()) {
      toast.error("Enter company name");
      return;
    }
    if (!selectedCity) {
      toast.error("Select a city");
      return;
    }
    if (!cleanedMembers.length) {
      toast.error("Add at least one team member");
      return;
    }

    try {
      setSubmitting(true);
      const saved = await submitMyTeam({
        companyName: companyName.trim(),
        city: selectedCity,
        members: cleanedMembers,
      });
      setCity(selectedCity);
      setCityQuery(selectedCity);
      setSubmittedAt(saved.submittedAt || new Date().toISOString());
      setMembers(
        (saved.members || cleanedMembers).map((member, index) => ({
          key: member.id || `saved-${index}`,
          name: member.name,
          designation: member.designation,
        }))
      );
      toast.success("Team members submitted successfully");
    } catch (error: any) {
      if (error.message === "unauthorized") {
        window.location.href = "/login";
        return;
      }
      toast.error(error.message || "Failed to submit team members");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00A1B1] mx-auto" />
          <p className="mt-4 text-sm text-gray-600 font-medium">Loading team members...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Toaster position="top-right" />
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
        <p className="text-sm text-gray-600 mt-1">
          Add your company details and the teammates attending IndiaMET 2027.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Company Name
            </label>
            <div className="relative">
              <BuildingOffice2Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none text-sm transition"
                required
              />
            </div>
          </div>

          <div ref={cityBoxRef} className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              India Cities
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={cityQuery}
                onChange={(e) => {
                  setCityQuery(e.target.value);
                  setCity("");
                  setCityOpen(true);
                }}
                onFocus={() => setCityOpen(true)}
                placeholder="Search or select city"
                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none text-sm transition"
                autoComplete="off"
                required={!city}
              />
            </div>
            {cityOpen && (
              <div className="absolute z-20 mt-1.5 w-full max-h-56 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl divide-y divide-gray-100">
                {filteredCities.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-gray-500">No matching cities found</p>
                ) : (
                  filteredCities.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => {
                        setCity(item);
                        setCityQuery(item);
                        setCityOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition hover:bg-cyan-50 ${
                        city === item ? "bg-cyan-50/70 text-[#003A77] font-semibold" : "text-gray-700"
                      }`}
                    >
                      {item}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Teammates</h2>
              <p className="text-xs text-gray-500 mt-0.5">Add full name and designation for each representative.</p>
            </div>
            <button
              type="button"
              onClick={addTeammate}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#003A77] to-[#00A1B1] text-white rounded-lg hover:opacity-95 text-xs font-semibold shadow-sm transition"
            >
              <PlusIcon className="h-4 w-4" />
              Add Teammate
            </button>
          </div>

          {members.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <UserGroupIcon className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-700 font-medium text-sm">No team members added yet</p>
              <p className="text-gray-400 text-xs mt-1">Click &ldquo;Add Teammate&rdquo; above to register exhibition staff.</p>
            </div>
          ) : (
            <div className="space-y-3.5">
              {members.map((member, index) => (
                <div
                  key={member.key}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 rounded-xl border border-gray-200 p-4 bg-gray-50/40 hover:bg-white hover:border-cyan-200 transition"
                >
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Member #{index + 1} Name
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateTeammate(member.key, "name", e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none text-sm bg-white"
                      required
                    />
                  </div>
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Designation / Role
                    </label>
                    <input
                      type="text"
                      value={member.designation}
                      onChange={(e) => updateTeammate(member.key, "designation", e.target.value)}
                      placeholder="e.g. Sales Director, Engineer"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none text-sm bg-white"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2 flex items-end">
                    <button
                      type="button"
                      onClick={() => removeTeammate(member.key)}
                      className="w-full inline-flex items-center justify-center gap-1 px-3 py-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg text-xs font-semibold transition"
                    >
                      <TrashIcon className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          {submittedAt ? (
            <p className="text-xs text-emerald-700 font-medium inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg">
              <CheckCircleIcon className="h-4 w-4" />
              Last submitted on {new Date(submittedAt).toLocaleString()}
            </p>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-[#003A77] to-[#00A1B1] text-white rounded-lg hover:opacity-95 font-semibold text-sm shadow-md transition disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Submitting..." : "Submit Team Members"}
          </button>
        </div>
      </form>
    </div>
  );
}

