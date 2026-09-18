import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ProtectedRoute, { RoleGate } from './ProtectedRoute.jsx';

export default function RoleRoute({ children, role = 'admin', fallbackPath = '/' }) {
  const { user } = useSelector((state) => state.auth);
  const check = (u) => {
    if (!u) return false;
    if (role === 'admin') return Boolean(u.isAdmin);
    if (role === 'vendor') return Boolean(u.isVendor);
    return true;
  };
  void user;
  return (
    <ProtectedRoute>
      <RoleGate check={check} fallbackPath={fallbackPath}>
        {children}
      </RoleGate>
    </ProtectedRoute>
  );
}

RoleRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.oneOf(['admin', 'vendor']),
  fallbackPath: PropTypes.string,
};

export function AdminOnly({ children }) {
  return (
    <RoleRoute role="admin" fallbackPath="/">
      {children}
    </RoleRoute>
  );
}

AdminOnly.propTypes = {
  children: PropTypes.node.isRequired,
};

export function VendorOnly({ children }) {
  return (
    <RoleRoute role="vendor" fallbackPath="/profile">
      {children}
    </RoleRoute>
  );
}

VendorOnly.propTypes = {
  children: PropTypes.node.isRequired,
};

// Keep default import compat for callers expecting Navigate fallback
export { Navigate };
