import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, MessageCircle, Package, Calendar, Award } from 'lucide-react';
import ProductCard from '../components/marketplace/ProductCard';

export default function VendorProfile() {
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);

  // Mock Vendor Fetch based on ID or fallback
  const vendor = {
    id: id || 2,
    name: 'Ramesh Khandelwal',
    businessName: 'Narmada Building Materials',
    location: 'Indore, Madhya Pradesh',
    rating: 4.8,
    totalProducts: 4,
    specialization: ['Cement', 'River Sand', 'AAC Blocks', 'Aggregates'],
    phone: '+91 98765 43210',
    email: 'ramesh.narmada@buildmart.com',
    description: 'Narmada Building Materials is one of the oldest and most reliable construction material suppliers in Indore. Founded in 2012, we specialize in high-grade cement, crushed aggregates, and river sand. We supply directly to residential developers and large scale infrastructure builders with guaranteed timely logistics.',
    established: '2012',
    products: [
      {
        id: 1,
        name: 'UltraTech Premium OPC 53 Grade Cement',
        category: 'Cement',
        price: 420,
        unit: 'bag',
        vendorName: 'Narmada Building Materials',
        location: 'Indore',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop',
        minOrderQty: 50,
        availability: 'In Stock',
      },
      {
        id: 7,
        name: 'Ambuja Kawach Waterproof Cement',
        category: 'Cement',
        price: 450,
        unit: 'bag',
        vendorName: 'Narmada Building Materials',
        location: 'Mumbai',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop',
        minOrderQty: 50,
        availability: 'In Stock',
      },
      {
        id: 5,
        name: 'Fine River Sand (Double Washed)',
        category: 'Sand',
        price: 65,
        unit: 'cft',
        vendorName: 'Narmada Building Materials',
        location: 'Pune',
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?q=80&w=400&auto=format&fit=crop',
        minOrderQty: 300,
        availability: 'In Stock',
      },
      {
        id: 4,
        name: 'Premium Red Clay Wall Bricks (First Class)',
        category: 'Bricks',
        price: 8,
        unit: 'piece',
        vendorName: 'Narmada Building Materials',
        location: 'Indore',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=400&auto=format&fit=crop',
        minOrderQty: 1000,
        availability: 'In Stock',
      },
    ]
  };

  const handleWhatsAppClick = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 relative">
      {/* WhatsApp Toast */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="text-green-500">💬</span>
          <p className="text-sm font-bold">Opening WhatsApp Chat with {vendor.businessName}...</p>
        </div>
      )}

      {/* Profile Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-16 shadow-md select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Avatar block */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-900 font-extrabold text-3xl shadow-lg border border-slate-700/50">
              {vendor.businessName.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
            </div>
            
            {/* Business info */}
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{vendor.businessName}</h1>
                <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md self-center">
                  <Award className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium">Owner: {vendor.name}</p>
              
              {/* Ratings and Stats */}
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-slate-350">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="text-white font-extrabold">{vendor.rating}</span>
                </div>
                <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{vendor.location}</span>
                </div>
                <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4 text-slate-500" />
                  <span>{vendor.totalProducts} Products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Bio & Contacts */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* About Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-extrabold text-slate-900 text-base mb-4">About Vendor</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                {vendor.description}
              </p>
              
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold border-t border-slate-50 pt-4">
                <Calendar className="w-4 h-4 text-slate-300" />
                <span>Established in {vendor.established}</span>
              </div>
            </div>

            {/* Specialization Tags */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-extrabold text-slate-900 text-base mb-3">Product Specialization</h3>
              <div className="flex flex-wrap gap-2">
                {vendor.specialization.map((spec, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold bg-slate-50 border border-slate-200/60 text-slate-600 px-3 py-1 rounded-lg"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base mb-4">Contact Channels</h3>
              
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="font-bold text-slate-700">{vendor.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="font-semibold text-slate-600">{vendor.email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-50 flex flex-col gap-2">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl text-sm transition-all duration-300 shadow-md shadow-emerald-500/10 transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 fill-white/15" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Products List by this Vendor */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-xl font-extrabold text-slate-900 pb-3 border-b border-slate-150">
              Products Offered
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {vendor.products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
