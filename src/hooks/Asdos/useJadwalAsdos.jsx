import { useState } from 'react';
import { getJadwalAsdos, getJadwalAsdosHariini, TanggalAbsenAsdos } from '../../api/Asdos/JadwalAsdosApi';
export const useJadwalAsdos = () => {
  const [dataJadwalAsdos, setDataJadwalAsdos] = useState([]);
  const [loadingJadwal, setLoadingJadwal] = useState(false);
  const [dataJadwalAsdosHariini, setDataJadwalAsdosHariini] = useState([]);
  const [tanggalAbsen, setTanggalAbsen] = useState([]);

  const fetchJadwalAsdosHariini = async () => {
    setLoadingJadwal(true);
    try {
      const res = await getJadwalAsdosHariini();
      const { data } = res.data;
      setDataJadwalAsdosHariini(data);
    } catch (err) {
      console.log(err.res.data.message);
    } finally {
      setLoadingJadwal(false);
    }
  };
  const fetchJadwalAsdos = async () => {
    setLoadingJadwal(true);
    try {
      const res = await getJadwalAsdos();
      const { data } = res.data;
      setDataJadwalAsdos(data);
    } catch (err) {
      console.log(err.res.data.message);
    } finally {
      setLoadingJadwal(false);
    }
  };
  const fetchTanggalAbsen = async (idKelas) => {
    if (!idKelas) return;
    try {
      const res = await TanggalAbsenAsdos(idKelas);
      const { data } = res.data;
      setTanggalAbsen(data);
    } catch (err) {
      console.error(err);
    }
  };
  return { fetchJadwalAsdos, dataJadwalAsdos, loadingJadwal, dataJadwalAsdosHariini, fetchJadwalAsdosHariini, fetchTanggalAbsen, tanggalAbsen };
};
