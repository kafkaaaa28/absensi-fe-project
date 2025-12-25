import React from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaBook, FaUsers, FaCode, FaUserGraduate } from 'react-icons/fa';
import { Spinner } from 'flowbite-react';
const TableJadwalMahasiswa = ({ jadwalSiswa, loadingJadwal, searchTerm, getHariColor }) => {
  const filteredData = jadwalSiswa.filter(
    (item) =>
      (item.nama_matkul || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.nama_kelas || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.kode_matkul || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.nama || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
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
              <th className="px-3 py-2.5 text-left">
                <div className="flex items-center gap-1.5">
                  <FaUserGraduate className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Dosen</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loadingJadwal ? (
              <tr>
                <td colSpan="8" className="px-3 py-8 text-center">
                  <div className="flex flex-col gap-3 items-center justify-center">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
                    <p className="text-sm text-gray-500">Memuat Jadwal...</p>
                  </div>
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-3 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FaCalendarAlt className="w-8 h-8 text-gray-300 mb-1.5" />
                    <p className="text-gray-500 text-xs font-medium">{jadwalSiswa.length === 0 ? 'Tidak ada jadwal' : 'Data tidak ditemukan'}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{searchTerm ? 'Coba kata kunci lain' : 'Semua jadwal akan muncul di sini'}</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id_jadwal} className="hover:bg-gray-50 transition-colors">
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
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <FaUserGraduate className="w-3 h-3 text-orange-600" />
                      </div>
                      <span className="text-gray-700 text-xs">{item.nama}</span>
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
        <div className="px-3 py-2.5 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-600">
            Menampilkan <span className="font-medium">{filteredData.length}</span> dari <span className="font-medium">{jadwalSiswa.length}</span> jadwal
          </p>
        </div>
      )}
    </div>
  );
};

export default TableJadwalMahasiswa;
