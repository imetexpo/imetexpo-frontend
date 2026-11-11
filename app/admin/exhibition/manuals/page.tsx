"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Plus, 
  Trash2, 
  Upload, 
  FileText, 
  Calendar, 
  User, 
  File,
  BookOpen,
  Edit2,
  Download,
  Loader2
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import manualApi, { Manual, ManualFilters, ManualStatistics, ImportantDate, ApiError } from "@/lib/api/manualApi";

export default function ExhibitorManualsPage() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [manuals, setManuals] = useState<Manual[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [stats, setStats] = useState<ManualStatistics>({
    totalManuals: 0,
    publishedManuals: 0,
    draftManuals: 0,
    totalDownloads: 0,
    categoryStats: []
  });
  const [importantDates, setImportantDates] = useState<ImportantDate[]>([
    { label: "Setup Begins", dateLabel: "23 Mar 2027" },
    { label: "Event Days", dateLabel: "24–26 Mar 2027" },
    { label: "Breakdown", dateLabel: "26 Mar 2027" },
    { label: "Requirements Due", dateLabel: "25 Sep 2026" },
  ]);
  const [savingDates, setSavingDates] = useState(false);
  const [uploading, setUploading] = useState(false);

  const categories: string[] = ["all", "Setup", "Safety", "Marketing", "Technical", "Logistics", "Procedures", "General", "Rules", "Contact"];

  // Fetch manuals on component mount and when filters change
  useEffect(() => {
    fetchManuals();
    fetchStatistics();
    fetchImportantDates();
  }, [selectedCategory, search]);

  const fetchManuals = async (): Promise<void> => {
    try {
      setLoading(true);
      const filters: ManualFilters = {
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        search: search || undefined
      };
      const response = await manualApi.getManuals(filters);
      setManuals(response.data || []);
    } catch (error) {
      console.error("Error fetching manuals:", error);
      setManuals([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async (): Promise<void> => {
    try {
      const response = await manualApi.getStatistics();
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  const fetchImportantDates = async (): Promise<void> => {
    try {
      const response = await manualApi.getImportantDates();
      if (response.data?.length) {
        setImportantDates(response.data);
      }
    } catch (error) {
      console.error("Error fetching important dates:", error);
    }
  };

  const saveImportantDates = async (): Promise<void> => {
    const dates = importantDates
      .map((item) => ({
        label: item.label.trim(),
        dateLabel: item.dateLabel.trim(),
      }))
      .filter((item) => item.label && item.dateLabel);

    if (!dates.length) {
      toast.error("Add at least one important date");
      return;
    }

    try {
      setSavingDates(true);
      await manualApi.saveImportantDates(dates);
      await fetchImportantDates();
      toast.success("Important dates saved");
    } catch (error) {
      console.error("Error saving important dates:", error);
      toast.error("Failed to save important dates");
    } finally {
      setSavingDates(false);
    }
  };

  const handleDelete = async (id: string, type?: string): Promise<void> => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        if (type === "section") {
          await manualApi.deleteSection(id);
        } else {
          await manualApi.deleteManual(id);
        }
        
        await fetchManuals();
        await fetchStatistics();
        toast.success("Deleted successfully");
      } catch (error) {
        if (error instanceof ApiError) {
          console.error("Delete error:", error);
          if (error.status === 401) {
            toast.error("Session expired. Please login again.");
            router.push("/admin/login");
          } else {
            toast.error(`Failed to delete: ${error.message}`);
          }
        } else {
          toast.error("Failed to delete");
        }
      }
    }
  };

  const handleDownload = async (id: string, type?: string): Promise<void> => {
    if (type === "section") {
      const section = manuals.find(m => m.id === id);
      if (section) {
        const win = window.open("", "_blank");
        if (win) {
          win.document.write(`
            <html>
              <head>
                <title>${section.title}</title>
                <style>
                  body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
                  h1 { color: #003A77; }
                  .content { white-space: pre-line; }
                  .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
                </style>
              </head>
              <body>
                <h1>${section.title}</h1>
                <div class="meta">Category: ${section.category}</div>
                <div class="content">${section.description}</div>
              </body>
            </html>
          `);
        }
      }
    } else {
      await manualApi.downloadManual(id);
    }
  };

  const handleCreateNew = (): void => {
    router.push("/admin/exhibition/manuals/add");
  };

  const handleEdit = (id: string): void => {
    router.push(`/admin/exhibition/manuals/edit/${id}`);
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Setup: "bg-blue-100 text-blue-800 border-blue-200",
      Safety: "bg-red-100 text-red-800 border-red-200",
      Marketing: "bg-purple-100 text-purple-800 border-purple-200",
      Technical: "bg-orange-100 text-orange-800 border-orange-200",
      Logistics: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Procedures: "bg-indigo-100 text-indigo-800 border-indigo-200",
      General: "bg-gray-100 text-gray-800 border-gray-200",
      Rules: "bg-pink-100 text-pink-800 border-pink-200",
      Contact: "bg-teal-100 text-teal-800 border-teal-200"
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#00A1B1] mx-auto" />
          <p className="mt-4 text-sm text-gray-600 font-medium">Loading manuals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Exhibitor Manuals</h1>
          <p className="text-sm text-gray-600 mt-0.5">Manage exhibitor manuals, documents, and rules</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition ${uploading ? "opacity-60 cursor-wait" : "cursor-pointer"}`}>
            <Upload className="mr-2 h-4 w-4 text-gray-500" />
            {uploading ? "Uploading..." : "Quick Upload"}
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
              disabled={uploading}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const formData = new FormData();
                formData.append("file", file);
                formData.append("title", file.name.replace(/\.[^/.]+$/, ""));
                formData.append("description", "Exhibitor manual document");
                formData.append("category", "General");
                formData.append("version", "1.0");
                formData.append("status", "published");
                formData.append("updated_by", "Admin");

                try {
                  setUploading(true);
                  await manualApi.createManual(formData);
                  await fetchManuals();
                  await fetchStatistics();
                  toast.success("Document uploaded successfully");
                } catch (error: any) {
                  const message = error?.response?.data?.message || "Failed to upload document";
                  toast.error(message);
                } finally {
                  setUploading(false);
                  e.target.value = "";
                }
              }}
            />
          </label>
          <button
            onClick={handleCreateNew}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#003A77] to-[#00A1B1] text-white rounded-lg shadow-sm hover:opacity-95 text-sm font-semibold transition cursor-pointer"
          >
            <Plus className="mr-1.5 h-4 w-4" />
            New Manual Section
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg p-3 bg-blue-50 text-[#003A77]">
              <FileText className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Manuals</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{stats.totalManuals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg p-3 bg-emerald-50 text-emerald-600">
              <File className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Published</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{stats.publishedManuals}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg p-3 bg-amber-50 text-amber-600">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{stats.categoryStats.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg p-3 bg-indigo-50 text-indigo-600">
              <Download className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Downloads</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{stats.totalDownloads}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Dates */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">Important Dates</h2>
            <p className="text-xs text-gray-500 mt-0.5">These key milestones appear directly on the exhibitor manual portal.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setImportantDates((prev) => [...prev, { label: "", dateLabel: "" }])
              }
              className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              Add date
            </button>
            <button
              type="button"
              onClick={saveImportantDates}
              disabled={savingDates}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#003A77] to-[#00A1B1] rounded-lg hover:opacity-95 disabled:opacity-50 transition cursor-pointer shadow-sm"
            >
              {savingDates ? "Saving..." : "Save dates"}
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {importantDates.map((item, index) => (
            <div key={`${item.id || "date"}-${index}`} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <input
                type="text"
                value={item.label}
                onChange={(e) =>
                  setImportantDates((prev) =>
                    prev.map((date, i) => (i === index ? { ...date, label: e.target.value } : date))
                  )
                }
                placeholder="Label, e.g. Setup Begins"
                className="sm:col-span-5 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white"
              />
              <input
                type="text"
                value={item.dateLabel}
                onChange={(e) =>
                  setImportantDates((prev) =>
                    prev.map((date, i) => (i === index ? { ...date, dateLabel: e.target.value } : date))
                  )
                }
                placeholder="Date, e.g. 23 Mar 2027"
                className="sm:col-span-5 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white"
              />
              <button
                type="button"
                onClick={() => setImportantDates((prev) => prev.filter((_, i) => i !== index))}
                className="sm:col-span-2 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 rounded-lg hover:bg-rose-100 transition cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search manuals by title or content..."
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white"
            />
          </div>
          <select 
            className="block w-full sm:w-auto px-3.5 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white"
            value={selectedCategory}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Manuals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {manuals.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-xl border border-gray-200">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-700 font-medium">No manuals found</p>
            <p className="text-xs text-gray-400 mt-1">Add your first section or upload a manual document.</p>
            <button
              onClick={handleCreateNew}
              className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#003A77] to-[#00A1B1] text-white rounded-lg text-xs font-semibold hover:opacity-95 transition"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Add Your First Manual Section
            </button>
          </div>
        ) : (
          manuals.map((manual) => (
            <div key={manual.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between">
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {manual.type === "section" ? (
                        <BookOpen className="h-4 w-4 text-teal-600 shrink-0" />
                      ) : (
                        <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                      )}
                      <h3 className="text-base font-bold text-gray-900 truncate" title={manual.title}>
                        {manual.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2" title={manual.description}>
                      {manual.description}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full border ${getCategoryColor(manual.category)} shrink-0`}>
                    {manual.category}
                  </span>
                </div>
                
                <div className="space-y-1.5 text-xs text-gray-600 pt-2 border-t border-gray-100">
                  {manual.version && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Version:</span>
                      <span className="px-1.5 py-0.5 bg-gray-100 rounded text-[11px] font-medium">{manual.version}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" /> Updated:
                    </span>
                    <span>{new Date(manual.last_updated).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-1">
                      <User className="h-3.5 w-3.5" /> Author:
                    </span>
                    <span className="truncate max-w-[150px]">{manual.updated_by}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      manual.status === "published" 
                        ? "bg-emerald-50 text-emerald-700" 
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {manual.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-gray-400">Downloads</p>
                  <p className="text-sm font-bold text-gray-900">{manual.downloads || 0}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDownload(manual.id, manual.type)}
                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(manual.id)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(manual.id, manual.type)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

