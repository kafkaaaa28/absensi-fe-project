import React, { useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { FaUsers, FaTrash, FaIdCard, FaCalendar, FaCalendarAlt, FaUser, FaPlus, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ModalDetailAsdos = ({ data, isOpen, onClose, dataDetail, fetchDetailAsdos, loading, onShowTambahAsisten, onShowDeleteAsisten }) => {
  useEffect(() => {
    if (data?.id_kelas && data?.id_dosen && isOpen) {
      fetchDetailAsdos(data.id_kelas, data.id_dosen);
    }
  }, [data, isOpen]);

  return (
    <Modal show={isOpen} onClose={onClose} size="xl">
      <ModalHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col items-center gap-3">
          <div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <FaUsers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Detail Asisten</h3>
              <p className="text-sm text-gray-600">
                {data?.nama_matkul || '-'} • {data?.nama_kelas || '-'}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1.5 rounded hover:bg-purple-200 transition-colors border border-purple-200 text-xs" onClick={() => onShowTambahAsisten(data)}>
            <FaPlus className="w-3 h-3" />
            <span>Tambah Asisten</span>
          </button>
        </div>
      </ModalHeader>

      <ModalBody className="px-6 py-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-10 h-10 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 text-sm font-medium">Memuat data asisten...</p>
          </div>
        ) : dataDetail.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">Belum ada asisten di kelas ini</p>
            <p className="text-gray-500 text-sm mt-2">Tambahkan asisten untuk membantu proses pembelajaran</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataDetail.map((item) => (
              <div key={item.id_asdos} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                      <FaUser className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{item.nama}</h4>
                      <p className="text-gray-600 text-sm mt-0.5">{item.tipe_asdos === 'mahasiswa' ? 'Mahasiswa' : 'Bukan Mahasiswa'}</p>
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'aktif' ? 'bg-green-100 text-green-800' : item.status === 'nonaktif' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {item.status}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                      <FaIdCard className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">NIM</p>
                      <p className="text-sm font-medium text-gray-800">{item.nim || <span className="text-gray-400">-</span>}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                      <FaCalendarAlt className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Semester</p>
                      <p className="text-sm font-medium text-gray-800">{item.semester || <span className="text-gray-400">-</span>}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                      <FaCalendar className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Keterangan</p>
                      <p className="text-sm text-gray-700">Asisten Dosen</p>
                    </div>
                  </div>
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

                  <button className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1.5 rounded hover:bg-red-200 transition-colors border border-red-200 text-xs" onClick={() => onShowDeleteAsisten(item)}>
                    <FaTrash className="w-3 h-3" />
                    <span>Hapus Asisten</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ModalDetailAsdos;
