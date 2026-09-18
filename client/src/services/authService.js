import apiClient from './apiClient.js';

export const login = async (data) => {
  try {
    const response = await apiClient.post('/api/auth/login', data);
    try {
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch {
      // ignore storage errors
    }
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Login failed. Please try again.');
  }
};

export const register = async (data) => {
  try {
    const response = await apiClient.post('/api/auth/register', data);
    try {
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch {
      // ignore storage errors
    }
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Registration failed. Please try again.');
  }
};

// NOTE: backend has no GET /api/auth/me (authRoutes only exposes
// POST /register, POST /login, POST /private). This attempts the documented
// endpoint first and falls back to the locally stored session so the app boot
// check does not break the contract. Add a real /me route server-side to
// fully verify sessions.
export const getMe = async () => {
  try {
    const response = await apiClient.get('/api/auth/me');
    return response.data;
  } catch (error) {
    if (error?.status === 404) {
      try {
        const raw = localStorage.getItem('user');
        if (raw) return JSON.parse(raw);
      } catch {
        // fall through to rethrow
      }
    }
    throw error instanceof Error ? error : new Error('Session validation failed.');
  }
};
