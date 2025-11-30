import { useState } from 'react';
import { useDosen } from '../../../hooks/Admin/useDosen';
import DosenTable from './components/DosenTable';
import TambahDosen from './components/TambahDosen';
import { ErrAlert, showAlert } from '../../../utils/alerts';
import ModalEditDosen from './components/ModalEditDosen';
import ModalDeleteDosen from './components/ModalDeleteDosen';
const DosenPage = () => {
  const { dataDosen, loading, createUsers, fetchDosen, deleteUsers, updateUsers } = useDosen();
  const [error, setError] = useState(null);
  const [search, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  return (
    <>
      <div className="flex flex-col  md:flex-row gap-4 p-3 justify-center items-center">
        <input type="text" placeholder="Cari Nama Dosen" value={search} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-lg  w-full " />
        <TambahDosen
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          loading={loadingForm}
          onSubmit={async (data) => {
            setLoadingForm(true);
            try {
              const response = await createUsers(data);
              const message = response.data.message;
              showAlert(message);
              fetchDosen();
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

      <DosenTable
        data={dataDosen}
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
      <ModalEditDosen
        isOpen={showEdit}
        dosen={selected}
        onClose={() => setShowEdit(false)}
        loading={loadingForm}
        onSubmit={async (id, data) => {
          setLoadingForm(true);
          try {
            const res = await updateUsers(id, data);
            fetchDosen();
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
      <ModalDeleteDosen
        isOpen={showDelete}
        dosen={selected}
        loading={loadingForm}
        onClose={() => setShowDelete(false)}
        onDelete={async (id) => {
          setLoadingForm(true);
          try {
            const res = await deleteUsers(id);
            fetchDosen();
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
export default DosenPage;
