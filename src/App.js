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
import JadwalPage from './pages/Admin/jadwal/JadwalPage';
import { useAuth } from './context/AuthContext';
import MatkulPage from './pages/Admin/matkul/MatakuliahPage';
import KelasPage from './pages/Admin/DataKelas/KelasPage';
import KelasSiswa from './components/DashboardAdmin/KelasSiswa/KelasSiswa';
// dosen
import DosenRoutes from './router/DosenRoutes';
import DosenDashboard from './pages/Dosen/dashboard/DataboardPage';
import MatkulDosenPage from './pages/Dosen/matkul/MatakulDosenPage';
import KelasMahasiswaPage from './pages/Admin/KelasMahasiswa/KelasMahasiswaPage';
import ProfileDosenPage from './pages/Dosen/Profile/ProfileDosenPage';
import JadwalDosenPage from './pages/Dosen/jadwal/JadwalDosenPage';
// mahasiswa
import MahasiswaRoutes from './router/MahasiswaRoutes';
import DataBoardPage from './pages/Mahasiswa/dashboard/DataboardPage';
import ProfileMahasiswaPage from './pages/Mahasiswa/Profile/ProfileMahasiswaPage';
import JadwalSiswa from './components/DashboardSiswa/Jadwal/JadwalSiswa';
import JadwalMahasiswaPage from './pages/Mahasiswa/Jadwal/JadwalMahasiswaPage';
import MatakuliahPage from './pages/Mahasiswa/Matakuliah/MatakuliahPage';
import AbsensiMahasiswa from './components/DashboardSiswa/Absensi/AbsensiMahasiswa';
import AbsensiPage from './pages/Mahasiswa/Absensi/AbsensiPage';
function App() {
  const [IsOpen, setIsOpen] = useState(true);
  const { isAuthenticated, setIsAuthenticated, user, setUser, loading } = useAuth();
  useEffect(() => {
    const timer1 = setTimeout(() => setIsOpen(false), 1200);
  }, []);
  if (loading) {
    return (
      <div className={`fixed top-0 left-0 w-full h-screen bg-[#162542] z-50 flex items-center justify-center transition-all duration-1000 ease-in-out transform ${IsOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <LoadingPage color="#F3F4F6" />
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
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
          <Route path="matkul" element={<MatkulPage />} />
          <Route path="jadwal-matkul" element={<JadwalPage />} />
          <Route path="kelas" element={<KelasPage />} />
          <Route path="kelas-siswa" element={<KelasMahasiswaPage />} />
        </Route>
        <Route path="/dashboardDosen/*" element={isAuthenticated && user?.role === 'dosen' ? <DosenRoutes /> : <Navigate to="/" />}>
          <Route index element={<DosenDashboard />} />
          <Route path="jadwalSaya" element={<JadwalDosenPage />} />
          <Route path="MatkulSaya" element={<MatkulDosenPage />} />
          <Route path="ProfileSaya" element={<ProfileDosenPage />} />
        </Route>
        <Route path="/dashboard/*" element={isAuthenticated && user?.role === 'siswa' ? <MahasiswaRoutes /> : <Navigate to="/" />}>
          <Route index element={<DataBoardPage />} />
          <Route path="profile" element={<ProfileMahasiswaPage />} />
          <Route path="jadwal" element={<JadwalMahasiswaPage />} />
          <Route path="matakuliah" element={<MatakuliahPage />} />
          <Route path="absensi" element={<AbsensiPage />} />
        </Route>
        <Route path="/dashboardAsdos/*" element={isAuthenticated && user?.role === 'asdos' ? <Asdos setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
