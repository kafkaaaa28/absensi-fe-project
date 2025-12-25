import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'flowbite-react';

import { FaUsers, FaBook, FaHashtag, FaTrashAlt, FaSpinner, FaGraduationCap } from 'react-icons/fa';

const ModalShowKelas = ({ data, isOpen, onClose, dataKelasMahasiswa, fetchKelasMahasiswa, onDelete, loading }) => {
  const [formData, setFromData] = useState({ ...data });

  useEffect(() => {
    setFromData({ ...data });
  }, [data]);

  useEffect(() => {
    if (data && data?.id_siswa) {
      fetchKelasMahasiswa(data.id_siswa);
    }
  }, [data]);

  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <ModalHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
            <FaGraduationCap className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{formData.nama || 'Mahasiswa'}</h3>
            <p className="text-sm text-gray-600">
              NIM: {formData.nim} • {dataKelasMahasiswa.length} Kelas
            </p>
          </div>
        </div>
      </ModalHeader>

      <ModalBody className="px-6 py-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaSpinner className="w-8 h-8 text-teal-600 animate-spin mb-3" />
            <p className="text-gray-600 text-sm">Memuat data kelas...</p>
          </div>
        ) : dataKelasMahasiswa.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaBook className="w-16 h-16 text-gray-300 mb-4" />
            <h4 className="text-gray-700 font-medium mb-2">Belum ada kelas</h4>
            <p className="text-gray-500 text-sm text-center">Mahasiswa ini belum terdaftar di kelas manapun</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
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
                      <FaHashtag className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-gray-700 font-medium">Kode</span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left">
                    <span className="text-gray-700 font-medium">Aksi</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dataKelasMahasiswa.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
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
                        <span className="text-gray-700 text-sm">{item.nama_matkul}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">{item.kode_matkul}</code>
                    </td>
                    <td className="px-4 py-3">
                      <button className="flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1.5 rounded hover:bg-red-100 transition-colors border border-red-200 text-xs" onClick={() => onDelete(item)}>
                        <FaTrashAlt className="w-3 h-3" />
                        <span>Hapus</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ModalBody>

      <ModalFooter className="border-t border-gray-200 px-6 py-4">
        <div className="w-full flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Total: <span className="font-medium">{dataKelasMahasiswa.length}</span> kelas
          </span>
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
            Tutup
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ModalShowKelas;
