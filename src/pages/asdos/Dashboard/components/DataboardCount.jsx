import React from 'react';
import { FaCalendarAlt, FaChalkboardTeacher } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import { Spinner } from 'flowbite-react';
// import { useDosen } from '../../../../hooks/Dosen/useDosen';

const DataboardCount = () => {
  //   const { totalJadwal, totalKelas, loading } = useDosen();
  let loading;
  const statsCards = [
    {
      icon: <MdMeetingRoom className="w-6 h-6" />,
      title: 'Total Kelas',
      value: 1,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-600',
    },
    {
      icon: <FaCalendarAlt className="w-6 h-6" />,
      title: 'Total Jadwal',
      value: 1,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-600',
    },
    {
      icon: <FaChalkboardTeacher className="w-6 h-6" />,
      title: 'Mata Kuliah',
      value: 1,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-600',
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bgColor}`}>{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.textColor}`}>{loading ? <Spinner size="sm" /> : stat.value}</div>
          </div>
          <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
          <div className={`h-1 mt-2 rounded-full bg-gradient-to-r ${stat.color}`}></div>
        </div>
      ))}
    </div>
  );
};

export default DataboardCount;
