import React from 'react';
import JadwalPage from './JadwalPage';
import { FaCalendarAlt } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
const DataboardJadwal = () => {
  const navigate = useNavigate();
  const hariIni = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
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
          <button onClick={() => navigate('jadwalSaya')} className="text-blue-600 text-xs font-medium hover:text-blue-700">
            Lihat Semua
          </button>
        </div>
      </div>
      <div className="p-6">
        <JadwalPage />
      </div>
    </div>
  );
};

export default DataboardJadwal;
