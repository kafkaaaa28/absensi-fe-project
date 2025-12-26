import { useState } from 'react';
import { useDosen } from '../../../hooks/Dosen/useDosen';
import { FaSearch } from 'react-icons/fa';
import TableJadwalDosen from './components/TableJadwalDosen';
import LoadingPage from '../../../components/common/LoadingPage';
import { useAuth } from '../../../context/AuthContext';
const JadwalDosenPage = () => {
  const { dataJadwal } = useDosen();
  const { loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const getHariColor = (hari) => {
    const colors = {
      senin: 'bg-blue-100 text-blue-800',
      selasa: 'bg-green-100 text-green-800',
      rabu: 'bg-yellow-100 text-yellow-800',
      kamis: 'bg-purple-100 text-purple-800',
      jumat: 'bg-red-100 text-red-800',
      sabtu: 'bg-indigo-100 text-indigo-800',
      minggu: 'bg-gray-100 text-gray-800',
    };
    return colors[hari?.toLowerCase()] || 'bg-gray-100 text-gray-800';
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
          <h2 className="text-lg font-bold text-gray-800">Jadwal Mengajar</h2>
          <p className="text-gray-600 text-xs mt-0.5">Lihat dan kelola jadwal mengajar</p>
        </div>

        {/* Search */}
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
      <TableJadwalDosen dataJadwal={dataJadwal} getHariColor={getHariColor} searchTerm={searchTerm} />
    </div>
  );
};

export default JadwalDosenPage;
