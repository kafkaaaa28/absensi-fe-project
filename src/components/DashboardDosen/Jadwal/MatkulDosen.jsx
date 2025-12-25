import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import ModalLihatSiswaKelas from './ModalLihatSiswaKelas';
import LihatAbsensi from '../Abensi/LihatAbsensi';
import { FaSearch, FaBook, FaUsers, FaCode, FaCalendarAlt, FaUserGraduate, FaClipboardList } from 'react-icons/fa';

const MatkulDosen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [showModalKelas, setshowModalKelas] = useState(false);
  const [showModalAbsen, setshowModalAbsen] = useState(false);

  const fetchmatkul = async () => {
    try {
      setLoading(true);
      const res = await api.get('/dosen/kelasdosen');
      setData(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
      setError('Gagal mengambil data');
    } finally {
      setLoading(false);
    }
  };

  const handleKelas = (item) => {
    setshowModalKelas(true);
    setSelectedKelas(item);
  };

  const handleAbsensi = (item) => {
    setSelectedKelas(item);
    setshowModalAbsen(true);
  };

  useEffect(() => {
    fetchmatkul();
  }, []);

  const filteredData = data.filter(
    (item) => (item.nama_matkul || '').toLowerCase().includes(searchTerm.toLowerCase()) || (item.nama_kelas || '').toLowerCase().includes(searchTerm.toLowerCase()) || (item.kode_matkul || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400 w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            placeholder="Cari mata kuliah atau kelas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-2 text-sm w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-3 py-2.5 text-left">
                  <span className="text-gray-700 font-medium">No</span>
                </th>
                <th scope="col" className="px-3 py-2.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <FaUsers className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Kelas</span>
                  </div>
                </th>
                <th scope="col" className="px-3 py-2.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <FaBook className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Mata Kuliah</span>
                  </div>
                </th>
                <th scope="col" className="px-3 py-2.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Semester</span>
                  </div>
                </th>
                <th scope="col" className="px-3 py-2.5 text-left">
                  <div className="flex items-center gap-1.5">
                    <FaCode className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-700 font-medium">Kode</span>
                  </div>
                </th>
                <th scope="col" className="px-3 py-2.5 text-left">
                  <span className="text-gray-700 font-medium">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-3 py-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FaBook className="w-8 h-8 text-gray-300 mb-1.5" />
                      <p className="text-gray-500 text-xs font-medium">{data.length === 0 ? 'Tidak ada mata kuliah' : 'Data tidak ditemukan'}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{searchTerm ? 'Coba kata kunci lain' : 'Semua data akan muncul di sini'}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id_jadwal} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-2.5">
                      <span className="text-gray-600">{index + 1}</span>
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
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">Sem {item.semester}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs font-mono">{item.kode_matkul}</code>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex gap-1.5">
                        <button className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1.5 rounded hover:bg-green-100 transition-colors border border-green-200 text-xs" onClick={() => handleKelas(item)}>
                          <FaUserGraduate className="w-3 h-3" />
                          <span>Mahasiswa</span>
                        </button>
                        <button className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1.5 rounded hover:bg-blue-100 transition-colors border border-blue-200 text-xs" onClick={() => handleAbsensi(item)}>
                          <FaClipboardList className="w-3 h-3" />
                          <span>Absensi</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {filteredData.length > 0 && (
          <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-600">
              Menampilkan <span className="font-medium">{filteredData.length}</span> dari <span className="font-medium">{data.length}</span> mata kuliah
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <ModalLihatSiswaKelas modalLihat={showModalKelas} data={selectedKelas} OnClose={() => setshowModalKelas(false)} />
      <LihatAbsensi modalLihat={showModalAbsen} data={selectedKelas} OnClose={() => setshowModalAbsen(false)} />
    </div>
  );
};

export default MatkulDosen;
