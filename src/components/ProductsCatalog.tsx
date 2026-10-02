import React, { useState } from 'react';
import { ALL_PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ArrowUpRight, Check, ShoppingBag, Eye, Sparkles, SlidersHorizontal, MapPin, Search, X } from 'lucide-react';

interface ProductsCatalogProps {
  onSelectProduct: (product: Product) => void;
}

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedHub, setSelectedHub] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories = [
    { id: 'all', label: 'All Catalog' },
    { id: 'setups', label: 'Minimalist Setups' },
    { id: 'keyboards', label: 'Keyboards & Mice' },
    { id: 'charging', label: 'Charging & Docks' },
    { id: 'accessories', label: 'Tech Accessories' },
  ];

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchHub =
      selectedHub === 'all' ||
      (selectedHub === 'abeokuta' && product.hubAvailability.includes('Abeokuta (FUNAAB)')) ||
      (selectedHub === 'lagos' && product.hubAvailability.includes('Lagos (Computer Village)'));
    const matchSearch =
      !searchQuery.trim() ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchHub && matchSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  const formatNaira = (amount: number) => {
    return `₦${amount.toLocaleString('en-NG')}`;
  };

  const getWhatsAppOrderUrl = (product: Product) => {
    const text = encodeURIComponent(
      `Hello Swavy Gadget, I would like to order: "${product.name}" (${formatNaira(product.price)}). Is this currently in stock for pickup/dispatch?`
    );
    return `https://wa.me/2349063192326?text=${text}`;
  };

  return (
    <section id="catalogue" className="w-full bg-[#f5f7fc] py-12 sm:py-20 border-t-2 border-black/15 relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12" data-reveal>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-[0.22em] mb-2.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#2563eb] rotate-45 inline-block" />
              <span>Inventory & Tech Accessories</span>
              <span className="text-[#2563eb] font-black">/</span>
              <span>Direct Supply</span>
            </div>

            <h2 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0f172a] uppercase leading-[0.88] tracking-tight">
              THE SWAVY CATALOGUE.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium mt-2">
              High-quality tech accessories and minimalist desktop architecture. Backed by local warranty and available for in-store pickup or nationwide dispatch.
            </p>
          </div>

          {/* Location Fast Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex items-center">
              <label htmlFor="catalog-search-input" className="sr-only">
                Search gear and accessories
              </label>
              <Search size={15} className="absolute left-3.5 text-neutral-400 pointer-events-none" />
              <input
                id="catalog-search-input"
                type="text"
                placeholder="Search desk gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 bg-white border-2 border-black rounded-2xl pl-9 pr-8 py-2 text-base sm:text-xs font-medium text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#2563eb] shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  id="catalog-search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 p-1 text-neutral-400 hover:text-black cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Hub Selector */}
            <div className="flex items-center gap-1.5 bg-white border-2 border-black p-1.5 rounded-2xl shadow-sm self-start sm:self-auto overflow-x-auto max-w-full">
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 pl-2 pr-1 flex items-center gap-1 shrink-0">
                <MapPin size={12} className="text-[#2563eb]" /> Hub:
              </span>
              <button
                type="button"
                id="hub-filter-all"
                onClick={() => setSelectedHub('all')}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
                  selectedHub === 'all' ? 'bg-black text-white' : 'hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                All Hubs
              </button>
              <button
                type="button"
                id="hub-filter-abeokuta"
                onClick={() => setSelectedHub('abeokuta')}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
                  selectedHub === 'abeokuta' ? 'bg-[#2563eb] text-white' : 'hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                Abeokuta (FUNAAB)
              </button>
              <button
                type="button"
                id="hub-filter-lagos"
                onClick={() => setSelectedHub('lagos')}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0 ${
                  selectedHub === 'lagos' ? 'bg-[#2563eb] text-white' : 'hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                Computer Village
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8" data-reveal>
          <div className="flex items-center gap-2 pb-2 sm:pb-0 overflow-x-auto scrollbar-none touch-pan-x">
            {categories.map((cat) => {
              const count =
                cat.id === 'all'
                  ? ALL_PRODUCTS.length
                  : ALL_PRODUCTS.filter((p) => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-2xl border-2 font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none ${
                    isActive
                      ? 'bg-black text-white border-black shadow-md scale-102'
                      : 'bg-white text-[#0f172a] border-black hover:bg-[#2563eb] hover:text-white shadow-2xs'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-[#2563eb] text-white' : 'bg-neutral-200 text-neutral-800'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort By Select */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <span className="text-[11px] font-mono font-bold uppercase text-neutral-500">
              Sort:
            </span>
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border-2 border-black rounded-xl px-3 py-2 text-base sm:text-xs font-bold text-[#0f172a] focus:outline-none focus:border-[#2563eb] cursor-pointer shadow-xs"
            >
              <option value="featured">Featured Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Empty State when no results */}
        {filteredProducts.length === 0 && (
          <div className="bg-white border-2 border-black rounded-3xl p-8 sm:p-12 text-center shadow-md my-6">
            <p className="font-display-title font-bold text-lg text-[#0f172a] mb-2">
              No products found matching "{searchQuery}"
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mb-5">
              Try searching for something else or clearing your filters.
            </p>
            <button
              type="button"
              id="reset-catalog-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSelectedHub('all');
              }}
              className="bg-black hover:bg-[#2563eb] text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="bg-white border-2 border-black rounded-3xl overflow-hidden shadow-md hover-glow transition-all duration-300 flex flex-col justify-between group"
              data-reveal
            >
              {/* Product Card Image Container */}
              <div className="relative aspect-4/3 w-full bg-neutral-900 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Graceful fallback to verified studio setup photo if network glitch occurs
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="bg-black/90 text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-xl border border-white/20">
                    NO. {product.serial}
                  </span>
                  {product.tag && (
                    <span className="bg-[#2563eb] text-white font-mono text-[10px] font-black px-2.5 py-1 rounded-xl border border-black shadow-2xs">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Quick Inspect Button */}
                <button
                  type="button"
                  id={`product-inspect-btn-${product.id}`}
                  onClick={() => onSelectProduct(product)}
                  className="absolute top-3.5 right-3.5 w-11 h-11 rounded-full bg-white/95 hover:bg-[#2563eb] hover:text-white text-black border border-black flex items-center justify-center shadow-md transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none"
                  title="Inspect Details"
                  aria-label={`Inspect ${product.name} details`}
                >
                  <Eye size={17} />
                </button>

                {/* Bottom Overlay Category */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest font-display-title text-[#38bdf8]">
                    {product.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-[9px] font-mono text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                    <span>READY FOR PICKUP</span>
                  </div>
                </div>
              </div>

              {/* Product Details Content */}
              <div className="p-5 sm:p-6 flex flex-col justify-between grow">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <span className="font-mono text-xl sm:text-2xl font-black text-[#0f172a]">
                      {formatNaira(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="font-mono text-xs text-neutral-400 line-through">
                        {formatNaira(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-[#0f172a] leading-snug mb-2 font-sans group-hover:text-[#2563eb] transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {product.shortDesc}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="space-y-1.5 mb-5">
                    {product.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] font-medium text-neutral-700">
                        <div className="w-3.5 h-3.5 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center shrink-0">
                          <Check size={10} className="stroke-[3]" />
                        </div>
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Availability & Actions */}
                <div className="pt-4 border-t border-black/10 flex flex-col gap-3">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500">
                    <MapPin size={11} className="text-[#2563eb]" />
                    <span>In-Store: Abeokuta (FUNAAB) & Computer Village</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      id={`product-details-btn-${product.id}`}
                      onClick={() => onSelectProduct(product)}
                      className="w-full min-h-[44px] py-2.5 px-3 rounded-2xl bg-white hover:bg-neutral-100 text-[#0f172a] border-2 border-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none active:scale-95"
                    >
                      <Eye size={14} />
                      <span>Details</span>
                    </button>

                    <a
                      href={getWhatsAppOrderUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`product-order-wa-btn-${product.id}`}
                      className="w-full min-h-[44px] py-2.5 px-3 rounded-2xl bg-[#25D366] hover:bg-black hover:text-white text-white border-2 border-black text-xs font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
                    >
                      <span>Order WA</span>
                      <ArrowUpRight size={14} className="stroke-[3]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
