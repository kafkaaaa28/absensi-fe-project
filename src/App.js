import react, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './components/auth/login';
import Beranda from './components/Beranda';
import LoadingPage from './components/common/LoadingPage';
import { Toaster } from 'react-hot-toast';
// admin
import AdminRoutes from './router/AdminRoutes';
import AdminDashboard from './pages/Admin/dashboard/DataboardPage';
import MahasiswaPage from './pages/Admin/Mahasiswa/MahasiswaPage';
import JadwalPage from './pages/Admin/jadwal/JadwalPage';
import MatkulPage from './pages/Admin/matkul/MatakuliahPage';
import KelasPage from './pages/Admin/DataKelas/KelasPage';
import DosenPage from './pages/Admin/Dosen/DosenPage';
import KelasMahasiswaPage from './pages/Admin/KelasMahasiswa/KelasMahasiswaPage';
import AsdosPage from './pages/Admin/Asdos/AsdosPage';
// dosen
import DosenRoutes from './router/DosenRoutes';
import DosenDashboard from './pages/Dosen/dashboard/DataboardPage';
import MatkulDosenPage from './pages/Dosen/matkul/MatakulDosenPage';
import ProfileDosenPage from './pages/Dosen/Profile/ProfileDosenPage';
import JadwalDosenPage from './pages/Dosen/jadwal/JadwalDosenPage';
// mahasiswa
import MahasiswaRoutes from './router/MahasiswaRoutes';
import DataBoardPage from './pages/Mahasiswa/dashboard/DataboardPage';
import ProfileMahasiswaPage from './pages/Mahasiswa/Profile/ProfileMahasiswaPage';
import JadwalMahasiswaPage from './pages/Mahasiswa/Jadwal/JadwalMahasiswaPage';
import MatakuliahPage from './pages/Mahasiswa/Matakuliah/MatakuliahPage';
import AbsensiPage from './pages/Mahasiswa/Absensi/AbsensiPage';
import ErrorPage from './pages/error/ErrorPage';
import AsdosRoutes from './router/AsdosRoutes';
import DataBoardAsdos from './pages/asdos/Dashboard/DataBoardAsdos';
import ProfileAsisten from './pages/asdos/Profile/ProfileAsisten';
import KelasAsdosPage from './pages/asdos/KelasAsdos/KelasAsdosPage';
import JadwalAsdosPage from './pages/asdos/JadwalAsdos/JadwalAsdosPage';
function App() {
  const [showLoader, setShowLoader] = useState(true);
  const { isAuthenticated, user, loading } = useAuth();
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 900);

      return () => clearTimeout(timer);
    }
  }, [loading]);
  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#162542] flex items-center justify-center z-50">
        <LoadingPage color="#F3F4F6" />
      </div>
    );
  }
  return (
    <div className="overflow-hidden  ">
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/error" element={<ErrorPage />} />
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
              <Navigate to="/dashboardAsisten" />
            ) : (
              <Login />
            )
          }
        />

        <Route path="/dashboardAdmin/*" element={isAuthenticated && user?.role === 'admin' ? <AdminRoutes /> : <Navigate to="/" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="mahasiswa" element={<MahasiswaPage />} />
          <Route path="dosen" element={<DosenPage />} />
          <Route path="asdos" element={<AsdosPage />} />
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
        <Route path="/dashboardAsisten/*" element={isAuthenticated && user?.role === 'asdos' ? <AsdosRoutes /> : <Navigate to="/" />}>
          <Route index element={<DataBoardAsdos />} />
          <Route path="profile" element={<ProfileAsisten />} />
          <Route path="kelas" element={<KelasAsdosPage />} />
          <Route path="jadwal" element={<JadwalAsdosPage />} />
        </Route>
      </Routes>
      <div
        className={`
          fixed inset-0 z-50 flex items-center justify-center
          bg-[#162542]
          transition-transform duration-500 ease-in-out
          ${showLoader ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <LoadingPage color="#F3F4F6" />
      </div>
    </div>
  );
}

export default App;
