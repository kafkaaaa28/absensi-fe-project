import LoginForm from './LoginForm';
import useLogin from '../../hooks/auth/useLogin';
import bgappease from '../img/unnamed.png';
import appease from '../img/univ.png';

export default function Login() {
  const { handleLogin, loading, error } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${bgappease})` }}>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="relative z-10 bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-sm border border-gray-100">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <img src={appease} alt="University Logo" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-1">Welcome Back</h1>
          <p className="text-gray-600 text-xs">Sign in to continue</p>
        </div>

        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">© 2024 University System</p>
        </div>
      </div>
    </div>
  );
}
