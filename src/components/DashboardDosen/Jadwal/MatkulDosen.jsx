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

  const fetchmatkul = async (params) => {
    try {
      const res = await api.get('/dosen/kelasdosen');
      setData(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
      setError('Gagal fetch data');
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

  const filteredData = data.filter((item) => (item.nama_matkul || '').toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cari Nama Mata Kuliah"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <span>No</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <FaUsers className="w-4 h-4 text-gray-500" />
                    <span>Nama Kelas</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <FaBook className="w-4 h-4 text-gray-500" />
                    <span>Mata Kuliah</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="w-4 h-4 text-gray-500" />
                    <span>Semester</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <div className="flex items-center space-x-2">
                    <FaCode className="w-4 h-4 text-gray-500" />
                    <span>Kode</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-4 text-left">
                  <span>Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <FaBook className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">{data.length === 0 ? 'Tidak ada Mata Kuliah' : 'Data tidak ditemukan'}</p>
                      <p className="text-gray-400 text-sm mt-1">{searchTerm ? 'Coba dengan kata kunci lain' : 'Semua mata kuliah akan muncul di sini'}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id_jadwal} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-gray-600 font-medium">{index + 1}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FaUsers className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{item.nama_kelas}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">{item.nama_matkul}</p>
                        <p className="text-sm text-gray-500 mt-1">{item.sks} SKS</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">Semester {item.semester}</span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm font-mono">{item.kode_matkul}</code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors" onClick={() => handleKelas(item)}>
                          <FaUserGraduate className="w-4 h-4" />
                          <span>Mahasiswa</span>
                        </button>
                        <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors" onClick={() => handleAbsensi(item)}>
                          <FaClipboardList className="w-4 h-4" />
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
      </div>

      <ModalLihatSiswaKelas modalLihat={showModalKelas} data={selectedKelas} OnClose={() => setshowModalKelas(false)} />
      <LihatAbsensi modalLihat={showModalAbsen} data={selectedKelas} OnClose={() => setshowModalAbsen(false)} />
    </div>
  );
};

export default MatkulDosen;
