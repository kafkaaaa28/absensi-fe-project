import AdminRoutes from './AdminRoutes';
import AsdosRoutes from './AsdosRoutes';
import DosenRoutes from './DosenRoutes';
import MahasiswaRoutes from './MahasiswaRoutes';
import { Route, Routes } from 'react-router-dom';
import Beranda from '../components/Beranda';
import Login from '../components/auth/login';
import { ProtectedRoute } from './ProtectedRoute';
import PublicRoute from './PublicRoute';
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Beranda />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboardAdmin/*"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboardDosen/*"
        element={
          <ProtectedRoute roles={['dosen']}>
            <DosenRoutes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute roles={['siswa']}>
            <MahasiswaRoutes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboardAsisten/*"
        element={
          <ProtectedRoute roles={['asdos']}>
            <AsdosRoutes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
