"use client";

import { useState, useEffect } from "react";
import {
  DocumentIcon,
  CloudArrowUpIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface PDFFile {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  category: string;
  url: string;
}

export default function ManualPDFsPage() {
  const router = useRouter();
  const [pdfs, setPdfs] = useState<PDFFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [file, setFile] = useState<File | null>(null);

  const categories = ["general", "setup", "rules", "contact", "forms"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Only PDF files are allowed");
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", category);

    const token = typeof window !== "undefined" ? (localStorage.getItem("adminToken") || localStorage.getItem("token")) : null;

    try {
      const response = await fetch(`${API_BASE_URL}/manuals/pdfs/upload`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      if (response.ok) {
        toast.success("PDF uploaded successfully");
        setTitle("");
        setFile(null);
        fetchPDFs();
      } else {
        toast.error("Failed to upload PDF");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.error("Error uploading PDF");
    } finally {
      setUploading(false);
    }
  };

  const fetchPDFs = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/manuals/pdfs`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setPdfs(data.data);
      } else if (Array.isArray(data)) {
        setPdfs(data);
      }
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Toaster position="top-right" />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">PDF Documents</h1>
        <button
          onClick={() => router.push("/admin/exhibition/manuals")}
          className="inline-flex items-center px-3.5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Manuals
        </button>
      </div>
      
      {/* Upload Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-base font-bold text-gray-900 mb-4">Upload New PDF</h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Document Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. IndiaMET 2027 Full Exhibitor Manual"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00A1B1] focus:border-transparent outline-none bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">PDF File</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#003A77] hover:file:bg-blue-100 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="px-6 py-2 bg-gradient-to-r from-[#003A77] to-[#00A1B1] text-white rounded-lg text-sm font-semibold hover:opacity-95 disabled:opacity-50 transition cursor-pointer shadow-sm"
          >
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-900">Uploaded PDFs</h3>
        </div>
        {pdfs.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No PDF documents uploaded yet.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {pdfs.map((pdf) => (
              <div key={pdf.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <DocumentIcon className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{pdf.title}</p>
                    <p className="text-xs text-gray-400">{pdf.fileName} • {pdf.fileSize}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

