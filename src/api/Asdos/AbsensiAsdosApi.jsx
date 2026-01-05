import api from '../../utils/api';
export const ApiBukaAbsenAsdos = (id_kelas, id_jadwal) => api.post(`/dosen/absensi/${id_kelas}/${id_jadwal}`);
export const ApiUpdateAbsenAsdos = (data) => api.put(`/dosen/absen/update-all`, data);
export const ApiFaceEmbeddingAsdos = (data) => api.get(`dosen/faceSiswa/${data}`);
export const ApiUpdateAbsenFaceAsdos = (idKelas, idJadwal, data) => api.put(`dosen/absensi/update-face/${idKelas}/${idJadwal}`, data);
export const TanggalAbsenAsdos = (idKelas) => api.get(`/dosen/absensi/tanggal/${idKelas}`);
export const AbsenPerKelasAsdos = (idKelas, date) => api.get(`/dosen/absensi/Allsiswa/${idKelas}/${date}`);
export const GenerateQrAsdos = (idKelas, idJadwal) => api.post(`/dosen/absensi/generateQr/${idKelas}/${idJadwal}`);
export const getMahasiswaAsdos = (idKelas, idJadwal) => api.get(`/dosen/absensi/siswa/${idKelas}/${idJadwal}`);
