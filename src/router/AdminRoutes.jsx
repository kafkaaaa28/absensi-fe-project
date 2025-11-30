import AdminLayout from '../layout/AdminLayout';
import { Outlet } from 'react-router-dom';

export default function AdminRoutes() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
