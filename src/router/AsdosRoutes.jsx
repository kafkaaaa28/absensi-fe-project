import AsdosLayout from '../layout/AsdosLayout';
import { Route, Routes } from 'react-router-dom';
import DataBoardAsdos from '../pages/asdos/Dashboard/DataBoardAsdos';
import ProfileAsisten from '../pages/asdos/Profile/ProfileAsisten';
import KelasAsdosPage from '../pages/asdos/KelasAsdos/KelasAsdosPage';
import JadwalAsdosPage from '../pages/asdos/JadwalAsdos/JadwalAsdosPage';
export default function AsdosRoutes() {
  return (
    <AsdosLayout>
      <Routes>
        <Route index element={<DataBoardAsdos />} />
        <Route path="profile" element={<ProfileAsisten />} />
        <Route path="kelas" element={<KelasAsdosPage />} />
        <Route path="jadwal" element={<JadwalAsdosPage />} />
      </Routes>
    </AsdosLayout>
  );
}
