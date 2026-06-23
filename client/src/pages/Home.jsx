import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Handshake, ChevronRight } from 'lucide-react';
import ProductCard from '../components/marketplace/ProductCard';

export default function Home() {
  // Hardcoded Featured Products (4 items)
  const featuredProducts = [
    {
      id: 1,
      name: 'UltraTech Premium OPC 53 Grade Cement',
      category: 'Cement',
      price: 420,
      unit: 'bag',
      vendorName: 'Narmada Building Materials',
      location: 'Indore',
      rating: 4.8,
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
      id: 3,
      name: 'Modular Glazed Vitrified Tiles (2x2 ft)',
      category: 'Tiles',
      price: 45,
      unit: 'sqft',
      vendorName: 'Somany Tiles Plaza',
      location: 'Mumbai',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop',
      minOrderQty: 100,
      availability: 'Low Stock',
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

  const categories = [
    { name: 'Cement', emoji: '🔘', slug: 'cement', desc: 'OPC, PPC, and special grade sacks' },
    { name: 'Bricks & Blocks', emoji: '🧱', slug: 'bricks', desc: 'Clay bricks, AAC blocks, flyash bricks' },
    { name: 'Tiles & Stones', emoji: '✨', slug: 'tiles', desc: 'Marble, vitrified tiles, granite slabs' },
    { name: 'Structural Steel', emoji: '🔩', slug: 'steel', desc: 'TMT bars, structural beams, binding wires' },
    { name: 'Sand & Aggregate', emoji: '⏳', slug: 'sand', desc: 'River sand, crushed stones, gravel aggregates' },
    { name: 'Wood & Timber', emoji: '🪵', slug: 'wood', desc: 'Teak wood, plyboards, structural shuttering' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-24 md:py-32">
        {/* Soft Decorative Background Circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-40 -mb-40"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left md:flex md:items-center md:justify-between gap-12">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-amber-500">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
              <span>AI Floor Plan Generator Integrated</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Find Premium <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                Construction Materials
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Connect directly with trusted vendors, secure premium raw materials, and instantly generate Vastu-compliant blueprints using our advanced AI floor planner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-2">
              <Link
                to="/marketplace"
                className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-extrabold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/15 transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                <span>Browse Materials</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/floor-plan"
                className="bg-slate-850 hover:bg-slate-800 border-2 border-slate-700 hover:border-slate-600 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 text-center"
              >
                Generate Floor Plan
              </Link>
            </div>
          </div>

          {/* Graphical Blueprint Element */}
          <div className="hidden lg:block w-full max-w-md bg-[#0C1630] border border-blue-900/60 rounded-3xl p-6 shadow-2xl relative">
            <div className="absolute inset-0 blueprint-grid-dark opacity-25 pointer-events-none rounded-3xl"></div>
            <div className="flex justify-between items-center mb-6 border-b border-blue-950 pb-3 relative z-10">
              <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">AI Architect</span>
              <span className="text-xs text-blue-400 font-bold">Vastu Compliant</span>
            </div>
            <div className="h-48 border border-dashed border-blue-900 rounded-xl relative flex items-center justify-center flex-col p-4">
              <div className="text-3xl mb-2">🏗️</div>
              <p className="text-xs text-blue-300 font-semibold text-center leading-relaxed">
                40' × 30' East Facing Plot<br />
                <span className="text-[10px] text-slate-500">2 BHK • Ground Floor Layout</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-slate-950 py-8 border-y border-slate-800 text-center select-none">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-2">
            <div className="text-2xl md:text-3xl font-extrabold text-white">500+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Trusted Vendors</div>
          </div>
          <div className="p-2">
            <div className="text-2xl md:text-3xl font-extrabold text-white">10,000+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Products listed</div>
          </div>
          <div className="p-2">
            <div className="text-2xl md:text-3xl font-extrabold text-white">50+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Cities Covered</div>
          </div>
          <div className="p-2">
            <div className="text-2xl md:text-3xl font-extrabold text-amber-500 flex items-center justify-center gap-1">
              <Sparkles className="w-5 h-5 fill-amber-500" />
              <span>AI Powered</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-wider">Instant Architect</div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Explore Raw Materials by Category
            </h2>
            <p className="text-sm text-slate-400 mt-3">
              Direct procurement of highest grade building materials with no hidden agent fees.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, index) => (
              <Link
                key={index}
                to={`/marketplace?category=${cat.slug}`}
                className="group border border-slate-100 rounded-2xl p-6 bg-slate-50 hover:bg-white hover:shadow-lg hover:border-amber-500/20 transition-all duration-350"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-3 bg-white group-hover:bg-amber-50 rounded-xl shadow-sm transition-colors duration-300">
                    {cat.emoji}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                </div>
                <h3 className="text-slate-900 font-extrabold text-lg mb-1.5 group-hover:text-amber-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Direct and Transparent Procurement
            </h2>
            <p className="text-sm text-slate-400 mt-3">
              Procuring materials is simple and hassle-free. Follow these three steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 border border-blue-200 text-blue-600 rounded-2xl flex items-center justify-center text-xl font-extrabold mx-auto shadow-sm">
                1
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Browse & Filter</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                Filter and compare high quality building elements, bricks, concrete grades, and timber listings from multiple verified local vendors.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4">
              <div className="w-16 h-16 bg-amber-50 border border-amber-200 text-amber-600 rounded-2xl flex items-center justify-center text-xl font-extrabold mx-auto shadow-sm">
                2
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Contact Vendor</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                Request pricing quotes, verify MOQ parameters, negotiate customized bulk ordering, and discuss logistics directly with the owner.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-650 rounded-2xl flex items-center justify-center text-xl font-extrabold mx-auto shadow-sm">
                3
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Direct Build</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                Get materials delivered straight to your construction site and start building with premium guaranteed supplies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                Featured Materials
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Handpicked premium supplies highly rated by local home developers.
              </p>
            </div>
            <Link
              to="/marketplace"
              className="text-sm font-bold text-amber-500 hover:text-amber-600 mt-4 sm:mt-0 flex items-center gap-1 group"
            >
              <span>View Marketplace</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI Banner CTA */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs font-semibold text-amber-500 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 animate-pulse" />
            <span>Empower your vision</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Design Your Dream Home with AI
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Enter your plot dimension and layout style preference, and watch our AI model create custom structured floor plan blueprints in seconds.
          </p>
          <div className="pt-4">
            <Link
              to="/floor-plan"
              className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-extrabold px-8 py-4 rounded-xl text-sm transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 inline-flex items-center gap-2"
            >
              <span>Launch AI Floor Planner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
