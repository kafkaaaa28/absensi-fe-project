import { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { infoAlert } from '../../utils/alerts';
export default function LoginForm({ onSubmit, loading, error }) {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    identifier: '',
    password: '',
  });
  const [identifierType, setIdentifierType] = useState('');
  const handleChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, [e.target.name]: value });

    if (e.target.name === 'identifier') {
      setIdentifierType(detectIdentifierType(value));
    }
  };
  const detectIdentifierType = (input) => {
    if (input.includes('@')) return 'email';
    if (/^\d+$/.test(input)) return 'nim';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label htmlFor="identifier" className="text-xs font-medium text-gray-700">
          Email atau NIM
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MdEmail className="h-4 w-4 text-gray-400" />
          </div>
          <input
            id="identifier"
            type="text"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            placeholder="Masukkan Email atau NIM"
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-xs font-medium text-gray-700">
            Password
          </label>
          <button onClick={() => infoAlert('Mohon maaf fitur ini sedang diperbaiki')} type="button" className="text-xs text-blue-600 hover:text-blue-500">
            Forgot?
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLock className="h-4 w-4 text-gray-400" />
          </div>
          <input
            id="password"
            type={showPass ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan Password"
            className="w-full pl-9 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
            required
          />
          <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPass(!showPass)}>
            {showPass ? <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" /> : <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-xs text-center font-medium">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-blue-700 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Signing in...</span>
          </div>
        ) : (
          'Sign In'
        )}
      </button>

      <div className="text-center">
        <p className="text-xs text-gray-600">
          Don't have an account?{' '}
          <button onClick={() => infoAlert('Mohon maaf fitur ini sedang diperbaiki')} type="button" className="text-blue-600 hover:text-blue-500 font-medium">
            Contact Admin
          </button>
        </p>
      </div>
    </form>
  );
}
