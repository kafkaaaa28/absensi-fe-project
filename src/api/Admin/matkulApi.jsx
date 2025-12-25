import api from '../../utils/api';
// matkul
export const getMatkul = () => api.get('/matkul');
export const updateMatkul = (id, data) => api.put(`/matkul/${id}`, data);
export const deleteMatkul = (id) => api.delete(`/matkul/${id}`);
export const createMatkul = (data) => api.post('/matkul', data);
