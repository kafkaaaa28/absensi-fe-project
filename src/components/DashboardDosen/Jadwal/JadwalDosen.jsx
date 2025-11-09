import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { FaSearch, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaBook, FaUsers, FaCode, FaFilter, FaSort } from 'react-icons/fa';
import { Spinner } from 'flowbite-react';

const JadwalDosen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const fetchJadwal = async () => {
    try {
      setLoading(true);
      const res = await api.get('/dosen/jadwaldosen');
      setData(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
      setError('Gagal mengambil data jadwal');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJadwal();
  }, []);

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
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <Spinner size="xl" className="mb-4" />
          <p className="text-gray-600">Memuat jadwal...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <FaCalendarAlt className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-red-800 font-semibold mb-2">Gagal Memuat Jadwal</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button onClick={fetchJadwal} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Jadwal Mengajar</h2>
          <p className="text-gray-600 mt-1">Kelola dan lihat jadwal mengajar Anda</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative flex-1 lg:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari mata kuliah, kelas, atau kode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors text-left">
                  <div className="flex items-center space-x-2">
                    <FaUsers className="w-4 h-4" />
                    <span>Kelas</span>
                  </div>
                </th>

                <th className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors  text-left">
                  <div className="flex items-center space-x-2">
                    <FaBook className="w-4 h-4" />
                    <span>Mata Kuliah</span>
                  </div>
                </th>

                <th className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors  text-left">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="w-4 h-4" />
                    <span>Hari</span>
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors  text-left">
                  <div className="flex items-center space-x-2">
                    <FaClock className="w-4 h-4" />
                    <span>Jam</span>
                  </div>
                </th>

                <th scope="col" className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="w-4 h-4" />
                    <span>Ruang</span>
                  </div>
                </th>

                <th className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors  text-left">
                  <div className="flex items-center space-x-2">
                    <FaCode className="w-4 h-4" />
                    <span>Kode</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FaCalendarAlt className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">Tidak ada jadwal ditemukan</p>
                      <p className="text-gray-400 text-sm mt-1">{searchTerm ? 'Coba dengan kata kunci lain' : 'Semua jadwal akan muncul di sini'}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id_jadwal} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{item.nama_kelas}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{item.nama_matkul}</p>
                        <p className="text-sm text-gray-500 mt-1">{item.sks || '3'} SKS</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getHariColor(item.hari)}`}>{item.hari}</span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-gray-900">{item.jam_mulai}</span>
                        <span className="text-gray-400">-</span>
                        <span className="font-mono text-gray-900">{item.jam_selesai}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{item.ruang}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">{item.kode_matkul}</code>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JadwalDosen;
