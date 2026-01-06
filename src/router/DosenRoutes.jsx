import { Route, Routes } from 'react-router-dom';
import DosenLayout from '../layout/DosenLayout';
import DosenDashboard from '../pages/Dosen/dashboard/DataboardPage';
import JadwalDosenPage from '../pages/Dosen/jadwal/JadwalDosenPage';
import MatkulDosenPage from '../pages/Dosen/matkul/MatakulDosenPage';
import ProfileDosenPage from '../pages/Dosen/Profile/ProfileDosenPage';

export default function DosenRoutes() {
  return (
    <DosenLayout>
      <Routes>
        <Route index element={<DosenDashboard />} />
        <Route path="jadwalSaya" element={<JadwalDosenPage />} />
        <Route path="MatkulSaya" element={<MatkulDosenPage />} />
        <Route path="ProfileSaya" element={<ProfileDosenPage />} />
      </Routes>
    </DosenLayout>
  );
}
