import apiClient from './apiClient.js';

export const getAllProducts = async () => {
  try {
    const response = await apiClient.get('/api/products');
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to load products.');
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await apiClient.get(`/api/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to load product.');
  }
};
