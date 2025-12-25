import React, { useEffect, useState } from 'react';
import { getMatkul, updateMatkul, deleteMatkul, createMatkul } from '../../api/Admin/matkulApi';
export const useMatkul = () => {
  const [dataMatkul, setDataMatkul] = useState([]);
  const [loadingMatkul, setLoadingMatkul] = useState(false);
  const [totalMatkul, setTotalMatkul] = useState(0);
  const fetchMatkul = async () => {
    setLoadingMatkul(true);
    try {
      const res = await getMatkul();
      setDataMatkul(res.data.data);
      setTotalMatkul(res.data.data.length);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingMatkul(false);
    }
  };
  useEffect(() => {
    fetchMatkul();
  }, []);
  return {
    dataMatkul,
    loadingMatkul,
    totalMatkul,
    updateMatkul,
    deleteMatkul,
    createMatkul,
    fetchMatkul,
  };
};
