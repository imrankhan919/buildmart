import PropTypes from 'prop-types';
import { X } from 'lucide-react';

export default function AddProductModal({ open, onClose, onSubmit }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative">
        <button
          type="button"
          aria-label="Close dialog"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 p-1.5 hover:bg-slate-50 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="font-extrabold text-slate-950 text-lg mb-2">Add New Product Listing</h3>
        <p className="text-xs text-slate-400 mb-6">Create a new building material listing for buyers to order.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="new-product-name" className="text-xs font-bold text-slate-500 block mb-1.5">Product Name *</label>
            <input
              id="new-product-name"
              type="text"
              placeholder="e.g. UltraTech Super OPC Cement"
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="new-product-price" className="text-xs font-bold text-slate-500 block mb-1.5">Price (₹) *</label>
              <input id="new-product-price" type="number" placeholder="e.g. 450" className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" required />
            </div>
            <div>
              <label htmlFor="new-product-qty" className="text-xs font-bold text-slate-500 block mb-1.5">Minimum Order Qty *</label>
              <input id="new-product-qty" type="number" placeholder="e.g. 50" className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500" required />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-5 py-2.5 border border-slate-200 rounded-xl text-slate-600 text-xs font-bold hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500">
              Cancel
            </button>
            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddProductModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
