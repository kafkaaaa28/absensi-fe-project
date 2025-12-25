import React, { useEffect, useState } from 'react';
import api from '../../../utils/api';
import ModalAbsensiSiswa from './ModalAbsensiSiswa';
import { FaUsers, FaBook, FaHashtag, FaClipboardList, FaSearch } from 'react-icons/fa';

const AbsensiMahasiswa = () => {
  const [dataKelas, setDataKelas] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [ModalAbsensi, setModalAbsensi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchKelas = async () => {
    try {
      setLoading(true);
      const resKelas = await api.get('/siswa/kelasSiswa');
      setDataKelas(resKelas.data.data || []);
    } catch (err) {
      console.log(err.response?.data?.message);
      setError('Gagal mengambil data kelas');
    } finally {
      setLoading(false);
    }
  };

  const handleAbsensi = (item) => {
    setSelectedKelas(item);
    setModalAbsensi(true);
  };

  useEffect(() => {
    fetchKelas();
  }, []);

  const filteredData = dataKelas.filter(
    (item) => (item.nama_matkul || '').toLowerCase().includes(searchTerm.toLowerCase()) || (item.nama_kelas || '').toLowerCase().includes(searchTerm.toLowerCase()) || (item.kode_matkul || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalKelas = new Set(dataKelas.map((item) => item.kode_matkul)).size;

  return (
    <div className="space-y-4">
      {/* Header & Search */}
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

      {/* Stats Summary */}

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2.5 text-left">
                  <span className="text-gray-700 font-medium">No</span>
                </th>
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
                    <FaHashtag className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Kode</span>
                  </div>
                </th>
                <th className="px-3 py-2.5 text-left">
                  <span className="text-gray-700 font-medium">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-3 py-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
                      <p className="text-gray-500 text-xs">Memuat data kelas...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-3 py-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FaUsers className="w-8 h-8 text-gray-300 mb-1.5" />
                      <p className="text-gray-500 text-xs font-medium">{dataKelas.length === 0 ? 'Tidak ada kelas' : 'Data tidak ditemukan'}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{searchTerm ? 'Coba kata kunci lain' : 'Semua kelas akan muncul di sini'}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2.5">
                      <span className="text-gray-600 text-xs">{index + 1}</span>
                    </td>
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
                        <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                          <FaBook className="w-3 h-3 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-xs">{item.nama_matkul}</p>
                          <p className="text-gray-500 text-xs">Semester: {item.semester || '6'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5">
                      <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">{item.kode_matkul}</code>
                    </td>
                    <td className="px-3 py-2.5">
                      <button className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2.5 py-1.5 rounded hover:bg-blue-100 transition-colors border border-blue-200 text-xs" onClick={() => handleAbsensi(item)}>
                        <FaClipboardList className="w-3 h-3" />
                        <span>Lihat Absensi</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {filteredData.length > 0 && !loading && (
          <div className="px-3 py-2.5 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-600">
              Menampilkan <span className="font-medium">{filteredData.length}</span> dari <span className="font-medium">{dataKelas.length}</span> kelas
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <ModalAbsensiSiswa modalLihat={ModalAbsensi} OnClose={setModalAbsensi} data={selectedKelas} />
    </div>
  );
};

export default AbsensiMahasiswa;
