import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './img/univ.png';
import { FaRegUser } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';
import { FiLogOut } from 'react-icons/fi';
import api from '../utils/api';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout, isAuthenticated, user, getMe } = useAuth();

  const navigate = useNavigate();

  const handleDashboard = () => {
    if (user.role === 'admin') {
      navigate('/dashboardAdmin');
    } else if (user.role === 'siswa') {
      navigate('/dashboard');
    } else if (user.role === 'dosen') {
      navigate('/dashboardDosen');
    } else if (user.role === 'asdos') {
      navigate('/dashboardAsdos');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Role Tidak Dikenali',
      });
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      getMe();
    }
  }, [isAuthenticated]);
  return (
    <nav className="">
      <div className="max-w-screen-xl flex flex-col md:flex-row items-center justify-between mx-auto p-4">
        <div className="flex w-full md:w-auto justify-center items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="w-12" alt="Universitas Appease" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Universitas Appease</span>
        </div>

        <div className="w-full items-center justify-center md:w-auto" id="navbar-default">
          <ul className="font-medium flex items-center gap-5 justify-center md:p-0 rounded-lg">
            <li>
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    {
                      logout();
                      navigate('/');
                    }
                  } else {
                    navigate('/login');
                  }
                }}
                className="py-2 px-3 flex justify-center items-center gap-3 text-white font-bold text-lg md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                {isAuthenticated ? (
                  <>
                    <FiLogOut /> <p>Logout</p>
                  </>
                ) : (
                  <>
                    <FaRegUser /> <p>Login</p>
                  </>
                )}
              </button>
            </li>
            <li>
              <a
                onClick={() => {
                  if (isAuthenticated) {
                    handleDashboard();
                  } else {
                    navigate('/login');
                  }
                }}
                className="py-2 px-3 flex justify-center cursor-pointer items-center gap-3 text-white font-bold text-lg md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                <LuLayoutDashboard /> dashboard
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
