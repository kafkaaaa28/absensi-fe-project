import { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

const ModalEditAsdos = ({ data, onUpdate, isOpen, loading, onClose }) => {
  const [formData, setFormData] = useState({ ...data });

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(data.id_user, formData);
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">Edit Asdos</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          {!formData.id_siswa && (
            <div>
              <label className="block mb-1 font-medium">Nama</label>
              <input className="w-full border px-3 py-2 rounded" name="nama" value={formData.nama || ''} onChange={handleChange} />
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input className="w-full border px-3 py-2 rounded" name="email" value={formData.email || ''} onChange={handleChange} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select name="status" value={formData.status || ''} onChange={handleChange} className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500">
              <option value="">Pilih Status</option>
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-teal-500 text-white py-3 rounded hover:bg-teal-600" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalEditAsdos;
