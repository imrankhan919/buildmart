import React, { useState } from 'react';
import { ShieldAlert, Users, Award, ShoppingBag, ShieldCheck, Check, X, Trash2, Ban, Eye, Globe, ChevronRight } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function AdminDashboard() {
  const { user } = useSelector(state => state.auth)
  const [activeTab, setActiveTab] = useState('approvals');
  const [toastMessage, setToastMessage] = useState(null);

  // Stats Data
  const adminStats = [
    { title: 'Registered Users', value: '1,280', icon: <Users className="w-5 h-5 text-blue-500" />, desc: '120 joined this month' },
    { title: 'Verified Suppliers', value: '84', icon: <Award className="w-5 h-5 text-amber-500" />, desc: '6 awaiting approval' },
    { title: 'Active Listings', value: '412', icon: <ShoppingBag className="w-5 h-5 text-purple-500" />, desc: '32 categories active' },
    { title: 'Commission (Mth)', value: '₹1,24,000', icon: <Globe className="w-5 h-5 text-emerald-500" />, desc: '1.5% platform fee net' },
  ];

  // Mock Pending Approvals (Vendors & Listings)
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 1, type: 'vendor_app', name: 'Kunal Steel Traders', details: 'Specialization: Structural Steel • Location: Indore', date: 'June 15, 2026' },
    { id: 2, type: 'product_app', name: 'First Class Flyash Bricks', details: 'Category: Bricks • Vendor: Somani Brick Industry • Price: ₹6.5/piece', date: 'June 16, 2026' },
  ]);

  // Mock Vendors
  const [vendors, setVendors] = useState([
    { id: 1, businessName: 'Narmada Building Materials', owner: 'Ramesh Khandelwal', location: 'Indore', status: 'Verified' },
    { id: 2, businessName: 'Khandelwal Iron & Steel', owner: 'Suresh Sharma', location: 'Bhopal', status: 'Verified' },
    { id: 3, businessName: 'Somany Tiles Plaza', owner: 'Anil Somany', location: 'Mumbai', status: 'Verified' },
    { id: 4, businessName: 'Shri Ram Brick Kiln', owner: 'Vijay Ram', location: 'Indore', status: 'Pending Verification' },
  ]);

  // Mock Global Catalog
  const [catalog, setCatalog] = useState([
    { id: 1, name: 'UltraTech Premium OPC 53 Grade Cement', category: 'Cement', price: 420, unit: 'bag', vendor: 'Narmada Materials', status: 'Active' },
    { id: 2, name: 'Kamdhenu Fe-550 TMT Steel Rebars', category: 'Steel', price: 58, unit: 'kg', vendor: 'Khandelwal Steel', status: 'Active' },
    { id: 3, name: 'Modular Glazed Vitrified Tiles (2x2 ft)', category: 'Tiles', price: 45, unit: 'sqft', vendor: 'Somany Tiles', status: 'Active' },
    { id: 4, name: 'Premium Red Clay Wall Bricks (First Class)', category: 'Bricks', price: 8, unit: 'piece', vendor: 'Shri Ram Bricks', status: 'Active' },
  ]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleApprove = (id, name) => {
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
    triggerToast(`Approved: ${name}`);
  };

  const handleReject = (id, name) => {
    setPendingApprovals(prev => prev.filter(item => item.id !== id));
    triggerToast(`Rejected: ${name}`);
  };

  const toggleVendorStatus = (id, businessName, currentStatus) => {
    const nextStatus = currentStatus === 'Verified' ? 'Suspended' : 'Verified';
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: nextStatus } : v));
    triggerToast(`${businessName} is now ${nextStatus}`);
  };

  const handleDeleteListing = (id, name) => {
    setCatalog(prev => prev.filter(item => item.id !== id));
    triggerToast(`Deleted listing: ${name}`);
  };

  if (user.role !== 'admin') {
    return (
      <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 max-w-sm text-center shadow-md">
          <div className="text-3xl mb-4">🔒</div>
          <h3 className="font-extrabold text-slate-900 text-lg mb-2">Admin Credentials Required</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Please switch your role to "Admin" in the Navbar Role Switcher dropdown to access platform management.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="text-amber-500">✨</span>
          <p className="text-sm font-bold">{toastMessage}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-55 border border-amber-200 px-3 py-1 rounded-lg w-max mb-3 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>Platform Owner Administration Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">BuildMart Control Center</h1>
          <p className="text-xs text-slate-400">Oversee registered users, verify supplier approvals, and moderate global material listings.</p>
        </div>

        {/* Stats KPIs Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 select-none">
          {adminStats.map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
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

        {/* Action Panel Container */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">

          {/* Tab Headers */}
          <div className="border-b border-slate-150 flex gap-6 pb-0.5">
            <button
              onClick={() => setActiveTab('approvals')}
              className={`pb-3 text-xs font-black uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'approvals'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-slate-450 hover:text-slate-800'
                }`}
            >
              Pending Approvals ({pendingApprovals.length})
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`pb-3 text-xs font-black uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'vendors'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-slate-450 hover:text-slate-800'
                }`}
            >
              Suppliers Directory ({vendors.length})
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`pb-3 text-xs font-black uppercase tracking-wider border-b-2 transition-colors ${activeTab === 'catalog'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-slate-450 hover:text-slate-800'
                }`}
            >
              Global Catalog ({catalog.length})
            </button>
          </div>

          {/* Pending Approvals Tab View */}
          {activeTab === 'approvals' && (
            <div className="space-y-4">
              {pendingApprovals.length === 0 ? (
                <div className="text-center py-10 text-slate-405 font-medium">No pending verification queues.</div>
              ) : (
                pendingApprovals.map((item) => (
                  <div key={item.id} className="border border-slate-100 bg-slate-50/50 rounded-2xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="space-y-1.5">
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border ${item.type === 'vendor_app' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
                        {item.type === 'vendor_app' ? 'Vendor Application' : 'Material Listing Approval'}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-sm mt-1">{item.name}</h4>
                      <p className="text-xs text-slate-500">{item.details}</p>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleApprove(item.id, item.name)}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-2 rounded-xl text-xs transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleReject(item.id, item.name)}
                        className="flex items-center gap-1 border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-bold px-3 py-2 rounded-xl text-xs transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Deny</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Suppliers Tab View */}
          {activeTab === 'vendors' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-450">
                    <th className="pb-3">Business Name</th>
                    <th className="pb-3">Owner</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Licensing Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {vendors.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/50">
                      <td className="py-4 font-bold text-slate-900 pr-4">{v.businessName}</td>
                      <td className="py-4 text-slate-500 font-semibold">{v.owner}</td>
                      <td className="py-4 text-slate-500 font-medium">{v.location}</td>
                      <td className="py-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${v.status === 'Verified' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => toggleVendorStatus(v.id, v.businessName, v.status)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${v.status === 'Verified'
                              ? 'border-red-200 text-red-700 hover:bg-red-50'
                              : 'border-green-200 text-green-700 hover:bg-green-50'
                            }`}
                        >
                          {v.status === 'Verified' ? 'Suspend' : 'Verify'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Global Catalog Tab View */}
          {activeTab === 'catalog' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-450">
                    <th className="pb-3">Material Name</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Supplier Shop</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {catalog.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-4 font-bold text-slate-900 pr-4">{item.name}</td>
                      <td className="py-4 text-slate-500 font-bold">{item.category}</td>
                      <td className="py-4 font-extrabold text-slate-800">₹{item.price} <span className="text-[10px] font-normal text-slate-400">/{item.unit}</span></td>
                      <td className="py-4 text-slate-500 font-semibold">{item.vendor}</td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => handleDeleteListing(item.id, item.name)}
                          className="p-1.5 border border-slate-200 hover:bg-red-50 hover:text-red-600 rounded-xl text-slate-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
