function getApiBase() {
  const raw = (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api"
  ).replace(/\/$/, "");
  return raw.endsWith("/api") ? raw : `${raw}/api`;
}

function getAdminToken() {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem("adminToken") ||
    localStorage.getItem("admin_token") ||
    localStorage.getItem("token")
  );
}

export type ExtraRequirementItem = {
  id: string;
  type: string;
  quantity: number;
  description: string;
  specifications?: string;
  unitPrice?: number;
  totalPrice?: number;
};

export type ExtraRequirementPayment = {
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  status: string;
  paymentMethod?: string;
  paymentId?: string | null;
  orderId?: string | null;
  paidAt?: string | null;
  dueDate?: string;
  issueDate?: string;
};

export type ExtraRequirementRequest = {
  id: string;
  requirementId: string;
  exhibitorId: string;
  stallNumber?: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | string;
  submittedAt: string;
  updatedAt?: string;
  notes?: string;
  adminNotes?: string;
  items: ExtraRequirementItem[];
  totals?: {
    servicesTotal: number;
    gst: number;
    deposit: number;
    total: number;
  };
  payment?: ExtraRequirementPayment | null;
  metadata?: {
    boothArea?: string;
    boothLocation?: string;
    eventName?: string;
    eventDate?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
};

export type ExhibitorRequirementsSummary = {
  exhibitorId: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  stallNumber?: string;
  requestCount: number;
  paidCount: number;
  pendingCount: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  latestSubmittedAt: string;
};

async function adminFetch(path: string, init?: RequestInit) {
  const token = getAdminToken();
  if (!token) {
    throw new Error("unauthorized");
  }

  const response = await fetch(`${getApiBase()}${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });

  if (response.status === 401) {
    throw new Error("unauthorized");
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || payload.message || "Request failed");
  }

  return payload;
}

export async function fetchReceivedRequirements(params?: {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}): Promise<ExtraRequirementRequest[]> {
  const query = new URLSearchParams();
  query.set("page", String(params?.page || 1));
  query.set("limit", String(params?.limit || 1000));
  if (params?.status && params.status !== "all") query.set("status", params.status);
  if (params?.search) query.set("search", params.search);

  const payload = await adminFetch(`/extra-requirements/admin/all?${query.toString()}`);
  return payload.data || [];
}

export async function fetchReceivedRequirementById(id: string): Promise<ExtraRequirementRequest> {
  const payload = await adminFetch(`/extra-requirements/${id}`);
  return payload.data;
}

export async function updateReceivedRequirementStatus(
  id: string,
  body: { status: string; adminNotes?: string }
): Promise<ExtraRequirementRequest> {
  const payload = await adminFetch(`/extra-requirements/admin/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return payload.data;
}

export async function fetchExhibitorRequirementsSummary(): Promise<ExhibitorRequirementsSummary[]> {
  const payload = await adminFetch("/extra-requirements/admin/by-exhibitor");
  return payload.data || [];
}

export async function fetchExhibitorRequirements(exhibitorId: string): Promise<{
  exhibitor: {
    id: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    booth: string;
  };
  summary: {
    requestCount: number;
    itemCount: number;
    paidCount: number;
    pendingCount: number;
    totalAmount: number;
    paidAmount: number;
    pendingAmount: number;
  };
  requests: ExtraRequirementRequest[];
}> {
  const payload = await adminFetch(`/extra-requirements/admin/exhibitor/${exhibitorId}`);
  return payload.data;
}

