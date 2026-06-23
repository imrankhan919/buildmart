import React, { useState, useEffect } from 'react';
import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Search, SlidersHorizontal, Grid, ArrowUpDown } from 'lucide-react';
import FilterPanel from '../components/marketplace/FilterPanel';
import ProductCard from '../components/marketplace/ProductCard';
import { getAllProducts } from '../services/productService';

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Hardcoded 8 dummy products
  const [products, setProducts] = useState([]);

  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const { data, isLoading, isError, isSuccess, error } = useQuery({ queryKey: ['todos'], queryFn: getAllProducts })

  useEffect(() => {
    if (isSuccess) {
      setProducts(data)
    }
  }, [])

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Marketplace Search Header */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search building materials (e.g. Ultratech, bricks, Fe-550...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm"
            />
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2.5 bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              <option value="newest">Sort By: Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Grid: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <FilterPanel />
          </div>

          {/* Product Cards List */}
          <div className="lg:col-span-3">
            {isLoading ? (
              // Loading Skeleton Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm p-4 space-y-4 animate-pulse">
                    <div className="bg-slate-200 aspect-[4/3] rounded-xl"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                    <div className="pt-4 border-t border-slate-100 flex justify-between">
                      <div className="h-6 bg-slate-200 rounded w-1/3"></div>
                      <div className="h-6 bg-slate-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-10 bg-slate-200 rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : (
              // Real Grid
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Showing {products.length} Materials</p>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Grid className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-semibold">Grid View</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
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
