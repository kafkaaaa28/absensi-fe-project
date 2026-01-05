import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';

const ModalUpdateAbsensi = ({ isOpen, data, onUpdate, onClose, loading }) => {
  const handleUpdate = () => {
    onUpdate(data.id_absen, data.status);
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <ModalHeader>
        <h2 className="text-xl font-bold">Update Absensi</h2>
      </ModalHeader>

      <ModalBody>
        <p>
          Yakin ingin mengubah absen <strong>{data?.nama}</strong> menjadi <strong>{data?.status}</strong>?
        </p>

        <div className="flex gap-4 mt-6">
          <button onClick={handleUpdate} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded">
            {loading ? 'Loading...' : 'Submit'}
          </button>

          <button onClick={onClose} className="w-full bg-gray-300 py-3 rounded">
            Batal
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalUpdateAbsensi;
