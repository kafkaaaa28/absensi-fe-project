import React, { useState } from 'react';
import { useKelas } from '../../../hooks/Admin/useKelas';
import { useMahasiswa } from '../../../hooks/Admin/useMahasiswa';
import LoadingPage from '../../../components/common/LoadingPage';
import TambahKelasMahasiswa from './components/TambahKelasMahasiswa';
import { showAlert, ErrAlert } from '../../../utils/alerts';
import TabelKelasMahasiswa from './components/TabelKelasMahasiswa';
import ModalShowKelas from './components/ModalShowKelas';
import ModalDeleteKelasMahasiswa from './components/ModalDeleteKelasMahasiswa';
const KelasMahasiswaPage = () => {
  const { dataKelas, dataKelasMahasiswa, loadingKelasMahasiswa, deleteKelasMahasiswa, fetchKelas, createKelasMahasiswa, fetchKelasMahasiswa } = useKelas();
  const { dataMahasiswa, loading, fetchMahasiswa } = useMahasiswa();
  const [search, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);
  const [showKelas, setShowKelas] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteKelas, setshowDeleteKelas] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingPage color="#162542" />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 p-3 justify-center items-center">
        <input
          type="nim"
          placeholder="Cari Nim Mahasiswa"
          value={search}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
        />
        <TambahKelasMahasiswa
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          loading={loadingForm}
          dataKelas={dataKelas}
          dataMahasiswa={dataMahasiswa}
          onSubmit={async (data) => {
            setLoadingForm(true);
            try {
              const response = await createKelasMahasiswa(data);
              const message = response.data.message;
              showAlert(message);
              setIsOpen(false);
            } catch (err) {
              const errorMessage = err.response?.data?.message || 'Terjadi kesalahan';
              ErrAlert(errorMessage);
            } finally {
              setLoadingForm(false);
            }
          }}
        />
      </div>

      <TabelKelasMahasiswa
        dataMahasiswa={dataMahasiswa}
        search={search}
        onShowKelas={(row) => {
          setSelected(row);
          setShowKelas(true);
        }}
      />
      <ModalDeleteKelasMahasiswa
        isOpen={showDeleteKelas}
        data={selected}
        loading={loadingForm}
        onClose={() => setshowDeleteKelas(false)}
        onDelete={async (idSiswa, idKelas) => {
          setLoadingForm(true);
          try {
            const res = await deleteKelasMahasiswa(idSiswa, idKelas);
            fetchMahasiswa();
            showAlert(res.data.message);
          } catch (err) {
            console.log(err.response?.data?.message || 'Failed to delete Kelas');
            ErrAlert(err.response?.data?.message);
          } finally {
            setshowDeleteKelas(false);
            setLoadingForm(false);
          }
        }}
      />
      <ModalShowKelas
        isOpen={showKelas}
        data={selected}
        loading={loadingKelasMahasiswa}
        onClose={() => setShowKelas(false)}
        fetchKelasMahasiswa={fetchKelasMahasiswa}
        dataKelasMahasiswa={dataKelasMahasiswa}
        onDelete={(row) => {
          setSelected(row);
          setshowDeleteKelas(true);
        }}
      />
    </>
  );
};

export default KelasMahasiswaPage;
