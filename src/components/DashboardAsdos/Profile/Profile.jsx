import React, { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaGraduationCap, FaCalendarAlt, FaUniversity, FaUserCog } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';

const ProfileAsdos = () => {
  const [Asdos, setAsdos] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchProfile = async () => {
    try {
      const res = await api.get('/asdos/profile');
      if (res.data && res.data.length > 0) {
        setAsdos(res.data[0]);
        console.log(res.data);
      } else {
        setAsdos(null);
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  if (!Asdos) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 my-10">
      <div className="flex flex-col items-center">
        <IoMdSchool className="text-[#162542] text-[80px]" />
        <h2 className="text-xl font-semibold mt-4">{Asdos.nama}</h2>
        <p className="text-gray-500">{Asdos.role}</p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-[#162542]" />
          <p className="text-gray-700">{Asdos.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <FaUserCog className="text-[#162542]" />
          <p className="text-gray-700">{Asdos.role}</p>
        </div>
        <div className="flex items-center gap-4">
          {Asdos.status === 'aktif' ? <FaCheckCircle className="text-green-400" /> : <FaTimesCircle className="text-red-400" />}
          <p className="text-gray-700">{Asdos.status}</p>
        </div>
        <div className="flex items-center gap-4">
          <FaGraduationCap className="text-[#162542]" />
          <p className="text-gray-700">{Asdos.tipe_asdos}</p>
        </div>
        <div className="flex items-center gap-4">
          <FaCalendarAlt className="text-[#162542]" />
          <p className="text-gray-700">
            Anda Terdaftar Pada{' '}
            {Asdos.create
              ? new Date(Asdos.create).toLocaleString('id-ID', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                })
              : 'Tidak tersedia'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileAsdos;
