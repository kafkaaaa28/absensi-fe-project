import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const JadwalSiswaHarini = () => {
  const [data, setData] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  const fetchJadwalHarini = async () => {
    try {
      const res = await api.get('/siswa/jadwalharini');
      setData(res.data.data);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  const fetchStatusAbsen = async () => {
    try {
      const res = await api.get('/siswa/statusAbsen');
      const statusObj = {};
      res.data.data.forEach((item) => {
        statusObj[item.id_kelas] = item.status;
      });
      setStatusMap(statusObj);
    } catch (err) {
      console.log('Gagal ambil status:', err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchJadwalHarini();
    fetchStatusAbsen();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">No</th>
            <th className="px-6 py-3">Nama Kelas</th>
            <th className="px-6 py-3">Nama Matakuliah</th>
            <th className="px-6 py-3">Hari</th>
            <th className="px-6 py-3">Ruang</th>
            <th className="px-6 py-3">Dosen</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 bg-white text-gray-500">
                Tidak ada jadwal
              </td>
            </tr>
          ) : (
            data.map((item, index) => {
              const status = statusMap[item.id_kelas] || 'Absen Belum Dibuka';
              return (
                <tr key={item.id_jadwal} className="bg-white border-b border-gray-200 transition">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{item.nama_kelas}</td>
                  <td className="px-6 py-4">
                    {item.kode_matkul} - {item.nama_matkul}
                  </td>
                  <td className="px-6 py-4">
                    {item.hari}/{item.jam_mulai} - {item.jam_selesai}
                  </td>
                  <td className="px-6 py-4">{item.ruang}</td>
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4 font-semibold">
                    <span className={`px-2 py-1 rounded-full text-white ${status === 'hadir' ? 'bg-green-500' : status === 'sakit' ? 'bg-yellow-500' : status === 'izin' ? 'bg-blue-500' : status === 'alpha' ? 'bg-red-500' : 'bg-gray-500'}`}>
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JadwalSiswaHarini;
