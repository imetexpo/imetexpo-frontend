"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  CloudArrowUpIcon,
  XMarkIcon,
  DocumentIcon,
  ExclamationCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import manualApi, { Manual, ApiError } from "@/lib/api/manualApi";

interface ManualFormData {
  title: string;
  description: string;
  category: string;
  version: string;
  status: "published" | "draft";
  updated_by: string;
}

export default function EditManualPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const [originalManual, setOriginalManual] = useState<Manual | null>(null);
  const [formData, setFormData] = useState<ManualFormData>({
    title: "",
    description: "",
    category: "Setup",
    version: "1.0",
    status: "draft",
    updated_by: "Admin",
  });

  const categories = [
    "Setup",
    "Safety",
    "Marketing",
    "Technical",
    "Logistics",
    "Procedures",
    "General",
    "Rules",
    "Contact",
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Setup": return "🛠️";
      case "Safety": return "⚠️";
      case "Marketing": return "📢";
      case "Technical": return "💻";
      case "Logistics": return "📦";
      case "Procedures": return "📋";
      case "General": return "📄";
      case "Rules": return "📜";
      case "Contact": return "📞";
      default: return "📄";
    }
  };

  useEffect(() => {
    fetchManual();
  }, [id]);

  const fetchManual = async () => {
    try {
      setLoading(true);
      const response = await manualApi.getManual(id);
      const manual = response.data;
      setOriginalManual(manual);
      setFormData({
        title: manual.title,
        description: manual.description || "",
        category: manual.category,
        version: manual.version || "1.0",
        status: (manual.status as "published" | "draft") || "published",
        updated_by: manual.updated_by || "Admin",
      });
    } catch (error) {
      console.error("Error fetching manual:", error);
      if (error instanceof ApiError && error.status === 401) {
        toast.error("Session expired. Please login again.");
        router.push("/admin/login");
      } else {
        toast.error("Failed to fetch manual details");
      }
      router.push("/admin/exhibition/manuals");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setFileError("Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.");
      setFile(null);
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setFileError("File size must be less than 10MB");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formDataToSend = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (file) {
        formDataToSend.append("file", file);
      }

      await manualApi.updateManual(id, formDataToSend);
      
      toast.success("Manual updated successfully!");
      router.push("/admin/exhibition/manuals");
      router.refresh();
    } catch (error) {
      console.error("Error updating manual:", error);
      if (error instanceof ApiError && error.status === 401) {
        toast.error("Session expired. Please login again.");
        router.push("/admin/login");
      } else {
        toast.error("Failed to update manual. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/exhibition/manuals");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00A1B1] mx-auto" />
          <p className="mt-4 text-sm text-gray-600 font-medium">Loading manual details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
        >
          <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Manual</h1>
          <p className="text-sm text-gray-500">Update manual details and upload a new version if needed</p>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-[#003A77] to-[#00A1B1] rounded-xl shadow-md p-6 text-white">
        <h2 className="text-xl font-bold mb-1">Editing: {originalManual?.title}</h2>
        <p className="text-cyan-100 text-sm">
          You can update the section details below. Uploading a new file will replace the existing document.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current File Info */}
        {originalManual && originalManual.file_name && (
          <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
            <h3 className="text-base font-bold text-gray-900 mb-3">Current File</h3>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center">
              <DocumentIcon className="h-8 w-8 text-[#003A77] mr-3 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">{originalManual.file_name}</p>
                <p className="text-xs text-gray-500">{originalManual.file_size}</p>
              </div>
            </div>
          </div>
        )}

        {/* File Upload Section */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-bold text-gray-900 mb-3">Upload New Version (Optional)</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50/50 text-center">
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-semibold text-[#003A77] hover:underline"
              >
                <span>Click to upload new version</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1 text-xs text-gray-400">(leave empty to keep current file)</p>
            </div>
            <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX, TXT up to 10MB</p>

            {fileError && (
              <div className="mt-4 flex items-center justify-center text-rose-600 text-xs font-semibold">
                <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                {fileError}
              </div>
            )}

            {file && !fileError && (
              <div className="mt-4 flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 max-w-md mx-auto shadow-xs">
                <div className="flex items-center">
                  <DocumentIcon className="h-6 w-6 text-[#003A77] mr-2 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs font-semibold text-gray-900 truncate max-w-[200px]">{file.name}</p>
                    <p className="text-[11px] text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Manual Details Section */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">Manual Details</h3>
          
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">
                Description / Content
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white font-mono"
                placeholder="Enter a brief description or text content of this section..."
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="category"
                  id="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white appearance-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-sm">
                  <span>{getCategoryIcon(formData.category)}</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="version" className="block text-sm font-semibold text-gray-700 mb-1">
                Version
              </label>
              <input
                type="text"
                name="version"
                id="version"
                value={formData.version}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white"
                placeholder="e.g., 1.0, 2.1"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white"
              >
                <option value="draft">Draft (Hidden from exhibitors)</option>
                <option value="published">Published (Visible to exhibitors)</option>
              </select>
            </div>

            <div>
              <label htmlFor="updated_by" className="block text-sm font-semibold text-gray-700 mb-1">
                Updated By
              </label>
              <input
                type="text"
                name="updated_by"
                id="updated_by"
                value={formData.updated_by}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-[#003A77] to-[#00A1B1] text-white text-sm font-semibold rounded-lg hover:opacity-95 disabled:opacity-50 transition cursor-pointer shadow-sm"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

