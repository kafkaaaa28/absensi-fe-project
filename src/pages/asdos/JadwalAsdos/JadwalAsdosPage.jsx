import { useEffect, useState } from 'react';
import { useJadwalAsdos } from '../../../hooks/Asdos/useJadwalAsdos';
import { FaSearch } from 'react-icons/fa';
import TabelJadwalAsdos from './components/TabelJadwalAsdos';
import LoadingPage from '../../../components/common/LoadingPage';
import { useAuth } from '../../../context/AuthContext';
import { useMahasiswaAsdos } from '../../../hooks/Asdos/useMahasiswaAsdos';
import ModalSiswaPerkelasAsdos from './components/ModalSiswaPerkelasAsdos';
import ModalAbsenPerkelasAsdos from './components/ModalAbsenPerkelasAsdos';
import { ErrAlert, warningAlert } from '../../../utils/alerts';
const JadwalAsdosPage = () => {
  const { dataJadwalAsdos, fetchJadwalAsdos, loadingJadwal, tanggalAbsen, fetchTanggalAbsen } = useJadwalAsdos();
  const { loadingMahasiswa, fetchdataMahasiswa, dataMahasiswaPerkelas, fetchAbsensiMahasiswa, dataAbsensiPerkelas } = useMahasiswaAsdos();
  const { loading } = useAuth();
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [showMahasiswa, setShowMahasiswa] = useState(false);
  const [showAbsensi, setShowAbsensi] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [postTanggal, setPostTanggal] = useState({ tanggal: '' });
  const [loadingAbsen, setLoading] = useState(false);
  useEffect(() => {
    fetchJadwalAsdos();
  }, []);
  const handleChange = (e) => {
    setPostTanggal({ ...postTanggal, [e.target.name]: e.target.value });
  };
  const getHariColor = (hari) => {
    const colors = {
      senin: 'bg-blue-100 text-blue-800',
      selasa: 'bg-green-100 text-green-800',
      rabu: 'bg-yellow-100 text-yellow-800',
      kamis: 'bg-purple-100 text-purple-800',
      jumat: 'bg-red-100 text-red-800',
      sabtu: 'bg-indigo-100 text-indigo-800',
      minggu: 'bg-gray-100 text-gray-800',
    };
    return colors[hari?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingPage color="#162542" />
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Jadwal Asisten Dosen</h2>
        </div>

        <div className="w-full md:w-64">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Cari mata kuliah..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full transition-all"
            />
          </div>
        </div>
      </div>
      <TabelJadwalAsdos
        data={dataJadwalAsdos}
        loading={loadingJadwal}
        getHariColor={getHariColor}
        searchTerm={searchTerm}
        onShowMahasiswa={(row) => {
          setSelectedJadwal(row);
          setShowMahasiswa(true);
        }}
        onShowAbsensi={(row) => {
          setSelectedJadwal(row);
          setShowAbsensi(true);
        }}
      />
      <ModalSiswaPerkelasAsdos data={selectedJadwal} showModalSiswa={showMahasiswa} onClose={() => setShowMahasiswa(false)} dataSiswaPerkelas={dataMahasiswaPerkelas} fetchSiswaPerkelas={fetchdataMahasiswa} loadingSiswa={loadingMahasiswa} />
      <ModalAbsenPerkelasAsdos
        data={selectedJadwal}
        showModalAbsen={showAbsensi}
        dataAbsenPerkelas={dataAbsensiPerkelas}
        tanggalAbsen={tanggalAbsen}
        fetchTanggalAbsen={fetchTanggalAbsen}
        handleChange={handleChange}
        onClose={() => setShowAbsensi(false)}
        onFetchAbsen={async (data) => {
          if (!postTanggal.tanggal) {
            warningAlert('Silahkan pilih tanggal terlebih dahulu');
            return;
          }

          const dateObj = new Date(postTanggal.tanggal);
          if (isNaN(dateObj.getTime())) {
            ErrAlert('Format tanggal tidak valid');

            return;
          }

          const formattedDate = dateObj.toISOString().split('T')[0];

          try {
            setLoading(true);
            await fetchAbsensiMahasiswa(data, formattedDate);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        }}
        loading={loadingAbsen}
        postTanggal={postTanggal}
      />
    </div>
  );
};

export default JadwalAsdosPage;
