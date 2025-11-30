import { useEffect, useState } from 'react';
import { getAllDosen, createUsers, deleteUsers, updateUsers } from '../../api/Admin/usersApi';
export const useDosen = () => {
  const [dataDosen, setDataDosen] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDosen = async () => {
    setLoading(true);
    try {
      const res = await getAllDosen();
      setDataDosen(res.data);
    } catch (err) {
      console.log(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDosen();
  }, []);

  return { dataDosen, loading, fetchDosen, createUsers, deleteUsers, updateUsers };
};
