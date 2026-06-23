import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Plus, FileText, Settings, Award, Eye, MessageSquare, Star, Trash2, Edit3, X, Download, Calendar } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(null);

  // Stats Card Data
  const stats = [
    { title: 'Total Products', value: '12', icon: <ShoppingBag className="w-5 h-5 text-blue-500" />, desc: '4 categories live' },
    { title: 'Total Views', value: '340', icon: <Eye className="w-5 h-5 text-purple-500" />, desc: '+15% this week' },
    { title: 'Quote Requests', value: '8', icon: <MessageSquare className="w-5 h-5 text-amber-500" />, desc: '3 pending replies' },
    { title: 'Avg Rating', value: '4.5', icon: <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />, desc: 'From 24 reviews' },
  ];

  // My Products Table Data (4 items)
  const products = [
    {
      id: 1,
      name: 'UltraTech Premium OPC 53 Grade Cement',
      category: 'Cement',
      price: 420,
      unit: 'bag',
      stockStatus: 'In Stock',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=100&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Kamdhenu Fe-550 TMT Steel Rebars',
      category: 'Steel',
      price: 58,
      unit: 'kg',
      stockStatus: 'In Stock',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=100&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Modular Glazed Vitrified Tiles (2x2 ft)',
      category: 'Tiles',
      price: 45,
      unit: 'sqft',
      stockStatus: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=100&auto=format&fit=crop',
    },
    {
      id: 4,
      name: 'Premium Red Clay Wall Bricks (First Class)',
      category: 'Bricks',
      price: 8,
      unit: 'piece',
      stockStatus: 'In Stock',
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=100&auto=format&fit=crop',
    },
  ];

  // Saved Floor Plans (3 items)
  const savedPlans = [
    { id: 1, plotSize: '40\' × 30\'', floors: 1, rooms: '2 BHK', generatedDate: 'June 10, 2026', status: 'Vastu Compliant' },
    { id: 2, plotSize: '50\' × 40\'', floors: 2, rooms: '3 BHK', generatedDate: 'June 12, 2026', status: 'Modern' },
    { id: 3, plotSize: '30\' × 25\'', floors: 3, rooms: '4 BHK', generatedDate: 'June 15, 2026', status: 'Open Plan' },
  ];

  const handleAction = (message) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 2500);
  };

  const handleAddNewProductSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    handleAction('New Product Listing created successfully (Simulated)');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 relative">
      {/* Toast Alert */}
      {showToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="text-amber-500">✨</span>
          <p className="text-sm font-bold">{showToast}</p>
        </div>
      )}

      {/* Add New Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1.5 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-extrabold text-slate-950 text-lg mb-2">Add New Product Listing</h3>
            <p className="text-xs text-slate-400 mb-6">Create a new building material listing for buyers to order.</p>
            
            <form onSubmit={handleAddNewProductSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">Product Name *</label>
                <input
                  type="text"
                  placeholder="e.g. UltraTech Super OPC Cement"
                  className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5">Category *</label>
                  <select className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
                    <option value="cement">Cement</option>
                    <option value="bricks">Bricks</option>
                    <option value="tiles">Tiles</option>
                    <option value="steel">Steel</option>
                    <option value="sand">Sand</option>
                    <option value="wood">Wood</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5">Stock Status *</label>
                  <select className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5">Price (₹) *</label>
                  <input
                    type="number"
                    placeholder="e.g. 450"
                    className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 block mb-1.5">Pricing Unit *</label>
                  <select className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500">
                    <option value="bag">per bag</option>
                    <option value="kg">per kg</option>
                    <option value="piece">per piece</option>
                    <option value="sqft">per sq ft</option>
                    <option value="cft">per cft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5">Minimum Order Qty *</label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs"
                >
                  Create Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Dashboard Left Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm space-y-1">
              <div className="p-3 mb-4 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-extrabold text-sm shadow">
                  N
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-950 text-sm leading-none">Narmada Materials</h4>
                  <span className="text-[10px] text-amber-600 font-bold block mt-1">Vendor Account</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'products'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4" />
                  <span>My Products</span>
                </div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${activeTab === 'products' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  4
                </span>
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>

              <button
                onClick={() => setActiveTab('saved-plans')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'saved-plans'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  <span>Saved Floor Plans</span>
                </div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${activeTab === 'saved-plans' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  3
                </span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Profile Settings</span>
              </button>
            </div>
          </div>

          {/* Dashboard Main Content Panel */}
          <div className="lg:col-span-9 space-y-8">
            
            {/* Overview Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Dashboard Overview</h2>
                  <p className="text-xs text-slate-400">Track listings, user clicks, and custom raw materials inquiries.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
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

                {/* Quick actions panel */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-slate-950 text-sm">Need to add more supplies?</h3>
                    <p className="text-xs text-slate-450 leading-relaxed">Update inventory catalogs, change cement/brick pricing metrics or adjust minimum order specs.</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-3 px-5 rounded-xl text-xs tracking-wide transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>List New Material</span>
                  </button>
                </div>
              </div>
            )}

            {/* Products Tab Content */}
            {activeTab === 'products' && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">My Products</h2>
                    <p className="text-xs text-slate-400">Manage listing details, prices, and stock statuses.</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-slate-950 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4 text-amber-500" />
                    <span>Add New</span>
                  </button>
                </div>

                {/* Table container */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <th className="pb-3 w-16">Image</th>
                        <th className="pb-3">Product Name</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/50">
                          <td className="py-3.5">
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-slate-100" />
                          </td>
                          <td className="py-3.5 font-bold text-slate-900 pr-4">{p.name}</td>
                          <td className="py-3.5 text-slate-500 font-semibold">{p.category}</td>
                          <td className="py-3.5 font-bold text-slate-800">₹{p.price} <span className="text-[10px] font-normal text-slate-400">/{p.unit}</span></td>
                          <td className="py-3.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.stockStatus === 'In Stock' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                              {p.stockStatus}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleAction('Edit product panel triggered (Simulated)')}
                                className="p-1.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleAction('Confirm Delete listing prompt (Simulated)')}
                                className="p-1.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Saved Plans Tab Content */}
            {activeTab === 'saved-plans' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Saved Floor Plans</h2>
                  <p className="text-xs text-slate-400 font-medium">Access blueprints generated via the AI layout engine.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedPlans.map((plan) => (
                    <div key={plan.id} className="bg-white border border-slate-200/85 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] bg-slate-900 text-amber-500 border border-slate-800 uppercase font-black tracking-wide px-2 py-0.5 rounded-md">
                            {plan.status}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1 font-bold">
                            <Calendar className="w-3 h-3 text-slate-350" />
                            {plan.generatedDate}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-slate-950 text-sm">{plan.rooms} Layout</h3>
                        <p className="text-xs text-slate-500">Dimensions: {plan.plotSize} • Floors: {plan.floors}</p>
                      </div>

                      <div className="pt-4 border-t border-slate-50 flex gap-2">
                        <button
                          onClick={() => handleAction(`Simulated download for saved blueprint plan #${plan.id}`)}
                          className="w-full flex items-center justify-center gap-1.5 bg-slate-55 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold py-2 rounded-xl text-xs transition-colors"
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

            {/* Settings Tab Content */}
            {activeTab === 'settings' && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">Profile Settings</h2>
                  <p className="text-xs text-slate-400">Configure business information and contacts.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleAction('Profile details updated (Simulated)'); }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1.5">Business Name</label>
                      <input
                        type="text"
                        defaultValue="Narmada Building Materials"
                        className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1.5">Owner Name</label>
                      <input
                        type="text"
                        defaultValue="Ramesh Khandelwal"
                        className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1.5">WhatsApp Mobile No</label>
                      <input
                        type="text"
                        defaultValue="+91 98765 43210"
                        className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-500 block mb-1.5">Location Address</label>
                      <input
                        type="text"
                        defaultValue="Shop #402, Loha Mandi, Indore, MP"
                        className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1.5">Business Description</label>
                    <textarea
                      rows="4"
                      defaultValue="Narmada Building Materials is one of the oldest and most reliable construction material suppliers in Indore. Founded in 2012, we specialize in high-grade cement, crushed aggregates, and river sand."
                      className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    ></textarea>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-xs transition-colors"
                    >
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
