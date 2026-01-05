import React from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaBook, FaUsers, FaUserTie, FaUserGraduate, FaClipboardList } from 'react-icons/fa';

const TabelJadwalAsdos = ({ data, loading, getHariColor, searchTerm, onShowAbsensi, onShowMahasiswa }) => {
  const filteredData = data.filter(
    (item) => (item.nama_matkul || '').toLowerCase().includes(searchTerm.toLowerCase()) || (item.nama_kelas || '').toLowerCase().includes(searchTerm.toLowerCase()) || (item.kode_matkul || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
                  <FaClock className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Waktu</span>
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
                  <FaUserTie className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Dosen</span>
                </div>
              </th>
              <th className="px-3 py-2.5 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-700 font-medium">Aksi</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="py-10 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-gray-500">Memuat jadwal...</p>
                  </div>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-3 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FaCalendarAlt className="w-8 h-8 text-gray-300 mb-1.5" />
                    <p className="text-gray-500 text-xs font-medium">{data.length === 0 ? 'Tidak ada jadwal' : 'Data tidak ditemukan'}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{searchTerm ? 'Coba kata kunci lain' : 'Semua jadwal akan muncul di sini'}</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
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
                        <p className="font-medium text-gray-800 text-xs">
                          {item.kode_matkul} - {item.nama_matkul}
                        </p>
                        <p className="text-gray-500 text-xs">{item.sks || 3} SKS</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-2.5">
                    <div className="space-y-0.5">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getHariColor(item.hari)}`}>{item.hari}</span>
                      <div className="text-xs font-mono text-gray-800">
                        {item.jam_mulai} - {item.jam_selesai}
                      </div>
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
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <FaUserTie className="w-3 h-3 text-orange-600" />
                      </div>
                      <span className="text-gray-700 text-xs">{item.nama}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex gap-1.5">
                      <button className="flex items-center gap-1 bg-green-50 text-green-600 px-2 py-1.5 rounded hover:bg-green-100 transition-colors border border-green-200 text-xs" onClick={() => onShowMahasiswa(item)}>
                        <FaUserGraduate className="w-3 h-3" />
                        <span>Mahasiswa</span>
                      </button>
                      <button className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1.5 rounded hover:bg-blue-100 transition-colors border border-blue-200 text-xs" onClick={() => onShowAbsensi(item)}>
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
    </div>
  );
};

export default TabelJadwalAsdos;
