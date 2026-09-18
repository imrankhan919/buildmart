import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, ArrowRight, ShoppingBag, FileText, Download, Trash2, Calendar, Award, Coins } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../features/auth/authSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getSavedPlans, generateBOM } from '../services/aiService';
import { useToast, getErrorMessage } from '../components/common/Toast.jsx';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState.jsx';
import BOMViewer from '../components/floorplan/BOMViewer.jsx';
import { generatePlanPdf } from '../utils/generatePlanPdf.js';

const QUOTES = [
  { id: 1, material: 'UltraTech Premium OPC 53 Grade Cement', qty: 150, unit: 'bags', vendor: 'Narmada Building Materials', date: 'June 14, 2026', status: 'Quote Sent: ₹63,000', statusColor: 'bg-green-50 text-green-700 border-green-200' },
  { id: 2, material: 'Kamdhenu Fe-550 TMT Steel Rebars', qty: 600, unit: 'kg', vendor: 'Khandelwal Iron & Steel', date: 'June 15, 2026', status: 'Pending Vendor Price', statusColor: 'bg-amber-50 text-amber-700 border-amber-200' },
];

export default function UserProfile() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('quotes');

  // Route is guarded; query reads token via apiClient interceptor.
  const { data: plans, isLoading } = useQuery({ queryKey: ['saved-plans'], queryFn: () => getSavedPlans(), enabled: Boolean(user) });
  const savedPlans = plans || [];

  const bomMutation = useMutation({
    mutationFn: (planId) => generateBOM(planId),
    onSuccess: () => {
      if (typeof user?.credits === 'number') dispatch(refreshUser({ credits: Math.max(0, user.credits - 1) }));
      toast.success('Bill of materials generated (1 credit used).');
      queryClient.invalidateQueries({ queryKey: ['saved-plans'] });
    },
    onError: (err) => {
      const creditError = err?.status === 409 && /credit/i.test(err?.message || '');
      toast.error(creditError ? 'Not enough credits for a BOM (needs 1).' : getErrorMessage(err, 'Failed to generate bill of materials.'));
    },
  });

  const showToast = (message) => toast.info(message);

  const handleDownloadPdf = async (plan) => {
    try {
      await generatePlanPdf({
        plan,
        onImageError: (which) => toast.error(`${which} could not be embedded in the PDF.`),
      });
      toast.success('PDF report downloaded.');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Could not build the PDF.'));
    }
  };

  if (!user) return <Loader message="Loading profile…" />;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden select-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
              {user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase()}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-black">{user?.name}</h1>
              <p className="text-slate-400 text-xs flex items-center justify-center sm:justify-start gap-1 font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                Role: {user?.isAdmin ? 'Administrator' : user?.isVendor ? 'Supplier' : 'Buyer / Builder'}
              </p>
            </div>
          </div>
          {!user?.isVendor && !user?.isAdmin && (
            <button
              type="button"
              onClick={() => showToast('Vendor activation is simulated in this build.')}
              className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all duration-200 shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <span>Activate Vendor Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base mb-4">Contact Particulars</h3>
              <div className="space-y-3.5">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 font-medium">{user?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700 font-bold">{user?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Coins className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 font-medium">Credits Available : {user?.credits ?? 0}</span>
                </div>
              </div>
            </div>

            {user?.isAdmin && (
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h4 className="font-extrabold text-sm uppercase tracking-wide">Admin Access</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">You hold admin controls to verify vendors and moderate listings.</p>
                <button type="button" onClick={() => navigate('/admin')} className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500">
                  Open Admin Center
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-8 space-y-6 min-w-0">
            <div className="border-b border-slate-200 flex gap-6 overflow-x-auto">
              {[
                { id: 'quotes', icon: <ShoppingBag className="w-4 h-4" />, label: `Quote Requests (${QUOTES.length})` },
                { id: 'plans', icon: <FileText className="w-4 h-4" />, label: `Saved Floor Plans (${savedPlans.length})` },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`pb-3 text-xs font-black uppercase tracking-wider transition-colors duration-200 border-b-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-amber-500 ${activeTab === t.id ? 'border-amber-500 text-amber-500' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                >
                  <span className="flex items-center gap-2">{t.icon}<span>{t.label}</span></span>
                </button>
              ))}
            </div>

            {activeTab === 'quotes' && (
              <div className="space-y-4">
                {QUOTES.map((quote) => (
                  <div key={quote.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-shadow duration-200 hover:shadow">
                    <div className="space-y-2">
                      <h4 className="font-extrabold text-slate-950 text-sm">{quote.material}</h4>
                      <p className="text-xs text-slate-500">Qty: <span className="font-bold text-slate-800">{quote.qty} {quote.unit}</span> • Supplier: <span className="font-medium text-slate-700">{quote.vendor}</span></p>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold">
                        <Calendar className="w-3 h-3" />
                        Requested on {quote.date}
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-start sm:items-end gap-2">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${quote.statusColor}`}>{quote.status}</span>
                      <button type="button" onClick={() => showToast(`Opening chat query for Quote ID #${quote.id}`)} className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded">
                        Contact Supplier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'plans' && (
              isLoading ? <Loader message="Loading saved plans…" /> : savedPlans.length === 0 ? (
                <EmptyState icon="📐" title="No saved plans" message="Generate a 2D blueprint from the Floor Plan page and it will appear here." />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {savedPlans.map((plan) => {
                    const hasBOM = plan.billOfMaterials && plan.billOfMaterials.items && plan.billOfMaterials.items.length > 0;
                    const canBOM = plan.finalDesign && !hasBOM;
                    const bomPending = bomMutation.isPending && bomMutation.variables === plan._id;
                    return (
                      <div key={plan._id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 transition-shadow duration-200 hover:shadow">
                        {(plan.floorPlan || plan.finalDesign) && (
                          <img src={plan.finalDesign || plan.floorPlan} alt="Saved AI plan" className="w-full rounded-xl border border-slate-100 object-cover aspect-[4/3]" loading="lazy" />
                        )}
                        {canBOM && (
                          <button
                            type="button"
                            onClick={() => bomMutation.mutate(plan._id)}
                            disabled={bomMutation.isPending}
                            className="w-full flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-slate-950 font-extrabold py-2 px-4 rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{bomPending ? 'Estimating…' : 'Generate Bill of Materials (1 credit)'}</span>
                          </button>
                        )}
                        {hasBOM && <BOMViewer bom={plan.billOfMaterials} />}
                        {hasBOM && (
                          <button
                            type="button"
                            onClick={() => handleDownloadPdf(plan)}
                            className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          >
                            <Download className="w-3.5 h-3.5 text-amber-500" />
                            <span>Download Full Report (PDF)</span>
                          </button>
                        )}
                        <div className="pt-3 border-t border-slate-50 flex gap-2">
                          <button type="button" onClick={() => showToast('Blueprint download (simulated)')} className="w-full flex items-center justify-center gap-1 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold py-1.5 rounded-lg text-xs transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500">
                            <Download className="w-3.5 h-3.5 text-slate-400" />
                            <span>Get Image</span>
                          </button>
                          <button type="button" aria-label="Remove blueprint" onClick={() => showToast('Blueprint removed (simulated)')} className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
