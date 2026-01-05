import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'flowbite-react';
import { UpdateApproval } from '../../../../api/Asdos/KelasAsdosApi';
import { showAlert } from '../../../../utils/alerts';

const ModalUpdateApproval = ({ isOpen, onClose, data, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (status) => {
    setLoading(true);
    try {
      const res = await UpdateApproval(data.id_kelas_asdos, data.id_asdos, {
        approval_status: status,
      });
      onSuccess();
      showAlert(res.data.message);
    } catch (err) {
      console.log(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="md">
      <ModalHeader>Persetujuan Asisten</ModalHeader>
      <ModalBody>
        <p className="mb-4">
          Setujui Dosen <strong>{data.nama}</strong> untuk mata kuliah <strong>{data.nama_matkul}</strong>?
        </p>

        <div className="flex gap-3">
          <button disabled={loading} onClick={() => handleUpdate('disetujui')} className="flex-1 bg-green-600 text-white py-2 rounded">
            Setujui
          </button>

          <button disabled={loading} onClick={() => handleUpdate('ditolak')} className="flex-1 bg-red-600 text-white py-2 rounded">
            Tolak
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalUpdateApproval;
