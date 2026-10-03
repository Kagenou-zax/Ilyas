import React, { useEffect } from 'react';
import { ShowcaseItem, Product } from '../types';
import { X, ArrowUpRight, Check, MapPin, Sparkles, MessageCircle, ShieldCheck } from 'lucide-react';

interface LightboxModalProps {
  item: ShowcaseItem | Product | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isProduct = 'condition' in item;
  const title = isProduct ? item.name : item.title;
  const image = item.image;
  const category = isProduct ? item.categoryLabel : item.category;
  const serial = item.serial;
  const conditionBadge = isProduct ? item.condition : item.conditionBadge;
  const specsList = isProduct ? item.features : item.specs;
  const desc = isProduct ? item.fullDesc : item.subtitle;

  const whatsappNegotiateUrl = `https://wa.me/2349063192326?text=${encodeURIComponent(
    `Hello Swavy Gadget, I want to discuss and negotiate the price for "${title}". Please confirm stock availability for pickup in Abeokuta/Lagos or dispatch.`
  )}`;

  return (
    <div
      id="lightbox-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="lightbox-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#f8fafc] border-2 border-black rounded-3xl overflow-hidden shadow-2xl my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          id="lightbox-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-black/80 hover:bg-[#2563eb] hover:text-white text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 active:scale-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Image Container */}
          <div className="md:col-span-6 relative aspect-4/3 md:aspect-auto md:min-h-[380px] bg-neutral-900 overflow-hidden">
            <img
              src={image}
              alt={title}
              decoding="async"
              onError={(e) => {
                e.currentTarget.src = '/src/assets/images/swavy_store_phones_1791062288821.jpg';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />

            {/* Top Serial Badge & Condition */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-black/80 text-white border border-white/20">
                NO. {serial}
              </span>
              <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-[#2563eb] text-white border border-black shadow-xs">
                {conditionBadge}
              </span>
            </div>

            {/* Bottom Stock Badge */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-white">
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span>IN STOCK • ABE & LAGOS HUBS</span>
              </div>
            </div>
          </div>

          {/* Details Content */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest font-display-title text-[#2563eb]">
                  {category}
                </span>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-xl">
                  <MessageCircle size={13} className="text-[#25D366] fill-[#25D366]" />
                  <span>Price on WhatsApp</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#0f172a] leading-snug mb-3 font-display-title">
                {title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                {desc}
              </p>

              {/* Specifications List */}
              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                  KEY HARDWARE SPECS & VERIFICATION:
                </span>
                <ul className="space-y-1.5">
                  {specsList.map((spec, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-medium text-neutral-800">
                      <div className="w-4 h-4 rounded-full bg-[#2563eb]/15 text-[#2563eb] flex items-center justify-center shrink-0">
                        <Check size={11} className="stroke-[3]" />
                      </div>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hub Availability & WhatsApp CTA */}
            <div className="pt-4 border-t border-black/10 flex flex-col gap-3">
              <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500">
                <MapPin size={11} className="text-[#2563eb]" />
                <span>Pickup: Lalubu St, Abeokuta or Computer Village, Ikeja</span>
              </div>

              <a
                href={whatsappNegotiateUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="lightbox-wa-negotiate-btn"
                className="w-full min-h-[48px] py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-black text-black hover:text-white border-2 border-black font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
              >
                <MessageCircle size={16} />
                <span>Negotiate Price On WhatsApp</span>
                <ArrowUpRight size={14} className="stroke-[3]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
