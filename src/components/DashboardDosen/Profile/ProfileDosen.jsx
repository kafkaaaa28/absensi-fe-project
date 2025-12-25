import React from 'react';
import { FaEnvelope, FaGraduationCap, FaCalendarAlt, FaUniversity, FaEdit, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdSchool, IoIosArrowForward } from 'react-icons/io';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const ProfileDosen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <FaEnvelope className="text-blue-500" />,
      title: 'Email',
      value: user.email,
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

  const quickActions = [
    { icon: '📝', title: 'Edit Profile', action: () => console.log('Edit profile') },
    { icon: '🔒', title: 'Ubah Password', action: () => console.log('Ubah password') },
    { icon: '📚', title: 'Mata Kuliah', action: () => navigate('/dashboardDosen/MatkulSaya') },
    { icon: '📊', title: 'Jadwal Mengajar', action: () => navigate('/dashboardDosen/jadwalSaya') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="bg-gradient-to-r from-[#162542] to-[#2D4A8A] text-white pt-8 pb-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all">
              <FaEdit className="text-white" />
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                  <IoMdSchool className="text-4xl text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">{user.nama}</h2>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm">{user.role}</div>
                <p className="text-white/80 text-sm mt-2">Dosen Berprestasi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 -mt-4 ">
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((item, index) => (
              <button key={index} onClick={item.action} className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-all">
                <span className="text-2xl mb-2">{item.icon}</span>
                <span className="text-xs text-gray-600 text-center">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-4 ">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-full lg:w-[50%]">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">Informasi Profile</h3>
            </div>

            <div className="divide-y divide-gray-100">
              {menuItems.map((item, index) => (
                <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>{item.icon}</div>
                      <div>
                        <p className="text-sm text-gray-500">{item.title}</p>
                        <p className="text-gray-800 font-medium">{item.value}</p>
                      </div>
                    </div>
                    <IoIosArrowForward className="text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm mt-6 lg:mt-0 overflow-hidden w-full lg:w-[50%]">
            <div className="divide-y divide-gray-100">
              {[
                { icon: '⚙️', title: 'Pengaturan Akun', subtitle: 'Kelola preferensi akun' },
                { icon: '📋', title: 'Riwayat Mengajar', subtitle: 'Lihat history mengajar' },
                { icon: '🎓', title: 'Sertifikasi', subtitle: 'Kelola sertifikat dosen' },
                { icon: '🔔', title: 'Notifikasi', subtitle: 'Atur pemberitahuan' },
              ].map((item, index) => (
                <button key={index} className="w-full px-6 py-4 hover:bg-gray-50 transition-all flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-xl">{item.icon}</span>
                    <div className="text-left">
                      <p className="text-gray-800 font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                    </div>
                  </div>
                  <IoIosArrowForward className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDosen;
