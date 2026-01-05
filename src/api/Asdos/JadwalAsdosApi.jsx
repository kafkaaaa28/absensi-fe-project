import api from '../../utils/api';

export const getJadwalAsdos = () => api.get('/asdos/jadwal-asdos');
export const getJadwalAsdosHariini = () => api.get('/asdos/jadwal-asdos/hariini');
export const TanggalAbsenAsdos = (idKelas) => api.get(`/dosen/absensi/tanggal/${idKelas}`);
