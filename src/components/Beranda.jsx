import React from 'react';
import bgappease from './img/682940.webp';
import Navbar from './Navbar';
import { FaQrcode, FaUserCheck, FaUniversity, FaChartLine, FaShieldAlt, FaMobileAlt } from 'react-icons/fa';
import { infoAlert } from '../utils/alerts';
const Beranda = () => {
  const features = [
    {
      icon: <FaQrcode className="w-8 h-8" />,
      title: 'QR Code Absensi',
      description: 'Absensi cepat dan akurat dengan scan QR code',
    },
    {
      icon: <FaUserCheck className="w-8 h-8" />,
      title: 'Face Recognition',
      description: 'Sistem absensi berbasis pengenalan wajah',
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: 'Analytics Real-time',
      description: 'Monitor kehadiran secara real-time',
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: 'Keamanan Tinggi',
      description: 'Sistem terenkripsi dengan proteksi data',
    },
  ];

  return (
    <div className="relative bg-cover bg-center bg-fixed min-h-screen" style={{ backgroundImage: `url(${bgappease})` }}>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-green-800/60"></div>

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
              <FaUniversity className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Smart Absensi <span className="text-blue-300">Universitas Appease</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">Sistem absensi modern berbasis QR Code dan Face Embedding untuk efisiensi kampus</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-blue-300">{feature.icon}</div>
                  </div>
                  <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                </div>
                <p className="text-white/80 text-xs">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg">
              <FaMobileAlt className="w-4 h-4" />
              Mulai Absensi Sekarang
            </button>
            <button onClick={infoAlert} className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-all border border-white/30">
              Pelajari Lebih Lanjut
            </button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">5000+</div>
              <div className="text-white/80 text-xs">Pengguna Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">98%</div>
              <div className="text-white/80 text-xs">Akurasi Sistem</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
              <div className="text-white/80 text-xs">Akses Real-time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
              <div className="text-white/80 text-xs">Data Terproteksi</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
      </div>
    </div>
  );
};

export default Beranda;
