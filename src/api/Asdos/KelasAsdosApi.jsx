import api from '../../utils/api';

export const getKelasAsdos = () => api.get('/asdos/kelas-asdos');
export const UpdateApproval = (idKelas, idAsdos, data) => api.put(`/asdos/kelas-asdos/approval/${idKelas}/${idAsdos}`, data);
