import apiClient from './apiClient.js';

export const getUsers = async () => {
  try {
    const [users, vendors, products, orders, credits] = await Promise.all([
      apiClient.get('/api/admin/users'),
      apiClient.get('/api/admin/vendors'),
      apiClient.get('/api/admin/products'),
      apiClient.get('/api/admin/orders'),
      apiClient.get('/api/admin/credits'),
    ]);
    return {
      users: users.data,
      vendors: vendors.data,
      products: products.data,
      orders: orders.data,
      credits: credits.data,
    };
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to load admin data.');
  }
};

export const updateVendor = async (payload) => {
  try {
    const response = await apiClient.put(`/api/admin/vendors/${payload.vendor}`, {
      status: payload.status,
    });
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to update vendor.');
  }
};

export const updateUser = async (payload) => {
  try {
    const response = await apiClient.put(`/api/admin/users/${payload.uid}`, {});
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to update user.');
  }
};

export const updateCredits = async (payload) => {
  try {
    const response = await apiClient.put(`/api/admin/credits/${payload.rid}`, {
      isGranted: payload.status,
    });
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to update credits.');
  }
};
