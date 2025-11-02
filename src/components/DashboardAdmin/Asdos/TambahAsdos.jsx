import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, TextInput } from 'flowbite-react';
import api from '../../../utils/api';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Select from 'react-select';

function TambahAsdos({ isOpen, setIsOpen, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [cekMahasiswa, setCekMahasiswa] = useState(false);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [formData, setFromData] = useState({
    nama: '',
    email: '',
    password: '',
    id_siswa: '',
    status: 'aktif',
    tipe_asdos: '',
    role: 'asdos',
  });
  const { nama, email, password, tipe_asdos, id_siswa, role } = formData;
  const handleClose = () => setIsOpen(false);
  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'tipe_asdos') {
      setCekMahasiswa(e.target.value === 'mahasiswa');
    }
  };
  const change = (option) => {
    setSelectedOption(option);
    setFromData({ ...formData, id_siswa: option ? option.value : '' });
  };
  const options = dataSiswa.map((item) => ({
    value: item.id_siswa,
    label: `${item.nama} || ${item.nim}`,
  }));
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/users/createusers', formData);
      setIsOpen(false);
      showAlert();
      onSuccess();
      setFromData({
        nama: '',
        email: '',
        password: '',
        tipe_asdos: '',
        role: 'asdos',
        status: 'aktif',
      });
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);

      setIsOpen(false);

      if (err.response && err.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.response.data.message,
        });
      } else {
        ErrAlert();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSiswa = async () => {
    try {
      const res = await api.get('/users/siswa');
      setDataSiswa(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err.response?.data.message);
    }
  };
  useEffect(() => {
    fetchSiswa();
    if (selectedOption) {
      setFromData((prev) => ({ ...prev, id_siswa: selectedOption.value }));
    } else {
      setFromData((prev) => ({ ...prev, id_siswa: '' }));
    }
  }, [selectedOption]);
  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" class="flex gap-2 items-center justify-center text-white bg-[#162542] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2 md:w-[240px]  ">
        Tambah Asisten Dosen <FaPlus className="" />
      </button>
      <Modal show={isOpen} onClose={handleClose} size="md">
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-black text-center">Tambah Asdos</h2>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <div className="space-y-4">
              <div>
                <label htmlFor="tipe_asdos" className="block text-sm font-medium mb-1">
                  Tipe Asisten
                </label>
                <select id="tipe_asdos" name="tipe_asdos" value={tipe_asdos} onChange={handleChange} required className="rounded-lg w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">Pilih tipe</option>
                  <option value="mahasiswa">Mahasiswa</option>
                  <option value="nonMahasiswa">Non Mahasiswa</option>
                </select>
              </div>
              {!cekMahasiswa ? (
                <div>
                  <Label htmlFor="nama" value="Nama" />
                  <TextInput id="nama" name="nama" placeholder="Masukkan nama Asdos" value={nama} onChange={handleChange} />
                </div>
              ) : (
                <div>
                  <label htmlFor="searchable_select" className="block mb-1 font-medium text-gray-700">
                    Pilih Siswa dari Daftar
                  </label>
                  <Select id="searchable_select" name="id_siswa" options={options} value={selectedOption} onChange={change} placeholder="Pilih Nama Siswa" isSearchable={true} className="w-full" />
                </div>
              )}
              <div>
                <Label htmlFor="email" value="Email" />
                <TextInput type="email" id="email" name="email" placeholder="Masukkan email" value={email} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="password" value="password" />
                <TextInput id="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="gray" onClick={handleClose}>
              Batal
            </Button>
            <Button type="submit">{loading ? 'Memuat...' : 'Tambah'}</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}

export default TambahAsdos;
