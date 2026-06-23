import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Package, Award } from 'lucide-react';

export default function VendorCard({ vendor }) {
  const {
    id,
    name,
    businessName,
    location,
    rating,
    totalProducts,
    specialization = [],
    image,
  } = vendor;

  // Generate Initials
  const getInitials = (text) => {
    return text
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  // Avatar Gradient Colors
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-amber-500 to-orange-600',
    'from-emerald-500 to-teal-600',
    'from-rose-500 to-pink-600',
    'from-violet-500 to-purple-600',
  ];
  // Select a consistent gradient based on the vendor ID
  const selectedGradient = gradients[id % gradients.length];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Header Info */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-extrabold text-lg bg-gradient-to-br ${selectedGradient} shadow-md flex-shrink-0`}>
          {getInitials(businessName)}
        </div>
        
        {/* Name details */}
        <div className="min-w-0 flex-grow">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h3 className="font-extrabold text-slate-950 text-base leading-tight truncate">
              {businessName}
            </h3>
            <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
          </div>
          <p className="text-xs text-slate-400 font-medium mb-1.5">Owner: {name}</p>
          
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-lg">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="text-[10px] font-bold text-slate-700">{rating}</span>
            </div>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Package className="w-3 h-3 text-slate-300" />
              {totalProducts} products
            </span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-4">
        <MapPin className="w-4 h-4 text-slate-400" />
        <span>{location}</span>
      </div>

      {/* Specializations Tags */}
      <div className="mb-6 flex-grow">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Specializes In</span>
        <div className="flex flex-wrap gap-1.5">
          {specialization.map((spec, index) => (
            <span
              key={index}
              className="text-[10px] font-semibold bg-slate-50 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded-md"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* View Profile Action */}
      <div className="pt-4 border-t border-slate-50">
        <Link
          to={`/vendors/${id}`}
          className="w-full flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors tracking-wide"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}
