import Swal from 'sweetalert2';

export const showAlert = (data) => {
  Swal.fire({
    title: 'Berhasil!',
    icon: 'success',
    text: data,
  });
};

export const ErrAlert = (data) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: data,
  });
};

export const infoAlert = (data) => {
  Swal.fire({
    icon: 'info',
    title: 'Informasi',
    text: data,
    allowOutsideClick: false,
  });
};
export const modalcekface = (data) => {
  return Swal.fire({
    icon: 'info',
    title: 'Informasi',
    text: data,
    allowOutsideClick: false,
    confirmButtonText: 'OK',
  });
};
export const warningAlert = (data) => {
  Swal.fire({
    icon: 'warning',
    title: 'Informasi',
    text: data,
  });
};
