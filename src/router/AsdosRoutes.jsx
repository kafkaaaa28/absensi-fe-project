import AsdosLayout from '../layout/AsdosLayout';
import { Outlet } from 'react-router-dom';

export default function AsdosRoutes() {
  return (
    <AsdosLayout>
      <Outlet />
    </AsdosLayout>
  );
}
