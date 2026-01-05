import React from 'react';
import SidebarItem from './SidebarItem';
import { FaHome, FaBookOpen, FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { IoMdSchool } from 'react-icons/io';

const SidebarMahasiswa = () => {
  const menuItems = [
    {
      label: 'Dashboard',
      to: '/dashboard',
      icon: FaHome,
      color: 'text-red-500',
    },
    {
      label: 'Profile',
      to: '/dashboard/profile',
      icon: IoMdSchool,
      color: 'text-yellow-500',
    },
    {
      label: 'Jadwal',
      to: '/dashboard/jadwal',
      icon: FaCalendarAlt,
      color: 'text-green-500',
    },
    {
      label: 'MataKuliah',
      to: '/dashboard/matakuliah',
      icon: FaBookOpen,
      color: 'text-blue-500',
    },
    {
      label: 'Absensi',
      to: '/dashboard/absensi',
      icon: MdOutlineDateRange,
      color: 'text-purple-500',
    },
  ];

  return (
    <div>
      {menuItems.map((item, index) => (
        <SidebarItem key={index} label={item.label} to={item.to} icon={item.icon} color={item.color} />
      ))}
    </div>
  );
};

export default SidebarMahasiswa;
