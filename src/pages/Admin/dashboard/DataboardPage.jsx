import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaUserTie } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import DataBoard from './components/DataBoard';
import DataCount from './components/DataCount';
import DataSistem from './components/DataSistem';
import { useDosen } from '../../../hooks/Admin/useDosen';
import { useMahasiswa } from '../../../hooks/Admin/useMahasiswa';
import { useMatkul } from '../../../hooks/Admin/useMatkul';
import { useAsdos } from '../../../hooks/Admin/useAsdos';
import { useKelas } from '../../../hooks/Admin/useKelas';
import LoadingPage from '../../../components/common/LoadingPage';
import { useAuth } from '../../../context/AuthContext';
const DataBoardPage = () => {
  const { loading } = useAuth();
  const { totalMahasiswa } = useMahasiswa();
  const { totalDosen } = useDosen();
  const { totalMatkul } = useMatkul();
  const { totalAsdos } = useAsdos();
  console.log(totalAsdos);
  const { totalKelas } = useKelas();

  const Menu = [
    {
      Name: 'Mahasiswa',
      link: 'mahasiswa',
      icon: <FaUserGraduate className="w-8 h-8 text-blue-600" />,
      total: totalMahasiswa,
    },
    {
      Name: 'Dosen',
      link: 'dosen',
      icon: <FaChalkboardTeacher className="w-8 h-8 text-green-600" />,
      total: totalDosen,
    },
    {
      Name: 'Mata Kuliah',
      link: 'matkul',
      icon: <FaBook className="w-8 h-8 text-purple-600" />,
      total: totalMatkul,
    },
    {
      Name: 'Kelas',
      link: 'kelas',
      icon: <MdMeetingRoom className="w-8 h-8 text-yellow-600" />,
      total: totalKelas,
    },
    {
      Name: 'Asisten Dosen',
      link: 'asdos',
      icon: <FaUserTie className="w-8 h-8 text-red-600" />,
      total: totalAsdos,
    },
  ];
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingPage color="#162542" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 ">
      <DataBoard />
      <DataCount Menu={Menu} />
      <DataSistem />
    </div>
  );
};

export default DataBoardPage;
