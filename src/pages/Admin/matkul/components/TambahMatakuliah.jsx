import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, TextInput } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';
const TambahMatakuliah = ({ setIsOpen, isOpen, loading, onSubmit }) => {
  const data = {
    nama_matkul: '',
    semester: '',
    kode_matkul: '',
    sks: '',
  };
  const [formData, setFromData] = useState(data);
  const { nama_matkul, semester, sks, kode_matkul } = formData;
  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFromData(data);
  };
  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" class="flex gap-2 items-center justify-center text-white bg-[#162542] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2 md:w-[240px]  ">
        Tambah Matkul <FaPlus className="" />
      </button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)} size="md">
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-black text-center">Tambah Matkul</h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nama_matkul" value="Nama" />
              <TextInput id="nama_matkul" name="nama_matkul" placeholder="Masukkan MataKuliah" value={nama_matkul} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="semester" value="semester" />
              <TextInput type="number" id="semester" name="semester" typeof="number" placeholder="Masukkan semester" value={semester} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="sks" value="sks" />
              <TextInput type="number" id="sks" name="sks" typeof="number" placeholder="Masukkan sks" value={sks} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="kode_matkul" value="kode_matkul" />
              <TextInput id="kode_matkul" name="kode_matkul" placeholder="Masukkan kode" value={kode_matkul} onChange={handleChange} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>{loading ? 'Memuat...' : 'Tambah'}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TambahMatakuliah;
