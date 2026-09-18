import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import PropTypes from 'prop-types';

export default function ProductCard({ product }) {
  const { _id, id, name, category, price, unit, vendor, vendorName, location, image, stock } = product;
  const detailId = _id || id;
  const vendorLabel = vendor?.name || vendorName || 'Verified vendor';
  const locationLabel = vendor?.address || location || '';

  // Category Colors
  const categoryColors = {
    cement: 'bg-blue-50 text-blue-700 border-blue-200',
    bricks: 'bg-red-50 text-red-700 border-red-200',
    tiles: 'bg-purple-50 text-purple-700 border-purple-200',
    steel: 'bg-slate-100 text-slate-800 border-slate-300',
    sand: 'bg-amber-50 text-amber-800 border-amber-200',
    wood: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  const currentCategoryColor = categoryColors[(category || '').toLowerCase()] || 'bg-slate-50 text-slate-700 border-slate-200';

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
        <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border shadow-sm bg-white/90">
          {(stock ?? 1) > 0 ? "Available" : "Out Of Stock"}
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
            {vendorLabel}
          </span>
          {/* Rating */}
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="text-xs font-bold text-slate-700">5.0</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-slate-500 text-xs mb-4">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span>{locationLabel}</span>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50">
          {/* Price details */}
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-slate-400">Price</span>
              <div className="text-lg font-extrabold text-slate-900">
                ₹{Number(price || 0).toLocaleString('en-IN')} <span className="text-xs font-medium text-slate-500">/ {unit || 'unit'}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Available Stock</span>
              <span className="text-xs font-bold text-slate-700">{stock ?? '—'}</span>
            </div>
          </div>

          {/* View details action */}
          <Link
            to={detailId ? `/marketplace/${detailId}` : '/marketplace'}
            className="w-full flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 text-slate-700 font-bold py-2 px-4 rounded-xl text-sm transition-all duration-200 group-hover:bg-amber-500 group-hover:border-amber-500 group-hover:text-slate-950"
          >
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    unit: PropTypes.string,
    vendor: PropTypes.object,
    vendorName: PropTypes.string,
    location: PropTypes.string,
    image: PropTypes.string,
    stock: PropTypes.number,
  }).isRequired,
};
