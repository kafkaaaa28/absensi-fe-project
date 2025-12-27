import { useState } from 'react';
import { useAsdos } from '../../../hooks/Admin/useAsdos';
import AsdosTable from './components/AsdosTable';
import TambahAsdos from './components/TambahAsdos';
import { ErrAlert, showAlert } from '../../../utils/alerts';
import ModalEditAsdos from './components/ModalEditAsdos';
import ModalDeleteAsdos from './components/ModalDeleteAsdos';
import LoadingPage from '../../../components/common/LoadingPage';
import { useMahasiswa } from '../../../hooks/Admin/useMahasiswa';

const AsdosPage = () => {
  const { dataAsdos, loading, createUsers, fetchAsdos, deleteUsers, updateUsers } = useAsdos();
  const { dataMahasiswa } = useMahasiswa();
  const [error, setError] = useState(null);
  const [search, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
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
      <div className="flex flex-col  md:flex-row gap-4 p-3 justify-center items-center">
        <input type="text" placeholder="Cari Nama Dosen" value={search} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-lg  w-full " />
        <TambahAsdos
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          loading={loadingForm}
          dataMahasiswa={dataMahasiswa}
          onSubmit={async (data) => {
            setLoadingForm(true);
            try {
              const response = await createUsers(data);
              const message = response.data.message;
              showAlert(message);
              fetchAsdos();
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

      <AsdosTable
        data={dataAsdos}
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
      />
      <ModalEditAsdos
        isOpen={showEdit}
        data={selected}
        onClose={() => setShowEdit(false)}
        loading={loadingForm}
        onUpdate={async (id, data) => {
          setLoadingForm(true);
          try {
            const res = await updateUsers(id, data);
            fetchAsdos();
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
      <ModalDeleteAsdos
        isOpen={showDelete}
        data={selected}
        loading={loadingForm}
        onClose={() => setShowDelete(false)}
        onDelete={async (id) => {
          setLoadingForm(true);
          try {
            const res = await deleteUsers(id);
            fetchAsdos();
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
    </>
  );
};
export default AsdosPage;
