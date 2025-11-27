import axiosInstance from './axios';

export const authAPI = {
  register: (email: string, password: string) =>
    axiosInstance.post('/auth/register', { email, password }),

  sendOTP: (email: string) =>
    axiosInstance.post('/auth/send-otp', { email }),

  verifyOTP: (email: string, otpCode: string) =>
    axiosInstance.post('/auth/verify-otp', { email, otpCode }),

  login: (email: string, password: string) =>
    axiosInstance.post('/auth/login', { email, password }),

  logout: () =>
    axiosInstance.post('/auth/logout'),

  refresh: () =>
    axiosInstance.post('/auth/refresh'),
};

export const usersAPI = {
  getMe: () =>
    axiosInstance.get('/users/me'),

  updateProfile: (data: { name: string; surname: string; phone: string }) =>
    axiosInstance.put('/users/update-profile', data),

  getAllUsers: () =>
    axiosInstance.get('/users/all'),

  getUserById: (id: string) =>
    axiosInstance.get(`/users/${id}`),

  toggleBlock: (id: string) =>
    axiosInstance.post(`/users/${id}/toggle-block`),
};

export const contactsAPI = {
  create: (data: { name: string; email: string; message: string; phone?: string }) =>
    axiosInstance.post('/contacts', data),

  createAuthenticated: (data: { name: string; email: string; message: string; phone?: string }) =>
    axiosInstance.post('/contacts/authenticated', data),

  getAll: () => axiosInstance.get('/contacts'),

  getUnreadCount: () => axiosInstance.get('/contacts/unread-count'),

  getById: (id: string) => axiosInstance.get(`/contacts/${id}`),

  markAsRead: (id: string) => axiosInstance.patch(`/contacts/${id}/mark-read`),
};

export const donationsAPI = {
  create: (data: { amount: number; treeCount: number; anonymous: boolean }) =>
    axiosInstance.post('/donations', data),

  getTopContributors: () => axiosInstance.get('/donations/top-contributors'),

  getAll: () => axiosInstance.get('/donations/all'),

  getAllGrouped: () => axiosInstance.get('/donations/all-grouped'),

  getMyTotal: () => axiosInstance.get('/donations/my-total'),
};

