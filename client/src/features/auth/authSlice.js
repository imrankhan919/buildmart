import { createSlice } from '@reduxjs/toolkit';

function readStoredUser() {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const initialState = {
  user: readStoredUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser(state, action) {
      state.user = action.payload;
    },
    loginUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      try {
        localStorage.removeItem('user');
      } catch {
        // ignore storage errors
      }
    },
    refreshUser(state, action) {
      state.user = { ...(state.user || {}), ...action.payload };
      try {
        localStorage.setItem('user', JSON.stringify(state.user));
      } catch {
        // ignore storage errors
      }
    },
  },
});

export const { registerUser, loginUser, logoutUser, refreshUser } = authSlice.actions;

export default authSlice.reducer;
