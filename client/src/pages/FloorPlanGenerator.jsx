import { useState } from 'react';
import { Sparkles, FileText, Share2, Printer, Eye, Coins, Download } from 'lucide-react';
import PlotInputForm from '../components/floorplan/PlotInputForm';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState.jsx';
import { useToast, getErrorMessage } from '../components/common/Toast.jsx';
import { useMutation } from '@tanstack/react-query';
import { generateFloorPlan, generateFinalPlan, generateBOM } from '../services/aiService';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from '../features/auth/authSlice';
import BOMViewer from '../components/floorplan/BOMViewer.jsx';
import { generatePlanPdf } from '../utils/generatePlanPdf.js';

function isCreditError(error) {
  return error?.status === 409 && /credit/i.test(error?.message || '');
}

export default function FloorPlanGenerator() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();

  // NOTE: the backend deducts credits BEFORE calling Gemini, so credits drop
  // even when generation itself fails (server-side ordering, not fixable from
  // here). Mirror that locally so the displayed balance stays truthful: deduct
  // on success and on 5xx failures, but not on 409/validation rejections where
  // the backend never deducts.
  const syncCredits = (error, cost) => {
    if (!error || error.status === 409 || (error.status >= 400 && error.status < 500)) return;
    if (typeof user?.credits === 'number') {
      dispatch(refreshUser({ credits: Math.max(0, user.credits - cost) }));
    }
  };

  const plan2D = useMutation({ mutationFn: (formData) => generateFloorPlan({ formData }) });
  const render3D = useMutation({
    mutationFn: ({ planId, extraFields }) => generateFinalPlan({ planId, extraFields }),
  });
  const bomMutation = useMutation({ mutationFn: (planId) => generateBOM(planId) });

  const [renderInputs, setRenderInputs] = useState({
    numberOfFloors: 1,
    facingDirection: 'East',
    architecturalStyle: 'Modern',
    wallFinish: 'Acrylic emulsion',
    roofType: 'Flat RCC',
    balcony: 'Yes',
    additionalFeatures: '',
  });

  const plan = plan2D.data;
  const planImage = plan?.floorPlan;
  const renderImage = render3D.data?.finalDesign || plan?.finalDesign;
  const bom = bomMutation.data?.billOfMaterials;
  const bomPlan = bomMutation.data;
  const hasRender = Boolean(renderImage);

  const handleDownloadPdf = async () => {
    if (!bomPlan) return;
    try {
      await generatePlanPdf({
        plan: bomPlan,
        onImageError: (which) => toast.error(`${which} could not be embedded in the PDF.`),
      });
      toast.success('PDF report downloaded.');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Could not build the PDF.'));
    }
  };

  const handleBOM = () => {
    if (!plan?._id) return;
    bomMutation.mutate(plan._id, {
      onSuccess: () => {
        if (typeof user?.credits === 'number') dispatch(refreshUser({ credits: Math.max(0, user.credits - 1) }));
        toast.success('Bill of materials generated (1 credit used).');
      },
      onError: (err) => {
        syncCredits(err, 1);
        if (isCreditError(err)) toast.error('Not enough credits for a BOM (needs 1).');
        else toast.error(getErrorMessage(err, 'Failed to generate bill of materials.'));
      },
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRenderInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (formData) => {
    if (!user) {
      toast.error('Please log in to generate floor plans.');
      return;
    }
    render3D.reset();
    bomMutation.reset();
    setRenderInputs((prev) => ({ ...prev, numberOfFloors: Number(formData.floors) || 1 }));
    plan2D.mutate(formData, {
      onSuccess: () => {
        if (typeof user?.credits === 'number') dispatch(refreshUser({ credits: Math.max(0, user.credits - 2) }));
        toast.success('2D blueprint generated (2 credits used).');
      },
      onError: (err) => {
        syncCredits(err, 2);
        if (isCreditError(err)) toast.error('Not enough credits for a 2D plan. Request credits from your profile.');
        else toast.error(getErrorMessage(err, 'Failed to generate floor plan.'));
      },
    });
  };

  const handleRender3D = () => {
    if (!plan?._id) return;
    render3D.mutate(
      {
        planId: plan._id,
        extraFields: {
          ...renderInputs,
          plotSize: `${plan2D.variables?.length ?? ''} x ${plan2D.variables?.width ?? ''}`,
        },
      },
      {
        onSuccess: () => {
          if (typeof user?.credits === 'number') dispatch(refreshUser({ credits: Math.max(0, user.credits - 3) }));
          toast.success('3D render generated (3 credits used).');
        },
        onError: (err) => {
          syncCredits(err, 3);
          if (isCreditError(err)) toast.error('Not enough credits for a 3D render. Request credits from your profile.');
          else toast.error(getErrorMessage(err, 'Failed to generate 3D render.'));
        },
      },
    );
  };

  const generating = plan2D.isPending;
  const hasPlan = Boolean(planImage);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-600 tracking-wider">
            <Sparkles className="w-4 h-4 fill-amber-500/15" />
            <span>AI ARCHITECT ENGINE V1.0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Vastu-Compliant AI Floor Plan Generator
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-xl mx-auto">
            Step 1 generates a 2D blueprint image (2 credits). Step 2 turns it into a photorealistic 3D exterior render (3 credits). Step 3 estimates a bill of materials (1 credit).
          </p>
          {typeof user?.credits === 'number' && (
            <p className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full">
              <Coins className="w-4 h-4 text-amber-500" />
              Credits available: {user.credits}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5">
            <PlotInputForm onGenerate={handleGenerate} />
          </div>

          <div className="lg:col-span-7">
            {generating && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-12 shadow-sm flex items-center justify-center min-h-[420px]">
                <Loader message="Generating 2D blueprint with Gemini… (this can take up to a minute)" />
              </div>
            )}

            {plan2D.isError && !generating && (
              <div className="mb-6">
                <EmptyState
                  icon="⚠️"
                  title={isCreditError(plan2D.error) ? 'Insufficient credits' : 'Generation failed'}
                  message={
                    isCreditError(plan2D.error)
                      ? 'A 2D plan costs 2 credits. Request more credits, then try again.'
                      : getErrorMessage(plan2D.error)
                  }
                />
              </div>
            )}

            {!generating && !hasPlan && !plan2D.isError && (
              <div className="bg-white border-2 border-dashed border-slate-300/80 rounded-3xl p-12 shadow-sm text-center flex flex-col items-center justify-center min-h-[420px] select-none">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-6">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-2">Your AI Blueprint Awaits</h3>
                <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-6">
                  Enter your plot length, width, and room counts in the requirements panel to render a customized architecture mapping.
                </p>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1">
                  <span>Engine status: Ready</span>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block border-2 border-white animate-pulse"></span>
                </div>
              </div>
            )}

            {!generating && hasPlan && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
                    <h3 className="font-extrabold text-slate-900 text-base">Generated 2D Floor Plan</h3>
                    <div className="flex gap-2">
                      <button aria-label="Print plan" className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button aria-label="Share plan" className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <img
                    src={planImage}
                    alt="AI generated 2D floor plan blueprint"
                    className="w-full rounded-xl border border-slate-200 object-contain bg-white"
                    loading="lazy"
                  />
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-slate-900 text-base">Step 2 — Generate 3D Render (3 credits)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="text-xs font-bold text-slate-500">
                      Facing direction
                      <select name="facingDirection" value={renderInputs.facingDirection} onChange={handleInput} className="mt-1 w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                        {['East', 'West', 'North', 'South'].map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs font-bold text-slate-500">
                      Architectural style
                      <select name="architecturalStyle" value={renderInputs.architecturalStyle} onChange={handleInput} className="mt-1 w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                        {['Modern', 'Vastu', 'Contemporary', 'Traditional'].map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs font-bold text-slate-500">
                      Wall finish
                      <input name="wallFinish" value={renderInputs.wallFinish} onChange={handleInput} className="mt-1 w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    </label>
                    <label className="text-xs font-bold text-slate-500">
                      Roof type
                      <input name="roofType" value={renderInputs.roofType} onChange={handleInput} className="mt-1 w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    </label>
                    <label className="text-xs font-bold text-slate-500">
                      Balcony
                      <select name="balcony" value={renderInputs.balcony} onChange={handleInput} className="mt-1 w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500">
                        {['Yes', 'No'].map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs font-bold text-slate-500">
                      Floors
                      <input name="numberOfFloors" type="number" min="1" max="10" value={renderInputs.numberOfFloors} onChange={handleInput} className="mt-1 w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    </label>
                  </div>
                  <label className="text-xs font-bold text-slate-500 block">
                    Additional features
                    <textarea name="additionalFeatures" value={renderInputs.additionalFeatures} onChange={handleInput} rows="2" placeholder="e.g. garden, parking, terrace garden…" className="mt-1 w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                  </label>
                  <button
                    type="button"
                    onClick={handleRender3D}
                    disabled={render3D.isPending}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{render3D.isPending ? 'Rendering 3D…' : 'Generate 3D Render'}</span>
                  </button>
                  {render3D.isError && (
                    <p className="text-xs font-bold text-red-600">
                      {isCreditError(render3D.error) ? 'Not enough credits for a 3D render (needs 3).' : getErrorMessage(render3D.error)}
                    </p>
                  )}
                </div>

                {(render3D.isPending || renderImage) && (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md">
                    <h3 className="text-white font-extrabold text-sm uppercase tracking-wide mb-4">3D Exterior Render</h3>
                    {render3D.isPending ? (
                      <div className="flex items-center justify-center py-10">
                        <Loader message="Rendering photorealistic 3D exterior…" />
                      </div>
                    ) : (
                      <img src={renderImage} alt="AI generated 3D exterior render" className="w-full rounded-xl border border-slate-800 object-contain" loading="lazy" />
                    )}
                  </div>
                )}

                {hasRender && (
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="font-extrabold text-slate-900 text-base">Step 3 — Bill of Materials (1 credit)</h3>
                    {!bom && (
                      <button
                        type="button"
                        onClick={handleBOM}
                        disabled={bomMutation.isPending}
                        className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{bomMutation.isPending ? 'Estimating materials…' : 'Generate Bill of Materials'}</span>
                      </button>
                    )}
                    {bomMutation.isPending && <Loader message="Estimating quantities with AI…" />}
                    {bomMutation.isError && (
                      <p className="text-xs font-bold text-red-600">
                        {isCreditError(bomMutation.error) ? 'Not enough credits for a BOM (needs 1).' : getErrorMessage(bomMutation.error)}
                      </p>
                    )}
                    {bom && bom.items && bom.items.length > 0 && <BOMViewer bom={bom} />}
                    {bom && bom.items && bom.items.length > 0 && (
                      <button
                        type="button"
                        onClick={handleDownloadPdf}
                        className="w-full flex items-center justify-center gap-2 border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-900 font-extrabold py-3 px-4 rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Full Report (PDF)</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-slate-950 p-2 text-white rounded-xl shadow-md">
              <Eye className="w-5 h-5 text-amber-500" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Sample Generated Plan <span className="text-xs font-bold text-slate-400">(static example, not a live result)</span></h2>
              <p className="text-xs text-slate-400">A pre-designed illustration of a standard 2 BHK Modern layout.</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <p className="text-xs text-slate-500 mb-4">Static preview — generate a plan above to see your live AI result as an image.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
