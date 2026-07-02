import React, { useEffect, useState } from 'react';
import { useNavigate as useNav, Link as RouterLink } from 'react-router-dom';
import { User, Mail, Lock, Hammer, Shield, ShoppingBag, Eye, EyeOff, Phone } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { register } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';

export default function Register() {
  const navigate = useNav()
  const dispatch = useDispatch()

  const [errors, setErrors] = useState({})

  // Register Process
  const queryClient = useQueryClient();

  // Register User
  const { mutate, isError, isPending, error, isSuccess, data } = useMutation({ mutationFn: (data) => register(data) })


  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" })



  const { name, email, password, phone, confirmPassword } = formData

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords Not Match!" })
    } else if (name === "" || email === "" || password === "" || phone === "") {
      setErrors({
        name: "Please Enter Name!",
        email: "Please Enter Email!",
        phone: "Please Enter Phone!",
        password: "Please Enter Password!",
        confirmPassword: "Please Enter Confirm Password!"

      })
    }

    mutate(formData)

  };


  useEffect(() => {

    if (data && isSuccess) {
      dispatch(registerUser(data))
    }


    if (data) {
      navigate("/profile")
    }


    if (isError && error) {
      window.alert(error.response.data.message)
    }


  }, [data, isSuccess, isError, data])

  if (isPending) {
    return <Loader message="Register User..." />
  }




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
          <div className="space-y-3">
            {/* Full Name */}
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  name='name'
                  type="text"
                  value={name}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Kumar"
                  className={`w-full pl-11 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${errors.fullName ? 'border-red-300' : 'border-slate-200'
                    }`}
                />
              </div>
              {errors.name && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  name='email'
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  className={`w-full pl-11 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${errors.email ? 'border-red-300' : 'border-slate-200'
                    }`}
                />
              </div>
              {errors.email && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.email}</p>}
            </div>
            {/* Phone */}
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  name='phone'
                  type="phone"
                  value={phone}
                  onChange={handleChange}
                  placeholder="+919123456789"
                  className={`w-full pl-11 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${errors.email ? 'border-red-300' : 'border-slate-200'
                    }`}
                />
              </div>
              {errors.phone && <p className="text-[10px] text-red-500 font-bold mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-11 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${errors.password ? 'border-red-300' : 'border-slate-200'
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
                  name='confirmPassword'
                  type="password"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 ${errors.confirmPassword ? 'border-red-300' : 'border-slate-200'
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
