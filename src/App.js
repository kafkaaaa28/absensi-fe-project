import logo from './logo.svg';
import react, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/auth/login';
import api from './utils/api';
import Admin from './components/DashboardAdmin/Admin';
import Dosen from './components/DashboardDosen/Dosen';
import Mahasiswa from './components/DashboardSiswa/Mahasiswa';
import Asdos from './components/DashboardAsdos/Asdos';
import Beranda from './components/Beranda';
import LoadingPage from './LoadingPage';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [IsOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await api.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsAuthenticated(true);
          setUser(res.data);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          console.warn('Unauthorized, removing token');
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        } else {
          console.error('Other error:', err);
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };
    const timer1 = setTimeout(() => setIsOpen(false), 1200);
    checkAuth();
  }, []);

  return (
    <div className="overflow-hidden">
      {loading ? (
        <div className={`fixed top-0 left-0 w-full h-screen bg-[#162542] z-50 flex items-center justify-center transition-all duration-1000 ease-in-out transform ${IsOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <LoadingPage />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Beranda setIsAuthenticated={setIsAuthenticated} setUser={setUser} isAuthenticated={isAuthenticated} />} />
          <Route
            path="/login"
            element={
              isAuthenticated && user?.role === 'admin' ? (
                <Navigate to="/dashboardAdmin" />
              ) : isAuthenticated && user?.role === 'dosen' ? (
                <Navigate to="/dashboardDosen" />
              ) : isAuthenticated && user?.role === 'siswa' ? (
                <Navigate to="/dashboard" />
              ) : isAuthenticated && user?.role === 'asdos' ? (
                <Navigate to="/dashboardAsdos" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
              )
            }
          />

          <Route path="/dashboardAdmin/*" element={isAuthenticated && user?.role === 'admin' ? <Admin setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />

          <Route path="/dashboardDosen/*" element={isAuthenticated && user?.role === 'dosen' ? <Dosen setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/dashboardAsdos/*" element={isAuthenticated && user?.role === 'asdos' ? <Asdos setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/dashboard/*" element={isAuthenticated && user?.role === 'siswa' ? <Mahasiswa setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
