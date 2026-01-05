import { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react';
import { PiScanSmiley } from 'react-icons/pi';
import { FaCalendarAlt, FaUsers, FaSearch, FaIdCard, FaClipboardCheck, FaQrcode } from 'react-icons/fa';

const ModalLihatAbsenPerkelas = ({ data, showModalAbsen, dataAbsenPerkelas, tanggalAbsen, fetchTanggalAbsen, onFetchAbsen, resetForm, postTanggal, handleChange, loading, onShowUpdate }) => {
  useEffect(() => {
    if (data?.id_kelas) {
      fetchTanggalAbsen(data.id_kelas);
    }
  }, [data]);
  const fetchAllAbsen = async (e) => {
    e.preventDefault();
    onFetchAbsen(data.id_kelas);
  };
  const getMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'qr':
        return <FaQrcode className="w-4 h-4" />;
      case 'face':
        return <PiScanSmiley className="w-4 h-4" />;
      default:
        return <FaClipboardCheck className="w-4 h-4" />;
    }
  };
  const getStatusColor = (status) => {
    const colors = {
      hadir: 'bg-green-100 text-green-800 border-green-200',
      sakit: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      izin: 'bg-blue-100 text-blue-800 border-blue-200',
      alpha: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const calculateStats = () => {
    const list = dataAbsenPerkelas || [];

    return {
      total: list.length,
      hadir: list.filter((a) => a.status === 'hadir').length,
      izin: list.filter((a) => a.status === 'izin').length,
      sakit: list.filter((a) => a.status === 'sakit').length,
      alpha: list.filter((a) => a.status === 'alpha').length,
    };
  };

  const stats = calculateStats();
  const statusOptions = [
    { value: 'hadir', label: 'Hadir', color: 'bg-green-100 text-green-800' },
    { value: 'izin', label: 'Izin', color: 'bg-blue-100 text-blue-800' },
    { value: 'sakit', label: 'Sakit', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'alpha', label: 'Alpha', color: 'bg-red-100 text-red-800' },
  ];
  return (
    <Modal show={showModalAbsen} onClose={resetForm} size="3xl">
      <ModalHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaClipboardCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Rekap Absensi</h3>
              <p className="text-sm text-gray-600">
                {data?.nama_matkul} • {data?.nama_kelas}
              </p>
            </div>
          </div>
        </div>
      </ModalHeader>

      <ModalBody className="px-6 py-4">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <FaCalendarAlt className="w-4 h-4 text-gray-600" />
            <h4 className="text-sm font-bold text-gray-800">Filter Absensi</h4>
          </div>

          <form onSubmit={fetchAllAbsen}>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="w-4 h-4 text-gray-400" />
                  </div>
                  <select
                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    onChange={handleChange}
                    name="tanggal"
                    value={postTanggal.tanggal}
                  >
                    <option value="">Pilih tanggal</option>
                    {tanggalAbsen.map((waktu, index) => (
                      <option key={index} value={waktu.tanggal}>
                        {waktu.tanggal
                          ? new Date(waktu.tanggal).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })
                          : 'Tidak tersedia'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Memuat...</span>
                  </>
                ) : (
                  <>
                    <FaSearch className="w-4 h-4" />
                    <span>Cari Absensi</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {dataAbsenPerkelas.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <FaUsers className="w-4 h-4 text-gray-600" />
              <h4 className="text-sm font-bold text-gray-800">Statistik Kehadiran</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-gray-800">{stats.total}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-600">{stats.hadir}</div>
                <div className="text-xs text-gray-600">Hadir</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-600">{stats.izin}</div>
                <div className="text-xs text-gray-600">Izin</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-yellow-600">{stats.sakit}</div>
                <div className="text-xs text-gray-600">Sakit</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-red-600">{stats.alpha}</div>
                <div className="text-xs text-gray-600">Alpha</div>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          {dataAbsenPerkelas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <FaClipboardCheck className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm font-medium">{postTanggal.tanggal ? 'Tidak ada data dataAbsenPerkelas' : 'Pilih tanggal untuk melihat dataAbsenPerkelas'}</p>
              <p className="text-gray-400 text-xs mt-1">{postTanggal.tanggal ? 'Belum ada mahasiswa yang absen' : 'Pilih tanggal dari dropdown di atas'}</p>
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
                  <th className="px-4 py-2.5 text-left text-gray-700 font-medium">Status</th>
                  <th className="px-4 py-2.5 text-left text-gray-700 font-medium">Metode</th>
                  <th className="px-4 py-2.5 text-left text-gray-700 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dataAbsenPerkelas.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5">
                      <p className="text-gray-800 text-sm font-medium">{item.nama}</p>
                    </td>
                    <td className="px-4 py-2.5">
                      <code className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-mono">{item.nim}</code>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status === 'hadir'}
                        {item.status === 'sakit'}
                        {item.status === 'izin'}
                        {item.status === 'alpha'}
                        <span className="capitalize">{item.status}</span>
                      </span>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="text-gray-600">{getMethodIcon(item.method)}</div>
                        <span className="text-gray-700 text-xs capitalize">{item.method || '-'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <select
                          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                          value={item.status}
                          onChange={(e) => {
                            onShowUpdate({
                              ...item,
                              status: e.target.value,
                            });
                          }}
                        >
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
      </ModalBody>

      <ModalFooter className="border-t border-gray-200 px-6 py-4">
        <div className="w-full flex justify-between items-center">
          <div className="text-xs text-gray-500">{dataAbsenPerkelas.length > 0 && <span>Menampilkan {dataAbsenPerkelas.length} mahasiswa</span>}</div>
          <button onClick={resetForm} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
            Tutup
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ModalLihatAbsenPerkelas;
