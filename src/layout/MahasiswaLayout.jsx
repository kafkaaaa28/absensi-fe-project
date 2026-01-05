import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { useAuth } from '../context/AuthContext';
import { useAbsensiContext } from '../context/AbsensiContext ';
import useAbsensi from '../hooks/Siswa/useAbsensi';
import { modalcekface } from '../utils/alerts';
import ModalDaftarWajah from '../pages/Mahasiswa/components/ModalDaftarWajah';
import { showAlert, ErrAlert } from '../utils/alerts';

export default function MahasiswaLayout() {
  const { user } = useAuth();
  const { setStatusMap } = useAbsensiContext();
  const { cekFace } = useAbsensi();
  const [showModal, setShowModal] = useState(false);
  const handleCek = async (data) => {
    const result = await modalcekface(data);
    if (result.isConfirmed) {
      setShowModal(true);
    }
  };
  useEffect(() => {
    if (!user?.id_siswa) return;

    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    });

    const channel = pusher.subscribe(`absensi-channel-${user.id_siswa}`);
    const channelQr = pusher.subscribe(`absensi-channel-qr-${user.id_siswa}`);
    channel.bind('absen-update', (data) => {
      setStatusMap((prev) => ({
        ...prev,
        [data.id_kelas]: data.status,
      }));
      if (data.success) {
        showAlert(data.message);
      } else {
        ErrAlert(data.message);
      }
    });
    channelQr.bind('absen-qr-update', (data) => {
      setStatusMap((prev) => ({
        ...prev,
        [data.id_kelas]: data.status,
      }));
      if (data.success) {
        showAlert(data.message);
      } else {
        ErrAlert(data.message);
      }
    });

    return () => {
      channel.unbind_all();
      channelQr.unbind_all();
      pusher.unsubscribe(`absensi-channel-${user.id_siswa}`);
      pusher.unsubscribe(`absensi-channel-qr-${user.id_siswa}`);
      pusher.disconnect();
    };
  }, [user?.id_siswa]);
  useEffect(() => {
    const checkFace = async () => {
      const hasFace = await cekFace();
      if (!hasFace) {
        handleCek('Silakan lakukan verifikasi wajah');
      }
    };

    checkFace();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2]">
      <Sidebar />
      <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px] pb-8 mt-4 sm:mt-20">
        <Outlet />
      </div>
      <ModalDaftarWajah showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}
