import api from '../../utils/api';
export const getSiswaPerkelasAsdos = (idKelas) => api.get(`/dosen/siswakelas/${idKelas}`);
export const getAbsensiMahasiswaAsdos = (idKelas, date) => api.get(`/dosen/absensi/Allsiswa/${idKelas}/${date}`);
