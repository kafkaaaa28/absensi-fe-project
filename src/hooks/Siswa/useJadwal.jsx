import { useState, useEffect } from 'react';
import { JadwalSiswa, JadwalSiswaHarini } from '../../api/siswa/JadwalApi';

const useJadwal = () => {
  const [jadwalSiswa, setJadwalSiswa] = useState([]);
  const [jadwalSiswaHariIni, setJadwalSiswaHariIni] = useState([]);
  const [loadingJadwal, setLoadingJadwal] = useState(false);
  const [totalJadwal, setTotalJadwal] = useState(0);
  const [error, setError] = useState(null);
  const fetchJadwalSiswa = async () => {
    setLoadingJadwal(true);
    setError(null);

    try {
      const res = await JadwalSiswa();
      const { success, data, message } = res.data;

      if (!success) {
        setError(message);
        return;
      }

      setJadwalSiswa(data);
    } catch (err) {
      console.log(err);
      setError('Terjadi kesalahan saat mengambil jadwal siswa');
    } finally {
      setLoadingJadwal(false);
    }
  };

  const fetchJadwalHariIni = async () => {
    setLoadingJadwal(true);
    setError(null);

    try {
      const res = await JadwalSiswaHarini();
      const { success, data, message } = res.data;

      if (!success) {
        setError(message || 'Gagal mengambil jadwal hari ini');
        return;
      }

      setJadwalSiswaHariIni(data);

      setTotalJadwal(data.length);
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat mengambil jadwal hari ini');
    } finally {
      setLoadingJadwal(false);
    }
  };
  useEffect(() => {
    fetchJadwalSiswa();
    fetchJadwalHariIni();
  }, []);

  return {
    jadwalSiswa,
    jadwalSiswaHariIni,
    totalJadwal,
    loadingJadwal,
    error,
    fetchJadwalSiswa,
    fetchJadwalHariIni,
  };
};

export default useJadwal;
