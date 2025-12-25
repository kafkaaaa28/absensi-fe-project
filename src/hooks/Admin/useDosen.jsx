import { useEffect, useState } from 'react';
import { getAllDosen, createUsers, deleteUsers, updateUsers } from '../../api/Admin/usersApi';
export const useDosen = () => {
  const [dataDosen, setDataDosen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalDosen, setTotalDosen] = useState(0);
  const fetchDosen = async () => {
    setLoading(true);
    try {
      const res = await getAllDosen();
      setDataDosen(res.data);
      setTotalDosen(res.data.length);
    } catch (err) {
      console.log(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDosen();
  }, []);

  return { dataDosen, loading, totalDosen, fetchDosen, createUsers, deleteUsers, updateUsers };
};
