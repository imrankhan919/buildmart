import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ShoppingCart, Info } from 'lucide-react';

export default function ProductCard({ product }) {
  const {
    id,
    name,
    category,
    price,
    unit,
    vendorName,
    location,
    rating,
    image,
    minOrderQty,
    availability,
  } = product;

  // Category Colors
  const categoryColors = {
    cement: 'bg-blue-50 text-blue-700 border-blue-200',
    bricks: 'bg-red-50 text-red-700 border-red-200',
    tiles: 'bg-purple-50 text-purple-700 border-purple-200',
    steel: 'bg-slate-100 text-slate-800 border-slate-300',
    sand: 'bg-amber-50 text-amber-800 border-amber-200',
    wood: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const currentCategoryColor = categoryColors[category.toLowerCase()] || 'bg-slate-50 text-slate-700 border-slate-200';

  // Availability Colors
  const availabilityStyles = {
    'In Stock': 'bg-green-50 text-green-700 border-green-200',
    'Low Stock': 'bg-orange-50 text-orange-700 border-orange-200',
    'Out of Stock': 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const currentAvailabilityStyle = availabilityStyles[availability] || 'bg-slate-50 text-slate-700';

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Product Image Panel */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={image || `https://placehold.co/400x300?text=${encodeURIComponent(name)}`}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Availability Badge */}
        <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border shadow-sm ${currentAvailabilityStyle}`}>
          {availability}
        </span>
        
        {/* Category Badge */}
        <span className={`absolute bottom-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border shadow-sm ${currentCategoryColor}`}>
          {category}
        </span>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          {/* Vendor Name */}
          <span className="text-xs font-medium text-slate-400 truncate max-w-[60%]">
            {vendorName}
          </span>
          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="text-xs font-bold text-slate-700">{rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-slate-500 text-xs mb-4">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{location}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50">
          {/* Price details */}
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-slate-400">Price</span>
              <div className="text-lg font-extrabold text-slate-900">
                ₹{price.toLocaleString('en-IN')} <span className="text-xs font-medium text-slate-500">/ {unit}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Min. Order</span>
              <span className="text-xs font-bold text-slate-700">{minOrderQty} {unit}s</span>
            </div>
          </div>

          {/* View details action */}
          <Link
            to={`/marketplace/${id}`}
            className="w-full flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl text-sm transition-all duration-200 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-slate-950"
          >
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
