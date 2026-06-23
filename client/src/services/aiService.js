// aiService.js
// BASE_URL = 'http://localhost:5000/api'

/**
 * Generate a floor plan based on plot dimensions and preferences using AI.
 * @param {object} plotData { plotLength, plotWidth, floors, rooms, layoutStyle, notes }
 * @returns {Promise<object>} generated floor plan details and mock rendering
 */
export const generateFloorPlan = async (plotData) => {
  // apiService.post('/ai/generate-floor-plan', plotData)
  console.log('aiService.generateFloorPlan called with:', plotData);
  return { success: true };
};

/**
 * Get saved floor plans from the user's account.
 * @returns {Promise<array>} list of saved plans
 */
export const getSavedFloorPlans = async () => {
  // apiService.get('/ai/saved-plans')
  console.log('aiService.getSavedFloorPlans called');
  return [];
};

/**
 * Save a generated floor plan.
 * @param {object} planData
 * @returns {Promise<object>} response
 */
export const saveFloorPlan = async (planData) => {
  // apiService.post('/ai/save-plan', planData)
  console.log('aiService.saveFloorPlan called with:', planData);
  return { success: true };
};
