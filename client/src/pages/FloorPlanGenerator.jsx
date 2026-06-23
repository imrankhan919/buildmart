import React, { useState } from 'react';
import { Sparkles, FileText, Download, Share2, Printer, Hammer, Eye } from 'lucide-react';
import PlotInputForm from '../components/floorplan/PlotInputForm';
import FloorPlanViewer from '../components/floorplan/FloorPlanViewer';
import RenderViewer from '../components/floorplan/RenderViewer';
import Loader from '../components/common/Loader';

export default function FloorPlanGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleGenerate = (formData) => {
    setIsGenerating(true);
    setGeneratedPlan(null);
    
    // Simulate AI Generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPlan({
        length: Number(formData.length),
        width: Number(formData.width),
        floors: Number(formData.floors),
        rooms: formData.rooms,
        layoutStyle: formData.layoutStyle,
        notes: formData.notes,
      });
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-600 tracking-wider">
            <Sparkles className="w-4 h-4 fill-amber-500/15" />
            <span>AI ARCHITECT ENGINE V1.0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Vastu-Compliant AI Floor Plan Generator
          </h1>
          <p className="text-sm text-slate-450 leading-relaxed max-w-xl mx-auto">
            Generate custom structural blueprints, wall partitions, room layouts, and matching material recommendations in seconds.
          </p>
        </div>

        {/* Generator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Panel: Form */}
          <div className="lg:col-span-5">
            <PlotInputForm onGenerate={handleGenerate} />
          </div>

          {/* Right Panel: Dynamic Viewer Area */}
          <div className="lg:col-span-7">
            {isGenerating && (
              <div className="bg-white border border-slate-200/80 rounded-2xl p-12 shadow-sm flex items-center justify-center min-h-[420px]">
                <Loader message="Analyzing plot coordinates & computing Vastu placements..." />
              </div>
            )}

            {!isGenerating && !generatedPlan && (
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

            {/* Generated Layout */}
            {!isGenerating && generatedPlan && (
              <div className="space-y-6">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
                  <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
                    <h3 className="font-extrabold text-slate-900 text-base">Generated Floor Plan</h3>
                    <div className="flex gap-2">
                      <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors" title="Print Plan">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-500 transition-colors" title="Share Plan">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Viewers Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloorPlanViewer
                      length={generatedPlan.length}
                      width={generatedPlan.width}
                      rooms={generatedPlan.rooms}
                      layoutStyle={generatedPlan.layoutStyle}
                      floors={generatedPlan.floors}
                    />
                    <RenderViewer
                      layoutStyle={generatedPlan.layoutStyle}
                      rooms={generatedPlan.rooms}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Static Sample Generated Plan Section */}
        <div className="border-t border-slate-200 pt-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-slate-950 p-2 text-white rounded-xl shadow-md">
              <Eye className="w-5 h-5 text-amber-500" />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Sample Generated Plan</h2>
              <p className="text-xs text-slate-400">See a pre-generated structural design representing a standard 2 BHK Modern layout.</p>
            </div>
          </div>
          
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FloorPlanViewer length={40} width={30} rooms="2 BHK" layoutStyle="Modern" floors={1} />
              <RenderViewer layoutStyle="Modern" rooms="2 BHK" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
