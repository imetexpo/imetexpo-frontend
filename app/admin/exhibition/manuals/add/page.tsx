"use client";

import { useState } from "react";
import { DocumentIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import manualApi, { ApiError } from "@/lib/api/manualApi";

export default function AddManualPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = ["General", "Setup", "Rules", "Contact", "Safety", "Technical", "Logistics", "Procedures"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await manualApi.createSection({
        title: title.trim(),
        content: content.trim(),
        category: category.toLowerCase(),
      });

      if (response.success) {
        toast.success("Manual section added successfully!");
        router.push("/admin/exhibition/manuals");
      } else {
        throw new Error(response.message || "Failed to add manual section");
      }
    } catch (error) {
      console.error("Error adding manual section:", error);
      if (error instanceof ApiError && error.status === 401) {
        setError("Session expired. Please login again.");
        setTimeout(() => {
          router.push("/admin/login");
        }, 1500);
      } else {
        setError(error instanceof Error ? error.message : "Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <DocumentIcon className="h-6 w-6 text-[#003A77]" />
          <h1 className="text-2xl font-bold text-gray-900">
            Add Manual Section
          </h1>
        </div>

        <button
          onClick={() => router.push("/admin/exhibition/manuals")}
          className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Manuals
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Section Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white"
              placeholder="e.g., Event Overview, Setup Schedule, Rules & Regulations"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white font-mono"
              placeholder="Enter the section content here... Use new lines for paragraphs."
              disabled={loading}
            />
            <p className="text-xs text-gray-400 mt-1">
              This content will appear formatted in the collapsible section of the exhibitor manual.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white"
              disabled={loading}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.push("/admin/exhibition/manuals")}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-r from-[#003A77] to-[#00A1B1] text-white text-sm font-semibold rounded-lg hover:opacity-95 disabled:opacity-50 transition cursor-pointer shadow-sm"
            >
              {loading ? "Saving..." : "Add Manual Section"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

