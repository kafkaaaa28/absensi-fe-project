import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaBookOpen, FaCalendarAlt } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';
import { MdOutlineDateRange } from 'react-icons/md';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';
import appease from '../img/univ.png';
import SidebarAdmin from './SidebarAdmin';
export default function Sidebar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex justify-end sm:hidden">
        <button onClick={() => setOpen(!open)} className="p-2 mt-2 text-2xl text-gray-500 hover:bg-gray-700 hover:text-white rounded-lg">
          <FaBars />
        </button>
      </div>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-[#162542] transition-transform sm:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full px-4 py-6">
          <div className="flex flex-col items-center mb-5">
            <img src={appease} className="w-14 h-14 rounded-full" alt="Logo" />
            <p className="text-white font-bold uppercase mt-2">Universitas Appease</p>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center">
              <IoMdSchool className="text-2xl" />
            </div>
            <p className="text-white font-bold mt-2">{user?.nama}</p>
            <p className="text-gray-300">{user?.email}</p>
          </div>

          <ul className="flex-1 space-y-2">
            <li>{isAuthenticated && user?.role === 'admin' && <SidebarAdmin />}</li>
          </ul>

          <button onClick={logout} className="flex items-center p-2 w-full mt-auto text-white bg-black rounded-lg hover:bg-gray-700">
            <RiLogoutBoxLine />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
