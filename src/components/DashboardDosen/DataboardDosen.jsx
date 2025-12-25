import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Spinner } from 'flowbite-react';
import bgdosen from '../img/bg-dosen.png';
import JadwalDosenharini from './JadwalDosenHarini';
import { FaBookOpen, FaCalendarAlt, FaChalkboardTeacher, FaClock, FaUserTie } from 'react-icons/fa';
import { MdMeetingRoom, MdSchedule, MdDashboard } from 'react-icons/md';
import { HiAcademicCap, HiCalendar } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const DataboardDosen = () => {
  const { user } = useAuth();

  const [totalKelas, setTotalKelas] = useState(0);
  const [totalJadwal, setTotalJadwal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fetchCounts = async () => {
    try {
      setLoading(false);
      const resKelas = await api.get('/dosen/kelasdosen');
      setTotalKelas(resKelas.data.length);
      const resJadwal = await api.get('dosen/jadwaldosen');
      setTotalJadwal(resJadwal.data.length);
    } catch (err) {
      setLoading(false);
      setError('Gagal mengambil data: ' + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };

  const hariIni = new Date().toLocaleString('id-ID', { weekday: 'long' });

  useEffect(() => {
    fetchCounts();
  }, []);

  const statsCards = [
    {
      icon: <MdMeetingRoom className="w-6 h-6" />,
      title: 'Total Kelas',
      value: totalKelas,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-600',
    },
    {
      icon: <FaCalendarAlt className="w-6 h-6" />,
      title: 'Total Jadwal',
      value: totalJadwal,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-600',
    },
    {
      icon: <FaChalkboardTeacher className="w-6 h-6" />,
      title: 'Mata Kuliah',
      value: totalKelas,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-600',
    },
    {
      icon: <FaClock className="w-6 h-6" />,
      title: 'Jam Mengajar/Minggu',
      value: '18h', // Ganti dengan data actual jika ada
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      textColor: 'text-orange-600',
    },
  ];

  const quickActions = [
    {
      icon: <HiAcademicCap className="w-6 h-6" />,
      title: 'Kelas Saya',
      description: 'Lihat semua kelas',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: <MdSchedule className="w-6 h-6" />,
      title: 'Jadwal',
      description: 'Atur jadwal mengajar',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: <FaBookOpen className="w-6 h-6" />,
      title: 'Materi',
      description: 'Kelola materi ajar',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: <FaUserTie className="w-6 h-6" />,
      title: 'Profile',
      description: 'Edit profile dosen',
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdDashboard className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={fetchCounts} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 pb-6">
      <div className="relative bg-gradient-to-r from-[#162542] to-[#2D4A8A] text-white pb-8 rounded-lg">
        <div className="absolute inset-0 overflow-hidden">
          <img src={bgdosen} alt="dashboard background" className="w-full h-full object-cover opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
          <div className="flex justify-between items-center pt-8 pb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Selamat Datang, {user?.nama} 👋</h1>
              <p className="text-blue-100 mt-2">Dashboard terbaru Anda ada di sini</p>
            </div>
            <div className="hidden md:block">
              <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-4 rounded-xl border border-white/30">Dosen Panel</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickActions.map((action, index) => (
              <button key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/20 transition-all border border-white/20">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>{action.icon}</div>
                <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                <p className="text-blue-100 text-sm">{action.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>{stat.icon}</div>
                <div className={`text-2xl font-bold ${stat.textColor}`}>{loading ? <Spinner size="sm" /> : stat.value}</div>
              </div>
              <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
              <div className={`h-1 mt-2 rounded-full bg-gradient-to-r ${stat.color}`}></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <HiCalendar className="w-6 h-6 text-blue-600" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Jadwal Hari Ini</h2>
                  <p className="text-gray-600 text-sm">{hariIni}</p>
                </div>
              </div>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">Lihat Semua</button>
            </div>
          </div>
          <div className="p-6">
            <JadwalDosenharini />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">Tidak Ada Aktivitas</p>
                  {/* <p className="text-xs text-gray-500">-</p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengumuman</h3>
            <div className="space-y-3">
              <div className="p-4 bg-yellow-50 rounded-lg border border-blue-200">
                <p className="text-sm text-yellow-800 font-medium">Tidak Ada Pengumuman</p>
                <p className="text-xs text-yellow-600 mt-1">{hariIni}</p>
              </div>
              {/* <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">Rapat Dosen Bulanan</p>
                <p className="text-xs text-blue-600 mt-1">Jumat, 15 Desember 2024</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataboardDosen;
