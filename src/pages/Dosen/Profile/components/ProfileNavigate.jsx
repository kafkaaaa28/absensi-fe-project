import React from 'react';

const ProfileNavigate = ({ quickActions }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
      <div className="grid grid-cols-4 gap-4">
        {quickActions.map((item, index) => (
          <button key={index} onClick={item.action} className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-50 transition-all">
            <span className="text-2xl mb-2">{item.icon}</span>
            <span className="text-xs text-gray-600 text-center">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileNavigate;
