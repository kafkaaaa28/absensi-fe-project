import React, { useState, useEffect } from 'react';
import { getKelas, updateKelas, deleteKelas, createKelas, getMahasiswaKelas, createKelasMahasiswa, getKelasMahasiswa, deleteKelasMahasiswa } from '../../api/Admin/kelasApi';
export const useKelas = () => {
  const [dataKelas, setDataKelas] = useState([]);
  const [dataKelasMahasiswa, setDataKelasMahasiswa] = useState([]);
  const [dataMahasiswa, setDataMahasiswa] = useState([]);
  const [loadingKelas, setLoadingKelas] = useState(false);
  const [loadingsiswa, setloadingSiswa] = useState(false);
  const [totalKelas, setTotalKelas] = useState(0);
  const [loadingKelasMahasiswa, setloadingKelasMahasiswa] = useState(false);
  const fetchKelas = async () => {
    setLoadingKelas(true);
    try {
      const res = await getKelas();
      setDataKelas(res.data);
      setTotalKelas(res.data.length);
    } catch (err) {
      console.log(err.res.data.message);
    } finally {
      setLoadingKelas(false);
    }
  };
  const fetchMahasiswa = async (id) => {
    setloadingSiswa(true);
    try {
      const res = await getMahasiswaKelas(id);
      setDataMahasiswa(res.data);
    } catch (err) {
      console.log(err.res.data.message);
    } finally {
      setloadingSiswa(false);
    }
  };
  const fetchKelasMahasiswa = async (id) => {
    setloadingKelasMahasiswa(true);
    try {
      const res = await getKelasMahasiswa(id);
      setDataKelasMahasiswa(res.data);
    } catch (err) {
      console.log(err.res.data.message);
    } finally {
      setloadingKelasMahasiswa(false);
    }
  };
  useEffect(() => {
    fetchKelas();
  }, []);
  return {
    dataKelas,
    dataMahasiswa,
    dataKelasMahasiswa,
    totalKelas,
    loadingsiswa,
    loadingKelas,
    loadingKelasMahasiswa,
    fetchMahasiswa,
    fetchKelas,
    updateKelas,
    deleteKelas,
    createKelas,
    getMahasiswaKelas,
    createKelasMahasiswa,
    fetchKelasMahasiswa,
    deleteKelasMahasiswa,
  };
};
