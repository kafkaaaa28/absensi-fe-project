import api from '../../utils/api';

export const getKelas = () => api.get('/kelas');
export const updateKelas = (id, data) => api.put(`/kelas/${id}`, data);
export const deleteKelas = (id) => api.delete(`/kelas/${id}`);
export const createKelas = (data) => api.post('/kelas', data);
export const getMahasiswaKelas = (id) => api.get(`/kelas/${id}`);
// api untuk mengambil kelas per mahasiswa
export const getKelasMahasiswa = (id) => api.get(`/kelas/kelassiswa/${id}`);
export const createKelasMahasiswa = (data) => api.post('/kelas/siswa', data);
export const deleteKelasMahasiswa = (idSiswa, idKelas) => api.delete(`/kelas/siswa/${idSiswa}/${idKelas}`);
