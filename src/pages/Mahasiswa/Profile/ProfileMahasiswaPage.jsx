import React from 'react';
import ProfileUser from './components/ProfileUser';
import ProfileNavigate from './components/ProfileNavigate';
import ProfileInformasi from './components/ProfileInformasi';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaGraduationCap, FaIdCard, FaUniversity, FaUserEdit, FaLock, FaBookOpen, FaCalendarAlt, FaCog, FaClipboardList, FaCertificate, FaBell } from 'react-icons/fa';
import { infoAlert } from '../../../utils/alerts';
import LoadingPage from '../../../components/common/LoadingPage';

const ProfileMahasiswa = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const quickActions = [
    {
      icon: <FaUserEdit className="text-blue-500 text-2xl" />,
      title: 'Edit Profile',
      action: () => infoAlert('Mohon maaf fitur ini sedang diperbaiki'),
    },
    {
      icon: <FaLock className="text-yellow-500 text-2xl" />,
      title: 'Ubah Password',
      action: () => infoAlert('Mohon maaf fitur ini sedang diperbaiki'),
    },
    {
      icon: <FaBookOpen className="text-green-500 text-2xl" />,
      title: 'Mata Kuliah',
      action: () => navigate('/dashboard/matakuliah'),
    },
    {
      icon: <FaCalendarAlt className="text-purple-500 text-2xl" />,
      title: 'Jadwal',
      action: () => navigate('/dashboard/jadwal'),
    },
  ];

  const menuItems = [
    {
      icon: <FaEnvelope className="text-blue-500" />,
      title: 'Email',
      value: user.email,
      color: 'bg-blue-50',
    },
    {
      icon: <FaIdCard className="text-pink-500" />,
      title: 'Nim',
      value: user.nim,
      color: 'bg-blue-50',
    },
    {
      icon: <FaUniversity className="text-green-500" />,
      title: 'Fakultas',
      value: user.fakultas,
      color: 'bg-green-50',
    },
    {
      icon: <FaGraduationCap className="text-purple-500" />,
      title: 'Program Studi',
      value: user.prodi,
      color: 'bg-purple-50',
    },
    {
      icon: <FaCalendarAlt className="text-orange-500" />,
      title: 'Terdaftar Sejak',
      value: user.created_at
        ? new Date(user.created_at).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        : 'Tidak tersedia',
      color: 'bg-orange-50',
    },
  ];
  const additionalMenus = [
    {
      icon: <FaCog className="text-blue-500 text-xl" />,
      title: 'Pengaturan Akun',
      subtitle: 'Kelola preferensi akun',
    },

    {
      icon: <FaBell className="text-purple-500 text-xl" />,
      title: 'Notifikasi',
      subtitle: 'Atur pemberitahuan',
    },
  ];
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingPage color="#162542" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileUser user={user} />
      <div className="max-w-full mx-auto px-4 -mt-4 ">
        <ProfileNavigate quickActions={quickActions} />
        <ProfileInformasi infoAlert={infoAlert} additionalMenus={additionalMenus} menuItems={menuItems} />
      </div>
    </div>
  );
};

export default ProfileMahasiswa;
