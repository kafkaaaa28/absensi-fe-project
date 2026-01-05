import { createContext, useContext, useState, useEffect } from 'react';
import api, { setAccessToken } from '../utils/api.js';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (fromData) => {
    const { data } = await api.post('/auth/login', fromData);

    setAccessToken(data.accessToken);
    await getMe();
    setIsAuthenticated(true);
    const userRole = data.user.role;
    setTimeout(() => {
      if (userRole === 'admin') {
        navigate('/dashboardAdmin');
      } else if (userRole === 'siswa') {
        navigate('/dashboard');
      } else if (userRole === 'dosen') {
        navigate('/dashboardDosen');
      } else if (userRole === 'asdos') {
        navigate('/dashboardAsisten');
      } else {
        navigate('/');
      }
    }, 100);
    return data.user;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const checkAuth = async () => {
    try {
      const resAuth = await api.post('/auth/refresh');
      const newAccessToken = resAuth.data.accessToken;
      await setAccessToken(newAccessToken);
      const res = await api.get('/auth/me');
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  const getMe = async () => {
    const { data } = await api.get('/auth/me');
    setUser(data);
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setUser,
        login,
        logout,
        checkAuth,
        getMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
