import React from 'react';
import { FaBook, FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaUserGraduate } from 'react-icons/fa';

const TabelKelasAsdos = ({ data, searchTerm, onApproveClick }) => {
  const filteredData = data.filter(
    (item) => (item.nama_matkul || '').toLowerCase().includes(searchTerm.toLowerCase()) || (item.nama_kelas || '').toLowerCase().includes(searchTerm.toLowerCase()) || (item.kode_matkul || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
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
                <div className="flex items-center gap-2">
                  <FaChalkboardTeacher className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Dosen</span>
                </div>
              </th>
              <th scope="col" className="px-3 py-2.5 text-left">
                <span className="text-gray-700 font-medium">Status</span>
              </th>
              <th scope="col" className="px-3 py-2.5 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-700 font-medium">Aksi</span>
                </div>
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
                <tr key={item.id_kelas} className="hover:bg-gray-50 transition-colors">
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
                        <p className="font-medium text-gray-800 text-xs">
                          {item.kode_matkul}-{item.nama_matkul}
                        </p>
                        <p className="text-gray-500 text-xs">{item.sks || '3'} SKS</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">Sem {item.semester}</span>
                  </td>

                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-green-100 rounded flex items-center justify-center">
                        <FaUserGraduate className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{item.nama}</span>
                    </div>
                  </td>

                  <td className="p-3">
                    <div
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        item.approval_status === 'disetujui' ? 'bg-green-100 text-green-800' : item.approval_status === 'ditolak' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {item.approval_status === 'disetujui' ? (
                        <>
                          <FaCheckCircle className="w-3 h-3" /> Disetujui
                        </>
                      ) : item.approval_status === 'ditolak' ? (
                        <>
                          <FaTimesCircle className="w-3 h-3" /> Ditolak
                        </>
                      ) : (
                        <>
                          <FaClock className="w-3 h-3" /> Pending
                        </>
                      )}
                    </div>
                  </td>

                  <td className="p-3">
                    <button onClick={() => onApproveClick(item)} className="text-blue-600 hover:underline">
                      Kelola
                    </button>
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

export default TabelKelasAsdos;
