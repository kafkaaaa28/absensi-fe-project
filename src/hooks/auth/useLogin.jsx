import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { showToastError, showToastSuccess } from '../../utils/toast';
import { useNavigate } from 'react-router-dom';
export default function useLogin() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    setLoading(true);

    try {
      const res = await login(data);
      showToastSuccess(`Selamat Datang ${res.role} ${res.nama}`);
    } catch (err) {
      const status = err?.response?.status;
      const message = err?.response?.data?.message;
      if (status === 400 || status === 401) {
        showToastError(message);
        return;
      }

      if (status >= 500) {
        navigate('/error', {
          state: {
            message: message,
          },
        });
        return;
      }
      navigate('/error', {
        state: {
          message: 'Tidak dapat terhubung ke server',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
  };
}
