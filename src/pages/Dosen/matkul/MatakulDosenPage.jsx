import React, { useState } from 'react';
import ModalSiswaPerkelas from './components/ModalSiswaPerkelas';
import { FaSearch } from 'react-icons/fa';
import { useDosen } from '../../../hooks/Dosen/useDosen';
import { useAuth } from '../../../context/AuthContext';
import TabelMatakuliahDosen from './components/TabelMatakuliahDosen';
import LoadingPage from '../../../components/common/LoadingPage';
import ModalLihatAbsenPerkelas from './components/ModalLihatAbsenPerkelas';
import Swal from 'sweetalert2';
const MatkulDosenPage = () => {
  const { loading } = useAuth();
  const { dataKelas, fetchSiswaPerkelas, dataSiswaPerkelas, loadingSiswa, dataAbsenPerkelas, tanggalAbsen, fetchAbsenPerkelas, fetchTanggalAbsen } = useDosen();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [showModalSiswa, setShowModalSiswa] = useState(false);
  const [showModalAbsen, setshowModalAbsen] = useState(false);
  const [postTanggal, setPostTanggal] = useState({ tanggal: '' });
  const [loadingAbsen, setLoading] = useState(false);
  const { tanggal } = postTanggal;
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingPage color="#162542" />
      </div>
    );
  }

  const handleChange = (e) => {
    setPostTanggal({ ...postTanggal, [e.target.name]: e.target.value });
  };
  const resetForm = () => {
    setPostTanggal({ tanggal: '' });
    setshowModalAbsen(false);
  };
  return (
    <>
      <div className="space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 w-3.5 h-3.5" />
            </div>
            <input
              type="text"
              placeholder="Cari mata kuliah atau kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm w-full border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
        <TabelMatakuliahDosen
          data={dataKelas}
          searchTerm={searchTerm}
          onShowSiswa={(row) => {
            setSelectedKelas(row);
            setShowModalSiswa(true);
          }}
          onShowAbsen={(row) => {
            setSelectedKelas(row);
            setshowModalAbsen(true);
          }}
        />
      </div>
      <ModalSiswaPerkelas data={selectedKelas} showModalSiswa={showModalSiswa} onClose={() => setShowModalSiswa(false)} dataSiswaPerkelas={dataSiswaPerkelas} fetchSiswaPerkelas={fetchSiswaPerkelas} loadingSiswa={loadingSiswa} />
      <ModalLihatAbsenPerkelas
        data={selectedKelas}
        showModalAbsen={showModalAbsen}
        dataAbsenPerkelas={dataAbsenPerkelas}
        tanggalAbsen={tanggalAbsen}
        fetchTanggalAbsen={fetchTanggalAbsen}
        resetForm={resetForm}
        postTanggal={postTanggal}
        onFetchAbsen={async (data) => {
          if (!postTanggal.tanggal) {
            Swal.fire({
              text: 'Silahkan pilih tanggal terlebih dahulu',
              icon: 'warning',
              confirmButtonText: 'OK',
            });
            return;
          }

          const dateObj = new Date(postTanggal.tanggal);

          if (isNaN(dateObj.getTime())) {
            Swal.fire({
              text: 'Format tanggal tidak valid',
              icon: 'error',
            });
            return;
          }

          const formattedDate = dateObj.toISOString().split('T')[0];

          try {
            setLoading(true);
            await fetchAbsenPerkelas(data, formattedDate);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        }}
        handleChange={handleChange}
        loading={loadingAbsen}
      />
    </>
  );
};

export default MatkulDosenPage;
