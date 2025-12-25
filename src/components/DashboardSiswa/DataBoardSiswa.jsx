import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import { FaBookOpen, FaCalendarAlt, FaQrcode, FaUser, FaChartLine } from 'react-icons/fa';
import bgsiswa from '../img/bg-siswa.png';
import JadwalSiswaHarini from './JadwalSiswaHarini';
import Pusher from 'pusher-js';
import Swal from 'sweetalert2';

const DataBoardSiswa = () => {
  const [totalMatkul, setTotalMatkul] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSiswa, setIsSiswa] = useState([]);
  const [jadwalharini, setJadwalHarini] = useState([]);

  const fetchCounts = async () => {
    try {
      setLoading(true);
      const [resMatkul, resJadwalHarini] = await Promise.all([api.get('/siswa/matkulsiswa'), api.get('/siswa/jadwalharini')]);
      setTotalMatkul(resMatkul.data.length);
      setJadwalHarini(resJadwalHarini.data.length);
    } catch (err) {
      setError('Gagal mengambil data: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const hariIni = new Date().toLocaleString('id-ID', { weekday: 'long' });

  const getMe = async () => {
    try {
      const response = await api.get('/auth/me');
      setIsSiswa(response.data);
    } catch (err) {
      console.log('gagal ambil data');
    }
  };

  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe(`absensi-channel-${isSiswa.id_siswa}`);
    const ChannelQr = pusher.subscribe(`absensi-channel-qr-${isSiswa.id_siswa}`);

    channel.bind('absen-update', (data) => {
      Swal.fire({
        icon: data.success ? 'success' : 'error',
        title: data.success ? 'Berhasil!' : 'Gagal!',
        text: data.message,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed && data.success) {
          window.location.reload();
        }
      });
    });

    ChannelQr.bind('absen-qr-update', (data) => {
      Swal.fire({
        icon: data.success ? 'success' : 'error',
        title: data.success ? 'Berhasil!' : 'Gagal!',
        text: data.message,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed && data.success) {
          window.location.reload();
        }
      });
    });

    fetchCounts();
    getMe();

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [isSiswa?.id_siswa]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
          <p className="text-gray-600 text-sm">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaChartLine className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={fetchCounts} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r  from-blue-600 to-blue-800 text-white pb-8">
        <div className="absolute inset-0 overflow-hidden">
          <img src={bgsiswa} alt="dashboard background" className="w-full h-full object-cover opacity-20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <FaUser className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Selamat Datang, {isSiswa?.nama} 👋</h1>
                  <p className="text-blue-100 mt-1">Dashboard mahasiswa terbaru</p>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-4 rounded-lg border border-white/30">Mahasiswa Panel</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <FaBookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/80 text-xs">Total Mata Kuliah</p>
                    <p className="text-white text-xl font-bold">{totalMatkul}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <FaCalendarAlt className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white/80 text-xs">Jadwal Hari Ini</p>
                    <p className="text-white text-xl font-bold">{jadwalharini}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Jadwal Hari Ini */}
        <div className="bg-white rounded-xl shadow-sm border z-30 mt-7 border-gray-200 overflow-hidden mb-6">
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FaCalendarAlt className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-gray-800">Jadwal Hari Ini</h2>
                  <p className="text-gray-600 text-xs">{hariIni}</p>
                </div>
              </div>
              <button className="text-blue-600 text-xs font-medium hover:text-blue-700">Lihat Semua</button>
            </div>
          </div>
          <div className="p-4">
            <JadwalSiswaHarini />
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Akses Cepat</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <FaBookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-xs text-gray-700 font-medium">Mata Kuliah</span>
              </button>

              <button className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <FaCalendarAlt className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs text-gray-700 font-medium">Jadwal</span>
              </button>

              <button className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                  <FaQrcode className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-xs text-gray-700 font-medium">QR Absen</span>
              </button>

              <button className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                  <FaChartLine className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-xs text-gray-700 font-medium">Nilai</span>
              </button>
            </div>
          </div>

          {/* Status Akademik */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Status Akademik</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 text-xs">IPK</span>
                <span className="text-blue-600 font-bold text-sm">3.45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 text-xs">SKS Tempuh</span>
                <span className="text-gray-800 font-bold text-sm">110</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 text-xs">Status</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Aktif</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 text-xs">Semester</span>
                <span className="text-gray-800 font-bold text-sm">6</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBoardSiswa;
