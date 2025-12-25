import React from 'react';
import { FaRegEdit, FaRegTrashAlt, FaEye, FaUsers, FaBook, FaUserGraduate, FaBuilding, FaHashtag, FaChalkboardTeacher } from 'react-icons/fa';

const Kelas = ({ data, search, onEdit, onDelete, onShowSiswa }) => {
  const filtered = data.filter((m) => m.nama_matkul.toLowerCase().includes(search.toLowerCase()));

  // Fungsi untuk menentukan warna berdasarkan kapasitas
  const getKapasitasColor = (kapasitas) => {
    const capacity = parseInt(kapasitas);
    if (capacity >= 50) return 'bg-red-100 text-red-800';
    if (capacity >= 30) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

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
                  <FaUsers className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Kelas</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaBook className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Mata Kuliah</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaBuilding className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Kapasitas</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaHashtag className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Kode</span>
                </div>
              </th>
              <th scope="col" className="px-4 py-3 text-left">
                <div className="flex items-center gap-2">
                  <FaChalkboardTeacher className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Dosen</span>
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
                <td colSpan="7" className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FaUsers className="w-8 h-8 text-gray-300 mb-1" />
                    <p className="text-gray-500 text-xs font-medium">{data.length === 0 ? 'Tidak ada kelas' : 'Data tidak ditemukan'}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{search ? 'Coba kata kunci lain' : 'Semua kelas akan muncul di sini'}</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <span className="text-gray-600">{index + 1}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-blue-100 rounded flex items-center justify-center">
                        <FaUsers className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-800 text-sm">{item.nama_kelas}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-purple-100 rounded flex items-center justify-center">
                        <FaBook className="w-3.5 h-3.5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{item.nama_matkul}</p>
                        <p className="text-gray-500 text-xs">ID: {item.id_matkul}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getKapasitasColor(item.kapasitas)}`}>{item.kapasitas} siswa</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">{item.kode_matkul}</code>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-green-100 rounded flex items-center justify-center">
                        <FaUserGraduate className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{item.nama}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2.5 py-1.5 rounded hover:bg-blue-100 transition-colors border border-blue-200 text-xs" onClick={() => onEdit(item)}>
                        <FaRegEdit className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button className="flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1.5 rounded hover:bg-red-100 transition-colors border border-red-200 text-xs" onClick={() => onDelete(item)}>
                        <FaRegTrashAlt className="w-3 h-3" />
                        <span>Hapus</span>
                      </button>
                      <button className="flex items-center gap-1 bg-green-50 text-green-600 px-2.5 py-1.5 rounded hover:bg-green-100 transition-colors border border-green-200 text-xs" onClick={() => onShowSiswa(item)}>
                        <FaEye className="w-3 h-3" />
                        <span className="hidden sm:inline">Siswa</span>
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

export default Kelas;
