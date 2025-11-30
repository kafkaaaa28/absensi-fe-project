import React from 'react';
import bgadmin from '../../../../components/img/bgadmin.png';
import { useAuth } from '../../../../context/AuthContext';
import { Spinner } from 'flowbite-react';
import LoadingPage from '../../../../components/common/LoadingPage';

const DataBoard = ({ loading, Menu, error }) => {
  const { user } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoadingPage color="#162542" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="relative rounded-xl overflow-hidden h-52 md:h-64 shadow-lg mb-5">
        <img src={bgadmin} alt="dashboard background" className="absolute inset-0 w-full h-full object-cover object-[center_50%] z-0" />

        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="relative z-20 h-full w-full p-6 md:p-8 flex flex-col md:flex-row justify-between items-center text-white">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Selamat Datang, <span className="text-blue-300"> Admin {loading ? <Spinner color="success" size="md" aria-label="Loading" /> : user?.nama}</span> 👋
            </h2>
            <p className="text-white/80 mt-1 text-sm">Dashboard terbaru Anda ada di sini</p>
          </div>

          <div className="mt-4 md:mt-0">
            <span className="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg shadow-md">Admin Panel</span>
          </div>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {Menu.map((m, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition duration-300">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">{m.icon}</div>
              <div>
                <p className="text-sm text-gray-500">Total Mahasiswa</p>
                <p className="text-2xl font-semibold text-gray-700">{loading ? <Spinner color="info" aria-label="Info spinner example" /> : m.total}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataBoard;
