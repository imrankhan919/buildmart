import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Building, ShieldCheck, ShoppingCart, MessageSquare, Plus, Minus, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/marketplace/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(50);
  const [showNotification, setShowNotification] = useState(null);

  // Mock product fetch based on ID or fallback
  const product = {
    id: id || 1,
    name: 'UltraTech Premium OPC 53 Grade Cement',
    category: 'Cement',
    price: 420,
    unit: 'bag',
    vendorName: 'Narmada Building Materials',
    vendorId: 2,
    location: 'Indore',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop',
    minOrderQty: 50,
    availability: 'In Stock',
    description: 'UltraTech Cement is India’s No. 1 cement. UltraTech Premium is a concrete special cement manufactured in state-of-the-art plants. It is a composite cement that produces high-durability concrete which is highly resistant to chemical attacks. Perfect for structural columns, beams, slabs, and foundation footings.',
    specs: [
      { name: 'Material Grade', value: 'OPC 53 Grade' },
      { name: 'Net Weight', value: '50 kg per bag' },
      { name: 'Dimensions', value: '60 × 40 × 12 cm' },
      { name: 'Compressive Strength', value: '53 MPa (Min at 28 Days)' },
      { name: 'Soundness', value: '1.2 mm (Le-Chatelier)' },
      { name: 'Initial Setting Time', value: '45 mins' },
    ]
  };

  // Mock related products (3 items)
  const relatedProducts = [
    {
      id: 7,
      name: 'Ambuja Kawach Waterproof Cement',
      category: 'Cement',
      price: 450,
      unit: 'bag',
      vendorName: 'Narmada Building Materials',
      location: 'Mumbai',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop',
      minOrderQty: 50,
      availability: 'In Stock',
    },
    {
      id: 2,
      name: 'Kamdhenu Fe-550 TMT Steel Rebars',
      category: 'Steel',
      price: 58,
      unit: 'kg',
      vendorName: 'Khandelwal Iron & Steel',
      location: 'Bhopal',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop',
      minOrderQty: 250,
      availability: 'In Stock',
    },
    {
      id: 4,
      name: 'Premium Red Clay Wall Bricks (First Class)',
      category: 'Bricks',
      price: 8,
      unit: 'piece',
      vendorName: 'Shri Ram Brick Kiln',
      location: 'Indore',
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=400&auto=format&fit=crop',
      minOrderQty: 1000,
      availability: 'In Stock',
    },
  ];

  const handleIncrement = () => setQuantity((prev) => prev + 10);
  const handleDecrement = () => setQuantity((prev) => (prev > product.minOrderQty ? prev - 10 : prev));

  const triggerAction = (message) => {
    setShowNotification(message);
    setTimeout(() => {
      setShowNotification(null);
    }, 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 relative">
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <span className="text-amber-500">✨</span>
          <p className="text-sm font-bold">{showNotification}</p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm mb-12">
          
          {/* Left Panel: Large Image */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                {product.availability}
              </span>
            </div>
            <div className="flex gap-4">
              <div className="aspect-[4/3] w-24 rounded-xl overflow-hidden border border-amber-500 bg-slate-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] w-24 rounded-xl overflow-hidden border border-slate-200 opacity-60 hover:opacity-100 transition-opacity bg-slate-100 cursor-pointer">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right Panel: Configurations and Specs */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Category */}
              <span className="text-xs uppercase font-extrabold tracking-wider text-amber-600 bg-amber-50 border border-amber-150 px-3 py-1 rounded-lg">
                {product.category}
              </span>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-4 leading-tight">
                {product.name}
              </h1>

              {/* Location and Rating */}
              <div className="flex items-center gap-4 mt-3 pb-4 border-b border-slate-100 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-extrabold text-slate-800">{product.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{product.location}</span>
                </div>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs text-slate-400 block font-medium">Bulk Supply Price</span>
                <div className="text-3xl font-black text-slate-900 mt-1">
                  ₹{product.price} <span className="text-sm font-medium text-slate-500">/ {product.unit}</span>
                </div>
              </div>
              
              {/* Interactive Quantity Selection */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-slate-500">Order Quantity ({product.unit}s)</span>
                <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
                  <button
                    onClick={handleDecrement}
                    className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-slate-800 min-w-[50px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">Min. order: {product.minOrderQty} {product.unit}s</span>
              </div>
            </div>

            {/* Description */}
            <div className="text-sm text-slate-600 leading-relaxed">
              <h3 className="font-bold text-slate-900 mb-2">Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Action CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => triggerAction(`Added ${quantity} ${product.unit}s to Cart`)}
                className="w-full flex items-center justify-center gap-2 border-2 border-slate-900 bg-white hover:bg-slate-50 text-slate-900 font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => triggerAction(`Quote request for ${quantity} ${product.unit}s sent to vendor`)}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-black py-3.5 px-4 rounded-xl text-sm transition-all duration-300 shadow-md shadow-amber-500/10 transform hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950/10" />
                <span>Request Custom Quote</span>
              </button>
            </div>

          </div>
        </div>

        {/* Technical Specifications & Vendor Snippet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Tech Specs Table */}
          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-extrabold text-slate-950 text-base mb-6 border-b border-slate-100 pb-3">Technical Specifications</h3>
            <table className="w-full text-sm text-left">
              <tbody className="divide-y divide-slate-100">
                {product.specs.map((spec, index) => (
                  <tr key={index} className="hover:bg-slate-50/50">
                    <td className="py-3 font-bold text-slate-500 w-1/3 pr-4">{spec.name}</td>
                    <td className="py-3 text-slate-800 font-medium">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Vendor Snippet Card */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Verified Vendor</span>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                  NB
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-950 text-sm">{product.vendorName}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold text-slate-700">{product.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Shop #402, Loha Mandi, {product.location}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-2">
                Delivering high-quality building material options across central India for 12+ years. 100% genuine supply guaranteed.
              </p>
            </div>
            
            <Link
              to={`/vendors/${product.vendorId}`}
              className="mt-6 w-full flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
            >
              View Vendor Profile
            </Link>
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 mb-6 border-b border-slate-150 pb-3">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
