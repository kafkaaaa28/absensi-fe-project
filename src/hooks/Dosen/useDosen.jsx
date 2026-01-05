import { useEffect, useState } from 'react';
import {
  getJadwalDosen,
  getKelasDosen,
  ApiBukaAbsen,
  ApiUpdateAbsen,
  JadwalDosenHariIni,
  ApiFaceEmbedding,
  ApiUpdateAbsenFace,
  getMahasiswa,
  getSiswaPerkelas,
  TanggalAbsen,
  AbsenPerKelas,
  GenerateQr,
  getAsdos,
  TambahAsisten,
  DetailAsdos,
  deleteAsdos,
} from '../../api/Dosen/DosenApi';
export const useDosen = () => {
  const [dataSiswa, setDataSiswa] = useState([]);
  const [dataJadwal, setDataJadwal] = useState([]);
  const [jadwalharini, setjadwalharini] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataKelas, setDataKelas] = useState([]);
  const [totalKelas, setTotalKelas] = useState(0);
  const [totalJadwal, setTotalJadwal] = useState(0);
  const [idJadwal, setIdJadwal] = useState(null);
  const [idKelas, setIdKelas] = useState(null);
  const [loadingSiswa, setLoadingSiswa] = useState(false);
  const [dataSiswaPerkelas, setDatasiswaPerkelas] = useState([]);
  const [tanggalAbsen, setTanggalAbsen] = useState([]);
  const [dataAbsenPerkelas, setDataAbsenPerkelas] = useState([]);
  const [tokenQr, setTokenQr] = useState('');
  const [loadingTokenQr, setloadingTokenQr] = useState(false);
  const [dataAsdos, setDataAsdos] = useState([]);
  const [loadingAsdos, setLoadingAsdos] = useState(false);
  const [dataDetailAsdos, setDataDetailAsdos] = useState([]);
  const [loadingDetailAsdos, setLoadingDetailAsdos] = useState(false);
  const fetchJadwal = async () => {
    setLoading(true);
    try {
      const res = await getJadwalDosen();
      setDataJadwal(res.data);
      setTotalJadwal(res.data.length);
    } catch (err) {
      console.log(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchKelas = async () => {
    setLoading(true);
    try {
      const res = await getKelasDosen();
      setDataKelas(res.data);
      setTotalKelas(res.data.length);
    } catch (err) {
      console.log(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchJadwalharini = async () => {
    setLoading(true);
    try {
      const res = await JadwalDosenHariIni();
      setjadwalharini(res.data);
    } catch (err) {
      console.log(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchSiswa = async (idKelas, idJadwal) => {
    try {
      const res = await getMahasiswa(idKelas, idJadwal);
      const { data } = res.data;
      setDataSiswa(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSiswaPerkelas = async (idKelas) => {
    if (!idKelas) return;
    setLoadingSiswa(true);
    try {
      const res = await getSiswaPerkelas(idKelas);
      const { data } = res.data;
      setDatasiswaPerkelas(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSiswa(false);
    }
  };
  const fetchTanggalAbsen = async (idKelas) => {
    if (!idKelas) return;
    try {
      const res = await TanggalAbsen(idKelas);
      const { data } = res.data;
      setTanggalAbsen(data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchAbsenPerkelas = async (idKelas, date) => {
    try {
      const res = await AbsenPerKelas(idKelas, date);
      const { data } = res.data;
      setDataAbsenPerkelas(data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchTokenQr = async (id_kelas, id_jadwal) => {
    setloadingTokenQr(true);
    try {
      const res = await GenerateQr(id_kelas, id_jadwal);
      const { token, expired_in } = res.data;
      setTokenQr(token);
    } catch (err) {
      console.error(err);
    } finally {
      setloadingTokenQr(false);
    }
  };
  const fetchAsdos = async () => {
    setLoadingAsdos(true);
    try {
      const res = await getAsdos();
      const { data } = res.data;
      setDataAsdos(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingAsdos(false);
    }
  };
  const fetchDetailAsdos = async (idKelas, idDosen) => {
    setLoadingDetailAsdos(true);
    try {
      const res = await DetailAsdos(idKelas, idDosen);
      const { data } = res.data;
      setDataDetailAsdos(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingDetailAsdos(false);
    }
  };
  useEffect(() => {
    fetchJadwal();
    fetchKelas();
    fetchJadwalharini();
  }, []);

  useEffect(() => {
    if (idJadwal && idKelas) {
      fetchSiswa(idJadwal, idKelas);
    }
  }, [idJadwal, idKelas]);

  return {
    dataSiswa,
    setDataSiswa,
    dataJadwal,
    dataKelas,
    loading,
    totalKelas,
    totalJadwal,
    dataSiswaPerkelas,
    loadingSiswa,
    tanggalAbsen,
    dataAbsenPerkelas,
    fetchTanggalAbsen,
    fetchAbsenPerkelas,
    fetchSiswaPerkelas,
    fetchJadwal,
    fetchKelas,
    ApiBukaAbsen,
    ApiUpdateAbsen,
    jadwalharini,
    ApiFaceEmbedding,
    ApiUpdateAbsenFace,
    getMahasiswa,
    fetchSiswa,
    getSiswaPerkelas,
    tokenQr,
    fetchTokenQr,
    loadingTokenQr,
    dataAsdos,
    fetchAsdos,
    loadingAsdos,
    TambahAsisten,
    fetchDetailAsdos,
    dataDetailAsdos,
    loadingDetailAsdos,
    deleteAsdos,
  };
};
