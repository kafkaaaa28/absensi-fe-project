import React, { useState } from 'react';
import useAbsensi from '../../../hooks/Siswa/useAbsensi';
import { useAuth } from '../../../context/AuthContext';
import { FaSearch } from 'react-icons/fa';
import LoadingPage from '../../../components/common/LoadingPage';
import TabelAbsensiMahasiswa from './components/TabelAbsensiMahasiswa';
import ModalAbsensiMahasiswa from './components/ModalAbsensiMahasiswa';
import { FaClipboardCheck, FaQrcode } from 'react-icons/fa';
import { PiScanSmiley } from 'react-icons/pi';
const AbsensiPage = () => {
  const { dataKelas, dataAbsen, fetchAbsen, loadingAbsen, loadingKelas } = useAbsensi();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setisOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { loading } = useAuth();
  const getStatusColor = (status) => {
    const colors = {
      hadir: 'bg-green-100 text-green-800 border-green-200',
      sakit: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      izin: 'bg-blue-100 text-blue-800 border-blue-200',
      alpha: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };
  const getMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'qr':
        return <FaQrcode className="w-4 h-4" />;
      case 'face':
        return <PiScanSmiley className="w-4 h-4" />;
      default:
        return <FaClipboardCheck className="w-4 h-4" />;
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingPage color="#162542" />
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Kelas & Absensi</h2>
          <p className="text-gray-600 text-xs mt-0.5">Lihat absensi per mata kuliah</p>
        </div>

        <div className="w-full md:w-64">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Cari mata kuliah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
            />
          </div>
        </div>
      </div>
      <TabelAbsensiMahasiswa
        dataKelas={dataKelas}
        loadingKelas={loadingKelas}
        searchTerm={searchTerm}
        onShow={(row) => {
          setSelected(row);
          setisOpen(true);
        }}
      />
      <ModalAbsensiMahasiswa isOpen={isOpen} Kelas={selected} loadingAbsen={loadingAbsen} onClose={() => setisOpen(false)} fetchAbsen={fetchAbsen} dataAbsen={dataAbsen} getStatusColor={getStatusColor} getMethodIcon={getMethodIcon} />
    </div>
  );
};

export default AbsensiPage;
