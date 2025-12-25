import api from '../../utils/api';

export const getJadwal = () => api.get('/jadwal');
export const updateJadwal = (id, data) => api.put(`/jadwal/${id}`, data);
export const deleteJadwal = (id) => api.delete(`/jadwal/${id}`);
export const createJadwal = (data) => api.post('/jadwal', data);
