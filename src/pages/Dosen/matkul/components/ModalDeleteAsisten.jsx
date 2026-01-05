import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

const ModalDeleteAsisten = ({ isOpen, asisten, onDelete, onClose, loading }) => {
  const [selectedsiswa, setSelectedsiswa] = useState({ ...asisten });
  useEffect(() => {
    setSelectedsiswa({ ...asisten });
  }, [asisten]);

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(asisten.id);
  };
  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <ModalHeader className="bg-white">
        <h2 className="text-xl font-bold text-black text-center">Hapus Asisten</h2>
      </ModalHeader>
      <ModalBody className="bg-white">
        <p>
          Yakin ingin menghapus <strong>{selectedsiswa.nama}</strong>?
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

export default ModalDeleteAsisten;
