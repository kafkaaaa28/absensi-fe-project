import api from '../../utils/api';

export const JadwalSiswaHarini = () => api.get('/siswa/jadwalharini');
export const JadwalSiswa = () => api.get('/siswa/jadwalsiswa');
