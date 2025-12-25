import React, { useEffect, useState } from 'react';
import LoadingPage from '../../../components/common/LoadingPage';
import { useAuth } from '../../../context/AuthContext';
import Databoard from './components/Databoard';
import useJadwal from '../../../hooks/Siswa/useJadwal';
import { useAbsensi } from '../../../context/AbsensiContext ';
import TabelJadwalHariini from './components/TabelJadwalHariini';
import StatusAkademik from './components/StatusAkademik';
import QuickLink from './components/QuickLink';
const DataBoardPage = () => {
  const { loading } = useAuth();
  const { jadwalSiswaHariIni, loadingJadwal } = useJadwal();
  const { statusMap } = useAbsensi();
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
    <div className="min-h-screen bg-gray-50 ">
      <Databoard />
      <TabelJadwalHariini data={jadwalSiswaHariIni} statusMap={statusMap} hariIni={hariIni} loading={loadingJadwal} />
      <div className="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-4">
        <QuickLink />
        <StatusAkademik />
      </div>
    </div>
  );
};

export default DataBoardPage;
