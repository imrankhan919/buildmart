import React from 'react';

/**
 * Loader component with clean, modern building blocks and spin micro-animations.
 * @param {string} [message="Processing..."] Custom text to display under the loader.
 */
export default function Loader({ message = "Processing..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
      <div className="relative flex items-center justify-center w-16 h-16">
        {/* Pulsing Outer Ring */}
        <div className="absolute w-full h-full border-4 border-amber-500/20 rounded-full animate-ping"></div>
        
        {/* Spinning Outer Ring */}
        <div className="absolute w-full h-full border-t-4 border-r-4 border-amber-500 border-solid rounded-full animate-spin"></div>
        
        {/* Inner Construction Icon */}
        <div className="text-2xl animate-bounce">🏗️</div>
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-800 tracking-wide">{message}</p>
        <p className="text-xs text-slate-400">BuildMart AI Assistant is working</p>
      </div>
    </div>
  );
}
