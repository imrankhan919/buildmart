import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Key, Hammer, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) newErrors.email = 'Email address is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate login success and redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="bg-slate-50 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative select-none">
      {/* Soft Background blur circles */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>

      <div className="max-w-md w-full space-y-8 bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-xl relative z-10">
        
        {/* Logo/Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow mb-4">
            <Hammer className="w-5 h-5 text-amber-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-950">Welcome Back</h2>
          <p className="mt-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">Sign in to your BuildMart account</p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: null })); }}
                  placeholder="you@example.com"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                    errors.email ? 'border-red-300' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1.5">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-500">Password</label>
                <Link to="/login" className="text-xs font-semibold text-amber-500 hover:text-amber-600">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: null })); }}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-11 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                    errors.password ? 'border-red-300' : 'border-slate-200'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-650"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-red-500 font-bold mt-1.5">{errors.password}</p>}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all duration-300 shadow-md shadow-amber-500/10 transform hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </form>

        {/* Social SSO login separator */}
        <div className="mt-6">
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-slate-400 font-semibold uppercase tracking-wider relative z-10">Or continue with</span>
            <div className="absolute inset-0 top-1/2 border-t border-slate-100"></div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => navigate('/dashboard')}
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-sm transition-colors"
            >
              {/* Simple Google SVG Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.1.97-1.15 2.1l-.03.02 2.6 2.02c1.53-1.4 2.63-3.48 2.63-5.99z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.8-2.95c-1.08.73-2.47 1.16-4.16 1.16-3.2 0-5.9-2.16-6.87-5.07L1.22 17.2C3.24 21.2 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.13 14.23A7.12 7.12 0 0 1 4.75 12c0-.78.13-1.53.38-2.23L1.22 6.8c-.83 1.66-1.3 3.52-1.3 5.2s.47 3.54 1.3 5.2l3.91-2.97z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.22 0 12 0 7.31 0 3.24 2.8 1.22 6.8l3.91 2.97c.97-2.91 3.67-5.02 6.87-5.02z"
                />
              </svg>
              <span>Google SSO</span>
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="mt-8 text-center text-xs text-slate-550">
          Don't have an account?{' '}
          <Link to="/register" className="font-extrabold text-amber-500 hover:text-amber-600">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}
