import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const authApi = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export interface LoginRequest {
  email: string;
  password: string;
  userType?: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  userType?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    user: {
      id: number;
      username: string;
      email: string;
      roles: string[];
    };
  };
}

export const authApiService = {
  // Email/Password Authentication
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await authApi.post('/login', data);
      if (response.data.success && response.data.data) {
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await authApi.post('/register', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Phone OTP Authentication
  sendOtp: async (phoneNumber: string): Promise<AuthResponse> => {
    try {
      const response = await authApi.post('/mobile-otp', { phoneNumber });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send OTP');
    }
  },

  verifyOtp: async (phoneNumber: string, otpCode: string): Promise<AuthResponse> => {
    try {
      const response = await authApi.post('/mobile-otp', { phoneNumber, otpCode });
      if (response.data.success && response.data.data) {
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'OTP verification failed');
    }
  },

  // Social Authentication
  googleLogin: async (token: string, userType?: string): Promise<AuthResponse> => {
    try {
      const response = await authApi.post('/google', { token, provider: 'google', userType });
      if (response.data.success && response.data.data) {
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Google login failed');
    }
  },

  facebookLogin: async (token: string, userType?: string): Promise<AuthResponse> => {
    try {
      const response = await authApi.post('/facebook', { token, provider: 'facebook', userType });
      if (response.data.success && response.data.data) {
        localStorage.setItem('authToken', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Facebook login failed');
    }
  },

  // Password Reset
  forgotPassword: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await authApi.post('/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Check if user is admin
  isAdmin: () => {
    const user = authApiService.getCurrentUser();
    return user?.roles?.includes('ROLE_ADMIN') || false;
  }
};

export { authApiService as authApi };

export { authApi }