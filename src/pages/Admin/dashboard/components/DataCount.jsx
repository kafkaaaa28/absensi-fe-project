import React from 'react';
import { FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const DataCount = ({ Menu }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Menu.map((m, index) => {
        const iconColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-indigo-500'];
        const bgColors = ['bg-blue-50 border-blue-100', 'bg-green-50 border-green-100', 'bg-purple-50 border-purple-100', 'bg-orange-50 border-orange-100', 'bg-pink-50 border-pink-100', 'bg-indigo-50 border-indigo-100'];

        return (
          <div key={index} onClick={() => navigate(m.link)} className={`bg-white cursor-pointer rounded-xl shadow-sm p-6 border ${bgColors[index % bgColors.length]} hover:shadow-md transition-all group`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${iconColors[index % iconColors.length]} rounded-xl flex items-center justify-center`}>
                <div className="text-white">{m.icon || <FaBook className="w-6 h-6" />}</div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{m.total}</p>
                <p className="text-gray-600 text-xs font-medium mt-1">Total</p>
              </div>
            </div>
            <p className="text-gray-700 font-medium text-sm mb-2">{m.Name}</p>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs hover:text-blue-600">Lihat detail →</span>
              <div className={`h-1 w-8 rounded-full ${iconColors[index % iconColors.length]} group-hover:w-16 transition-all`}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DataCount;
