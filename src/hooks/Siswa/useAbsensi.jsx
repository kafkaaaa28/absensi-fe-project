import React, { useEffect, useState } from 'react';
import { KelasSiswa, AbsensiSiswa, statusAbsensi, CekDaftarFace, ApiUpdateAbsenQr } from '../../api/siswa/AbsensiSiswaApi';
const useAbsensi = () => {
  const [dataKelas, setDataKelas] = useState([]);
  const [dataAbsen, setDataAbsen] = useState([]);
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
      if (res.data.hasFace === true && res.data.success === true) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    fetchKelas();
  }, []);
  return { dataKelas, dataAbsen, loadingAbsen, loadingKelas, error, fetchAbsen, cekFace, ApiUpdateAbsenQr };
};

export default useAbsensi;
