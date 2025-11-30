import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../components/common/SidebarAdmin';
import Sidebar from '../components/common/Sidebar';
export default function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] ">
      <Sidebar />

      <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px]">
        <Outlet />
      </div>
    </div>
  );
}
