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
import { useAuth } from './context/AuthContext';
function App() {
  const [IsOpen, setIsOpen] = useState(true);
  const { isAuthenticated, setIsAuthenticated, user, setUser, loading } = useAuth();
  useEffect(() => {
    const timer1 = setTimeout(() => setIsOpen(false), 1200);
  }, []);

  return (
    <div className="overflow-hidden">
      {loading ? (
        <div className={`fixed top-0 left-0 w-full h-screen bg-[#162542] z-50 flex items-center justify-center transition-all duration-1000 ease-in-out transform ${IsOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <LoadingPage />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Beranda />} />
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
                <Login />
              )
            }
          />

          <Route path="/dashboardAdmin/*" element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />

          <Route path="/dashboardDosen/*" element={isAuthenticated && user?.role === 'dosen' ? <Dosen setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/dashboardAsdos/*" element={isAuthenticated && user?.role === 'asdos' ? <Asdos setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/dashboard/*" element={isAuthenticated && user?.role === 'siswa' ? <Mahasiswa setIsAuthenticated={setIsAuthenticated} setUser={setUser} /> : <Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
