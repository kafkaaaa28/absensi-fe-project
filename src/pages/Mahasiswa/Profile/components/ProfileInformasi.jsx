import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { FaCalendarAlt, FaChartLine, FaGraduationCap } from 'react-icons/fa';
import { useAuth } from '../../../../context/AuthContext';

const ProfileInformasi = ({ menuItems, additionalMenus, infoAlert }) => {
  const { user } = useAuth();
  const academicStats = [
    { label: 'IPK', value: '3.45', color: 'text-blue-600', icon: <FaChartLine className="w-3 h-3" /> },
    { label: 'SKS Tempuh', value: '110', color: 'text-green-600', icon: <FaGraduationCap className="w-3 h-3" /> },
    { label: 'Semester', value: user.semester, color: 'text-purple-600', icon: <FaCalendarAlt className="w-3 h-3" /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden w-full lg:w-1/2">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-sm font-bold text-gray-800">Informasi Profile</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {menuItems.map((item, index) => (
            <div key={index} className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>{item.icon}</div>
                  <div>
                    <p className="text-xs text-gray-500">{item.title}</p>
                    <p className="text-sm text-gray-800 font-medium">{item.value}</p>
                  </div>
                </div>
                <IoIosArrowForward className="text-gray-400 w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full lg:w-1/2">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {additionalMenus.map((item, index) => (
            <button key={index} onClick={() => infoAlert('Mohon maaf fitur ini sedang diperbaiki')} className="w-full px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <div className="text-left">
                  <p className="text-sm text-gray-800 font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.subtitle}</p>
                </div>
              </div>
              <IoIosArrowForward className="text-gray-400 w-4 h-4" />
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaCalendarAlt className="w-4 h-4 text-blue-600" />
            </div>
            <h4 className="text-sm font-bold text-gray-800">Status Akademik</h4>
          </div>

          <div className="space-y-3">
            {academicStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">{stat.icon}</div>
                  <span className="text-gray-700 text-xs">{stat.label}</span>
                </div>
                <span className={`font-bold text-sm ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-4">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Statistik Cepat</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-gray-600 text-xs">Mata Kuliah</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">85%</p>
              <p className="text-gray-600 text-xs">Kehadiran</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">8</p>
              <p className="text-gray-600 text-xs">Tugas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformasi;
