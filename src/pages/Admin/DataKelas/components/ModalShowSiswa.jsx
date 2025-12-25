import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'flowbite-react';
import { useKelas } from '../../../../hooks/Admin/useKelas';
import { FaUser, FaIdCard, FaUniversity, FaGraduationCap, FaUsers, FaSpinner } from 'react-icons/fa';

const ModalShowSiswa = ({ isOpen, data, onClose }) => {
  const { dataMahasiswa, fetchMahasiswa, loadingsiswa } = useKelas();
  const [selectedKelas, setselectedKelas] = useState({ ...data });

  useEffect(() => {
    if (data) {
      setselectedKelas({ ...data });
    }
  }, [data]);

  useEffect(() => {
    if (isOpen && data?.id_kelas) {
      fetchMahasiswa(data.id_kelas);
    }
  }, [isOpen]);

  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <ModalHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <FaUsers className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{selectedKelas.nama_matkul || 'Mata Kuliah'}</h3>
            <p className="text-sm text-gray-600">
              Kelas: {selectedKelas.nama_kelas} • {dataMahasiswa.length} Mahasiswa
            </p>
          </div>
        </div>
      </ModalHeader>

      <ModalBody className="px-6 py-4">
        {loadingsiswa ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaSpinner className="w-8 h-8 text-blue-600 animate-spin mb-3" />
            <p className="text-gray-600 text-sm">Memuat data mahasiswa...</p>
          </div>
        ) : dataMahasiswa.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaUsers className="w-16 h-16 text-gray-300 mb-4" />
            <h4 className="text-gray-700 font-medium mb-2">Belum ada mahasiswa</h4>
            <p className="text-gray-500 text-sm text-center">Tidak ada mahasiswa yang terdaftar di kelas ini</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
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
                    <div className="flex items-center gap-2">
                      <FaUniversity className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-gray-700 font-medium">Fakultas</span>
                    </div>
                  </th>
                  <th scope="col" className="px-4 py-3 text-left">
                    <div className="flex items-center gap-2">
                      <FaGraduationCap className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-gray-700 font-medium">Prodi</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dataMahasiswa.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
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
                      <span className="text-gray-700 text-sm">{item.fakultas}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-700 text-sm">{item.prodi}</span>
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
            Total: <span className="font-medium">{dataMahasiswa.length}</span> mahasiswa
          </span>
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
            Tutup
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ModalShowSiswa;
