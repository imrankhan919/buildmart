import React from 'react';
import { SlidersHorizontal, RotateCcw, Check, Star } from 'lucide-react';

export default function FilterPanel() {
  const categories = [
    { label: 'Cement', value: 'cement' },
    { label: 'Bricks & Blocks', value: 'bricks' },
    { label: 'Tiles & Stones', value: 'tiles' },
    { label: 'Structural Steel', value: 'steel' },
    { label: 'Sand & Aggregate', value: 'sand' },
    { label: 'Wood & Timber', value: 'wood' },
  ];

  const locations = [
    'All Locations',
    'Indore',
    'Bhopal',
    'Mumbai',
    'Pune',
    'Delhi',
    'Bengaluru',
  ];

  const ratings = [
    { label: '4.5 ★ & above', value: '4.5' },
    { label: '4.0 ★ & above', value: '4.0' },
    { label: '3.5 ★ & above', value: '3.5' },
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <span>Filters</span>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-slate-400 hover:text-amber-600 transition-colors flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear All</span>
        </button>
      </div>

      {/* Category Checkboxes */}
      <div className="mb-6">
        <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.value} className="flex items-center gap-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 transition-colors cursor-pointer"
              />
              <span>{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range (Min/Max inputs) */}
      <div className="mb-6">
        <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-3">Price Range (₹)</h4>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Min Price</label>
            <input
              type="number"
              placeholder="Min"
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 block mb-1">Max Price</label>
            <input
              type="number"
              placeholder="Max"
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
        </div>
        
        {/* Simple Slider Track (Just UI) */}
        <div className="relative pt-1 px-1">
          <div className="h-1 bg-slate-100 rounded-full">
            <div className="absolute left-[15%] right-[25%] h-1 bg-amber-500 rounded-full"></div>
          </div>
          <div className="absolute left-[15%] top-0 w-3 h-3 bg-white border-2 border-amber-500 rounded-full cursor-pointer shadow"></div>
          <div className="absolute right-[25%] top-0 w-3 h-3 bg-white border-2 border-amber-500 rounded-full cursor-pointer shadow"></div>
        </div>
      </div>

      {/* Location Select */}
      <div className="mb-6">
        <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-3">Location</h4>
        <select
          defaultValue="All Locations"
          className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Minimum Rating Radio Buttons */}
      <div>
        <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {ratings.map((rate) => (
            <label key={rate.value} className="flex items-center gap-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer">
              <input
                type="radio"
                name="rating_filter"
                className="w-4 h-4 border-slate-300 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 transition-colors cursor-pointer"
              />
              <span className="flex items-center gap-1.5">
                {rate.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
