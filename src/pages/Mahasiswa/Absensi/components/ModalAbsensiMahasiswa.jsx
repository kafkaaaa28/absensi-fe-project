import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react';
import { FaCalendarAlt, FaClipboardCheck, FaChartPie, FaTimes } from 'react-icons/fa';

const ModalAbsensiSiswa = ({ dataAbsen, isOpen, Kelas, loadingAbsen, onClose, fetchAbsen, getStatusColor, getMethodIcon }) => {
  const [formData, setFormData] = useState({ ...Kelas });

  useEffect(() => {
    if (Kelas) {
      setFormData({ ...Kelas });
    }
  }, [Kelas]);

  useEffect(() => {
    if (formData.id_kelas) {
      fetchAbsen(formData.id_kelas);
    }
  }, [formData.id_kelas]);

  const calculateStats = () => {
    const total = dataAbsen.length;
    const hadir = dataAbsen.filter((a) => a.status === 'hadir').length;
    const izin = dataAbsen.filter((a) => a.status === 'izin').length;
    const sakit = dataAbsen.filter((a) => a.status === 'sakit').length;
    const alpha = dataAbsen.filter((a) => a.status === 'alpha').length;

    return {
      total,
      hadir,
      izin,
      sakit,
      alpha,
      percentage: total > 0 ? Math.round((hadir / total) * 100) : 0,
    };
  };

  const stats = calculateStats();

  return (
    <Modal show={isOpen} onClose={onClose} size="lg">
      <ModalHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaClipboardCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Absensi Saya</h3>
              <p className="text-sm text-gray-600">
                {formData.nama_matkul} • {formData.nama_kelas}
              </p>
            </div>
          </div>
        </div>
      </ModalHeader>

      <ModalBody className="px-6 py-4">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaChartPie className="w-4 h-4 text-gray-600" />
              <h4 className="text-sm font-bold text-gray-800">Rekap Absensi</h4>
            </div>
            <span className="text-xs text-gray-500">{stats.total} pertemuan</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">{stats.hadir}</div>
              <div className="text-xs text-gray-600">Hadir</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{stats.izin}</div>
              <div className="text-xs text-gray-600">Izin</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-600">{stats.sakit}</div>
              <div className="text-xs text-gray-600">Sakit</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-600">{stats.alpha}</div>
              <div className="text-xs text-gray-600">Alpha</div>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600">Persentase Kehadiran</span>
              <span className="font-medium">{stats.percentage}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${stats.percentage}%` }}></div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loadingAbsen ? (
            <div className="flex justify-center items-center py-8">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
                <p className="text-gray-600 text-xs">Memuat Kelas absensi...</p>
              </div>
            </div>
          ) : dataAbsen.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <FaCalendarAlt className="w-12 h-12 text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm font-medium">Belum ada Kelas absensi</p>
              <p className="text-gray-400 text-xs mt-1">Absensi akan muncul setelah perkuliahan</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2.5 text-left text-gray-700 font-medium">
                    <div className="flex items-center gap-1.5">
                      <FaCalendarAlt className="w-3.5 h-3.5" />
                      <span>Tanggal</span>
                    </div>
                  </th>
                  <th className="px-4 py-2.5 text-left text-gray-700 font-medium">Status</th>
                  <th className="px-4 py-2.5 text-left text-gray-700 font-medium">Metode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dataAbsen.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="space-y-0.5">
                        <p className="text-gray-800 text-xs font-medium">
                          {item.tanggal
                            ? new Date(item.tanggal).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })
                            : '-'}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                        <span className="capitalize">{item.status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="text-gray-600">{getMethodIcon(item.method)}</div>
                        <span className="text-gray-700 text-xs capitalize">{item.method || '-'}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </ModalBody>

      {/* Modal Footer */}
      <ModalFooter className="border-t border-gray-200 px-6 py-4">
        <div className="w-full flex justify-between items-center">
          <div className="text-xs text-gray-500">Terakhir update: {new Date().toLocaleDateString('id-ID')}</div>
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
            Tutup
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ModalAbsensiSiswa;
