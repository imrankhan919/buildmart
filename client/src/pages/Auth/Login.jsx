import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Mail, Lock, Hammer, Eye, EyeOff } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/authService';
import Loader from '../../components/common/Loader';
import { useToast, getErrorMessage } from '../../components/common/Toast.jsx';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';

export default function Login() {
  const { mutate, data, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (payload) => login(payload),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(loginUser(data));
      toast.success('Welcome back!');
      const redirect = searchParams.get('redirect') || '/profile';
      navigate(redirect);
    }
  }, [isSuccess, data, dispatch, navigate, searchParams, toast]);

  useEffect(() => {
    if (isError && error) {
      toast.error(getErrorMessage(error, 'Login failed. Please check your credentials.'));
    }
  }, [isError, error, toast]);

  if (isPending) {
    return <Loader message="Logging In User..." />;
  }

  return (
    <div className="bg-slate-50 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative select-none">
      <div className="absolute top-10 left-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>

      <div className="max-w-md w-full space-y-8 bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-xl relative z-10">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow mb-4">
            <Hammer className="w-5 h-5 text-amber-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-950">Welcome Back</h2>
          <p className="mt-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">Sign in to your BuildMart account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="login-email" className="text-xs font-bold text-slate-500 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="login-password" className="text-xs font-bold text-slate-500">Password</label>
                <Link to="/login" className="text-xs font-semibold text-amber-500 hover:text-amber-600">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  name="password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-11 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all duration-300 shadow-md shadow-amber-500/10 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-extrabold text-amber-500 hover:text-amber-600">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
