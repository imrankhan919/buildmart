import { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Plus, FileText, Settings, Eye, MessageSquare, Star, Download, Calendar } from 'lucide-react';
import useVendorDashboard from '../hooks/useVendorDashboard.js';
import StatCard from '../components/dashboard/StatCard.jsx';
import ProductsTable from '../components/dashboard/ProductsTable.jsx';
import AddProductModal from '../components/dashboard/AddProductModal.jsx';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState.jsx';
import { TableSkeleton } from '../components/common/Skeletons.jsx';
import { useToast, getErrorMessage } from '../components/common/Toast.jsx';

const FALLBACK_PLANS = [
  { id: 1, plotSize: "40' × 30'", floors: 1, rooms: '2 BHK', generatedDate: 'June 10, 2026', status: 'Vastu Compliant' },
  { id: 2, plotSize: "50' × 40'", floors: 2, rooms: '3 BHK', generatedDate: 'June 12, 2026', status: 'Modern' },
  { id: 3, plotSize: "30' × 25'", floors: 3, rooms: '4 BHK', generatedDate: 'June 15, 2026', status: 'Open Plan' },
];

export default function Dashboard() {
  const { products, orders, isLoading, isError, error } = useVendorDashboard();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { title: 'Total Products', value: products?.length ?? 0, icon: <ShoppingBag className="w-5 h-5 text-blue-500" />, desc: 'live listings' },
    { title: 'Orders', value: orders?.length ?? 0, icon: <Eye className="w-5 h-5 text-purple-500" />, desc: 'total orders' },
    { title: 'Revenue (est.)', value: '—', icon: <MessageSquare className="w-5 h-5 text-amber-500" />, desc: 'pending replies' },
    { title: 'Avg Rating', value: '4.5', icon: <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />, desc: 'From reviews' },
  ];

  const handleAction = (message) => toast.info(message);

  const handleAddNewProductSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    toast.success('New product listing created (simulated).');
  };

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Loader message="Loading vendor dashboard…" />
          <TableSkeleton rows={6} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState icon="⚠️" title="Could not load dashboard" message={getErrorMessage(error)} />
        </div>
      </div>
    );
  }

  const tabBtn = (id, icon, label, count) => (
    <button
      key={id}
      type="button"
      onClick={() => (id === 'add' ? setIsModalOpen(true) : setActiveTab(id))}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 ${activeTab === id ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
    >
      {icon}
      <span>{label}</span>
      {typeof count === 'number' && (
        <span className={`ml-auto text-[10px] font-extrabold px-2 py-0.5 rounded-md ${activeTab === id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <AddProductModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddNewProductSubmit} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-1 lg:sticky lg:top-20">
              <div className="p-3 mb-4 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-extrabold text-sm shadow">V</div>
                <div>
                  <h4 className="font-extrabold text-slate-950 text-sm leading-none">Vendor Workspace</h4>
                  <span className="text-[10px] text-amber-600 font-bold block mt-1">Vendor Account</span>
                </div>
              </div>
              {tabBtn('overview', <LayoutDashboard className="w-4 h-4" />, 'Overview')}
              {tabBtn('products', <ShoppingBag className="w-4 h-4" />, 'My Products', products.length)}
              {tabBtn('add', <Plus className="w-4 h-4" />, 'Add Product')}
              {tabBtn('saved-plans', <FileText className="w-4 h-4" />, 'Saved Floor Plans', FALLBACK_PLANS.length)}
              {tabBtn('settings', <Settings className="w-4 h-4" />, 'Profile Settings')}
            </div>
          </div>

          <div className="lg:col-span-9 space-y-8 min-w-0">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Dashboard Overview</h2>
                  <p className="text-xs text-slate-400">Track listings, user clicks, and inquiries.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((s) => (
                    <StatCard key={s.title} {...s} />
                  ))}
                </div>
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-950 text-sm">Need to add more supplies?</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">Update inventory catalogs and pricing.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 px-5 rounded-xl text-xs tracking-wide transition-colors duration-200 flex items-center gap-1.5 shrink-0 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>List New Material</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">My Products</h2>
                    <p className="text-xs text-slate-400">Manage listing details, prices, and stock.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="bg-slate-950 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <Plus className="w-4 h-4 text-amber-500" />
                    <span>Add New</span>
                  </button>
                </div>
                <ProductsTable
                  products={products}
                  onEdit={() => handleAction('Edit product panel triggered (simulated)')}
                  onDelete={() => handleAction('Delete listing prompt (simulated)')}
                />
              </div>
            )}

            {activeTab === 'saved-plans' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Saved Floor Plans</h2>
                  <p className="text-xs text-slate-400 font-medium">Static examples — live plans appear on your profile after generation.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {FALLBACK_PLANS.map((plan) => (
                    <div key={plan.id} className="bg-white border border-slate-200/85 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between transition-shadow duration-200 hover:shadow-md">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[10px] bg-slate-900 text-amber-500 border border-slate-800 uppercase font-black tracking-wide px-2 py-0.5 rounded-md">{plan.status}</span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-bold">
                            <Calendar className="w-3 h-3" />
                            {plan.generatedDate}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-slate-950 text-sm">{plan.rooms} Layout</h3>
                        <p className="text-xs text-slate-500">Dimensions: {plan.plotSize} • Floors: {plan.floors}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-50 flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleAction(`Download for plan #${plan.id} (simulated)`)}
                          className="w-full flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold py-2 rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">Profile Settings</h2>
                  <p className="text-xs text-slate-400">Configure business information and contacts.</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); toast.success('Profile details updated (simulated).'); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="biz-name" className="text-xs font-bold text-slate-500 block mb-1.5">Business Name</label>
                      <input id="biz-name" type="text" defaultValue="Vendor Business" className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    </div>
                    <div>
                      <label htmlFor="owner-name" className="text-xs font-bold text-slate-500 block mb-1.5">Owner Name</label>
                      <input id="owner-name" type="text" defaultValue="" className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                      Save Configuration
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
