import React, { useState } from 'react';
import { ArrowUp, Sparkles, SlidersHorizontal, MapPin, Phone, MessageCircle, Globe, Copy, Check, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText('https://swavygadget.store');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="main-footer" className="w-full bg-[#0f172a] text-white border-t-2 border-black relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12 pt-12 sm:pt-16 pb-10">
        
        {/* Top Giant Brand Text */}
        <div className="border-b border-white/10 pb-8 sm:pb-12 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#38bdf8] uppercase mb-2">
                <SlidersHorizontal size={14} />
                <span>MINIMALIST DESKTOPS • TECH ACCESSORIES • NIGERIA</span>
              </div>
              <h2 className="font-condensed text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-none">
                SWAVY GADGET.
              </h2>
            </div>

            <button
              type="button"
              id="footer-scroll-top-btn"
              onClick={scrollToTop}
              className="self-start sm:self-auto w-12 h-12 rounded-full bg-white hover:bg-[#2563eb] hover:text-white text-black flex items-center justify-center transition-colors cursor-pointer shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-[#38bdf8] focus-visible:outline-none"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={20} className="stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Official Store Custom Domain Banner */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center border border-white/20 shadow-sm shrink-0">
              <Globe size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#38bdf8] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                <span>Official Digital Storefront</span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-bold text-white tracking-wide">
                swavygadget.store
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              id="footer-copy-url-btn"
              onClick={handleCopyUrl}
              className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white hover:text-black text-white text-xs font-mono font-bold border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 grow md:grow-0"
            >
              {copied ? <Check size={14} className="text-[#25D366]" /> : <Copy size={14} />}
              <span>{copied ? 'Copied Store URL!' : 'Copy Store URL'}</span>
            </button>
            <a
              href="https://swavygadget.store"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-[#2563eb] hover:bg-white hover:text-black text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 shrink-0"
            >
              <span>Visit</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* 4 Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Col 1 (4 cols): Philosophy */}
          <div className="md:col-span-4">
            <h4 className="font-display-title text-base font-bold uppercase tracking-wider text-[#38bdf8] mb-3">
              About Swavy Gadget
            </h4>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm mb-4">
              Curating high-quality tech accessories and minimalist desktop workspaces. Engineered for deep work, ergonomics, and aesthetic purity.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#25D366]">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
              <span>Available in Abeokuta (FUNAAB) & Lagos</span>
            </div>
          </div>

          {/* Col 2 (3 cols): Hub 1 (Abeokuta) */}
          <div className="md:col-span-3">
            <h4 className="font-display-title text-base font-bold uppercase tracking-wider text-[#38bdf8] mb-3 flex items-center gap-1.5">
              <MapPin size={16} />
              <span>Abeokuta Hub</span>
            </h4>
            <address className="not-italic text-xs sm:text-sm text-white/70 leading-relaxed mb-3">
              Lalubu Street, Oke-Ilewo Tarmac,
              <br />
              Abeokuta, Ogun State
              <br />
              <span className="text-[#38bdf8] font-bold">(Serving FUNAAB & Environs)</span>
            </address>
            <div className="text-xs font-mono text-white/60">
              Mon - Sat: 9:00 AM - 7:30 PM
            </div>
          </div>

          {/* Col 3 (3 cols): Hub 2 (Lagos) */}
          <div className="md:col-span-3">
            <h4 className="font-display-title text-base font-bold uppercase tracking-wider text-[#38bdf8] mb-3 flex items-center gap-1.5">
              <MapPin size={16} />
              <span>Lagos Flagship</span>
            </h4>
            <address className="not-italic text-xs sm:text-sm text-white/70 leading-relaxed mb-3">
              Otigba Street, Computer Village,
              <br />
              Ikeja, Lagos State
              <br />
              <span className="text-[#38bdf8] font-bold">(Heart of Computer Village)</span>
            </address>
            <div className="text-xs font-mono text-white/60">
              Mon - Sat: 8:30 AM - 8:00 PM
            </div>
          </div>

          {/* Col 4 (2 cols): Direct Contacts */}
          <div className="md:col-span-2">
            <h4 className="font-display-title text-base font-bold uppercase tracking-wider text-[#38bdf8] mb-3">
              Direct Contact
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <a
                  href="https://wa.me/2349063192326"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle size={13} />
                  <span>09063192326 (WA)</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:08113841519"
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                >
                  <Phone size={13} />
                  <span>08113841519 (Call)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>
            © {new Date().getFullYear()} Swavy Gadget. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
            <a href="#catalogue" className="hover:text-white transition-colors">Catalogue</a>
            <a href="#locations" className="hover:text-white transition-colors">Locations</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
