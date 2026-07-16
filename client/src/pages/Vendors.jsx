import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from "../components/common/Loader"
import { Search, Users, Award } from 'lucide-react';
import VendorCard from '../components/marketplace/VendorCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getVendors } from '../services/vendorService';
import { setVendors } from '../features/vendor/vendorSlice';

export default function Vendors() {

  const { vendors } = useSelector(state => state.vendor)

  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const { data, isLoading, isError, isSuccess, error } = useQuery({ queryKey: ['vendors'], queryFn: getVendors })

  const dispatch = useDispatch()


  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setVendors(data))
    }
  }, [data, isSuccess])


  if (isLoading || !vendors) {
    return (
      <Loader />
    )
  }


  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex text-white items-center gap-2 bg-slate-900 border border-slate-800 text-slate-350 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
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



        {/* Vendors Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Showing {vendors.length} Suppliers
            </p>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold bg-amber-50 border border-amber-100 px-3 py-1 rounded-lg">
              <Award className="w-4 h-4 fill-amber-500/10" />
              <span>100% Verified Business Licenses</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <VendorCard key={vendor._id} vendor={vendor} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
