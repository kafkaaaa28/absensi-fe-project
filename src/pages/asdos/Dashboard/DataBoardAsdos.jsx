import LoadingPage from '../../../components/common/LoadingPage';
import { useAuth } from '../../../context/AuthContext';
import Databoard from './components/Databoard';
import DataboardCount from './components/DataboardCount';
import DataboardJadwal from './components/DataboardJadwal';
const DataBoardAsdos = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingPage color="#162542" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Databoard />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <DataboardCount />
        <DataboardJadwal />
      </div>
    </div>
  );
};

export default DataBoardAsdos;
