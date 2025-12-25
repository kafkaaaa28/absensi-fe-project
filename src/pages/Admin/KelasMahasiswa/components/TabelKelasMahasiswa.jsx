import React from 'react';
import { FaUser, FaIdCard, FaListAlt, FaSpinner } from 'react-icons/fa';

const TabelKelasMahasiswa = ({ dataMahasiswa, search, onShowKelas }) => {
  const filtered = dataMahasiswa.filter((item) => (item.nim || '').toLowerCase().includes(search.toLowerCase()) || (item.nama || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">
                <span className="text-gray-700 font-medium">No</span>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaUser className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Nama</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaIdCard className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">NIM</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <span className="text-gray-700 font-medium">Aksi</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FaUser className="w-8 h-8 text-gray-300 mb-1" />
                    <p className="text-gray-500 text-xs font-medium">{dataMahasiswa.length === 0 ? 'Tidak ada mahasiswa' : 'Data tidak ditemukan'}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{search ? 'Coba kata kunci lain' : 'Semua mahasiswa akan muncul di sini'}</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((item, index) => (
                <tr key={item.id_user} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-gray-600">{index + 1}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-blue-100 rounded flex items-center justify-center">
                        <FaUser className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-800 text-sm">{item.nama}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">{item.nim}</code>
                  </td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded hover:bg-green-100 transition-colors border border-green-200 text-xs" onClick={() => onShowKelas(item)}>
                      <FaListAlt className="w-3 h-3" />
                      <span>Lihat Kelas</span>
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

export default TabelKelasMahasiswa;
