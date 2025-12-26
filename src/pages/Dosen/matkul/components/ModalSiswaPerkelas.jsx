import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { FaUsers, FaIdCard, FaCalendar, FaUserGraduate } from 'react-icons/fa';

const ModalSiswaPerkelas = ({ data, showModalSiswa, onClose, dataSiswaPerkelas, fetchSiswaPerkelas, loadingSiswa }) => {
  useEffect(() => {
    if (data?.id_kelas && showModalSiswa) {
      fetchSiswaPerkelas(data.id_kelas);
    }
  }, [data, showModalSiswa]);

  const getTotalMahasiswa = () => dataSiswaPerkelas?.length || 0;

  return (
    <Modal show={showModalSiswa} onClose={onClose} size="xl">
      <ModalHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaUsers className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Daftar Mahasiswa</h3>
              <p className="text-sm text-gray-600">
                {data?.nama_matkul || '-'} • {data?.nama_kelas || '-'}
              </p>
            </div>
          </div>
        </div>
      </ModalHeader>

      <ModalBody className="px-6 py-4">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaUserGraduate className="w-4 h-4 text-gray-600" />
              <h4 className="text-sm font-bold text-gray-800">Ringkasan Kelas</h4>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Mahasiswa</p>
              <p className="text-2xl font-bold text-blue-600">{getTotalMahasiswa()}</p>
            </div>
          </div>
        </div>

        {loadingSiswa ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
              <p className="text-gray-600 text-sm">Memuat data mahasiswa...</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {dataSiswaPerkelas.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FaUsers className="w-16 h-16 text-gray-300 mb-4" />
                <h4 className="text-gray-700 font-medium mb-2">Belum ada mahasiswa</h4>
                <p className="text-gray-500 text-sm text-center">Tidak ada mahasiswa yang terdaftar di kelas ini</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-gray-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <FaUsers className="w-3.5 h-3.5" />
                        <span>Nama</span>
                      </div>
                    </th>
                    <th className="px-4 py-2.5 text-left text-gray-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <FaIdCard className="w-3.5 h-3.5" />
                        <span>NIM</span>
                      </div>
                    </th>
                    <th className="px-4 py-2.5 text-left text-gray-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <FaCalendar className="w-3.5 h-3.5" />
                        <span>Semester</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dataSiswaPerkelas.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaUsers className="w-3 h-3 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-800 text-sm">{item.nama}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">{item.nim}</code>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">Sem {item.semester}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ModalSiswaPerkelas;
