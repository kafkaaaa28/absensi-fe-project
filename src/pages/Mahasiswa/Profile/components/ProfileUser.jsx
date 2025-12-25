import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';
const ProfileUser = ({ user }) => {
  return (
    <div className="bg-gradient-to-r rounded-lg  from-blue-600 to-blue-800 text-white pt-8 pb-6 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all">
            <FaEdit className="text-white" />
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                <IoMdSchool className="text-4xl text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{user.nama}</h2>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm">{user.role}</div>
              <p className="text-white/80 text-sm mt-2">Mahasiswa Berprestasi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
