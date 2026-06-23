import React, { useState } from 'react';
import { useNavigate as useNav, Link as RouterLink } from 'react-router-dom';
import { User, Mail, Lock, Hammer, Shield, ShoppingBag, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const navigate = useNav();
  const [role, setRole] = useState('buyer'); // 'buyer' or 'vendor'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!fullName) newErrors.fullName = 'Full Name is required';
    if (!email) newErrors.email = 'Email address is required';
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Redirect simulated registration success
    navigate(role === 'vendor' ? '/dashboard' : '/marketplace');
  };

  return (
    <div className="bg-slate-50 min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative select-none">
      {/* Soft Background blur circles */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>

      <div className="max-w-md w-full space-y-6 bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-xl relative z-10">
        
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-slate-900 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow mb-4">
            <Hammer className="w-5 h-5 text-amber-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-950">Join BuildMart</h2>
          <p className="mt-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider">Create a free raw materials account</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          
          {/* Role Toggle Selector */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-2 text-center">I am registering as a...</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border text-xs font-black transition-all duration-200 ${
                  role === 'buyer'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buyer / Builder</span>
              </button>
              
              <button
                type="button"
                onClick={() => setRole('vendor')}
                className={`flex items-center justify-center gap-2 py-3.5 rounded-xl border text-xs font-black transition-all duration-200 ${
                  role === 'vendor'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Supplier / Vendor</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {/* Full Name */}
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => { setFullName(e.target.value); setErrors(prev => ({ ...prev, fullName: null })); }}
                  placeholder="e.g. Ramesh Kumar"
                  className={`w-full pl-11 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                    errors.fullName ? 'border-red-300' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.fullName && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: null })); }}
                  placeholder="name@domain.com"
                  className={`w-full pl-11 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                    errors.email ? 'border-red-300' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: null })); }}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-11 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
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
              {errors.password && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: null })); }}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${
                    errors.confirmPassword ? 'border-red-300' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.confirmPassword && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all duration-300 shadow-md shadow-amber-500/10 transform hover:-translate-y-0.5 mt-2"
          >
            Create Account
          </button>
        </form>

        {/* Footer link */}
        <p className="mt-6 text-center text-xs text-slate-550">
          Already have an account?{' '}
          <RouterLink to="/login" className="font-extrabold text-amber-500 hover:text-amber-600">
            Sign In
          </RouterLink>
        </p>

      </div>
    </div>
  );
}
