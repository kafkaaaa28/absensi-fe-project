import { useState, useEffect } from 'react';
import { MatkulSiswa } from '../../api/siswa/MatkulApi';

const useMatkul = () => {
  const [matkul, setMatkul] = useState([]);
  const [totalMatkul, setTotalMatkul] = useState(0);
  const [loadingMatkul, setLoadingMatkul] = useState(false);
  const [error, setError] = useState(null);

  const fetchMatkul = async () => {
    setLoadingMatkul(true);
    setError(null);

    try {
      const res = await MatkulSiswa();
      const { success, data, message } = res.data;

      if (!success) {
        setError(message || 'Gagal mengambil data mata kuliah');
        return;
      }

      setMatkul(data);
      setTotalMatkul(data?.length || 0);
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat mengambil data mata kuliah');
    } finally {
      setLoadingMatkul(false);
    }
  };
  useEffect(() => {
    fetchMatkul();
  }, []);
  return {
    matkul,
    totalMatkul,
    loadingMatkul,
    error,
  };
};

export default useMatkul;
