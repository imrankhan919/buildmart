import React, { useState } from 'react';
import { Search, Users, Award } from 'lucide-react';
import VendorCard from '../components/marketplace/VendorCard';

export default function Vendors() {
  const [searchQuery, setSearchQuery] = useState('');

  // Hardcoded 5 dummy vendors
  const vendors = [
    {
      id: 1,
      name: 'Ramesh Khandelwal',
      businessName: 'Narmada Building Materials',
      location: 'Indore, Madhya Pradesh',
      rating: 4.8,
      totalProducts: 12,
      specialization: ['Cement', 'River Sand', 'AAC Blocks', 'Aggregates'],
    },
    {
      id: 2,
      name: 'Suresh Sharma',
      businessName: 'Khandelwal Iron & Steel',
      location: 'Bhopal, Madhya Pradesh',
      rating: 4.7,
      totalProducts: 8,
      specialization: ['TMT Steel Rebars', 'Structural Beams', 'Binding Wire'],
    },
    {
      id: 3,
      name: 'Anil Somany',
      businessName: 'Somany Tiles Plaza',
      location: 'Mumbai, Maharashtra',
      rating: 4.6,
      totalProducts: 15,
      specialization: ['Vitrified Tiles', 'White Marble', 'Granite Slabs'],
    },
    {
      id: 4,
      name: 'Vijay Ram',
      businessName: 'Shri Ram Brick Kiln',
      location: 'Indore, Madhya Pradesh',
      rating: 4.5,
      totalProducts: 5,
      specialization: ['Red Clay Bricks', 'Flyash Bricks', 'Solid Blocks'],
    },
    {
      id: 5,
      name: 'Amit Patel',
      businessName: 'Indore Timber Mart',
      location: 'Indore, Madhya Pradesh',
      rating: 4.8,
      totalProducts: 9,
      specialization: ['Teak Wood', 'Plywood Sheets', 'Shuttering Timber'],
    },
  ];

  // Simple filter logic for mock UX
  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-350 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <Users className="w-3.5 h-3.5 text-amber-500" />
            <span>Verified Raw Material Providers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Trusted Material Vendors
          </h1>
          <p className="text-sm text-slate-450 leading-relaxed max-w-lg mx-auto">
            Connect directly with verified local manufacturers, dealers, and suppliers in your city. Save on middleman commissions.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 max-w-2xl mx-auto mb-12 shadow-sm relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search vendor name, location, or specialized materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm"
            />
          </div>
        </div>

        {/* Vendors Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Showing {filteredVendors.length} Suppliers
            </p>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold bg-amber-50 border border-amber-100 px-3 py-1 rounded-lg">
              <Award className="w-4 h-4 fill-amber-500/10" />
              <span>100% Verified Business Licenses</span>
            </div>
          </div>

          {filteredVendors.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-400 font-medium">
              No vendors found matching "{searchQuery}"
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
