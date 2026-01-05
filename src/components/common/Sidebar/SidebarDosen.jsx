import React from 'react';
import SidebarItem from './SidebarItem';
import { FaHome, FaBook, FaCalendarAlt } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';

const SidebarDosen = () => {
  const menuItems = [
    {
      label: 'Dashboard',
      to: '/dashboardDosen',
      icon: FaHome,
      color: 'text-red-500',
    },
    {
      label: 'Profile',
      to: '/dashboardDosen/ProfileSaya',
      icon: IoMdSchool,
      color: 'text-yellow-500',
    },
    {
      label: 'Jadwal',
      to: '/dashboardDosen/jadwalSaya',
      icon: FaCalendarAlt,
      color: 'text-green-500',
    },
    {
      label: 'MataKuliah',
      to: '/dashboardDosen/MatkulSaya',
      icon: FaBook,
      color: 'text-yellow-500',
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

export default SidebarDosen;
