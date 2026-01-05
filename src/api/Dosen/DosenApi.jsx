import api from '../../utils/api';

// kelas
export const getKelasDosen = () => api.get('/dosen/kelasdosen');
// absen
export const ApiBukaAbsen = (id_kelas, id_jadwal) => api.post(`/dosen/absensi/${id_kelas}/${id_jadwal}`);
export const ApiUpdateAbsen = (data) => api.put(`/dosen/absen/update-all`, data);
export const ApiFaceEmbedding = (data) => api.get(`dosen/faceSiswa/${data}`);
export const ApiUpdateAbsenFace = (idKelas, idJadwal, data) => api.put(`dosen/absensi/update-face/${idKelas}/${idJadwal}`, data);
export const TanggalAbsen = (idKelas) => api.get(`/dosen/absensi/tanggal/${idKelas}`);
export const AbsenPerKelas = (idKelas, date) => api.get(`/dosen/absensi/Allsiswa/${idKelas}/${date}`);
export const GenerateQr = (idKelas, idJadwal) => api.post(`/dosen/absensi/generateQr/${idKelas}/${idJadwal}`);
export const ApiUpdateAbsenPerkelas = (id_kelas, id_absen, data) => api.put(`/dosen/absensi/update/${id_kelas}/${id_absen}`, data);
// mahasiswa
export const getSiswaPerkelas = (idKelas) => api.get(`/dosen/siswakelas/${idKelas}`);
// absen hairini
export const getMahasiswa = (idKelas, idJadwal) => api.get(`/dosen/absensi/siswa/${idKelas}/${idJadwal}`);
// jadwal
export const getJadwalDosen = () => api.get('dosen/jadwaldosen');
export const JadwalDosenHariIni = () => api.get('/dosen/jadwalharini');
// asdos
export const getAsdos = () => api.get('/dosen/getasdos');
export const TambahAsisten = (data) => api.post(`/dosen/tambahAsisten`, data);
export const DetailAsdos = (idKelas, idDosen) => api.get(`/dosen/detailAsisten/${idKelas}/${idDosen}`);
export const deleteAsdos = (id) => api.delete(`/dosen/asdos/${id}`);
