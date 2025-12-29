import React, { useEffect, useState } from 'react';
import LoadingPage from '../../../components/common/LoadingPage';
import { useAuth } from '../../../context/AuthContext';
import Databoard from './components/Databoard';
import useJadwal from '../../../hooks/Siswa/useJadwal';
import { useAbsensiContext } from '../../../context/AbsensiContext ';
import TabelJadwalHariini from './components/TabelJadwalHariini';
import StatusAkademik from './components/StatusAkademik';
import QuickLink from './components/QuickLink';
import useAbsensi from '../../../hooks/Siswa/useAbsensi';
import QrScanAbsensi from './components/QrScanAbsensi';
const DataBoardPage = () => {
  const { loading, user } = useAuth();
  const { jadwalSiswaHariIni, loadingJadwal } = useJadwal();
  const { ApiUpdateAbsenQr } = useAbsensi();
  const [selectedJadwal, setselectedJadwal] = useState(null);
  const [openScanQr, setopenScanQr] = useState(false);
  const { statusMap } = useAbsensiContext();
  const hariIni = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingPage color="#162542" />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-gray-50 ">
        <Databoard />
        <TabelJadwalHariini
          data={jadwalSiswaHariIni}
          statusMap={statusMap}
          hariIni={hariIni}
          loading={loadingJadwal}
          onOpenScan={(row) => {
            setselectedJadwal(row);
            setopenScanQr(true);
          }}
        />
        <div className="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-4">
          <QuickLink />
          <StatusAkademik />
        </div>
      </div>
      <QrScanAbsensi data={selectedJadwal} openScanQr={openScanQr} onClose={() => setopenScanQr(false)} user={user} ApiUpdateAbsenQr={ApiUpdateAbsenQr} />
    </>
  );
};

export default DataBoardPage;
