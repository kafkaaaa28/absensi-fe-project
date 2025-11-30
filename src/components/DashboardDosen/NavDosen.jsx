import React from 'react';
import { useState, useEffect } from 'react';
import { FaBars, FaHome, FaChalkboardTeacher, FaBook, FaCalendarAlt } from 'react-icons/fa';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { FaUserTie } from 'react-icons/fa6';
import api from '../../utils/api';

import { Link } from 'react-router-dom';
import appease from '../img/univ.png';
import { IoMdSchool } from 'react-icons/io';
import { useAuth } from '../../context/AuthContext';
const Navdashboard = () => {
  const { logout, user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const Toggler = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="flex justify-end">
        <button onClick={Toggler} type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-[26px] text-gray-500 rounded-lg sm:hidden hover:bg-[#162542] focus:outline-none focus:ring-2 focus:ring-gray-200 hover:text-white">
          <FaBars />
        </button>
      </div>
      <aside id="default-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform sm:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">
        <div className="h-full flex flex-col px-3 py-4 overflow-y-auto bg-[#162542]">
          <div className="flex flex-col justify-center items-center mb-5 gap-2">
            <img className="w-14 h-14 rounded-full" src={appease} alt="Rounded avatar"></img>
            <p className="text-white font-bold uppercase">Universitas Appease</p>
          </div>
          <div className=" flex flex-col justify-center items-center gap-2">
            <div className="bg-white h-14 w-14 flex items-center justify-center rounded-full">
              <FaUserTie className="text-[24px]" />
            </div>
            {loading ? (
              <p className="text-white my-3 font-bold">Memuat Data...</p>
            ) : (
              <>
                <p className="text-white font-bold text-center">{user.nama}</p>
                <p className="text-white font-bold mb-3 text-center">{user.email}</p>
              </>
            )}
          </div>
          <ul className="space-y-2 font-medium flex-1 mx-6 ">
            <li>
              <Link to={'/dashboardDosen'} className="flex items-center p-2 text-white rounded-lg   hover:bg-gray-700">
                <FaHome className="text-red-500" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardDosen/ProfileSaya'} className="flex items-center p-2 text-white rounded-lg   hover:bg-gray-700">
                <IoMdSchool className="text-yellow-500" />
                <span className="ms-3">Profile</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardDosen/jadwalSaya'} className="flex items-center p-2 text-white rounded-lg   hover:bg-gray-700">
                <FaCalendarAlt className="text-green-500" />
                <span className="ms-3">Jadwal</span>
              </Link>
            </li>
            <li>
              <Link to={'/dashboardDosen/MatkulSaya'} className="flex items-center p-2 text-white rounded-lg   hover:bg-gray-700">
                <FaBook className="text-yellow-500" />
                <span className="ms-3">MataKuliah</span>
              </Link>
            </li>
          </ul>

          <div className="mt-auto">
            <button onClick={logout} className="flex items-center p-2 w-full text-white bg-black rounded-lg hover:bg-gray-700">
              <RiLogoutBoxLine className="text-lg" />
              <span className="ms-3">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navdashboard;
