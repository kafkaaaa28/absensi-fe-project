import React, { useState } from 'react';
import TableJadwal from './components/TableJadwal';
import { useJadwal } from '../../../hooks/Admin/useJadwal';
import LoadingPage from '../../../components/common/LoadingPage';
import { showAlert, ErrAlert } from '../../../utils/alerts';
import TambahJadwal from './components/TambahJadwal';
import ModalEditJadwal from './components/ModalEditJadwal';
import ModalDeleteJadwal from './components/ModalDeleteJadwal';
import { useKelas } from '../../../hooks/Admin/useKelas';
const JadwalPage = () => {
  const { dataJadwal, createJadwal, fetchJadwal, deleteJadwal, updateJadwal, loadingJadwal } = useJadwal();
  const { dataKelas } = useKelas();

  const [search, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  if (loadingJadwal) {
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
          type="text"
          placeholder="Cari MataKuliah"
          value={search}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
        />
        <TambahJadwal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          loading={loadingForm}
          dataKelas={dataKelas}
          onSubmit={async (data) => {
            setLoadingForm(true);
            try {
              const response = await createJadwal(data);
              const message = response.data.message;
              showAlert(message);
              fetchJadwal();
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

      <TableJadwal
        data={dataJadwal}
        search={search}
        onEdit={async (row) => {
          setSelected(row);
          setShowEdit(true);
        }}
        onDelete={async (row) => {
          setSelected(row);
          setShowDelete(true);
        }}
      />
      <ModalEditJadwal
        isOpen={showEdit}
        data={selected}
        onClose={() => setShowEdit(false)}
        loading={loadingForm}
        dataKelas={dataKelas}
        onUpdate={async (id, data) => {
          setLoadingForm(true);
          try {
            const res = await updateJadwal(id, data);
            fetchJadwal();
            showAlert(res.data.message);
          } catch (err) {
            console.log(err.response.data.message);
            ErrAlert(err.response.data.message);
          } finally {
            setShowEdit(false);
            setLoadingForm(false);
          }
        }}
      />
      <ModalDeleteJadwal
        isOpen={showDelete}
        data={selected}
        loading={loadingForm}
        onClose={() => setShowDelete(false)}
        onDelete={async (id) => {
          setLoadingForm(true);
          try {
            const res = await deleteJadwal(id);
            fetchJadwal();
            showAlert(res.data.message);
          } catch (err) {
            console.log(err.response?.data?.message || 'Failed to delete Jadwal');
            ErrAlert(err.response?.data?.message);
          } finally {
            setShowDelete(false);
            setLoadingForm(false);
          }
        }}
      />
    </>
  );
};

export default JadwalPage;
