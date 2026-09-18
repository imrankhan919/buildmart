import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function BOMViewer({ bom }) {
  if (!bom || !bom.items || bom.items.length === 0) return null;

  const grouped = bom.items.reduce((acc, item, idx) => {
    const key = item.category || 'Other';
    if (!acc[key]) acc[key] = [];
    acc[key].push({ ...item, idx });
    return acc;
  }, {});

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
      <div>
        <h3 className="font-extrabold text-slate-900 text-base mb-1">Bill of Materials</h3>
        {bom.assumptions && <p className="text-xs text-slate-500 leading-relaxed">{bom.assumptions}</p>}
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h4 className="text-[11px] font-black uppercase tracking-wider text-amber-600 mb-2">{category}</h4>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.idx} className="border border-slate-100 rounded-xl p-3 flex flex-col gap-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900">{item.item}</span>
                  <span className="text-sm font-extrabold text-slate-800">
                    {item.quantity} <span className="text-xs font-medium text-slate-500">{item.unit}</span>
                  </span>
                </div>
                {item.notes && <p className="text-xs text-slate-400">{item.notes}</p>}
                {item.available && item.matches && item.matches.length > 0 ? (
                  <div className="pt-1.5 border-t border-slate-50 space-y-1.5">
                    {item.matches.slice(0, 3).map((m) => (
                      <div key={m.product} className="flex items-center justify-between gap-2 text-xs">
                        <span className="text-slate-600 font-medium truncate">
                          {m.vendorName} — ₹{Number(m.price).toLocaleString('en-IN')}
                        </span>
                        <Link
                          to={`/marketplace/${m.product}`}
                          className="shrink-0 font-bold text-amber-600 hover:text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
                        >
                          View on BuildMart
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="inline-block w-max text-[10px] font-bold px-2 py-0.5 rounded-md border bg-slate-50 text-slate-500 border-slate-200">
                    Not available on BuildMart — you can buy this from any local vendor.
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

BOMViewer.propTypes = {
  bom: PropTypes.shape({
    assumptions: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string,
        item: PropTypes.string,
        quantity: PropTypes.number,
        unit: PropTypes.string,
        notes: PropTypes.string,
        available: PropTypes.bool,
        matches: PropTypes.array,
      }),
    ),
  }),
};
