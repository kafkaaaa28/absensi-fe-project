import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import TabelKelasAsdos from './components/TabelKelasAsdos';
import ModalUpdateApproval from './components/ModalUpdateApproval';
import { useKelasAsdos } from '../../../hooks/Asdos/useKelasAsdos';
import { useAuth } from '../../../context/AuthContext';
import LoadingPage from '../../../components/common/LoadingPage';

const KelasAsdosPage = () => {
  const { fetchKelasAsdos, dataKelasAsdos, loadingKelas } = useKelasAsdos();
  const { loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsdos, setSelectedAsdos] = useState(null);
  useEffect(() => {
    fetchKelasAsdos();
  }, []);

  const handleOpenModal = (item) => {
    setSelectedAsdos(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAsdos(null);
    setIsModalOpen(false);
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingPage color="#162542" />
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400 w-3.5 h-3.5" />
          </div>
          <input type="text" placeholder="Cari mata kuliah atau kelas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 pr-3 py-2 text-sm w-full border border-gray-300 rounded-lg" />
        </div>
      </div>

      <TabelKelasAsdos data={dataKelasAsdos} loading={loadingKelas} searchTerm={searchTerm} onApproveClick={handleOpenModal} />

      {selectedAsdos && (
        <ModalUpdateApproval
          isOpen={isModalOpen}
          data={selectedAsdos}
          onClose={handleCloseModal}
          onSuccess={() => {
            fetchKelasAsdos();
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
};

export default KelasAsdosPage;
