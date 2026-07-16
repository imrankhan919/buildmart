import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, MessageCircle, Package, Calendar, Award } from 'lucide-react';
import ProductCard from '../components/marketplace/ProductCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getVendor } from '../services/vendorService';
import Loader from '../components/common/Loader';
import { setVendorProfile } from '../features/vendor/vendorSlice';

export default function VendorProfile() {

  const { vendorProfile } = useSelector(state => state.vendor)

  const dispatch = useDispatch()
  const { id } = useParams();

  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const { data, isLoading, isError, isSuccess, error } = useQuery({ queryKey: ['vendors'], queryFn: () => getVendor(id) })


  const [showToast, setShowToast] = useState(false);


  const handleWhatsAppClick = () => {
    setShowToast(true);
  };



  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setVendorProfile(data))
    }
  }, [data, isSuccess])


  if (isLoading || !vendorProfile) {
    return (
      <Loader />
    )
  }




  return (
    <div className="bg-slate-50 min-h-screen pb-16 relative">
      {/* WhatsApp Toast */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="text-green-500">💬</span>
          <p className="text-sm font-bold">Opening WhatsApp Chat with {vendorProfile.vendor.name}...</p>
        </div>
      )}

      {/* Profile Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-16 shadow-md select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Avatar block */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-900 font-extrabold text-3xl shadow-lg border border-slate-700/50">
              {vendorProfile?.vendor?.name[0].toUpperCase()}
            </div>

            {/* Business info */}
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{vendorProfile?.vendor?.name}</h1>
                <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md self-center">
                  <Award className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium">Owner: {vendorProfile?.vendor?.user?.name} </p>

              {/* Ratings and Stats */}
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-slate-350">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="text-white font-extrabold"></span>
                </div>
                <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{vendorProfile?.vendor?.address}</span>
                </div>
                <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4 text-slate-500" />
                  <span> {vendorProfile?.products?.length} Products</span>
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

              </p>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold border-t border-slate-50 pt-4">
                <Calendar className="w-4 h-4 text-slate-300" />
                <span>Established in {new Date(vendorProfile?.vendor?.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
            </div>

            {/* Specialization Tags */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-extrabold text-slate-900 text-base mb-3">Product Specialization</h3>
              <div className="flex flex-wrap gap-2">
                <span
                  className="text-xs font-bold bg-slate-50 border border-slate-200/60 text-slate-600 px-3 py-1 rounded-lg"
                >
                  {vendorProfile?.vendor?.category}
                </span>

              </div>
            </div>

            {/* Contact Details Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base mb-4">Contact Channels</h3>

              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="font-bold text-slate-700">{vendorProfile?.vendor?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="font-semibold text-slate-600">{vendorProfile?.vendor?.email}</span>
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
              {vendorProfile?.products?.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
