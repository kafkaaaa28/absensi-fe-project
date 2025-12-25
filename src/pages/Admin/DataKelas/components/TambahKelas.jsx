import { useState } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Label, TextInput } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';

function TambahKelas({ isOpen, setIsOpen, loading, matkul, dosen, onSubmit }) {
  const [formData, setFromData] = useState({
    id_matkul: '',
    nama_kelas: '',
    kapasitas: '',
    id_dosen: '',
  });
  const { id_matkul, nama_kelas, kapasitas, id_dosen } = formData;
  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" class="flex gap-2 items-center justify-center text-white bg-[#162542] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2 md:w-[240px]  ">
        Tambah Kelas <FaPlus className="" />
      </button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)} size="md">
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-black text-center">Tambah Kelas</h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nama_kelas" value="Nama Kelas" />
              <TextInput id="nama_kelas" name="nama_kelas" placeholder="Masukkan nama Kelas" value={nama_kelas} onChange={handleChange} />
            </div>
            <div>
              <select name="id_matkul" value={id_matkul || ''} onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option className="text-gray-500" value="">
                  Pilih Matkul
                </option>
                {matkul.map((item) => (
                  <option key={item.id_matkul} value={item.id_matkul}>
                    {item.nama_matkul}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select name="id_dosen" value={id_dosen || ''} onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option className="text-gray-500" value="">
                  Pilih Dosen
                </option>
                {dosen.map((item) => (
                  <option key={item.id_dosen} value={item.id_dosen}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="kapasitas" value="Kapasitas" />
              <TextInput id="email" name="kapasitas" placeholder="Masukkan Kapasitas" value={kapasitas} onChange={handleChange} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClose={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>{loading ? 'Memuat...' : 'Tambah'}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default TambahKelas;
