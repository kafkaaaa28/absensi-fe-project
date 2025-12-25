import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { FaSearch, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaBook, FaUsers, FaCode } from 'react-icons/fa';

const JadwalDosen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

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

  // Filter data berdasarkan search term
  const filteredData = data.filter(
    (item) => (item.nama_matkul || '').toLowerCase().includes(searchTerm.toLowerCase()) || (item.nama_kelas || '').toLowerCase().includes(searchTerm.toLowerCase()) || (item.kode_matkul || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
          <p className="text-gray-600 text-sm">Memuat jadwal...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <FaCalendarAlt className="w-5 h-5 text-red-600" />
        </div>
        <h3 className="text-red-800 font-semibold text-sm mb-1">Gagal Memuat Jadwal</h3>
        <p className="text-red-600 text-xs mb-3">{error}</p>
        <button onClick={fetchJadwal} className="bg-red-600 text-white px-4 py-1.5 rounded text-sm hover:bg-red-700 transition-colors">
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
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

      {/* Stats Summary */}

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <FaUsers className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Kelas</span>
                  </div>
                </th>
                <th className="px-3 py-2.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <FaBook className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Mata Kuliah</span>
                  </div>
                </th>
                <th className="px-3 py-2.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Hari</span>
                  </div>
                </th>
                <th className="px-3 py-2.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <FaClock className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Jam</span>
                  </div>
                </th>
                <th className="px-3 py-2.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Ruang</span>
                  </div>
                </th>
                <th className="px-3 py-2.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <FaCode className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Kode</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-3 py-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FaCalendarAlt className="w-8 h-8 text-gray-300 mb-1.5" />
                      <p className="text-gray-500 text-xs font-medium">{data.length === 0 ? 'Tidak ada jadwal' : 'Data tidak ditemukan'}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{searchTerm ? 'Coba kata kunci lain' : 'Semua jadwal akan muncul di sini'}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id_jadwal} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                          <FaUsers className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-800 text-xs">{item.nama_kelas}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                          <FaBook className="w-3 h-3 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-xs">{item.nama_matkul}</p>
                          <p className="text-gray-500 text-xs">{item.sks || '3'} SKS</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getHariColor(item.hari)}`}>{item.hari}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-gray-900 text-xs">{item.jam_mulai}</span>
                        <span className="text-gray-400 text-xs">-</span>
                        <span className="font-mono text-gray-900 text-xs">{item.jam_selesai}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                          <FaMapMarkerAlt className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-xs">{item.ruang}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">{item.kode_matkul}</code>
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
