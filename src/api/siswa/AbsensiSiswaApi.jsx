import api from '../../utils/api';

export const KelasSiswa = () => api.get('/siswa/kelasSiswa');
export const AbsensiSiswa = (idKelas) => api.get(`/siswa/absensi/${idKelas}`);
export const statusAbsensi = () => api.get('/siswa/statusAbsen');
export const CekDaftarFace = () => api.get(`/siswa/cek-daftar`);
export const DaftarWajah = (data) => api.post('/siswa/upload-face', data);
export const ApiUpdateAbsenQr = (data) => api.put('siswa/absensi/update-qr', data);
