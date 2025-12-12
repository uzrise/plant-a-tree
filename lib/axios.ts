import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname;
      const pathSegments = pathname.split('/').filter(Boolean);
      const locale = pathSegments[0] || 
                     document.documentElement.lang || 
                     localStorage.getItem('locale') || 
                     'uz';
      
      const languageMap = {
        'uz': 'uz',
        'en': 'en',
        'ru': 'ru',
      };
      
      const acceptLanguage = languageMap[locale] || 'uz';
      config.headers['Accept-Language'] = acceptLanguage;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status >= 500) {
      console.error('Internal Server Error:', {
        url: originalRequest?.url,
        status: error.response.status,
        data: error.response.data,
        message: error.message,
      });
    }

    const authEndpoints = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/send-otp', '/auth/verify-otp'];
    const isAuthEndpoint = authEndpoints.some(endpoint => originalRequest?.url?.includes(endpoint));

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post('/auth/refresh');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        originalRequest._retry = false;
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

