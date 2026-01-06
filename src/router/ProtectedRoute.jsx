import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const roleRedirect = {
  admin: '/dashboardAdmin',
  dosen: '/dashboardDosen',
  siswa: '/dashboard',
  asdos: '/dashboardAsisten',
};
export const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated || !user) return <Navigate to="/" replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={roleRedirect[user.role] || '/'} replace />;
  }

  return children;
};
