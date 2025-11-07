import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import TambahAsdos from './TambahAsdos';
import ModalEdit from './ModalEditAsdos';
import ModalDelete from './ModalDeleteAsdos';
import Swal from 'sweetalert2';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

const AsdosTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAsdos, setSelectAsdos] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const showAlert = () => {
    Swal.fire({
      title: 'Berhasil!',
      icon: 'success',
    });
  };
  const ErrAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Terjadi Error',
    });
  };
  const fetchAsdos = async () => {
    try {
      const res = await api.get('/users/asdos');
      setData(res.data.data);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAsdos();
  }, []);

  const handleEdit = (item) => {
    setSelectAsdos(item);
    setShowEditModal(true);
  };

  const handleUpdate = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await api.put(`/users/${id}`, updatedData);
      setData(data.map((p) => (p.id_user === id ? res.data : p)));
      setShowEditModal(false);
      showAlert();
      setLoading(false);
      await fetchAsdos();
    } catch (err) {
      console.error(err.response?.data?.message || 'Gagal memperbarui data');
      setLoading(false);
      setShowEditModal(false);
      if (err.response && err.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
      } else {
        ErrAlert();
      }
    }
  };
  const handleDelete = (item) => {
    setSelectAsdos(item);
    setShowDeleteModal(true);
  };

  const handleDeleteAsdos = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/users/${id}`);
      setData(data.filter((datas) => datas.id_user !== id));
      await fetchAsdos();
      setLoading(false);
      setShowDeleteModal(false);
      showAlert();
    } catch (err) {
      console.log(err.response?.data?.message || 'Failed to delete user');
      setLoading(false);
      setShowDeleteModal(false);
      ErrAlert();
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 p-3 justify-center items-center">
        <input type="text" placeholder="Cari Nama Asdos" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-lg  w-full " />
        <TambahAsdos setIsOpen={setIsOpen} isOpen={isOpen} onSuccess={fetchAsdos} erralert={ErrAlert} showAlert={showAlert} />
      </div>
      <div className="relative overflow-x-auto p-4 rounded-lg">
        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama
                </th>
                <th scope="col" className="px-6 py-3">
                  Nim
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Tipe Asdos
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-red-500 bg-white ">
                    {error}
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 bg-white text-gray-500">
                    Tidak ada Asdos
                  </td>
                </tr>
              ) : data.filter((item) => (item.nama || '').toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 bg-white text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                data
                  .filter((item) => (item.nama || '').toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item, index) => (
                    <tr key={item.id} className="bg-white border-b  border-gray-200 transition">
                      <td className=" px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{item.nama}</td>
                      <td className="px-6 py-4">{item.nim || `Bukan Mahasiswa`}</td>
                      <td className="px-6 py-4">{item.status}</td>
                      <td className="px-6 py-4">{item.tipe_asdos}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-2 hover:bg-blue-600" onClick={() => handleEdit(item)}>
                            <FaRegEdit /> Edit
                          </button>
                          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-2" onClick={() => handleDelete(item)}>
                            <FaRegTrashAlt /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ModalEdit showEditModal={showEditModal} setShowEditModal={setShowEditModal} loading={loading} data={selectAsdos} onUpdate={handleUpdate} />
      <ModalDelete modaldelete={showDeleteModal} data={selectAsdos} onDelete={handleDeleteAsdos} setModaldelete={setShowDeleteModal} loading={loading} />
    </>
  );
};

export default AsdosTable;
