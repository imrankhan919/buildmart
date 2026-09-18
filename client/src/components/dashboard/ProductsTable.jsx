import PropTypes from 'prop-types';
import { Edit3, Trash2 } from 'lucide-react';
import EmptyState from '../common/EmptyState.jsx';

export default function ProductsTable({ products, onEdit, onDelete }) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        icon="📦"
        title="No products yet"
        message="List your first material to start receiving quote requests."
      />
    );
  }
  return (
    <div className="overflow-x-auto -mx-6 px-6">
      <table className="w-full text-left text-sm min-w-[640px]">
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
            <tr key={p._id || p.id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3.5">
                <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-slate-100" loading="lazy" />
              </td>
              <td className="py-3.5 font-bold text-slate-900 pr-4">{p.name}</td>
              <td className="py-3.5 text-slate-500 font-semibold">{p.category}</td>
              <td className="py-3.5 font-bold text-slate-800">₹{p.price} <span className="text-[10px] font-normal text-slate-400">/{p.unit}</span></td>
              <td className="py-3.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.stockStatus === 'In Stock' || (p.stock > 0) ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                  {p.stockStatus || (p.stock > 0 ? 'In Stock' : 'Out of Stock')}
                </span>
              </td>
              <td className="py-3.5 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    aria-label={`Edit ${p.name}`}
                    onClick={() => onEdit?.(p)}
                    className="p-1.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${p.name}`}
                    onClick={() => onDelete?.(p)}
                    className="p-1.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
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
  );
}

ProductsTable.propTypes = {
  products: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
