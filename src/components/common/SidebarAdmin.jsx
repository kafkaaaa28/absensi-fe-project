import React from 'react';
import SidebarItem from './SidebarItem';
import { FaBars, FaHome, FaUserGraduate, FaChalkboardTeacher, FaBook, FaCalendarAlt } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { MdMeetingRoom, MdOutlineSupervisorAccount } from 'react-icons/md';
const SidebarAdmin = () => {
  const menuItems = [
    {
      label: 'Dashboard',
      to: '/dashboardAdmin',
      icon: FaHome,
      color: 'text-red-500',
    },
    {
      label: 'Data Mahasiswa',
      to: '/dashboardAdmin/mahasiswa',
      icon: FaUserGraduate,
      color: 'text-blue-500',
    },
    {
      label: 'Data Dosen',
      to: '/dashboardAdmin/dosen',
      icon: FaChalkboardTeacher,
      color: 'text-green-500',
    },
    {
      label: 'Data Asdos',
      to: '/dashboardAdmin/asdos',
      icon: MdOutlineSupervisorAccount,
      color: 'text-pink-500',
    },
    {
      label: 'Data MataKuliah',
      to: '/dashboardAdmin/matkul',
      icon: FaBook,
      color: 'text-purple-500',
    },
    {
      label: 'Jadwal MataKuliah',
      to: '/dashboardAdmin/jadwal-matkul',
      icon: FaCalendarAlt,
      color: 'text-yellow-500',
    },
    {
      label: 'Data Kelas',
      to: '/dashboardAdmin/kelas',
      icon: MdMeetingRoom,
      color: 'text-blue-500',
    },
    {
      label: 'Data Kelas Mahasiswa',
      to: '/dashboardAdmin/kelas-siswa',
      icon: MdMeetingRoom,
      color: 'text-emerald-400',
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

export default SidebarAdmin;
