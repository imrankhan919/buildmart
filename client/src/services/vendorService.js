import apiClient from './apiClient.js';

export const getVendors = async () => {
  try {
    const response = await apiClient.get('/api/vendor/profiles');
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to load vendors.');
  }
};

export const getVendor = async (id) => {
  try {
    const response = await apiClient.get(`/api/vendor/profiles/${id}`);
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to load vendor.');
  }
};

export const getVendorData = async () => {
  try {
    const [productsRes, ordersRes] = await Promise.all([
      apiClient.get('/api/vendor/product'),
      apiClient.get('/api/vendor/orders'),
    ]);
    return { products: productsRes.data, orders: ordersRes.data };
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to load vendor dashboard.');
  }
};
