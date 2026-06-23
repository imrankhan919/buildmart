import React from 'react';
import { Eye, Download, Image as ImageIcon, Box } from 'lucide-react';

export default function RenderViewer({ layoutStyle = 'Modern', rooms = '2 BHK' }) {
  // Configured specifications based on layout style selection
  const getSpecsByStyle = (style) => {
    const defaultSpecs = {
      flooring: 'Vitrified Glazed Tiles (2x2 ft, Ivory shade)',
      walls: 'Neutral Grey Acrylic Emulsion Paint',
      ceiling: 'Gypsum Board False Ceiling with recessed LED warm spotlights',
      doors: 'Teakwood main door, flush doors for internal rooms',
      materials: 'Birla Gold OPC Cement, Kamdhenu Fe-550 TMT Steel'
    };

    if (style === 'Vastu') {
      return {
        flooring: 'Polished white Makrana marble in living rooms',
        walls: 'Light cream and pastel off-whites for positive energy flow',
        ceiling: 'Simple wooden paneling accents with direct warm lighting',
        doors: 'Vastu-compliant East-facing carved wooden entrance door',
        materials: 'Ultratech Premium Cement, Tata Tiscon Fe-550 Steel'
      };
    }

    if (style === 'Open' || style === 'Open Plan') {
      return {
        flooring: 'Seamless matte-finish grey concrete styling tiles',
        walls: 'Pure Alpine White walls with industrial brick accent wall',
        ceiling: 'Exposed structural concrete ceiling with tracks and pendant lights',
        doors: 'Double-glazed glass sliding doors with black powder-coated frames',
        materials: 'Ambuja Kawach Cement, Jindal Panther TMT Steel'
      };
    }

    return defaultSpecs;
  };

  const specs = getSpecsByStyle(layoutStyle);

  return (
    <div className="bg-slate-900 border border-slate-800 text-slate-300 rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col h-full">
      {/* Visual Accent Top Right */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-500/10 rounded-full blur-xl"></div>
      
      <div className="flex items-center gap-2 mb-4">
        <Box className="w-5 h-5 text-amber-500" />
        <h4 className="text-white font-extrabold text-sm uppercase tracking-wide">3D Render Specifications</h4>
      </div>

      <p className="text-xs text-slate-400 mb-6 leading-relaxed">
        Recommended interior textures, paint codes, and raw material grades matched specifically for your <span className="text-amber-500 font-bold">{layoutStyle}</span> layout.
      </p>

      {/* Specification Details List */}
      <div className="space-y-4 flex-grow mb-6">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Flooring Style</span>
          <span className="text-xs font-semibold text-white">{specs.flooring}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Wall Finishes</span>
          <span className="text-xs font-semibold text-white">{specs.walls}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Ceiling & Illumination</span>
          <span className="text-xs font-semibold text-white">{specs.ceiling}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Doors & Windows</span>
          <span className="text-xs font-semibold text-white">{specs.doors}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">Recommended Material Grades</span>
          <span className="text-xs font-semibold text-amber-500">{specs.materials}</span>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-semibold py-2 px-3 rounded-xl text-xs transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Interactive 3D</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-extrabold py-2 px-3 rounded-xl text-xs transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Get PDF Spec</span>
        </button>
      </div>
    </div>
  );
}
