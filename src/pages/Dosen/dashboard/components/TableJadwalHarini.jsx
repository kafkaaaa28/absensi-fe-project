import React from 'react';
import { Spinner } from 'flowbite-react';
import { FaCalendarAlt, FaBook, FaDoorOpen, FaClock, FaMapMarkerAlt, FaUserGraduate } from 'react-icons/fa';
import { MdOutlineQrCode2 } from 'react-icons/md';
import { TbUserScan } from 'react-icons/tb';
import { CiEdit } from 'react-icons/ci';
const TableJadwalHarini = ({ data, loading, onOpenAbsen, onOpenScanface, onEditAbsen, onOpenQr }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm ">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2.5 text-left text-gray-700 font-medium">No</th>
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
                <span>Absensi</span>
              </div>
            </th>
            <th className="px-4 py-2.5 text-left text-gray-700 font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody>
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
            data.map((item, index) => (
              <tr key={item.id_jadwal} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2.5">
                  <span className="text-gray-600 text-xs">{index + 1}</span>
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
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="bg-green-100 text-green-500 flex items-center text-sm gap-1.5 px-1.5 py-0.5 rounded hover:bg-green-200" onClick={() => onOpenAbsen(item)}>
                      <FaDoorOpen className=" w-6 h-6 " /> Buka Absensi
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="bg-blue-100 flex items-center gap-1.5 text-blue-500 px-1.5 py-0.5 rounded hover:bg-blue-200" onClick={() => onOpenQr(item)}>
                      <MdOutlineQrCode2 className=" w-6 h-6 " /> Qr Code
                    </button>
                    <button className="bg-purple-100 flex items-center gap-1.5 text-purple-500 px-1.5 py-0.5 rounded hover:bg-purple-200" onClick={() => onOpenScanface(item)}>
                      <TbUserScan className=" w-6 h-6 " /> Face Scan
                    </button>
                    <button className="bg-yellow-100 flex items-center gap-1.5 text-yellow-400 px-1.5 py-0.5 rounded hover:bg-yellow-200" onClick={() => onEditAbsen(item)}>
                      <CiEdit className=" w-6 h-6 " /> Edit Absen
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableJadwalHarini;
