import React, { useState } from 'react';
import { Compass, Sparkles, Building, Layers } from 'lucide-react';

export default function PlotInputForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    length: '',
    width: '',
    floors: 1,
    rooms: '2 BHK',
    layoutStyle: 'Vastu',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setFloors = (num) => {
    setFormData((prev) => ({ ...prev, floors: num }));
  };

  const setStyle = (style) => {
    setFormData((prev) => ({ ...prev, layoutStyle: style }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.length || !formData.width) {
      alert('Please enter both Plot Length and Plot Width');
      return;
    }
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-base font-extrabold text-slate-900 mb-1 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500/20" />
          <span>Floor Plan Requirements</span>
        </h3>
        <p className="text-xs text-slate-400">Specify plot sizes and architectural details to generate custom blueprints.</p>
      </div>

      {/* Plot Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-500 block mb-1.5">Plot Length (ft) *</label>
          <input
            type="number"
            name="length"
            value={formData.length}
            onChange={handleChange}
            placeholder="e.g. 40"
            className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            required
            min="10"
            max="200"
          />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 block mb-1.5">Plot Width (ft) *</label>
          <input
            type="number"
            name="width"
            value={formData.width}
            onChange={handleChange}
            placeholder="e.g. 30"
            className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            required
            min="10"
            max="200"
          />
        </div>
      </div>

      {/* Number of Floors (Visual Toggle Selectors) */}
      <div>
        <label className="text-xs font-bold text-slate-500 block mb-2">Number of Floors</label>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFloors(f)}
              className={`flex flex-col items-center justify-center py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 ${
                formData.floors === f
                  ? 'border-amber-500 bg-amber-50 text-amber-700 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4 mb-1" />
              <span>{f} {f === 1 ? 'Floor' : 'Floors'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Rooms Config & Layout Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-500 block mb-1.5">Rooms / Layout</label>
          <select
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          >
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
            <option value="5 BHK">5 BHK</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 block mb-1.5">Style Philosophy</label>
          <div className="grid grid-cols-3 gap-1.5">
            {['Vastu', 'Modern', 'Open'].map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setStyle(style)}
                className={`py-2 px-1 rounded-lg border text-center text-xs font-bold transition-all duration-200 ${
                  formData.layoutStyle === style
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom Notes */}
      <div>
        <label className="text-xs font-bold text-slate-500 block mb-1.5">Additional Requirements (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          placeholder="e.g. Garden facing balcony, modular kitchen layout, double height ceiling..."
          className="w-full text-sm border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
        ></textarea>
      </div>

      {/* Submit Action */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all duration-300 shadow-md shadow-amber-500/10 transform hover:-translate-y-0.5"
      >
        <Sparkles className="w-4 h-4 fill-slate-950/20" />
        <span>Generate AI Floor Plan</span>
      </button>
    </form>
  );
}
