import DosenLayout from '../layout/DosenLayout';
import { Outlet } from 'react-router-dom';

export default function DosenRoutes() {
  return (
    <DosenLayout>
      <Outlet />
    </DosenLayout>
  );
}
