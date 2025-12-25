import api from '../../utils/api';

// user
export const getAllDosen = () => api.get('/users/dosen');
export const getAllAsdos = () => api.get('users/asdos');
export const getAllMahasiswa = () => api.get('/users/siswa');
export const createUsers = (data) => api.post('/users/createusers', data);
export const updateUsers = (id, data) => api.put(`/users/${id}`, data);
export const deleteUsers = (id) => api.delete(`/users/${id}`);
export const deleteFaceMahasiswa = (id) => api.delete(`/users/face/${id}`);
