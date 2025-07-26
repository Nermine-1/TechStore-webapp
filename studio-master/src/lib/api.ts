import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://techstore-webapp-1.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/users/register', { name, email, password });
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
  changePassword: async (email: string, currentPassword: string, newPassword: string) => {
    const response = await api.post('/users/change-password', { email, currentPassword, newPassword });
    return response.data;
  },
  updateName: async (email: string, name: string) => {
    const response = await api.post('/users/update-name', { email, name });
    return response.data;
  },
  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },
};

export const products = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

export const cart = {
  get: async (email?: string) => {
    const response = await api.get('/cart', { params: { email } });
    return response.data;
  },
  addProductToDb: async (email: string, product: { productId: string, name: string, price: number, quantity: number }) => {
    const response = await api.post('/cart/add', { email, product });
    return response.data;
  },
  clearDb: async (email: string) => {
    const response = await api.post('/cart/clear', { email });
    return response.data;
  },
  addItem: async (productId: string, quantity: number) => {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  },
  updateItem: async (productId: string, quantity: number) => {
    const response = await api.put(`/cart/${productId}`, { quantity });
    return response.data;
  },
  removeItem: async (productId: string) => {
    const response = await api.delete(`/cart/${productId}`);
    return response.data;
  },
  removeItemFromDb: async (email: string, productId: string) => {
    const response = await api.post('/cart/remove', { email, productId });
    return response.data;
  },
  updateItemInDb: async (email: string, productId: string, quantity: number) => {
    const response = await api.post('/cart/update', { email, productId, quantity });
    return response.data;
  },
};

export const orders = {
  create: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};

// Utility to decode JWT token (base64 decode, no verification)
export function decodeJWT(token: string): any {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default api;
