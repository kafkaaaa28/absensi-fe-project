import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const ProfileInformasi = ({ menuItems, additionalMenus, infoAlert }) => {
  return (
    <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-4 ">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-full lg:w-[50%]">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Informasi Profile</h3>
        </div>

        <div className="divide-y divide-gray-100">
          {menuItems.map((item, index) => (
            <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>{item.icon}</div>
                  <div>
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <p className="text-gray-800 font-medium">{item.value}</p>
                  </div>
                </div>
                <IoIosArrowForward className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm mt-6 lg:mt-0 overflow-hidden w-full lg:w-[50%]">
        <div className="divide-y divide-gray-100">
          {additionalMenus.map((item, index) => (
            <button key={index} onClick={() => infoAlert('Mohon maaf fitur ini sedang diperbaiki')} className="w-full px-6 py-4 hover:bg-gray-50 transition-all flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-xl">{item.icon}</span>
                <div className="text-left">
                  <p className="text-gray-800 font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
              </div>
              <IoIosArrowForward className="text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileInformasi;
