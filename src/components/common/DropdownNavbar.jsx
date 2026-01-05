import React, { useState } from 'react';
import { FaUser, FaSignOutAlt, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from 'flowbite-react';
const DropdownNavbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleProfileNavigate = () => {
    const roleRoutes = {
      dosen: '/dashboardDosen/ProfileSaya',
      siswa: '/dashboard/profile',
      asdos: '/dashboardAsisten/profile',
    };
    navigate(roleRoutes[user?.role] || '/');
  };

  const getRoleLabel = (role) => {
    const labels = {
      dosen: 'Dosen',
      siswa: 'Mahasiswa',
      asdos: 'Asisten Dosen',
      admin: 'Administrator',
    };
    return labels[role] || 'User';
  };

  return (
    <Dropdown
      label={
        <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
            <FaUser className="w-5 h-5 text-blue-300" />
          </div>
          <span className="text-sm font-medium">{user?.nama?.split(' ')[0] || 'User'}</span>
          <FaChevronDown />
        </div>
      }
      arrowIcon={false}
      inline
      className="!bg-transparent !border-0 !p-0"
    >
      <DropdownHeader className="px-4 py-3 border-b bg-white border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FaUserCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 truncate">{user?.nama || 'User'}</p>
            <p className="text-xs text-gray-500">{getRoleLabel(user?.role)}</p>
          </div>
        </div>
      </DropdownHeader>

      {(user?.role === 'dosen' || user?.role === 'siswa' || user?.role === 'asdos') && (
        <DropdownItem onClick={handleProfileNavigate} className="flex bg-white items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
          <FaUserCircle className="w-4 h-4 text-gray-500" />
          <span>Lihat Profile</span>
        </DropdownItem>
      )}

      <DropdownItem onClick={logout} className="flex  bg-white items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
        <FaSignOutAlt className="w-4 h-4" />
        <span>Keluar</span>
      </DropdownItem>

      {/* <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-500">
          ID: <span className="font-mono">{user?.id?.slice(-6) || '------'}</span>
        </p>
      </div> */}
    </Dropdown>
  );
};

export default DropdownNavbar;
