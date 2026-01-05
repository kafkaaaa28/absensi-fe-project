import { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { showAlert, ErrAlert } from '../../../../utils/alerts';
import { useNavigate } from 'react-router-dom';
import { useJadwalAsdos } from '../../../../hooks/Asdos/useJadwalAsdos';
import { useAbsensiAsdos } from '../../../../hooks/Asdos/useAbsensiAsdos';
import TableJadwalHarini from './TabelJadwalHarini';
import QrAbsensiAsdos from './Absensi/QrAbsensiAsdos';
import ModalEditStatusAbsenAsdos from './Absensi/ModalEditStatusAbsenAsdos';
import ModalFaceScanAbsenAsdos from './Absensi/ModalFaceScanAbsenAsdos';
const DataboardJadwal = () => {
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [OpenScanFace, setOpenScanFace] = useState(false);
  const [OpenQr, setOpenQr] = useState(false);
  const [showedit, setShowedit] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const { dataJadwalAsdosHariini, fetchJadwalAsdosHariini, loadingJadwal } = useJadwalAsdos();
  const { ApiBukaAbsenAsdos, ApiFaceEmbeddingAsdos, ApiUpdateAbsenFaceAsdos, loadingTokenQr, fetchTokenQr, tokenQr, ApiUpdateAbsenAsdos } = useAbsensiAsdos();
  const navigate = useNavigate();
  const hariIni = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleOpenAbsen = async (row) => {
    try {
      const { id_kelas, id_jadwal } = row;
      const res = await ApiBukaAbsenAsdos(id_kelas, id_jadwal);
      showAlert(res.data.message);
    } catch (err) {
      console.log(`Gagal: ${err.response?.data?.message}`);
      ErrAlert(err.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchJadwalAsdosHariini();
  }, []);
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-800">Jadwal Hari Ini</h2>
                <p className="text-gray-600 text-xs">{hariIni}</p>
              </div>
            </div>
            <button onClick={() => navigate('jadwal')} className="text-blue-600 text-xs font-medium hover:text-blue-700">
              Lihat Semua
            </button>
          </div>
        </div>
        <div className="p-6">
          <TableJadwalHarini
            data={dataJadwalAsdosHariini}
            loading={loadingJadwal}
            onOpenAbsen={(row) => {
              setSelectedJadwal(row);
              handleOpenAbsen(row);
            }}
            onOpenScanface={(row) => {
              setSelectedJadwal(row);
              setOpenScanFace(true);
            }}
            onOpenQr={(row) => {
              setSelectedJadwal(row);
              setOpenQr(true);
            }}
            onEditAbsen={(row) => {
              setSelectedJadwal(row);
              setShowedit(true);
            }}
          />
        </div>
      </div>
      <ModalFaceScanAbsenAsdos data={selectedJadwal} modalLihat={OpenScanFace} OnClose={setOpenScanFace} />
      <QrAbsensiAsdos data={selectedJadwal} loading={loadingTokenQr} OpenQr={OpenQr} tokenQr={tokenQr} fetchTokenQr={fetchTokenQr} onClose={() => setOpenQr(false)} />
      <ModalEditStatusAbsenAsdos
        data={selectedJadwal}
        modalEditstatus={showedit}
        loadingUpdate={loadingUpdate}
        OnClose={() => setShowedit(false)}
        onUpdate={async (data) => {
          setLoadingUpdate(true);
          try {
            const res = await ApiUpdateAbsenAsdos(data);
            showAlert(res.data.message);
            setShowedit(false);
          } catch (err) {
            console.error(`gagal memperbarui Data ${err.response.data.message}`);
            ErrAlert(err.response.data.message);
          } finally {
            setLoadingUpdate(false);
          }
        }}
      />
    </>
  );
};

export default DataboardJadwal;
