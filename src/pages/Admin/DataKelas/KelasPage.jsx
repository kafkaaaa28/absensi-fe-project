import React, { useState } from 'react';
import { useKelas } from '../../../hooks/Admin/useKelas';
import { useDosen } from '../../../hooks/Admin/useDosen';
import { useMatkul } from '../../../hooks/Admin/useMatkul';
import LoadingPage from '../../../components/common/LoadingPage';
import TambahKelas from './components/TambahKelas';
import { showAlert, ErrAlert } from '../../../utils/alerts';
import TableDataKelas from './components/TableDataKelas';
import ModalEditKelas from './components/ModalEditKelas';
import ModalDeleteKelas from './components/ModalDeleteKelas';
import ModalShowSiswa from './components/ModalShowSiswa';
const KelasPage = () => {
  const { dataKelas, loadingKelas, fetchKelas, createKelas, updateKelas, deleteKelas } = useKelas();
  const { dataDosen } = useDosen();
  const { dataMatkul } = useMatkul();
  const [search, setSearchTerm] = useState('');
  const [selected, setSelected] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showMahasiswa, setshowMahasiswa] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  if (loadingKelas) {
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
          placeholder="Cari kelas atau mata kuliah..."
          value={search}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
        />
        <TambahKelas
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          loading={loadingForm}
          matkul={dataMatkul}
          dosen={dataDosen}
          onSubmit={async (data) => {
            setLoadingForm(true);
            try {
              const response = await createKelas(data);
              const message = response.data.message;
              showAlert(message);
              fetchKelas();
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

      <TableDataKelas
        data={dataKelas}
        search={search}
        onEdit={async (row) => {
          setSelected(row);
          setShowEdit(true);
        }}
        onDelete={async (row) => {
          setSelected(row);
          setShowDelete(true);
        }}
        onShowSiswa={async (row) => {
          setSelected(row);
          setshowMahasiswa(true);
        }}
      />
      <ModalEditKelas
        isOpen={showEdit}
        data={selected}
        onClose={() => setShowEdit(false)}
        loading={loadingForm}
        dosen={dataDosen}
        matkul={dataMatkul}
        onUpdate={async (id, data) => {
          setLoadingForm(true);
          try {
            const res = await updateKelas(id, data);
            fetchKelas();
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
      <ModalDeleteKelas
        isOpen={showDelete}
        data={selected}
        loading={loadingForm}
        onClose={() => setShowDelete(false)}
        onDelete={async (id) => {
          setLoadingForm(true);
          try {
            const res = await deleteKelas(id);
            fetchKelas();
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
      <ModalShowSiswa isOpen={showMahasiswa} data={selected} onClose={() => setshowMahasiswa(false)} />
    </>
  );
};

export default KelasPage;
