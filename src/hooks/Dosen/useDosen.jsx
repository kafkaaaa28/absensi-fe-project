import { useEffect, useState } from 'react';
import { getJadwalDosen, getKelasDosen, ApiBukaAbsen, ApiUpdateAbsen, JadwalDosenHariIni, ApiFaceEmbedding, ApiUpdateAbsenFace, getMahasiswa, JadwalDosen } from '../../api/Dosen/DosenApi';
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
  const fetchSiswa = async (idJadwal, idKelas) => {
    try {
      const res = await getMahasiswa(idJadwal, idKelas);
      setDataSiswa(res.data);
    } catch (err) {
      console.log(err);
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

  return { dataSiswa, setDataSiswa, dataJadwal, dataKelas, loading, totalKelas, totalJadwal, fetchJadwal, fetchKelas, ApiBukaAbsen, ApiUpdateAbsen, jadwalharini, ApiFaceEmbedding, ApiUpdateAbsenFace, getMahasiswa, fetchSiswa };
};
