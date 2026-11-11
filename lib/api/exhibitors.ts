// lib/api/exhibitors.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

let isRedirecting = false;

api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token =
                localStorage.getItem("adminToken") ||
                localStorage.getItem("admin_token") ||
                localStorage.getItem("token") ||
                localStorage.getItem("exhibitor_token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401 && typeof window !== "undefined" && !isRedirecting) {
            const token =
                localStorage.getItem("adminToken") ||
                localStorage.getItem("admin_token");

            if (!token) {
                isRedirecting = true;
                localStorage.removeItem("adminToken");
                localStorage.removeItem("admin_token");
                localStorage.removeItem("adminUser");
                localStorage.removeItem("admin_user");
                window.location.href = "/admin/login";
                setTimeout(() => { isRedirecting = false; }, 1000);
            }
        }
        return Promise.reject(error);
    }
);

// ============================================
// INTERFACES
// ============================================

export type ExhibitorStatus =
    | "pending"
    | "active"
    | "inactive"
    | "approved"
    | "rejected";

export interface StallDetails {
    hall?: string;
    pavilion?: string;
    size?: string;
    type?: string;
    openSides?: string;
    dimensions?: string;
    notes?: string;
    price?: string;
    stallCost?: number;
    gstPercent?: number;
    discount?: number;
    gstAmount?: number;
    finalAmount?: number;
    paymentPhases?: Array<{
        phase: number;
        label?: string;
        percent: number;
        amount: number;
        dueDate?: string;
        status?: 'pending' | 'paid' | 'overdue';
    }>;
}

export interface Exhibitor {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    sector?: string;
    booth?: string;
    boothNumber?: string;
    boothSize?: string;
    boothType?: string;
    boothOpenSides?: string;
    boothDimensions?: string;
    boothNotes?: string;
    boothPrice?: string;
    status: string;
    originalPassword?: string;
    stallCost?: number | string;
    gstPercent?: number | string;
    discount?: number | string;
    stallDetails?: StallDetails;
    address?: string;
    website?: string;
    createdAt: string;
    updatedAt?: string;
    lastLogin?: string;
}

export interface CreateExhibitorData {
    name: string;
    email: string;
    phone: string;
    company: string;
    sector?: string;
    boothNumber?: string;
    password?: string;
    status?: string;
    boothSize?: string;
    boothType?: string;
    boothOpenSides?: string;
    boothDimensions?: string;
    boothNotes?: string;
    boothPrice?: string;
    address?: string;
    website?: string;
    stallCost?: number | string;
    gstPercent?: number | string;
    discount?: number | string;
    paymentPhases?: any[];
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    message?: string;
    error?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
}

const mapExhibitorData = (data: any): Exhibitor => {
    let stallDetails = data.stallDetails || {};
    if (typeof stallDetails === "string") {
        try {
            stallDetails = JSON.parse(stallDetails);
        } catch {
            stallDetails = {};
        }
    }

    return {
        id: data.id || data._id || "",
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        company: data.company || "",
        sector: data.sector || "",
        booth: data.boothNumber || data.booth || "Not assigned",
        boothNumber: data.boothNumber || data.booth,
        boothSize: data.boothSize || stallDetails?.size || "",
        boothType: data.boothType || stallDetails?.type || "standard",
        boothOpenSides: data.boothOpenSides || stallDetails?.openSides || "",
        boothDimensions: data.boothDimensions || stallDetails?.dimensions || "",
        boothNotes: data.boothNotes || stallDetails?.notes || "",
        boothPrice: data.boothPrice || stallDetails?.price || "",
        status: data.status === "approved" ? "active" : (data.status || "pending"),
        originalPassword: data.originalPassword || data.metadata?.originalPassword,
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt,
        address: data.address,
        website: data.website,
        stallDetails: stallDetails,
    };
};

// ============================================
// EXHIBITORS API OBJECT (Diemex parity)
// ============================================

export const exhibitorsAPI = {
    getAll: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        sector?: string;
        status?: string;
    }): Promise<PaginatedResponse<Exhibitor>> => {
        try {
            const response = await api.get("/exhibitors", { params });
            const rawData = response.data?.data || response.data || [];
            const mappedData = Array.isArray(rawData) ? rawData.map(mapExhibitorData) : [];

            return {
                success: response.data?.success !== false,
                data: mappedData,
                pagination: response.data?.pagination || {
                    total: mappedData.length,
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                    totalPages: Math.ceil(mappedData.length / (params?.limit || 10)),
                },
            };
        } catch (error: any) {
            console.error("Error fetching exhibitors:", error);
            throw new Error(error.response?.data?.error || error.message || "Failed to fetch exhibitors");
        }
    },

    getById: async (id: string): Promise<ApiResponse<Exhibitor>> => {
        try {
            const response = await api.get(`/exhibitors/${id}`);
            const rawData = response.data?.data || response.data;
            return {
                success: response.data?.success !== false,
                data: mapExhibitorData(rawData),
            };
        } catch (error: any) {
            console.error("Error fetching exhibitor:", error);
            throw new Error(error.response?.data?.error || error.message || "Failed to fetch exhibitor");
        }
    },

    create: async (data: CreateExhibitorData): Promise<Exhibitor> => {
        try {
            const response = await api.post("/exhibitors", data);
            return mapExhibitorData(response.data?.data || response.data);
        } catch (error: any) {
            console.error("Error creating exhibitor:", error);
            throw new Error(error.response?.data?.error || error.message || "Failed to create exhibitor");
        }
    },

    update: async (id: string, data: Partial<CreateExhibitorData>): Promise<Exhibitor> => {
        try {
            const response = await api.put(`/exhibitors/${id}`, data);
            return mapExhibitorData(response.data?.data || response.data);
        } catch (error: any) {
            console.error("Error updating exhibitor:", error);
            throw new Error(error.response?.data?.error || error.message || "Failed to update exhibitor");
        }
    },

    delete: async (id: string): Promise<void> => {
        try {
            await api.delete(`/exhibitors/${id}`);
        } catch (error: any) {
            console.error("Error deleting exhibitor:", error);
            throw new Error(error.response?.data?.error || error.message || "Failed to delete exhibitor");
        }
    },

    resendCredentials: async (id: string): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await api.post(`/exhibitors/${id}/resend-credentials`);
            return response.data;
        } catch (error: any) {
            console.error("Error resending credentials:", error);
            throw new Error(error.response?.data?.error || error.message || "Failed to resend credentials");
        }
    },

    bulkUpdateStatus: async (ids: string[], status: string) => {
        const response = await api.post("/exhibitors/bulk/update-status", { ids, status });
        return response.data;
    },
};

// ============================================
// NAMED FUNCTION EXPORTS (Backward compatibility)
// ============================================

export async function getExhibitors(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sector?: string;
    status?: string;
}) {
    return exhibitorsAPI.getAll(params);
}

export async function getExhibitor(id: string): Promise<{ success: boolean; data: Exhibitor; error?: string }> {
    try {
        const res = await exhibitorsAPI.getById(id);
        return {
            success: true,
            data: res.data,
        };
    } catch (error: any) {
        return {
            success: false,
            data: {} as Exhibitor,
            error: error.message || "Failed to fetch exhibitor",
        };
    }
}

export async function getExhibitorById(id: string) {
    return exhibitorsAPI.getById(id);
}

export async function createExhibitor(data: CreateExhibitorData): Promise<{ success: boolean; data: Exhibitor; error?: string }> {
    try {
        const created = await exhibitorsAPI.create(data);
        return {
            success: true,
            data: created,
        };
    } catch (error: any) {
        return {
            success: false,
            data: {} as Exhibitor,
            error: error.message || "Failed to create exhibitor",
        };
    }
}

export async function updateExhibitor(id: string, data: Partial<CreateExhibitorData>): Promise<{ success: boolean; data: Exhibitor; error?: string }> {
    try {
        const updated = await exhibitorsAPI.update(id, data);
        return {
            success: true,
            data: updated,
        };
    } catch (error: any) {
        return {
            success: false,
            data: {} as Exhibitor,
            error: error.message || "Failed to update exhibitor",
        };
    }
}

export async function deleteExhibitor(id: string) {
    return exhibitorsAPI.delete(id);
}

export async function bulkUpdateStatus(ids: string[], status: string) {
    return exhibitorsAPI.bulkUpdateStatus(ids, status);
}

export async function resendCredentials(id: string): Promise<{ success: boolean; data?: any; error?: string; message?: string }> {
    try {
        const res = await exhibitorsAPI.resendCredentials(id);
        return {
            success: true,
            data: res,
            message: res?.message || "Credentials sent successfully",
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Failed to resend credentials",
        };
    }
}

export async function getExhibitorProducts(id: string) {
    const response = await api.get(`/exhibitors/${id}/products`);
    return response.data;
}

export async function getExhibitorBrands(id: string) {
    const response = await api.get(`/exhibitors/${id}/brands`);
    return response.data;
}

export async function getExhibitorBrochures(id: string) {
    const response = await api.get(`/exhibitors/${id}/brochures`);
    return response.data;
}

export const dashboardAPI = {
    getPayment: async () => {
        const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const baseUrl = rawUrl.replace(/\/api\/?$/, "");
        const token =
            (typeof window !== "undefined" && (
                localStorage.getItem("tyre_expo_token") ||
                localStorage.getItem("exhibitorToken") ||
                localStorage.getItem("exhibitor_token") ||
                localStorage.getItem("token")
            )) || "";
        const response = await axios.get(`${baseUrl}/api/exhibitorDashboard/payment`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.data.success) {
            throw new Error(response.data.error || "Failed to load stall payment");
        }
        return response.data.data;
    },

    confirmStallPayment: async (payload: { orderId?: string; phase?: number; paymentId?: string }) => {
        const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const baseUrl = rawUrl.replace(/\/api\/?$/, "");
        const token =
            (typeof window !== "undefined" && (
                localStorage.getItem("tyre_expo_token") ||
                localStorage.getItem("exhibitorToken") ||
                localStorage.getItem("exhibitor_token") ||
                localStorage.getItem("token")
            )) || "";
        const response = await axios.post(`${baseUrl}/api/exhibitorDashboard/confirm-stall-payment`, payload, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.data.success) {
            throw new Error(response.data.error || "Failed to record stall payment");
        }
        return response.data.data;
    },
};

