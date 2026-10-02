import React from 'react';
import { Sparkles, Monitor, Keyboard, Zap, MapPin, Phone } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { label: 'SWAVY GADGET', icon: Sparkles },
    { label: 'MINIMALIST DESKTOP SETUPS', icon: Monitor },
    { label: 'HIGH-QUALITY TECH ACCESSORIES', icon: Zap },
    { label: 'LALUBU STREET, ABEOKUTA (FUNAAB)', icon: MapPin },
    { label: 'OTIGBA STREET, COMPUTER VILLAGE IKEJA', icon: MapPin },
    { label: 'WHATSAPP: 09063192326', icon: Phone },
    { label: 'CALL LINE: 08113841519', icon: Phone },
    { label: 'CUSTOM MECHANICAL KEYBOARDS', icon: Keyboard },
    { label: 'SOLID WALNUT DESK SHELVES', icon: Monitor },
    { label: 'FAST NATIONWIDE DISPATCH', icon: Zap },
  ];

  return (
    <div className="w-full bg-[#0f172a] text-white py-3 sm:py-3.5 overflow-hidden border-y-2 border-black select-none relative z-20">
      <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <span className="text-xs sm:text-sm font-black tracking-[0.16em] uppercase font-display-title">
                {item.label}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#2563eb]" />
              <Icon size={14} className="text-[#38bdf8]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
