import { useState, useEffect } from 'react';
import { getKelasAsdos, UpdateApproval } from '../../api/Asdos/KelasAsdosApi';
export const useKelasAsdos = () => {
  const [dataKelasAsdos, setDataKelasAsdos] = useState([]);
  const [loadingKelas, setLoadingKelas] = useState(false);
  const fetchKelasAsdos = async () => {
    setLoadingKelas(true);
    try {
      const res = await getKelasAsdos();
      const { data } = res.data;
      setDataKelasAsdos(data);
    } catch (err) {
      console.log(err.res.data.message);
    } finally {
      setLoadingKelas(false);
    }
  };
  return { fetchKelasAsdos, dataKelasAsdos, UpdateApproval, loadingKelas };
};
