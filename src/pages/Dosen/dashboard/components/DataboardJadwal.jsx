import React from 'react';
import { HiCalendar } from 'react-icons/hi';
import JadwalPage from './JadwalPage';
import { useNavigate } from 'react-router-dom';
const DataboardJadwal = () => {
  const navigate = useNavigate();
  const hariIni = new Date().toLocaleString('id-ID', { weekday: 'long' });

  return (
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
          <button onClick={() => navigate('jadwalSaya')} className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
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
