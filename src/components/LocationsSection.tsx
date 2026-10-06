import React from 'react';
import { STORE_LOCATIONS } from '../data/products';
import { MapPin, Phone, MessageCircle, Clock, CheckCircle2, Navigation, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const LocationsSection: React.FC = () => {
  return (
    <section id="locations" className="w-full bg-[#f5f7fc] py-12 sm:py-20 border-t-2 border-black/15 relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14" data-reveal>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-[0.22em] mb-2.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#2563eb] rotate-45 inline-block" />
              <span>Physical Retail & Pickups</span>
              <span className="text-[#2563eb] font-black">/</span>
              <span>Direct Showrooms</span>
            </div>

            <h2 className="font-condensed text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0f172a] uppercase leading-[0.88] tracking-tight">
              SHOWROOM HUBS.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-medium mt-2">
              Visit our physical hubs in Abeokuta (near FUNAAB) or Ikeja Computer Village to test smartphones, inspect laptops & consoles, or discuss photography sessions in person.
            </p>
          </div>

          {/* Contact Fast Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-white border-2 border-black p-3 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono font-bold uppercase text-neutral-500">Official WhatsApp</span>
                <a href="https://wa.me/2349063192326" className="text-xs font-mono font-black text-black hover:text-[#2563eb]">
                  09063192326
                </a>
              </div>
            </div>

            <div className="hidden sm:block w-[1px] h-8 bg-black/15" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center">
                <Phone size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-mono font-bold uppercase text-neutral-500">Call Line</span>
                <a href="tel:08113841519" className="text-xs font-mono font-black text-black hover:text-[#2563eb]">
                  08113841519
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dual Locations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STORE_LOCATIONS.map((loc, idx) => (
            <div
              key={loc.id}
              id={`location-card-${loc.id}`}
              className="bg-white border-2 border-black rounded-3xl p-6 sm:p-8 shadow-md hover-glow transition-all duration-300 flex flex-col justify-between relative group"
              data-reveal
              data-reveal-delay={idx === 1 ? '150' : undefined}
            >
              {/* Top Tag Pill */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-[9.5px] sm:text-[10px] font-mono font-black uppercase tracking-wider text-[#2563eb] bg-[#2563eb]/10 px-3 py-1 rounded-full border border-[#2563eb]/20">
                    {loc.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-neutral-500">
                    <Clock size={11} className="text-[#25D366]" />
                    <span>{loc.hours}</span>
                  </div>
                </div>

                <h3 className="font-display-title font-bold text-2xl sm:text-3xl text-[#0f172a] mb-3 group-hover:text-[#2563eb] transition-colors">
                  {loc.name}
                </h3>

                {/* Exact Address Highlight */}
                <div className="bg-[#f8fafc] border-2 border-black rounded-2xl p-4 mb-5">
                  <div className="flex items-start gap-2.5">
                    <MapPin size={18} className="text-[#2563eb] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-[#0f172a] block mb-1">
                        {loc.address}
                      </span>
                      <span className="text-[11px] text-slate-600 leading-snug block">
                        {loc.landmark}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hub Highlights Checklist */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 block mb-2.5">
                    HUB SERVICES & PERKS:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {loc.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-neutral-800 font-medium">
                        <CheckCircle2 size={13} className="text-[#25D366] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/2349063192326?text=${encodeURIComponent(
                    `Hello Swavy Gadget, I would like to visit or order from your ${loc.name} (${loc.address}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`hub-chat-wa-${loc.id}`}
                  className="w-full sm:w-1/2 min-h-[44px] py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-black hover:text-white text-white border-2 border-black text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
                >
                  <MessageCircle size={15} />
                  <span>Chat With Hub</span>
                </a>

                <a
                  href={`tel:${loc.phone}`}
                  id={`hub-call-btn-${loc.id}`}
                  className="w-full sm:w-1/2 min-h-[44px] py-3 px-4 rounded-2xl bg-black hover:bg-[#2563eb] hover:text-white text-white border-2 border-black text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:outline-none"
                >
                  <Phone size={15} />
                  <span>Call {loc.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Nationwide Logistics Assurance */}
        <div className="mt-8 bg-white border-2 border-black rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4" data-reveal>
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#2563eb] border-2 border-black flex items-center justify-center shrink-0">
              <Navigation size={20} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#0f172a] block">
                Not in Abeokuta or Lagos? We Ship Nationwide Across Nigeria
              </span>
              <span className="text-xs text-slate-600">
                Tracked doorstep dispatch via GIG Logistics, DHL, and Interstate Transit to Ibadan, Abuja, Port Harcourt, and beyond.
              </span>
            </div>
          </div>

          <a
            href="https://wa.me/2349063192326?text=Hello%20Swavy%20Gadget%2C%20I%20would%20like%20to%20inquire%20about%20nationwide%20delivery%20to%20my%20city."
            target="_blank"
            rel="noopener noreferrer"
            id="locations-nationwide-wa-cta"
            className="min-h-[44px] bg-neutral-100 hover:bg-black hover:text-white text-black border-2 border-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-2xl transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
          >
            Inquire Nationwide Delivery
          </a>
        </div>
      </div>
    </section>
  );
};
