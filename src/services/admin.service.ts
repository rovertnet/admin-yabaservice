import api from './api';

export interface DashboardStats {
  totalUsers: number;
  totalProviders: number;
  totalClients: number;
  totalServices: number;
  totalBookings: number;
  activeSubscriptions: number;
}

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
  phone?: string;
  city?: string;
  createdAt: string;
  _count: {
    services: number;
    bookings: number;
    providedBookings: number;
  };
}

export interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  city: string;
  createdAt: string;
  provider: {
    id: number;
    name: string;
    email: string;
  };
  _count?: {
    bookings: number;
  };
}

export const adminService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  getAllUsers: async (filters?: { role?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.role) params.append('role', filters.role);
    if (filters?.search) params.append('search', filters.search);
    
    const response = await api.get(`/admin/users?${params.toString()}`);
    return response.data;
  },

  getUserDetails: async (userId: number) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  getAllProviders: async () => {
    const response = await api.get('/admin/providers');
    return response.data;
  },

  getAllBookings: async (filters?: { status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    
    const response = await api.get(`/admin/bookings?${params.toString()}`);
    return response.data;
  },

  getAllSubscriptions: async (filters?: { status?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    
    const response = await api.get(`/admin/subscriptions?${params.toString()}`);
    return response.data;
  },

  getAllServices: async (filters?: { category?: string; city?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.city) params.append('city', filters.city);
    if (filters?.search) params.append('search', filters.search);
    
    const response = await api.get(`/admin/services?${params.toString()}`);
    return response.data;
  },

  // Analytics endpoints for charts
  getBookingsTimeline: async () => {
    const response = await api.get('/admin/analytics/bookings-timeline');
    return response.data;
  },

  getPopularServices: async () => {
    const response = await api.get('/admin/analytics/popular-services');
    return response.data;
  },

  getServicesByCategory: async () => {
    const response = await api.get('/admin/analytics/services-by-category');
    return response.data;
  },

  getUserRegistrations: async () => {
    const response = await api.get('/admin/analytics/user-registrations');
    return response.data;
  },
};
