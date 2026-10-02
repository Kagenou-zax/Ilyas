import React from 'react';
import { AnalogClock } from './AnalogClock';
import { ArrowUpRight, Sparkles, Monitor, Keyboard, MousePointer, ShieldCheck, ChevronRight } from 'lucide-react';

interface HeroProps {
  onExploreClick?: () => void;
  onSelectProduct?: (title: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onSelectProduct }) => {
  return (
    <section
      id="hero"
      className="w-full min-h-screen bg-[#f5f7fc] grain-overlay relative overflow-hidden flex flex-col justify-between"
    >
      {/* Signature SVG Checkered Grid matching reference */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-95">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroCheckeredGrid" width="80" height="80" patternUnits="userSpaceOnUse">
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
          <rect width="100%" height="100%" fill="url(#heroCheckeredGrid)" />
        </svg>
      </div>

      {/* Hero Content Container */}
      <main className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 py-4 sm:py-8 grow flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column (7 cols): Giant Headlines & Left Featured Chamfer Card */}
          <div className="lg:col-span-7 flex flex-col justify-between animate-hero-entrance">
            <div>
              {/* Category Subtitle Pill */}
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.16em] sm:tracking-[0.22em] mb-2 sm:mb-4 flex-wrap">
                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center -rotate-6 shadow-2xs">
                  <Monitor size={12} className="stroke-[2.5]" />
                </div>
                <span>Minimalist Desktops</span>
                <span className="text-[#2563eb]">•</span>
                <span>Tech Accessories</span>
                <span className="text-[#2563eb]">•</span>
                <span>Ergonomic Setup</span>
                <span className="text-[#2563eb]">•</span>
                <span className="inline-flex items-center gap-1 text-[#2563eb] font-mono font-bold bg-[#2563eb]/10 px-2 py-0.5 rounded-md border border-[#2563eb]/20 text-[10px] sm:text-[11px] tracking-normal">
                  <Sparkles size={11} />
                  <span>Original Studio Gear</span>
                </span>
              </div>

              {/* Giant 3-Line Bebas Display Typography */}
              <div className="relative z-20">
                <h1 className="font-condensed text-5xl sm:text-7xl md:text-8xl lg:text-[98px] text-[#0f172a] uppercase leading-[0.88] sm:leading-[0.86] tracking-tight">
                  CURATING.
                  <br />
                  CRAFTING.
                  <br />
                  ELEVATING.
                </h1>

                {/* Decorative Sparkle SVG Badge */}
                <div className="absolute -top-3 sm:-top-5 right-2 sm:right-16 pointer-events-none drop-shadow-md z-30">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#7c3aed] text-white border-2 border-black flex items-center justify-center -rotate-12 shadow-sm animate-pulse">
                    <Sparkles size={22} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Left Featured Chamfer Card (Desk Setup Spotlight) */}
            <div className="relative mt-5 sm:mt-8 z-10 animate-hero-card">
              <a
                href="#showcase"
                className="block relative border-2 border-black bg-white chamfer-card-tr overflow-hidden shadow-md hover-glow cursor-pointer group"
              >
                <div className="relative aspect-16/10 sm:aspect-video max-h-[260px] sm:max-h-[320px] w-full overflow-hidden bg-neutral-900">
                  <img
                    src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=80"
                    alt="Swavy Gadget Minimalist Walnut Desktop Workspace"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                  {/* Card Bottom Content */}
                  <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-5 right-12 sm:right-16 text-white z-10 flex flex-col gap-0.5 sm:gap-1">
                    <div className="flex items-center gap-1.5 text-[9.5px] sm:text-xs font-bold tracking-wide uppercase text-[#38bdf8]">
                      <Monitor size={14} className="stroke-[2.5]" />
                      <span>Studio Workspace & Walnut Riser Systems</span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-white/90 font-medium leading-snug line-clamp-2">
                      Precision-curated walnut desk shelves, monitor arms, and integrated desk pads built for deep focus.
                    </p>
                  </div>
                </div>

                {/* Vertical Blue "SETUPS" Spine Ribbon matching flyer */}
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-[#2563eb] text-white border-2 border-black rounded-xl sm:rounded-2xl py-2.5 px-1.5 sm:py-3.5 sm:px-2 shadow-md flex flex-col items-center gap-1 z-20">
                  <Monitor size={13} className="text-white stroke-[2.5]" />
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tighter text-white [writing-mode:vertical-lr] text-center leading-tight">
                    SETUPS
                  </span>
                </div>

                {/* Floating Top-Left Sticker */}
                <div className="absolute -top-3.5 -left-2 sm:-top-4 sm:-left-3 z-30 pointer-events-none drop-shadow-md">
                  <div className="bg-white/95 border-2 border-black py-1 px-2.5 rounded-xl shadow-md rotate-[-4deg] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                    <span className="text-[9px] font-black uppercase tracking-wider text-black">
                      LAGOS & ABK
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols): Clock Widget, Chamfer Card Right, & "What Do We Do?" */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-6 relative">
            
            {/* Top row: Working Analog Clock & Sparkle Sticker */}
            <div className="relative flex items-center justify-between">
              <AnalogClock compact={true} />
              <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-white border-2 border-black items-center justify-center rotate-6 shadow-sm">
                <Sparkles size={20} className="text-[#2563eb]" />
              </div>
            </div>

            {/* Right Chamfer Card (Low Profile Mechanical Keyboard / Gear Spotlight) */}
            <div className="relative animate-hero-card">
              <a
                href="#catalogue"
                className="border-2 border-black bg-white chamfer-card-tl overflow-hidden shadow-md relative flex hover-glow cursor-pointer group"
              >
                <div className="relative w-full aspect-4/5 sm:aspect-3/4 max-h-[260px] sm:max-h-[310px] overflow-hidden bg-neutral-900">
                  <img
                    src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80"
                    alt="Custom Low-Profile Mechanical Keyboard"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />

                  {/* Label overlay */}
                  <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 right-3 text-white z-10 flex flex-col gap-0.5">
                    <div className="text-[9px] sm:text-[9.5px] font-bold uppercase tracking-widest text-[#38bdf8] flex items-center gap-1">
                      <Keyboard size={12} className="stroke-[2.5]" />
                      <span>Studio Peripheral</span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-tight text-white drop-shadow-sm">
                      Low-Profile Tri-Mode Mechanical Keyboards
                    </span>
                  </div>
                </div>

                {/* Right Blue Spine Ribbon */}
                <div className="w-6 sm:w-8 bg-[#2563eb] text-white border-l-2 border-black flex flex-col items-center justify-between py-3 shrink-0">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  </div>
                  <span className="text-[8px] sm:text-[8.5px] font-black uppercase tracking-widest text-white [writing-mode:vertical-lr] rotate-180">
                    GEAR
                  </span>
                  <ArrowUpRight size={12} className="text-white stroke-[3]" />
                </div>
              </a>

              {/* Floating Badge on Top Left */}
              <div className="absolute -top-3.5 -left-2 z-30 pointer-events-none drop-shadow-md">
                <div className="bg-[#2563eb] text-white border-2 border-black px-2 py-0.5 rounded-xl shadow-md rotate-[4deg] text-[9px] font-black uppercase tracking-wider">
                  HIGH GRADE
                </div>
              </div>
            </div>

            {/* "What Do We Do?" Quick Interactive Info Card */}
            <div className="bg-white border-2 border-black rounded-2xl p-4 sm:p-5 shadow-md relative z-20 hover-glow cursor-pointer animate-hero-card">
              <div className="flex items-center justify-between mb-2 border-b border-black/10 pb-2">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display-title font-bold text-xs uppercase tracking-wider text-[#0f172a]">
                    Swavy Gadget Hub
                  </h3>
                </div>
                <div className="bg-black text-white px-2.5 py-0.5 rounded-full text-[8.5px] font-bold tracking-widest uppercase">
                  WHAT WE OFFER
                </div>
              </div>

              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-medium mb-3">
                We supply aesthetic tech accessories, bespoke desk shelves, and ergonomic peripherals. Pick up physically at our Abeokuta & Lagos stores or order with swift nationwide dispatch.
              </p>

              <div className="flex items-center justify-between gap-2 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-[#2563eb] transition-colors"
                    title="Minimalist Desktops"
                  >
                    <Monitor size={13} />
                  </div>
                  <div
                    className="w-7 h-7 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-[#7c3aed] transition-colors"
                    title="Keyboards & Gear"
                  >
                    <Keyboard size={13} />
                  </div>
                  <div
                    className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563eb] to-[#7c3aed] text-white border border-black flex items-center justify-center shadow-xs cursor-pointer hover:scale-105 transition-transform"
                    title="100% Genuine Quality"
                  >
                    <ShieldCheck size={13} />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="#showcase"
                    className="bg-black hover:bg-[#2563eb] hover:text-white text-white text-[11px] font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <span>Explore</span>
                    <ChevronRight size={13} className="stroke-[3]" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <div className="h-4 sm:h-6 w-full" />
    </section>
  );
};
