import LoginForm from './LoginForm';
import useLogin from '../../hooks/auth/useLogin';
import bgappease from '../img/unnamed.png';
import appease from '../img/univ.png';

export default function Login() {
  const { handleLogin, loading, error } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="absolute inset-0 bg-cover bg-center bg-fixed z-0" style={{ backgroundImage: `url(${bgappease})` }}>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-[90%] max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src={appease} alt="University Logo" className="w-24 h-24 object-contain drop-shadow-lg" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Sign in to your account</p>
        </div>

        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">© 2024 University System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
