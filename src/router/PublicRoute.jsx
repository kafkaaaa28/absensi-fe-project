import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleRedirect = {
  admin: '/dashboardAdmin',
  dosen: '/dashboardDosen',
  siswa: '/dashboard',
  asdos: '/dashboardAsisten',
};

export default function PublicRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated && user?.role) {
    return <Navigate to={roleRedirect[user.role] || '/'} replace />;
  }

  return children;
}
