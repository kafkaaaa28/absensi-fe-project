import React, { useState } from 'react';
import { useMatkul } from '../../../hooks/Admin/useMatkul';
import TableMatakuliah from './components/TableMatakuliah';
import LoadingPage from '../../../components/common/LoadingPage';
import { showAlert, ErrAlert } from '../../../utils/alerts';
import TambahMatakuliah from './components/TambahMatakuliah';
import ModalEditMatkul from './components/ModalEditMatkul';
import ModalDeleteMatkul from './components/ModalDeleteMatkul';
const MatkulPage = () => {
  const { dataMatkul, loadingMatkul, updateMatkul, deleteMatkul, createMatkul, fetchMatkul } = useMatkul();
  const [search, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  if (loadingMatkul) {
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
        <TambahMatakuliah
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          loading={loadingForm}
          onSubmit={async (data) => {
            setLoadingForm(true);
            try {
              const response = await createMatkul(data);
              const message = response.data.message;
              showAlert(message);
              fetchMatkul();
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

      <TableMatakuliah
        data={dataMatkul}
        search={search}
        loading={loadingMatkul}
        onEdit={async (row) => {
          setSelected(row);
          setShowEdit(true);
        }}
        onDelete={async (row) => {
          setSelected(row);
          setShowDelete(true);
        }}
      />
      <ModalEditMatkul
        isOpen={showEdit}
        matkul={selected}
        onClose={() => setShowEdit(false)}
        loading={loadingForm}
        onUpdate={async (id, data) => {
          setLoadingForm(true);
          try {
            const res = await updateMatkul(id, data);
            fetchMatkul();
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
      <ModalDeleteMatkul
        isOpen={showDelete}
        matkul={selected}
        loading={loadingForm}
        onClose={() => setShowDelete(false)}
        onDelete={async (id) => {
          setLoadingForm(true);
          try {
            const res = await deleteMatkul(id);
            fetchMatkul();
            showAlert(res.data.message);
          } catch (err) {
            console.log(err.response?.data?.message || 'Failed to delete Matkul');
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

export default MatkulPage;
