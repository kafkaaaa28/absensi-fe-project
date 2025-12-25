import { createContext, useContext, useEffect, useState } from 'react';
import { statusAbsensi } from '../api/siswa/AbsensiSiswaApi';
import { useAuth } from './AuthContext';

const AbsensiContext = createContext(null);

export const AbsensiProvider = ({ children }) => {
  const [statusMap, setStatusMap] = useState({});
  const { user, loading } = useAuth();
  const fetchStatusAbsen = async () => {
    try {
      const res = await statusAbsensi();

      if (res?.data?.data) {
        const map = {};
        res.data.data.forEach((item) => {
          map[item.id_kelas] = item.status;
        });
        setStatusMap(map);
      }
      console.log(statusMap);
    } catch (err) {
      console.error('Gagal ambil status:', err);
    }
  };

  useEffect(() => {
    if (!loading && user?.id_siswa) {
      fetchStatusAbsen();
    }
  }, [loading, user?.id_siswa]);

  return (
    <AbsensiContext.Provider
      value={{
        statusMap,
        setStatusMap,
        fetchStatusAbsen,
      }}
    >
      {children}
    </AbsensiContext.Provider>
  );
};

export const useAbsensi = () => {
  const ctx = useContext(AbsensiContext);
  if (!ctx) throw new Error('useAbsensi harus dipakai di dalam AbsensiProvider');
  return ctx;
};
