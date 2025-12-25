import React, { useState, useEffect } from 'react';
import { createJadwal, getJadwal, updateJadwal, deleteJadwal } from '../../api/Admin/jadwalApi';
export const useJadwal = () => {
  const [dataJadwal, setDataJadwal] = useState([]);
  const [loadingJadwal, setloading] = useState(false);
  const fetchJadwal = async () => {
    setloading(true);
    try {
      const res = await getJadwal();
      setDataJadwal(res.data);
    } catch (err) {
      console.log(err.res.data.message);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchJadwal();
  }, []);
  return { dataJadwal, loadingJadwal, createJadwal, updateJadwal, deleteJadwal, fetchJadwal };
};
