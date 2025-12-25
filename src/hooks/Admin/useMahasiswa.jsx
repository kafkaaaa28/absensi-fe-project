import { useEffect, useState } from 'react';
import { getAllMahasiswa, createUsers, deleteUsers, updateUsers, deleteFaceMahasiswa } from '../../api/Admin/usersApi';

export const useMahasiswa = () => {
  const [dataMahasiswa, setDataMahasiswa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalMahasiswa, setTotalMahasiswa] = useState(0);
  const fetchMahasiswa = async () => {
    setLoading(true);
    try {
      const res = await getAllMahasiswa();
      setDataMahasiswa(res.data);
      setTotalMahasiswa(res.data.length);
    } catch (err) {
      console.log(err.res.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMahasiswa();
  }, []);

  return { dataMahasiswa, loading, totalMahasiswa, fetchMahasiswa, createUsers, deleteUsers, updateUsers, deleteFaceMahasiswa };
};
