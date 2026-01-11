import { useEffect, useState } from 'react';
import { getAllMahasiswa, createUsers, deleteUsers, updateUsers, deleteFaceMahasiswa, getTotalUser } from '../../api/Admin/usersApi';

export const useMahasiswa = () => {
  const [dataMahasiswa, setDataMahasiswa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalMahasiswa, setTotalMahasiswa] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [loadingTotalUser, setLoadingTotalUser] = useState(false);
  const fetchTotalUser = async () => {
    setLoadingTotalUser(true);
    try {
      const res = await getTotalUser();
      const { data } = res.data;
      setTotalUser(data);
    } catch (err) {
      console.log(err.res.data.message);
    } finally {
      setLoadingTotalUser(false);
    }
  };

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

  return { dataMahasiswa, loading, totalMahasiswa, fetchMahasiswa, createUsers, deleteUsers, updateUsers, deleteFaceMahasiswa, fetchTotalUser, loadingTotalUser, totalUser };
};
