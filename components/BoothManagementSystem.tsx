"use client";

import { useRef, useState, useEffect } from "react";
import {
  Download,
  Loader2,
  Upload,
  RefreshCw,
  Image as ImageIcon,
  Trash2,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Eye,
  Save,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { boothsAPI } from "@/lib/api/boothsAPI";

export default function FloorPlanViewer() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [baseImage, setBaseImage] = useState<string | null>(null);
  const [imageId, setImageId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Load existing floor plan on mount
  useEffect(() => {
    loadFloorPlan();
  }, []);

  // Load floor plan from API
  const loadFloorPlan = async () => {
    setIsLoading(true);
    try {
      const result = await boothsAPI.getFloorPlan();

      if (result.success && result.data?.baseImageUrl) {
        setBaseImage(result.data.baseImageUrl);
        setImageId(result.data.id || null);
        toast.success("Floor plan loaded");
      }
    } catch (error) {
      console.error("Error loading floor plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Uploading floor plan...");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const result = await boothsAPI.uploadImage(formData);

      if (result.success && result.data) {
        setBaseImage(result.data.baseImageUrl);
        setImageId(result.data.id || null);
        setZoom(1);
        toast.success("Floor plan uploaded successfully!", { id: toastId });
      } else {
        toast.error(result.error || "Upload failed", { id: toastId });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image", { id: toastId });
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Save floor plan
  const saveFloorPlan = async () => {
    try {
      const toastId = toast.loading("Saving floor plan...");

      const result = await boothsAPI.saveFloorPlan({
        baseImageUrl: baseImage,
      });

      if (result.success) {
        toast.success("Floor plan saved successfully!", { id: toastId });
      } else {
        toast.error(result.error || "Failed to save floor plan", { id: toastId });
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save floor plan");
    }
  };

  // Delete floor plan
  const deleteFloorPlan = async () => {
    if (!confirm("Are you sure you want to delete this floor plan?")) return;

    setIsLoading(true);
    try {
      const result = await boothsAPI.reset();

      if (result.success) {
        setBaseImage(null);
        setImageId(null);
        setZoom(1);
        toast.success("Floor plan deleted");
      } else {
        toast.error(result.error || "Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete floor plan");
    } finally {
      setIsLoading(false);
    }
  };

  // Download / View image
  const downloadImage = () => {
    if (!baseImage) return;

    const link = document.createElement("a");
    link.href = baseImage;
    link.download = `floor-plan-${Date.now()}.png`;
    link.target = "_blank";
    link.click();
    toast.success("Opening floor plan image");
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Zoom in
  const zoomIn = () => {
    setZoom((z) => Math.min(z + 0.25, 3));
  };

  // Zoom out
  const zoomOut = () => {
    setZoom((z) => Math.max(z - 0.25, 0.5));
  };

  // Reset zoom
  const resetZoom = () => {
    setZoom(1);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] min-h-[650px] bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-800">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#003A77] text-white p-2.5 rounded-xl shadow-md">
              <ImageIcon size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">Floor Plan Manager</h1>
              <p className="text-xs text-gray-400 mt-0.5">Upload, view, and manage your exhibition floor plans</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="px-4 py-2 bg-[#003A77] hover:bg-[#002B59] text-white rounded-lg flex items-center gap-2 text-sm font-medium disabled:opacity-50 transition cursor-pointer shadow-sm"
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Upload size={16} />
              )}
              Upload
            </button>

            {baseImage && (
              <>
                <button
                  onClick={downloadImage}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-2 text-sm font-medium transition cursor-pointer shadow-sm"
                >
                  <Eye size={16} />
                  View
                </button>

                <button
                  onClick={deleteFloorPlan}
                  disabled={isLoading}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg flex items-center gap-2 text-sm font-medium disabled:opacity-50 transition cursor-pointer shadow-sm"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

                <button
                  onClick={saveFloorPlan}
                  className="px-4 py-2 bg-[#00A1B1] hover:bg-[#008896] text-white rounded-lg flex items-center gap-2 text-sm font-semibold transition cursor-pointer shadow-sm"
                >
                  <Save size={16} />
                  Save Floor Plan
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden bg-gray-900 relative">
        <div
          ref={containerRef}
          className="flex-1 relative flex items-center justify-center p-4 overflow-hidden"
        >
          {!baseImage ? (
            <div className="text-center p-6">
              <div className="bg-gray-800/80 p-12 rounded-2xl border-2 border-dashed border-gray-700 max-w-md mx-auto">
                <ImageIcon size={64} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-lg font-bold text-white mb-1">No Floor Plan</h3>
                <p className="text-gray-400 text-xs mb-6">Upload an image of the exhibition layout to get started</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-2.5 bg-[#003A77] hover:bg-[#002B59] text-white rounded-lg text-sm font-semibold transition cursor-pointer shadow-md"
                >
                  Choose Image
                </button>
              </div>
            </div>
          ) : (
            <div className="relative flex flex-col items-center w-full h-full">
              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 z-10 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl flex items-center gap-1 p-1 border border-gray-700">
                <button
                  onClick={zoomOut}
                  disabled={zoom <= 0.5}
                  className="p-2 hover:bg-gray-700 rounded text-gray-300 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent transition cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                <span className="px-3 py-1 text-xs text-white font-semibold">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  disabled={zoom >= 3}
                  className="p-2 hover:bg-gray-700 rounded text-gray-300 hover:text-white disabled:opacity-50 disabled:hover:bg-transparent transition cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  onClick={resetZoom}
                  className="px-2.5 py-1 hover:bg-gray-700 rounded text-xs text-gray-300 hover:text-white transition ml-1 border-l border-gray-700 cursor-pointer"
                  title="Reset Zoom"
                >
                  Reset
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 hover:bg-gray-700 rounded text-gray-300 hover:text-white transition cursor-pointer"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
              </div>

              {/* Image Container */}
              <div className="flex-1 flex items-center justify-center w-full h-full overflow-auto p-4">
                <div className="relative inline-block">
                  <img
                    ref={imageRef}
                    src={baseImage}
                    alt="Floor Plan"
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: "center",
                      transition: "transform 0.2s ease",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                    className="rounded-lg shadow-2xl block"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 px-6 py-3">
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${baseImage ? "bg-emerald-500 animate-pulse" : "bg-gray-500"
                }`}
            />
            {baseImage ? "Image Loaded" : "No Image"}
          </span>
        </div>
      </footer>
    </div>
  );
}

