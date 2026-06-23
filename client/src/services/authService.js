// authService.js
// BASE_URL = 'http://localhost:5000/api'

/**
 * Log in a user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} response data
 */
export const loginUser = async (email, password) => {
  // apiService.post('/auth/login', { email, password })
  // For now, this is a placeholder UI only.
  console.log('authService.loginUser called with:', email, password);
  return { success: true, token: 'mock-jwt-token', user: { email, role: 'buyer' } };
};

/**
 * Register a new user.
 * @param {object} data
 * @returns {Promise<object>} response data
 */
export const registerUser = async (data) => {
  // apiService.post('/auth/register', data)
  console.log('authService.registerUser called with:', data);
  return { success: true, user: data };
};

/**
 * Get current user details from token.
 * @param {string} token
 * @returns {Promise<object>} response data
 */
export const getMe = async (token) => {
  // apiService.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
  console.log('authService.getMe called with token:', token);
  return { success: true, user: { email: 'user@example.com', role: 'buyer' } };
};
