import toast from 'react-hot-toast';

export const showToastError = (message) => {
  toast.error(message);
};
export const showToastSuccess = (message) => {
  toast.success(message);
};
