import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SHOWCASE_ITEMS } from '../data/products';
import { ShowcaseItem } from '../types';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, Sparkles, Monitor, ArrowUpRight } from 'lucide-react';

interface ShowcaseCarouselProps {
  onOpenLightbox: (item: ShowcaseItem) => void;
}

export const ShowcaseCarousel: React.FC<ShowcaseCarouselProps> = ({ onOpenLightbox }) => {
  const items = SHOWCASE_ITEMS;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const total = items.length;

  // Touch gesture refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlay, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
    isSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    if (Math.abs(touchStartX.current - touchEndX.current) > 12) {
      isSwiping.current = true;
    }
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    // Briefly delay resetting swiping flag so click event isn't accidentally swallowed or triggered
    setTimeout(() => {
      isSwiping.current = false;
    }, 120);
  };

  const activeItem = items[activeIndex] || items[0];

  return (
    <section
      id="showcase"
      className="w-full bg-[#f5f7fc] py-10 sm:py-16 px-3 sm:px-6 md:px-8 border-t-2 border-black/15 relative overflow-hidden"
    >
      {/* Checkered Grid Pattern matching reference */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-95">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="workCheckeredGrid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(15,23,42,0.12)" strokeWidth="1.2" />
              <path d="M 40 0 L 40 80 M 0 40 L 80 40" fill="none" stroke="rgba(15,23,42,0.06)" strokeWidth="1" />
              <path
                d="M 40 8 L 48 0 M 40 16 L 56 0 M 40 24 L 64 0 M 40 32 L 72 0 M 40 40 L 80 0 M 48 40 L 80 8 M 56 40 L 80 16 M 64 40 L 80 24 M 72 40 L 80 32"
                stroke="rgba(15,23,42,0.08)"
                strokeWidth="1.5"
              />
              <path
                d="M 0 48 L 8 40 M 0 56 L 16 40 M 0 64 L 24 40 M 0 72 L 32 40 M 0 80 L 40 40 M 8 80 L 40 48 M 16 80 L 40 56 M 24 80 L 40 64 M 32 80 L 40 72"
                stroke="rgba(15,23,42,0.08)"
                strokeWidth="1.5"
              />
              <path d="M 37 40 L 43 40 M 40 37 L 40 43" stroke="rgba(15,23,42,0.22)" strokeWidth="1.5" />
              <path d="M 77 80 L 83 80 M 80 77 L 80 83" stroke="rgba(15,23,42,0.22)" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#workCheckeredGrid)" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Showcase Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 sm:mb-8 border-b border-black/15 pb-4" data-reveal>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-[0.25em] mb-2.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#2563eb] rotate-45 inline-block" />
              <span>Showcase Exhibit</span>
              <span className="text-[#2563eb] font-black">/</span>
              <span>Minimalist Setups & Gear</span>
            </div>

            <h2 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0f172a] uppercase leading-[0.88] tracking-tight">
              <span className="inline-flex items-center gap-3 sm:gap-4 flex-wrap">
                <span>DESKTOPS & GEAR SHOWCASE.</span>
                <span className="bg-white border-2 border-black p-1.5 rounded-2xl shadow-sm -rotate-6 inline-flex items-center justify-center">
                  <Monitor size={28} className="text-black" />
                </span>
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white border-2 border-black p-1.5 rounded-full shadow-xs flex items-center justify-center">
              <Sparkles size={18} className="text-[#2563eb]" />
            </div>
            <span className="font-mono text-sm sm:text-base font-black text-[#0f172a] bg-white border-2 border-black px-4 py-1.5 rounded-full shadow-xs">
              {activeItem.serial} / {total.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* 3D Perspective Card Fan Stack (Exact Formula from Reference) */}
        <div
          className="relative w-full h-[470px] sm:h-[530px] md:h-[580px] flex items-center justify-center select-none overflow-hidden my-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {items.map((item, idx) => {
            let offset = idx - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            // Only render adjacent cards for optimal performance
            if (Math.abs(offset) > 3) return null;

            const rot = offset * 12;
            const tx = offset * (isMobile ? 140 : 250);
            const ty = Math.abs(offset) * (isMobile ? 22 : 36);
            const scale = isCenter ? 1 : Math.max(0.72, 1 - Math.abs(offset) * 0.1);
            const zIndex = isCenter ? 30 : 20 - Math.abs(offset) * 5;
            const opacity = isCenter ? 1 : Math.max(0.4, 0.85 - Math.abs(offset) * 0.18);

            return (
              <div
                key={item.id}
                id={`showcase-card-${item.serial}`}
                role="button"
                tabIndex={0}
                aria-label={`Showcase item: ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (isCenter) onOpenLightbox(item);
                    else setActiveIndex(idx);
                  }
                }}
                onClick={() => {
                  if (isSwiping.current) return;
                  if (isCenter) {
                    onOpenLightbox(item);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  transform: `translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease',
                }}
                className={`absolute w-[72vw] max-w-[275px] sm:max-w-none sm:w-76 md:w-84 aspect-3/4 rounded-3xl sm:rounded-[36px] border-2 border-black overflow-hidden shadow-xl cursor-pointer group bg-black transition-all duration-300 hover:border-[#2563eb] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2563eb] ${
                  isCenter ? 'shadow-2xl' : 'hover:opacity-90'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    filter: isCenter ? 'brightness(100%) contrast(100%)' : 'brightness(55%) contrast(85%)',
                    transition: 'filter 0.5s ease',
                  }}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Top Badge: Serial & Price */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span
                    className={`font-mono text-xs font-black px-2.5 py-1 rounded-full border transition-all ${
                      isCenter ? 'text-white bg-black/80 border-white/20' : 'text-white/60 bg-black/60 border-white/10'
                    }`}
                  >
                    NO. {item.serial}
                  </span>
                  {item.priceTag && (
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-full bg-[#2563eb] text-white border border-black shadow-xs">
                      {item.priceTag}
                    </span>
                  )}
                </div>

                {/* Center Card Zoom Icon */}
                {isCenter && (
                  <button
                    type="button"
                    id={`showcase-zoom-btn-${item.serial}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenLightbox(item);
                    }}
                    className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black/80 hover:bg-[#2563eb] hover:text-white text-white flex items-center justify-center transition-colors shadow-md cursor-pointer border border-white/20 z-10 active:scale-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                    title="View Full Item Details"
                    aria-label="Expand Showcase Item"
                  >
                    <Maximize2 size={18} />
                  </button>
                )}

                {/* Bottom Card Information */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest font-display-title text-[#38bdf8]">
                      {item.category}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-white/70">
                      {item.serial} / {total}
                    </span>
                  </div>

                  <h4 className="text-white font-bold text-sm sm:text-base leading-snug line-clamp-2 drop-shadow-xs">
                    {item.title}
                  </h4>

                  {isCenter && (
                    <div className="pt-1 border-t border-white/15 flex items-center justify-between">
                      <span className="text-[10.5px] text-white/80 line-clamp-1 font-normal">
                        {item.subtitle}
                      </span>
                      <span className="text-[10px] font-bold text-[#38bdf8] flex items-center gap-0.5 uppercase tracking-wider shrink-0">
                        View <ArrowUpRight size={12} />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Controls Bar matching reference */}
        <div className="mt-2 flex flex-col gap-3 max-w-lg mx-auto w-full">
          {/* Dot indicators */}
          <div className="flex items-center gap-1 justify-center flex-wrap">
            {items.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  id={`carousel-dot-${idx}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${item.serial}`}
                  className="group relative flex flex-col items-center cursor-pointer p-2 focus-visible:ring-2 focus-visible:ring-[#2563eb] rounded-full focus-visible:outline-none"
                >
                  <div
                    className={`transition-all duration-300 rounded-full ${
                      isActive
                        ? 'w-7 h-2.5 bg-black'
                        : 'w-2 h-2 bg-black/25 group-hover:bg-black/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Navigation Controls Button Bar */}
          <div className="bg-white border-2 border-black rounded-2xl px-4 sm:px-5 py-3 sm:py-4 shadow-md flex items-center justify-between gap-4 hover-glow-subtle">
            {/* Auto play toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                id="carousel-autoplay-btn"
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                aria-label={isAutoPlay ? 'Pause auto-rotation' : 'Resume auto-rotation'}
                className={`w-11 h-11 rounded-full border-2 border-black flex items-center justify-center transition-all active:scale-90 cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none ${
                  isAutoPlay
                    ? 'bg-black text-white hover:bg-[#2563eb]'
                    : 'bg-white text-black hover:bg-[#2563eb] hover:text-white'
                }`}
              >
                {isAutoPlay ? <Pause size={17} /> : <Play size={17} />}
              </button>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-600 hidden xs:inline-block">
                {isAutoPlay ? 'Auto-Rotating' : 'Paused'}
              </span>
            </div>

            {/* Previous / Next buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                id="carousel-prev-btn"
                onClick={prevSlide}
                aria-label="Previous photograph"
                className="w-11 h-11 rounded-full bg-white hover:bg-[#2563eb] hover:text-white text-black border-2 border-black flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-sm focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none"
              >
                <ChevronLeft size={19} className="stroke-[2.5]" />
              </button>

              <button
                type="button"
                id="carousel-next-btn"
                onClick={nextSlide}
                aria-label="Next photograph"
                className="w-11 h-11 rounded-full bg-black hover:bg-[#2563eb] hover:text-white text-white border-2 border-black flex items-center justify-center transition-all cursor-pointer active:scale-90 shadow-sm focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none"
              >
                <ChevronRight size={19} className="stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
