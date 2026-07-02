import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Hammer, FileText, ShoppingBag, Users, LayoutDashboard, User, ShieldAlert, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';

export default function Navbar() {

  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Styling helper for NavLinks
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
      ? 'text-amber-500 bg-slate-800/60 shadow-sm border border-slate-700/50'
      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 ${isActive
      ? 'text-amber-500 bg-slate-800 border-l-4 border-amber-500'
      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
    }`;



  const handleLogout = () => {
    dispatch(logoutUser())
    navigate("/login")
  };




  return (
    <nav className="sticky top-0 z-50 bg-[#0F172A] border-b border-slate-800 shadow-lg select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo on Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 text-white font-extrabold text-xl tracking-tight transition-transform hover:scale-105">
              <span className="bg-amber-500 text-slate-900 p-1.5 rounded-lg flex items-center justify-center">
                <Hammer className="w-5 h-5" />
              </span>
              <span>BuildMart <span className="text-amber-500">🏗️</span></span>
            </Link>
          </div>

          {/* Desktop Nav Links (Center) */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/marketplace" className={navLinkClass}>
              <ShoppingBag className="w-4 h-4" />
              Marketplace
            </NavLink>
            <NavLink to="/floor-plan" className={navLinkClass}>
              <FileText className="w-4 h-4" />
              Floor Plan
            </NavLink>
            <NavLink to="/vendors" className={navLinkClass}>
              <Users className="w-4 h-4" />
              Vendors
            </NavLink>

          </div>

          {/* Desktop Controls (Right) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Authentication Buttons / Profile Info */}

            {
              !user ? (
                <>

                  <div className="flex items-center gap-4">
                    <Link
                      to="/login"
                      className="text-slate-300 hover:text-white text-sm font-semibold transition-colors duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition-all duration-300 hover:shadow-md hover:shadow-amber-500/10 transform hover:-translate-y-0.5"
                    >
                      Register
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 hover:opacity-90 transition-opacity bg-slate-800 border border-slate-700/50 px-3 py-1.5 rounded-xl shadow-sm"
                      title="My Profile"
                    >
                      <div className="w-6.5 h-6.5 rounded-lg bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center justify-center">
                        {user?.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                      </div>
                      <span className="text-slate-200 text-xs font-bold max-w-[90px] truncate">{user?.name}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>

                </>
              )
            }



          </div>

          {/* Mobile Hamburger Menu Trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F172A] border-t border-slate-800 pb-4" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              end
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/marketplace"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Marketplace
            </NavLink>
            <NavLink
              to="/floor-plan"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Floor Plan
            </NavLink>
            <NavLink
              to="/vendors"
              onClick={() => setIsMobileMenuOpen(false)}
              className={mobileNavLinkClass}
            >
              Vendors
            </NavLink>

            {user?.role === 'vendor' && (
              <NavLink
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className={mobileNavLinkClass}
              >
                Vendor Desk
              </NavLink>
            )}

            {user?.role === 'admin' && (
              <NavLink
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className={mobileNavLinkClass}
              >
                Admin Console
              </NavLink>
            )}

            {user?.role !== 'guest' && (
              <NavLink
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className={mobileNavLinkClass}
              >
                My Profile
              </NavLink>
            )}
          </div>

          {/* Mobile Test Switcher and Auth buttons */}
          <div className="pt-4 border-t border-slate-850 px-4 space-y-4">



            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center border border-slate-705 text-slate-300 hover:text-white py-2.5 rounded-xl font-bold text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 rounded-xl text-sm text-center"
              >
                Register
              </Link>
            </div>

            {/* <button
                className="w-full flex items-center justify-center gap-2 border border-slate-800 text-red-405 font-bold py-2.5 rounded-xl text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button> */}

          </div>
        </div>
      )}
    </nav>
  );
}
