import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './img/univ.png';
import { FaUser, FaSignOutAlt, FaSignInAlt, FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { MdDashboard } from 'react-icons/md';
const Navbar = () => {
  const { logout, isAuthenticated, user, getMe } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDashboard = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const roleRoutes = {
      admin: '/dashboardAdmin',
      siswa: '/dashboard',
      dosen: '/dashboardDosen',
      asdos: '/dashboardAsdos',
    };

    navigate(roleRoutes[user?.role] || '/login');
  };

  useEffect(() => {
    if (isAuthenticated) {
      getMe();
    }
  }, [isAuthenticated]);

  return (
    <nav className="backdrop-blur-sm bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2">
              <img src={logo} className="w-8 h-8" alt="Universitas Appease" />
              <span className="text-white font-bold text-lg hidden sm:inline">Universitas Appease</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={handleDashboard} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600/80 rounded-lg hover:bg-blue-700 transition-colors">
              <MdDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">{isAuthenticated ? <FaUser className="w-4 h-4 text-blue-300" /> : <FaSignInAlt className="w-4 h-4 text-blue-300" />}</div>
                <span className="hidden md:inline">{isAuthenticated ? user?.nama?.split(' ')[0] || 'User' : 'Login'}</span>
                <FaChevronDown className={`w-3 h-3 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-2">
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-800">{user?.nama}</p>
                          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                        </div>
                        <button
                          onClick={() => {
                            logout();
                            navigate('/');
                            setShowDropdown(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <FaSignOutAlt className="w-4 h-4" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          navigate('/login');
                          setShowDropdown(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <FaSignInAlt className="w-4 h-4" />
                        Sign In
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
