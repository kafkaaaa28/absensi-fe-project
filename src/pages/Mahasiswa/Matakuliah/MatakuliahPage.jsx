import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import useMatkul from '../../../hooks/Siswa/useMatkul';
import { FaSearch } from 'react-icons/fa';
import TabelMatakuliah from './components/TabelMatakuliah';
import LoadingPage from '../../../components/common/LoadingPage';

const MatakuliahPage = () => {
  const { loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const { matkul, loadingMatkul } = useMatkul();
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
          <h2 className="text-lg font-bold text-gray-800">Mata Kuliah Saya</h2>
          <p className="text-gray-600 text-xs mt-0.5">Daftar mata kuliah yang diambil</p>
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
      <TabelMatakuliah matkul={matkul} loadingMatkul={loadingMatkul} searchTerm={searchTerm} />
    </div>
  );
};

export default MatakuliahPage;
