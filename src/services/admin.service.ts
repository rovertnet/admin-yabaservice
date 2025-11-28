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
};
