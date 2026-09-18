import { useQuery } from '@tanstack/react-query';
import { Award } from 'lucide-react';
import VendorCard from '../components/marketplace/VendorCard';
import { getVendors } from '../services/vendorService';
import { GridSkeleton } from '../components/common/Skeletons.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { getErrorMessage } from '../components/common/Toast.jsx';

export default function Vendors() {
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['vendors'], queryFn: getVendors });
  const vendors = data || [];

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GridSkeleton count={6} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState icon="⚠️" title="Could not load vendors" message={getErrorMessage(error)} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="inline-flex text-white items-center gap-2 bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <span>Verified Raw Material Providers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Meet Our Trusted Material Vendors</h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-lg mx-auto">Connect directly with verified local manufacturers, dealers, and suppliers in your city.</p>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Showing {vendors.length} Suppliers</p>
            <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold bg-amber-50 border border-amber-100 px-3 py-1 rounded-lg w-max">
              <Award className="w-4 h-4 fill-amber-500/10" />
              <span>100% Verified Business Licenses</span>
            </div>
          </div>

          {vendors.length === 0 ? (
            <EmptyState icon="🏪" title="No vendors found" message="Verified suppliers will appear here once approved." />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendors.map((vendor) => (
                <VendorCard key={vendor._id} vendor={vendor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
