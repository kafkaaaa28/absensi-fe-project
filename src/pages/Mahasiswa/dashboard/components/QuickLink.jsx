import React from 'react';
import { FaBookOpen, FaCalendarAlt, FaClipboardCheck, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { infoAlert } from '../../../../utils/alerts';
const QuickLink = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
      <h3 className="text-sm font-bold text-gray-800 mb-4">Akses Cepat</h3>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => navigate('matakuliah')} className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
            <FaBookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xs text-gray-700 font-medium">Mata Kuliah</span>
        </button>

        <button onClick={() => navigate('jadwal')} className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
            <FaCalendarAlt className="w-5 h-5 text-green-600" />
          </div>
          <span className="text-xs text-gray-700 font-medium">Jadwal</span>
        </button>

        <button onClick={() => navigate('absensi')} className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
            <FaClipboardCheck className="w-5 h-5 text-purple-600" />
          </div>
          <span className="text-xs text-gray-700 font-medium">Absensi</span>
        </button>

        <button onClick={() => infoAlert('Mohon maaf fitur ini sedang diperbaiki')} className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
            <FaChartLine className="w-5 h-5 text-orange-600" />
          </div>
          <span className="text-xs text-gray-700 font-medium">Nilai</span>
        </button>
      </div>
    </div>
  );
};

export default QuickLink;
