import { Route, Routes } from 'react-router-dom';
import MahasiswaLayout from '../layout/MahasiswaLayout';
import DataBoardPage from '../pages/Mahasiswa/dashboard/DataboardPage';
import ProfileMahasiswaPage from '../pages/Mahasiswa/Profile/ProfileMahasiswaPage';
import JadwalMahasiswaPage from '../pages/Mahasiswa/Jadwal/JadwalMahasiswaPage';
import MatakuliahPage from '../pages/Mahasiswa/Matakuliah/MatakuliahPage';
import AbsensiPage from '../pages/Mahasiswa/Absensi/AbsensiPage';

export default function MahasiswaRoutes() {
  return (
    <MahasiswaLayout>
      <Routes>
        <Route index element={<DataBoardPage />} />
        <Route path="profile" element={<ProfileMahasiswaPage />} />
        <Route path="jadwal" element={<JadwalMahasiswaPage />} />
        <Route path="matakuliah" element={<MatakuliahPage />} />
        <Route path="absensi" element={<AbsensiPage />} />
      </Routes>
    </MahasiswaLayout>
  );
}
