import api from '../../utils/api';

// kelas
export const getKelasDosen = () => api.get('/dosen/kelasdosen');
// absen
export const ApiBukaAbsen = (id_kelas, id_jadwal) => api.post(`/dosen/absensi/${id_kelas}/${id_jadwal}`);
export const ApiUpdateAbsen = (data) => api.put(`/dosen/absen/update-all`, data);
export const ApiFaceEmbedding = (data) => api.get(`dosen/faceSiswa/${data}`);
export const ApiUpdateAbsenFace = (data) => api(`dosen/absensi/update-face`, { data });
// mahasiswa
export const getMahasiswa = (data_idJadwal, data_idKelas) => api.get(`/dosen/absensi/siswa/${data_idJadwal}/${data_idKelas}`);
// jadwal
export const getJadwalDosen = () => api.get('dosen/jadwaldosen');
export const JadwalDosenHariIni = () => api.get('/dosen/jadwalharini');
