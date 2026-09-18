/* eslint-disable react-refresh/only-export-components */
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useToast } from './Toast.jsx';
import { useEffect, useRef } from 'react';

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useRequireAuth() {
  const { user } = useSelector((state) => state.auth);
  return user;
}

export function RoleGate({ children, check, fallbackPath = '/' }) {
  const toast = useToast();
  const warned = useRef(false);
  const { user } = useSelector((state) => state.auth);
  const failed = !check(user);
  useEffect(() => {
    if (failed && !warned.current) {
      warned.current = true;
      toast.error('You do not have permission to view that page.');
    }
  }, [failed, toast]);
  if (failed) return <Navigate to={fallbackPath} replace />;
  return children;
}

RoleGate.propTypes = {
  children: PropTypes.node.isRequired,
  check: PropTypes.func.isRequired,
  fallbackPath: PropTypes.string,
};
