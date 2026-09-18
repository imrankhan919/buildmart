import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Grid, ArrowUpDown } from 'lucide-react';
import FilterPanel from '../components/marketplace/FilterPanel';
import ProductCard from '../components/marketplace/ProductCard';
import { getAllProducts } from '../services/productService';
import { GridSkeleton } from '../components/common/Skeletons.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import { getErrorMessage } from '../components/common/Toast.jsx';

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // React Query is the single source of truth for server state.
  const { data, isLoading, isError, error } = useQuery({ queryKey: ['products'], queryFn: getAllProducts });
  const products = useMemo(() => data || [], [data]);

  const visible = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = q ? products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(q)) : [...products];
    if (sortBy === 'price-low') list.sort((a, b) => (a.price || 0) - (b.price || 0));
    if (sortBy === 'price-high') list.sort((a, b) => (b.price || 0) - (a.price || 0));
    return list;
  }, [products, searchQuery, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              aria-label="Search building materials"
              placeholder="Search building materials (e.g. Ultratech, bricks, Fe-550...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 self-end md:self-auto">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              aria-label="Sort products"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2.5 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="newest">Sort By: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel />
          </div>
          <div className="lg:col-span-3 min-w-0">
            {isLoading ? (
              <GridSkeleton count={6} />
            ) : isError ? (
              <EmptyState icon="⚠️" title="Could not load products" message={getErrorMessage(error)} />
            ) : visible.length === 0 ? (
              <EmptyState icon="🔍" title="No products found" message={searchQuery ? `Nothing matches "${searchQuery}". Try a different search.` : 'No materials are listed yet. Check back soon.'} />
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Showing {visible.length} Materials</p>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Grid className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-semibold">Grid View</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visible.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
