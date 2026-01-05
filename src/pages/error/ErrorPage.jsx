import { useLocation, useNavigate } from 'react-router-dom';
import { FaExclamationTriangle, FaRedo, FaHome, FaArrowLeft } from 'react-icons/fa';
import { useEffect } from 'react';
const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;
  const retryPath = location.state?.retryPath;

  const handleRetry = () => {
    if (retryPath) {
      navigate(retryPath);
    } else {
      window.location.reload();
    }
  };
  useEffect(() => {
    if (!message) {
      navigate('/');
    }
  }, [message]);
  const handleGoHome = () => navigate('/');
  const handleGoBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <FaExclamationTriangle className="text-red-600 text-2xl" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-2">500</h1>
          <h2 className="text-xl font-semibold text-gray-800">Kesalahan Server</h2>
        </div>

        <div className="text-center mb-8">
          <p className="text-gray-600 mb-2">{message}</p>
          <p className="text-gray-500 text-sm">Tim kami telah diberitahu tentang masalah ini.</p>
        </div>
        <div className="space-y-3 mb-8">
          <button onClick={handleRetry} className="w-full bg-red-600 text-white font-medium py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
            <FaRedo />
            Coba Lagi
          </button>

          <button onClick={handleGoBack} className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <FaArrowLeft />
            Kembali
          </button>

          <button onClick={handleGoHome} className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <FaHome />
            Beranda
          </button>
        </div>

        {/* Status */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
            Status: Server Error
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
