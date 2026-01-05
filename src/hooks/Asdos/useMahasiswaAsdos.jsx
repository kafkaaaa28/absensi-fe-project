import { useState, useEffect } from 'react';
import { getSiswaPerkelasAsdos, getAbsensiMahasiswaAsdos } from '../../api/Asdos/MahasiswaAsdosApi';
export const useMahasiswaAsdos = () => {
  const [dataMahasiswaPerkelas, setdataMahasiswaPerkelas] = useState([]);
  const [loadingMahasiswa, setloadingMahasiswa] = useState(false);
  const [dataAbsensiPerkelas, setDataAbsensiPerkelas] = useState([]);
  const fetchdataMahasiswa = async (idKelas) => {
    setloadingMahasiswa(true);
    try {
      const res = await getSiswaPerkelasAsdos(idKelas);
      const { data } = res.data;
      setdataMahasiswaPerkelas(data);
    } catch (err) {
      console.log(err.response?.data?.message);
    } finally {
      setloadingMahasiswa(false);
    }
  };
  const fetchAbsensiMahasiswa = async (idKelas, tanggal) => {
    setloadingMahasiswa(true);
    try {
      const res = await getAbsensiMahasiswaAsdos(idKelas, tanggal);
      const { data } = res.data;
      setDataAbsensiPerkelas(data);
    } catch (err) {
      console.log(err.res.data.message);
    } finally {
      setloadingMahasiswa(false);
    }
  };
  return { loadingMahasiswa, fetchdataMahasiswa, dataMahasiswaPerkelas, fetchAbsensiMahasiswa, dataAbsensiPerkelas };
};
