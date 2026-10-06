import React from 'react';
import { ArrowUpRight, Sparkles, Monitor, Keyboard, Zap, MapPin, ShieldCheck, Layers, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full bg-[#f5f7fc] border-t-2 border-black/15 relative">
      {/* Decorative Sparkle SVG */}
      <div className="absolute top-10 right-8 pointer-events-none opacity-40 hidden sm:block">
        <div className="w-14 h-14 rounded-2xl bg-[#2563eb] text-white border-2 border-black flex items-center justify-center rotate-12">
          <Sparkles size={24} className="text-white" />
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto">
        {/* Top Story & Founder/Brand Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-black/15">
          <div
            className="lg:col-span-8 p-6 sm:p-10 md:p-14 lg:border-r border-black/15 flex flex-col justify-center"
            data-reveal
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-4 sm:mb-5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#2563eb] rotate-45 inline-block" />
                <span>About Swavy Gadget</span>
                <span className="text-[#2563eb] font-black">/</span>
                <span>Craft & Quality</span>
              </div>

              <h2 className="font-condensed text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#0f172a] uppercase leading-[0.88] sm:leading-[0.86] tracking-tight mb-5 sm:mb-6">
                <span className="inline-flex items-center gap-2 sm:gap-4 flex-wrap">
                  <span>CURATED SPACES.</span>
                  <span className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-[#2563eb] text-white border-2 border-black inline-flex items-center justify-center -rotate-6 shadow-sm">
                    <Monitor size={36} className="text-white" />
                  </span>
                </span>
                <br />
                TECH ACCESSORIES & FOCUS.
              </h2>

              <div className="space-y-3 sm:space-y-4 max-w-2xl text-sm sm:text-lg text-[#0f172a] font-medium leading-relaxed">
                <p>
                  <strong>Swavy Gadget</strong> is Nigeria’s dedicated brand for high-performance desk accessories, ergonomic workspace architecture, and minimalist tech setups.
                </p>
                <p className="text-slate-600 font-normal text-xs sm:text-base">
                  We believe that an intentional, clutter-free workspace directly unlocks deeper focus, higher output, and aesthetic pleasure for developers, designers, digital executives, and students.
                </p>
                <p className="text-slate-600 font-normal text-xs sm:text-base">
                  From our physical experience stores at <strong>Lalubu Street, Abeokuta (near FUNAAB)</strong> and <strong>Otigba Street in Computer Village, Ikeja Lagos</strong>, we bridge the gap between studio-grade international gear and authentic local availability.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Feature Card */}
          <div
            className="lg:col-span-4 p-6 sm:p-8 flex items-center justify-center bg-[#edf2f9]"
            data-reveal
            data-reveal-delay="150"
          >
            <div className="relative group w-full max-w-xs sm:max-w-sm">
              <div className="absolute -top-3.5 -left-2.5 sm:-top-4 sm:-left-3 z-20 pointer-events-none drop-shadow-md">
                <div className="bg-white border-2 border-black p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-sm -rotate-6 flex items-center gap-1">
                  <Award size={14} className="text-[#2563eb]" />
                  <span className="text-[9px] font-black uppercase text-black">VETTED QUALITY</span>
                </div>
              </div>

              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl border-2 border-black bg-neutral-900 shadow-md hover-glow cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
                  alt="Swavy Gadget Desktop Aesthetics"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-3.5 left-3.5 right-3.5 sm:bottom-4 sm:left-4 sm:right-4 text-white z-10">
                  <div className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-widest text-[#38bdf8] mb-0.5 sm:mb-1">
                    PHYSICAL STORES & DISPATCH
                  </div>
                  <span className="text-xs sm:text-base font-bold tracking-tight text-white block">
                    Swavy Gadgets Hub • Abeokuta & Lagos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid: 4 Core Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-black/15 bg-white">
          {/* Item 1 (7 cols): Minimalist Desktop Setup Systems */}
          <div
            className="md:col-span-7 p-6 sm:p-10 md:p-12 md:border-r border-b border-black/15 flex flex-col justify-between group hover:bg-[#f8fafc] transition-colors relative"
            data-reveal
          >
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-black/15 p-2.5 sm:p-3 flex items-center justify-center group-hover:bg-[#2563eb] group-hover:text-white transition-colors shadow-sm">
                  <Monitor size={26} className="text-current" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/10 px-2.5 sm:px-3 py-1 rounded-full">
                    ARCHITECTURE
                  </span>
                </div>
              </div>

              <h3 className="font-display-title font-bold text-xl sm:text-3xl text-[#0f172a] mb-2 sm:mb-3 group-hover:text-[#2563eb] transition-colors">
                Minimalist Desktop Systems
              </h3>
              <p className="text-xs sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
                Precision-milled walnut monitor risers, dual gas-spring articulated arms, acoustic felt desk pads, and non-glare ScreenBar Halo task lights designed for seamless desk ergonomics.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#0f172a]">
              <span>Ergonomic Posture</span>
              <span className="text-[#2563eb] font-black">/</span>
              <span>Zero Screen Glare</span>
            </div>
          </div>

          {/* Item 2 (5 cols): Visual Polaroid Accent */}
          <div
            className="md:col-span-5 p-6 sm:p-10 flex flex-col items-center justify-center bg-[#edf2f9] border-b border-black/15 relative overflow-hidden group"
            data-reveal
            data-reveal-delay="150"
          >
            <div className="relative w-44 sm:w-56 aspect-square rotate-3 transition-all duration-300 group-hover:scale-[1.03] group-hover:drop-shadow-[0_12px_30px_rgba(37,99,235,0.35)]">
              <div className="absolute -top-3.5 -left-3.5 sm:-top-4 sm:-left-4 z-20 pointer-events-none drop-shadow-md">
                <div className="bg-[#2563eb] text-white border-2 border-black p-1 sm:p-1.5 rounded-xl sm:rounded-2xl shadow-sm -rotate-12 flex items-center gap-1 px-2">
                  <ShieldCheck size={14} className="text-white" />
                  <span className="text-[8px] font-black uppercase text-white">TESTED</span>
                </div>
              </div>

              <div className="w-full h-full bg-white border-2 border-black rounded-2xl p-2.5 pb-7 shadow-lg flex flex-col">
                <div className="w-full grow bg-neutral-900 rounded-xl overflow-hidden mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=600&q=80"
                    alt="Desk mat and minimalist setup"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="font-display-title text-[9px] font-black tracking-widest text-[#0f172a] uppercase">
                    SWAVY DESK MAT
                  </span>
                  <span className="font-mono text-[8px] font-bold text-[#2563eb]">
                    900 x 400MM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Item 3 (4 cols): Studio Peripherals */}
          <div
            className="md:col-span-4 p-5 sm:p-8 md:p-10 md:border-r border-b md:border-b-0 border-black/15 flex flex-col justify-between group hover:bg-[#f8fafc] transition-colors"
            data-reveal
          >
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-black/15 p-2 sm:p-2.5 flex items-center justify-center group-hover:bg-[#2563eb] group-hover:text-white transition-colors shadow-2xs">
                  <Keyboard size={20} className="text-current" />
                </div>
                <span className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/10 px-2.5 py-0.5 rounded-full">
                  PERIPHERALS
                </span>
              </div>

              <h3 className="font-display-title font-bold text-lg sm:text-xl text-[#0f172a] mb-1.5 sm:mb-2 group-hover:text-[#2563eb] transition-colors">
                Keyboards & Ergonomic Mice
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Low-profile mechanical switches, custom keycaps, and 57-degree vertical ergonomic mice crafted to eliminate wrist fatigue during 12-hour work sessions.
              </p>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 border-t border-black/10 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Tri-Mode • Mac & Windows
            </div>
          </div>

          {/* Item 4 (4 cols): GaN Power & MagSafe Docks */}
          <div
            className="md:col-span-4 p-5 sm:p-8 md:p-10 md:border-r border-b md:border-b-0 border-black/15 flex flex-col justify-between group hover:bg-[#f8fafc] transition-colors"
            data-reveal
            data-reveal-delay="100"
          >
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-black/15 p-2 sm:p-2.5 flex items-center justify-center group-hover:bg-[#2563eb] group-hover:text-white transition-colors shadow-2xs">
                  <Zap size={20} className="text-current" />
                </div>
                <span className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/10 px-2.5 py-0.5 rounded-full">
                  CHARGING & DOCKS
                </span>
              </div>

              <h3 className="font-display-title font-bold text-lg sm:text-xl text-[#0f172a] mb-1.5 sm:mb-2 group-hover:text-[#2563eb] transition-colors">
                GaN Fast Power & Magnetic Docks
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                140W PD3.1 Gallium Nitride chargers and weighted aluminum 3-in-1 MagSafe stations to power laptops, tablets, and phones simultaneously with zero wire clutter.
              </p>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 border-t border-black/10 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">
              140W GaN • Overheat Protection
            </div>
          </div>

          {/* Item 5 (4 cols): Dual Hubs (Abeokuta & Lagos) */}
          <div
            className="md:col-span-4 p-5 sm:p-8 md:p-10 flex flex-col justify-between group hover:bg-[#f8fafc] transition-colors"
            data-reveal
            data-reveal-delay="200"
          >
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border-2 border-black/15 p-2 sm:p-2.5 flex items-center justify-center group-hover:bg-[#2563eb] group-hover:text-white transition-colors shadow-2xs">
                  <MapPin size={20} className="text-current" />
                </div>
                <span className="text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/10 px-2.5 py-0.5 rounded-full">
                  DUAL HUBS
                </span>
              </div>

              <h3 className="font-display-title font-bold text-lg sm:text-xl text-[#0f172a] mb-1.5 sm:mb-2 group-hover:text-[#2563eb] transition-colors">
                Abeokuta & Lagos Showrooms
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                Test products physically in Abeokuta (Lalubu St, near FUNAAB) or Ikeja Computer Village (Otigba St). Experience tactile key switches and desk setups in person.
              </p>
            </div>

            <div className="mt-4 sm:mt-6 pt-3 border-t border-black/10 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Walk-in Testing • Fast Dispatch
            </div>
          </div>
        </div>

        {/* CTA Banner Card matching reference */}
        <div className="p-4 sm:p-10 md:p-14" data-reveal>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-black shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover-glow">
            <div>
              <h3 className="font-condensed text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#0f172a] leading-none mb-2">
                TECH GADGETS & VISUAL STORYTELLING.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium">
                Whether you need a pristine Direct UK iPhone, high-performance laptop, PS5 console, or an editorial photography shoot with Swavy_shots, we deliver genuine excellence across Abeokuta & Lagos.
              </p>
            </div>

            <a
              href="https://wa.me/2349063192326?text=Hello%20Swavy%20Gadget%2C%20I%20want%20to%20inquire%20about%20direct%20UK%20gadgets%20or%20Swavy_shots%20sessions."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black hover:bg-[#2563eb] hover:text-white text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 rounded-full flex items-center gap-2 shadow-md transition-all duration-200 shrink-0 active:scale-95 border-2 border-black cursor-pointer"
            >
              <span>Chat On WhatsApp</span>
              <ArrowUpRight size={16} className="stroke-[2.5]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
