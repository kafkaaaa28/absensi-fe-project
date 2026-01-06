import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';
import AdminDashboard from '../pages/Admin/dashboard/DataboardPage';
import MahasiswaPage from '../pages/Admin/Mahasiswa/MahasiswaPage';
import DosenPage from '../pages/Admin/Dosen/DosenPage';
import AsdosPage from '../pages/Admin/Asdos/AsdosPage';
import MatkulPage from '../pages/Admin/matkul/MatakuliahPage';
import JadwalPage from '../pages/Admin/jadwal/JadwalPage';
import KelasPage from '../pages/Admin/DataKelas/KelasPage';
import KelasMahasiswaPage from '../pages/Admin/KelasMahasiswa/KelasMahasiswaPage';

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="mahasiswa" element={<MahasiswaPage />} />
        <Route path="dosen" element={<DosenPage />} />
        <Route path="asdos" element={<AsdosPage />} />
        <Route path="matkul" element={<MatkulPage />} />
        <Route path="jadwal-matkul" element={<JadwalPage />} />
        <Route path="kelas" element={<KelasPage />} />
        <Route path="kelas-siswa" element={<KelasMahasiswaPage />} />
      </Routes>
    </AdminLayout>
  );
}
