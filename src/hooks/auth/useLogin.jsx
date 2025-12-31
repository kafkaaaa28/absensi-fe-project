import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { showToastError, showToastSuccess } from '../../utils/toast';
export default function useLogin() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleLogin = async (data) => {
    setLoading(true);

    try {
      const res = await login(data);
      showToastSuccess(`Selamat Datang ${res.role} ${res.nama}`);
    } catch (err) {
      showToastError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
  };
}
