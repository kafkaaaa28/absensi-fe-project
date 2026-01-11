import { useEffect } from 'react';
import bgadmin from '../../../../components/img/bgadmin.png';
import { useAuth } from '../../../../context/AuthContext';
import { FaUserShield, FaChartLine, FaBell, FaCog, FaUserFriends, FaChalkboardTeacher, FaBook, FaCalendarAlt } from 'react-icons/fa';
import { useMahasiswa } from '../../../../hooks/Admin/useMahasiswa';

const DataBoard = () => {
  const { user } = useAuth();
  const { totalUser, fetchTotalUser, loadingTotalUser } = useMahasiswa();
  useEffect(() => {
    fetchTotalUser();
  }, []);
  const quickStats = [
    { label: 'Hari Ini', value: 'Aktif', color: 'bg-green-100 text-green-800' },
    { label: 'Pengunjung', value: '24/7', color: 'bg-blue-100 text-blue-800' },
    { label: 'Status', value: 'Online', color: 'bg-purple-100 text-purple-800' },
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="relative bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white rounded-2xl overflow-hidden shadow-xl">
        <div className="absolute inset-0 overflow-hidden">
          <img src={bgadmin} alt="dashboard background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#162542] to-blue-600/60"></div>
        </div>
        <div className="relative z-10 p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FaUserShield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Selamat Datang, <span className="text-blue-200">Admin {user?.nama}</span> 👋
                  </h1>
                  <p className="text-blue-100 mt-1">Dashboard administrasi sistem</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-2 mt-4">
                {quickStats.map((stat, index) => (
                  <span key={index} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${stat.color}`}>
                    {stat.label}: {stat.value}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all">
                <FaBell className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all">
                <FaCog className="w-5 h-5" />
              </button>
              <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-4 rounded-lg border border-white/30">Admin Panel</span>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FaUserFriends className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Total Pengguna</p>
                  <p className="text-white text-xl font-bold">{loadingTotalUser ? <div className="w-4 h-4 border-2 mt-2 border-white border-t-transparent rounded-full animate-spin"></div> : totalUser}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FaCalendarAlt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">Tanggal</p>
                  <p className="text-white text-xl font-bold">
                    {new Date().toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBoard;
