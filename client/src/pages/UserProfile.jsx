import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Sparkles, ShoppingBag, FileText, ArrowRight, ShieldCheck, Download, Trash2, Calendar, Award } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function UserProfile() {
  const { user } = useSelector(state => state.auth)
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('quotes');
  const [toastMessage, setToastMessage] = useState(null);

  // Mock Active Quotes
  const quotes = [
    {
      id: 1,
      material: 'UltraTech Premium OPC 53 Grade Cement',
      qty: 150,
      unit: 'bags',
      vendor: 'Narmada Building Materials',
      date: 'June 14, 2026',
      status: 'Quote Sent: ₹63,000',
      statusColor: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      id: 2,
      material: 'Kamdhenu Fe-550 TMT Steel Rebars',
      qty: 600,
      unit: 'kg',
      vendor: 'Khandelwal Iron & Steel',
      date: 'June 15, 2026',
      status: 'Pending Vendor Price',
      statusColor: 'bg-amber-50 text-amber-705 border-amber-200',
    },
  ];

  // Mock Saved Plans
  const savedPlans = [
    {
      id: 1,
      plotSize: '40\' × 30\'',
      floors: 1,
      rooms: '2 BHK',
      layoutStyle: 'Vastu',
      date: 'June 12, 2026',
    },
    {
      id: 2,
      plotSize: '50\' × 40\'',
      floors: 2,
      rooms: '3 BHK',
      layoutStyle: 'Modern',
      date: 'June 15, 2026',
    },
  ];

  const handleBecomeVendor = () => {
    // Switch role to vendor
    setUser((prev) => ({
      ...prev,
      role: 'vendor',
    }));

    setToastMessage('Account upgraded to Vendor successfully! Opening dashboard...');
    setTimeout(() => {
      setToastMessage(null);
      navigate('/dashboard');
    }, 1500);
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };


  useEffect(() => {

    if (user?.isAdmin) {
      navigate("/admin")
    }

    if (!user) {
      navigate("/login")
    }
  }, [user])




  if (user?.role === 'guest') {
    return (
      <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 max-w-sm text-center shadow-md">
          <div className="text-3xl mb-4">🔒</div>
          <h3 className="font-extrabold text-slate-900 text-lg mb-2">Access Denied</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Please log in or select the Buyer/Vendor role from the switcher dropdown in the Navbar to view your profile.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 relative">
      {/* Dynamic Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="text-amber-500">✨</span>
          <p className="text-sm font-bold">{toastMessage}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Banner Section */}
        <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
              {user?.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-black">{user?.name}</h1>
              <p className="text-slate-400 text-xs flex items-center justify-center sm:justify-start gap-1 font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                Role: {user?.role === 'admin' ? 'Administrator' : user?.role === 'vendor' ? 'Supplier' : 'Buyer / Builder'}
              </p>
            </div>
          </div>

          {user?.role === 'buyer' && (
            <button
              onClick={handleBecomeVendor}
              className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all duration-300 shadow-md shadow-amber-500/10 transform hover:-translate-y-0.5 shrink-0"
            >
              <span>Activate Vendor Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Profile Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Side: Info + Convert Card */}
          <div className="lg:col-span-4 space-y-6">

            {/* Account Info Details */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base mb-4">Contact Particulars</h3>
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4.5 h-4.5 text-slate-400" />
                  <span className="text-slate-650 font-medium">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4.5 h-4.5 text-slate-400" />
                  <span className="text-slate-700 font-bold">{user?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4.5 h-4.5 text-slate-400" />
                  <span className="text-slate-650 font-medium">{user?.location}</span>
                </div>
              </div>
            </div>

            {/* Become a Vendor Promotion Card (rendered for Buyer role) */}
            {user?.role === 'buyer' && (
              <div className="bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 rounded-3xl p-6 shadow-md relative overflow-hidden select-none">
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-white/10 rounded-full blur-lg"></div>
                <h3 className="font-black text-base mb-2">Sell on BuildMart</h3>
                <p className="text-xs text-slate-900/80 leading-relaxed mb-6 font-medium">
                  Register your retail shop, display cement, aggregate or steel catalogs, and get quote requests from local builders.
                </p>
                <button
                  onClick={handleBecomeVendor}
                  className="w-full bg-slate-900 hover:bg-slate-850 active:bg-black text-white font-extrabold py-3 px-4 rounded-xl text-xs transition-colors shadow"
                >
                  Become a Material Vendor
                </button>
              </div>
            )}

            {/* Admin Notice */}
            {user?.role === 'admin' && (
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h4 className="font-extrabold text-sm uppercase tracking-wide">Admin Access</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  You hold full database dashboard controls to verify raw material vendors and moderate active listings.
                </p>
                <button
                  onClick={() => navigate('/admin')}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Open Admin Center
                </button>
              </div>
            )}
          </div>

          {/* Right Side: Quote Requests & Saved Blueprints Tabs */}
          <div className="lg:col-span-8 space-y-6">

            {/* Tabs Selector Header */}
            <div className="border-b border-slate-200 flex gap-6">
              <button
                onClick={() => setActiveTab('quotes')}
                className={`pb-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'quotes'
                  ? 'border-amber-500 text-amber-500'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Quote Requests ({quotes.length})</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className={`pb-3 text-xs font-black uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'plans'
                  ? 'border-amber-500 text-amber-500'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Saved Floor Plans ({savedPlans.length})</span>
                </span>
              </button>
            </div>

            {/* Quotes Tab Panel */}
            {activeTab === 'quotes' && (
              <div className="space-y-4">
                {quotes.map((quote) => (
                  <div key={quote.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow transition-shadow">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-950 text-sm">{quote.material}</h4>
                      </div>
                      <p className="text-xs text-slate-500">
                        Qty: <span className="font-bold text-slate-800">{quote.qty} {quote.unit}</span> • Supplier: <span className="font-medium text-slate-700">{quote.vendor}</span>
                      </p>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold">
                        <Calendar className="w-3 h-3" />
                        Requested on {quote.date}
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-2">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${quote.statusColor}`}>
                        {quote.status}
                      </span>
                      <button
                        onClick={() => showToast(`Opening chat query for Quote ID #${quote.id}`)}
                        className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        Contact Supplier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Plans Tab Panel */}
            {activeTab === 'plans' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {savedPlans.map((plan) => (
                  <div key={plan.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between hover:shadow transition-shadow">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] bg-slate-950 text-amber-500 border border-slate-800 uppercase font-black tracking-wide px-2 py-0.5 rounded-md">
                          {plan.layoutStyle} compliant
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold">
                          <Calendar className="w-3 h-3" />
                          {plan.date}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-950 text-sm">{plan.rooms} Blueprint</h4>
                      <p className="text-xs text-slate-500">Plot: {plan.plotSize} • Floors: {plan.floors}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-50 flex gap-2">
                      <button
                        onClick={() => showToast('Simulated blueprint pdf download')}
                        className="w-full flex items-center justify-center gap-1 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold py-1.5 rounded-lg text-xs transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-400" />
                        <span>Get PDF</span>
                      </button>
                      <button
                        onClick={() => showToast('Blueprint removed from library')}
                        className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:text-red-650 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
