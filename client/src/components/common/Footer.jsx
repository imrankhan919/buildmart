import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 select-none mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white font-extrabold text-lg tracking-tight">
              <span className="bg-amber-500 text-slate-900 p-1.5 rounded-lg flex items-center justify-center">
                <Hammer className="w-4 h-4" />
              </span>
              <span>BuildMart</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              India's first AI-powered raw construction materials marketplace. Order materials directly from local vendors and design dream homes with our intelligent floor planners.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-amber-500 transition-colors">Browse Materials</Link>
              </li>
              <li>
                <Link to="/floor-plan" className="hover:text-amber-500 transition-colors">AI Floor Plan Generator</Link>
              </li>
              <li>
                <Link to="/vendors" className="hover:text-amber-500 transition-colors">Find Vendors</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-amber-500 transition-colors">Vendor Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/marketplace?category=cement" className="hover:text-amber-500 transition-colors">Cement</Link>
              </li>
              <li>
                <Link to="/marketplace?category=bricks" className="hover:text-amber-500 transition-colors">Bricks & Blocks</Link>
              </li>
              <li>
                <Link to="/marketplace?category=tiles" className="hover:text-amber-500 transition-colors">Tiles & Stones</Link>
              </li>
              <li>
                <Link to="/marketplace?category=steel" className="hover:text-amber-500 transition-colors">Structural Steel</Link>
              </li>
              <li>
                <Link to="/marketplace?category=sand" className="hover:text-amber-500 transition-colors">Sand & Aggregate</Link>
              </li>
              <li>
                <Link to="/marketplace?category=wood" className="hover:text-amber-500 transition-colors">Wood & Timber</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span>eSkills Web, Indore, Madhya Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>support@buildmart.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} BuildMart. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 mt-4 md:mt-0 flex items-center justify-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by eSkills Web, Indore
          </p>
        </div>
      </div>
    </footer>
  );
}
