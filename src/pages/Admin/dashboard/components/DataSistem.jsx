import React from 'react';

const DataSistem = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800">Notifikasi </h3>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">Lihat Semua</button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <p>Tidak Ada Notifikasi</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Status Sistem</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Server</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Online</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Database</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Stabil</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Backup</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">2 jam lalu</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSistem;
