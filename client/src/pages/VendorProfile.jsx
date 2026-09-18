import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Phone, Mail, MessageCircle, Package, Calendar, Award } from 'lucide-react';
import ProductCard from '../components/marketplace/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { getVendor } from '../services/vendorService';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState.jsx';
import { getErrorMessage, useToast } from '../components/common/Toast.jsx';
import { GridSkeleton } from '../components/common/Skeletons.jsx';

export default function VendorProfile() {
  const { id } = useParams();
  const toast = useToast();
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['vendor', id], queryFn: () => getVendor(id) });
  const [showToast, setShowToast] = useState(false);

  const handleWhatsAppClick = () => {
    setShowToast(true);
    toast.info(`Opening WhatsApp chat with ${data?.vendor?.name || 'vendor'}…`);
    setTimeout(() => setShowToast(false), 2500);
  };

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loader message="Loading vendor…" />
          <GridSkeleton count={4} />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState icon="⚠️" title="Vendor not found" message={getErrorMessage(error, 'This vendor could not be loaded.')} />
        </div>
      </div>
    );
  }

  const vendorProfile = data;
  void showToast;

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-16 shadow-md select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-slate-900 font-extrabold text-3xl shadow-lg border border-slate-700/50">
              {vendorProfile?.vendor?.name?.[0]?.toUpperCase()}
            </div>
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{vendorProfile?.vendor?.name}</h1>
                <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md self-center">
                  <Award className="w-3.5 h-3.5" />
                  Verified
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium">Owner: {vendorProfile?.vendor?.user?.name} </p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{vendorProfile?.vendor?.address}</span>
                </div>
                <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4 text-slate-500" />
                  <span> {vendorProfile?.products?.length || 0} Products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="font-extrabold text-slate-900 text-base mb-4">About Vendor</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{vendorProfile?.vendor?.description || 'Verified building-material supplier.'}</p>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold border-t border-slate-50 pt-4">
                <Calendar className="w-4 h-4 text-slate-300" />
                <span>Established in {vendorProfile?.vendor?.createdAt ? new Date(vendorProfile.vendor.createdAt).toLocaleDateString('en-IN') : '—'}</span>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Contact Channels</h3>
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
              <div className="pt-4 border-t border-slate-50">
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl text-sm transition-all duration-200 shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white/15" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6 min-w-0">
            <h2 className="text-xl font-extrabold text-slate-900 pb-3 border-b border-slate-200">Products Offered</h2>
            {(vendorProfile?.products || []).length === 0 ? (
              <EmptyState icon="📦" title="No products" message="This vendor has not listed any products yet." />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {vendorProfile?.products?.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
