import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState.jsx';
import { TableSkeleton } from '../components/common/Skeletons.jsx';
import { getErrorMessage } from '../components/common/Toast.jsx';
import { getUsers } from '../services/adminService';
import VendorList from '../components/admin/VendorList';
import AllVendorList from '../components/admin/AllVendorList';
import TransactionList from '../components/admin/TransactionList';
import { ShieldAlert, Users, Award, ShoppingBag, Globe } from 'lucide-react';

export default function AdminDashboard() {
  // Route is already guarded by AdminOnly; data comes straight from React Query.
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['admin-overview'], queryFn: () => getUsers() });
  const [activeTab, setActiveTab] = useState('credits');

  if (isLoading) {
    return (
      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Loader message="Loading admin data…" />
          <TableSkeleton rows={6} />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState icon="⚠️" title="Could not load admin data" message={getErrorMessage(error)} />
        </div>
      </div>
    );
  }

  const users = data.users || [];
  const vendors = data.vendors || [];
  const products = data.products || [];
  const orders = data.orders || [];
  const credits = data.credits || [];

  const adminStats = [
    { title: 'Registered Users', value: users.length, icon: <Users className="w-5 h-5 text-blue-500" />, desc: 'total accounts' },
    { title: 'Verified Suppliers', value: vendors.length, icon: <Award className="w-5 h-5 text-amber-500" />, desc: `${vendors.filter((v) => v.status !== 'active').length} awaiting approval` },
    { title: 'Active Listings', value: products.length, icon: <ShoppingBag className="w-5 h-5 text-purple-500" />, desc: 'total products' },
    { title: 'Commission (Mth)', value: `${orders.reduce((acc, o) => acc + (o.totalBillAmount || 0), 0)}₹`, icon: <Globe className="w-5 h-5 text-emerald-500" />, desc: '1.5% platform fee net' },
  ];

  const tabs = [
    { id: 'credits', label: `Credits History (${credits.filter((c) => !c.isGranted).length})` },
    { id: 'approvals', label: `Pending Approvals (${vendors.filter((v) => v.status === 'pending').length})` },
    { id: 'users', label: `All Users (${users.length})` },
    { id: 'vendors', label: `All Vendors (${vendors.length})` },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg w-max mb-3 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>Platform Owner Administration Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">BuildMart Control Center</h1>
          <p className="text-xs text-slate-400">Oversee users, verify suppliers, and moderate listings.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 select-none">
          {adminStats.map((stat) => (
            <div key={stat.title} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 transition-shadow duration-200 hover:shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">{stat.title}</span>
                <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg">{stat.icon}</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                <span className="text-[10px] font-semibold text-slate-400 mt-0.5 block">{stat.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-150 flex gap-6 pb-0.5 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`pb-3 text-xs font-black uppercase tracking-wider border-b-2 transition-colors duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-amber-500 ${activeTab === t.id ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-400 hover:text-slate-800'}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'credits' && (
            <div className="overflow-x-auto">
              {credits.length === 0 ? (
                <EmptyState icon="💳" title="No credit requests" message="Credit requests from users will appear here." />
              ) : (
                <TransactionList credits={credits} />
              )}
            </div>
          )}

          {activeTab === 'approvals' && (
            <div className="space-y-4">
              {vendors.filter((v) => v.status === 'pending').length === 0 ? (
                <div className="text-center py-10 text-slate-400 font-medium">No pending verification queues.</div>
              ) : (
                vendors.filter((v) => v.status === 'pending').map((item) => (
                  <VendorList key={item._id} item={item} />
                ))
              )}
            </div>
          )}

          {activeTab === 'vendors' && (
            <div className="overflow-x-auto">
              {vendors.length === 0 ? (
                <EmptyState icon="🏪" title="No vendors" message="Vendor applications will appear here." />
              ) : (
                <table className="w-full text-left text-sm min-w-[720px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-3">Business Name</th>
                      <th className="pb-3">Owner</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Location</th>
                      <th className="pb-3">Licensing Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {vendors.map((v) => (
                      <tr key={v._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 font-bold text-slate-900 pr-4">{v.name}</td>
                        <td className="py-4 text-slate-500 font-semibold">{v.user?.name}</td>
                        <td className="py-4 text-slate-500 font-semibold">{v.category}</td>
                        <td className="py-4 text-slate-500 font-medium">{v.address}</td>
                        <td className="py-4">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-slate-50 text-slate-700 border-slate-200">{v.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              {users.length === 0 ? (
                <EmptyState icon="👥" title="No users" message="Registered users will appear here." />
              ) : (
                <AllVendorList users={users} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
