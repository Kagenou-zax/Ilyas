import React, { useState, useRef, useId } from 'react';
import { ALL_PRODUCTS } from '../data/products';
import { Product, GadgetCategory } from '../types';
import {
  ArrowUpRight,
  Check,
  Eye,
  Sparkles,
  MapPin,
  Search,
  X,
  MessageCircle,
  SlidersHorizontal,
  BatteryCharging,
  Smartphone,
  RotateCcw,
} from 'lucide-react';

interface ProductsCatalogProps {
  onSelectProduct: (product: Product) => void;
}

/**
 * Accessible Highlight Component for highlighting matching search tokens
 */
export const HighlightMatch: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  if (!query.trim()) return <>{text}</>;
  const words = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 0);
  if (words.length === 0) return <>{text}</>;
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = words.some((w) => w.toLowerCase() === part.toLowerCase());
        return isMatch ? (
          <mark
            key={i}
            className="bg-amber-200 text-amber-950 font-bold px-0.5 rounded-xs"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        );
      })}
    </>
  );
};

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedHub, setSelectedHub] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSpecFilter, setSelectedSpecFilter] = useState<'all' | 'physical-sim' | 'battery' | 'direct-uk' | 'brand-new'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'condition'>('featured');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchInstructionsId = useId();

  // Curated instant search prompts matching verified stock
  const SUGGESTED_SEARCHES = [
    { label: 'iPhone 16 Series', query: 'iPhone 16', icon: '📱' },
    { label: 'Physical SIM Tray', query: 'Physical SIM', icon: '📶' },
    { label: '100% Battery Health', query: '100% Battery', icon: '🔋' },
    { label: 'PS5 Slim (2-Pads)', query: 'PS5 Slim', icon: '🎮' },
    { label: 'Dell XPS & Laptops', query: 'Laptop', icon: '💻' },
    { label: 'Samsung Galaxy S21', query: 'Samsung S21', icon: '✨' },
    { label: 'iPad 10th Gen', query: 'iPad', icon: '🎨' },
    { label: 'Apple Watch SE', query: 'Apple Watch', icon: '⌚' },
  ];

  // Dynamic stock spec counts based on actual inventory
  const physicalSimCount = ALL_PRODUCTS.filter(
    (p) =>
      p.specsSummary.toLowerCase().includes('physical sim') ||
      p.features.some((f) => f.toLowerCase().includes('physical sim'))
  ).length;

  const highBatteryCount = ALL_PRODUCTS.filter(
    (p) =>
      p.specsSummary.toLowerCase().includes('100%') ||
      p.specsSummary.toLowerCase().includes('battery') ||
      p.features.some((f) => f.toLowerCase().includes('battery')) ||
      p.tag?.toLowerCase().includes('battery')
  ).length;

  const directUkCount = ALL_PRODUCTS.filter((p) => p.condition === 'Direct UK').length;
  const brandNewCount = ALL_PRODUCTS.filter((p) => p.condition === 'Brand New').length;

  const categories = [
    { id: 'all', label: 'All Gadgets' },
    { id: 'iphones', label: 'iPhones (Direct UK)' },
    { id: 'samsung', label: 'Samsung Galaxy' },
    { id: 'laptops', label: 'Laptops' },
    { id: 'gaming', label: 'Gaming (PS5)' },
    { id: 'gadgets', label: 'iPads & Watches' },
  ];

  // Multi-term filtering matching real products inventory
  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    // Category match
    const matchCategory = activeCategory === 'all' || product.category === activeCategory;

    // Hub match
    const matchHub =
      selectedHub === 'all' ||
      (selectedHub === 'abeokuta' && product.hubAvailability.includes('Abeokuta (FUNAAB)')) ||
      (selectedHub === 'lagos' && product.hubAvailability.includes('Lagos (Computer Village)'));

    // Spec quick filter match
    let matchSpec = true;
    if (selectedSpecFilter === 'physical-sim') {
      matchSpec =
        product.specsSummary.toLowerCase().includes('physical sim') ||
        product.features.some((f) => f.toLowerCase().includes('physical sim'));
    } else if (selectedSpecFilter === 'battery') {
      matchSpec =
        product.specsSummary.toLowerCase().includes('100%') ||
        product.specsSummary.toLowerCase().includes('battery') ||
        product.features.some((f) => f.toLowerCase().includes('battery')) ||
        Boolean(product.tag?.toLowerCase().includes('battery'));
    } else if (selectedSpecFilter === 'direct-uk') {
      matchSpec = product.condition === 'Direct UK';
    } else if (selectedSpecFilter === 'brand-new') {
      matchSpec = product.condition === 'Brand New';
    }

    // Search query matching multi-word tokens
    let matchSearch = true;
    if (searchQuery.trim()) {
      const searchTerms = searchQuery
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter((t) => t.length > 0);

      const searchableBlob = [
        product.name,
        product.shortDesc,
        product.fullDesc,
        product.specsSummary,
        product.categoryLabel,
        product.tag || '',
        product.condition,
        ...product.features,
        ...product.hubAvailability,
      ]
        .join(' ')
        .toLowerCase();

      matchSearch = searchTerms.every((term) => searchableBlob.includes(term));
    }

    return matchCategory && matchHub && matchSpec && matchSearch;
  }).sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'condition') return a.condition.localeCompare(b.condition);
    return 0; // featured default
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && searchQuery) {
      setSearchQuery('');
    }
  };

  const handleSelectSuggestion = (product: Product) => {
    setSearchQuery(product.name);
    const cardEl = document.getElementById(`product-card-${product.id}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      cardEl.classList.add('ring-4', 'ring-[#2563eb]');
      setTimeout(() => {
        cardEl.classList.remove('ring-4', 'ring-[#2563eb]');
      }, 2000);
    }
  };

  const handleQuickChipClick = (query: string) => {
    setSearchQuery(query);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSelectedHub('all');
    setSelectedSpecFilter('all');
  };

  const getWhatsAppNegotiateUrl = (product: Product) => {
    const text = encodeURIComponent(
      `Hello Swavy Gadget, I am interested in: "${product.name}" (${product.specsSummary}). I would like to discuss and negotiate the best price for pickup/dispatch.`
    );
    return `https://wa.me/2349063192326?text=${text}`;
  };

  // Screen reader accessible announcement string
  const accessibleAnnouncement = searchQuery.trim()
    ? `${filteredProducts.length} devices available matching "${searchQuery}"`
    : `${filteredProducts.length} devices displayed in catalog`;

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    activeCategory !== 'all' ||
    selectedHub !== 'all' ||
    selectedSpecFilter !== 'all';

  return (
    <section
      id="catalogue"
      aria-label="Verified Gadget Catalogue"
      className="w-full bg-[#f5f7fc] py-12 sm:py-20 border-t-2 border-black/15 relative"
    >
      {/* Screen Reader Live Region for Search Results */}
      <div
        id="catalog-search-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {accessibleAnnouncement}
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6 sm:mb-8" data-reveal>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-[0.22em] mb-2.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#2563eb] rotate-45 inline-block" />
              <span>Verified Tech Inventory</span>
              <span className="text-[#2563eb] font-black">/</span>
              <span>Direct UK & Brand New</span>
            </div>

            <h2 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0f172a] uppercase leading-[0.88] tracking-tight">
              THE SWAVY CATALOGUE.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium mt-2">
              All prices are discussed and negotiated directly with the business owner on WhatsApp for the best competitive deal. Tested stock with local warranty.
            </p>
          </div>

          {/* Interactive Search Bar & Hub Filter (Clean, Non-overlapping, No-zoom) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input Box */}
            <div
              role="search"
              aria-label="Gadget catalogue search"
              className="relative flex-1 sm:w-80 md:w-96"
            >
              <label htmlFor="catalog-search-input" className="sr-only">
                Search available gadgets by brand, model, battery health, or specs
              </label>

              <div className="relative flex items-center">
                <Search
                  size={18}
                  className="absolute left-3.5 text-neutral-400 pointer-events-none"
                  aria-hidden="true"
                />

                <input
                  ref={searchInputRef}
                  id="catalog-search-input"
                  type="text"
                  inputMode="search"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  enterKeyHint="search"
                  placeholder="Search iPhone, PS5, RAM, 100% battery..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-white border-2 border-black rounded-2xl pl-10 pr-10 py-2.5 sm:py-3 text-base text-[#0f172a] placeholder-neutral-400 focus:outline-none focus:border-[#2563eb] focus-visible:ring-2 focus-visible:ring-[#2563eb] shadow-xs no-underline"
                />

                <div id={searchInstructionsId} className="sr-only">
                  Type to search. Results filter in real time in the catalogue below. Press Escape to clear.
                </div>

                {/* Clean Clear Button (Only when text is present, zero glitch dashes or clutter) */}
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                    }}
                    aria-label="Clear search query"
                    className="absolute right-3 w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black flex items-center justify-center cursor-pointer transition-colors active:scale-95 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none"
                  >
                    <X size={15} />
                  </button>
                ) : null}
              </div>
            </div>

            {/* Hub Fast Toggle */}
            <div
              role="group"
              aria-label="Filter by store hub location"
              className="flex items-center gap-1 bg-white border-2 border-black rounded-2xl p-1 shadow-xs shrink-0"
            >
              <button
                type="button"
                id="hub-filter-all"
                aria-pressed={selectedHub === 'all'}
                onClick={() => setSelectedHub('all')}
                className={`text-[11px] font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none ${
                  selectedHub === 'all'
                    ? 'bg-black text-white'
                    : 'hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                All Hubs
              </button>
              <button
                type="button"
                id="hub-filter-abeokuta"
                aria-pressed={selectedHub === 'abeokuta'}
                onClick={() => setSelectedHub('abeokuta')}
                className={`text-[11px] font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none ${
                  selectedHub === 'abeokuta'
                    ? 'bg-[#2563eb] text-white'
                    : 'hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                Abeokuta (FUNAAB)
              </button>
              <button
                type="button"
                id="hub-filter-lagos"
                aria-pressed={selectedHub === 'lagos'}
                onClick={() => setSelectedHub('lagos')}
                className={`text-[11px] font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none ${
                  selectedHub === 'lagos'
                    ? 'bg-[#2563eb] text-white'
                    : 'hover:bg-neutral-100 text-neutral-700'
                }`}
              >
                Computer Village
              </button>
            </div>
          </div>
        </div>

        {/* Quick In-Stock Trending Tags (Non-overlapping, native layout flow) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none touch-pan-x mb-5" data-reveal>
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 bg-white border border-black/15 px-2.5 py-1.5 rounded-xl">
            <Sparkles size={12} className="text-[#2563eb]" />
            <span>Popular:</span>
          </span>
          {SUGGESTED_SEARCHES.map((chip) => {
            const isSelected = searchQuery.toLowerCase().trim() === chip.query.toLowerCase().trim();
            return (
              <button
                key={chip.query}
                type="button"
                onClick={() => handleQuickChipClick(isSelected ? '' : chip.query)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer shrink-0 min-h-[38px] flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none active:scale-95 ${
                  isSelected
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-white hover:bg-neutral-100 text-slate-700 border-black/20 hover:border-black'
                }`}
              >
                <span>{chip.icon}</span>
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick In-Stock Specification Pills */}
        <div
          role="region"
          aria-label="Quick stock specification filters"
          className="bg-white border-2 border-black rounded-2xl p-3 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-3"
          data-reveal
        >
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
            <SlidersHorizontal size={14} className="text-[#2563eb]" />
            <span>Hardware Specs:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              aria-pressed={selectedSpecFilter === 'all'}
              onClick={() => setSelectedSpecFilter('all')}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none active:scale-95 ${
                selectedSpecFilter === 'all'
                  ? 'bg-black text-white border-black shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-black'
              }`}
            >
              <span>All Stock</span>
              <span className="font-mono text-[10px] opacity-80">({ALL_PRODUCTS.length})</span>
            </button>

            <button
              type="button"
              aria-pressed={selectedSpecFilter === 'physical-sim'}
              onClick={() =>
                setSelectedSpecFilter((prev) =>
                  prev === 'physical-sim' ? 'all' : 'physical-sim'
                )
              }
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none active:scale-95 ${
                selectedSpecFilter === 'physical-sim'
                  ? 'bg-[#2563eb] text-white border-[#2563eb] shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-[#2563eb]'
              }`}
            >
              <Smartphone size={13} />
              <span>Physical SIM Tray</span>
              <span className="font-mono text-[10px] opacity-80">({physicalSimCount})</span>
            </button>

            <button
              type="button"
              aria-pressed={selectedSpecFilter === 'battery'}
              onClick={() =>
                setSelectedSpecFilter((prev) => (prev === 'battery' ? 'all' : 'battery'))
              }
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none active:scale-95 ${
                selectedSpecFilter === 'battery'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-600'
              }`}
            >
              <BatteryCharging size={13} />
              <span>100% Battery Health</span>
              <span className="font-mono text-[10px] opacity-80">({highBatteryCount})</span>
            </button>

            <button
              type="button"
              aria-pressed={selectedSpecFilter === 'direct-uk'}
              onClick={() =>
                setSelectedSpecFilter((prev) => (prev === 'direct-uk' ? 'all' : 'direct-uk'))
              }
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none active:scale-95 ${
                selectedSpecFilter === 'direct-uk'
                  ? 'bg-black text-white border-black shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-black'
              }`}
            >
              <span>Direct UK 🇬🇧</span>
              <span className="font-mono text-[10px] opacity-80">({directUkCount})</span>
            </button>

            <button
              type="button"
              aria-pressed={selectedSpecFilter === 'brand-new'}
              onClick={() =>
                setSelectedSpecFilter((prev) => (prev === 'brand-new' ? 'all' : 'brand-new'))
              }
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer min-h-[38px] flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none active:scale-95 ${
                selectedSpecFilter === 'brand-new'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-purple-600'
              }`}
            >
              <Sparkles size={13} />
              <span>Brand New Sealed</span>
              <span className="font-mono text-[10px] opacity-80">({brandNewCount})</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6" data-reveal>
          <div
            role="tablist"
            aria-label="Filter products by gadget category"
            className="flex items-center gap-2 pb-2 sm:pb-0 overflow-x-auto scrollbar-none touch-pan-x"
          >
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
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="catalog-products-grid"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-2xl border-2 font-bold text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 shrink-0 min-h-[44px] focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none active:scale-95 ${
                    isActive
                      ? 'bg-black text-white border-black shadow-md scale-102'
                      : 'bg-white text-[#0f172a] border-black hover:bg-[#2563eb] hover:text-white shadow-2xs'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-black' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sort Selector (text-base on mobile to prevent iOS auto-zoom) */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <label
              htmlFor="catalog-sort-select"
              className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider hidden sm:inline"
            >
              Sort:
            </label>
            <select
              id="catalog-sort-select"
              aria-label="Sort product catalogue"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border-2 border-black rounded-xl px-3 py-2 text-base sm:text-xs font-mono font-bold text-[#0f172a] focus:outline-none focus:border-[#2563eb] focus-visible:ring-2 focus-visible:ring-[#2563eb] cursor-pointer shadow-xs"
            >
              <option value="featured">Featured / Hot Restock</option>
              <option value="name">Model Name (A - Z)</option>
              <option value="condition">Condition (Direct UK / Brand New)</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {hasActiveFilters && (
          <div
            aria-label="Active filters"
            className="flex flex-wrap items-center gap-2 mb-6 p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs"
          >
            <span className="font-mono font-bold text-blue-900 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
              <span>Active Filters:</span>
            </span>

            {searchQuery.trim() && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-blue-300 text-blue-900 px-2.5 py-1 rounded-lg font-medium">
                <span>Keyword: "{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Remove search keyword filter"
                  className="hover:text-red-600 cursor-pointer p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-blue-300 text-blue-900 px-2.5 py-1 rounded-lg font-medium">
                <span>Category: {categories.find((c) => c.id === activeCategory)?.label}</span>
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  aria-label="Remove category filter"
                  className="hover:text-red-600 cursor-pointer p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {selectedHub !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-blue-300 text-blue-900 px-2.5 py-1 rounded-lg font-medium">
                <span>Hub: {selectedHub === 'abeokuta' ? 'Abeokuta' : 'Lagos'}</span>
                <button
                  type="button"
                  onClick={() => setSelectedHub('all')}
                  aria-label="Remove hub filter"
                  className="hover:text-red-600 cursor-pointer p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            {selectedSpecFilter !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-white border border-blue-300 text-blue-900 px-2.5 py-1 rounded-lg font-medium">
                <span>
                  Spec:{' '}
                  {selectedSpecFilter === 'physical-sim'
                    ? 'Physical SIM'
                    : selectedSpecFilter === 'battery'
                    ? '100% Battery'
                    : selectedSpecFilter === 'direct-uk'
                    ? 'Direct UK'
                    : 'Brand New'}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedSpecFilter('all')}
                  aria-label="Remove spec filter"
                  className="hover:text-red-600 cursor-pointer p-0.5"
                >
                  <X size={12} />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-[#2563eb] hover:text-black font-bold underline ml-auto text-xs cursor-pointer flex items-center gap-1"
            >
              <RotateCcw size={12} />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Empty Search Feedback Respective of Real Stock */}
        {filteredProducts.length === 0 && (
          <div className="py-12 sm:py-16 text-center bg-white border-2 border-black rounded-3xl p-6 sm:p-10 max-w-xl mx-auto shadow-md">
            <div className="w-14 h-14 rounded-full bg-blue-50 border-2 border-[#2563eb] flex items-center justify-center mx-auto mb-4 text-[#2563eb]">
              <Search size={26} />
            </div>
            <h3 className="font-display-title text-xl sm:text-2xl font-bold uppercase mb-2 text-[#0f172a]">
              No Devices Matching Your Search
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
              We couldn't find an exact match for{' '}
              <strong className="text-black">"{searchQuery || 'selected criteria'}"</strong>.
              However, we have these popular verified devices currently in stock:
            </p>

            {/* In-Stock Alternative Suggestions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left mb-6">
              {ALL_PRODUCTS.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectSuggestion(p)}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-black bg-neutral-50 hover:bg-white flex items-center gap-2.5 transition-colors cursor-pointer text-left"
                >
                  <img
                    src={p.image}
                    alt=""
                    aria-hidden="true"
                    className="w-10 h-10 rounded-lg object-cover bg-neutral-900 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#0f172a] truncate">{p.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 truncate">{p.condition}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                id="reset-catalog-filters-btn"
                onClick={handleResetFilters}
                className="w-full sm:w-auto bg-black hover:bg-[#2563eb] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none"
              >
                <RotateCcw size={14} />
                <span>View All 16 Stock Items</span>
              </button>

              <a
                href={`https://wa.me/2349063192326?text=${encodeURIComponent(
                  `Hello Swavy Gadget, I searched for "${searchQuery}" on your catalogue. Do you currently have this or can you source it for me?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-black text-black hover:text-white px-5 py-3 rounded-full font-black text-xs uppercase tracking-wider border-2 border-black transition-colors cursor-pointer flex items-center justify-center gap-1.5 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
              >
                <MessageCircle size={15} />
                <span>Ask Swavy on WhatsApp</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 && (
          <div
            id="catalog-products-grid"
            role="region"
            aria-label="Available products list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
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
                      e.currentTarget.src =
                        '/src/assets/images/swavy_store_phones_1791062288821.jpg';
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
                    <div className="flex items-center gap-1 text-[9px] font-mono text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                      <span>{product.condition.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                {/* Product Details Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between grow">
                  <div>
                    {/* WhatsApp Negotiation Callout */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-xl">
                        <MessageCircle size={14} className="text-[#25D366] fill-[#25D366]" />
                        <span>Negotiate on WhatsApp</span>
                      </div>
                      <span className="font-mono text-[10px] font-bold uppercase text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        {product.condition}
                      </span>
                    </div>

                    <h3 className="font-bold text-base sm:text-lg text-[#0f172a] leading-snug mb-1 font-sans group-hover:text-[#2563eb] transition-colors">
                      <HighlightMatch text={product.name} query={searchQuery} />
                    </h3>

                    <div className="text-[11px] font-mono font-bold text-slate-500 mb-2">
                      <HighlightMatch text={product.specsSummary} query={searchQuery} />
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                      {product.shortDesc}
                    </p>

                    {/* Feature Checklist */}
                    <ul className="space-y-1.5 mb-5" aria-label="Key features">
                      {product.features.slice(0, 3).map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-[11px] font-medium text-neutral-700"
                        >
                          <div className="w-3.5 h-3.5 rounded-full bg-[#2563eb]/10 text-[#2563eb] flex items-center justify-center shrink-0">
                            <Check size={10} className="stroke-[3]" />
                          </div>
                          <span className="line-clamp-1">
                            <HighlightMatch text={feat} query={searchQuery} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Availability & Action Buttons */}
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
                        href={getWhatsAppNegotiateUrl(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`product-order-wa-btn-${product.id}`}
                        className="w-full min-h-[44px] py-2.5 px-2.5 rounded-2xl bg-[#25D366] hover:bg-black text-black hover:text-white border-2 border-black text-xs font-black uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1 active:scale-95 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
                        title="Negotiate and discuss price directly with owner on WhatsApp"
                      >
                        <MessageCircle size={14} className="stroke-[2.5]" />
                        <span>Negotiate</span>
                        <ArrowUpRight size={13} className="stroke-[2.5]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
