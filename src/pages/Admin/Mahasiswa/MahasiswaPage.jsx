import { useState } from 'react';
import { useMahasiswa } from '../../../hooks/Admin/useMahasiswa';
import MahasiswaTable from './components/MahasiswaTable';
import TambahMahasiswa from './components/TambahMahasiswa';
import { ErrAlert, showAlert } from '../../../utils/alerts';
import ModalEditMahasiswa from './components/ModalEditMahasiswa';
import ModalDeleteMahasiswa from './components/ModalDeleteMahasiswa';
import ModalDeleteFaceMahasiswa from './components/ModalDeleteFaceMahasiswa';
import LoadingPage from '../../../components/common/LoadingPage';

const MahasiswaPage = () => {
  const { dataMahasiswa, loading, createUsers, fetchMahasiswa, deleteUsers, updateUsers, deleteFaceMahasiswa } = useMahasiswa();
  const [search, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [ShowFace, setShowFace] = useState(false);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingPage color="#162542" />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col  md:flex-row gap-4 p-3 justify-center items-center">
        <input
          type="number"
          placeholder="Cari Nim Mahasiswa"
          value={search}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
        />
        <TambahMahasiswa
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          loading={loadingForm}
          onSubmit={async (data) => {
            setLoadingForm(true);
            try {
              const response = await createUsers(data);
              const message = response.data.message;
              showAlert(message);
              fetchMahasiswa();
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

      <MahasiswaTable
        data={dataMahasiswa}
        search={search}
        loading={loading}
        onEdit={(row) => {
          setSelected(row);
          setShowEdit(true);
        }}
        onDelete={(row) => {
          setSelected(row);
          setShowDelete(true);
        }}
        onDeleteFace={(row) => {
          setSelected(row);
          setShowFace(true);
        }}
      />
      <ModalEditMahasiswa
        isOpen={showEdit}
        mahasiswa={selected}
        onClose={() => setShowEdit(false)}
        loading={loadingForm}
        onSubmit={async (id, data) => {
          setLoadingForm(true);
          try {
            const res = await updateUsers(id, data);
            fetchMahasiswa();
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
      <ModalDeleteMahasiswa
        isOpen={showDelete}
        mahasiswa={selected}
        loading={loadingForm}
        onClose={() => setShowDelete(false)}
        onDelete={async (id) => {
          setLoadingForm(true);
          try {
            const res = await deleteUsers(id);
            fetchMahasiswa();
            showAlert(res.data.message);
          } catch (err) {
            console.log(err.response?.data?.message || 'Failed to delete user');
            ErrAlert(err.response?.data?.message);
          } finally {
            setShowDelete(false);
            setLoadingForm(false);
          }
        }}
      />
      <ModalDeleteFaceMahasiswa
        isOpen={ShowFace}
        mahasiswa={selected}
        loading={loadingForm}
        onClose={() => setShowFace(false)}
        onDeleteface={async (id) => {
          setLoadingForm(true);
          try {
            const res = await deleteFaceMahasiswa(id);
            showAlert(res.data.message);
          } catch (err) {
            console.log(err.response?.data?.message || 'Failed to delete user');
            ErrAlert(err.response?.data?.message);
          } finally {
            setShowFace(false);
            setLoadingForm(false);
          }
        }}
      />
    </>
  );
};
export default MahasiswaPage;
