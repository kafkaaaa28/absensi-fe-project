import { useState } from 'react';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { TbLogout2 } from 'react-icons/tb';
import { useAuth } from '../../../context/AuthContext';
import appease from '../../img/univ.png';
import SidebarAdmin from './SidebarAdmin';
import SidebarAsisten from './SidebarAsisten';
import SidebarDosen from './SidebarDosen';
import SidebarMahasiswa from './SidebarMahasiswa';
import DropdownNavbar from '../DropdownNavbar';
import { RiLogoutBoxLine } from 'react-icons/ri';
export default function Sidebar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-r from-blue-800 to-blue-900 border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(!open)} className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors sm:hidden">
              {open ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>

            <div className="sm:hidden flex items-center gap-2">
              <img src={appease} className="w-8 h-8 rounded-full border-2 border-white/20" alt="Logo" />
              <div>
                <p className="text-white font-bold text-sm">Universitas Appease</p>
                <p className="text-white/70 text-xs capitalize">{user?.role || 'System'}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right mr-3">
              <p className="text-white text-sm font-medium">{user?.nama}</p>
              <p className="text-white/70 text-xs">{user?.email}</p>
            </div>
            <DropdownNavbar />
          </div>
        </div>
      </nav>

      {open && <div className="fixed inset-0 bg-black/50 z-40 sm:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={`fixed rounded-tr-[100px] top-0 left-0 z-50 w-64 h-screen bg-gradient-to-b from-blue-900 to-blue-800 border-r border-white/10 transition-transform duration-300 ease-in-out sm:translate-x-0
        ${open ? 'translate-x-0' : '-translate-x-full'} `}
      >
        <div className="p-5 border-b border-white/10">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3 border-2 border-white/20">
              <img src={appease} className="w-12 h-12 rounded-full" alt="Logo" />
            </div>
            <h2 className="text-white font-bold text-center">Universitas Appease</h2>
            <p className="text-white/70 text-xs text-center mt-1">Smart Absensi System</p>
          </div>
        </div>

        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">{user?.nama?.charAt(0) || 'U'}</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm truncate">{user?.nama}</p>
              <p className="text-white/70 text-xs truncate">{user?.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-white/10 text-white text-xs rounded-full capitalize">{user?.role}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {isAuthenticated && user?.role === 'admin' && <SidebarAdmin />}
            {isAuthenticated && user?.role === 'dosen' && <SidebarDosen />}
            {isAuthenticated && user?.role === 'siswa' && <SidebarMahasiswa />}
            {isAuthenticated && user?.role === 'asdos' && <SidebarAsisten />}
          </ul>
          <button onClick={logout} className="flex items-center p-2 w-full mt-auto text-white rounded-lg hover:bg-white/10">
            <TbLogout2 />
            <span className="ml-4 ">Keluar</span>
          </button>
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="text-center">
            <p className="text-white/50 text-xs">v1.0.0</p>
            <p className="text-white/50 text-xs mt-1">© 2024 Appease University</p>
          </div>
        </div>
      </aside>

      <div className="h-16 sm:hidden"></div>
    </>
  );
}
