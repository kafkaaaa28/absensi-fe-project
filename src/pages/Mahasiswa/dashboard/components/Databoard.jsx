import React from 'react';
import bgsiswa from '../../../../components/img/bg-siswa.png';
import { useAuth } from '../../../../context/AuthContext';
import useMatkul from '../../../../hooks/Siswa/useMatkul';
import useJadwal from '../../../../hooks/Siswa/useJadwal';
import { FaUser, FaBookOpen, FaCalendarAlt, FaAddressCard } from 'react-icons/fa';
const Databoard = () => {
  const { user } = useAuth();
  const { totalMatkul } = useMatkul();
  const { totalJadwal } = useJadwal();
  return (
    <div className="relative bg-gradient-to-r rounded-lg from-blue-600 to-blue-800 text-white pb-8">
      <div className="absolute inset-0 overflow-hidden">
        <img src={bgsiswa} alt="dashboard background" className="w-full h-full object-cover opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row  justify-between items-center md:items-center pt-8 pb-6">
          <div className="flex flex-col justify-center sm:flex-row  items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <FaUser className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl text-center font-bold">Selamat Datang, {user?.nama}</h1>
              <div className="flex gap-2  justify-center sm:justify-start items-center">
                <FaAddressCard className="text-lg" />
                <p>
                  {user?.nim} - {user?.fakultas} {user?.prodi}
                </p>
              </div>
              <p className="text-blue-100 mt-1 text-center sm:text-start">Dashboard mahasiswa terbaru</p>
            </div>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-semibold py-2 px-4 rounded-lg border border-white/30">Mahasiswa Panel</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FaBookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/80 text-xs">Total Mata Kuliah</p>
                  <p className="text-white text-xl font-bold">{totalMatkul}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FaCalendarAlt className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white/80 text-xs">Jadwal Hari Ini</p>
                  <p className="text-white text-xl font-bold">{totalJadwal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Databoard;
