import React from 'react';
import SidebarItem from './SidebarItem';
import { FaHome, FaBook, FaCalendarAlt } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';
import { MdMeetingRoom } from 'react-icons/md';
const SidebarAsisten = () => {
  const menuItems = [
    {
      label: 'Dashboard',
      to: '/dashboardAsisten',
      icon: FaHome,
      color: 'text-red-500',
    },
    {
      label: 'Profile',
      to: '/dashboardAsisten/profile',
      icon: IoMdSchool,
      color: 'text-yellow-500',
    },
    {
      label: 'Jadwal',
      to: '/dashboardAsisten/jadwal',
      icon: FaCalendarAlt,
      color: 'text-green-500',
    },
    {
      label: 'Kelas',
      to: '/dashboardAsisten/kelas',
      icon: MdMeetingRoom,
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

export default SidebarAsisten;
