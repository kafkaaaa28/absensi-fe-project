import React, { useEffect, useState } from 'react';
import { KelasSiswa, AbsensiSiswa, statusAbsensi, CekDaftarFace } from '../../api/siswa/AbsensiSiswaApi';
const useAbsensi = () => {
  const [dataKelas, setDataKelas] = useState([]);
  const [dataAbsen, setDataAbsen] = useState([]);
  const [statusMap, setStatusMap] = useState({});
  const [loadingKelas, setLoadingkelas] = useState(false);
  const [loadingAbsen, setLoadingAbsen] = useState(false);
  const [error, setError] = useState(null);

  const fetchKelas = async () => {
    setLoadingkelas(true);
    setError(null);
    try {
      const res = await KelasSiswa();
      const { data, success, message } = res.data;

      if (!success) {
        setError(message || 'Gagal mengambil data mata kuliah');
        return;
      }
      setDataKelas(data);
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat mengambil data Kelas');
    } finally {
      setLoadingkelas(false);
    }
  };

  const fetchAbsen = async (idKelas) => {
    if (!idKelas) return;

    setLoadingAbsen(true);
    setError(null);

    try {
      const res = await AbsensiSiswa(idKelas);
      const { success, data, message } = res.data;

      if (!success) {
        setError(message || 'Gagal mengambil data absensi');
        return;
      }

      setDataAbsen(data || []);
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat mengambil data absensi');
    } finally {
      setLoadingAbsen(false);
    }
  };
  const cekFace = async () => {
    try {
      const res = await CekDaftarFace();

      if (res.data && res.data.hasface === true) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  const fetchStatusAbsen = async () => {
    try {
      const res = await statusAbsensi();
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
    fetchKelas();
    fetchStatusAbsen();
  }, []);
  return { dataKelas, dataAbsen, statusMap, loadingAbsen, loadingKelas, error, setStatusMap, fetchAbsen, cekFace, fetchStatusAbsen };
};

export default useAbsensi;
