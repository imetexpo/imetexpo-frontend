import axios from "axios";

const rawApiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
const API_BASE_URL = rawApiUrl.endsWith("/api") ? rawApiUrl : `${rawApiUrl}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("admin_token") ||
      localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface RentalItem {
  id: string;
  itemKey: string;
  description: string;
  costFor3Days: number;
  category: "AV" | "IT" | "Other";
  isActive: boolean;
  imageUrl: string | null;
  cloudinaryPublicId?: string | null;
  displayOrder: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRentalItemData {
  itemKey: string;
  description: string;
  costFor3Days: number;
  category: "AV" | "IT" | "Other";
  isActive: boolean;
  displayOrder?: number;
}

export async function getRentalItems(params?: {
  category?: string;
  isActive?: boolean;
  search?: string;
}) {
  const response = await api.get("/admin/rental-items", { params });
  return response.data;
}

export async function getRentalItemById(id: string) {
  const response = await api.get(`/admin/rental-items/${id}`);
  return response.data;
}

export async function createRentalItem(data: CreateRentalItemData, imageFile?: File) {
  const formData = new FormData();
  formData.append("itemKey", data.itemKey);
  formData.append("description", data.description);
  formData.append("costFor3Days", data.costFor3Days.toString());
  formData.append("category", data.category);
  formData.append("isActive", data.isActive.toString());
  if (data.displayOrder !== undefined && data.displayOrder > 0) {
    formData.append("displayOrder", data.displayOrder.toString());
  }
  if (imageFile) formData.append("image", imageFile);

  const response = await api.post("/admin/rental-items", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function updateRentalItem(
  id: string,
  data: Partial<CreateRentalItemData>,
  imageFile?: File
) {
  const formData = new FormData();
  if (data.itemKey !== undefined) formData.append("itemKey", data.itemKey);
  if (data.description !== undefined) formData.append("description", data.description);
  if (data.costFor3Days !== undefined) formData.append("costFor3Days", data.costFor3Days.toString());
  if (data.category !== undefined) formData.append("category", data.category);
  if (data.isActive !== undefined) formData.append("isActive", data.isActive.toString());
  if (data.displayOrder !== undefined) formData.append("displayOrder", data.displayOrder.toString());
  if (imageFile) formData.append("image", imageFile);

  const response = await api.put(`/admin/rental-items/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function deleteRentalItem(id: string) {
  const response = await api.delete(`/admin/rental-items/${id}`);
  return response.data;
}

export async function updateRentalItemStatus(id: string, isActive: boolean) {
  const response = await api.patch(`/admin/rental-items/${id}/toggle-status`, { isActive });
  return response.data;
}
