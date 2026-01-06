import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import LoadingPage from './components/common/LoadingPage';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './router/AppRoutes';
function App() {
  const [showLoader, setShowLoader] = useState(true);
  const { loading } = useAuth();
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 900);

      return () => clearTimeout(timer);
    }
  }, [loading]);
  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#162542] flex items-center justify-center z-50">
        <LoadingPage color="#F3F4F6" />
      </div>
    );
  }
  return (
    <div className="overflow-hidden  ">
      <Toaster position="top-center" />
      <AppRoutes />
      <div
        className={`
          fixed inset-0 z-50 flex items-center justify-center
          bg-[#162542]
          transition-transform duration-500 ease-in-out
          ${showLoader ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        <LoadingPage color="#F3F4F6" />
      </div>
    </div>
  );
}

export default App;
