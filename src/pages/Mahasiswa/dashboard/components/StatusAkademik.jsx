import React from 'react';

const StatusAkademik = () => {
  return (
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
  );
};

export default StatusAkademik;
