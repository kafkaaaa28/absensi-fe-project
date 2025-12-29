import React, { useState } from 'react';
import { useDosen } from '../../../../hooks/Dosen/useDosen';
import TableJadwalHarini from './TableJadwalHarini';
import { ErrAlert, showAlert } from '../../../../utils/alerts';
import ModalAbsenFace from './ModalFaceScan';
import ModalEditStatusAbsen from './ModalEditStatusAbsen';
import { ServiceAbsensi } from '../services/Absensi';
import QrAbsensi from './QrAbsensi';
const JadwalPage = () => {
  const { jadwalharini, loading, ApiUpdateAbsen, tokenQr, fetchTokenQr, loadingTokenQr } = useDosen();
  const { handleOpenAbsen, refreshStatus } = ServiceAbsensi();
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [showedit, setShowedit] = useState(false);
  const [OpenScanFace, setOpenScanFace] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [OpenQr, setOpenQr] = useState(false);

  return (
    <div>
      <TableJadwalHarini
        data={jadwalharini}
        loading={loading}
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
      <QrAbsensi data={selectedJadwal} loading={loadingTokenQr} OpenQr={OpenQr} tokenQr={tokenQr} fetchTokenQr={fetchTokenQr} onClose={() => setOpenQr(false)} />
      <ModalAbsenFace data={selectedJadwal} modalLihat={OpenScanFace} OnClose={setOpenScanFace} />
      <ModalEditStatusAbsen
        data={selectedJadwal}
        modalEditstatus={showedit}
        loadingUpdate={loadingUpdate}
        OnClose={() => setShowedit(false)}
        refreshStatus={refreshStatus}
        onUpdate={async (data) => {
          setLoadingUpdate(true);
          try {
            const res = await ApiUpdateAbsen(data);
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
    </div>
  );
};

export default JadwalPage;
