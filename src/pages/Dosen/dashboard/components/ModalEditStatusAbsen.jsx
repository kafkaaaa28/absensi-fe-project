import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react';
import { FaUser, FaIdCard, FaClipboardCheck, FaTimes } from 'react-icons/fa';
import { useDosen } from '../../../../hooks/Dosen/useDosen';
import { MdOutlineRefresh } from 'react-icons/md';
const ModalEditStatus = ({ data, onUpdate, modalEditstatus, OnClose, refreshStatus, loadingUpdate }) => {
  const [formData, setFormData] = useState({ ...data });
  const { dataSiswa, fetchSiswa, setDataSiswa } = useDosen();
  const [loadingrefresh, setLoadingrefresh] = useState(false);
  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  useEffect(() => {
    if (modalEditstatus && data?.id_jadwal && data?.id_kelas) {
      fetchSiswa(data.id_kelas, data.id_jadwal);
    }
  }, [modalEditstatus]);
  const refresh = async (e) => {
    e.preventDefault();
    setLoadingrefresh(true);
    try {
      await refreshStatus(data.id_jadwal, data.id_kelas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingrefresh(false);
    }
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...dataSiswa];
    updatedData[index] = { ...updatedData[index], status: newStatus };
    setDataSiswa(updatedData);
  };

  const statusOptions = [
    { value: 'hadir', label: 'Hadir', color: 'bg-green-100 text-green-800' },
    { value: 'izin', label: 'Izin', color: 'bg-blue-100 text-blue-800' },
    { value: 'sakit', label: 'Sakit', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'alpha', label: 'Alpha', color: 'bg-red-100 text-red-800' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(dataSiswa);
  };

  return (
    <Modal show={modalEditstatus} onClose={OnClose} size="xl">
      <ModalHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaClipboardCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Edit Absensi</h3>
              <p className="text-sm text-gray-600">
                {formData.nama_matkul} • {formData.nama_kelas}
              </p>
            </div>
          </div>
        </div>
      </ModalHeader>

      <ModalBody className="px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="overflow-x-auto">
            {dataSiswa.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <FaClipboardCheck className="w-16 h-16 text-gray-300 mb-4" />
                <h4 className="text-gray-700 font-medium mb-2">Belum ada data mahasiswa</h4>
                <p className="text-gray-500 text-sm text-center">Data mahasiswa akan muncul setelah di-refresh</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-2.5 text-left text-gray-700 font-medium">No</th>
                    <th className="px-4 py-2.5 text-left text-gray-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <FaUser className="w-3.5 h-3.5" />
                        <span>Nama</span>
                      </div>
                    </th>
                    <th className="px-4 py-2.5 text-left text-gray-700 font-medium">
                      <div className="flex items-center gap-1.5">
                        <FaIdCard className="w-3.5 h-3.5" />
                        <span>NIM</span>
                      </div>
                    </th>
                    <th className="px-4 py-2.5 text-left text-gray-700 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dataSiswa.map((item, index) => (
                    <tr key={`${item.id_jadwal}-${item.id_siswa}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2.5">
                        <span className="text-gray-600 text-xs">{index + 1}</span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaUser className="w-3 h-3 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-800 text-sm">{item.nama}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">{item.nim}</code>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500" value={item.status} onChange={(e) => handleStatusChange(index, e.target.value)}>
                            {statusOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {dataSiswa.length > 0 && (
            <div className="flex flex-col md:flex-row gap-3  mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={refresh}
                disabled={loadingrefresh}
                className="flex md:w-[50%] items-center justify-center gap-2 bg-blue-600 text-white text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingrefresh ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Memuat...</span>
                  </>
                ) : (
                  <>
                    <MdOutlineRefresh className="w-4 h-4" />
                    <span>Refresh Status</span>
                  </>
                )}
              </button>
              <button type="submit" disabled={loadingUpdate} className="w-full md:w-[50%] bg-blue-600 text-white text-sm font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {loadingUpdate ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Menyimpan perubahan...</span>
                  </div>
                ) : (
                  'Simpan Perubahan'
                )}
              </button>
            </div>
          )}
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalEditStatus;
