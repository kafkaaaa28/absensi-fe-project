import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

const ModalDelete = ({ isOpen, matkul, onDelete, onClose, loading }) => {
  const [selectedMatkul, setSelectedMatkul] = useState({ ...matkul });
  useEffect(() => {
    setSelectedMatkul({ ...matkul });
  }, [matkul]);

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(matkul.id_matkul);
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">Hapus MataKuliah</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <p>
          Yakin ingin menghapus <strong>{selectedMatkul.nama_matkul}</strong>?
        </p>
        <div className="flex gap-4 mt-6">
          <button onClick={handleDelete} className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700">
            {loading ? 'Menghapus...' : 'Hapus'}
          </button>
          <button onClick={onClose} className="w-full bg-gray-300 text-black py-3 rounded hover:bg-gray-400">
            Batal
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalDelete;
