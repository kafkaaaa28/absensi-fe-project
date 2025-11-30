import logo from './logo.svg';
import react, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import api from './utils/api';
import DosenPage from './pages/Admin/Dosen/DosenPage';
// admin
import AdminRoutes from './router/AdminRoutes';
import AdminDashboard from './pages/Admin/dashboard/DataboardPage';
import MahasiswaPage from './pages/Admin/Mahasiswa/MahasiswaPage';
import DataAsdos from './components/DashboardAdmin/Asdos/DataAsdos';
import Dosen from './components/DashboardDosen/Dosen';
import Mahasiswa from './components/DashboardSiswa/Mahasiswa';
import Asdos from './components/DashboardAsdos/Asdos';
import Beranda from './components/Beranda';
import LoadingPage from './components/common/LoadingPage';
import Jadwal from './components/DashboardAdmin/jadwal/Jadwal';
import { useAuth } from './context/AuthContext';
import Matkul from './components/DashboardAdmin/Matkul/Matkul';
import Kelas from './components/DashboardAdmin/Kelas/Kelas';
import KelasSiswa from './components/DashboardAdmin/KelasSiswa/KelasSiswa';
function App() {
  const [IsOpen, setIsOpen] = useState(true);
  const { isAuthenticated, setIsAuthenticated, user, setUser, loading } = useAuth();
  useEffect(() => {
    const timer1 = setTimeout(() => setIsOpen(false), 1200);
  }, []);

  return (
    <div className="overflow-hidden">
      {loading ? (
        <div className={`fixed top-0 left-0 w-full h-screen bg-[#162542] z-50 flex items-center justify-center transition-all duration-1000 ease-in-out transform ${IsOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <LoadingPage color="#F3F4F6" />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route
            path="/login"
            element={
              isAuthenticated && user?.role === 'admin' ? (
                <Navigate to="/dashboardAdmin" />
              ) : isAuthenticated && user?.role === 'dosen' ? (
                <Navigate to="/dashboardDosen" />
              ) : isAuthenticated && user?.role === 'siswa' ? (
                <Navigate to="/dashboard" />
              ) : isAuthenticated && user?.role === 'asdos' ? (
                <Navigate to="/dashboardAsdos" />
              ) : (
                <Login />
              )
            }
          />

          <Route path="/dashboardAdmin/*" element={isAuthenticated && user?.role === 'admin' ? <AdminRoutes /> : <Navigate to="/" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="mahasiswa" element={<MahasiswaPage />} />
            <Route path="dosen" element={<DosenPage />} />
            <Route path="asdos" element={<DataAsdos />} />
            <Route path="matkul" element={<Matkul />} />
            <Route path="jadwal-matkul" element={<Jadwal />} />
            <Route path="kelas" element={<Kelas />} />
            <Route path="kelas-siswa" element={<KelasSiswa />} />
          </Route>
          <Route path="/dashboardDosen/*" element={isAuthenticated && user?.role === 'dosen' ? <Dosen setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/dashboardAsdos/*" element={isAuthenticated && user?.role === 'asdos' ? <Asdos setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/dashboard/*" element={isAuthenticated && user?.role === 'siswa' ? <Mahasiswa setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
