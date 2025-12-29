import React from 'react';
import { FaCalendarAlt, FaUsers, FaBook, FaClock, FaMapMarkerAlt, FaUserGraduate } from 'react-icons/fa';
import { MdOutlineQrCode2 } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'flowbite-react';
const TabelJadwalHariini = ({ data, statusMap, hariIni, loading, onOpenScan }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white  rounded-lg border mt-4 border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FaCalendarAlt className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">Jadwal Hari Ini</h2>
              <p className="text-gray-600 text-xs">{hariIni}</p>
            </div>
          </div>
          <button onClick={() => navigate('jadwal')} className="text-blue-600 text-xs font-medium hover:text-blue-700">
            Lihat Semua
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2.5 text-left text-gray-700 font-medium">No</th>
              <th className="px-4 py-2.5 text-left text-gray-700 font-medium">Absensi</th>
              <th className="px-4 py-2.5 text-left text-gray-700 font-medium">Status</th>

              <th className="px-4 py-2.5 text-left text-gray-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <FaUsers className="w-3.5 h-3.5" />
                  <span>Kelas</span>
                </div>
              </th>
              <th className="px-4 py-2.5 text-left text-gray-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <FaBook className="w-3.5 h-3.5" />
                  <span>Mata Kuliah</span>
                </div>
              </th>
              <th className="px-4 py-2.5 text-left text-gray-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <FaClock className="w-3.5 h-3.5" />
                  <span>Waktu</span>
                </div>
              </th>
              <th className="px-4 py-2.5 text-left text-gray-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="w-3.5 h-3.5" />
                  <span>Ruang</span>
                </div>
              </th>
              <th className="px-4 py-2.5 text-left text-gray-700 font-medium">
                <div className="flex items-center gap-1.5">
                  <FaUserGraduate className="w-3.5 h-3.5" />
                  <span>Dosen</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Spinner color="info" aria-label="Info spinner example" />
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FaCalendarAlt className="w-8 h-8 text-gray-300 mb-1.5" />
                    <p className="text-gray-500 text-xs font-medium">Tidak ada jadwal hari ini</p>
                    <p className="text-gray-400 text-xs mt-0.5">Silakan cek jadwal lain</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item, index) => {
                const status = statusMap[item.id_kelas] || 'Absen Belum Dibuka';
                return (
                  <tr key={item.id_jadwal} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5">
                      <span className="text-gray-600 text-xs">{index + 1}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button onClick={() => onOpenScan(item)} className="bg-blue-100 text-blue-500 text-sm flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-blue-200">
                          <MdOutlineQrCode2 className="w-6 h-6" /> Scan Prensensi
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div>
                          <span
                            className={`text-xs text-white font-medium px-1.5 py-0.5 rounded ${
                              status === 'hadir' ? 'bg-green-500' : status === 'sakit' ? 'bg-yellow-500' : status === 'izin' ? 'bg-blue-500' : status === 'alpha' ? 'bg-red-500' : 'bg-gray-500'
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                          <FaUsers className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-800 text-xs">{item.nama_kelas}</span>
                      </div>
                    </td>

                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center">
                          <FaBook className="w-3 h-3 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-xs">{item.nama_matkul}</p>
                          <p className="text-gray-500 text-xs">{item.kode_matkul}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-2.5">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-gray-700">{item.hari}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <span className="font-mono text-gray-900">{item.jam_mulai}</span>
                          <span className="text-gray-400">-</span>
                          <span className="font-mono text-gray-900">{item.jam_selesai}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                          <FaMapMarkerAlt className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-gray-700 text-xs">{item.ruang}</span>
                      </div>
                    </td>

                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                          <FaUserGraduate className="w-3 h-3 text-orange-600" />
                        </div>
                        <span className="text-gray-700 text-xs">{item.nama}</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelJadwalHariini;
