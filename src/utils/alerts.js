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
