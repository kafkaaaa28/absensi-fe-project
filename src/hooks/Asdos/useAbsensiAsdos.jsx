import { useEffect, useState } from 'react';
import { ApiBukaAbsenAsdos, ApiUpdateAbsenAsdos, ApiFaceEmbeddingAsdos, ApiUpdateAbsenFaceAsdos, getMahasiswaAsdos, GenerateQrAsdos } from '../../api/Asdos/AbsensiAsdosApi';
export const useAbsensiAsdos = () => {
  const [dataSiswaAbsenHariini, setDataSiswaAbsenHariini] = useState([]);
  const [loadingSiswa, setLoadingSiswa] = useState(false);
  const [tokenQr, setTokenQr] = useState('');
  const [loadingTokenQr, setloadingTokenQr] = useState(false);

  const fetchAbsenSiswaHariini = async (idKelas, idJadwal) => {
    setLoadingSiswa(true);
    try {
      const res = await getMahasiswaAsdos(idKelas, idJadwal);
      const { data } = res.data;
      setDataSiswaAbsenHariini(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSiswa(false);
    }
  };

  const fetchTokenQr = async (id_kelas, id_jadwal) => {
    setloadingTokenQr(true);
    try {
      const res = await GenerateQrAsdos(id_kelas, id_jadwal);
      const { token, expired_in } = res.data;
      setTokenQr(token);
    } catch (err) {
      console.error(err);
    } finally {
      setloadingTokenQr(false);
    }
  };

  return {
    ApiBukaAbsenAsdos,
    ApiFaceEmbeddingAsdos,
    ApiUpdateAbsenFaceAsdos,
    loadingTokenQr,
    fetchTokenQr,
    tokenQr,
    loadingSiswa,
    fetchAbsenSiswaHariini,
    setDataSiswaAbsenHariini,
    dataSiswaAbsenHariini,
    ApiUpdateAbsenAsdos,
  };
};
