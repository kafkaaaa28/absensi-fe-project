import React, { useState } from 'react';
import ModalSiswaPerkelas from './components/ModalSiswaPerkelas';
import { FaSearch } from 'react-icons/fa';
import { useDosen } from '../../../hooks/Dosen/useDosen';
import { useAuth } from '../../../context/AuthContext';
import TabelMatakuliahDosen from './components/TabelMatakuliahDosen';
import LoadingPage from '../../../components/common/LoadingPage';
import ModalLihatAbsenPerkelas from './components/ModalLihatAbsenPerkelas';
import Swal from 'sweetalert2';
import ModalTambahAsisten from './components/ModalTambahAsisten';
import { showAlert, ErrAlert, warningAlert } from '../../../utils/alerts';
import ModalDetailAsdos from './components/ModalDetailAsdos';
import ModalDeleteAsisten from './components/ModalDeleteAsisten';
import ModalUpdateAbsensi from './components/ModalUpdateAbsensi';
import { ApiUpdateAbsenPerkelas } from '../../../api/Dosen/DosenApi';
const MatkulDosenPage = () => {
  const { loading } = useAuth();
  const {
    dataKelas,
    fetchSiswaPerkelas,
    dataSiswaPerkelas,
    loadingSiswa,
    dataAbsenPerkelas,
    tanggalAbsen,
    fetchAbsenPerkelas,
    fetchTanggalAbsen,
    dataAsdos,
    fetchAsdos,
    loadingAsdos,
    TambahAsisten,
    loadingDetailAsdos,
    fetchDetailAsdos,
    dataDetailAsdos,
    deleteAsdos,
  } = useDosen();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [showModalSiswa, setShowModalSiswa] = useState(false);
  const [showModalAbsen, setshowModalAbsen] = useState(false);
  const [postTanggal, setPostTanggal] = useState({ tanggal: '' });
  const [loadingAbsen, setLoading] = useState(false);
  const [showTambahAsisten, setShowTambahAsisten] = useState(false);
  const [showDetailAsdos, setShowDetailAsdos] = useState(false);
  const [showDeleteAsisten, setShowDeleteAsisten] = useState(false);
  const [selectedAsisten, setSelectedAsisten] = useState(null);
  const [loadingForm, setLoadingForm] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [ModalUpdate, setModalUpdate] = useState(false);
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
          onShowDetailAsdos={(row) => {
            setSelectedKelas(row);
            setShowDetailAsdos(true);
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
            await fetchAbsenPerkelas(data, formattedDate);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        }}
        handleChange={handleChange}
        loading={loadingAbsen}
        onShowUpdate={(row) => {
          setSelectedSiswa(row);
          setModalUpdate(true);
        }}
      />
      <ModalTambahAsisten
        data={selectedKelas}
        dataAsdos={dataAsdos}
        fetchAsdos={fetchAsdos}
        loading={loadingAsdos}
        isOpen={showTambahAsisten}
        loadingForm={loadingForm}
        setLoadingForm={setLoadingForm}
        onClose={() => setShowTambahAsisten(false)}
        onSubmit={async (data) => {
          try {
            const res = await TambahAsisten(data);
            const message = res.data.message;
            showAlert(message);
            fetchDetailAsdos(selectedKelas.id_kelas, selectedKelas.id_dosen);
            setShowTambahAsisten(false);
          } catch (err) {
            const errorMessage = err.response?.data?.message || 'Terjadi kesalahan';
            ErrAlert(errorMessage);
          }
        }}
      />
      <ModalDetailAsdos
        data={selectedKelas}
        isOpen={showDetailAsdos}
        onClose={() => setShowDetailAsdos(false)}
        loading={loadingDetailAsdos}
        dataDetail={dataDetailAsdos}
        fetchDetailAsdos={fetchDetailAsdos}
        onShowTambahAsisten={(data) => {
          setSelectedKelas(data);
          setShowTambahAsisten(true);
        }}
        onShowDeleteAsisten={(data) => {
          setShowDeleteAsisten(true);
          setSelectedAsisten(data);
        }}
      />
      <ModalDeleteAsisten
        isOpen={showDeleteAsisten}
        asisten={selectedAsisten}
        loading={loadingForm}
        onClose={() => setShowDeleteAsisten(false)}
        onDelete={async (id) => {
          setLoadingForm(true);
          try {
            const res = await deleteAsdos(id);
            showAlert(res.data.message);
            fetchDetailAsdos(selectedKelas.id_kelas, selectedKelas.id_dosen);
          } catch (err) {
            console.log(err.response?.data?.message || 'Failed to delete Asdos');
            ErrAlert(err.response?.data?.message);
          } finally {
            setShowDeleteAsisten(false);
            setLoadingForm(false);
          }
        }}
      />
      <ModalUpdateAbsensi
        isOpen={ModalUpdate}
        onClose={() => setModalUpdate(false)}
        loading={loadingForm}
        data={selectedSiswa}
        onUpdate={async (id_absen, status) => {
          setLoadingForm(true);
          const dateObj = new Date(selectedSiswa.tanggal);
          const formattedDate = dateObj.toLocaleDateString('en-CA');
          try {
            const res = await ApiUpdateAbsenPerkelas(selectedSiswa.id_kelas, id_absen, { status });
            setModalUpdate(false);
            fetchAbsenPerkelas(selectedSiswa.id_kelas, formattedDate);
            showAlert(res.data.message);
          } catch (error) {
            console.error(error);
            ErrAlert(error.response?.data?.message);
          } finally {
            setLoadingForm(false);
          }
        }}
      />
    </>
  );
};

export default MatkulDosenPage;
