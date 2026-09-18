import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, ShoppingCart, MessageSquare, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '../services/productService';
import { useToast } from '../components/common/Toast.jsx';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState.jsx';
import { getErrorMessage } from '../components/common/Toast.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const toast = useToast();
  const { data: product, isLoading, isError, error } = useQuery({ queryKey: ['product', id], queryFn: () => getProduct(id) });

  const [quantity, setQuantity] = useState(50);

  const handleIncrement = () => setQuantity((prev) => prev + 10);
  const handleDecrement = () => setQuantity((prev) => (product?.minOrderQty && prev - 10 < product.minOrderQty ? prev : Math.max(1, prev - 10)));

  const triggerAction = (message) => toast.info(message);

  if (isLoading) return <div className="bg-slate-50 py-10"><Loader message="Loading product…" /></div>;
  if (isError || !product) {
    return (
      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState icon="⚠️" title="Product not found" message={getErrorMessage(error, 'This product could not be loaded.')} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-8 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 relative">
              <img src={product?.image} alt={product?.name} className="w-full h-full object-cover" />
              <span className="absolute top-4 right-4 bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                {product.stock > 0 ? 'Available' : 'Out of stock'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 min-w-0">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">{product.category}</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-4 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 mt-3 pb-4 border-b border-slate-100 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-extrabold text-slate-800">{product.rating || '—'}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{product?.vendor?.address}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Bulk Supply Price</span>
                <div className="text-3xl font-black text-slate-900 mt-1">₹{product.price} <span className="text-sm font-medium text-slate-500">/ {product.unit}</span></div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-slate-500">Order Quantity ({product.unit}s)</span>
                <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
                  <button type="button" aria-label="Decrease quantity" onClick={handleDecrement} className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-slate-800 min-w-[50px] text-center">{quantity}</span>
                  <button type="button" aria-label="Increase quantity" onClick={handleIncrement} className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Min. order: {product.minOrderQty} {product.unit}s</span>
              </div>
            </div>

            <div className="text-sm text-slate-600 leading-relaxed">
              <h3 className="font-bold text-slate-900 mb-2">Description</h3>
              <p>{product.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button type="button" onClick={() => triggerAction(`Added ${quantity} ${product.unit}s to cart`)} className="w-full flex items-center justify-center gap-2 border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-900 font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500">
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button type="button" onClick={() => triggerAction(`Quote request for ${quantity} ${product.unit}s sent to vendor`)} className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-black py-3.5 px-4 rounded-xl text-sm transition-all duration-200 shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                <MessageSquare className="w-4 h-4 fill-slate-950/10" />
                <span>Request Custom Quote</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm overflow-x-auto">
            <h3 className="font-extrabold text-slate-950 text-base mb-6 border-b border-slate-100 pb-3">Technical Specifications</h3>
            <table className="w-full text-sm text-left min-w-[480px]">
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 font-bold text-slate-500 w-1/3 pr-4">Category</td>
                  <td className="py-3 text-slate-800 font-medium">{product.category}</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 font-bold text-slate-500 pr-4">Unit</td>
                  <td className="py-3 text-slate-800 font-medium">{product.unit}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Verified Vendor</span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                  {product?.vendor?.name?.[0]}
                </div>
                <h4 className="font-extrabold text-slate-950 text-sm">{product.vendor?.name}</h4>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{product.vendor?.address}</span>
              </div>
            </div>
            {product.vendor?._id && (
              <Link to={`/vendors/${product.vendor._id}`} className="mt-6 w-full flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500">
                View Vendor Profile
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
