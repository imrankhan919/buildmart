// vendorService.js
// BASE_URL = 'http://localhost:5000/api'

/**
 * Get all vendors.
 * @returns {Promise<array>} list of vendors
 */
export const getVendors = async () => {
  // apiService.get('/vendors')
  console.log('vendorService.getVendors called');
  return [];
};

/**
 * Get vendor details by ID (including their products).
 * @param {string} id
 * @returns {Promise<object>} vendor details
 */
export const getVendorById = async (id) => {
  // apiService.get(`/vendors/${id}`)
  console.log('vendorService.getVendorById called for ID:', id);
  return null;
};

/**
 * Update vendor profile details.
 * @param {string} id
 * @param {object} data
 * @returns {Promise<object>} updated profile
 */
export const updateVendorProfile = async (id, data) => {
  // apiService.put(`/vendors/${id}`, data)
  console.log('vendorService.updateVendorProfile called for ID:', id, 'with:', data);
  return { success: true };
};
