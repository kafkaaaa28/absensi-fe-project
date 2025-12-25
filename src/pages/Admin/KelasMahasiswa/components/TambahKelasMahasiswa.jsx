import { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'flowbite-react';
import { FaPlus } from 'react-icons/fa';
import Select from 'react-select';
function TambahKelasMahasiswa({ isOpen, setIsOpen, onSubmit, dataMahasiswa, dataKelas, loading }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFromData] = useState({
    id_kelas: '',
    id_siswa: '',
  });
  const { id_kelas, id_siswa } = formData;
  const handleClose = () => setIsOpen(false);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFromData({ ...formData, [name]: value });

    if (name === 'id_kelas') {
      const selected = dataKelas.find((item) => item.id_kelas.toString() === value);
      if (selected) {
        setFromData({
          ...formData,
          id_kelas: selected.id_kelas,
          id_matkul: selected.id_matkul,
        });
      } else {
        setFromData({
          ...formData,
          id_kelas: '',
        });
      }
    }
  };
  const change = (option) => {
    setSelectedOption(option);
    setFromData({ ...formData, id_siswa: option ? option.value : '' });
  };
  const options = dataMahasiswa.map((item) => ({
    value: item.id_siswa,
    label: `${item.nama} || ${item.nim}`,
  }));

  useEffect(() => {
    if (selectedOption) {
      setFromData((prev) => ({ ...prev, id_siswa: selectedOption.value }));
    } else {
      setFromData((prev) => ({ ...prev, id_siswa: '' }));
    }
  }, [selectedOption]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} type="button" class="flex gap-2 items-center justify-center text-white bg-[#162542] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2 md:w-[240px]  ">
        Tambah Kelas Siswa <FaPlus className="" />
      </button>
      <Modal show={isOpen} onClose={handleClose} size="md">
        <ModalHeader className="bg-white">
          <h2 className="text-xl font-bold text-black text-center">Tambah Kelas Siswa</h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <label htmlFor="searchable_select" className="block mb-1 font-medium text-gray-700">
                Pilih Siswa dari Daftar
              </label>
              <Select id="searchable_select" name="id_siswa" options={options} value={selectedOption} onChange={change} placeholder="Pilih Nama Siswa" isSearchable={true} className="w-full" />
            </div>
            <div>
              <select name="id_kelas" value={id_kelas || ''} onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option className="text-gray-500" value="">
                  Pilih Kelas
                </option>
                {dataKelas.map((item) => (
                  <option key={item.id_kelas} value={item.id_kelas}>
                    {item.nama_kelas} || {item.nama_matkul} || {item.kode_matkul}
                  </option>
                ))}
              </select>
            </div>
            <p style={{ display: 'none' }}>{formData.id_matkul}</p>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={handleClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>{loading ? 'Memuat...' : 'Tambah'}</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default TambahKelasMahasiswa;
