import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Smartphone, MapPin, Sparkles, SlidersHorizontal, Globe, Copy, Check } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyDomain = () => {
    navigator.clipboard.writeText('https://swavygadget.store');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header
        id="main-header"
        className="relative z-30 w-full px-4 sm:px-8 md:px-12 pt-3 sm:pt-4 flex items-center justify-between"
      >
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black border-2 border-black flex items-center justify-center text-white shadow-sm group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
            <SlidersHorizontal size={20} className="stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl sm:text-2xl tracking-tight text-[#0f172a] font-display-title leading-none">
              swavy gadget
            </span>
            <span className="text-[9px] font-mono font-bold tracking-widest text-slate-500 uppercase">
              DESKTOPS & TECH ACCESSORIES
            </span>
          </div>
        </a>

        {/* Center Floating Pill Menu (Reference Site Style) */}
        <nav
          aria-label="Desktop Navigation"
          className="hidden md:flex items-center gap-7 lg:gap-8 bg-[#0f172a] text-white px-8 lg:px-10 py-3 rounded-2xl shadow-md border border-black/10"
        >
          <a
            href="#about"
            className="text-white/80 hover:text-[#38bdf8] text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            About
          </a>
          <a
            href="#showcase"
            className="text-white/80 hover:text-[#38bdf8] text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            Showcase
          </a>
          <a
            href="#catalogue"
            className="text-white/80 hover:text-[#38bdf8] text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            Catalogue
          </a>
          <a
            href="#locations"
            className="text-white/80 hover:text-[#38bdf8] text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            Locations
          </a>
          <a
            href="#contact"
            className="text-white/80 hover:text-[#38bdf8] text-xs font-semibold uppercase tracking-[0.18em] transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="hidden lg:flex items-center gap-1.5 bg-black/5 hover:bg-black/10 border border-black/10 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold text-slate-700 transition-colors">
            <Globe size={13} className="text-[#2563eb]" />
            <span>swavygadget.store</span>
          </div>

          <a
            href="https://wa.me/2349063192326?text=Hello%20Swavy%20Gadget%2C%20I%20am%20interested%20in%20upgrading%20my%20tech%20setup."
            target="_blank"
            rel="noopener noreferrer"
            id="header-whatsapp-cta"
            className="bg-white hover:bg-[#2563eb] hover:text-white text-[#0f172a] text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-full border-2 border-black shadow-sm transition-all duration-200 hidden sm:inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Order On WhatsApp</span>
            <ArrowUpRight size={14} className="stroke-[2.5]" />
          </a>

          <button
            type="button"
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center shadow-sm cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none"
            aria-label="Toggle Navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-20 animate-in fade-in duration-200"
        >
          <div
            id="mobile-drawer"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white border-2 border-black rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-2 relative animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b-2 border-black/10 mb-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center">
                  <SlidersHorizontal size={16} />
                </div>
                <span className="font-bold text-base tracking-tight text-[#0f172a] font-display-title">
                  swavy gadget
                </span>
              </div>
              <button
                type="button"
                id="mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-black text-white hover:bg-[#2563eb] hover:text-white transition-colors flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Custom Domain Bar in Mobile Drawer */}
            <div className="p-2.5 sm:p-3 bg-neutral-100 rounded-2xl border border-black/10 flex items-center justify-between my-1">
              <div className="flex items-center gap-2 min-w-0">
                <Globe size={16} className="text-[#2563eb] shrink-0" />
                <div className="min-w-0">
                  <div className="text-[9px] font-mono uppercase text-slate-500 font-bold truncate">Official Web Store</div>
                  <div className="text-xs font-mono font-bold text-[#0f172a] truncate">swavygadget.store</div>
                </div>
              </div>
              <button
                type="button"
                id="mobile-copy-store-url"
                onClick={handleCopyDomain}
                className="py-1.5 px-2.5 rounded-lg bg-white hover:bg-black hover:text-white text-[11px] font-mono font-bold border border-black/15 shadow-2xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                title="Copy web address"
              >
                {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <a
              href="#about"
              id="mobile-link-about"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-xs text-[#0f172a] uppercase tracking-wider min-h-[44px] py-2.5 px-3 rounded-xl hover:bg-[#2563eb] hover:text-white transition-all flex items-center justify-between group"
            >
              <span>About Swavy Gadget</span>
              <Sparkles size={16} className="text-[#2563eb] group-hover:text-white transition-colors" />
            </a>

            <a
              href="#showcase"
              id="mobile-link-showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-xs text-[#0f172a] uppercase tracking-wider min-h-[44px] py-2.5 px-3 rounded-xl hover:bg-[#2563eb] hover:text-white transition-all flex items-center justify-between group"
            >
              <span>3D Setups & Gear Showcase</span>
              <ArrowUpRight size={16} className="text-[#2563eb] group-hover:text-white transition-colors" />
            </a>

            <a
              href="#catalogue"
              id="mobile-link-catalogue"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-xs text-[#0f172a] uppercase tracking-wider min-h-[44px] py-2.5 px-3 rounded-xl hover:bg-[#2563eb] hover:text-white transition-all flex items-center justify-between group"
            >
              <span>Tech Accessories Catalogue</span>
              <ArrowUpRight size={16} className="text-[#2563eb] group-hover:text-white transition-colors" />
            </a>

            <a
              href="#locations"
              id="mobile-link-locations"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-xs text-[#0f172a] uppercase tracking-wider min-h-[44px] py-2.5 px-3 rounded-xl hover:bg-[#2563eb] hover:text-white transition-all flex items-center justify-between group"
            >
              <span>Hubs: Abeokuta & Computer Village</span>
              <MapPin size={16} className="text-[#2563eb] group-hover:text-white transition-colors" />
            </a>

            <a
              href="#contact"
              id="mobile-link-contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold text-xs text-[#0f172a] uppercase tracking-wider min-h-[44px] py-2.5 px-3 rounded-xl hover:bg-[#2563eb] hover:text-white transition-all flex items-center justify-between group"
            >
              <span>Direct Order & Inquiries</span>
              <Smartphone size={16} className="text-[#2563eb] group-hover:text-white transition-colors" />
            </a>

            <div className="pt-2 border-t border-black/10 mt-1 flex flex-col gap-2">
              <a
                href="https://wa.me/2349063192326?text=Hello%20Swavy%20Gadget%2C%20I%20want%20to%20order%20accessories"
                target="_blank"
                rel="noopener noreferrer"
                id="mobile-drawer-wa-cta"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[44px] py-3 bg-[#25D366] text-white border-2 border-black font-bold rounded-2xl text-center text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>WhatsApp (09063192326)</span>
                <ArrowUpRight size={14} />
              </a>
              <a
                href="tel:08113841519"
                id="mobile-drawer-call-cta"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full min-h-[44px] py-2.5 bg-black text-white hover:bg-[#2563eb] hover:text-white border-2 border-black font-bold rounded-2xl text-center text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>Call Line (08113841519)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
