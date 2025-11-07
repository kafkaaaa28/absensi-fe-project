import react, { useState, useEffect } from 'react';
import NavAsdos from './NavAsdos';
import { Routes, Route } from 'react-router-dom';
import DataboardAsdos from './DataboardAsdos';
import ProfileAsdos from './Profile/Profile';

const Asdos = ({ setIsAuthenticated, setUser }) => {
  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] ">
      <NavAsdos setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
      <div>
        <div className="ml-[20px] mr-[20px] md:ml-[270px] md:mr-[20px]">
          <Routes>
            <Route index element={<DataboardAsdos />} />
            <Route path="ProfileSaya" element={<ProfileAsdos />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default Asdos;
