import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { FaEnvelope, FaGraduationCap, FaCalendarAlt, FaUniversity, FaIdCard, FaQrcode, FaUserCircle, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';

const ProfileSiswa = () => {
  const [siswa, setSiswa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qrpath, setQrpath] = useState(null);
  const [qrVisible, setQrVisible] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/siswa/profilesiswa');
      if (res.data.data && res.data.data.length > 0) {
        setSiswa(res.data.data[0]);
      } else {
        setSiswa(null);
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchqr = async () => {
    try {
      const res = await api.get('/siswa/qrsiswa');
      setQrpath(res.data.qr);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchqr();
  }, []);

  const profileItems = [
    {
      icon: <FaEnvelope className="w-4 h-4" />,
      title: 'Email',
      value: siswa?.email,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <FaIdCard className="w-4 h-4" />,
      title: 'NIM',
      value: siswa?.nim,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <FaUniversity className="w-4 h-4" />,
      title: 'Fakultas',
      value: siswa?.fakultas,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <FaGraduationCap className="w-4 h-4" />,
      title: 'Program Studi',
      value: siswa?.prodi,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: <FaCalendarAlt className="w-4 h-4" />,
      title: 'Terdaftar Sejak',
      value: siswa?.created_at
        ? new Date(siswa.created_at).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        : 'Tidak tersedia',
      color: 'bg-red-100 text-red-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
          <p className="text-gray-600 text-sm">Memuat profil...</p>
        </div>
      </div>
    );
  }

  if (!siswa) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <IoMdSchool className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Data tidak ditemukan</p>
          <button onClick={fetchProfile} className="mt-3 text-blue-600 text-sm hover:text-blue-700">
            Coba lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-8 pb-6">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Profil Mahasiswa</h1>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-white/20 px-2 py-1 rounded">Aktif</span>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                  <IoMdSchool className="text-3xl text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-bold mb-1">{siswa.nama}</h2>
                <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/20 text-xs mb-2">{siswa.role}</div>
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <span>Semester: {siswa.semester || '6'}</span>
                  <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                  <span>Status: Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 -mt-4">
        {/* QR Code Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaQrcode className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-800">QR Code Absensi</h3>
            </div>
            <button onClick={() => setQrVisible(!qrVisible)} className="text-blue-600 text-xs font-medium hover:text-blue-700">
              {qrVisible ? 'Sembunyikan' : 'Tampilkan'}
            </button>
          </div>

          {qrVisible && qrpath && (
            <div className="text-center">
              <div className="inline-block p-3 bg-white border-2 border-dashed border-gray-300 rounded-lg">
                <img src={qrpath} alt="QR Code Mahasiswa" className="w-48 h-48 mx-auto" />
              </div>
              <p className="text-gray-500 text-xs mt-2">Scan QR code untuk absensi</p>
            </div>
          )}
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-800">Informasi Profile</h3>
          </div>

          <div className="divide-y divide-gray-100">
            {profileItems.map((item, index) => (
              <div key={index} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>{item.icon}</div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{item.title}</p>
                    <p className="text-sm text-gray-800 font-medium">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="w-4 h-4 text-green-600" />
              </div>
              <h4 className="text-sm font-bold text-gray-800">Status Akademik</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">IPK</span>
                <span className="font-bold text-gray-800">3.45</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">SKS Tempuh</span>
                <span className="font-bold text-gray-800">110</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-600">Semester</span>
                <span className="font-bold text-gray-800">{siswa.semester || '6'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaUniversity className="w-4 h-4 text-purple-600" />
              </div>
              <h4 className="text-sm font-bold text-gray-800">Informasi Kampus</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <FaMapMarkerAlt className="text-gray-400 w-3 h-3" />
                <span className="text-gray-600">Kampus Pusat</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <FaPhone className="text-gray-400 w-3 h-3" />
                <span className="text-gray-600">(021) 12345678</span>
              </div>
              <div className="text-xs text-gray-500">Universitas Bina Sarana Informatika</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSiswa;
