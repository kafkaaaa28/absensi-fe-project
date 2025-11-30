import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, TextInput } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';

export default function TambahMahasiswa({ setIsOpen, isOpen, onSubmit, loading }) {
  const data = {
    nama: '',
    email: '',
    password: '',
    nim: '',
    semester: '',
    fakultas: '',
    prodi: '',
    role: 'siswa',
  };
  const [formData, setFormData] = useState(data);
  const { nama, email, password, semester, prodi, nim, fakultas } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData(data);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex gap-2 items-center justify-center text-white bg-[#162542] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2 md:w-[240px]"
      >
        Tambah Mahasiswa <FaPlus />
      </button>
      <Modal show={isOpen} onClose={handleClose} size="md">
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-black text-center">Tambah Mahasiswa</h2>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nama" value="Nama" />
              <TextInput id="nama" name="nama" placeholder="Masukkan nama mahasiswa" value={nama} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput type="email" id="email" name="email" placeholder="Masukkan email" value={email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput id="password" placeholder="Password" name="password" type="password" value={password} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="nim" value="nim" />
              <TextInput id="nim" placeholder="nim" name="nim" type="number" value={nim} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="fakultas" value="fakultas" />
              <TextInput id="fakultas" placeholder="Fakultas" name="fakultas" value={fakultas} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="prodi" value="prodi" />
              <TextInput id="Prodi" placeholder="Prodi" name="prodi" value={prodi} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="semester" value="semester" />
              <TextInput id="semester" type="number" placeholder="Masukkan semester" name="semester" value={semester} onChange={handleChange} />
            </div>
            {/* Tambahkan tombol submit di sini */}
            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" color="gray" onClick={handleClose}>
                Batal
              </Button>
              <Button type="submit">{loading ? 'Memuat...' : 'Tambah'}</Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
