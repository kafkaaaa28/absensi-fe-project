import React, { useEffect, useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaBook } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import DataBoard from './components/DataBoard';
import { getAllMahasiswa } from '../../../api/Admin/usersApi';
const DataBoardPage = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  //   const [totalDosen, setTotalDosen] = useState(0);
  //   const [totalMatkul, setTotalMatkul] = useState(0);
  //   const [totalKelas, setTotalKelas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCounts = async () => {
    setLoading(true);
    try {
      const resSiswa = await getAllMahasiswa();
      setTotalUsers(resSiswa.data.length);
      //   const resDosen = await api.get('/users/dosen');
      //   setTotalDosen(resDosen.data.length);
      //   const resKelas = await api.get('/kelas');
      //   setTotalKelas(resKelas.data.length);
      //   const resMatkul = await api.get('/matkul');
      //   setTotalMatkul(resMatkul.data.length);
    } catch (err) {
      setError('Gagal mengambil data: ' + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const Menu = [
    {
      icon: <FaUserGraduate className="w-8 h-8 text-blue-600" />,
      total: totalUsers,
    },
    {
      icon: <FaChalkboardTeacher className="w-8 h-8 text-green-600" />,
      total: 0,
    },
    {
      icon: <FaBook className="w-8 h-8 text-purple-600" />,
      total: 0,
    },
    {
      icon: <MdMeetingRoom className="w-8 h-8 text-yellow-600" />,
      total: 0,
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <DataBoard Menu={Menu} loading={loading} error={error} />
    </div>
  );
};

export default DataBoardPage;
