import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar/Sidebar';
export default function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] ">
      <Sidebar />

      <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px] pb-8 mt-5 sm:mt-20">
        <Outlet />
      </div>
    </div>
  );
}
