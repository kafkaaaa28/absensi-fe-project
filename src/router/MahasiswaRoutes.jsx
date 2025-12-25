import MahasiswaLayout from '../layout/MahasiswaLayout';
import { Outlet } from 'react-router-dom';

export default function AdminRoutes() {
  return (
    <MahasiswaLayout>
      <Outlet />
    </MahasiswaLayout>
  );
}
