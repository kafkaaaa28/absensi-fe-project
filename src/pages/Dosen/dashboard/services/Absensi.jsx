import { useDosen } from '../../../../hooks/Dosen/useDosen';
import { showAlert, ErrAlert } from '../../../../utils/alerts';

export const ServiceAbsensi = () => {
  const { ApiBukaAbsen, fetchSiswa } = useDosen();

  const handleOpenAbsen = async (row) => {
    try {
      const { id_kelas, id_jadwal } = row;
      const res = await ApiBukaAbsen(id_kelas, id_jadwal);
      showAlert(res.data.message);
    } catch (err) {
      console.log(`Gagal: ${err.response?.data?.message}`);
      ErrAlert(err.response?.data?.message);
    }
  };

  const refreshStatus = async (idJadwal, idKelas) => {
    try {
      await fetchSiswa(idJadwal, idKelas);
    } catch (err) {
      console.error(err);
    }
  };

  return { handleOpenAbsen, refreshStatus };
};
