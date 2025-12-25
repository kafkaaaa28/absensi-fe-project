import React from 'react';
import { Spinner } from 'flowbite-react';

const TableJadwalHarini = ({ data, loading, onOpenAbsen, onOpenScanface, onEditAbsen }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No
            </th>
            <th scope="col" className="px-6 py-3">
              Nama Matakuliah
            </th>
            <th scope="col" className="px-6 py-3">
              hari
            </th>
            <th scope="col" className="px-6 py-3">
              Ruang
            </th>
            <th scope="col" className="px-6 py-3">
              Absensi
            </th>
            <th scope="col" className="px-6 py-3">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9" className="text-center py-4 bg-white text-gray-500  border-b  border-gray-200 transition">
                <Spinner />
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-4 bg-white text-gray-500 border-b  border-gray-200 transition">
                Tidak ada jadwal
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id_jadwal} className="bg-white border-b  border-gray-200 transition">
                <td className=" px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  {item.kode_matkul}-{item.nama_matkul}
                </td>
                <td className="px-6 py-4">
                  {item.hari} {item.jam_mulai} s/d {item.jam_selesai}
                </td>
                <td className="px-6 py-4">{item.ruang}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-500" onClick={() => onOpenAbsen(item)}>
                      Buka Absensi
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {/* <button className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500" onClick={() => handelbukaScan(item)}>
                      Qr Scan
                    </button> */}
                    <button className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500" onClick={() => onOpenScanface(item)}>
                      Face Scan
                    </button>
                    <button className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500" onClick={() => onEditAbsen(item)}>
                      Edit Absen
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
