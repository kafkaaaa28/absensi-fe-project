import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import { useEffect } from 'react';
import Pusher from 'pusher-js';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import { useAbsensi } from '../context/AbsensiContext ';

export default function MahasiswaLayout() {
  const { user } = useAuth();
  const { setStatusMap } = useAbsensi();
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
      Swal.fire({
        icon: data.success ? 'success' : 'error',
        title: data.success ? 'Berhasil!' : 'Gagal!',
        text: data.message,
      });
    });

    channelQr.bind('absen-qr-update', (data) => {
      Swal.fire({
        icon: data.success ? 'success' : 'error',
        title: data.success ? 'Berhasil!' : 'Gagal!',
        text: data.message,
      });
    });

    return () => {
      channel.unbind_all();
      channelQr.unbind_all();
      pusher.unsubscribe(`absensi-channel-${user.id_siswa}`);
      pusher.unsubscribe(`absensi-channel-qr-${user.id_siswa}`);
      pusher.disconnect();
    };
  }, [user?.id_siswa]);

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2]">
      <Sidebar />
      <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px] pb-8 mt-5 sm:mt-20">
        <Outlet />
      </div>
    </div>
  );
}
