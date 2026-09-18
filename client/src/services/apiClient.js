import axios from 'axios';
import store from '../features/store.js';
import { logoutUser } from '../features/auth/authSlice.js';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(
  (config) => {
    try {
      const state = store.getState();
      const tokenFromRedux = state?.auth?.user?.token;
      let token = tokenFromRedux;
      if (!token) {
        const raw = localStorage.getItem('user');
        if (raw) token = JSON.parse(raw)?.token;
      }
      if (token) config.headers.authorization = `Bearer ${token}`;
    } catch {
      // ignore storage parse errors; request goes out unauthenticated
    }
    return config;
  },
  (error) => Promise.reject(error),
);

function normalizeError(error) {
  const status = error?.response?.status;
  const message =
    error?.response?.data?.message || error?.message || 'Something went wrong. Please try again.';
  const normalized = new Error(message);
  normalized.status = status;
  normalized.original = error;
  return normalized;
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem('user');
        store.dispatch(logoutUser());
      } catch {
        // ignore
      }
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        const redirect = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = `/login?redirect=${redirect}`;
      }
    }
    return Promise.reject(normalizeError(error));
  },
);

export default apiClient;
