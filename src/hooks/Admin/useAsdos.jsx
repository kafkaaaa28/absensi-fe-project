import { useEffect, useState } from 'react';
import { getAllAsdos, createUsers, deleteUsers, updateUsers } from '../../api/Admin/usersApi';
export const useAsdos = () => {
  const [dataAsdos, setDataAsdos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalAsdos, setTotalAsdos] = useState(false);
  const fetchAsdos = async () => {
    setLoading(true);
    try {
      const res = await getAllAsdos();
      setDataAsdos(res.data.data);
      setTotalAsdos(res.data.data.length);
    } catch (err) {
      console.log(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAsdos();
  }, []);

  return { dataAsdos, loading, totalAsdos, fetchAsdos, createUsers, deleteUsers, updateUsers };
};
