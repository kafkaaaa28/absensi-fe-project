import { useEffect, useState } from 'react';
import { getAllAsdos, createUsers, deleteUsers, updateUsers } from '../../api/Admin/usersApi';
export const useAsdos = () => {
  const [dataAsdos, setDataAsdos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAsdos = async () => {
    setLoading(true);
    try {
      const res = await getAllAsdos();
      setDataAsdos(res.data);
    } catch (err) {
      console.log(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAsdos();
  }, []);

  return { dataAsdos, loading, fetchAsdos, createUsers, deleteUsers, updateUsers };
};
