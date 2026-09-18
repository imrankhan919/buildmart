import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice.js';
import { getMe } from '../../services/authService.js';

function isTokenExpired(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (!payload.exp) return false;
    return payload.exp * 1000 < Date.now();
  } catch {
    return false;
  }
}

export default function AuthBootstrap({ children }) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = localStorage.getItem('user');
        if (!raw) return;
        const stored = JSON.parse(raw);
        if (!stored?.token) return;
        if (isTokenExpired(stored.token)) {
          localStorage.removeItem('user');
          dispatch(logoutUser());
          return;
        }
        try {
          await getMe();
        } catch {
          // Backend has no GET /api/auth/me (see README gap note).
          // Keep local session unless token is expired; 401s are handled by apiClient.
        }
      } catch {
        try {
          localStorage.removeItem('user');
        } catch {
          // ignore
        }
        dispatch(logoutUser());
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  void ready;
  return children;
}

AuthBootstrap.propTypes = {
  children: PropTypes.node.isRequired,
};
