import React from 'react';
import { Compass, Maximize2, Move } from 'lucide-react';

export default function FloorPlanViewer({ length = 40, width = 30, rooms = '2 BHK', layoutStyle = 'Vastu', floors = 1 }) {
  // Generate mock room layouts depending on the configuration
  const getRoomsForBHK = (type) => {
    const defaultRooms = [
      { name: 'Living Room', w: 14, l: 16, x: 0, y: 0, color: 'border-blue-400 bg-blue-50/20' },
      { name: 'Kitchen', w: 10, l: 12, x: 14, y: 0, color: 'border-emerald-400 bg-emerald-50/20' },
      { name: 'Master Bed', w: 12, l: 14, x: 0, y: 16, color: 'border-amber-400 bg-amber-50/20' },
      { name: 'Bathroom', w: 8, l: 6, x: 12, y: 16, color: 'border-purple-400 bg-purple-50/20' },
      { name: 'Lobby/Hall', w: 10, l: 8, x: 20, y: 12, color: 'border-slate-300 bg-slate-50/20' }
    ];

    if (type === '1 BHK') {
      return [
        { name: 'Living Room', w: 14, l: 14, x: 0, y: 0, color: 'border-blue-400 bg-blue-50/20' },
        { name: 'Kitchen', w: 10, l: 10, x: 14, y: 0, color: 'border-emerald-400 bg-emerald-50/20' },
        { name: 'Master Bed', w: 12, l: 12, x: 0, y: 14, color: 'border-amber-400 bg-amber-50/20' },
        { name: 'Bathroom', w: 8, l: 6, x: 12, y: 14, color: 'border-purple-400 bg-purple-50/20' }
      ];
    }

    if (type === '3 BHK') {
      return [
        { name: 'Living Room', w: 16, l: 18, x: 0, y: 0, color: 'border-blue-400 bg-blue-50/20' },
        { name: 'Dining Area', w: 12, l: 10, x: 16, y: 0, color: 'border-cyan-400 bg-cyan-50/20' },
        { name: 'Kitchen', w: 10, l: 10, x: 16, y: 10, color: 'border-emerald-400 bg-emerald-50/20' },
        { name: 'Master Bed', w: 14, l: 14, x: 0, y: 18, color: 'border-amber-400 bg-amber-50/20' },
        { name: 'Kids Bed', w: 12, l: 12, x: 14, y: 20, color: 'border-indigo-400 bg-indigo-50/20' },
        { name: 'Guest Bed', w: 12, l: 12, x: 26, y: 20, color: 'border-orange-400 bg-orange-50/20' },
        { name: 'Bath (Attached)', w: 6, l: 6, x: 0, y: 32, color: 'border-purple-400 bg-purple-50/20' },
        { name: 'Common Bath', w: 8, l: 6, x: 6, y: 32, color: 'border-purple-400 bg-purple-50/20' }
      ];
    }

    // Default 2 BHK or others
    return defaultRooms;
  };

  const layoutRooms = getRoomsForBHK(rooms);

  return (
    <div className="bg-[#0b1329] border border-blue-900 rounded-2xl p-6 shadow-inner text-blue-400 relative overflow-hidden flex flex-col items-center">
      {/* Blueprint Grid Watermark background */}
      <div className="absolute inset-0 blueprint-grid-dark opacity-35 pointer-events-none"></div>

      {/* Blueprint Header */}
      <div className="w-full flex justify-between items-center pb-4 border-b border-blue-900 relative z-10 mb-6">
        <div>
          <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">Blueprint Layout</span>
          <h4 className="text-white font-extrabold text-sm">{length}ft × {width}ft Plot — Floor {floors} of {floors}</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-blue-950 text-blue-300 font-bold py-1 px-2.5 rounded-lg border border-blue-800 uppercase tracking-wide">
            {layoutStyle} Compliant
          </span>
          <Compass className="w-5 h-5 text-amber-500 animate-pulse" />
        </div>
      </div>

      {/* Blueprint Drawing Container */}
      <div className="relative border-4 border-blue-800 bg-[#0c1630] w-full max-w-[480px] aspect-[4/3] rounded-lg flex items-center justify-center p-4 shadow-2xl relative z-10">
        
        {/* Draw Layout Rooms dynamically using Grid/Flex */}
        <div className="w-full h-full relative border border-dashed border-blue-900/60 rounded">
          
          {/* Vastu Direction Indicators */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-[9px] font-bold text-blue-700">NORTH (Kuber)</div>
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-[9px] font-bold text-blue-700">SOUTH (Yama)</div>
          <div className="absolute left-1 top-1/2 transform -translate-y-1/2 -rotate-90 text-[9px] font-bold text-blue-700">WEST (Varun)</div>
          <div className="absolute right-1 top-1/2 transform -translate-y-1/2 rotate-90 text-[9px] font-bold text-blue-700">EAST (Indra)</div>
          
          {/* Render Rooms */}
          <div className="w-full h-full grid grid-cols-12 grid-rows-12 gap-1.5 p-6">
            {layoutRooms.map((room, idx) => {
              // Create dynamic CSS grid assignments for representation
              const colSpan = room.w > 12 ? 'col-span-6' : 'col-span-5';
              const rowSpan = room.l > 12 ? 'row-span-6' : 'row-span-4';
              return (
                <div
                  key={idx}
                  className={`border-2 border-dashed rounded-lg p-2.5 flex flex-col justify-between transition-all duration-300 hover:border-blue-300 hover:bg-blue-400/10 ${room.color} ${colSpan} ${rowSpan}`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-300 leading-none block truncate">
                      {room.name}
                    </span>
                    <span className="text-[9px] text-blue-500 font-medium">
                      {room.w}' × {room.l}'
                    </span>
                  </div>
                  {/* Mock Door Arc */}
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-[7px] bg-blue-950/80 px-1 py-0.5 rounded text-blue-400 border border-blue-900">D1</span>
                    <div className="w-2.5 h-2.5 border-t border-r border-blue-500 rounded-tr-full"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Blueprint Scale and Metrics Info */}
      <div className="w-full grid grid-cols-3 gap-4 border-t border-blue-900 pt-5 mt-6 text-center text-xs relative z-10">
        <div>
          <span className="text-[10px] text-blue-500 block mb-0.5 uppercase">Built Area</span>
          <span className="font-bold text-white">{(length * width * 0.9).toFixed(0)} sq ft</span>
        </div>
        <div>
          <span className="text-[10px] text-blue-500 block mb-0.5 uppercase">Scale</span>
          <span className="font-bold text-white">1 : 100 px</span>
        </div>
        <div>
          <span className="text-[10px] text-blue-500 block mb-0.5 uppercase">Est. Cost</span>
          <span className="font-bold text-amber-500">₹{(length * width * 1800).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}
