import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function useLogin() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (data) => {
    setLoading(true);
    setError('');

    try {
      await login(data);
    } catch (err) {
      setError('Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleLogin,
  };
}
